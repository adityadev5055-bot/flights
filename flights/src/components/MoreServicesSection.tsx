import React from 'react';
import { ArrowRight, Building, Car, Palmtree } from 'lucide-react';
import { TabType } from '../types';

interface MoreServicesProps {
  onSelectService: (service: TabType) => void;
}

export const MoreServicesSection: React.FC<MoreServicesProps> = ({ onSelectService }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with Flying Airplane in Clouds */}
        <div 
          id="more-services-banner"
          className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[220px] flex items-center p-8 sm:p-12 mb-8 shadow-xl"
        >
          {/* Background Image: Airplane flying through clouds */}
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
            alt="Airplane flying over clouds"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent w-full md:w-3/5" />

          {/* Text Content */}
          <div className="relative z-10 max-w-xl text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              More Than Just Flight Bookings
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-200">
              Plan your complete trip with hotels, cars, and holiday packages — all in one convenient place.
            </p>
            <div className="mt-4">
              <button
                id="explore-more-services-btn"
                onClick={() => onSelectService('hotels')}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 group"
              >
                <span>Explore More Services</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hotels */}
          <div
            id="service-card-hotels"
            onClick={() => onSelectService('hotels')}
            className="group rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Hotel Room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-xs">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Hotels
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Find the perfect stay across 2M+ hotels, villas, and apartments worldwide.
              </p>
            </div>
          </div>

          {/* Car Rental */}
          <div
            id="service-card-cars"
            onClick={() => onSelectService('cars')}
            className="group rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                alt="Modern Car Rental"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-xs">
                <Car className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Car Rental
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Drive your adventure with flexible pick-up locations and best rental rates.
              </p>
            </div>
          </div>

          {/* Holiday Packages */}
          <div
            id="service-card-holidays"
            onClick={() => onSelectService('holidays')}
            className="group rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"
                alt="Beach Resort Holiday"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-xs">
                <Palmtree className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Holiday Packages
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Curated experiences, bundled flights, and hotels designed for unforgettable holidays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
