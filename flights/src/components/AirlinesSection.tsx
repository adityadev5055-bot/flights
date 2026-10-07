import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { AIRLINES } from '../data/travelData';
import { AirlinePartner } from '../types';

interface AirlinesSectionProps {
  onSelectAirline: (airline: AirlinePartner) => void;
}

export const AirlinesSection: React.FC<AirlinesSectionProps> = ({ onSelectAirline }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="airlines-section" className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              POPULAR AIRLINES
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Fly with the World's Best Airlines
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 max-w-xl">
              We partner with top airlines to give you the best experience, safety, and comfort in the skies.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              id="airline-scroll-left"
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shadow-xs"
              title="Previous Airlines"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="airline-scroll-right"
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shadow-xs"
              title="Next Airlines"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Airline Cards Horizontal List */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
        >
          {AIRLINES.map((airline) => (
            <div
              key={airline.id}
              id={`airline-card-${airline.id}`}
              onClick={() => onSelectAirline(airline)}
              className="min-w-[190px] sm:min-w-[210px] bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between shrink-0 group"
            >
              {/* Airline Top Badge / Code */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {airline.code}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{airline.rating}</span>
                </div>
              </div>

              {/* Airline Name with stylized typography */}
              <div className="my-2">
                <div 
                  className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight"
                  style={{ borderLeft: `3px solid ${airline.accentColor}`, paddingLeft: '8px' }}
                >
                  {airline.name}
                </div>
                <div className="text-[11px] text-slate-400 font-medium pl-2.5 mt-0.5">
                  {airline.alliance}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500 group-hover:text-blue-600">
                <span>View flights</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
