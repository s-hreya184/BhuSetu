import React, { useState } from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { 
  Cpu, 
  Layers, 
  Lock, 
  ShieldCheck, 
  Database, 
  FileCode2, 
  ArrowRight, 
  CheckCircle2, 
  Boxes, 
  Hash, 
  Clock, 
  Server,
  Code
} from 'lucide-react';

export const DrunixExplorer = () => {
  const { drunixEngine, logs } = useBhuSetu();
  const [activeTab, setActiveTab] = useState('blocks'); // 'blocks', 'state', 'rules', 'dpdp'
  const [selectedTx, setSelectedTx] = useState(null);

  const blocks = drunixEngine.blocks || [];
  const worldStateEntries = Array.from(drunixEngine.worldState.entries());
  const privateEntries = Array.from(drunixEngine.privateDataCollection.entries());

  return (
    <div className="space-y-6">
      {/* Network Overview Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">DRUNIX Network Explorer</h2>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono">
                  v2.1-fabric-fork
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Permissioned Multi-Org Ledger · Raft Consensus · YugabyteDB World State
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">BLOCK HEIGHT</span>
              <span className="text-emerald-400 font-bold text-sm">#{drunixEngine.currentBlockNumber}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PEERS</span>
              <span className="text-indigo-400 font-bold text-sm">4 Active (Org1, Org2)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'blocks'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            Live Blocks ({blocks.length})
          </button>
          <button
            onClick={() => setActiveTab('state')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'state'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            YugabyteDB World State ({worldStateEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            Go Chaincode Rules (Maha Act 2023)
          </button>
          <button
            onClick={() => setActiveTab('dpdp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'dpdp'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            DPDP Private Collections ({privateEntries.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'blocks' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blocks Stream */}
          <div className="lg:col-span-2 space-y-3">
            {blocks.map((b) => (
              <div
                key={b.blockNumber}
                className="glass-card-interactive p-4 rounded-xl border border-slate-800 space-y-2 cursor-pointer"
                onClick={() => setSelectedTx(b.transactions[0])}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                      Block #{b.blockNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {b.transactions[0]?.type || 'BATCH_TX'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {new Date(b.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-[240px]">Merkle: <strong className="text-slate-300">{b.merkleRoot}</strong></span>
                  <span className="text-emerald-400 font-bold">{b.transactionsCount} txs</span>
                </div>

                {b.transactions[0]?.chaincodeRulesValidated && (
                  <div className="pt-1 flex flex-wrap gap-1">
                    {b.transactions[0].chaincodeRulesValidated.map((r, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/20">
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Transaction Payload Inspector */}
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-5 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                Transaction JSON Inspector
              </h3>

              {selectedTx ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tx ID</span>
                    <span className="font-mono text-indigo-300 text-[11px] break-all">{selectedTx.txId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Endorsing Orgs</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTx.endorsers?.map((org, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200">
                          {org}
                        </span>
                      ))}
                    </div>
                  </div>
                  <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-64">
                    {JSON.stringify(selectedTx.payload, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-xs text-slate-500 py-6 text-center">
                  Click any block on the left to inspect cryptographic payload and endorsement signatures.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: World State */}
      {activeTab === 'state' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">
            YugabyteDB World State Key-Value Store
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worldStateEntries.map(([key, value]) => (
              <div key={key} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-xs font-bold text-indigo-400">{key}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                    State Object
                  </span>
                </div>
                <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto max-h-40">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Go Chaincode Rule Matrix */}
      {activeTab === 'rules' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-indigo-400" />
            Maharashtra Agricultural Land Leasing Act (Act XXVIII of 2023) Law-as-Code Mapping
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Statutory Act Clause</th>
                  <th className="p-3">BhuSetu Chaincode Rule Implementation</th>
                  <th className="p-3">Enforcement Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">s. 3(6), 3(9): No Protected Tenancy</td>
                  <td className="p-3 text-indigo-300">Hard end date; extension requires freshly recorded lease.</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">Automatic</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">s. 3(10): Possession Reverts at Expiry</td>
                  <td className="p-3 text-indigo-300">Right automatically transitions to EXPIRED; zero court petition required.</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">Deterministic</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">s. 4(c): Owner Not Liable for Loans</td>
                  <td className="p-3 text-indigo-300">Loan maturity date must strictly precede lease expiration date.</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 text-[10px]">Rejection Check</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">s. 5(e): Loans on Crop Value, Not Land</td>
                  <td className="p-3 text-indigo-300">Bank liens attach only to seasonal produce yield, never land title.</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">Title Shield</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">BhuSetu Safeguard: Double Financing Prevention</td>
                  <td className="p-3 text-indigo-300">Strictly 1 open claim per parcel per season. Rejects duplicate bank requests.</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px]">Consensus Guard</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: DPDP Private Data Collection */}
      {activeTab === 'dpdp' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              DPDP Act 2023 Compliant Private Data Collections
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Personal Identifiable Information (Aadhaar, Phone, Name) is NEVER written in plaintext to the public ledger. Only authorized peers access the private side-channel.
            </p>
          </div>

          <div className="space-y-3">
            {privateEntries.map(([hashKey, data]) => (
              <div key={hashKey} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-indigo-400 font-bold block">{hashKey}</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Citizen Name</span>
                    <span className="text-slate-200 font-medium">{data.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Aadhaar (Tokenized)</span>
                    <span className="text-slate-200 font-mono">{data.aadhaarMasked}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">AgriStack ID</span>
                    <span className="text-slate-200 font-mono">{data.agriStackFarmerId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">UPI VPA</span>
                    <span className="text-indigo-300 font-mono">{data.upiId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
