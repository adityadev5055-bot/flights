import React from 'react';
import { Leaf, TreePine, Droplets, ShieldCheck, CheckCircle2, Award, HeartHandshake } from 'lucide-react';

export const SustainabilityPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>TRANSPARENT CONSERVATION LEDGER</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Eco-Charter & <span className="text-emerald-400">Carbon Offset Ledger</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Wilderness travel should protect the ecosystems we cherish. Every VentureTravel expedition automatically allocates 8% of total revenue directly to indigenous conservation, tree planting, and zero-waste high-altitude cleanups.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800 text-center">
            <div>
              <span className="block text-3xl font-black font-syne text-emerald-400">42,400+</span>
              <span className="text-xs text-slate-400">Native Saplings Planted</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-syne text-blue-400">100%</span>
              <span className="text-xs text-slate-400">Single-Use Plastic Banned</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-syne text-amber-400">14.8 Tons</span>
              <span className="text-xs text-slate-400">Glacial Moraine Trash Removed</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-syne text-[#ff4d36]">8.0%</span>
              <span className="text-xs text-slate-400">Gross Fee to Conservation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          
          <div>
            <h2 className="font-syne font-bold text-2xl text-slate-900 mb-2">Our Five Wilderness Covenants</h2>
            <p className="text-xs text-slate-500">Every guide, climber, and client signs our mandatory Leave No Trace Plus charter.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: '1. Human Waste Pack-Out Protocol', desc: 'At elevations above 4,000m and on sheet ice gorges, Clean Mountain Cans (CMC) and biodegradable wag bags are mandatory. Zero biological trace is left on the glacier.' },
              { title: '2. 100% Local Guide Equity', desc: 'All regional guides receive full medical insurance, fair living wages (35% above regional baseline), and top-tier mountain equipment provided free of charge.' },
              { title: '3. Solar & Geothermal Basecamps', desc: 'We forbid diesel generators at our signature eco-camps. All charging and interior warmth is derived from passive solar gain, wood-pellet stoves, and solar arrays.' },
              { title: '4. High-Altitude Trail Sweep', desc: 'Every expedition team carries extra pack sacks dedicated to collecting historical plastic waste and food wrappers discarded along popular passes.' }
            ].map((cov, i) => (
              <div key={i} className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/60">
                <h4 className="font-syne font-bold text-sm text-emerald-950 mb-1">{cov.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{cov.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h3 className="font-syne font-bold text-lg text-slate-900 mb-3">Audited Conservation Partnerships</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Snow Leopard Conservancy India Trust (SLC-IT)',
                'Torres del Paine Legacy Fund (Chile)',
                'Nordic Fjord Marine Research Foundation',
                'UIAA Clean Mountain Project',
                'Himalayan Clean Air Initiative'
              ].map((p, idx) => (
                <span key={idx} className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
