import React from 'react';
import { ShieldCheck, Headphones, Users, Compass, CheckCircle2 } from 'lucide-react';

interface WhyChooseUsProps {
  onNavigatePage?: (pageId: string) => void;
  onPlanTripClick?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ 
  onNavigatePage = (_pageId: string) => {},
  onPlanTripClick = () => {}
}) => {
  const reasons = [
    {
      id: 'reason-1',
      title: 'Accredited & Bonded Agency',
      description: "Fully licensed with international IATA accreditation and consumer bonding, ensuring complete financial security and trust for every custom journey.",
      icon: (
        <svg className="w-8 h-8 text-[#ff4d36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      ),
      stat: 'IATA & ASTA Certified Agency',
      accentColor: 'red'
    },
    {
      id: 'reason-2',
      title: 'Dedicated Travel Specialists',
      description: "Work one-on-one with experienced destination advisors offering 24/7 concierge, private permits, arrival transfers, and direct satellite SOS support.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          <path d="M4 14h16" />
        </svg>
      ),
      stat: '24/7 In-Destination Support',
      accentColor: 'blue'
    },
    {
      id: 'reason-3',
      title: 'Turnkey Tailor-Made Trips',
      description: "From chartered flights and remote 4x4 transfers to private IFMGA mountain guides and vetted luxury wilderness retreats, we handle every detail.",
      icon: (
        <svg className="w-8 h-8 text-[#ff4d36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="4" />
          <path d="M10 15H6a4 4 0 0 0-4 4v2" />
          <circle cx="17" cy="11" r="3" />
          <path d="M21 21v-1a3 3 0 0 0-2.4-2.9" />
        </svg>
      ),
      stat: 'End-to-End Travel Logistics',
      accentColor: 'red'
    }
  ];

  return (
    <section id="why-us-section" className="w-full py-24 bg-white/10 backdrop-blur-2xl border-t border-white/20 relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Title */}
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold block mb-1">
          THE VENTURETRAVEL ADVANTAGE
        </span>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
          Why Discerning Travelers Choose Our Agency
        </h2>
        <div className="w-16 h-1 bg-[#ff4d36] mx-auto mb-16 rounded-full" />

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {reasons.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center group p-8 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-xs">
              
              {/* Circular Badge Icon */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                item.accentColor === 'blue'
                  ? 'bg-blue-50/50 backdrop-blur-md border-2 border-blue-200/60 shadow-xs group-hover:scale-110 group-hover:border-blue-600'
                  : 'bg-red-50/50 backdrop-blur-md border-2 border-red-200/60 shadow-xs group-hover:scale-110 group-hover:border-[#ff4d36]'
              }`}>
                {item.icon}
              </div>

              {/* Header */}
              <h3 className="font-syne font-bold text-xl text-slate-900 mb-2.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 max-w-xs leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Micro badge */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-xs ${
                item.accentColor === 'blue'
                  ? 'text-blue-700 bg-blue-50/60 border-blue-300/60'
                  : 'text-[#ff4d36] bg-red-50/60 border-red-300/60'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Credentials Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigatePage('insurance-bonding')}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 text-slate-800 border border-white/30 text-xs font-semibold shadow-xs transition-all cursor-pointer hover:border-[#ff4d36]"
          >
            🛡️ Verify IATA Bond & Escrow
          </button>
          <button
            onClick={() => onNavigatePage('emergency-sos')}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 text-slate-800 border border-white/30 text-xs font-semibold shadow-xs transition-all cursor-pointer hover:border-red-500"
          >
            📡 24/7 Satellite SOS Protocols
          </button>
          <button
            onClick={() => onNavigatePage('team')}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 text-slate-800 border border-white/30 text-xs font-semibold shadow-xs transition-all cursor-pointer hover:border-blue-500"
          >
            🧑‍🦯 Meet Lead Expedition Directors
          </button>
          <button
            onClick={() => onNavigatePage('reviews')}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 text-slate-800 border border-white/30 text-xs font-semibold shadow-xs transition-all cursor-pointer hover:border-amber-500"
          >
            ⭐ 520+ Verified Climber Reviews
          </button>
          <button
            onClick={onPlanTripClick}
            className="px-5 py-2 rounded-xl bg-[#ff4d36] hover:bg-red-600 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            Custom Expedition Builder →
          </button>
        </div>
      </div>
    </section>
  );
};
