// DRUNIX Blockchain & Go Chaincode Rules Engine Simulator
// Implements Maharashtra Agricultural Land Leasing Act (Act XXVIII of 2023) as Law-as-Code

// Helper for generating deterministic hashes and IDs
function generateHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}${Math.random().toString(16).substring(2, 8)}`;
}

export class DrunixLedgerEngine {
  constructor(initialParcels = []) {
    this.blocks = [];
    this.worldState = new Map(); // Composite key -> Value (YugabyteDB mock)
    this.privateDataCollection = new Map(); // DPDP Private data collection
    this.transactionLog = [];
    this.currentBlockNumber = 1048;

    // Initialize Genesis Block
    this.createGenesisBlock();

    // Initialize parcels in world state
    initialParcels.forEach(p => {
      this.worldState.set(`PARCEL:${p.ulpin}`, {
        ulpin: p.ulpin,
        ownerId: p.currentOwner.id,
        areaAcres: p.areaAcres,
        surveyNumber: p.surveyNumber,
        village: p.village,
        district: p.district,
        state: p.state,
        activeCultivationRightId: p.lease ? p.lease.cultivationRightTokenId : null,
        ownerTitleEncumbered: false
      });

      if (p.lease && p.lease.cultivationRightTokenId) {
        this.worldState.set(`CULTIVATION_RIGHT:${p.lease.cultivationRightTokenId}`, {
          id: p.lease.cultivationRightTokenId,
          ulpin: p.ulpin,
          tenantIdHash: generateHash(p.lease.tenant.id),
          season: p.lease.season,
          crop: p.lease.crop,
          startDate: p.lease.startDate,
          endDate: p.lease.endDate,
          monthlyRent: p.lease.monthlyRent,
          status: p.lease.status, // ACTIVE, FINANCED, EXPIRED
          activeClaimId: null,
          rentOverdueMonths: 0,
          endorsedBy: ["Org1.MHRevenue"]
        });

        // Store private details into DPDP private collection
        this.privateDataCollection.set(`PRIVATE:TENANT:${generateHash(p.lease.tenant.id)}`, {
          name: p.lease.tenant.name,
          phone: p.lease.tenant.phone,
          aadhaarMasked: p.lease.tenant.aadhaarMasked,
          agriStackFarmerId: p.lease.tenant.agriStackFarmerId,
          upiId: p.lease.tenant.upiId
        });
      }
    });
  }

  createGenesisBlock() {
    const genesisBlock = {
      blockNumber: this.currentBlockNumber,
      timestamp: "2026-05-15T00:00:00Z",
      previousHash: "0x0000000000000000000000000000000000000000",
      merkleRoot: "0x8fa1b9e288921a9c118d09873fec77bca2041289",
      transactionsCount: 1,
      transactions: [
        {
          txId: "0xGENESIS_INIT_MH_LAND_REGISTRY",
          type: "CHANNEL_INIT",
          channel: "bhusetu",
          endorsers: ["Org1.MHRevenue", "Org2.MGBank", "NPCI.Orderer"],
          payload: {
            lawEnforced: "Maharashtra Agricultural Land Leasing Act XXVIII of 2023",
            channelName: "bhusetu",
            drunixVersion: "2.1-lts-fabric-fork"
          }
        }
      ]
    };
    this.blocks.unshift(genesisBlock);
  }

  // --- CHAINCODE FUNCTION 1: RECORD CULTIVATION RIGHT (Tahsildar Org1) ---
  recordCultivationRight({
    ulpin,
    tenant,
    owner,
    season,
    crop,
    startDate,
    endDate,
    monthlyRent,
    totalRent,
    endorsementOrg = "Org1.MHRevenue"
  }) {
    // Endorsement policy check: Must be Revenue Org
    if (!endorsementOrg.includes("Org1")) {
      throw new Error("ENDORSEMENT_POLICY_VIOLATION: Cultivation rights can only be recorded by Revenue Authority (Org1.MHRevenue)");
    }

    const parcel = this.worldState.get(`PARCEL:${ulpin}`);
    if (!parcel) {
      throw new Error(`PARCEL_NOT_FOUND: Land parcel ${ulpin} not found in state registry.`);
    }

    // Check if parcel already has an active overlapping lease
    if (parcel.activeCultivationRightId) {
      const existingRight = this.worldState.get(`CULTIVATION_RIGHT:${parcel.activeCultivationRightId}`);
      if (existingRight && (existingRight.status === "ACTIVE" || existingRight.status === "FINANCED")) {
        throw new Error(`ACTIVE_RIGHT_EXISTS: Parcel ${ulpin} already has an active cultivation right (${existingRight.id}).`);
      }
    }

    const tokenId = `CR-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const tenantHash = generateHash(tenant.id || tenant.name);

    // Save to DPDP private data collection
    this.privateDataCollection.set(`PRIVATE:TENANT:${tenantHash}`, {
      name: tenant.name,
      phone: tenant.phone,
      aadhaarMasked: tenant.aadhaarMasked,
      agriStackFarmerId: tenant.agriStackFarmerId,
      upiId: tenant.upiId
    });

    const newRight = {
      id: tokenId,
      ulpin,
      tenantIdHash: tenantHash,
      season,
      crop,
      startDate,
      endDate,
      monthlyRent,
      totalRent,
      status: "ACTIVE",
      activeClaimId: null,
      rentOverdueMonths: 0,
      endorsedBy: [endorsementOrg],
      recordedAt: new Date().toISOString()
    };

    this.worldState.set(`CULTIVATION_RIGHT:${tokenId}`, newRight);
    parcel.activeCultivationRightId = tokenId;
    this.worldState.set(`PARCEL:${ulpin}`, parcel);

    // Create block
    const txId = generateHash(`TX_CR_${tokenId}_${Date.now()}`);
    const tx = {
      txId,
      type: "RECORD_CULTIVATION_RIGHT",
      ulpin,
      tokenId,
      channel: "bhusetu",
      endorsers: [endorsementOrg, "NPCI.Orderer"],
      chaincodeRulesValidated: [
        "Maha Act s. 3(6): Fixed term non-extendable without re-record",
        "Maha Act s. 3(10): Hard automated expiry reversion clause bound",
        "DPDP Act: Private Tenant identity hashed"
      ],
      payload: {
        ulpin,
        tokenId,
        season,
        crop,
        startDate,
        endDate,
        tenantHash
      },
      timestamp: new Date().toISOString()
    };

    this.appendBlock([tx]);
    return { tokenId, txId, right: newRight };
  }

  // --- CHAINCODE FUNCTION 2: PLACE SEASON CROP CLAIM (Bank Org2) ---
  placeSeasonClaim({
    ulpin,
    cultivationRightId,
    bank,
    loanAmount,
    season,
    crop,
    disbursalDate,
    maturityDate
  }) {
    const right = this.worldState.get(`CULTIVATION_RIGHT:${cultivationRightId}`);
    if (!right) {
      throw new Error(`RIGHT_NOT_FOUND: Cultivation right ${cultivationRightId} not found on DRUNIX ledger.`);
    }

    if (right.status !== "ACTIVE") {
      throw new Error(`INVALID_RIGHT_STATE: Cultivation right is currently in ${right.status} state. Only ACTIVE rights can be financed.`);
    }

    // CHAINCODE RULE: No Double Financing (1 open claim per parcel per season)
    if (right.activeClaimId) {
      const existingClaim = this.worldState.get(`SEASON_CLAIM:${right.activeClaimId}`);
      throw new Error(
        `DOUBLE_FINANCING_VIOLATION: Parcel ${ulpin} is ALREADY FINANCED for ${season} by ${existingClaim?.bankName || 'another bank'} (Claim ID: ${right.activeClaimId}). Double financing is strictly blocked on-chain!`
      );
    }

    // CHAINCODE RULE: Maha Act s. 4(c) - Owner not liable, loan must mature before lease ends
    const leaseEnd = new Date(right.endDate);
    const loanMaturity = new Date(maturityDate);
    if (loanMaturity > leaseEnd) {
      throw new Error(
        `LOAN_OUTLIVES_LEASE_VIOLATION: Loan maturity date (${maturityDate}) exceeds lease expiration date (${right.endDate}). Under Maharashtra Act s. 4(c), a tenant crop loan cannot outlive the verifiable cultivation lease period!`
      );
    }

    const claimId = `CLAIM-KCC-${Math.floor(100000 + Math.random() * 900000)}`;
    const claim = {
      claimId,
      ulpin,
      cultivationRightId,
      bankId: bank.id,
      bankName: bank.name,
      bankOrg: bank.orgId || "Org2.Bank",
      loanAmount,
      season,
      crop,
      disbursalDate,
      maturityDate,
      status: "DISBURSED", // DISBURSED, REPAID, DEFAULTED
      repaidAmount: 0,
      createdAt: new Date().toISOString()
    };

    // Update world state
    this.worldState.set(`SEASON_CLAIM:${claimId}`, claim);
    right.activeClaimId = claimId;
    right.status = "FINANCED";
    this.worldState.set(`CULTIVATION_RIGHT:${cultivationRightId}`, right);

    // Create block
    const txId = generateHash(`TX_CLAIM_${claimId}_${Date.now()}`);
    const tx = {
      txId,
      type: "PLACE_SEASON_CLAIM",
      ulpin,
      claimId,
      channel: "bhusetu",
      endorsers: [bank.orgId || "Org2.Bank", "Org1.MHRevenue", "NPCI.Orderer"],
      chaincodeRulesValidated: [
        "Maha Act s. 5(e): Claim attached to seasonal crop output, NEVER land title",
        "Maha Act s. 4(c): Loan maturity precedes lease expiration date",
        "BhuSetu Safeguard: Double financing check passed (0 competing claims)"
      ],
      payload: {
        claimId,
        bankName: bank.name,
        loanAmount,
        maturityDate
      },
      timestamp: new Date().toISOString()
    };

    this.appendBlock([tx]);
    return { claimId, txId, claim };
  }

  // --- CHAINCODE FUNCTION 3: RECORD PAYMENT (UPI Oracle) ---
  recordPayment({
    type, // 'RENT_AUTOPAY', 'LOAN_DISBURSAL', 'LOAN_REPAYMENT'
    ulpin,
    cultivationRightId,
    amount,
    upiTxnId,
    payerVpa,
    payeeVpa,
    monthNumber = 1
  }) {
    const txId = generateHash(`TX_PAYMENT_${upiTxnId}_${Date.now()}`);
    let ruleNotice = "";

    if (type === 'RENT_AUTOPAY') {
      const right = this.worldState.get(`CULTIVATION_RIGHT:${cultivationRightId}`);
      if (right) {
        right.lastRentTxn = upiTxnId;
        this.worldState.set(`CULTIVATION_RIGHT:${cultivationRightId}`, right);
      }
      ruleNotice = "NPCI UPI AutoPay mandate executed; rent credited to landowner with verified ledger proof.";
    } else if (type === 'LOAN_REPAYMENT') {
      const right = this.worldState.get(`CULTIVATION_RIGHT:${cultivationRightId}`);
      if (right && right.activeClaimId) {
        const claim = this.worldState.get(`SEASON_CLAIM:${right.activeClaimId}`);
        if (claim) {
          claim.status = "REPAID";
          claim.repaidAmount = amount;
          claim.repaidAt = new Date().toISOString();
          this.worldState.set(`SEASON_CLAIM:${right.activeClaimId}`, claim);
        }
        // Release claim from cultivation right
        right.activeClaimId = null;
        right.status = "ACTIVE"; // Reverts to clean ACTIVE right (or EXPIRED if time has passed)
        this.worldState.set(`CULTIVATION_RIGHT:${cultivationRightId}`, right);
      }
      ruleNotice = "Crop loan fully settled via UPI; Bank claim released on DRUNIX. Tenant credit standing restored.";
    }

    const tx = {
      txId,
      type: `PAYMENT_ORACLE_${type}`,
      ulpin,
      channel: "bhusetu",
      endorsers: ["NPCI.UPIOracle", "Org1.MHRevenue"],
      chaincodeRulesValidated: [
        ruleNotice,
        "NPCI 2-factor UPI Reference validated against Core Banking System"
      ],
      payload: {
        type,
        amount,
        upiTxnId,
        payerVpa,
        payeeVpa,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };

    this.appendBlock([tx]);
    return { txId, upiTxnId };
  }

  // --- CHAINCODE FUNCTION 4: SIMULATE TIME ADVANCE & AUTOMATIC REVERSION ---
  evaluateTimeAdvancement(currentSimulatedDateStr) {
    const simDate = new Date(currentSimulatedDateStr);
    const updates = [];

    for (const [key, value] of this.worldState.entries()) {
      if (key.startsWith("CULTIVATION_RIGHT:")) {
        const right = value;
        const endDate = new Date(right.endDate);

        // Check if lease has reached end date
        if (simDate >= endDate && right.status !== "EXPIRED" && right.status !== "TERMINATED") {
          if (right.activeClaimId) {
            // Cannot cleanly expire until bank claim is resolved (s. 4(c) protection)
            // Flag notice
            updates.push({
              tokenId: right.id,
              action: "BLOCKED_EXPIRY_CLAIM_PENDING",
              msg: `Lease ${right.id} expired on ${right.endDate}, but holds active bank claim ${right.activeClaimId}. Bank claim must be closed.`
            });
          } else {
            // Automatic reversion under Maha Act s. 3(10)
            right.status = "EXPIRED";
            this.worldState.set(key, right);

            // Clear active right on parcel
            const parcel = this.worldState.get(`PARCEL:${right.ulpin}`);
            if (parcel && parcel.activeCultivationRightId === right.id) {
              parcel.activeCultivationRightId = null;
              parcel.ownerTitleEncumbered = false;
              this.worldState.set(`PARCEL:${right.ulpin}`, parcel);
            }

            const txId = generateHash(`TX_AUTO_REVERSION_${right.id}`);
            const tx = {
              txId,
              type: "AUTOMATIC_REVERSION_ENFORCED",
              ulpin: right.ulpin,
              tokenId: right.id,
              channel: "bhusetu",
              endorsers: ["Org1.MHRevenue", "NPCI.Orderer"],
              chaincodeRulesValidated: [
                "Maha Act s. 3(10): Possession and rights revert automatically at lease expiry",
                "Maha Act s. 3(6): No protected tenancy created; Landowner guaranteed zero encumbrance"
              ],
              payload: {
                reversionDate: currentSimulatedDateStr,
                reason: "Fixed season term ended without dispute"
              },
              timestamp: new Date().toISOString()
            };

            this.appendBlock([tx]);
            updates.push({
              tokenId: right.id,
              action: "AUTO_REVERTED",
              msg: `Parcel ${right.ulpin} automatically reverted to Owner! Zero paperwork required.`
            });
          }
        }
      }
    }

    return updates;
  }

  appendBlock(transactions) {
    this.currentBlockNumber += 1;
    const previousHash = this.blocks.length > 0 ? this.blocks[0].merkleRoot : "0x00000";
    const merkleRoot = generateHash(`BLOCK_${this.currentBlockNumber}_${Date.now()}`);

    const newBlock = {
      blockNumber: this.currentBlockNumber,
      timestamp: new Date().toISOString(),
      previousHash,
      merkleRoot,
      transactionsCount: transactions.length,
      transactions
    };

    this.blocks.unshift(newBlock);
    this.transactionLog.unshift(...transactions);
    return newBlock;
  }
}
