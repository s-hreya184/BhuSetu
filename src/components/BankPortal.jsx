import React, { useState } from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { REGISTERED_BANKS } from '../data/mockData';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  CreditCard, 
  Send, 
  BadgeAlert, 
  Info, 
  FileCheck, 
  ArrowUpRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const BankPortal = () => {
  const {
    parcels,
    selectedParcel,
    selectedParcelUlpin,
    setSelectedParcelUlpin,
    handleDisburseBankLoan,
    handleTestDoubleFinancing,
    handleTestLoanOutlivesLease
  } = useBhuSetu();

  const [selectedBankId, setSelectedBankId] = useState(REGISTERED_BANKS[0].id);
  const [loanAmount, setLoanAmount] = useState(75000);
  const [maturityDate, setMaturityDate] = useState("2026-11-20");

  const currentBank = REGISTERED_BANKS.find(b => b.id === selectedBankId) || REGISTERED_BANKS[0];
  const lease = selectedParcel?.lease;
  const isCultivationRightActive = lease?.status === 'ACTIVE';
  const isAlreadyFinanced = lease?.status === 'FINANCED';
  const isExpired = lease?.status === 'EXPIRED';

  const maxEligibleAmount = selectedParcel ? Math.round(selectedParcel.areaAcres * currentBank.maxLimitPerAcre) : 75000;

  return (
    <div className="space-y-6">
      {/* Bank Header Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Building2 className="w-7 h-7 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{currentBank.name}</h2>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                Org2 Lite + Committing Peer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentBank.branch} · Scheme: <span className="text-emerald-400 font-medium">{currentBank.kccProduct}</span>
            </p>
          </div>
        </div>

        {/* Bank Switcher Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400">Switch Lender:</span>
          <select
            value={selectedBankId}
            onChange={(e) => setSelectedBankId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {REGISTERED_BANKS.map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Verification & Underwriting Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: On-Chain Verification Engine */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    DRUNIX Instant Verification & Underwriting
                  </h3>
                  <p className="text-xs text-slate-400">
                    Target Parcel ULPIN: <span className="font-mono text-indigo-300 font-bold">{selectedParcel?.ulpin}</span>
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isCultivationRightActive ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' :
                isAlreadyFinanced ? 'bg-blue-950 text-blue-300 border-blue-500/30' :
                isExpired ? 'bg-slate-800 text-slate-400 border-slate-700' :
                'bg-amber-950 text-amber-300 border-amber-500/30'
              }`}>
                {isCultivationRightActive ? '✓ Verified Active Cultivation Right' :
                 isAlreadyFinanced ? '⚠️ Financed (1 Claim Active)' :
                 isExpired ? 'Expired Lease' : 'Pending Revenue Endorsement'}
              </span>
            </div>

            {/* 4-Point Automated Verification Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Cultivation Right Token</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {lease?.cultivationRightTokenId 
                      ? `Signed by ${TAHSILDAR_OFFICER.name} (${lease.cultivationRightTokenId})`
                      : 'Not endorsed on DRUNIX yet'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">DPDP Verified Identity</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Tenant: {lease?.tenant?.name || 'N/A'} (AgriStack: {lease?.tenant?.agriStackFarmerId})
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Expected Crop Value</span>
                  <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">
                    ₹{lease?.estimatedCropValue?.toLocaleString('en-IN') || '0'} ({lease?.crop}) · ~1.8x Cover
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <BadgeAlert className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Encumbrance / Claim Check</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {isAlreadyFinanced 
                      ? `Active Claim held by ${lease.seasonClaim.bankName}`
                      : '0 Competing Claims (Eligible for instant disbursal)'}
                  </span>
                </div>
              </div>

            </div>

            {/* Legal Protection Card for Banks */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                <Info className="w-4 h-4 text-blue-400" />
                Statutory Bank Protections (Maha Act XXVIII of 2023)
              </div>
              <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                <li><strong className="text-white">Section 5(e):</strong> Bank crop loan lien attaches directly to seasonal yield, bypassing civil court delays.</li>
                <li><strong className="text-white">Section 4(c):</strong> Owner cannot be burdened with tenant debt; repayment is bound to harvest UPI proceeds.</li>
                <li><strong className="text-white">Priority Sector Lending (PSL):</strong> 100% compliant with RBI 2026 Tenant Farmer credit directives.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Loan Disbursal Action Card */}
        <div className="space-y-6">
          <div className="glass-panel-glow rounded-2xl p-6 border border-blue-500/30">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              KCC Loan Underwriting
            </h3>

            {isAlreadyFinanced ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-950/70 rounded-xl border border-blue-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-300 font-medium">Claim ID:</span>
                    <span className="text-xs font-mono font-bold text-white">{lease.seasonClaim.claimId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-300 font-medium">Financed Bank:</span>
                    <span className="text-xs font-bold text-white">{lease.seasonClaim.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-300 font-medium">Amount Disbursed:</span>
                    <span className="text-sm font-bold text-emerald-400">₹{lease.seasonClaim.loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-300 font-medium">Maturity Date:</span>
                    <span className="text-xs font-mono text-slate-200">{lease.seasonClaim.maturityDate}</span>
                  </div>
                </div>

                <p className="text-[11px] text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                  🔒 Parcel is locked under active season claim. Double financing rule prevents any secondary loans.
                </p>

                <button
                  onClick={() => handleTestDoubleFinancing(selectedParcelUlpin)}
                  className="w-full py-2.5 px-3 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/50 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Test Attempting Second Loan (Double Financing)
                </button>
              </div>
            ) : isCultivationRightActive ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Sanction Amount (₹): <span className="text-slate-100 font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </label>
                  <input
                    type="range"
                    min="20000"
                    max={maxEligibleAmount || 120000}
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Min: ₹20,000</span>
                    <span>Max: ₹{maxEligibleAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Loan Maturity Date:
                  </label>
                  <input
                    type="date"
                    value={maturityDate}
                    onChange={(e) => setMaturityDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Lease ends on: <strong className="text-slate-200">{lease.endDate}</strong>
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Annual Interest:</span>
                    <span className="text-emerald-400 font-bold">{currentBank.interestRateAnnual}% (Subvention eligible)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Disbursal Channel:</span>
                    <span className="text-blue-400 font-medium">NPCI UPI Direct Payout</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDisburseBankLoan(selectedParcel.ulpin, currentBank.id, loanAmount, maturityDate)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Place Claim & Disburse ₹{loanAmount.toLocaleString('en-IN')} via UPI
                </button>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleTestLoanOutlivesLease(selectedParcelUlpin)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 text-[11px] font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    Test Invalid Maturity Past Lease End (s. 4(c))
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-amber-500/70" />
                Cultivation Right is not active on DRUNIX. Must be endorsed by Tahsildar first.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
