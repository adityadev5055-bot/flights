import React from 'react';
import { Radio, ShieldAlert, PhoneCall, Satellite, Clock, HeartPulse, CheckCircle2 } from 'lucide-react';

export const EmergencySosPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Hero */}
      <div className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-red-500/30">
            <Radio className="w-3.5 h-3.5 text-[#ff4d36] animate-pulse" />
            <span>24/7 IRIDIUM SATELLITE DISPATCH OPS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Satellite Emergency & <span className="text-[#ff4d36]">Mountain Rescue Protocols</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Zero dead zones. Every expedition carries dual redundant Iridium satellite transponders linked directly to our international emergency coordination center and helicopter medevac networks.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 space-y-8">
          
          {/* Dispatch Center Callout */}
          <div className="bg-red-950/40 p-6 rounded-2xl border border-red-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <PhoneCall className="w-8 h-8 text-red-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block">
                  HOTLINE FOR ACTIVE EXPEDITIONS & FAMILY LIAISON
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-white block mt-0.5">
                  +1 (800) 492-8728 / +41 (22) 819-4400 (Zürich)
                </span>
                <p className="text-xs text-slate-400 mt-1">Monitored 24 hours a day, 365 days a year by certified wilderness medical controllers.</p>
              </div>
            </div>
          </div>

          {/* Three Tier Response Protocol */}
          <div>
            <h2 className="font-syne font-bold text-xl text-white mb-4">Three-Tiered Alpine Medevac Chain</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono font-bold text-blue-400 block mb-1">TIER 1: ON-SCENE</span>
                <h4 className="font-syne font-bold text-sm text-white mb-2">Wilderness First Response</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Immediate triage by certified WFR/WEMT guide. Deployment of Gamow hyperbaric bag, high-flow medical oxygen, and high-dose dexamethasone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">TIER 2: SATELLITE RELAY</span>
                <h4 className="font-syne font-bold text-sm text-white mb-2">Global SOS Uplink</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Live satellite telemetry and GPS coordinates transmitted to GEOS / IERCC and our agency physician on duty to confirm evacuation vectors.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono font-bold text-[#ff4d36] block mb-1">TIER 3: AIR EXTRACTION</span>
                <h4 className="font-syne font-bold text-sm text-white mb-2">Rotary High-Altitude Lift</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chartered Eurocopter AS350 B3 dispatch to high-pass or glacier landing zone for immediate transport to regional military surgical trauma facility.
                </p>
              </div>
            </div>
          </div>

          {/* Hardware list */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="font-syne font-bold text-base text-white mb-3">Field Safety Equipment Mandate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual Garmin InReach Mini 2 units per climbing party</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Iridium Extreme 9575 push-to-talk satellite phone</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Portable portable Gamow hyperbaric chamber bag</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Aluminum traction splints & trauma surgical field kit</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
