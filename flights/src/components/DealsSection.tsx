import React from 'react';
import { ArrowRight, Plus, Calendar, Plane } from 'lucide-react';
import { TOP_FLIGHT_DEALS } from '../data/travelData';
import { FlightDeal } from '../types';

interface DealsSectionProps {
  onSelectDeal: (deal: FlightDeal) => void;
  currencySymbol: string;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ onSelectDeal, currencySymbol }) => {
  return (
    <section id="deals-section" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            BEST DEALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Top Flight Deals
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
            Handpicked deals for your next adventure. Book now and save more on verified non-stop and partner routes!
          </p>
        </div>

        {/* 4 Flight Deal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_FLIGHT_DEALS.map((deal) => (
            <div
              key={deal.id}
              id={`flight-deal-card-${deal.id}`}
              onClick={() => onSelectDeal(deal)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Card Image Banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={deal.imageUrl}
                  alt={`${deal.fromCity} to ${deal.toCity}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide bg-amber-400 text-slate-950 shadow-md">
                    {deal.discountPercent}% OFF
                  </span>
                </div>

                {/* Airline Name Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                    {deal.airline}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Route */}
                  <div className="flex items-center gap-2 font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    <span>{deal.fromCity}</span>
                    <span className="text-slate-400">➔</span>
                    <span>{deal.toCity}</span>
                  </div>

                  {/* Trip Type & Class */}
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                    <span>{deal.cabinClass}</span>
                    <span>•</span>
                    <span>{deal.tripType}</span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{deal.dates}</span>
                  </div>
                </div>

                {/* Pricing & Quick Add Button */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold text-blue-600">
                        {currencySymbol}{deal.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        {currencySymbol}{deal.originalPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    id={`deal-book-btn-${deal.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDeal(deal);
                    }}
                    className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center font-bold text-lg shadow-xs transition-all active:scale-90"
                    title="Book Deal"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Deals Button */}
        <div className="mt-10 text-center">
          <button
            id="view-all-deals-btn"
            onClick={() => onSelectDeal(TOP_FLIGHT_DEALS[0])}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all group"
          >
            <span>View All Flight Deals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
