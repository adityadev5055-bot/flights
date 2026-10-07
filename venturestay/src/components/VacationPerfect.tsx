import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface VacationPerfectProps {
  onBookNow: () => void;
  onExploreStays: () => void;
}

export const VacationPerfect: React.FC<VacationPerfectProps> = ({
  onBookNow,
  onExploreStays
}) => {
  return (
    <section className="w-full py-24 bg-white/10 backdrop-blur-2xl border-t border-white/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Asymmetric Photo Collage (Left / Center) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            
            {/* Left Column: Big Mountain Vista + Winding Forest Highway */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60 group h-72 sm:h-80">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                  alt="Dramatic mountain valley"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60 group h-40 sm:h-48">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Winding serpentine mountain road"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Column: River Canyon + Cavern Waterfall */}
            <div className="space-y-4 pt-6 sm:pt-8">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60 group h-48 sm:h-56">
                <img
                  src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80"
                  alt="Forest river gorge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60 group h-64 sm:h-72 relative">
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
                  alt="Hiker standing under cathedral forest waterfall light"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">
                    Verified Off-Grid Escapes
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold block mb-1">
                BESPOKE TRAVEL AGENCY PLANNING
              </span>
              <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                How our travel agency crafts your perfect journey
              </h2>
              <div className="w-24 h-1 bg-[#ff4d36] mt-4 rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              From tailor-made family expeditions and wellness retreats to high-altitude Himalayan climbs, our licensed travel advisors handle every detail. We arrange seamless private transfers, secure special wilderness permits, curate verified boutique nature lodges, and pair you with accredited private guides.
            </p>

            {/* Value checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-red-100/80 backdrop-blur-xs text-[#ff4d36] flex items-center justify-center shrink-0 border border-red-200/60">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Custom itinerary design with seamless private transfers & permits</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-100/80 backdrop-blur-xs text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>100% in-person inspected luxury wilderness retreats & chalets</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-red-100/80 backdrop-blur-xs text-[#ff4d36] flex items-center justify-center shrink-0 border border-red-200/60">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Licensed IFMGA mountain guides & local naturalists on private retainer</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-100/80 backdrop-blur-xs text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>IATA consumer bonding, full financial protection & 24/7 travel desk</span>
              </div>
            </div>

            {/* Book Trip Button */}
            <div className="pt-4 flex items-center gap-4">
              <button
                id="vacation-perfect-book-btn"
                onClick={onBookNow}
                className="px-8 py-3.5 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(255,77,54,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Plan With An Agent
              </button>

              <button
                onClick={onExploreStays}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 hover:border-blue-600 text-slate-700 hover:text-blue-600 text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Browse Stays</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
