import React, { useState } from 'react';
import { ACCOMMODATIONS, EXPERIENCE_GUIDES } from '../data/mockData';
import { Accommodation, ExperienceGuide } from '../types';
import { InteractiveMap, FocusTarget } from '../components/InteractiveMap';
import { MapPin, SlidersHorizontal, Compass, Home, Users } from 'lucide-react';

interface MapExplorerPageProps {
  onSelectStay: (stay: Accommodation) => void;
  onSelectGuide: (guide: ExperienceGuide) => void;
  onNavigatePage: (pageId: string) => void;
}

export const MapExplorerPage: React.FC<MapExplorerPageProps> = ({
  onSelectStay,
  onSelectGuide,
  onNavigatePage
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'stays' | 'guides'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusedTarget, setFocusedTarget] = useState<FocusTarget | null>(null);

  const displayedStays = activeLayer === 'guides' ? [] : ACCOMMODATIONS;
  const displayedGuides = activeLayer === 'stays' ? [] : EXPERIENCE_GUIDES;

  const handleSelectItem = (id: string, type: 'stay' | 'guide') => {
    setSelectedId(id);
    if (type === 'stay') {
      const s = ACCOMMODATIONS.find(item => item.id === id);
      if (s) onSelectStay(s);
    } else {
      const g = EXPERIENCE_GUIDES.find(item => item.id === id);
      if (g) onSelectGuide(g);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header Bar */}
      <div className="p-4 sm:px-8 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff4d36]">
              GEOSPATIAL EXPEDITION RADAR
            </span>
          </div>
          <h1 className="font-syne font-bold text-xl text-white">Interactive Global Topography Explorer</h1>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              activeLayer === 'all' ? 'bg-[#ff4d36] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Coordinates ({ACCOMMODATIONS.length + EXPERIENCE_GUIDES.length})
          </button>
          <button
            onClick={() => setActiveLayer('stays')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors flex items-center gap-1 ${
              activeLayer === 'stays' ? 'bg-[#ff4d36] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Lodges ({ACCOMMODATIONS.length})</span>
          </button>
          <button
            onClick={() => setActiveLayer('guides')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors flex items-center gap-1 ${
              activeLayer === 'guides' ? 'bg-[#ff4d36] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Guides ({EXPERIENCE_GUIDES.length})</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 relative min-h-[600px] h-[calc(100vh-140px)]">
        <InteractiveMap
          accommodations={displayedStays}
          guides={displayedGuides}
          selectedItemId={selectedId}
          onSelectItem={handleSelectItem}
          focusedTarget={focusedTarget}
        />

        {/* Quick Fly-To HUD overlay on bottom left */}
        <div className="absolute bottom-6 left-6 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-xl hidden md:block">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
            RAPID VECTOR HOP
          </span>
          <div className="flex gap-1.5">
            {[
              { label: 'Spiti (32.2°N)', lat: 32.22, lng: 78.03 },
              { label: 'Ladakh (34.1°N)', lat: 34.15, lng: 77.57 },
              { label: 'Meghalaya (25.3°N)', lat: 25.30, lng: 91.70 },
              { label: 'Patagonia (51.2°S)', lat: -51.25, lng: -72.88 },
              { label: 'Lofoten (68.1°N)', lat: 68.12, lng: 13.56 }
            ].map(loc => (
              <button
                key={loc.label}
                onClick={() => setFocusedTarget({ lat: loc.lat, lng: loc.lng, zoom: 9 })}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#ff4d36] text-slate-200 hover:text-white text-[11px] font-mono cursor-pointer transition-colors"
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
