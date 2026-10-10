import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PARCELS, REGISTERED_BANKS, TAHSILDAR_OFFICER } from '../data/mockData';
import { DrunixLedgerEngine } from '../blockchain/drunixEngine';
import { translations } from '../locales/translations';

const BhuSetuContext = createContext();

export const BhuSetuProvider = ({ children }) => {
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [selectedParcelUlpin, setSelectedParcelUlpin] = useState("MH-PUNE-HAV-0042");
  const [activeRole, setActiveRole] = useState("walkthrough"); // walkthrough, tahsildar, bank, farmer, explorer
  const [language, setLanguage] = useState("en"); // en, mr, hi
  const [currentSimulatedDate, setCurrentSimulatedDate] = useState("2026-06-15");
  const [drunixEngine, setDrunixEngine] = useState(() => new DrunixLedgerEngine(INITIAL_PARCELS));
  const [logs, setLogs] = useState([]);
  const [upiModalData, setUpiModalData] = useState(null);
  const [alertModalData, setAlertModalData] = useState(null);
  const [walkthroughStep, setWalkthroughStep] = useState(1);

  const t = translations[language] || translations.en;

  const addLog = (message, type = "info", txId = null, rule = null) => {
    const newLog = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      message,
      type, // 'info', 'success', 'warning', 'error', 'blockchain'
      txId,
      rule
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const selectedParcel = parcels.find(p => p.ulpin === selectedParcelUlpin) || parcels[0];

  // 1. Tahsildar records and endorses lease on DRUNIX
  const handleRecordCultivationRight = (ulpin) => {
    try {
      const targetParcel = parcels.find(p => p.ulpin === ulpin);
      if (!targetParcel || !targetParcel.lease) {
        throw new Error("No pending lease agreement found on this parcel.");
      }

      const result = drunixEngine.recordCultivationRight({
        ulpin: targetParcel.ulpin,
        tenant: targetParcel.lease.tenant,
        owner: targetParcel.currentOwner,
        season: targetParcel.lease.season,
        crop: targetParcel.lease.crop,
        startDate: targetParcel.lease.startDate,
        endDate: targetParcel.lease.endDate,
        monthlyRent: targetParcel.lease.monthlyRent,
        totalRent: targetParcel.lease.totalRent,
        endorsementOrg: TAHSILDAR_OFFICER.orgId
      });

      // Update state
      setParcels(prev => prev.map(p => {
        if (p.ulpin === ulpin) {
          return {
            ...p,
            lease: {
              ...p.lease,
              status: "ACTIVE",
              cultivationRightTokenId: result.tokenId,
              drunixTxId: result.txId,
              autoPayStatus: "ACTIVE"
            }
          };
        }
        return p;
      }));

      addLog(
        `Cultivation Right Token ${result.tokenId} successfully endorsed by Tahsildar (Org1.MHRevenue) on DRUNIX channel 'bhusetu'`,
        "success",
        result.txId,
        "Maharashtra Land Leasing Act s. 3(6) & s. 3(10)"
      );

      return result;
    } catch (err) {
      addLog(err.message, "error");
      setAlertModalData({
        title: "Chaincode Validation Error",
        type: "error",
        message: err.message,
        code: "ENDORSEMENT_FAILED"
      });
      throw err;
    }
  };

  // 2. Tenant pays monthly rent via UPI AutoPay
  const handlePayRentUPI = (ulpin) => {
    const targetParcel = parcels.find(p => p.ulpin === ulpin);
    if (!targetParcel || !targetParcel.lease) return;

    setUpiModalData({
      title: "NPCI UPI AutoPay Execution",
      type: "RENT_AUTOPAY",
      amount: targetParcel.lease.monthlyRent,
      payerName: targetParcel.lease.tenant.name,
      payerVpa: targetParcel.lease.tenant.upiId,
      payeeName: targetParcel.currentOwner.name,
      payeeVpa: targetParcel.currentOwner.upiId,
      purpose: `Agricultural Land Lease Rent (${targetParcel.lease.season}) - Parcel ${ulpin}`,
      onSuccess: (upiTxnId) => {
        const res = drunixEngine.recordPayment({
          type: "RENT_AUTOPAY",
          ulpin,
          cultivationRightId: targetParcel.lease.cultivationRightTokenId,
          amount: targetParcel.lease.monthlyRent,
          upiTxnId,
          payerVpa: targetParcel.lease.tenant.upiId,
          payeeVpa: targetParcel.currentOwner.upiId,
          monthNumber: (targetParcel.lease.rentPaidMonths || 0) + 1
        });

        setParcels(prev => prev.map(p => {
          if (p.ulpin === ulpin) {
            return {
              ...p,
              lease: {
                ...p.lease,
                rentPaidMonths: (p.lease.rentPaidMonths || 0) + 1,
                lastRentTxnId: upiTxnId
              }
            };
          }
          return p;
        }));

        addLog(
          `Rent of ₹${targetParcel.lease.monthlyRent.toLocaleString('en-IN')} paid to ${targetParcel.currentOwner.name} via UPI. Oracle recorded block.`,
          "blockchain",
          res.txId,
          "Rent AutoPay on-chain proof written"
        );
      }
    });
  };

  // 3. Bank places Season Claim and disburses KCC Loan
  const handleDisburseBankLoan = (ulpin, bankId, customAmount = null, customMaturity = "2026-11-20") => {
    try {
      const targetParcel = parcels.find(p => p.ulpin === ulpin);
      const bank = REGISTERED_BANKS.find(b => b.id === bankId) || REGISTERED_BANKS[0];

      if (!targetParcel || !targetParcel.lease || !targetParcel.lease.cultivationRightTokenId) {
        throw new Error("Cannot finance parcel without an ACTIVE Cultivation Right token endorsed on DRUNIX.");
      }

      const loanAmount = customAmount || (targetParcel.areaAcres * bank.maxLimitPerAcre);

      const result = drunixEngine.placeSeasonClaim({
        ulpin,
        cultivationRightId: targetParcel.lease.cultivationRightTokenId,
        bank,
        loanAmount,
        season: targetParcel.lease.season,
        crop: targetParcel.lease.crop,
        disbursalDate: currentSimulatedDate,
        maturityDate: customMaturity
      });

      // Execute mock UPI payout through Oracle
      const upiTxnId = `UPI/DISBURSE/${Date.now().toString().slice(-8)}`;
      drunixEngine.recordPayment({
        type: "LOAN_DISBURSAL",
        ulpin,
        cultivationRightId: targetParcel.lease.cultivationRightTokenId,
        amount: loanAmount,
        upiTxnId,
        payerVpa: bank.upiVpa,
        payeeVpa: targetParcel.lease.tenant.upiId
      });

      setParcels(prev => prev.map(p => {
        if (p.ulpin === ulpin) {
          return {
            ...p,
            lease: {
              ...p.lease,
              status: "FINANCED",
              seasonClaim: result.claim
            }
          };
        }
        return p;
      }));

      addLog(
        `KCC Crop Loan of ₹${loanAmount.toLocaleString('en-IN')} disbursed by ${bank.name} to ${targetParcel.lease.tenant.name} via UPI. Season Claim ID: ${result.claimId}`,
        "success",
        result.txId,
        "Maha Act s. 5(e): Crop-attached lien recorded on DRUNIX"
      );

      return result;
    } catch (err) {
      addLog(err.message, "error");
      setAlertModalData({
        title: "Chaincode Rule Violation",
        type: "error",
        message: err.message,
        code: err.message.split(":")[0] || "CHAINCODE_REJECTION"
      });
      throw err;
    }
  };

  // 4. Test Double Financing Rejection (Bank 2 tries to finance the same parcel-season)
  const handleTestDoubleFinancing = (ulpin) => {
    const targetParcel = parcels.find(p => p.ulpin === ulpin);
    if (!targetParcel || !targetParcel.lease || !targetParcel.lease.seasonClaim) {
      setAlertModalData({
        title: "Pre-requisite Needed",
        type: "info",
        message: "First disburse a loan with Bank 1 (Maharashtra Gramin Bank) to establish an active claim before testing double financing rejection.",
        code: "PRECONDITION_REQUIRED"
      });
      return;
    }

    try {
      const bank2 = REGISTERED_BANKS[1]; // Pune District Central Co-op Bank
      handleDisburseBankLoan(ulpin, bank2.id, 65000, "2026-11-15");
    } catch (err) {
      // Caught as expected
    }
  };

  // 5. Test Loan Outlives Lease Rejection (Loan maturity past lease end date)
  const handleTestLoanOutlivesLease = (ulpin) => {
    const targetParcel = parcels.find(p => p.ulpin === ulpin);
    if (!targetParcel || !targetParcel.lease) return;

    try {
      const bank = REGISTERED_BANKS[0];
      // Lease ends on 2026-11-30, let's request loan maturing on 2027-02-15!
      handleDisburseBankLoan(ulpin, bank.id, 75000, "2027-02-15");
    } catch (err) {
      // Caught as expected
    }
  };

  // 6. Tenant repays KCC Loan via UPI
  const handleRepayLoanUPI = (ulpin) => {
    const targetParcel = parcels.find(p => p.ulpin === ulpin);
    if (!targetParcel || !targetParcel.lease || !targetParcel.lease.seasonClaim) {
      setAlertModalData({
        title: "No Active Loan",
        type: "info",
        message: "This parcel does not currently hold an open season claim.",
        code: "NO_ACTIVE_CLAIM"
      });
      return;
    }

    const claim = targetParcel.lease.seasonClaim;
    const totalRepayment = claim.loanAmount + Math.round((claim.loanAmount * 0.07 * (5 / 12))); // Subsidized interest for 5 months

    setUpiModalData({
      title: "NPCI UPI KCC Loan Repayment",
      type: "LOAN_REPAYMENT",
      amount: totalRepayment,
      payerName: targetParcel.lease.tenant.name,
      payerVpa: targetParcel.lease.tenant.upiId,
      payeeName: claim.bankName,
      payeeVpa: "kcc.repay@npci.drunix",
      purpose: `Kisan Credit Card Loan Settlement (${claim.claimId}) for ${targetParcel.lease.season}`,
      onSuccess: (upiTxnId) => {
        const res = drunixEngine.recordPayment({
          type: "LOAN_REPAYMENT",
          ulpin,
          cultivationRightId: targetParcel.lease.cultivationRightTokenId,
          amount: totalRepayment,
          upiTxnId,
          payerVpa: targetParcel.lease.tenant.upiId,
          payeeVpa: "kcc.repay@npci.drunix"
        });

        setParcels(prev => prev.map(p => {
          if (p.ulpin === ulpin) {
            return {
              ...p,
              lease: {
                ...p.lease,
                status: "ACTIVE", // Reverts from FINANCED back to ACTIVE
                seasonClaim: {
                  ...p.lease.seasonClaim,
                  status: "REPAID",
                  repaidAmount: totalRepayment,
                  repaidTxnId: upiTxnId
                }
              }
            };
          }
          return p;
        }));

        addLog(
          `KCC Loan of ₹${totalRepayment.toLocaleString('en-IN')} fully repaid over UPI. Bank claim released on DRUNIX.`,
          "success",
          res.txId,
          "Maha Act s. 5(e): Crop claim released; right freed."
        );
      }
    });
  };

  // 7. Time Warp Simulator (Advance date to test automatic reversion)
  const handleAdvanceDate = (newDateStr) => {
    setCurrentSimulatedDate(newDateStr);
    const results = drunixEngine.evaluateTimeAdvancement(newDateStr);

    if (results.length > 0) {
      // Re-sync parcels state
      setParcels(prev => prev.map(p => {
        const rightKey = p.lease?.cultivationRightTokenId;
        if (rightKey) {
          const chainRight = drunixEngine.worldState.get(`CULTIVATION_RIGHT:${rightKey}`);
          if (chainRight && chainRight.status === "EXPIRED") {
            return {
              ...p,
              lease: {
                ...p.lease,
                status: "EXPIRED"
              }
            };
          }
        }
        return p;
      }));

      results.forEach(r => {
        if (r.action === "AUTO_REVERTED") {
          addLog(r.msg, "blockchain", null, "Maha Act s. 3(10): Automatic Land Reversion");
        } else {
          addLog(r.msg, "warning");
        }
      });
    } else {
      addLog(`Simulated timeline advanced to ${newDateStr}. All chaincode conditions evaluated.`);
    }
  };

  // Reset entire simulator
  const handleResetSimulation = () => {
    const newEngine = new DrunixLedgerEngine(INITIAL_PARCELS);
    setDrunixEngine(newEngine);
    setParcels(INITIAL_PARCELS);
    setCurrentSimulatedDate("2026-06-15");
    setSelectedParcelUlpin("MH-PUNE-HAV-0042");
    setWalkthroughStep(1);
    setLogs([]);
    addLog("BhuSetu DRUNIX simulation reset to initial state.", "info");
  };

  return (
    <BhuSetuContext.Provider
      value={{
        parcels,
        selectedParcel,
        selectedParcelUlpin,
        setSelectedParcelUlpin,
        activeRole,
        setActiveRole,
        language,
        setLanguage,
        t,
        currentSimulatedDate,
        drunixEngine,
        logs,
        upiModalData,
        setUpiModalData,
        alertModalData,
        setAlertModalData,
        walkthroughStep,
        setWalkthroughStep,
        handleRecordCultivationRight,
        handlePayRentUPI,
        handleDisburseBankLoan,
        handleTestDoubleFinancing,
        handleTestLoanOutlivesLease,
        handleRepayLoanUPI,
        handleAdvanceDate,
        handleResetSimulation,
        addLog
      }}
    >
      {children}
    </BhuSetuContext.Provider>
  );
};

export const useBhuSetu = () => {
  const context = useContext(BhuSetuContext);
  if (!context) {
    throw new Error("useBhuSetu must be used within a BhuSetuProvider");
  }
  return context;
};
