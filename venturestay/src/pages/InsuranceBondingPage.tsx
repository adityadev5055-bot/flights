import React from 'react';
import { ShieldCheck, Award, Lock, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const InsuranceBondingPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CONSUMER FINANCIAL PROTECTION & IATA ACCREDITATION</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            IATA Bonding & <span className="text-[#ff4d36]">Travel Protection Guarantee</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            VentureTravel Agency is bonded with IATA (#96-24810) and ASTA (#4489). Every payment is held in segregated trust escrow accounts until your expedition successfully concludes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <Lock className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-syne font-bold text-base text-slate-900 mb-1">100% Segregated Trust Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your expedition deposits are never used for general agency overhead. Funds remain in independent client trust accounts until field execution.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-syne font-bold text-base text-slate-900 mb-1">$500,000 Medevac Evacuation Bond</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-authorized rotary and fixed-wing search & rescue guarantee with Global Rescue and Ripcord without demanding upfront payment on the mountain.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <FileCheck className="w-8 h-8 text-[#ff4d36] mb-3" />
              <h3 className="font-syne font-bold text-base text-slate-900 mb-1">Weather & Avalanche Interruption</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If technical mountain passes are officially closed by government order due to severe avalanches, credit transfers or alternate route re-routing are guaranteed.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <h4 className="font-syne font-bold text-sm text-slate-900">Official Accreditation Numbers</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                • International Air Transport Association (IATA): <strong>#96-24810</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                • American Society of Travel Advisors (ASTA): <strong>#4489</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                • Indian Association of Tour Operators (IATO): <strong>Active Member</strong>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                • Swiss Tour Operator Guarantee Fund: <strong>Member #CH-9921</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
