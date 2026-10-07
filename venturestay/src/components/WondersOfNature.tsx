import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Compass, Sparkles, Globe } from 'lucide-react';
import { Accommodation } from '../types';
import { useCard3DMovement } from '../hooks/useCard3DMovement';

interface WondersOfNatureProps {
  onSelectWonder: (titleOrRegion: string) => void;
  onOpenStayDetails: (stayId: string) => void;
  initialCollection?: 'india' | 'global';
}

const WONDERS_INDIA = [
  {
    id: 'stay-india-1',
    title: 'Spiti Moonscape & Ki Gompa',
    subtitle: 'High-altitude Tibetan Buddhist monasteries beneath Bortle 1 celestial night skies',
    location: 'Spiti Valley, Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    tag: 'High Desert Plateau',
    region: 'Spiti & Ladakh'
  },
  {
    id: 'stay-india-2',
    title: 'Living Root Bridges & Cherra',
    subtitle: 'Bio-engineered Ficus tree bridges woven across centuries over turquoise canyon streams',
    location: 'Cherrapunji, Meghalaya',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tag: 'Living Bio-Canopy',
    region: 'Meghalaya & Northeast'
  },
  {
    id: 'stay-india-3',
    title: 'Nubra Dunes & Glacial Peaks',
    subtitle: 'Trans-Himalayan sand dunes framed by snow-clad Karakoram massifs & starlit domes',
    location: 'Nubra Valley, Ladakh',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
    tag: 'Cold Desert Stargazing',
    region: 'Spiti & Ladakh'
  },
  {
    id: 'stay-india-4',
    title: 'Munnar Shola Cloud Peaks',
    subtitle: 'Prehistoric biodiversity hotspot older than the Himalayas blanketed in emerald mist',
    location: 'Western Ghats, Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    tag: 'Prehistoric Cloud Shola',
    region: 'Western Ghats'
  },
  {
    id: 'stay-13',
    title: 'Pin Valley & Mud Village',
    subtitle: 'Rammed earth frontier settlements beneath the frozen Parang La and ibex ridges',
    location: 'Pin Valley, Spiti, Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    tag: 'High Altitude Frontier',
    region: 'Spiti & Ladakh'
  },
  {
    id: 'stay-14',
    title: 'Rainbow Falls & Tyrna Gorge',
    subtitle: 'Suspended bio-canopy treehouses over emerald natural mineral canyon plunge pools',
    location: 'Nongriat, East Khasi Hills, Meghalaya',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    tag: 'Rainforest Gorge',
    region: 'Meghalaya & Northeast'
  },
  {
    id: 'stay-16',
    title: 'Wayanad Hornbill Canopy',
    subtitle: 'Living treehouse elevated 80 feet above tropical evergreen misty spice valleys',
    location: 'Meppadi, Wayanad, Kerala',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tag: 'Rainforest Canopy',
    region: 'Western Ghats'
  },
  {
    id: 'stay-17',
    title: 'Gurez Valley & Habba Khatoon',
    subtitle: 'Pristine deodar pine riverside chalets beneath the legendary pyramid peak of Kashmir',
    location: 'Dawar, Gurez Valley, Kashmir',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    tag: 'Alpine River Valley',
    region: 'Spiti & Ladakh'
  }
];

const WONDERS_GLOBAL = [
  {
    id: 'stay-1',
    title: 'Camel Hill',
    subtitle: 'We seek to provide the authentic content for traveller around the world',
    location: 'Cortina d\'Ampezzo, Italy',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Alpine Sanctuary',
    region: 'Alps'
  },
  {
    id: 'stay-2',
    title: 'Havana Street & Canopy',
    subtitle: 'We seek to provide the authentic content for traveller around the world',
    location: 'Monteverde, Costa Rica',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    tag: 'Cloud Forest',
    region: 'Rainforest'
  },
  {
    id: 'stay-3',
    title: 'Ghump Forest',
    subtitle: 'We seek to provide the authentic content for traveller around the world',
    location: 'Cairngorms, Scotland',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    tag: 'Ancient Pines',
    region: 'Highlands'
  },
  {
    id: 'stay-4',
    title: 'Red Mountain',
    subtitle: 'We seek to provide the authentic content for traveller around the world',
    location: 'Banff Foothills, Canada',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tag: 'Granite Massif',
    region: 'Rockies'
  },
  {
    id: 'stay-19',
    title: 'Torres del Paine Spires',
    subtitle: 'Raw Patagonian wilderness shelter framed by sheer horn massifs and calving ice',
    location: 'Torres del Paine, Magallanes, Chile',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Patagonian Icefield',
    region: 'Patagonia'
  },
  {
    id: 'stay-20',
    title: 'Nagano Thermal Rotemburo',
    subtitle: 'Private natural volcanic hot spring bath nestled in powder-blanketed Japanese Alps',
    location: 'Hakuba & Shiga Kogen, Japan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    tag: 'Volcanic Onsen',
    region: 'Alps'
  },
  {
    id: 'stay-21',
    title: 'Reinefjorden Crimson Rorbu',
    subtitle: 'Historic stilt lodge suspended over crystal Arctic waters beneath aurora skies',
    location: 'Reine, Lofoten Archipelago, Norway',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    tag: 'Arctic Fjord',
    region: 'Fjords'
  },
  {
    id: 'stay-22',
    title: 'Callaghan Old-Growth Fir',
    subtitle: 'Architectural cedar treehouse nestled among 800-year-old coastal rainforest firs',
    location: 'Whistler, British Columbia, Canada',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    tag: 'Temperate Rainforest',
    region: 'Rockies'
  }
];

interface WonderCard3DProps {
  wonder: {
    id: string;
    title: string;
    subtitle: string;
    location: string;
    image: string;
    tag: string;
    region: string;
  };
  index: number;
  onSelect: () => void;
}

const WonderCard3D: React.FC<WonderCard3DProps> = ({ wonder, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt & Specular Glare Movement on Desktop (mouse), Mobile (touch drag), and Tablet (gyroscope + touch)
  const { rotX, rotY, isInteracting, glarePos, cardMovementProps } = useCard3DMovement({
    maxTilt: 14,
    enableDeviceTilt: 8
  });

  return (
    <div
      ref={cardRef}
      id={`wonder-card-${index}`}
      onClick={onSelect}
      {...cardMovementProps}
      style={{
        perspective: '1000px',
      }}
      className="relative h-[410px] cursor-pointer select-none"
    >
      <div
        style={{
          transform: isInteracting 
            ? `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(35px) translateY(-14px) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px) scale(1)',
          transformStyle: 'preserve-3d',
          transition: isInteracting ? 'transform 0.1s ease-out, box-shadow 0.2s' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s',
        }}
        className={`w-full h-full rounded-2xl overflow-hidden border bg-white/10 backdrop-blur-xl relative transition-all duration-300 ${
          isInteracting 
            ? 'border-[#ff4d36] shadow-[0_25px_50px_-12px_rgba(255,77,54,0.25),0_0_30px_rgba(37,99,235,0.15)]' 
            : 'border-white/25 shadow-sm'
        }`}
      >
        {/* Background Nature Image */}
        <img
          src={wonder.image}
          alt={wonder.title}
          className={`w-full h-full object-cover object-center transition-transform duration-700 pointer-events-none ${
            isInteracting ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Gradient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent pointer-events-none" />

        {/* Specular Glare Reflection moving in 3D */}
        {isInteracting && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.35) 0%, transparent 65%)`
            }}
          />
        )}

        {/* Top Tag - Pops out in 3D */}
        <div 
          style={{ 
            transform: isInteracting ? 'translateZ(30px)' : 'translateZ(0px)',
            transition: 'transform 0.2s ease-out'
          }}
          className="absolute top-4 left-4 z-10"
        >
          <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-xl text-xs font-bold text-[#ff4d36] border border-white/40 shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ff4d36]" />
            <span>{wonder.tag}</span>
          </span>
        </div>

        {/* Bottom Caption Overlay - Pops out in 3D */}
        <div 
          style={{ 
            transform: isInteracting ? 'translateZ(45px)' : 'translateZ(0px)',
            transition: 'transform 0.2s ease-out'
          }}
          className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent z-10"
        >
          <div className="flex items-center gap-1.5 text-xs text-red-300 mb-1 font-semibold">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#ff4d36]" />
            <span className="truncate">{wonder.location}</span>
          </div>
          
          <h3 className={`font-syne font-bold text-xl transition-colors mb-1.5 ${
            isInteracting ? 'text-red-200' : 'text-white'
          }`}>
            {wonder.title}
          </h3>

          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed opacity-90">
            {wonder.subtitle}
          </p>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
              Explore Verified Stays
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isInteracting ? 'bg-[#ff4d36] text-white scale-110 shadow-xs' : 'bg-white/20 text-white'
            }`}>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WondersOfNature: React.FC<WondersOfNatureProps> = ({
  onSelectWonder,
  onOpenStayDetails,
  initialCollection = 'india'
}) => {
  const [collection, setCollection] = useState<'india' | 'global'>(initialCollection);
  const wonders = collection === 'india' ? WONDERS_INDIA : WONDERS_GLOBAL;

  const [scrollIndex, setScrollIndex] = useState(0);

  const handleNext = () => {
    setScrollIndex((prev) => (prev + 1) % wonders.length);
  };

  const handlePrev = () => {
    setScrollIndex((prev) => (prev - 1 + wonders.length) % wonders.length);
  };

  return (
    <section id="wonders-section" className="w-full py-20 bg-white/10 backdrop-blur-2xl border-t border-white/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Collection Toggle and Carousel Control */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff4d36]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">
                {collection === 'india' ? 'Never Explored India Showcase' : 'Global Wilderness Showcase'}
              </span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {collection === 'india' ? 'The Wonders Of Never Explored India' : 'The Wonders Of Nature'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              {collection === 'india' 
                ? 'Uncharted bio-canopies, Trans-Himalayan moonscapes, and high-pass hermitages documented with certified naturalists.'
                : 'We seek to provide authentic content and verified shelters for travelers around the world.'}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 flex-wrap">
            {/* Collection Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 text-xs shadow-xs">
              <button
                onClick={() => setCollection('india')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  collection === 'india'
                    ? 'bg-[#ff4d36] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                🇮🇳 Never Explored India
              </button>
              <button
                onClick={() => setCollection('global')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  collection === 'global'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Global Frontiers
              </button>
            </div>

            {/* Circular Arrow Buttons matching mockup */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous wonders"
                className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl hover:bg-white/30 text-slate-800 flex items-center justify-center border border-white/30 transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next wonders"
                className="w-10 h-10 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white flex items-center justify-center font-bold shadow-[0_4px_14px_rgba(255,77,54,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid as depicted in reference with interactive 3D motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wonders.map((wonder, index) => (
            <WonderCard3D
              key={wonder.id}
              wonder={wonder}
              index={index}
              onSelect={() => {
                onSelectWonder(wonder.region);
                onOpenStayDetails(wonder.id);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
