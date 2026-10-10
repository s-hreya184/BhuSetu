import React, { useState } from 'react';
import { useBhuSetu } from '../context/BhuSetuContext';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles,
  QrCode
} from 'lucide-react';

export const UPIPaymentModal = () => {
  const { upiModalData, setUpiModalData } = useBhuSetu();
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  if (!upiModalData) return null;

  const handleKeyPress = (num) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    if (pin.length !== 6 && pin.length !== 4) {
      alert("Please enter a valid 4 or 6-digit UPI PIN (e.g. 123456 or 1234).");
      return;
    }

    setIsProcessing(true);
    const txnId = `NPCI/UPI/${Date.now().toString().slice(-8)}/BHUSETU`;

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setGeneratedTxnId(txnId);

      setTimeout(() => {
        if (upiModalData.onSuccess) {
          upiModalData.onSuccess(txnId);
        }
        setUpiModalData(null);
        setPin('');
        setIsSuccess(false);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with NPCI UPI Branding */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-6 py-4 flex items-center justify-between border-b border-indigo-500/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white text-xs">
              ₹
            </div>
            <span className="font-extrabold text-white text-sm tracking-wider">NPCI UPI AutoPay</span>
          </div>
          <button
            onClick={() => setUpiModalData(null)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Payment Successful!</h3>
            <p className="text-xs text-slate-400">
              Transaction recorded by NPCI Oracle on DRUNIX ledger.
            </p>
            <span className="font-mono text-xs text-indigo-400 block break-all">{generatedTxnId}</span>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Payment Summary */}
            <div className="text-center">
              <span className="text-xs text-slate-400 block">{upiModalData.purpose}</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                ₹{upiModalData.amount?.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                Zero Convenience Fee · Direct Bank Settlement
              </span>
            </div>

            {/* Payer & Payee Specs */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">From (Payer):</span>
                <span className="font-bold text-slate-200">{upiModalData.payerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Debit VPA:</span>
                <span className="font-mono text-indigo-400">{upiModalData.payerVpa}</span>
              </div>
              <div className="border-t border-slate-800/80 my-1"></div>
              <div className="flex justify-between">
                <span className="text-slate-400">To (Payee):</span>
                <span className="font-bold text-emerald-400">{upiModalData.payeeName}</span>
              </div>
            </div>

            {/* PIN Display */}
            <div>
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Enter 4 or 6 Digit UPI PIN</span>
              </div>

              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full border ${
                      pin.length > idx
                        ? 'bg-indigo-500 border-indigo-400 shadow-md shadow-indigo-500/50'
                        : 'border-slate-700 bg-slate-950'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleBackspace}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs transition"
              >
                ⌫
              </button>
              <button
                onClick={() => handleKeyPress('0')}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
              >
                0
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing || pin.length < 4}
                className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center ${
                  pin.length >= 4
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                {isProcessing ? 'Verifying...' : '✓ Pay'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
