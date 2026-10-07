import React from 'react';
import { Compass, ShieldCheck, Heart, Mail, Phone, Globe, ExternalLink, Mountain, Plane, Radio, FileText, Leaf, Star, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onSelectCategory: (cat: 'all' | 'accommodations' | 'guides') => void;
  onNavigatePage?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSelectCategory,
  onNavigatePage = (_pageId: string) => {}
}) => {
  const handleNav = (pageId: string) => {
    onNavigatePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white/10 backdrop-blur-3xl text-slate-700 text-xs border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff4d36] to-[#e03820] flex items-center justify-center text-white font-black text-lg shadow-md">
                <span className="font-syne">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne font-extrabold text-xl text-slate-900 tracking-wider">
                  VENTURE<span className="text-[#ff4d36]">TRAVEL</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 -mt-1">
                  Accredited Travel Agency • Est. 2012
                </span>
              </div>
            </div>

            <p className="text-slate-600 max-w-sm leading-relaxed">
              VentureTravel Agency is a licensed, bonded luxury expedition and high-altitude adventure travel consultancy. We design custom tailor-made itineraries, manage remote wilderness logistics, and pair travelers with certified IFMGA guides and inspected sanctuaries.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button 
                onClick={() => handleNav('insurance-bonding')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#ff4d36] border border-red-400/30 text-[11px] font-semibold hover:border-[#ff4d36] hover:bg-white/40 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>IATA Accredited #96-24810</span>
              </button>
              <button
                onClick={() => handleNav('insurance-bonding')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-blue-700 border border-blue-400/30 text-[11px] font-semibold hover:border-blue-500 hover:bg-white/40 cursor-pointer shadow-xs"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>ASTA Member #4489</span>
              </button>
            </div>
          </div>

          {/* Expeditions & Routes */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-slate-900 text-sm">Expeditions & Routes</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('expeditions')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  Himalayan High Passes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('expeditions')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  Zanskar Frozen Chadar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('expeditions')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  Patagonia Granite Spires
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('expeditions')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  Lofoten Arctic Sea Kayaking
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('trip-builder')} className="text-[#ff4d36] hover:underline transition-colors cursor-pointer text-left font-semibold">
                  Custom Expedition Builder →
                </button>
              </li>
            </ul>
          </div>

          {/* Alpine Field Telemetry */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-slate-900 text-sm">Field Radar & Tools</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('weather-radar')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  Live Alpine Weather Radar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gear-checklist')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  Gear & Pack Weight Calc
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('altitude-medicine')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  Lake Louise AMS Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dark-sky')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  Dark Sky & Astrophotography
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('wildlife-corridors')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  Wildlife Sanctuary Corridors
                </button>
              </li>
            </ul>
          </div>

          {/* Agency & Support */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-slate-900 text-sm">Agency & Safety</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('permits')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  High-Altitude Permits & ILP
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('logistics-fleet')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  Aviation & 4x4 Fleet
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('emergency-sos')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  24/7 Satellite SOS Protocols
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('team')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  UIAGM Mountain Directors
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sustainability')} className="hover:text-[#ff4d36] transition-colors cursor-pointer text-left">
                  Carbon Ledger & Eco Charter
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="text-slate-900 hover:text-[#ff4d36] transition-colors cursor-pointer text-left font-bold">
                  Global Agency Desks →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div>
            © {new Date().getFullYear()} VentureTravel Agency Ltd. Registered High-Altitude Tour Operator & Travel Consultancy.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('insurance-bonding')} className="hover:text-slate-900 cursor-pointer">
              Agency Charter & Escrow
            </button>
            <button onClick={() => handleNav('faq')} className="hover:text-slate-900 cursor-pointer">
              Agency FAQ
            </button>
            <button onClick={() => handleNav('emergency-sos')} className="hover:text-slate-900 cursor-pointer">
              Field Safety Protocols
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

