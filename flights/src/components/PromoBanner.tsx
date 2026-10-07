import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onExploreOffers: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onExploreOffers }) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          id="promo-banner-container"
          className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-900 min-h-[300px] flex items-center"
        >
          {/* Background Image: Tropical Maldives / overwater bungalows */}
          <img
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80"
            alt="Tropical resort overwater bungalows"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Dark Tint & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent sm:w-2/3" />
          <div className="absolute inset-0 bg-blue-950/30" />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              LIMITED TIME OFFER
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Save Big on Your <br />
              <span className="text-amber-400">Next Flight</span>
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              Exclusive deals, special discounts and more for your dream journey across 120+ international destinations.
            </p>

            <div className="mt-6">
              <button
                id="promo-explore-offers-btn"
                onClick={onExploreOffers}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/25 transition-all group"
              >
                <span>Explore Offers</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Up to 50% OFF Badge on Right */}
          <div className="hidden md:flex absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 z-10">
            <div className="w-32 h-32 rounded-full bg-amber-400/90 backdrop-blur-md text-slate-950 flex flex-col items-center justify-center p-3 text-center shadow-2xl border-4 border-white/40 rotate-12 hover:rotate-0 transition-transform cursor-pointer">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">Up to</span>
              <span className="text-3xl font-black tracking-tight leading-none my-0.5">50%</span>
              <span className="text-xs font-black uppercase tracking-wider">OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
