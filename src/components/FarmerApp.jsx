import React, { useState } from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { 
  Sprout, 
  UserCheck, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Send, 
  Check, 
  AlertCircle,
  FileCheck2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const FarmerApp = () => {
  const {
    selectedParcel,
    selectedParcelUlpin,
    handlePayRentUPI,
    handleRepayLoanUPI,
    currentSimulatedDate
  } = useBhuSetu();

  const [personaView, setPersonaView] = useState('tenant'); // 'tenant' or 'owner'

  const lease = selectedParcel?.lease;
  const owner = selectedParcel?.currentOwner;
  const tenant = lease?.tenant;
  const isFinanced = lease?.status === 'FINANCED';
  const isExpired = lease?.status === 'EXPIRED';

  return (
    <div className="space-y-6">
      {/* Persona Toggle Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Citizen AgriStack Portal</h2>
            <p className="text-xs text-slate-400">
              Select persona view to experience the farmer or owner perspective:
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setPersonaView('tenant')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              personaView === 'tenant'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🌾 Tenant Farmer View
          </button>
          <button
            onClick={() => setPersonaView('owner')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              personaView === 'owner'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏡 Landowner View
          </button>
        </div>
      </div>

      {/* Conditional Rendering Based on Persona */}
      {personaView === 'tenant' ? (
        /* ================= TENANT FARMER VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: DigiLocker Verifiable Cultivation Credential Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    VC
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                      AgriStack / DigiLocker
                    </span>
                    <h3 className="text-sm font-bold text-white">Verifiable Cultivation Pass</h3>
                  </div>
                </div>
                <QrCode className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Farmer Info */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Cultivator Name</span>
                  <span className="text-base font-bold text-white">{tenant?.name || 'Santosh Baburao Shinde'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">AgriStack ID</span>
                    <span className="font-mono text-[11px] text-emerald-300 font-semibold">{tenant?.agriStackFarmerId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Aadhaar (Masked)</span>
                    <span className="font-mono text-[11px] text-slate-300">{tenant?.aadhaarMasked}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-emerald-900/60 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tokenized Right:</span>
                    <span className="font-mono text-emerald-400 font-bold">{lease?.cultivationRightTokenId || 'Pending'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parcel ULPIN:</span>
                    <span className="font-mono text-slate-200">{selectedParcel?.ulpin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Season / Area:</span>
                    <span className="text-slate-200">{lease?.season} ({selectedParcel?.areaAcres} Acres)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Validity:</span>
                    <span className="text-slate-200">{lease?.startDate} to {lease?.endDate}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-400/90 font-mono">
                  <span>DRUNIX Verified</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Org1 Signed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payments & Loan Management */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Rent AutoPay Status Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Monthly Rent AutoPay (UPI)</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                  Mandate Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Monthly Rent</span>
                  <span className="text-base font-bold text-white">₹{lease?.monthlyRent?.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Total Paid So Far</span>
                  <span className="text-base font-bold text-emerald-400">
                    ₹{((lease?.rentPaidMonths || 0) * (lease?.monthlyRent || 0)).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block">({lease?.rentPaidMonths || 0} months settled)</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Landowner VPA</span>
                  <span className="font-mono text-indigo-400 truncate block">{owner?.upiId}</span>
                </div>
              </div>

              <button
                disabled={isExpired}
                onClick={() => handlePayRentUPI(selectedParcelUlpin)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                Trigger Next Monthly Rent AutoPay (₹{lease?.monthlyRent?.toLocaleString('en-IN')})
              </button>
            </div>

            {/* KCC Crop Loan Status Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <Sprout className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">Bank Crop Loan (Kisan Credit Card)</h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isFinanced 
                    ? 'bg-blue-950 text-blue-300 border-blue-500/30' 
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {isFinanced ? 'Active Loan Disbursed' : 'No Active Loan'}
                </span>
              </div>

              {isFinanced ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-1">Sanctioned Loan</span>
                      <span className="text-base font-bold text-cyan-400">
                        ₹{lease.seasonClaim.loanAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500 block">{lease.seasonClaim.bankName}</span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-1">Maturity Date</span>
                      <span className="text-sm font-mono font-bold text-slate-200">{lease.seasonClaim.maturityDate}</span>
                      <span className="text-[10px] text-emerald-400 block">Post-Harvest Settlement</span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-1">Interest Rate</span>
                      <span className="text-sm font-bold text-emerald-400">4.0% p.a.</span>
                      <span className="text-[10px] text-slate-500 block">(with 3% prompt rebate)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-emerald-950/30 rounded-xl border border-emerald-500/30">
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">Harvest Proceeds Ready?</span>
                      <span className="text-[11px] text-slate-300">
                        Repay loan via UPI to release DRUNIX season lien and renew credit limit for next season.
                      </span>
                    </div>
                    <button
                      onClick={() => handleRepayLoanUPI(selectedParcelUlpin)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition shrink-0 shadow-md"
                    >
                      Repay Crop Loan over UPI
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                  <span>No active crop loan. Eligible for up to ₹{((selectedParcel?.areaAcres || 1) * 35000).toLocaleString('en-IN')} via Bank Portal.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* ================= LANDOWNER VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Reversion Guarantee Certificate */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-indigo-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
                      Guaranteed by Law-as-Code
                    </span>
                    <h3 className="text-sm font-bold text-white">Reversion Certificate</h3>
                  </div>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Registered Landowner</span>
                  <span className="text-base font-bold text-white">{owner?.name}</span>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-indigo-900/60 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>0 Risk of Adverse Possession</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Under Section 3(6) of Maharashtra Act XXVIII of 2023, recording this lease creates <strong>NO tenancy rights</strong>. Land reverts automatically to your name on <strong>{lease?.endDate}</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-indigo-900/60 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>0 Liability for Tenant Loans</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Under Section 4(c), bank claims attach only to the tenant's crop yield, <strong>never to your land title</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Rent Inflow & Title Status */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                Rent Receipts from Tenant
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Agreed Monthly Rent</span>
                  <span className="text-base font-bold text-white">₹{lease?.monthlyRent?.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Direct Bank Receipts</span>
                  <span className="text-base font-bold text-emerald-400">
                    ₹{((lease?.rentPaidMonths || 0) * (lease?.monthlyRent || 0)).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Title Status</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    100% Unencumbered
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                <span className="font-bold text-slate-200 block mb-1">Scheduled Reversion Date:</span>
                <p className="text-slate-400">
                  On <span className="text-white font-mono font-bold">{lease?.endDate}</span>, the DRUNIX smart contract will mark this lease EXPIRED. No revenue court petition or physical handover verification is required.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
