import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Globe, 
  X, 
  Compass, 
  Plane, 
  Check, 
  ChevronRight,
  Sparkles,
  Mountain
} from 'lucide-react';
import { Accommodation, ExperienceGuide } from '../types';

export interface SearchTarget {
  name: string;
  type: 'region' | 'city';
  region?: string;
  country?: string;
  lat: number;
  lng: number;
  zoom: number;
  description?: string;
  itemCount: number;
}

interface MapSearchBarProps {
  accommodations: Accommodation[];
  guides: ExperienceGuide[];
  activeDestination: string | null;
  onSelectDestination: (target: SearchTarget) => void;
  onResetView: () => void;
}

// Predefined catalog of regions with geographic focal points and default zoom levels
const PREDEFINED_REGIONS = [
  {
    name: 'Spiti & Ladakh',
    country: 'India',
    lat: 32.85,
    lng: 77.80,
    zoom: 7,
    description: 'Trans-Himalayan high passes, Ki Gompa & cosmic stargazing'
  },
  {
    name: 'Meghalaya & Northeast',
    country: 'India',
    lat: 25.40,
    lng: 92.10,
    zoom: 8,
    description: 'Living root bridges, crystal emerald Umngot & misty gorges'
  },
  {
    name: 'Western Ghats',
    country: 'India',
    lat: 10.85,
    lng: 76.85,
    zoom: 8,
    description: 'Munnar mist, UNESCO cloud forest & tranquil tea plateaus'
  },
  {
    name: 'Alps',
    country: 'Italy / Europe',
    lat: 46.5405,
    lng: 11.8742,
    zoom: 8,
    description: 'Dolomitic limestone peaks, high alpine chalets & valleys'
  },
  {
    name: 'Fjords',
    country: 'Norway',
    lat: 65.50,
    lng: 12.50,
    zoom: 6,
    description: 'Lofoten islands, Geirangerfjord & arctic aurora wilderness'
  },
  {
    name: 'Rockies',
    country: 'Canada / USA',
    lat: 50.80,
    lng: -117.50,
    zoom: 6,
    description: 'Banff glacial peaks, Whistler valleys & Pacific rainforest'
  },
  {
    name: 'Patagonia',
    country: 'Chile / Argentina',
    lat: -51.2532,
    lng: -72.8814,
    zoom: 8,
    description: 'Torres del Paine granite horns & southern glacial fields'
  },
  {
    name: 'Highlands',
    country: 'Scotland',
    lat: 57.30,
    lng: -5.00,
    zoom: 7,
    description: 'Cairngorms forest, Isle of Skye lochs & historic glens'
  },
  {
    name: 'Rainforest',
    country: 'Costa Rica',
    lat: 10.3023,
    lng: -84.8255,
    zoom: 9,
    description: 'Monteverde misty canopy, biological reserves & treehouses'
  }
];

// Curated key cities and destinations defined in the application
const PREDEFINED_CITIES = [
  { name: "Cortina d'Ampezzo", region: 'Alps', country: 'Italy', lat: 46.5405, lng: 11.8742, zoom: 12 },
  { name: 'Kaza, Spiti Valley', region: 'Spiti & Ladakh', country: 'India', lat: 32.2276, lng: 78.0706, zoom: 12 },
  { name: 'Cherrapunji & Mawlynnong', region: 'Meghalaya & Northeast', country: 'India', lat: 25.2986, lng: 91.7330, zoom: 12 },
  { name: 'Munnar, Kerala', region: 'Western Ghats', country: 'India', lat: 10.0889, lng: 77.0595, zoom: 12 },
  { name: 'Banff Foothills', region: 'Rockies', country: 'Canada', lat: 51.1784, lng: -115.5708, zoom: 12 },
  { name: 'Geirangerfjord', region: 'Fjords', country: 'Norway', lat: 62.1008, lng: 7.2059, zoom: 12 },
  { name: 'Tromsø Wilderness', region: 'Fjords', country: 'Norway', lat: 69.6492, lng: 18.9553, zoom: 12 },
  { name: 'Reine, Lofoten', region: 'Fjords', country: 'Norway', lat: 67.9333, lng: 13.0892, zoom: 12 },
  { name: 'Monteverde Valley', region: 'Rainforest', country: 'Costa Rica', lat: 10.3023, lng: -84.8255, zoom: 12 },
  { name: 'Torres del Paine Reserve', region: 'Patagonia', country: 'Chile', lat: -51.2532, lng: -72.8814, zoom: 11 },
  { name: 'Cairngorms National Forest', region: 'Highlands', country: 'Scotland', lat: 57.2735, lng: -6.2155, zoom: 11 },
  { name: 'Nubra Valley, Ladakh', region: 'Spiti & Ladakh', country: 'India', lat: 34.6863, lng: 77.5673, zoom: 11 },
  { name: 'Hakuba & Shiga Kogen', region: 'Alps', country: 'Japan', lat: 36.7013, lng: 137.8619, zoom: 12 },
  { name: 'Whistler & Callaghan Valley', region: 'Rockies', country: 'Canada', lat: 50.1163, lng: -122.9574, zoom: 12 },
  { name: 'Olympic Peninsula', region: 'Rockies', country: 'USA', lat: 47.8021, lng: -123.6044, zoom: 11 },
  { name: 'Mud Village, Pin Valley', region: 'Spiti & Ladakh', country: 'India', lat: 31.9612, lng: 78.0321, zoom: 12 },
  { name: 'Meppadi, Wayanad', region: 'Western Ghats', country: 'India', lat: 11.5534, lng: 76.1264, zoom: 12 },
  { name: 'Dawar, Gurez Valley', region: 'Spiti & Ladakh', country: 'India', lat: 34.6369, lng: 74.8986, zoom: 12 },
  { name: 'Majuli Island & Kaziranga', region: 'Meghalaya & Northeast', country: 'India', lat: 26.9632, lng: 94.2185, zoom: 11 }
];

export const MapSearchBar: React.FC<MapSearchBarProps> = ({
  accommodations,
  guides,
  activeDestination,
  onSelectDestination,
  onResetView
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Build dynamic comprehensive list of search targets with live accommodation & guide counts
  const allDestinations = useMemo(() => {
    const list: SearchTarget[] = [];

    // 1. Process Regions
    PREDEFINED_REGIONS.forEach((reg) => {
      const matchStays = accommodations.filter(a => a.region.toLowerCase() === reg.name.toLowerCase());
      const matchGuides = guides.filter(g => g.region.toLowerCase() === reg.name.toLowerCase());
      const totalCount = matchStays.length + matchGuides.length;

      list.push({
        name: reg.name,
        type: 'region',
        country: reg.country,
        lat: reg.lat,
        lng: reg.lng,
        zoom: reg.zoom,
        description: reg.description,
        itemCount: totalCount
      });
    });

    // 2. Process Predefined Cities & Locations
    PREDEFINED_CITIES.forEach((city) => {
      const matchStays = accommodations.filter(a => 
        a.locationName.toLowerCase().includes(city.name.toLowerCase()) ||
        city.name.toLowerCase().includes(a.locationName.toLowerCase())
      );
      const matchGuides = guides.filter(g => 
        g.locationName.toLowerCase().includes(city.name.toLowerCase()) ||
        city.name.toLowerCase().includes(g.locationName.toLowerCase())
      );
      const totalCount = matchStays.length + matchGuides.length;

      list.push({
        name: city.name,
        type: 'city',
        region: city.region,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
        zoom: city.zoom,
        description: `${city.country ? city.country + ' • ' : ''}${city.region}`,
        itemCount: totalCount
      });
    });

    // 3. Dynamically catch any unique location from accommodations that isn't in predefined list
    accommodations.forEach(a => {
      const cleanLoc = a.locationName.trim();
      const alreadyExists = list.some(item => 
        item.name.toLowerCase() === cleanLoc.toLowerCase() ||
        item.name.toLowerCase().includes(cleanLoc.toLowerCase())
      );
      if (!alreadyExists) {
        list.push({
          name: cleanLoc,
          type: 'city',
          region: a.region,
          country: a.country,
          lat: a.coordinates.lat,
          lng: a.coordinates.lng,
          zoom: 12,
          description: `${a.country} • ${a.region}`,
          itemCount: 1
        });
      }
    });

    return list;
  }, [accommodations, guides]);

  // Filter list based on search query
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return top featured destinations when query is empty
      return allDestinations.slice(0, 10);
    }

    return allDestinations.filter(item => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchRegion = item.region?.toLowerCase().includes(q);
      const matchCountry = item.country?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      return matchName || matchRegion || matchCountry || matchDesc;
    });
  }, [allDestinations, query]);

  // Split into Regions and Cities for structured display
  const regionResults = useMemo(() => filteredResults.filter(r => r.type === 'region'), [filteredResults]);
  const cityResults = useMemo(() => filteredResults.filter(r => r.type === 'city'), [filteredResults]);
  const combinedFlattened = useMemo(() => [...regionResults, ...cityResults], [regionResults, cityResults]);

  // Handle selecting a destination
  const handleSelect = (target: SearchTarget) => {
    onSelectDestination(target);
    setQuery(target.name);
    setIsOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < combinedFlattened.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : combinedFlattened.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < combinedFlattened.length) {
        handleSelect(combinedFlattened[selectedIndex]);
      } else if (combinedFlattened.length > 0) {
        handleSelect(combinedFlattened[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Quick preset pills
  const quickPresets = [
    { label: 'Alps', name: 'Alps' },
    { label: 'Spiti', name: 'Spiti & Ladakh' },
    { label: 'Fjords', name: 'Fjords' },
    { label: 'Patagonia', name: 'Patagonia' },
    { label: 'Western Ghats', name: 'Western Ghats' },
    { label: 'Rockies', name: 'Rockies' },
    { label: 'Cortina', name: "Cortina d'Ampezzo" },
    { label: 'Munnar', name: 'Munnar, Kerala' }
  ];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Main Glassmorphic Search Bar */}
      <div className="bg-white/90 backdrop-blur-xl border border-white/70 shadow-lg rounded-xl p-1.5 transition-all duration-200 hover:border-[#ff4d36]/40 focus-within:border-[#ff4d36] focus-within:shadow-[0_8px_30px_rgba(255,77,54,0.18)]">
        <div className="flex items-center gap-2">
          <div className="pl-2 text-[#ff4d36] shrink-0">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Fly map to region or city (e.g. Alps, Spiti)..."
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="shrink-0 pr-1 flex items-center gap-1">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
              <Plane className="w-3 h-3 text-[#ff4d36]" />
              <span>Fly</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Fly Chips */}
      <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider shrink-0 pl-0.5">
          Quick Fly:
        </span>
        {quickPresets.map((preset) => {
          const isCurrent = activeDestination?.toLowerCase() === preset.name.toLowerCase();
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                const target = allDestinations.find(d => d.name.toLowerCase() === preset.name.toLowerCase());
                if (target) {
                  handleSelect(target);
                }
              }}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md transition-all cursor-pointer shrink-0 border flex items-center gap-1 ${
                isCurrent
                  ? 'bg-[#ff4d36] text-white border-[#ff4d36] shadow-sm'
                  : 'bg-white/80 hover:bg-white text-slate-700 hover:text-[#ff4d36] border-white/60 shadow-xs'
              }`}
            >
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dropdown Suggestions Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-[500] max-h-80 overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-2 animate-fadeIn space-y-3">
          {combinedFlattened.length === 0 ? (
            <div className="py-6 px-4 text-center text-xs text-slate-500">
              <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
              <p className="font-semibold text-slate-700">No destination found for "{query}"</p>
              <p className="text-[11px] text-slate-600 mt-1">Try searching Alps, Spiti, Norway, Banff, Munnar or Patagonia</p>
            </div>
          ) : (
            <>
              {/* Regions Section */}
              {regionResults.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#ff4d36]" />
                      Regions & Biomes
                    </span>
                    <span>{regionResults.length} Available</span>
                  </div>

                  <div className="space-y-1 mt-1">
                    {regionResults.map((dest) => {
                      const itemIdx = combinedFlattened.findIndex(i => i.name === dest.name);
                      const isSelected = selectedIndex === itemIdx;
                      const isActive = activeDestination?.toLowerCase() === dest.name.toLowerCase();

                      return (
                        <button
                          key={dest.name}
                          type="button"
                          onClick={() => handleSelect(dest)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isSelected || isActive
                              ? 'bg-[#ff4d36]/10 text-slate-900 border border-[#ff4d36]/30'
                              : 'hover:bg-slate-100/80 text-slate-800'
                          }`}
                        >
                          <div className="min-w-0 flex items-start gap-2.5">
                            <div className="p-1.5 rounded-lg bg-orange-100/70 text-[#ff4d36] shrink-0 mt-0.5">
                              <Mountain className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold font-syne truncate">{dest.name}</span>
                                {dest.country && (
                                  <span className="text-[10px] text-slate-600 font-medium truncate">
                                    • {dest.country}
                                  </span>
                                )}
                              </div>
                              {dest.description && (
                                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                                  {dest.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-[11px]">
                            {dest.itemCount > 0 && (
                              <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                                {dest.itemCount} {dest.itemCount === 1 ? 'place' : 'places'}
                              </span>
                            )}
                            <span className="text-[#ff4d36] font-bold flex items-center gap-0.5">
                              Fly <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cities & Locations Section */}
              {cityResults.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      Cities & Key Locations
                    </span>
                    <span>{cityResults.length} Available</span>
                  </div>

                  <div className="space-y-1 mt-1">
                    {cityResults.map((dest) => {
                      const itemIdx = combinedFlattened.findIndex(i => i.name === dest.name);
                      const isSelected = selectedIndex === itemIdx;
                      const isActive = activeDestination?.toLowerCase() === dest.name.toLowerCase();

                      return (
                        <button
                          key={dest.name}
                          type="button"
                          onClick={() => handleSelect(dest)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isSelected || isActive
                              ? 'bg-blue-50 text-slate-900 border border-blue-200'
                              : 'hover:bg-slate-100/80 text-slate-800'
                          }`}
                        >
                          <div className="min-w-0 flex items-start gap-2.5">
                            <div className="p-1.5 rounded-lg bg-blue-100/70 text-blue-600 shrink-0 mt-0.5">
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold font-syne truncate">{dest.name}</div>
                              <div className="text-[11px] text-slate-600 truncate mt-0.5">
                                {dest.region} {dest.country ? `• ${dest.country}` : ''}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-[11px]">
                            {dest.itemCount > 0 && (
                              <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                                {dest.itemCount} {dest.itemCount === 1 ? 'stay' : 'stays'}
                              </span>
                            )}
                            <span className="text-blue-600 font-bold flex items-center gap-0.5">
                              Zoom <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
