import React, { useState } from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { TAHSILDAR_OFFICER } from '../data/mockData';
import { 
  Landmark, 
  FileCheck2, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Layers, 
  User, 
  AlertCircle,
  FileText,
  BadgeCheck,
  Send
} from 'lucide-react';

export const TahsildarConsole = () => {
  const {
    parcels,
    selectedParcel,
    selectedParcelUlpin,
    setSelectedParcelUlpin,
    handleRecordCultivationRight
  } = useBhuSetu();

  const [searchQuery, setSearchQuery] = useState(selectedParcelUlpin);
  const [activeTab, setActiveTab] = useState('712'); // '712', 'endorse', 'registry'

  const lease = selectedParcel?.lease;
  const isProposed = lease?.status === 'PROPOSED';
  const isActive = lease?.status === 'ACTIVE' || lease?.status === 'FINANCED';

  const handleSearch = (e) => {
    e.preventDefault();
    const found = parcels.find(p => 
      p.ulpin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedParcelUlpin(found.ulpin);
    }
  };

  return (
    <div className="space-y-6">
      {/* Officer Header Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Landmark className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{TAHSILDAR_OFFICER.name}</h2>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                Org1 Committing Peer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {TAHSILDAR_OFFICER.designation} · {TAHSILDAR_OFFICER.office}
            </p>
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              Cert Fingerprint: <span className="text-indigo-400">{TAHSILDAR_OFFICER.digitalCertFingerprint.slice(0, 24)}...</span>
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ULPIN, Survey #, Village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
          >
            Lookup
          </button>
        </form>
      </div>

      {/* Main Working Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: 7/12 & AgriStack Land Record */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Maharashtra 7/12 (Saat-Baara) & ULPIN Extract
                  </h3>
                  <span className="text-xs text-slate-400">
                    Source: MahaBhulekh / DILRMP 3.0 Real-time Land Stack
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                {selectedParcel?.ulpin}
              </span>
            </div>

            {/* Land Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-5">
              <div>
                <span className="text-[11px] text-slate-400 block">Survey / Gat No.</span>
                <span className="text-sm font-bold text-slate-200">{selectedParcel?.surveyNumber}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Village / Taluka</span>
                <span className="text-sm font-bold text-slate-200">{selectedParcel?.village}, {selectedParcel?.taluka}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Total Area</span>
                <span className="text-sm font-bold text-emerald-400">{selectedParcel?.areaAcres} Acres</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Soil / Irrigation</span>
                <span className="text-sm font-bold text-slate-200 truncate block">{selectedParcel?.soilType}</span>
              </div>
            </div>

            {/* Registered Owner Details */}
            <div className="mb-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Right 1: Land Ownership (Kabjedar / Titleholder - Unchanged)
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-100 text-sm">{selectedParcel?.currentOwner.name}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Aadhaar: <span className="font-mono text-slate-300">{selectedParcel?.currentOwner.aadhaarMasked}</span> · UPI: <span className="font-mono text-indigo-400">{selectedParcel?.currentOwner.upiId}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Clear Title · 0 Encumbrances
                </div>
              </div>
            </div>

            {/* Mutation Register History */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Recent Mutation Entries (Ferfar नोंदी)
              </span>
              <div className="space-y-2">
                {selectedParcel?.sevenTwelve.mutations.map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-indigo-500/20">
                        {m.code}
                      </span>
                      <span className="text-slate-300">{m.desc}</span>
                    </div>
                    <span className="text-slate-500 text-[11px] font-mono">{m.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: DRUNIX Lease Endorsement Action */}
        <div className="space-y-6">
          <div className="glass-panel-glow rounded-2xl p-6 border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">DRUNIX Cultivation Right</h3>
            </div>

            {lease ? (
              <div className="space-y-4 text-xs">
                {/* Status Indicator */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Lease Agreement:</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    isProposed ? 'bg-amber-950 text-amber-400 border border-amber-700/50' :
                    isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {lease.status}
                  </span>
                </div>

                {/* Tenant Details */}
                <div className="space-y-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cultivator/Tenant:</span>
                    <span className="font-bold text-slate-100">{lease.tenant.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AgriStack ID:</span>
                    <span className="font-mono text-indigo-400">{lease.tenant.agriStackFarmerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Season & Crop:</span>
                    <span className="font-medium text-emerald-400">{lease.crop} ({lease.season})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lease Validity:</span>
                    <span className="font-mono text-slate-200">{lease.startDate} to {lease.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Agreed Rent:</span>
                    <span className="font-bold text-slate-200">₹{lease.monthlyRent.toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>

                {/* Maharashtra Law-as-Code Compliance Checklist */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-[11px]">
                  <span className="font-semibold text-slate-300 block mb-1">Chaincode Rule Validations:</span>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Maha Act s. 3(6): Hard end date (No tenancy accrual)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Maha Act s. 3(10): Auto-reversion on {lease.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>DPDP Act: PII hashed in private collection</span>
                  </div>
                </div>

                {/* Action button */}
                {isProposed ? (
                  <button
                    onClick={() => handleRecordCultivationRight(selectedParcel.ulpin)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Sign & Record Cultivation Right (Org1)
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-emerald-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Recorded on DRUNIX Ledger
                    </div>
                    <p className="text-[11px] font-mono text-emerald-400/80 break-all">
                      Token: {lease.cultivationRightTokenId}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                No pending lease on this parcel. Parcel is currently unleased.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
