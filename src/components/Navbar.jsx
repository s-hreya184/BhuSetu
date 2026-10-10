import React from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { 
  Landmark, 
  Building2, 
  Sprout, 
  Cpu, 
  PlayCircle, 
  Calendar, 
  ShieldCheck, 
  Globe2, 
  RotateCcw,
  Sparkles,
  FileText
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeRole, 
    setActiveRole, 
    language, 
    setLanguage, 
    t, 
    currentSimulatedDate, 
    handleAdvanceDate,
    handleResetSimulation 
  } = useBhuSetu();

  const navTabs = [
    { id: 'walkthrough', label: t.roles.walkthrough, icon: PlayCircle, badge: 'Live Demo' },
    { id: 'tahsildar', label: t.roles.tahsildar, icon: Landmark, badge: 'Revenue Dept' },
    { id: 'bank', label: t.roles.bank, icon: Building2, badge: 'Lenders' },
    { id: 'farmer', label: t.roles.farmer, icon: Sprout, badge: 'Citizen' },
    { id: 'explorer', label: t.roles.explorer, icon: Cpu, badge: 'DRUNIX' },
    { id: 'solution', label: 'Platform Architecture', icon: FileText, badge: 'Blueprint' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            DRUNIX Testnet Live
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 font-mono text-[11px] hidden md:inline">
            Channel: <strong className="text-indigo-400">bhusetu</strong> · State: <strong className="text-amber-400">YugabyteDB</strong>
          </span>
          <span className="text-slate-400 hidden lg:inline">|</span>
          <span className="text-cyan-300 font-medium text-[11px] hidden lg:inline flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 inline" />
            {t.lawBadge}
          </span>
        </div>

        {/* Time Warp Controller */}
        <div className="flex items-center gap-2 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-inner">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">Simulated Date:</span>
          <span className="font-mono font-bold text-xs text-amber-300 bg-slate-800 px-2 py-0.5 rounded border border-amber-500/20">
            {new Date(currentSimulatedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>

          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={() => handleAdvanceDate('2026-06-15')}
              title="Kharif Sowing Season (Jun 2026)"
              className={`px-1.5 py-0.5 text-[10px] rounded transition ${
                currentSimulatedDate === '2026-06-15' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Jun
            </button>
            <button
              onClick={() => handleAdvanceDate('2026-08-20')}
              title="Mid-Season Crop (Aug 2026)"
              className={`px-1.5 py-0.5 text-[10px] rounded transition ${
                currentSimulatedDate === '2026-08-20' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Aug
            </button>
            <button
              onClick={() => handleAdvanceDate('2026-10-15')}
              title="Harvest Season (Oct 2026)"
              className={`px-1.5 py-0.5 text-[10px] rounded transition ${
                currentSimulatedDate === '2026-10-15' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Oct
            </button>
            <button
              onClick={() => handleAdvanceDate('2026-12-05')}
              title="Post-Lease Expiry (Dec 2026) -> Trigger Automatic Land Reversion"
              className={`px-2 py-0.5 text-[10px] rounded font-bold transition flex items-center gap-1 ${
                currentSimulatedDate === '2026-12-05' 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' 
                  : 'bg-rose-950/70 text-rose-300 border border-rose-700/50 hover:bg-rose-900'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              Dec (Revert)
            </button>
          </div>

          <button
            onClick={handleResetSimulation}
            title="Reset Simulation to Initial State"
            className="ml-1 p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveRole('walkthrough')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 text-lg">
                  भू
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {t.appTitle}
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  DRUNIX + NPCI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Verifiable Cultivation Rights · Bankable Credit · UPI Settlement
              </p>
            </div>
          </div>

          {/* Navigation Persona Switcher */}
          <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRole === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRole(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 pl-2">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="en">English (EN)</option>
              <option value="mr">मराठी (MR)</option>
              <option value="hi">हिंदी (HI)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
