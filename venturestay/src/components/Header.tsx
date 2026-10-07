import React, { useState } from 'react';
import { 
  Compass, Search, Heart, ShieldCheck, MapPin, Menu, X, 
  Calendar, Users, ChevronDown, Wrench, Mountain, Plane, 
  FileText, HeartPulse, Sparkles, Star, HelpCircle, PhoneCall,
  Activity, CloudRain, UtensilsCrossed, Leaf, Radio
} from 'lucide-react';
import { Accommodation, ExperienceGuide } from '../types';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  savedCount: number;
  onOpenFavorites: () => void;
  onSelectCategory: (cat: 'all' | 'accommodations' | 'guides') => void;
  activeCategory: 'all' | 'accommodations' | 'guides';
  onNavigateSection: (sectionId: string) => void;
  onOpenBookingGeneral: () => void;
  currentPage?: string;
  onNavigatePage?: (pageId: string) => void;
  activeAlertCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchQuery,
  savedCount,
  onOpenFavorites,
  onSelectCategory,
  activeCategory,
  onNavigateSection,
  onOpenBookingGeneral,
  currentPage = 'home',
  onNavigatePage = (_pageId: string) => {},
  activeAlertCount = 3
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [agencyOpen, setAgencyOpen] = useState(false);

  const handleNavPage = (pageId: string) => {
    onNavigatePage(pageId);
    setMobileMenuOpen(false);
    setToolsOpen(false);
    setAgencyOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          id="header-logo-btn"
          onClick={() => handleNavPage('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4d36] via-[#ff6b4a] to-[#2563eb] flex items-center justify-center text-white font-black text-xl shadow-[0_4px_14px_rgba(255,77,54,0.3)] group-hover:scale-105 transition-transform">
            <span className="font-syne">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-extrabold text-lg tracking-wider text-slate-900 flex items-center gap-1">
              VENTURE<span className="text-[#ff4d36]">TRAVEL</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold -mt-1 flex items-center gap-1.5">
              <span>Travel Agency</span>
              <span className="text-[9px] text-emerald-700 bg-emerald-500/15 border border-emerald-500/30 px-1 py-0.2 rounded font-mono">IATA #9624</span>
            </span>
          </div>
        </button>

        {/* Center Search Pill matching reference design */}
        <div className="hidden xl:flex items-center flex-1 max-w-xs mx-2">
          <div className="relative w-full">
            <div className="flex items-center bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 hover:border-[#ff4d36]/50 rounded-full px-3.5 py-1.5 transition-all shadow-xs focus-within:border-[#ff4d36] focus-within:ring-2 focus-within:ring-[#ff4d36]/20 focus-within:bg-white/30">
              <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search expeditions..."
                className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-500 font-medium focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="text-xs text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold">
          
          <button
            id="nav-home"
            onClick={() => handleNavPage('home')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              currentPage === 'home' ? 'text-[#ff4d36] font-bold bg-white/30 shadow-xs' : 'text-slate-800 hover:text-[#ff4d36]'
            }`}
          >
            Home
          </button>

          <button
            id="nav-expeditions-page"
            onClick={() => handleNavPage('expeditions')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              currentPage === 'expeditions' ? 'text-[#ff4d36] font-bold bg-white/30 shadow-xs' : 'text-slate-800 hover:text-[#ff4d36]'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>Expeditions</span>
          </button>

          <button
            id="nav-trip-builder"
            onClick={() => handleNavPage('trip-builder')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              currentPage === 'trip-builder' ? 'text-[#ff4d36] font-bold bg-white/30 shadow-xs' : 'text-slate-800 hover:text-[#ff4d36]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Trip Builder</span>
          </button>

          <button
            id="nav-stays-catalog"
            onClick={() => handleNavPage('stays')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              currentPage === 'stays' ? 'text-[#ff4d36] font-bold bg-white/30 shadow-xs' : 'text-slate-800 hover:text-[#ff4d36]'
            }`}
          >
            Luxury Stays
          </button>

          <button
            id="nav-guides-catalog"
            onClick={() => handleNavPage('guides')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              currentPage === 'guides' ? 'text-blue-600 font-bold bg-white/30 shadow-xs' : 'text-slate-800 hover:text-blue-600'
            }`}
          >
            Guides
          </button>

          <button
            id="nav-map-page"
            onClick={() => handleNavPage('map-explorer')}
            className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              currentPage === 'map-explorer' ? 'text-blue-600 font-bold bg-white/30 shadow-xs' : 'text-slate-800 hover:text-blue-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Map</span>
          </button>

          {/* Field Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setToolsOpen(!toolsOpen);
                setAgencyOpen(false);
              }}
              className="px-3 py-1.5 rounded-full text-slate-800 hover:text-[#ff4d36] transition-colors flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/30"
            >
              <Activity className="w-3.5 h-3.5 text-[#ff4d36]" />
              <span>Field Tools</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {toolsOpen && (
              <div 
                className="absolute left-0 mt-2 w-64 bg-white/40 backdrop-blur-3xl border border-white/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 z-50 text-xs space-y-1"
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-mono text-slate-600 uppercase tracking-widest border-b border-white/25 font-bold">
                  Alpine Expedition Tools
                </div>
                <button
                  onClick={() => handleNavPage('weather-radar')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <CloudRain className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold block">Mountain Weather Radar</span>
                    <span className="text-[10px] text-slate-600">Live high-pass telemetry & snow</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavPage('gear-checklist')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="font-bold block">Gear & Pack Weight Calc</span>
                    <span className="text-[10px] text-slate-600">Layering & ultralight tracker</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavPage('altitude-medicine')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <HeartPulse className="w-4 h-4 text-red-600" />
                  <div>
                    <span className="font-bold block">Lake Louise AMS Calculator</span>
                    <span className="text-[10px] text-slate-600">Clinical altitude triage & oxygen</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavPage('dark-sky')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <div>
                    <span className="font-bold block">Dark Sky & Astrophotography</span>
                    <span className="text-[10px] text-slate-600">Bortle Class 1 & Milky Way</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavPage('wildlife-corridors')}
                  className="w-full p-2.5 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="font-bold block">Wildlife Migration Corridors</span>
                    <span className="text-[10px] text-slate-600">Snow leopard & puma tracking</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Agency & Safety Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setAgencyOpen(!agencyOpen);
                setToolsOpen(false);
              }}
              className="px-3 py-1.5 rounded-full text-slate-800 hover:text-[#ff4d36] transition-colors flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/30"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agency & Safety</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {agencyOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white/40 backdrop-blur-3xl border border-white/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 z-50 text-xs space-y-1"
                onMouseLeave={() => setAgencyOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-mono text-slate-600 uppercase tracking-widest border-b border-white/25 font-bold">
                  Accreditation & Operations
                </div>
                <button
                  onClick={() => handleNavPage('permits')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Permits, ILP & Regulations</span>
                </button>
                <button
                  onClick={() => handleNavPage('logistics-fleet')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Plane className="w-4 h-4 text-blue-500" />
                  <span>Aviation & 4x4 Overland Fleet</span>
                </button>
                <button
                  onClick={() => handleNavPage('emergency-sos')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Radio className="w-4 h-4 text-[#ff4d36]" />
                  <span>Satellite SOS & Mountain Rescue</span>
                </button>
                <button
                  onClick={() => handleNavPage('dispatches')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Climber Field Dispatches</span>
                </button>
                <button
                  onClick={() => handleNavPage('team')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Expedition Directors & UIAGM Masters</span>
                </button>
                <button
                  onClick={() => handleNavPage('alpine-gastronomy')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                  <span>Alpine Gastronomy & Dining</span>
                </button>
                <button
                  onClick={() => handleNavPage('sustainability')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Eco-Charter & Carbon Ledger</span>
                </button>
                <button
                  onClick={() => handleNavPage('insurance-bonding')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Insurance & Bond Escrow</span>
                </button>
                <button
                  onClick={() => handleNavPage('reviews')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>520+ Verified Client Reviews</span>
                </button>
                <button
                  onClick={() => handleNavPage('faq')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Agency FAQ & Knowledge Base</span>
                </button>
                <button
                  onClick={() => handleNavPage('contact')}
                  className="w-full p-2 rounded-xl hover:bg-white/40 text-left text-slate-800 hover:text-slate-950 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#ff4d36]" />
                  <span>Global Desks (Delhi, London, Zürich)</span>
                </button>
              </div>
            )}
          </div>

        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Real-Time Mountain Weather Alert Beacon */}
          <button
            id="header-weather-radar-alert-btn"
            onClick={() => handleNavPage('weather-radar')}
            className={`relative p-2 rounded-full backdrop-blur-xl border transition-all cursor-pointer shadow-xs flex items-center justify-center ${
              currentPage === 'weather-radar'
                ? 'bg-[#ff4d36] text-white border-[#ff4d36]'
                : 'bg-red-500/10 hover:bg-red-500/20 text-red-600 border-red-500/30'
            }`}
            title="Real-Time Alpine Weather Radar & High-Altitude Alerts"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            {activeAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 text-[9px] font-bold text-white items-center justify-center">
                  !
                </span>
              </span>
            )}
          </button>

          {/* Saved / Favorites Button */}
          <button
            id="saved-favorites-btn"
            onClick={onOpenFavorites}
            className="relative p-2 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/35 text-slate-800 hover:text-[#ff4d36] border border-white/40 transition-colors cursor-pointer shadow-xs"
            title="Saved Stays & Guides"
          >
            <Heart className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff4d36] text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* Book Trip Button in Orange-Red */}
          <button
            id="header-book-now-btn"
            onClick={() => handleNavPage('trip-builder')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-[#ff4d36] to-[#ff6b4a] hover:from-[#e03820] hover:to-[#f05330] text-white font-semibold text-xs transition-all shadow-[0_4px_16px_rgba(255,77,54,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Custom Trip Builder
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/40 backdrop-blur-3xl border-b border-white/30 px-4 pt-4 pb-8 space-y-3 text-slate-800 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold">Core Expeditions & Pages</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => handleNavPage('home')}
              className="p-2.5 rounded-xl bg-white/30 hover:bg-white/60 text-left font-bold text-slate-900 border border-white/30 transition-colors"
            >
              Homepage
            </button>
            <button
              onClick={() => handleNavPage('expeditions')}
              className="p-2.5 rounded-xl bg-white/30 hover:bg-white/60 text-left font-bold text-[#ff4d36] border border-white/30 transition-colors"
            >
              Expeditions
            </button>
            <button
              onClick={() => handleNavPage('trip-builder')}
              className="p-2.5 rounded-xl bg-white/30 hover:bg-white/60 text-left font-bold text-amber-600 border border-white/30 transition-colors"
            >
              Trip Builder
            </button>
            <button
              onClick={() => handleNavPage('stays')}
              className="p-2.5 rounded-xl bg-white/30 hover:bg-white/60 text-left text-slate-800 border border-white/30 transition-colors"
            >
              Luxury Stays
            </button>
            <button
              onClick={() => handleNavPage('guides')}
              className="p-2.5 rounded-xl bg-white/30 hover:bg-white/60 text-left text-slate-800 border border-white/30 transition-colors"
            >
              Certified Guides
            </button>
            <button
              onClick={() => handleNavPage('map-explorer')}
              className="p-2.5 rounded-xl bg-white/30 hover:bg-white/60 text-left text-slate-800 border border-white/30 transition-colors"
            >
              Agency Map
            </button>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold pt-2 border-t border-white/20">Field Telemetry & Tools</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button onClick={() => handleNavPage('weather-radar')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Weather Radar
            </button>
            <button onClick={() => handleNavPage('gear-checklist')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Gear Checklist
            </button>
            <button onClick={() => handleNavPage('altitude-medicine')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Lake Louise AMS
            </button>
            <button onClick={() => handleNavPage('dark-sky')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Dark Sky Almanac
            </button>
            <button onClick={() => handleNavPage('wildlife-corridors')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors col-span-2 text-slate-800">
              Wildlife Migration Corridors
            </button>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold pt-2 border-t border-white/20">Agency & Safety Directorate</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button onClick={() => handleNavPage('permits')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Permits & ILP
            </button>
            <button onClick={() => handleNavPage('logistics-fleet')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Fleet & Heli
            </button>
            <button onClick={() => handleNavPage('emergency-sos')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Satellite SOS
            </button>
            <button onClick={() => handleNavPage('team')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Team Masters
            </button>
            <button onClick={() => handleNavPage('dispatches')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Climber Dispatches
            </button>
            <button onClick={() => handleNavPage('alpine-gastronomy')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Alpine Dining
            </button>
            <button onClick={() => handleNavPage('sustainability')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Eco Ledger
            </button>
            <button onClick={() => handleNavPage('insurance-bonding')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              IATA Trust Escrow
            </button>
            <button onClick={() => handleNavPage('reviews')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Client Reviews
            </button>
            <button onClick={() => handleNavPage('faq')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors text-slate-800">
              Agency FAQ
            </button>
            <button onClick={() => handleNavPage('contact')} className="p-2 rounded-xl bg-white/25 text-left hover:bg-white/50 border border-white/20 transition-colors col-span-2 text-slate-800">
              Global Desks (Delhi, London, Zürich)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

