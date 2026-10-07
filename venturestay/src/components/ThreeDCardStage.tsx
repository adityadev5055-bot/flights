import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  RotateCw, 
  Sparkles, 
  Eye, 
  Layers, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  Star, 
  ArrowUpRight,
  Shuffle,
  Wind
} from 'lucide-react';
import { Accommodation } from '../types';

interface ThreeDCardStageProps {
  onSelectStay: (stayId: string) => void;
  onExploreRegion: (region: string) => void;
}

interface SpatialCardData {
  id: string;
  stayId: string;
  title: string;
  tagline: string;
  region: string;
  location: string;
  altitude: string;
  skyRating: string;
  wildlife: string;
  temperature: string;
  price: number;
  rating: number;
  image: string;
  accentColor: string;
  badge: string;
}

const SPATIAL_CARDS: SpatialCardData[] = [
  {
    id: '3d-card-1',
    stayId: 'stay-india-1',
    title: 'Ki Gompa Hermitage',
    tagline: 'High-Altitude Tibetan Buddhist Sanctuary',
    region: 'Spiti & Ladakh',
    location: 'Spiti Valley, Himachal Pradesh',
    altitude: '4,166m (13,668 ft)',
    skyRating: 'Bortle 1 (Zero Light Pollution)',
    wildlife: 'Snow Leopard, Himalayan Ibex, Golden Eagle',
    temperature: '-4°C to 12°C',
    price: 340,
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#c5db40',
    badge: 'Ancient Trans-Himalayan'
  },
  {
    id: '3d-card-2',
    stayId: 'stay-india-2',
    title: 'Living Root Canopy Lodge',
    tagline: 'Centuries-Old Bio-Engineered Ficus Canopy',
    region: 'Meghalaya & Northeast',
    location: 'Cherrapunji & Nongriat, Meghalaya',
    altitude: '1,430m (4,690 ft)',
    skyRating: 'Bortle 2 (Pristine Forest Sky)',
    wildlife: 'Clouded Leopard, Hoolock Gibbon, Hornbill',
    temperature: '14°C to 22°C',
    price: 290,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#4ade80',
    badge: 'Living Bio-Architecture'
  },
  {
    id: '3d-card-3',
    stayId: 'stay-india-3',
    title: 'Nubra Dunes Stargazing Dome',
    tagline: 'Glacial Oasis & Silk Road Sand Dunes',
    region: 'Spiti & Ladakh',
    location: 'Hunder, Nubra Valley, Ladakh',
    altitude: '3,048m (10,000 ft)',
    skyRating: 'Bortle 1 (Observatory Grade)',
    wildlife: 'Bactrian Two-Humped Camels, Tibetan Wolf',
    temperature: '-2°C to 16°C',
    price: 380,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#38bdf8',
    badge: 'Glacial Desert Geo-Dome'
  },
  {
    id: '3d-card-4',
    stayId: 'stay-india-4',
    title: 'Munnar Prehistoric Cloud Sanctuary',
    tagline: 'Ancient Shola Forest & Tea Terroir',
    region: 'Western Ghats',
    location: 'Western Ghats, Kerala',
    altitude: '1,600m (5,250 ft)',
    skyRating: 'Bortle 3 (Starry High-Mist Sky)',
    wildlife: 'Nilgiri Tahr, Lion-Tailed Macaque, Malabar Giant Squirrel',
    temperature: '12°C to 20°C',
    price: 310,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#fbbf24',
    badge: 'UNESCO Cloud Shola'
  },
  {
    id: '3d-card-5',
    stayId: 'stay-1',
    title: 'Dolomite Ridge Refuge',
    tagline: 'Limestone Crag Architectural Loft',
    region: 'Alps',
    location: 'Cortina d\'Ampezzo, Italy',
    altitude: '2,150m (7,050 ft)',
    skyRating: 'Bortle 2 (Alpine Starlight)',
    wildlife: 'Alpine Marmot, Chamois, Golden Eagle',
    temperature: '3°C to 15°C',
    price: 420,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#f472b6',
    badge: 'High Alpine Crag'
  },
  {
    id: '3d-card-6',
    stayId: 'stay-19',
    title: 'Torres del Paine Glacial Spires',
    tagline: 'Wind-Carved Patagonian Basalt & Calving Glaciers',
    region: 'Patagonia',
    location: 'Torres del Paine, Chile',
    altitude: '780m (2,560 ft)',
    skyRating: 'Bortle 1 (Sub-Antarctic Dark Sky)',
    wildlife: 'Patagonian Puma, Andean Condor, Wild Guanaco',
    temperature: '2°C to 11°C',
    price: 390,
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#38bdf8',
    badge: 'Glacial Horn Massif'
  },
  {
    id: '3d-card-7',
    stayId: 'stay-20',
    title: 'Nagano Snow Cedar Onsen',
    tagline: 'Private Geothermal Rotemburo in Alpine Powder',
    region: 'Alps',
    location: 'Hakuba Valley, Nagano, Japan',
    altitude: '1,200m (3,940 ft)',
    skyRating: 'Bortle 2 (Alpine Snow Starlight)',
    wildlife: 'Japanese Serow, Snow Monkeys, Tanuki',
    temperature: '-6°C to 4°C',
    price: 340,
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#f97316',
    badge: 'Natural Volcanic Onsen'
  },
  {
    id: '3d-card-8',
    stayId: 'stay-21',
    title: 'Reinefjorden Crimson Rorbu',
    tagline: 'Historic Fjord Stilt Cabin Under Arctic Auroras',
    region: 'Fjords',
    location: 'Reine, Lofoten, Norway',
    altitude: '4m (13 ft)',
    skyRating: 'Bortle 1 (Aurora Borealis Theater)',
    wildlife: 'White-Tailed Sea Eagle, Orcas, Arctic Cod',
    temperature: '-3°C to 8°C',
    price: 295,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#a855f7',
    badge: 'Arctic Fjord Stilt'
  }
];

export const ThreeDCardStage: React.FC<ThreeDCardStageProps> = ({
  onSelectStay,
  onExploreRegion
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isFlipped, setIsFlipped] = useState<Record<string, boolean>>({});
  const [isDispersed, setIsDispersed] = useState(false);
  const [stageRotateY, setStageRotateY] = useState(0);
  const [viewStyle, setViewStyle] = useState<'spatial-flow' | 'deck-stack'>('spatial-flow');
  
  // Mouse/Touch position over stage for responsive 3D perspective
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isStageInteracting, setIsStageInteracting] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isTouchActive = useRef(false);
  const isMouseActive = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    isMouseActive.current = true;
    setIsStageInteracting(true);
  };

  const handleMouseLeave = () => {
    isMouseActive.current = false;
    setIsStageInteracting(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Touch handlers for mobile and tablet drag & swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!stageRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    isTouchActive.current = true;
    setIsStageInteracting(true);

    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((touch.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((touch.clientY - rect.top) / rect.height - 0.5) * 2));
    setMousePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!stageRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((touch.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((touch.clientY - rect.top) / rect.height - 0.5) * 2));
    setMousePos({ x, y });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartPos.current && e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].clientX - touchStartPos.current.x;
      if (diffX < -45) {
        // Swiped left -> next card
        handleNext();
      } else if (diffX > 45) {
        // Swiped right -> prev card
        handlePrev();
      }
    }
    isTouchActive.current = false;
    touchStartPos.current = null;
    setTimeout(() => {
      if (!isTouchActive.current && !isMouseActive.current) {
        setIsStageInteracting(false);
        setMousePos({ x: 0, y: 0 });
      }
    }, 200);
  };

  // Device orientation support for mobile & tablet stage movement
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    let rafId: number;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (isTouchActive.current || isMouseActive.current) return;
      const gamma = event.gamma; // [-90, 90]
      const beta = event.beta;   // [-180, 180]
      if (gamma === null || beta === null) return;

      const normX = Math.max(-1, Math.min(1, gamma / 25));
      const normY = Math.max(-1, Math.min(1, (beta - 45) / 25));

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!isTouchActive.current && !isMouseActive.current) {
          setMousePos({ x: normX, y: normY });
        }
      });
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerDisperse = () => {
    setIsDispersed(true);
    setTimeout(() => {
      setIsDispersed(false);
    }, 1200);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPATIAL_CARDS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPATIAL_CARDS.length) % SPATIAL_CARDS.length);
  };

  return (
    <section 
      id="3d-spatial-stage"
      className="w-full py-24 bg-white/20 backdrop-blur-xl border-t border-white/30 relative overflow-hidden select-none"
    >
      {/* Ambient background light spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and 3D Action Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50/80 backdrop-blur-xs border border-red-200 text-xs font-mono text-[#ff4d36] mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4d36]" />
              <span>INTERACTIVE 3D SPATIAL CARDS</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Move & Hover In <span className="text-[#ff4d36]">3D Space</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Interact with depth-layered wilderness cards that physically displace from their position, rotate with cursor physics, and reveal field telemetry.
            </p>
          </div>

          {/* Interactive Mode Switches */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Style Switcher */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 text-xs shadow-xs">
              <button
                onClick={() => setViewStyle('spatial-flow')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  viewStyle === 'spatial-flow'
                    ? 'bg-[#ff4d36] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Spatial Arc
              </button>
              <button
                onClick={() => setViewStyle('deck-stack')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  viewStyle === 'deck-stack'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Stacked Deck
              </button>
            </div>

            {/* Disperse Physics Button */}
            <button
              onClick={triggerDisperse}
              title="Disperse cards from their place and realign"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-xl hover:bg-white/30 text-slate-800 hover:text-[#ff4d36] border border-white/30 transition-all text-xs font-semibold cursor-pointer active:scale-95 shadow-xs"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isDispersed ? 'animate-spin text-[#ff4d36]' : ''}`} />
              <span>Shuffle 3D</span>
            </button>

            {/* Next / Prev Navigation */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous card"
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-xl hover:bg-white/30 text-slate-800 flex items-center justify-center border border-white/30 transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next card"
                className="w-9 h-9 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white flex items-center justify-center font-bold shadow-[0_4px_14px_rgba(255,77,54,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Spatial Canvas / Stage Container */}
        <div 
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="relative w-full h-[540px] sm:h-[600px] flex items-center justify-center overflow-hidden py-10 touch-pan-y"
          style={{ perspective: '1200px' }}
        >
          {/* Subtle 3D Grid Stage Floor */}
          <div 
            className="absolute -bottom-20 inset-x-0 h-96 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#ff4d36 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: `rotateX(75deg) translateZ(-60px) rotateY(${mousePos.x * 5}deg)`,
              transformOrigin: '50% 100%'
            }}
          />

          {/* Cards Container with Stage Rotation */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${mousePos.x * 6 + stageRotateY}deg) rotateX(${-mousePos.y * 4}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            {SPATIAL_CARDS.map((card, index) => {
              const offset = index - activeIndex;
              const isCenter = index === activeIndex;
              const flipped = isFlipped[card.id] || false;

              // Compute 3D Position and Rotation based on viewStyle and activeIndex
              let transformString = '';
              let zIndex = 10;
              let opacity = 1;

              if (isDispersed) {
                // Chaotic floating explosion effect
                const angle = (index * 72) * (Math.PI / 180);
                const rx = Math.sin(angle) * 260;
                const ry = Math.cos(angle) * 120;
                const rz = (index % 2 === 0 ? 1 : -1) * 180;
                const rot = (index - 2) * 35;
                transformString = `translate3d(${rx}px, ${ry}px, ${rz}px) rotateY(${rot * 2}deg) rotateX(${rot}deg) scale(0.85)`;
                zIndex = 30;
              } else if (viewStyle === 'spatial-flow') {
                // Arc style flow
                const translateX = offset * 260 + (isCenter ? 0 : offset * 20);
                const translateZ = isCenter ? 120 : -Math.abs(offset) * 140;
                const rotateY = offset * -24;
                const rotateZ = offset * -1.5;
                const scale = isCenter ? 1.05 : Math.max(0.78, 1 - Math.abs(offset) * 0.14);
                
                transformString = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
                zIndex = isCenter ? 40 : 30 - Math.abs(offset);
                opacity = Math.abs(offset) > 2 ? 0.3 : 1;
              } else {
                // Stacked Deck style
                const translateX = offset * 35;
                const translateY = offset * 12;
                const translateZ = isCenter ? 140 : -Math.abs(offset) * 70;
                const rotateZ = offset * 4;
                const scale = isCenter ? 1.06 : 1 - Math.abs(offset) * 0.05;

                transformString = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateZ(${rotateZ}deg) scale(${scale})`;
                zIndex = isCenter ? 40 : 30 - Math.abs(offset);
                opacity = Math.abs(offset) > 3 ? 0 : 1;
              }

              return (
                <div
                  key={card.id}
                  id={`3d-spatial-card-${index}`}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(index);
                    }
                  }}
                  style={{
                    transform: transformString,
                    zIndex,
                    opacity,
                    transition: isDispersed 
                      ? 'transform 0.6s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.4s' 
                      : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`absolute w-[300px] sm:w-[340px] h-[460px] sm:h-[490px] rounded-3xl cursor-pointer select-none group transition-shadow duration-300 ${
                    isCenter 
                      ? 'shadow-[0_25px_60px_-15px_rgba(255,77,54,0.25),0_10px_30px_rgba(37,99,235,0.15)]' 
                      : 'shadow-xl hover:brightness-105'
                  }`}
                >
                  {/* The Inner Card with 3D Flip Support */}
                  <div
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    className="relative w-full h-full rounded-3xl"
                  >
                    
                    {/* ================= CARD FRONT ================= */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d'
                      }}
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white border border-slate-200 group-hover:border-[#ff4d36]/80 transition-all duration-300 flex flex-col justify-between shadow-sm"
                    >
                      {/* Full-bleed high quality nature image */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                      />

                      {/* Gradient Ambient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-black/25 pointer-events-none" />
                      
                      {/* Dynamic Specular Sheen (Moves with cursor or touch in 3D) */}
                      <div 
                        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                          isStageInteracting ? 'opacity-30' : 'opacity-0 group-hover:opacity-30'
                        }`}
                        style={{
                          background: `radial-gradient(circle at ${mousePos.x * 50 + 50}% ${mousePos.y * 50 + 50}%, rgba(255,255,255,0.6) 0%, transparent 60%)`
                        }}
                      />

                      {/* Top Bar with 3D Popout Badge (translateZ 40px) */}
                      <div 
                        style={{ transform: 'translateZ(40px)' }}
                        className="relative p-5 flex items-center justify-between z-20"
                      >
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl text-[11px] font-bold text-[#ff4d36] border border-white/40 shadow-md tracking-wide">
                          {card.badge}
                        </span>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-bold border border-white/40 shadow-sm">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>{card.rating}</span>
                        </div>
                      </div>

                      {/* Bottom Content Area with Multi-Plane 3D Depth */}
                      <div 
                        style={{ transform: 'translateZ(55px)' }}
                        className="relative p-5 pt-0 z-20"
                      >
                        {/* Location Tag */}
                        <div className="flex items-center gap-1.5 text-xs text-red-300 font-semibold mb-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#ff4d36]" />
                          <span className="truncate">{card.location}</span>
                        </div>

                        {/* Title with Popout */}
                        <h3 className="font-syne font-extrabold text-2xl text-white group-hover:text-red-200 transition-colors leading-tight drop-shadow-md">
                          {card.title}
                        </h3>

                        <p className="text-xs text-slate-200 mt-1 line-clamp-2 leading-relaxed opacity-95">
                          {card.tagline}
                        </p>

                        {/* Quick Spec Tags */}
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/20 text-[11px]">
                          <div className="bg-black/35 backdrop-blur-xl rounded-xl p-1.5 px-2 text-slate-200 border border-white/20">
                            <span className="text-slate-300 block text-[9px] uppercase tracking-wider font-semibold">Altitude</span>
                            <span className="font-bold text-white">{card.altitude.split(' ')[0]}</span>
                          </div>
                          <div className="bg-black/35 backdrop-blur-xl rounded-xl p-1.5 px-2 text-slate-200 border border-white/20">
                            <span className="text-slate-300 block text-[9px] uppercase tracking-wider font-semibold">Night Sky</span>
                            <span className="font-bold text-blue-300">{card.skyRating.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* Action Buttons Row with Higher 3D Elevation (translateZ 65px) */}
                        <div 
                          style={{ transform: 'translateZ(20px)' }}
                          className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-2"
                        >
                          <div>
                            <span className="text-lg font-black text-white">${card.price}</span>
                            <span className="text-[10px] text-slate-300 ml-1">/ night</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Flip Card for 3D Field Telemetry */}
                            <button
                              type="button"
                              onClick={(e) => toggleFlip(card.id, e)}
                              title="Flip to view 3D Telemetry"
                              className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1 backdrop-blur-md border border-white/20 transition-colors"
                            >
                              <Layers className="w-3.5 h-3.5 text-white" />
                              <span>Specs</span>
                            </button>

                            {/* Book / View Details */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectStay(card.stayId);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff4d36] to-[#ff6b4a] hover:from-[#e03820] hover:to-[#f05330] text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <span>Explore</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= CARD BACK (FLIPPED 3D SPEC SHEET) ================= */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        transformStyle: 'preserve-3d'
                      }}
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-white/75 backdrop-blur-2xl border-2 border-[#ff4d36] p-6 flex flex-col justify-between shadow-2xl"
                    >
                      {/* Header on Back */}
                      <div style={{ transform: 'translateZ(35px)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d36] font-bold">
                            WILDERNESS FIELD TELEMETRY
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(card.id, e)}
                            className="p-1.5 rounded-lg bg-white/40 hover:bg-white/60 text-slate-800 text-xs flex items-center gap-1 border border-white/50 backdrop-blur-md cursor-pointer"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                            <span>Flip Back</span>
                          </button>
                        </div>
                        <h4 className="font-syne font-bold text-xl text-slate-900">{card.title}</h4>
                        <p className="text-xs text-blue-600 font-semibold mt-0.5">{card.region}</p>
                      </div>

                      {/* Technical Field Metrics */}
                      <div 
                        style={{ transform: 'translateZ(45px)' }}
                        className="space-y-2.5 my-2"
                      >
                        <div className="p-2.5 rounded-xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-xs">
                          <span className="text-[10px] uppercase tracking-wider text-slate-600 block font-semibold">Elevation Point</span>
                          <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                            <Wind className="w-3.5 h-3.5 text-[#ff4d36]" />
                            {card.altitude}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-xs">
                          <span className="text-[10px] uppercase tracking-wider text-slate-600 block font-semibold">Dark Sky Index</span>
                          <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            {card.skyRating}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-xs">
                          <span className="text-[10px] uppercase tracking-wider text-slate-600 block font-semibold">Typical Temperature</span>
                          <span className="text-sm font-bold text-slate-800 mt-0.5 block">{card.temperature}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-xs">
                          <span className="text-[10px] uppercase tracking-wider text-slate-600 block font-semibold">Key Wildlife Documented</span>
                          <span className="text-xs font-medium text-slate-700 mt-0.5 block line-clamp-1">{card.wildlife}</span>
                        </div>
                      </div>

                      {/* Back Bottom CTA */}
                      <div 
                        style={{ transform: 'translateZ(50px)' }}
                        className="pt-2 border-t border-slate-100 flex items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectStay(card.stayId);
                          }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                        >
                          <span>Open Verified Shelter & Guide</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators / Quick Selection Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {SPATIAL_CARDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === activeIndex 
                  ? 'w-8 bg-[#ff4d36] shadow-[0_0_10px_rgba(255,77,54,0.4)]' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Jump to 3D card ${i + 1}`}
            />
          ))}
        </div>

        {/* Tip indicator */}
        <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5 px-4 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#ff4d36] shrink-0" />
          <span>Move mouse or swipe &amp; tilt your phone/tablet in 3D. Tap &ldquo;Specs&rdquo; to flip card. Tap &ldquo;Shuffle 3D&rdquo; to disperse!</span>
        </p>
      </div>
    </section>
  );
};
