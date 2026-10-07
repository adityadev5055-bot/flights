import React, { useState } from 'react';
import { 
  Sparkles, Moon, Sun, Camera, Compass, MapPin, 
  Calendar, Eye, Star, Info, ArrowRight 
} from 'lucide-react';

interface StargazingLocation {
  name: string;
  region: string;
  country: string;
  bortleClass: number; // 1 to 9
  sqmScore: number; // Sky Quality Meter (e.g. 21.95)
  nakedEyeLimitingMag: number;
  milkyWayVisibility: 'Extreme Detail & Shadow' | 'Brilliant Core' | 'Prominent';
  auroraKpIndex?: number;
  bestHours: string;
  recommendedLens: string;
  shutterSettings: string;
  highlights: string[];
}

const STAR_LOCATIONS: StargazingLocation[] = [
  {
    name: 'Kibber & Langza Fossil Plateau',
    region: 'Spiti Valley',
    country: 'India (4,400m)',
    bortleClass: 1,
    sqmScore: 21.98,
    nakedEyeLimitingMag: 7.6,
    milkyWayVisibility: 'Extreme Detail & Shadow',
    bestHours: '22:30 - 03:45 (No Moon Window)',
    recommendedLens: '14mm - 24mm f/1.4 to f/2.8 Ultra-Wide',
    shutterSettings: '15-20s, ISO 3200-6400, f/1.8, Manual Focus Infinity',
    highlights: [
      'Zero artificial light pollution within 40-mile perimeter',
      'Galactic core arches directly over ancient Buddha of Langza',
      'Atmospheric clarity at 14,500ft minimizes light refraction'
    ]
  },
  {
    name: 'Torres del Paine Southern Pampas',
    region: 'Patagonia',
    country: 'Chile (100m)',
    bortleClass: 2,
    sqmScore: 21.85,
    nakedEyeLimitingMag: 7.2,
    milkyWayVisibility: 'Brilliant Core',
    bestHours: '23:00 - 04:00',
    recommendedLens: '20mm - 35mm f/1.8',
    shutterSettings: '15s, ISO 4000, f/2.0, Long Exposure NR On',
    highlights: [
      'Southern Cross (Crux) and Large & Small Magellanic Clouds',
      'Silhouettes of granite spires against starlit glacial lakes',
      'Airglow phenomena visible in green & red wavelengths'
    ]
  },
  {
    name: 'Reine & Nusfjord Arctic Fjord Night',
    region: 'Lofoten Archipelago',
    country: 'Norway (Arctic Circle)',
    bortleClass: 2,
    sqmScore: 21.78,
    nakedEyeLimitingMag: 7.1,
    milkyWayVisibility: 'Prominent',
    auroraKpIndex: 5.2,
    bestHours: '20:00 - 02:30 (Sept - March)',
    recommendedLens: '16mm f/1.4 or 24mm f/1.4',
    shutterSettings: '3-8s (Fast for moving Aurora), ISO 1600-3200, f/1.4',
    highlights: [
      'Spectacular Northern Lights (Aurora Borealis) reflection in fjords',
      'Historic crimson rorbuer fishermen cabins under cosmic green curtains',
      'Active geomagnetic substorm tracking via Tromsø geophysical radar'
    ]
  }
];

export const DarkSkyPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [selectedLoc, setSelectedLoc] = useState<number>(0);
  const loc = STAR_LOCATIONS[selectedLoc];

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Hero */}
      <div className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>BORTLE CLASS 1 & 2 SANCTUARIES</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Dark Sky & <span className="text-[#ff4d36]">Astrophotography Almanac</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            VentureTravel specializes in the planet's darkest nocturnal corridors. Experience true natural darkness where the Milky Way casts discernible shadows on the Himalayan snow.
          </p>

          {/* Location Selector */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {STAR_LOCATIONS.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setSelectedLoc(idx)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedLoc === idx
                    ? 'bg-[#ff4d36] text-white shadow-lg'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.name} (Bortle {item.bortleClass})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10">
          
          {/* Top Info Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
                  Bortle Class {loc.bortleClass}: Pure Wilderness Sky
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono">
                  SQM {loc.sqmScore} mag/arcsec²
                </span>
              </div>
              <h2 className="font-syne font-black text-2xl sm:text-4xl text-white">
                {loc.name}
              </h2>
              <span className="text-xs sm:text-sm text-slate-400 font-mono flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#ff4d36]" />
                {loc.region}, {loc.country}
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right shrink-0">
              <span className="text-[11px] font-mono text-slate-400 block">PRIME EXPOSURE WINDOW</span>
              <span className="text-base font-bold font-syne text-[#ff4d36]">{loc.bestHours}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-1">MILKY WAY INTENSITY</span>
              <span className="text-xl font-bold font-syne text-emerald-400">{loc.milkyWayVisibility}</span>
              <p className="text-xs text-slate-500 mt-2">Naked-eye limiting magnitude reaches {loc.nakedEyeLimitingMag} with visible zodiacal light.</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-1">RECOMMENDED OPTICS</span>
              <span className="text-base font-bold font-syne text-blue-300">{loc.recommendedLens}</span>
              <p className="text-xs text-slate-500 mt-2">Coma-corrected prime lenses minimize star trailing at outer edges.</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-1">BASE CAMERA CALIBRATION</span>
              <span className="text-xs font-mono text-amber-300 block">{loc.shutterSettings}</span>
              <p className="text-xs text-slate-500 mt-2">Use the "500 Rule" / NPF rule depending on full-frame sensor megapixel density.</p>
            </div>
          </div>

          {/* Highlights & Expedition Guidance */}
          <div className="pt-6 border-t border-slate-800">
            <h4 className="font-syne font-bold text-base text-white mb-3">
              Astrophotography Expedition Highlights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {loc.highlights.map((h, i) => (
                <div key={i} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <span className="text-[#ff4d36] font-bold mr-1.5">•</span>
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Each VentureTravel dark sky retreat includes professional equatorial star-tracking mounts (Sky-Watcher Star Adventurer) for guest use.
            </div>
            <button
              onClick={() => onNavigatePage('expeditions')}
              className="px-6 py-3 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-xs shadow-lg cursor-pointer shrink-0"
            >
              Book Astrophotography Expedition
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
