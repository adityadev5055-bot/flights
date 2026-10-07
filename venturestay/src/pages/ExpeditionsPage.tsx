import React, { useState } from 'react';
import { SIGNATURE_EXPEDITIONS, Expedition } from '../data/expeditionsData';
import { 
  Mountain, Calendar, Users, ShieldAlert, ArrowRight, CheckCircle2, 
  MapPin, Clock, Compass, DollarSign, Download, Sparkles, ChevronRight,
  TrendingUp, Award, Layers
} from 'lucide-react';

interface ExpeditionsPageProps {
  onBookExpedition: (expedition: Expedition) => void;
  onNavigatePage: (pageId: string) => void;
}

export const ExpeditionsPage: React.FC<ExpeditionsPageProps> = ({ 
  onBookExpedition,
  onNavigatePage 
}) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(SIGNATURE_EXPEDITIONS[0].id);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  const selectedExpedition = SIGNATURE_EXPEDITIONS.find(e => e.id === selectedExpId) || SIGNATURE_EXPEDITIONS[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] pb-24">
      {/* Header Banner */}
      <div className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=80" 
            alt="Mountains" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#ff4d36]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ff4d36] uppercase font-bold mb-3">
            <Mountain className="w-4 h-4" />
            <span>VENTURETRAVEL SIGNATURE EXPEDITIONS</span>
          </div>

          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl">
            Multi-Day Wilderness <span className="text-[#ff4d36]">Expeditions & Treks</span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Turnkey, fully-guided mountaineering circuits and winter ice crossings. Led by certified UIAGM/IFMGA masters with private bivouac logistics, hyperbaric safety chambers, and five-star alpine cuisine.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
            <div>
              <span className="block text-2xl font-black font-syne text-[#ff4d36]">100%</span>
              <span className="text-xs text-slate-400">Licensed UIAGM Guides</span>
            </div>
            <div>
              <span className="block text-2xl font-black font-syne text-blue-400">1:4</span>
              <span className="text-xs text-slate-400">Max Climber-to-Guide Ratio</span>
            </div>
            <div>
              <span className="block text-2xl font-black font-syne text-emerald-400">Zero</span>
              <span className="text-xs text-slate-400">Carbon Footprint (100% Offset)</span>
            </div>
            <div>
              <span className="block text-2xl font-black font-syne text-amber-400">Satellite</span>
              <span className="text-xs text-slate-400">24/7 Medevac Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Expedition Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {SIGNATURE_EXPEDITIONS.map(exp => (
            <button
              key={exp.id}
              onClick={() => {
                setSelectedExpId(exp.id);
                setActiveDayIndex(0);
              }}
              className={`text-left p-4 rounded-2xl transition-all border backdrop-blur-xl cursor-pointer ${
                selectedExpId === exp.id 
                  ? 'bg-white shadow-xl border-[#ff4d36] ring-2 ring-[#ff4d36]/20' 
                  : 'bg-white/80 hover:bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="text-slate-500 font-semibold">{exp.durationDays} Days • {exp.region}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${
                  exp.difficulty === 'Extreme Alpine' 
                    ? 'bg-red-100 text-red-700' 
                    : exp.difficulty === 'Challenging' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {exp.difficulty}
                </span>
              </div>
              <h3 className="font-syne font-bold text-sm text-slate-900 line-clamp-2">{exp.title}</h3>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="font-extrabold text-slate-900 font-mono">${exp.pricePerPerson} <span className="text-[10px] font-normal text-slate-500">/person</span></span>
                <span className="text-blue-600 font-bold flex items-center gap-1 text-[11px]">
                  View Itinerary <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Expedition Showcase */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-10">
          
          {/* Top Title & Booking Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#ff4d36]/10 text-[#ff4d36] text-xs font-bold border border-[#ff4d36]/20">
                  {selectedExpedition.region} • {selectedExpedition.country}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  Max Elevation: {selectedExpedition.maxAltitude}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  Group: {selectedExpedition.groupSize}
                </span>
              </div>
              <h2 className="font-syne font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                {selectedExpedition.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
                {selectedExpedition.tagline}
              </p>
            </div>

            <div className="flex sm:items-center flex-col sm:flex-row gap-3 shrink-0">
              <div className="text-right sm:mr-4">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">ALL-INCLUSIVE</span>
                <span className="text-3xl font-black font-syne text-slate-900">${selectedExpedition.pricePerPerson}</span>
                <span className="text-xs text-slate-500 block">per climber</span>
              </div>
              <button
                onClick={() => onBookExpedition(selectedExpedition)}
                className="px-8 py-3.5 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-sm shadow-lg shadow-[#ff4d36]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reserve Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expedition Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="md:col-span-2 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md">
              <img 
                src={selectedExpedition.coverImage} 
                alt={selectedExpedition.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-72 sm:h-96">
              {selectedExpedition.gallery.slice(1, 3).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-md">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Day-By-Day Itinerary Explorer */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">
                  STEP-BY-STEP TRAIL ROUTE
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-slate-900">
                  Detailed {selectedExpedition.durationDays}-Day Expedition Log
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Best climbing window: {selectedExpedition.bestMonths.join(', ')}</span>
              </div>
            </div>

            {/* Day Selector Ribbon */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
              {selectedExpedition.itinerary.map((day, idx) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`shrink-0 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeDayIndex === idx
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>DAY {day.day}</span>
                  <span className="text-[11px] opacity-75 font-normal">({day.altitude})</span>
                </button>
              ))}
            </div>

            {/* Active Day Detail Card */}
            {selectedExpedition.itinerary[activeDayIndex] && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono text-[#ff4d36] font-bold">STAGE {selectedExpedition.itinerary[activeDayIndex].day} OF {selectedExpedition.durationDays}</span>
                    <h4 className="font-syne font-bold text-lg sm:text-xl text-slate-900">
                      {selectedExpedition.itinerary[activeDayIndex].title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-slate-400 block text-[10px]">ELEVATION</span>
                      <span className="font-bold text-slate-900">{selectedExpedition.itinerary[activeDayIndex].altitude}</span>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-slate-400 block text-[10px]">DISTANCE</span>
                      <span className="font-bold text-slate-900">{selectedExpedition.itinerary[activeDayIndex].distance}</span>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-slate-400 block text-[10px]">ASCENT / DESCENT</span>
                      <span className="font-bold text-slate-900">{selectedExpedition.itinerary[activeDayIndex].ascent} / {selectedExpedition.itinerary[activeDayIndex].descent}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                  {selectedExpedition.itinerary[activeDayIndex].description}
                </p>

                {/* Highlights */}
                <div className="mt-4 pt-4 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Stage Highlights</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedExpedition.itinerary[activeDayIndex].highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-medium border border-blue-200/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Accommodation */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#ff4d36]" />
                    Night Bivouac: {selectedExpedition.itinerary[activeDayIndex].accommodation}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={activeDayIndex === 0}
                      onClick={() => setActiveDayIndex(prev => Math.max(0, prev - 1))}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer text-xs"
                    >
                      ← Previous Day
                    </button>
                    <button
                      disabled={activeDayIndex === selectedExpedition.itinerary.length - 1}
                      onClick={() => setActiveDayIndex(prev => Math.min(selectedExpedition.itinerary.length - 1, prev + 1))}
                      className="px-3 py-1 rounded-lg bg-slate-900 text-white disabled:opacity-40 cursor-pointer text-xs font-semibold"
                    >
                      Next Day →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Elevation Profile Visualizer */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-syne font-bold text-base text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Expedition Elevation & Ascent Profile</span>
              </h4>
              <span className="text-xs text-slate-500 font-mono">Meters above sea level</span>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-inner">
              <div className="h-32 flex items-end justify-between gap-2 pt-4">
                {selectedExpedition.elevationProfile.map((pt, i) => {
                  const maxM = 5000;
                  const heightPct = Math.max(15, Math.min(100, (pt.elevationMeters / maxM) * 100));
                  const isCurrent = activeDayIndex === i;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setActiveDayIndex(i)}
                      className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                    >
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">
                        {pt.elevationMeters}m
                      </span>
                      <div 
                        style={{ height: `${heightPct}%` }} 
                        className={`w-full max-w-[28px] rounded-t-md transition-all ${
                          isCurrent 
                            ? 'bg-gradient-to-t from-[#ff4d36] to-amber-400 shadow-[0_0_12px_rgba(255,77,54,0.6)]' 
                            : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                      <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-[#ff4d36]' : 'text-slate-400'}`}>
                        {pt.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inclusions & Technical Gear Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-200">
            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200/60">
              <h4 className="font-syne font-bold text-sm text-emerald-950 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Expedition Inclusions & Field Support</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedExpedition.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/60">
              <h4 className="font-syne font-bold text-sm text-amber-950 flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Required Technical Personal Equipment</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedExpedition.requiredGear.map((gear, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{gear}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-[11px] text-amber-900">Need gear rental or fitting?</span>
                <button
                  onClick={() => onNavigatePage('gear-checklist')}
                  className="text-xs font-bold text-amber-950 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Open Gear Checklist Tool</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
