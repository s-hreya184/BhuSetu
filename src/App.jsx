import React from 'react';
import { BhuSetuProvider, useBhuSetu } from './context/BhuSetuContext';
import { Navbar } from './components/Navbar';
import { GuidedDemoBar } from './components/GuidedDemoBar';
import { TahsildarConsole } from './components/TahsildarConsole';
import { BankPortal } from './components/BankPortal';
import { FarmerApp } from './components/FarmerApp';
import { DrunixExplorer } from './components/DrunixExplorer';
import { PitchDeckOverview } from './components/PitchDeckOverview';
import { UPIPaymentModal } from './components/UPIPaymentModal';
import { AlertModal } from './components/AlertModal';
import { 
  Activity, 
  Layers, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Github
} from 'lucide-react';

const MainContent = () => {
  const { activeRole, logs, drunixEngine } = useBhuSetu();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Active View Switcher */}
          {activeRole === 'walkthrough' && <GuidedDemoBar />}
          {activeRole === 'tahsildar' && <TahsildarConsole />}
          {activeRole === 'bank' && <BankPortal />}
          {activeRole === 'farmer' && <FarmerApp />}
          {activeRole === 'explorer' && <DrunixExplorer />}
          {(activeRole === 'pitch' || activeRole === 'solution') && <PitchDeckOverview />}

          {/* Real-time System Audit & Chaincode Log Console */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  DRUNIX Consensus & Chaincode Activity Stream
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Live Broadcast · Channel: bhusetu
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-slate-500 py-3 text-center text-xs">
                  Awaiting transactions... Interact with any role above to emit chaincode events.
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-start sm:items-center gap-2">
                      <span className="text-[10px] text-slate-500 shrink-0">{log.timestamp}</span>
                      <span className={`w-1.5 h-1.5 rounded-full mt-1 sm:mt-0 shrink-0 ${
                        log.type === 'success' ? 'bg-emerald-400 shadow-emerald-400/50 shadow-sm' :
                        log.type === 'error' ? 'bg-rose-400 shadow-rose-400/50 shadow-sm' :
                        log.type === 'blockchain' ? 'bg-indigo-400' : 'bg-blue-400'
                      }`} />
                      <span className={`text-xs ${
                        log.type === 'error' ? 'text-rose-300' :
                        log.type === 'success' ? 'text-emerald-300' :
                        log.type === 'blockchain' ? 'text-indigo-300' : 'text-slate-300'
                      }`}>
                        {log.message}
                      </span>
                    </div>

                    {log.rule && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-amber-500/20 whitespace-nowrap shrink-0">
                        {log.rule}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <UPIPaymentModal />
      <AlertModal />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">BhuSetu Platform</span>
            <span>·</span>
            <span>National Real Asset Tokenization & Verifiable Cultivation Rights Engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Maharashtra Act XXVIII of 2023 Compliant
            </span>
            <span>·</span>
            <span>Settled over NPCI UPI & DRUNIX</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BhuSetuProvider>
      <MainContent />
    </BhuSetuProvider>
  );
}
