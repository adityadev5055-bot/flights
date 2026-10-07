import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface OfficeDesk {
  city: string;
  country: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const DESKS: OfficeDesk[] = [
  {
    city: 'New Delhi',
    country: 'India',
    role: 'Himalayan Expedition Operations HQ',
    address: '42 Barakhamba Road, Connaught Place, New Delhi 110001',
    phone: '+91 (11) 4892-0190',
    email: 'delhi.desk@venturetravelagency.com',
    hours: 'Mon - Sat: 08:30 - 20:00 IST'
  },
  {
    city: 'Zürich',
    country: 'Switzerland',
    role: 'European Mountain Safety & Medical Directorate',
    address: 'Bahnhofstrasse 28, 8001 Zürich, Switzerland',
    phone: '+41 (22) 819-4400',
    email: 'alpine.med@venturetravelagency.com',
    hours: 'Mon - Fri: 08:00 - 18:00 CET (24/7 Medevac Standby)'
  },
  {
    city: 'London',
    country: 'United Kingdom',
    role: 'Global Private Client & Charter Liaison',
    address: '14 Berkeley Square, Mayfair, London W1J 6BQ',
    phone: '+44 (20) 7946-0921',
    email: 'london.concierge@venturetravelagency.com',
    hours: 'Mon - Fri: 09:00 - 18:30 GMT'
  },
  {
    city: 'Puerto Natales',
    country: 'Chile',
    role: 'Patagonia & Southern Icefield Field Station',
    address: 'Costanera Pedro Montt 380, Puerto Natales, Magallanes',
    phone: '+56 (61) 241-1890',
    email: 'patagonia.base@venturetravelagency.com',
    hours: 'Daily: 07:00 - 21:00 CLT'
  }
];

export const ContactDesksPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expeditionInterest: 'High-Altitude Trekking (Himalayas)',
    preferredTravelMonth: 'Autumn 2026',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>DIRECT EXPEDITION CONSULTATION DESKS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Global Agency Desks & <span className="text-[#ff4d36]">Private Consultation</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Connect with our expedition leaders in New Delhi, Zürich, London, and Patagonia for tailored route planning, permits, and private charters.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Global Desks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {DESKS.map((d, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#ff4d36] uppercase font-bold tracking-wider block mb-1">
                  {d.role}
                </span>
                <h3 className="font-syne font-bold text-lg text-slate-900">{d.city}, {d.country}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{d.address}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs font-mono">
                <div className="text-slate-800 font-bold">{d.phone}</div>
                <div className="text-blue-600 truncate">{d.email}</div>
                <div className="text-[10px] text-slate-400">{d.hours}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 max-w-3xl mx-auto">
          
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="font-syne font-bold text-2xl text-slate-900">
              Request Private Expedition Briefing
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Our lead expedition directors respond within 4 business hours with comprehensive route dossiers and feasibility assessments.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-syne font-bold text-xl text-emerald-950">Briefing Request Confirmed</h3>
              <p className="text-xs text-emerald-800 mt-2 max-w-md mx-auto">
                Thank you, {formData.name}. Your dossier has been routed to our Lead Mountain Specialist. We will call you at {formData.phone || formData.email} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ff4d36] focus:outline-none"
                    placeholder="e.g. Marcus Vance"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ff4d36] focus:outline-none"
                    placeholder="marcus@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Telephone with Country Code</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ff4d36] focus:outline-none"
                    placeholder="+1 (555) 019-2834"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Expedition Interest</label>
                  <select
                    value={formData.expeditionInterest}
                    onChange={(e) => setFormData({ ...formData, expeditionInterest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ff4d36] focus:outline-none bg-white"
                  >
                    <option>High-Altitude Trekking (Himalayas)</option>
                    <option>Patagonia Icefield & Granite Spires</option>
                    <option>Arctic Sea Kayaking & Northern Lights</option>
                    <option>Astrophotography & Dark Sky Sanctuary</option>
                    <option>Snow Leopard Winter Tracking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Specific Expedition Goals & Details</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your party size, previous elevation experience, gear needs, or bespoke date requirements..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ff4d36] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                Submit Consultation Request
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
