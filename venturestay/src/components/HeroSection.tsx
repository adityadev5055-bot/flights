import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Sparkles, Navigation, Compass, Globe } from 'lucide-react';
import { HERO_HIGHLIGHTS_INDIA, HERO_HIGHLIGHTS } from '../data/mockData';

interface HeroSectionProps {
  onSelectHighlight: (region: string) => void;
  onExploreMap: () => void;
  activeEdition?: 'india' | 'global';
  onChangeEdition?: (edition: 'india' | 'global') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectHighlight,
  onExploreMap,
  activeEdition: initialEdition = 'india',
  onChangeEdition
}) => {
  const [edition, setEdition] = useState<'india' | 'global'>(initialEdition);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeHighlights = edition === 'india' ? HERO_HIGHLIGHTS_INDIA : HERO_HIGHLIGHTS;
  const currentHero = activeHighlights[activeIndex] || activeHighlights[0];

  const handleToggleEdition = (newEdition: 'india' | 'global') => {
    setEdition(newEdition);
    setActiveIndex(0);
    if (onChangeEdition) {
      onChangeEdition(newEdition);
    }
  };

  // Auto rotate slowly if user doesn't interact, but allow instant click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeHighlights.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [activeHighlights.length]);

  return (
    <section id="hero-section" className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-transparent">
      {/* Background with creative ambient glows, transparent overlays, and cinematic image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Creative Ambient Color Orbs in Orange-Red & Royal Blue */}
        <div className="absolute -top-24 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-orange-400/20 to-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/15 to-indigo-500/20 rounded-full blur-[130px] pointer-events-none" />
        
        {/* Hero Scenic Image with transparent gradient blend */}
        <img
          key={currentHero.image}
          src={currentHero.image}
          alt={currentHero.title}
          className="w-full h-full object-cover object-center transform scale-102 opacity-35 transition-opacity duration-1000 ease-out"
        />
        {/* Soft transparent overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/40 pointer-events-none" />
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 lg:pt-16 flex-1 flex flex-col justify-center">
        
        {/* Left Side Numbered Indicators and Edition Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1.5 text-xs font-mono">
              {activeHighlights.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left transition-all flex items-center gap-2 group cursor-pointer ${
                    activeIndex === idx 
                      ? 'text-[#ff4d36] font-extrabold scale-110' 
                      : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  <span>{item.number}</span>
                  {activeIndex === idx && (
                    <span className="w-5 h-[2px] bg-[#ff4d36] inline-block transition-all shadow-[0_0_8px_#ff4d36]" />
                  )}
                </button>
              ))}
            </div>

            {/* Real Travel Agency Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-2xl shadow-xs border border-white/30 text-xs text-blue-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold tracking-wide uppercase text-[11px]">
                {edition === 'india' 
                  ? 'Accredited Travel Agency • Never Explored India Expeditions & Stays'
                  : 'IATA Accredited Agency • Tailor-Made Expeditions & Verified Stays'}
              </span>
            </div>
          </div>

          {/* Interactive Edition Switcher with Orange-Red and Blue */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/15 backdrop-blur-2xl shadow-xs border border-white/30 text-xs">
            <button
              id="edition-india-btn"
              onClick={() => handleToggleEdition('india')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                edition === 'india'
                  ? 'bg-gradient-to-r from-[#ff4d36] to-[#ff6b4a] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <span>🇮🇳</span>
              <span>Never Explored India</span>
            </button>
            <button
              id="edition-global-btn"
              onClick={() => handleToggleEdition('global')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                edition === 'global'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global Frontiers</span>
            </button>
          </div>
        </div>

        {/* Hero Title with NEVER EXPLORED INDIA and ADVENTURE */}
        <div className="w-full select-none overflow-visible">
          {edition === 'india' ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-[3px] w-8 bg-[#ff4d36] inline-block rounded-full" />
                <span className="font-syne font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ff4d36] tracking-wider uppercase drop-shadow-xs">
                  NEVER EXPLORED INDIA
                </span>
              </div>
              <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-[7.2vw] xl:text-[8.5rem] leading-none tracking-tight sm:tracking-tight text-slate-900 uppercase whitespace-nowrap overflow-visible drop-shadow-xs">
                ADVENTURE
              </h1>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff4d36] font-bold mb-2">
                Curated Wilderness Expeditions
              </span>
              <h1 className="font-syne font-black text-5xl sm:text-6xl md:text-7xl lg:text-[7.2vw] xl:text-[8.5rem] leading-none tracking-tight sm:tracking-tight text-slate-900 uppercase whitespace-nowrap overflow-visible drop-shadow-xs">
                ADVENTURE
              </h1>
            </div>
          )}
          
          <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl">
            <div className="space-y-1">
              <p className="text-lg sm:text-2xl font-bold text-slate-800 tracking-tight">
                {currentHero.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-xl leading-relaxed">
                {currentHero.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              {/* Blue Live Map CTA */}
              <button
                id="hero-explore-map-btn"
                onClick={onExploreMap}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wide transition-all shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Explore Agency Map</span>
              </button>

              {/* Orange-Red View Region CTA */}
              <button
                id="hero-filter-region-btn"
                onClick={() => onSelectHighlight(currentHero.region)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 backdrop-blur-2xl hover:bg-white/35 border-2 border-[#ff4d36] text-[#ff4d36] font-bold text-sm transition-all shadow-xs cursor-pointer group hover:scale-105"
              >
                <span>Explore {currentHero.region}</span>
                <ArrowRight className="w-4 h-4 text-[#ff4d36] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Featured Location Highlights with Transparent Glassmorphic Pills */}
      <div className="relative z-10 w-full bg-white/10 backdrop-blur-2xl pt-8 pb-6 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <span className="font-mono uppercase tracking-wider text-slate-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff4d36] animate-pulse" />
              {edition === 'india' ? 'Featured Never Explored India Corridors' : 'Featured Wilderness Destinations'}
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500">
              Select destination corridor to filter agency map & verified stays
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {activeHighlights.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  id={`hero-pill-${idx}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    onSelectHighlight(item.region);
                  }}
                  className={`relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-white/35 backdrop-blur-2xl border-[#ff4d36] shadow-[0_8px_24px_rgba(255,77,54,0.22)] ring-1 ring-[#ff4d36]'
                      : 'bg-white/15 backdrop-blur-xl border-white/30 hover:border-blue-400 hover:bg-white/25 shadow-xs'
                  }`}
                >
                  {/* Pin Icon & Title */}
                  <div className="flex items-start gap-2.5">
                    <div className={`p-1.5 rounded-full shrink-0 mt-0.5 ${
                      isActive ? 'bg-[#ff4d36] text-white' : 'bg-blue-50/80 text-blue-600'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                        isActive ? 'text-[#ff4d36]' : 'text-slate-800 group-hover:text-blue-600'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Active Orange-Red Underline bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff4d36] rounded-b-2xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
