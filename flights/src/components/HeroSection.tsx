import React, { useState } from 'react';
import { 
  Plane, 
  Building2, 
  Car, 
  Palmtree, 
  ArrowLeftRight, 
  Calendar as CalendarIcon, 
  Search, 
  ShieldCheck, 
  Headphones, 
  Lock, 
  Globe2,
  ChevronDown
} from 'lucide-react';
import { TabType, TripType, CabinClass, SearchParams } from '../types';
import { POPULAR_AIRPORTS } from '../data/travelData';

interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
  currencySymbol: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<TabType>('flights');
  const [tripType, setTripType] = useState<TripType>('round-trip');
  
  // Route selection
  const [fromCode, setFromCode] = useState('JFK');
  const [fromCity, setFromCity] = useState('New York');
  const [toCode, setToCode] = useState('LHR');
  const [toCity, setToCity] = useState('London');

  // Dates
  const [departDate, setDepartDate] = useState('2025-04-20');
  const [returnDate, setReturnDate] = useState('2025-04-27');

  // Passengers & Class
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);

  // Airport dropdown helpers
  const [selectingField, setSelectingField] = useState<'from' | 'to' | null>(null);

  // Swap locations
  const handleSwapLocations = () => {
    const tempCode = fromCode;
    const tempCity = fromCity;
    setFromCode(toCode);
    setFromCity(toCity);
    setToCode(tempCode);
    setToCity(tempCity);
  };

  const handleAirportSelect = (airport: typeof POPULAR_AIRPORTS[0]) => {
    if (selectingField === 'from') {
      setFromCity(airport.city);
      setFromCode(airport.code);
    } else if (selectingField === 'to') {
      setToCity(airport.city);
      setToCode(airport.code);
    }
    setSelectingField(null);
  };

  const handleExecuteSearch = () => {
    onSearch({
      tab: activeTab,
      tripType,
      from: fromCity,
      fromCode,
      to: toCity,
      toCode,
      departDate,
      returnDate,
      adults,
      children,
      cabinClass
    });
  };

  return (
    <div className="w-full bg-transparent text-slate-900 dark:text-slate-100 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between">
        
        {/* Hero Top Content (Title, Kicker, Subtitle) - Completely Transparent, No Images */}
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-transparent border border-slate-300 dark:border-white/20 text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
            <Globe2 className="w-3.5 h-3.5" />
            DISCOVER THE WORLD
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-white">
            Book Flights <br />
            <span className="text-slate-800 dark:text-slate-100">Easier, Faster, </span>
            <span className="font-script text-amber-500 dark:text-amber-400 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-normal italic">
              Smarter
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-xl leading-relaxed">
            Compare hundreds of airlines, find the best prices, and turn your travel dreams into reality.
          </p>
        </div>

        {/* Hero Floating Search Box & Trust Bar - Everything Transparent, No Images */}
        <div className="w-full">
          {/* Main Search Panel */}
          <div 
            id="hero-search-container"
            className="bg-transparent rounded-3xl p-5 sm:p-7 border border-slate-300/80 dark:border-white/20 backdrop-blur-xs transition-all shadow-none"
          >
            {/* Top Navigation Tabs (Flights, Hotels, Cars, Holidays) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-300/50 dark:border-white/10">
              <div className="inline-flex p-1 bg-transparent border border-slate-300/70 dark:border-white/20 rounded-2xl gap-1">
                <button
                  id="tab-flights"
                  type="button"
                  onClick={() => setActiveTab('flights')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'flights'
                      ? 'bg-transparent border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold'
                      : 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Flights</span>
                </button>

                <button
                  id="tab-hotels"
                  type="button"
                  onClick={() => setActiveTab('hotels')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'hotels'
                      ? 'bg-transparent border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold'
                      : 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Hotels</span>
                </button>

                <button
                  id="tab-cars"
                  type="button"
                  onClick={() => setActiveTab('cars')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'cars'
                      ? 'bg-transparent border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold'
                      : 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>Cars</span>
                </button>

                <button
                  id="tab-holidays"
                  type="button"
                  onClick={() => setActiveTab('holidays')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'holidays'
                      ? 'bg-transparent border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold'
                      : 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <Palmtree className="w-4 h-4" />
                  <span>Holidays</span>
                </button>
              </div>

              {/* Trip Type Selector (Round Trip, One Way, Multi-City) */}
              {activeTab === 'flights' && (
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'round-trip'}
                      onChange={() => setTripType('round-trip')}
                      className="text-blue-600 focus:ring-blue-500 bg-transparent border-slate-400"
                    />
                    <span>Round Trip</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'one-way'}
                      onChange={() => setTripType('one-way')}
                      className="text-blue-600 focus:ring-blue-500 bg-transparent border-slate-400"
                    />
                    <span>One Way</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'multi-city'}
                      onChange={() => setTripType('multi-city')}
                      className="text-blue-600 focus:ring-blue-500 bg-transparent border-slate-400"
                    />
                    <span>Multi-City</span>
                  </label>
                </div>
              )}
            </div>

            {/* Input Fields Row */}
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              {/* From Input */}
              <div className="relative lg:col-span-3">
                <div
                  id="input-from-box"
                  onClick={() => setSelectingField(selectingField === 'from' ? null : 'from')}
                  className="w-full px-4 py-3 bg-transparent hover:border-blue-500 border border-slate-300 dark:border-white/20 rounded-2xl cursor-pointer transition-all flex flex-col justify-center"
                >
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">From</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{fromCity}</span>
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-transparent border border-blue-500/40 px-2 py-0.5 rounded-md">({fromCode})</span>
                  </div>
                </div>

                {/* Airport Picker Dropdown for FROM */}
                {selectingField === 'from' && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-300 dark:border-slate-700 z-50 p-2 max-h-64 overflow-y-auto">
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Select Departure Airport</div>
                    {POPULAR_AIRPORTS.map((airport) => (
                      <div
                        key={airport.code}
                        onClick={() => handleAirportSelect(airport)}
                        className="px-3 py-2 hover:bg-blue-500/10 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{airport.city}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">{airport.name}</div>
                        </div>
                        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
                          {airport.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="hidden lg:flex items-center justify-center -mx-2 z-10">
                <button
                  id="swap-locations-button"
                  type="button"
                  onClick={handleSwapLocations}
                  className="w-9 h-9 rounded-full bg-transparent border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                  title="Swap Departure and Destination"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* To Input */}
              <div className="relative lg:col-span-3">
                <div
                  id="input-to-box"
                  onClick={() => setSelectingField(selectingField === 'to' ? null : 'to')}
                  className="w-full px-4 py-3 bg-transparent hover:border-blue-500 border border-slate-300 dark:border-white/20 rounded-2xl cursor-pointer transition-all flex flex-col justify-center"
                >
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">To</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{toCity}</span>
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-transparent border border-blue-500/40 px-2 py-0.5 rounded-md">({toCode})</span>
                  </div>
                </div>

                {/* Airport Picker Dropdown for TO */}
                {selectingField === 'to' && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-300 dark:border-slate-700 z-50 p-2 max-h-64 overflow-y-auto">
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Select Destination Airport</div>
                    {POPULAR_AIRPORTS.map((airport) => (
                      <div
                        key={airport.code}
                        onClick={() => handleAirportSelect(airport)}
                        className="px-3 py-2 hover:bg-blue-500/10 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{airport.city}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">{airport.name}</div>
                        </div>
                        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
                          {airport.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dates Row (Depart & Return) */}
              <div className="grid grid-cols-2 gap-2 lg:col-span-3">
                <div className="px-3 py-2.5 bg-transparent border border-slate-300 dark:border-white/20 rounded-2xl">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Depart</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <input
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 dark:text-white bg-transparent border-0 p-0 focus:ring-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className={`px-3 py-2.5 bg-transparent border border-slate-300 dark:border-white/20 rounded-2xl ${tripType === 'one-way' ? 'opacity-40' : ''}`}>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Return</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <input
                      type="date"
                      disabled={tripType === 'one-way'}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 dark:text-white bg-transparent border-0 p-0 focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers & Class Dropdown */}
              <div className="relative lg:col-span-2">
                <div
                  id="passenger-selector-box"
                  onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                  className="w-full px-3 py-3 bg-transparent hover:border-blue-500 border border-slate-300 dark:border-white/20 rounded-2xl cursor-pointer transition-all flex flex-col justify-center"
                >
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Travelers</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}, {cabinClass}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  </div>
                </div>

                {isPassengerDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-300 dark:border-slate-700 z-50 p-4 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Adults</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Age 12+</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={adults <= 1}
                          onClick={() => setAdults(adults - 1)}
                          className="w-7 h-7 rounded-full bg-transparent border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-slate-900 dark:text-white">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-full bg-transparent border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Children</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Age 2 - 11</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={children <= 0}
                          onClick={() => setChildren(children - 1)}
                          className="w-7 h-7 rounded-full bg-transparent border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-slate-900 dark:text-white">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 rounded-full bg-transparent border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Cabin Class</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['Economy', 'Premium Economy', 'Business', 'First'] as CabinClass[]).map((cls) => (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => setCabinClass(cls)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold text-center border transition-all ${
                              cabinClass === cls
                                ? 'bg-transparent border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-bold'
                                : 'bg-transparent border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPassengerDropdownOpen(false)}
                      className="w-full py-2 bg-transparent border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-600/10"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Search Button (Transparent Outlined Button with Blue Accent) */}
              <div className="lg:col-span-1 flex justify-end">
                <button
                  id="flight-search-submit-button"
                  type="button"
                  onClick={handleExecuteSearch}
                  className="w-full lg:w-12 h-12 rounded-2xl bg-transparent border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600/10 active:scale-95 flex items-center justify-center transition-all group cursor-pointer"
                  title="Search Flights"
                >
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="lg:hidden ml-2 font-bold text-sm">Search Flights</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges Strip - Completely Transparent, No Images */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-3 bg-transparent px-4 py-3 rounded-2xl border border-slate-300/80 dark:border-white/20">
              <div className="w-8 h-8 rounded-xl bg-transparent border border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">Best Price Guarantee</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Get the lowest fares</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-transparent px-4 py-3 rounded-2xl border border-slate-300/80 dark:border-white/20">
              <div className="w-8 h-8 rounded-xl bg-transparent border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">500+ Airlines</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Global coverage</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-transparent px-4 py-3 rounded-2xl border border-slate-300/80 dark:border-white/20">
              <div className="w-8 h-8 rounded-xl bg-transparent border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">24/7 Support</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">We're here for you</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-transparent px-4 py-3 rounded-2xl border border-slate-300/80 dark:border-white/20">
              <div className="w-8 h-8 rounded-xl bg-transparent border border-purple-500/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">Secure Booking</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Your data is safe</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
