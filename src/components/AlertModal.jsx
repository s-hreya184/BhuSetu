import React from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { 
  X, 
  AlertOctagon, 
  Info, 
  Gavel, 
  FileCode2
} from 'lucide-react';

export const AlertModal = () => {
  const { alertModalData, setAlertModalData } = useBhuSetu();

  if (!alertModalData) return null;

  const isError = alertModalData.type === 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isError ? 'bg-rose-950/60 border-rose-500/30' : 'bg-indigo-950/60 border-indigo-500/30'
        }`}>
          <div className="flex items-center gap-2.5">
            {isError ? (
              <AlertOctagon className="w-5 h-5 text-rose-400" />
            ) : (
              <Info className="w-5 h-5 text-indigo-400" />
            )}
            <h3 className={`text-sm font-bold ${isError ? 'text-rose-200' : 'text-indigo-200'}`}>
              {alertModalData.title}
            </h3>
          </div>
          <button
            onClick={() => setAlertModalData(null)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Error / Alert Code Badge */}
          {alertModalData.code && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400">
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{alertModalData.code}</span>
            </div>
          )}

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 leading-relaxed space-y-2">
            <p>{alertModalData.message}</p>
          </div>

          {/* Legal / Smart Contract Context */}
          {isError && (
            <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-800/40 text-[11px] text-rose-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Gavel className="w-3.5 h-3.5" />
                <span>Law-as-Code Smart Contract Protection:</span>
              </div>
              <p className="text-slate-300">
                DRUNIX endorsement policy rejected this transaction before state mutation. No fraudulent or overlapping claim can enter the blockchain.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setAlertModalData(null)}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
            >
              Acknowledge & Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
