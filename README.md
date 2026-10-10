<div align="center">

# 🌾 BhuSetu (भू-सेतू)
### Verifiable Cultivation Rights Turning Tenant Leases into Bankable Credit

**Built on NPCI's DRUNIX Permissioned Distributed Ledger · Settled over UPI Rails**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![DRUNIX](https://img.shields.io/badge/Blockchain-DRUNIX_(Hyperledger_Fabric_Fork)-4338CA.svg)](https://github.com/npci/drunix)
[![NPCI](https://img.shields.io/badge/Payment_Rails-NPCI_UPI_AutoPay-004B87.svg)](https://www.npci.org.in/)
[![Compliance](https://img.shields.io/badge/Compliance-Maharashtra_Act_XXVIII_of_2023-10B981.svg)]()
[![AgriStack](https://img.shields.io/badge/Integration-DILRMP_3.0_%2F_ULPIN-F37021.svg)]()

---

</div>

## 📌 Executive Summary

Over **21.3 million rural households** (~14%) in India lease agricultural land to cultivate crops. Yet, only **13% of leased area is formally registered** (World Bank, 2021). Because landowners fear losing land ownership through protected tenancy or adverse possession claims, they rely on informal, oral leases. Consequently, tenant farmers cannot prove cultivation rights to banks, leaving moneylenders to supply **20.5% of total agricultural debt** at predatory interest rates (NSS, 2019).

**BhuSetu** resolves this structural dilemma by **tokenizing rights over land—not the land itself**—on NPCI's high-throughput permissioned distributed ledger (**DRUNIX**), with financial settlements executed directly over **UPI AutoPay & Payout rails**.

```
                           ┌─────────────────────────────────────────┐
                           │      BhuSetu 3-Token Right Model       │
                           └─────────────────────────────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌──────────────────┐                  ┌───────────────────┐                  ┌───────────────────┐
│     RIGHT 1      │                  │      RIGHT 2      │                  │      RIGHT 3      │
│  Land Ownership  │                  │ Cultivation Right │                  │ Season Crop Claim │
├──────────────────┤                  ├───────────────────┤                  ├───────────────────┤
│ • Registered on  │                  │ • Time-bound token│                  │ • Priority Sector │
│   7/12 & ULPIN   │                  │ • Org1 Endorsed   │                  │   KCC crop loan   │
│ • Unchanged      │                  │ • Auto-expiring   │                  │ • Yield-attached  │
│ • Zero liability │                  │ • Non-transferable│                  │ • Zero land lien  │
└──────────────────┘                  └───────────────────┘                  └───────────────────┘
```

---

## 🏛️ Statutory Law-as-Code Engine

BhuSetu encodes the **Maharashtra Agricultural Land Leasing Act (Act No. XXVIII of 2023)** directly into smart contract chaincode rules:

| Statutory Clause | Legal Principle | BhuSetu Chaincode Rule Implementation |
|---|---|---|
| **s. 3(6), 3(9)** | Lease creates no protected tenancy | Cultivation right has a **hard end date**; extension strictly requires a new recorded lease. |
| **s. 3(10)** | Possession reverts automatically at expiry | Right transitions deterministically to `EXPIRED` on lease end date; land cleanly reverts to owner with **zero civil court petitions**. |
| **s. 4(c)** | Owner not liable for tenant loans | Bank crop loan **must mature prior to lease expiration date** (`LOAN_OUTLIVES_LEASE_VIOLATION` check). |
| **s. 4(f)** | Owner may sell/mortgage during lease | Ownership update or mortgage never cancels an active seasonal cultivation right. |
| **s. 5(c), 5(o)** | No sub-lease or mortgage by tenant | Cultivation token is cryptographically non-transferable. |
| **s. 5(e)** | Loans based on crop output, not land | Bank liens attach exclusively to expected seasonal crop value, **never land title**. |
| **BhuSetu Rule** | Double Financing Safeguard | Strictly **one open bank claim per parcel per season** (`DOUBLE_FINANCING_VIOLATION` rejection). |

---

## 🔄 End-to-End System Flow

```mermaid
sequenceDiagram
    autonumber
    actor Owner as Registered Landowner
    actor Tenant as Tenant Cultivator
    actor Tahsildar as Tahsildar (Org1.MHRevenue)
    actor Bank as Lending Bank (Org2.Bank)
    participant DRUNIX as DRUNIX Ledger (bhusetu channel)
    participant UPI as NPCI UPI Rails / Oracle

    Note over Owner, Tenant: Agreement & DigiLocker e-Sign
    Owner->>Tahsildar: Submit formal lease for parcel ULPIN
    Tahsildar->>DRUNIX: Validate 7/12 extract & Endorse Cultivation Right Token (Org1)
    
    Tenant->>UPI: Initiate Monthly Rent AutoPay Mandate
    UPI->>DRUNIX: Payment Oracle commits Rent Txn hash on-chain
    
    Bank->>DRUNIX: Lookup ULPIN & verify unencumbered Cultivation Right
    Bank->>DRUNIX: Place Season Crop Claim (Org2 signature)
    Bank->>UPI: Disburse KCC Crop Loan via UPI Payout to Tenant VPA
    
    Note over Tenant, Bank: Sowing, Crop Growth & Harvest
    Tenant->>UPI: Repay KCC Loan via UPI Collect / QR
    UPI->>DRUNIX: Oracle commits repayment; Bank Claim released
    
    Note over DRUNIX: Calendar passes Lease End Date (30 Nov 2026)
    DRUNIX->>DRUNIX: Smart Contract auto-expires Token (s. 3(10)); Land reverts to Owner
```

---

## 💻 Tech Stack & System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PRESENTATION LAYER                                   │
│  Tahsildar Console   │   Bank Underwriting Portal   │   Citizen DigiLocker Mobile App  │
│  (React 18 · Vite · Tailwind CSS · Lucide Icons · i18n Multi-language: EN / HI / MR)   │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ JWT Role-based REST / WebSocket
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                                APPLICATION GATEWAY LAYER                               │
│  Node.js 20 · Express · TypeScript · Hyperledger Fabric Gateway SDK · Payment Oracle  │
└─────────────────────┬────────────────────────────────────────────────────┬─────────────┘
                      │ Fabric Endorsement RPC                             │ SHA-256 Hashes
┌─────────────────────▼─────────────────────────┐        ┌─────────────────▼─────────────┐
│             DRUNIX NETWORK LAYER              │        │       NPCI PAYMENT RAILS      │
│ • Channel: "bhusetu"                          │        │ • UPI AutoPay (Rent Mandates) │
│ • Org1: Revenue Authority (Committing Peer)   │        │ • UPI Direct Payouts (Loans)  │
│ • Org2: Commercial / RRB Banks (Committing)   │        │ • UPI Collect (Repayment)     │
│ • State Database: YugabyteDB Distributed SQL  │        │ • Core Banking API Adapter    │
│ • DPDP Private Data Collections (PII Hashed)  │        └───────────────────────────────┘
└───────────────────────────────────────────────┘
```

---

## 🎯 Key User Personas & Features

### 1. 🏛️ Tahsildar Revenue Console (`Org1.MHRevenue`)
- Inspect real-time **7/12 (Saat-Baara) land records**, survey numbers, soil types, and mutation history (*Ferfar नोंदी*).
- Digitally sign and issue **Verifiable Cultivation Tokens** backed by X.509 cryptographic certificate fingerprints.

### 2. 🏦 Bank Underwriting & Verification Portal (`Org2.Bank`)
- Instant **ULPIN-based collateral underwriting** (e.g. *Maharashtra Gramin Bank*, *Pune DCCB*, *Bank of India*).
- Automated crop yield valuation (~1.8x loan coverage on seasonal Soyabean/Cotton produce).
- Live on-chain **Double Financing check** and **Loan Outlives Lease check**.

### 3. 🌾 Citizen Farmer & Landowner Portal
- **Tenant Cultivator**: DigiLocker-integrated Verifiable Cultivation Credential, monthly UPI AutoPay rent tracking, and 1-click loan repayment.
- **Registered Landowner**: Statutory Reversion Guarantee Certificate confirming zero tenancy accrual risk under Section 3(6).

### 4. ⛓️ DRUNIX Blockchain & Chaincode Explorer
- Live block stream with Merkle roots, block heights, and endorsement signatures.
- **YugabyteDB World State** key-value store inspector.
- **DPDP Act 2023 Compliance**: Private data collections ensure citizen Aadhaar and phone numbers remain encrypted off the public ledger.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22+ recommended)
- **npm**: v9.0.0 or higher

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/s-hreya184/BhuSetu.git
cd BhuSetu

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at **`http://localhost:5173/`** to experience the live prototype.

---

## 🧪 Interactive Demo Walkthrough

Once the application is running, you can test the full lifecycle:

1. **Record Lease**: Select parcel `MH-PUNE-HAV-0042` and click **"Endorse on DRUNIX"** under Step 1.
2. **Execute UPI AutoPay**: Click **"Pay Monthly Rent"** under Step 2; input `123456` in the simulated UPI keypad.
3. **Disburse KCC Loan**: Under Step 3, disburse ₹75,000 against the Kharif 2026 Soyabean crop value.
4. **Test Law-as-Code Rejections**:
   - Click **"Test Double Financing"** to see a second bank attempt rejected by the smart contract.
   - Click **"Test Loan Outlives Lease"** to see a loan maturing after lease expiry get rejected.
5. **Harvest & Repay**: Click **"Repay Crop Loan over UPI"** to clear the loan and release the bank lien.
6. **Trigger Automated Reversion**: Click **"Simulate Expiry (Jump to Dec 2026)"** to watch the cultivation token expire and the land title revert cleanly to the owner without paperwork.

---

## 📜 Regulatory References & Data Sources

- **Maharashtra Agricultural Land Leasing Act (Act No. XXVIII of 2023)** — Guidelines notified May 2026.
- **World Bank (June 2021)**: *Agricultural Land Leasing Reform in India*, citing NSSO 70th round data.
- **National Sample Survey Office (NSS 77th Round, 2019)**: *Situation Assessment of Agricultural Households*.
- **Reserve Bank of India (RBI 2026)**: *Directions for Regional Rural Banks on Kisan Credit Card (KCC) limits for oral lessees & tenant farmers*.
- **Digital India Land Records Modernization Programme (DILRMP 3.0, Sep 2026)**: Unique Land Parcel Identification Number (ULPIN / BhuAadhaar).

---

## 📄 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.