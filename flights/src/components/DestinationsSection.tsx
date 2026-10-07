import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import { Destination } from '../types';

interface DestinationsSectionProps {
  onSelectDestination: (dest: Destination) => void;
  currencySymbol: string;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  currencySymbol,
}) => {
  return (
    <section id="destinations-section" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              TOP DESTINATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Destinations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
              From bustling cities to tranquil islands, find your next adventure with us.
            </p>
          </div>

          <button
            id="view-all-destinations-btn"
            onClick={() => onSelectDestination(DESTINATIONS[0])}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-2.5 transition-all group self-start md:self-auto"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Destinations Grid (4 cols x 2 rows) matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              id={`destination-card-${dest.id}`}
              onClick={() => onSelectDestination(dest)}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Destination Photo */}
              <img
                src={dest.imageUrl}
                alt={`${dest.city}, ${dest.country}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent group-hover:from-slate-950/90 transition-colors" />

              {/* Top Tag */}
              {dest.tag && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {dest.tag}
                  </span>
                </div>
              )}

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight drop-shadow-xs">
                    {dest.city}
                  </h3>
                  <p className="text-xs font-medium text-slate-300 drop-shadow-xs mt-0.5">
                    {dest.country}
                  </p>
                  <p className="text-xs font-semibold text-blue-300 mt-2">
                    Flights from {currencySymbol}{dest.priceFrom}
                  </p>
                </div>

                {/* Arrow Icon Button */}
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
