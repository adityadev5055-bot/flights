import React, { useState } from 'react';
import { 
  X, 
  Plane, 
  Clock, 
  ArrowRight, 
  Luggage, 
  Wifi, 
  Coffee, 
  Tv, 
  Check, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Ticket
} from 'lucide-react';
import { FlightResult, SearchParams, CabinClass } from '../types';
import { generateFlightsForRoute } from '../data/travelData';

interface FlightSearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams: SearchParams;
  currencySymbol: string;
}

export const FlightSearchResultsModal: React.FC<FlightSearchResultsModalProps> = ({
  isOpen,
  onClose,
  searchParams,
  currencySymbol,
}) => {
  const [filterStops, setFilterStops] = useState<'all' | 'nonstop' | 'one-stop'>('all');
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'duration' | 'best'>('price-asc');
  
  // Booking confirmation step
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [passengerName, setPassengerName] = useState('Alex Morgan');
  const [passengerEmail, setPassengerEmail] = useState('alex.morgan@example.com');
  const [selectedSeat, setSelectedSeat] = useState('14A');

  if (!isOpen) return null;

  // Generate mock flights for the selected route
  const baseFlights = generateFlightsForRoute(
    searchParams.fromCode,
    searchParams.from,
    searchParams.toCode,
    searchParams.to,
    490
  );

  // Apply filters
  let filteredFlights = baseFlights.filter((flight) => {
    if (filterStops === 'nonstop' && flight.stops > 0) return false;
    if (filterStops === 'one-stop' && flight.stops !== 1) return false;
    if (selectedAirline !== 'all' && flight.airline !== selectedAirline) return false;
    return true;
  });

  // Apply sorting
  filteredFlights.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return 0;
  });

  const handleBookNow = (flight: FlightResult) => {
    setSelectedFlight(flight);
    setBookingConfirmed(false);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="flight-results-modal"
        className="bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] backdrop-blur-xl"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <span>{searchParams.tripType.replace('-', ' ')}</span>
              <span>•</span>
              <span>{searchParams.cabinClass}</span>
              <span>•</span>
              <span>{searchParams.adults + searchParams.children} {searchParams.adults + searchParams.children === 1 ? 'Traveler' : 'Travelers'}</span>
            </div>
            <div className="flex items-center gap-3 text-lg sm:text-2xl font-extrabold tracking-tight">
              <span>{searchParams.from} ({searchParams.fromCode})</span>
              <ArrowRight className="w-5 h-5 text-blue-400" />
              <span>{searchParams.to} ({searchParams.toCode})</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Depart: <span className="font-semibold text-white">{searchParams.departDate}</span>
              {searchParams.tripType === 'round-trip' && (
                <span> | Return: <span className="font-semibold text-white">{searchParams.returnDate}</span></span>
              )}
            </div>
          </div>

          <button
            id="close-search-results-modal"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Booking Checkout Step */}
          {selectedFlight ? (
            <div className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-md">
              {!bookingConfirmed ? (
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-700 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                        CONFIRM RESERVATION
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Passenger & Ticket Details
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedFlight(null)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                    >
                      ← Back to flight list
                    </button>
                  </div>

                  {/* Summary of Flight */}
                  <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 p-4 rounded-2xl mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                        {selectedFlight.airlineCode}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{selectedFlight.airline}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{selectedFlight.flightNumber} • {selectedFlight.cabinClass}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Total Price</div>
                      <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                        {currencySymbol}{selectedFlight.price}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmReservation} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Full Passenger Name
                        </label>
                        <input
                          type="text"
                          required
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Email for Confirmation & E-Ticket
                        </label>
                        <input
                          type="email"
                          required
                          value={passengerEmail}
                          onChange={(e) => setPassengerEmail(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Select Seat Preference
                      </label>
                      <div className="flex gap-2">
                        {['12A (Window)', '12B (Middle)', '12C (Aisle)', '14A (Extra Legroom)'].map((seat) => (
                          <button
                            key={seat}
                            type="button"
                            onClick={() => setSelectedSeat(seat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              selectedSeat === seat
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {seat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700">
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Free 24h cancellation included • E-ticket delivered instantly
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
                      >
                        Confirm & Complete Reservation
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Boarding Pass Confirmation */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Your Flight is Confirmed!
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Confirmation & boarding pass have been sent to <span className="font-semibold text-slate-800 dark:text-slate-200">{passengerEmail}</span>.
                    </p>
                  </div>

                  {/* Printable-style Boarding Pass */}
                  <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-6 rounded-3xl shadow-sm text-left relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-300 dark:border-slate-700">
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{selectedFlight.airline}</div>
                        <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{selectedFlight.flightNumber}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Class</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedFlight.cabinClass}</div>
                      </div>
                    </div>

                    <div className="py-4 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{selectedFlight.fromCode}</div>
                        <div className="text-xs text-slate-500">{selectedFlight.fromCity}</div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{selectedFlight.departureTime}</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <Plane className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] text-slate-400 mt-1">{selectedFlight.duration}</span>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{selectedFlight.toCode}</div>
                        <div className="text-xs text-slate-500">{selectedFlight.toCity}</div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{selectedFlight.arrivalTime}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-slate-300 dark:border-slate-700 grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Passenger</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{passengerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Seat</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 block">{selectedSeat}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Gate</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">B12</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedFlight(null);
                        setBookingConfirmed(false);
                      }}
                      className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Book Another Flight
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Flight List & Filters */
            <>
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Stops:</span>
                  <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setFilterStops('all')}
                      className={`px-3 py-1 rounded-lg transition-all ${filterStops === 'all' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStops('nonstop')}
                      className={`px-3 py-1 rounded-lg transition-all ${filterStops === 'nonstop' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Nonstop
                    </button>
                    <button
                      onClick={() => setFilterStops('one-stop')}
                      className={`px-3 py-1 rounded-lg transition-all ${filterStops === 'one-stop' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      1 Stop
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="price-asc">Cheapest Price</option>
                    <option value="duration">Fastest Duration</option>
                  </select>
                </div>
              </div>

              {/* Flights cards list */}
              <div className="space-y-3">
                {filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 group"
                  >
                    {/* Airline & flight times */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">{flight.airline}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{flight.flightNumber}</span>
                      </div>

                      <div className="flex items-center gap-4 py-1">
                        <div>
                          <div className="text-lg font-black text-slate-900 dark:text-white">{flight.departureTime}</div>
                          <div className="text-xs text-slate-500">{flight.fromCode}</div>
                        </div>

                        <div className="flex flex-col items-center px-2">
                          <span className="text-[10px] font-bold text-slate-400">{flight.duration}</span>
                          <div className="w-20 sm:w-28 h-[2px] bg-slate-200 dark:bg-slate-700 my-1 relative">
                            <Plane className="w-3.5 h-3.5 text-blue-500 absolute left-1/2 -top-1.5 -translate-x-1/2" />
                          </div>
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                          </span>
                        </div>

                        <div>
                          <div className="text-lg font-black text-slate-900 dark:text-white">{flight.arrivalTime}</div>
                          <div className="text-xs text-slate-500">{flight.toCode}</div>
                        </div>
                      </div>

                      {/* Amenities pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {flight.features.map((feat) => (
                          <span
                            key={feat}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Book Button */}
                    <div className="md:text-right flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 pt-3 md:pt-0 md:pl-5 shrink-0">
                      <div>
                        <div className="text-xs text-slate-400">per traveler</div>
                        <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                          {currencySymbol}{flight.price}
                        </div>
                        <div className="text-[10px] text-slate-400">includes taxes & fees</div>
                      </div>

                      <button
                        onClick={() => handleBookNow(flight)}
                        className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                      >
                        Select Flight
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
