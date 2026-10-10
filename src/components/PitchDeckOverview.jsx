import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Building2, 
  Scale, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const PitchDeckOverview = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            National Financial Inclusion & Real Asset Tokenization Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            BhuSetu: Verifiable Cultivation Rights Architecture
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Transforming tenant farmers’ informal leases into bankable credit on NPCI’s DRUNIX, settled over UPI.
          </p>
        </div>
      </div>

      {/* 3 Pillar Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card-interactive p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-base font-bold text-white">The Core Problem</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ~21.3M rural households lease in land, yet only 13% of leases are registered because landowners fear losing ownership. Tenants lack proof of cultivation and are forced to borrow from moneylenders at 20-30% interest.
          </p>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-rose-300">
            Moneylenders supply 20.5% of total agricultural debt (NSS 2019).
          </div>
        </div>

        <div className="glass-card-interactive p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-base font-bold text-white">Tokenized Rights (DRUNIX)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instead of tokenizing immovable land, BhuSetu tokenizes 3 distinct time-bound rights on DRUNIX:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li><strong>Right 1:</strong> Ownership (Unchanged on 7/12)</li>
            <li><strong>Right 2:</strong> Time-bound Cultivation Right</li>
            <li><strong>Right 3:</strong> Bank's Season Crop Claim</li>
          </ul>
        </div>

        <div className="glass-card-interactive p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-base font-bold text-white">NPCI Settlement Rails</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every monetary step moves seamlessly over UPI: Rent via UPI AutoPay, crop loan disbursement via UPI Payout, and repayment via UPI Collect. An oracle writes immutable proofs to DRUNIX.
          </p>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-emerald-300">
            Seamless integration with AgriStack & Core Banking Systems.
          </div>
        </div>

      </div>

      {/* Architecture Flow Section (Slide 3) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Multi-Organization DRUNIX Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-400 block">User Layer</span>
            <p className="text-slate-300 text-[11px]">
              Tahsildar Console, Bank Underwriting Portal, Citizen AgriStack Mobile Web App.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-blue-400 block">Backend & Gateway</span>
            <p className="text-slate-300 text-[11px]">
              Node.js 20, Express, Fabric Gateway SDK, JWT Role-based Access Control.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block">DRUNIX Network</span>
            <p className="text-slate-300 text-[11px]">
              Channel: bhusetu, Org1 (Revenue), Org2 (Bank), Go Chaincode, YugabyteDB.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block">Payment Rails</span>
            <p className="text-slate-300 text-[11px]">
              NPCI UPI AutoPay, Payout Sandbox, Payment Oracle with SHA-256 transaction logging.
            </p>
          </div>
        </div>
      </div>

      {/* Why Now & Legal Backing (Slide 2 & Slide 9) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          Why Now: The Regulatory Window
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <strong className="text-white block mb-1">Maharashtra Leasing Act 2023</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Rules notified in Jun 2025; operational guidelines issued May 2026 allowing formal time-bound agricultural leases without tenancy risk.
            </p>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <strong className="text-white block mb-1">NPCI DRUNIX (Jun 2026)</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Open-sourcing of NPCI's high-throughput permissioned distributed ledger designed specifically for real asset tokenization.
            </p>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <strong className="text-white block mb-1">DILRMP 3.0 & ULPIN (Sep 2026)</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              National 14-digit BhuAadhaar / ULPIN linking state land records directly with digital registries.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
