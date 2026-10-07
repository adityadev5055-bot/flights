import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  CreditCard,
  Download,
  Share2
} from 'lucide-react';
import { Accommodation, ExperienceGuide, BookingRequest } from '../types';

interface BookingModalProps {
  item: Accommodation | ExperienceGuide | null;
  itemType: 'stay' | 'guide';
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  itemType,
  onClose
}) => {
  if (!item) return null;

  const [checkIn, setCheckIn] = useState('2026-09-15');
  const [checkOut, setCheckOut] = useState('2026-09-18');
  const [guests, setGuests] = useState(2);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseRate = itemType === 'stay' 
    ? (item as Accommodation).pricePerNight 
    : (item as ExperienceGuide).dayRate;

  const subtotal = baseRate * (itemType === 'stay' ? calculatedNights : 1);
  const serviceFee = Math.round(subtotal * 0.08);
  const cleaningOrGearFee = itemType === 'stay' ? 45 : 30;
  const totalAmount = subtotal + serviceFee + cleaningOrGearFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'VNT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setIsSuccess(true);
  };

  const title = itemType === 'stay' 
    ? (item as Accommodation).title 
    : (item as ExperienceGuide).name;

  const location = itemType === 'stay' 
    ? `${(item as Accommodation).locationName}, ${(item as Accommodation).country}` 
    : (item as ExperienceGuide).locationName;

  const image = itemType === 'stay' 
    ? (item as Accommodation).images[0] 
    : (item as ExperienceGuide).coverImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white/40 backdrop-blur-2xl border border-white/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] my-auto text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/30 bg-white/20 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${itemType === 'stay' ? 'bg-[#ff4d36] text-white' : 'bg-blue-600 text-white'}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-bold text-base text-slate-900">
                  {isSuccess ? 'Booking Voucher Generated' : `Book Verified ${itemType === 'stay' ? 'Stay' : 'Guide'}`}
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
                  Demo • No Money Involved
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">100% Free Demo Simulator • No Credit Card or Payment Required</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/30 hover:bg-white/60 text-slate-700 transition-colors cursor-pointer border border-white/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {isSuccess ? (
            /* Success Voucher Screen */
            <div className="text-center space-y-6 animate-fadeIn py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100/70 backdrop-blur-md text-emerald-600 border-2 border-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#ff4d36] font-bold">
                  RESERVATION CODE
                </span>
                <h2 className="font-mono font-black text-3xl text-slate-900 mt-1 tracking-wider">
                  {bookingCode}
                </h2>
                <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                  A verification voucher has been dispatched to <strong className="text-slate-900">{contactEmail || 'your email'}</strong>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/30">
                  <span className="font-bold text-slate-900">{title}</span>
                  <span className="text-[#ff4d36] font-bold text-sm">${totalAmount} Total</span>
                </div>
                <div className="text-slate-600">
                  <span>Dates: </span>
                  <strong className="text-slate-900">{checkIn} to {checkOut}</strong>
                  {itemType === 'stay' && <span> ({calculatedNights} nights)</span>}
                </div>
                <div className="text-slate-600">
                  <span>Guest: </span>
                  <strong className="text-slate-900">{contactName || 'Tourist Explorer'}</strong> ({guests} Guests)
                </div>
                <div className="text-slate-600">
                  <span>Location: </span>
                  <strong className="text-slate-900">{location}</strong>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert("Your verified travel voucher PDF has been generated!")}
                  className="flex-1 py-3 rounded-xl bg-white/25 hover:bg-white/45 border border-white/40 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Voucher</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  Done Exploring
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Item Preview Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/25 backdrop-blur-xl border border-white/30">
                <img
                  src={image}
                  alt={title}
                  className="w-18 h-18 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${itemType === 'stay' ? 'text-[#ff4d36]' : 'text-blue-600'}`}>
                    {itemType === 'stay' ? 'Verified Accommodation' : 'Certified Experience Guide'}
                  </span>
                  <h4 className="font-syne font-bold text-slate-900 text-sm sm:text-base truncate">
                    {title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5 font-medium">
                    <MapPin className="w-3 h-3 text-[#ff4d36] shrink-0" />
                    <span className="truncate">{location}</span>
                  </div>
                </div>
              </div>

              {/* Date & Guest Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {itemType === 'stay' ? 'Check-in' : 'Tour Date'}
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {itemType === 'stay' ? 'Check-out' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((g) => (
                      <option key={g} value={g}>{g} {g === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-white/30">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tourist Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Legal Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60 placeholder:text-slate-500"
                  />
                  <input
                    type="email"
                    placeholder="Email for Confirmation Voucher"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60 placeholder:text-slate-500"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Phone (for SOS & check-in)"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60 placeholder:text-slate-500"
                  />
                  <input
                    type="text"
                    placeholder="Special requests, diet or gear needs"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-xl p-2.5 focus:border-[#ff4d36] focus:bg-white/60 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>${baseRate} x {itemType === 'stay' ? `${calculatedNights} nights` : '1 expedition'}</span>
                  <span className="font-mono font-bold text-slate-800">${subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{itemType === 'stay' ? 'Certified Eco-Cleaning & Linen' : 'Wilderness Safety Gear Provision'}</span>
                  <span className="font-mono font-bold text-slate-800">${cleaningOrGearFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VentureTravel Agency Protection & Insurance (8%)</span>
                  <span className="font-mono font-bold text-slate-800">${serviceFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-white/30">
                  <span>Estimated Total (Quote)</span>
                  <span className="font-mono text-[#ff4d36] text-base">${totalAmount}</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>No money involved:</strong> This is a demo exploration tool. No credit card is required, and zero real money will be charged.</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-sm tracking-wide shadow-md transition-transform hover:scale-[1.01] cursor-pointer"
              >
                Generate Demo Reservation Voucher ($0 Charged)
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
