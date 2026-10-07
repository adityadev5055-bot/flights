import React from 'react';
import { ArrowRight, Plane, Send } from 'lucide-react';

interface InspirationSectionProps {
  onSearchFlights: () => void;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({ onSearchFlights }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Inspiration Card: Santorini Greece */}
        <div 
          id="inspiration-banner"
          className="relative rounded-3xl overflow-hidden min-h-[340px] flex items-center shadow-xl bg-slate-900"
        >
          {/* Background: Santorini cliffside with blue domes */}
          <img
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80"
            alt="Santorini Greece cliffside and blue domes"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent w-full md:w-3/5" />

          {/* Text Content */}
          <div className="relative z-10 p-8 sm:p-14 max-w-xl text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
              TRAVEL INSPIRATION
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Turn Your Dreams <br />
              <span>Into Destinations</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Get inspired with expert travel tips, hidden gems, visa guides, and exclusive seasonal flight offers.
            </p>
            <div className="mt-6">
              <button
                id="explore-blog-btn"
                onClick={onSearchFlights}
                className="px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 group"
              >
                <span>Explore Guides</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Ready to Book Your Next Flight CTA Banner (matching bottom dark navy banner in mockup) */}
        <div 
          id="ready-to-book-banner"
          className="relative rounded-3xl overflow-hidden bg-blue-950 p-8 sm:p-12 text-center text-white shadow-xl border border-blue-900"
        >
          {/* Subtle airplane graphic accents */}
          <div className="absolute top-4 left-8 text-blue-400/20">
            <Plane className="w-16 h-16 rotate-45" />
          </div>
          <div className="absolute bottom-4 right-8 text-blue-400/20">
            <Plane className="w-20 h-20 -rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto text-blue-300">
              <Plane className="w-6 h-6 -rotate-45" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Book Your Next Flight?
            </h3>
            <p className="text-sm text-blue-200 font-normal">
              Join millions of travelers and find the best airfares with 500+ world-class airlines today.
            </p>

            <div className="pt-2">
              <button
                id="cta-search-flights-btn"
                onClick={onSearchFlights}
                className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-400/20 transition-all inline-flex items-center gap-2"
              >
                <span>Search Flights</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
