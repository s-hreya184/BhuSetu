import React, { useState } from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  AlertOctagon, 
  Sparkles, 
  Send, 
  CreditCard, 
  Landmark, 
  ShieldAlert, 
  CalendarClock, 
  RotateCcw,
  Zap,
  Check
} from 'lucide-react';

export const GuidedDemoBar = () => {
  const {
    parcels,
    selectedParcel,
    selectedParcelUlpin,
    setSelectedParcelUlpin,
    handleRecordCultivationRight,
    handlePayRentUPI,
    handleDisburseBankLoan,
    handleTestDoubleFinancing,
    handleTestLoanOutlivesLease,
    handleRepayLoanUPI,
    handleAdvanceDate,
    handleResetSimulation,
    setActiveRole,
    t
  } = useBhuSetu();

  const lease = selectedParcel?.lease;
  const isProposed = lease?.status === 'PROPOSED';
  const isActive = lease?.status === 'ACTIVE';
  const isFinanced = lease?.status === 'FINANCED';
  const isExpired = lease?.status === 'EXPIRED';

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Digital Public Infrastructure · Real Asset Tokenization Framework
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verifiable Cultivation Rights & Credit Lifecycle
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Experience how <span className="text-emerald-400 font-semibold">BhuSetu</span> tokenizes time-bound cultivation rights on NPCI's DRUNIX distributed ledger, enables KCC crop loans with zero landowner encumbrance, enforces double financing prevention by law-as-code, and guarantees automated lease expiry and land reversion.
          </p>

          {/* Key Metrics Quick Ribbon */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 backdrop-blur">
              <span className="text-[11px] text-slate-400 font-medium block">Target Base</span>
              <span className="text-lg font-bold text-emerald-400">~21.3M</span>
              <span className="text-[10px] text-slate-500 block">Tenant Households (NSSO)</span>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 backdrop-blur">
              <span className="text-[11px] text-slate-400 font-medium block">Formally Registered</span>
              <span className="text-lg font-bold text-amber-400">13%</span>
              <span className="text-[10px] text-slate-500 block">Fearing loss of ownership</span>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 backdrop-blur">
              <span className="text-[11px] text-slate-400 font-medium block">Rights Tokenized</span>
              <span className="text-lg font-bold text-indigo-400">3 Separate</span>
              <span className="text-[10px] text-slate-500 block">Owner / Tenant / Bank Lien</span>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 backdrop-blur">
              <span className="text-[11px] text-slate-400 font-medium block">Double Financing</span>
              <span className="text-lg font-bold text-cyan-400">0% Risk</span>
              <span className="text-[10px] text-slate-500 block">1 claim/parcel-season rule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Parcel Selection Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Active Test Parcel (Maharashtra AgriStack ULPIN)
          </label>
          <div className="flex flex-wrap gap-2">
            {parcels.map((p) => {
              const isSel = p.ulpin === selectedParcelUlpin;
              return (
                <button
                  key={p.ulpin}
                  onClick={() => setSelectedParcelUlpin(p.ulpin)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                    isSel
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{p.ulpin}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/60 text-slate-300 font-sans">
                    {p.village} ({p.areaAcres} Ac)
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    p.lease?.status === 'ACTIVE' ? 'bg-emerald-400' :
                    p.lease?.status === 'FINANCED' ? 'bg-blue-400 animate-pulse' :
                    p.lease?.status === 'EXPIRED' ? 'bg-slate-500' : 'bg-amber-400'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset State
          </button>
        </div>
      </div>

      {/* 6-Step End-to-End Lifecycle Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Step 1: Tahsildar Record */}
        <div className={`rounded-xl p-5 border transition-all ${
          isProposed 
            ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10' 
            : 'bg-slate-900/50 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
              1
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Org1.MHRevenue
            </span>
          </div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Landmark className="w-4 h-4 text-indigo-400" />
            Tahsildar Records Lease
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Revenue officer verifies 7/12 extract and signs the tenant's Cultivation Right on DRUNIX.
          </p>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Tenant:</span>
              <span className="text-slate-200 font-medium">{lease?.tenant?.name || 'Santosh Shinde'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Crop / Season:</span>
              <span className="text-emerald-400 font-medium">{lease?.crop} ({lease?.season})</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Token ID:</span>
              <span className="text-indigo-400 font-mono text-[11px]">{lease?.cultivationRightTokenId || 'Pending Endorsement'}</span>
            </div>
          </div>

          <div className="mt-4">
            {isProposed ? (
              <button
                onClick={() => handleRecordCultivationRight(selectedParcelUlpin)}
                className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Endorse on DRUNIX (Org1)
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold bg-emerald-950/50 border border-emerald-800/50 py-1.5 px-3 rounded-lg">
                <Check className="w-4 h-4" />
                Cultivation Right Active on Ledger
              </div>
            )}
          </div>
        </div>

        {/* Step 2: UPI Rent AutoPay */}
        <div className={`rounded-xl p-5 border transition-all ${
          isActive && (lease?.rentPaidMonths === 0 || !lease?.lastRentTxnId)
            ? 'bg-slate-900/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/50 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
              2
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
              NPCI UPI AutoPay
            </span>
          </div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            Tenant Pays Rent over UPI
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Tenant triggers monthly rent via UPI AutoPay. Oracle writes transaction hash to DRUNIX.
          </p>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Monthly Rent:</span>
              <span className="text-slate-200 font-bold">₹{lease?.monthlyRent?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>AutoPay Mandate:</span>
              <span className="text-emerald-400 font-medium">Active (State Bank of India)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Paid To:</span>
              <span className="text-slate-300 truncate max-w-[140px]">{selectedParcel?.currentOwner?.name}</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={isProposed || isExpired}
              onClick={() => handlePayRentUPI(selectedParcelUlpin)}
              className={`w-full py-2 px-3 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-2 ${
                isProposed || isExpired
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Pay Monthly Rent (₹{lease?.monthlyRent?.toLocaleString('en-IN')})
            </button>
          </div>
        </div>

        {/* Step 3: Bank KCC Disbursal */}
        <div className={`rounded-xl p-5 border transition-all ${
          isActive && !lease?.seasonClaim
            ? 'bg-slate-900/90 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
            : 'bg-slate-900/50 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-500/30">
              3
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/50">
              Org2.MGBank
            </span>
          </div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Bank Places Season Claim
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Bank verifies verified right on-chain, attaches season lien to crop (never land), and disburses.
          </p>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Lender:</span>
              <span className="text-slate-200 font-medium">Maharashtra Gramin Bank</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Max KCC Limit:</span>
              <span className="text-cyan-400 font-bold">
                ₹{((selectedParcel?.areaAcres || 1) * 35000).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Claim Status:</span>
              <span className="text-blue-400 font-medium">
                {lease?.seasonClaim ? `Disbursed (${lease.seasonClaim.claimId})` : 'Unencumbered'}
              </span>
            </div>
          </div>

          <div className="mt-4">
            {isFinanced ? (
              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold bg-blue-950/50 border border-blue-800/50 py-1.5 px-3 rounded-lg">
                <Check className="w-4 h-4" />
                KCC Loan Disbursed & Lien Active
              </div>
            ) : (
              <button
                disabled={isProposed || isExpired}
                onClick={() => handleDisburseBankLoan(selectedParcelUlpin, 'BANK-MGB-01')}
                className={`w-full py-2 px-3 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-2 ${
                  isProposed || isExpired
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Disburse KCC Loan (₹{((selectedParcel?.areaAcres || 1) * 35000).toLocaleString('en-IN')})
              </button>
            )}
          </div>
        </div>

        {/* Step 4: Conflict Tests (Law-as-Code) */}
        <div className="rounded-xl p-5 border bg-slate-900/70 border-amber-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>

          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-500/30">
              4
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
              Chaincode Rules
            </span>
          </div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Test Conflict Rejections
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Verify how smart contracts reject duplicate financing or loans outliving the lease term.
          </p>

          <div className="mt-4 space-y-2.5">
            <button
              onClick={() => handleTestDoubleFinancing(selectedParcelUlpin)}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-500 text-amber-300 font-semibold text-xs transition flex items-center justify-between gap-2 text-left"
            >
              <div>
                <span className="block font-bold">Test Double Financing</span>
                <span className="text-[10px] text-slate-400 block">Bank 2 tries to finance same parcel</span>
              </div>
              <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
            </button>

            <button
              onClick={() => handleTestLoanOutlivesLease(selectedParcelUlpin)}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500 text-rose-300 font-semibold text-xs transition flex items-center justify-between gap-2 text-left"
            >
              <div>
                <span className="block font-bold">Test Loan Outlives Lease</span>
                <span className="text-[10px] text-slate-400 block">Maha Act s. 4(c) protection test</span>
              </div>
              <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
            </button>
          </div>
        </div>

        {/* Step 5: Loan Repayment */}
        <div className={`rounded-xl p-5 border transition-all ${
          isFinanced
            ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
            : 'bg-slate-900/50 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
              5
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
              Harvest Settlement
            </span>
          </div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            Tenant Repays Crop Loan
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Post-harvest crop sale settlement via UPI QR. Bank claim is released automatically on DRUNIX.
          </p>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Principal + Interest:</span>
              <span className="text-slate-200 font-bold">
                ₹{lease?.seasonClaim 
                  ? (lease.seasonClaim.loanAmount + Math.round(lease.seasonClaim.loanAmount * 0.07 * 5 / 12)).toLocaleString('en-IN')
                  : '₹0'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Subvention Applied:</span>
              <span className="text-emerald-400 font-medium">3% Prompt Repayment Rebate</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={!isFinanced}
              onClick={() => handleRepayLoanUPI(selectedParcelUlpin)}
              className={`w-full py-2 px-3 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-2 ${
                !isFinanced
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Repay Crop Loan over UPI
            </button>
          </div>
        </div>

        {/* Step 6: Automatic Expiry & Land Reversion */}
        <div className={`rounded-xl p-5 border transition-all ${
          isExpired
            ? 'bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/30'
            : 'bg-slate-900/50 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs border border-rose-500/30">
              6
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50">
              Maha Act s. 3(10)
            </span>
          </div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-rose-400" />
            Automatic Land Reversion
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Lease expires on hard end date (30 Nov 2026). Land reverts cleanly to Owner with zero paperwork.
          </p>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>Lease End Date:</span>
              <span className="text-slate-200 font-mono">2026-11-30</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Owner Title Status:</span>
              <span className="text-emerald-400 font-bold">100% Unencumbered</span>
            </div>
          </div>

          <div className="mt-4">
            {isExpired ? (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold bg-emerald-950/70 border border-emerald-700/50 py-2 px-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Land Reverted Cleanly to Owner!
              </div>
            ) : (
              <button
                onClick={() => handleAdvanceDate('2026-12-05')}
                className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-md shadow-rose-600/30 flex items-center justify-center gap-2"
              >
                <CalendarClock className="w-3.5 h-3.5" />
                Simulate Expiry (Jump to Dec 2026)
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
