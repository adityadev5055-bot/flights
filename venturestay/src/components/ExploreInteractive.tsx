import React, { useState } from 'react';
import { Sparkles, Trees, ShieldCheck, Compass, Info, CheckCircle2 } from 'lucide-react';

interface ExploreInteractiveProps {
  onOpenStays: () => void;
  onOpenGuides: () => void;
}

export const ExploreInteractive: React.FC<ExploreInteractiveProps> = ({
  onOpenStays,
  onOpenGuides
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      top: '28%',
      left: '78%',
      title: 'Protected Ancient Canopy Buffer',
      text: "Whether you're planning a family vacation with your pet, a relaxing weekend getaway, 2 million tree conservation zone.",
      metric: '2.4M Native Trees Protected'
    },
    {
      id: 2,
      top: '58%',
      left: '68%',
      title: 'Certified Zero-Impact Architecture',
      text: "Whether you're planning a family vacation with your pet, a relaxing architectural stay built on elevated micro-piles.",
      metric: '0 Trees Felled During Build'
    },
    {
      id: 3,
      top: '75%',
      left: '60%',
      title: 'Licensed Naturalist Waypoints',
      text: "Vacation with your pet, a relaxing weekend getaway guided by accredited indigenous wilderness trackers.",
      metric: '100% Certified Local Rangers'
    }
  ];

  return (
    <section className="w-full py-24 bg-white/10 backdrop-blur-2xl border-t border-white/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold block mb-1">
            PROTECTED ECO-SYSTEM CORRIDORS
          </span>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Explore The Nature With Us
          </h2>
          <div className="w-20 h-1 bg-[#ff4d36] mx-auto mt-4 rounded-full" />
          <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto">
            Click interactive nodes to examine our verified environmental standards and protected wilderness corridors.
          </p>
        </div>

        {/* Interactive Diagram Stage */}
        <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden border border-white/50 shadow-xl group">
          
          {/* Background Dense Forest Image */}
          <img
            src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=80"
            alt="Lush ancient forest"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/70 pointer-events-none" />

          {/* Red/Blue Focus Bounding Box */}
          <div className="absolute top-[18%] right-[8%] w-[68%] sm:w-[48%] h-[68%] border-2 border-[#ff4d36]/80 rounded-xl pointer-events-none shadow-[0_0_25px_rgba(255,77,54,0.3)]">
            <div className="absolute top-2 right-2 text-[10px] font-mono tracking-widest uppercase text-white px-2 py-0.5 bg-[#ff4d36] font-bold rounded">
              VERIFIED ECO-SECTOR #04
            </div>
          </div>

          {/* SVG Connecting Callout Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Ray to Hotspot 1 */}
            <line
              x1="32%"
              y1="30%"
              x2="78%"
              y2="28%"
              stroke="#ff4d36"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />
            {/* Ray to Hotspot 2 */}
            <line
              x1="38%"
              y1="60%"
              x2="68%"
              y2="58%"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />
            {/* Ray to Hotspot 3 */}
            <line
              x1="28%"
              y1="80%"
              x2="60%"
              y2="75%"
              stroke="#ff4d36"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />
          </svg>

          {/* Callout Cards on Left */}
          <div className="absolute inset-0 z-20 flex flex-col justify-around p-6 sm:p-12 max-w-md pointer-events-auto">
            
            {/* Callout 1 */}
            <div
              id="callout-1"
              onMouseEnter={() => setActiveHotspot(1)}
              onMouseLeave={() => setActiveHotspot(null)}
              className={`p-4 rounded-2xl backdrop-blur-xl border transition-all cursor-pointer ${
                activeHotspot === 1
                  ? 'bg-black/50 border-[#ff4d36] shadow-[0_0_25px_rgba(255,77,54,0.4)] translate-x-2'
                  : 'bg-black/30 border-white/20 hover:border-[#ff4d36]/60 hover:bg-black/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#ff4d36] font-bold mb-1">
                <span>CANOPY CORRIDOR</span>
                <span className="text-[10px] bg-red-500/20 text-red-200 px-1.5 py-0.5 rounded font-mono">2M+ TREES</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Whether you're planning a family vacation with your pet, a relaxing weekend getaway, 2 million tree reserve.
              </p>
            </div>

            {/* Callout 2 */}
            <div
              id="callout-2"
              onMouseEnter={() => setActiveHotspot(2)}
              onMouseLeave={() => setActiveHotspot(null)}
              className={`p-4 rounded-2xl backdrop-blur-xl border transition-all cursor-pointer ${
                activeHotspot === 2
                  ? 'bg-black/50 border-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] translate-x-2'
                  : 'bg-black/30 border-white/20 hover:border-blue-400/60 hover:bg-black/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-1">
                <span>PASSIVE TIMBER ECO-STAYS</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-200 px-1.5 py-0.5 rounded font-mono">ZERO-CARBON</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Whether you're planning a family vacation with your pet, a relaxing architectural haven in untouched nature.
              </p>
            </div>

            {/* Callout 3 */}
            <div
              id="callout-3"
              onMouseEnter={() => setActiveHotspot(3)}
              onMouseLeave={() => setActiveHotspot(null)}
              className={`p-4 rounded-2xl backdrop-blur-xl border transition-all cursor-pointer ${
                activeHotspot === 3
                  ? 'bg-black/50 border-[#ff4d36] shadow-[0_0_25px_rgba(255,77,54,0.4)] translate-x-2'
                  : 'bg-black/30 border-white/20 hover:border-[#ff4d36]/60 hover:bg-black/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#ff4d36] font-bold mb-1">
                <span>LICENSED LOCAL EXPEDITIONS</span>
                <span className="text-[10px] bg-red-500/20 text-red-200 px-1.5 py-0.5 rounded font-mono">CERTIFIED</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Vacation with your pet, a relaxing weekend getaway accompanied by top regional guides.
              </p>
            </div>

          </div>

          {/* Glowing Pin Hotspots on the Map/Image */}
          {hotspots.map((spot) => {
            const isHovered = activeHotspot === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                style={{ top: spot.top, left: spot.left }}
                aria-label={spot.title}
                className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isHovered
                    ? 'bg-[#ff4d36] text-white scale-125 shadow-[0_0_20px_#ff4d36]'
                    : 'bg-white text-slate-900 hover:bg-[#ff4d36] hover:text-white shadow-lg'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-60 pointer-events-none" />
              </button>
            );
          })}

          {/* Bottom Right CTA */}
          <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenStays}
              className="px-5 py-2.5 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white text-xs font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              Explore Verified Accommodations
            </button>
            <button
              onClick={onOpenGuides}
              className="px-5 py-2.5 rounded-full bg-white/30 hover:bg-white/50 text-white border border-white/40 backdrop-blur-md text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              Meet Nature Guides
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
