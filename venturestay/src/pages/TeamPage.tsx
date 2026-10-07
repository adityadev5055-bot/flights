import React from 'react';
import { Award, Compass, ShieldCheck, Mountain, MapPin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  summits: string[];
  bio: string;
  avatar: string;
  baseLocation: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Tenzin Norbu Lama',
    role: 'Chief High-Altitude Expedition Director',
    credentials: 'IFMGA / UIAGM Certified Mountain Guide (#314)',
    summits: ['Everest (8,848m - 4x)', 'Manaslu (8,163m)', 'Stok Kangri (6,153m - 28x)', 'Chau Chau Kang Nilda (6,303m)'],
    bio: 'Born in Kibber Village at 14,200ft, Tenzin has spent 22 years leading private mountaineering ascents across the Karakoram, Zanskar, and Spiti ranges. He serves as our chief mountain safety officer and trains local Himalayan youths in advanced rope safety.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    baseLocation: 'Leh & Kaza, Himalayas'
  },
  {
    name: 'Dr. Clara von Berg',
    role: 'Director of Polar & High-Altitude Medicine',
    credentials: 'MD, DiMM (Diploma in Mountain Medicine) • UIAA Medical Commission',
    summits: ['Mont Blanc (4,808m)', 'Aconcagua (6,961m)', 'Denali (6,190m)'],
    bio: 'Former Swiss air rescue alpine emergency physician. Dr. von Berg oversees all VentureTravel acclimatization protocols, Gamow hyperbaric deployment, and emergency satellite medical telemetry.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    baseLocation: 'Zürich, Switzerland'
  },
  {
    name: 'Matias Valenzuela',
    role: 'Head of Patagonian Operations & Puma Biology',
    credentials: 'CONAF Certified Senior Naturalist • WFR Certified',
    summits: ['Torres del Paine Central Tower', 'Mount Fitz Roy North Ridge', 'Cerro Torre Base'],
    bio: 'Third-generation Chilean gaucho naturalist and wildlife tracker. Matias has spent 18 years studying puma predatory corridors and leading private conservation traverses along the Southern Patagonian Icefield.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    baseLocation: 'Puerto Natales, Chile'
  },
  {
    name: 'Astrid Lindholm',
    role: 'Arctic Expedition Lead & Master Sea Kayaker',
    credentials: 'British Canoeing Level 5 Sea Leader • NORTIND Mountain Guide',
    summits: ['Reinebringen Winter Face', 'Stetind South Pillar', 'Svalbard High Icefield Traverse'],
    bio: 'Raised north of the Arctic Circle in Lofoten. Astrid is an expert in coastal navigation, sub-zero tidal currents, and winter ski mountaineering across Northern Scandinavia.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    baseLocation: 'Svolvær, Norway'
  }
];

export const TeamPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>EXPEDITION MASTERS & MOUNTAIN DIRECTORS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            The World’s Elite <span className="text-[#ff4d36]">Mountain Specialists</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Every VentureTravel itinerary is designed and led by veteran mountaineers, certified UIAGM guides, and wilderness physicians who have dedicated their lives to extreme environments.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-md" />
                  <div>
                    <h3 className="font-syne font-bold text-lg text-slate-900">{member.name}</h3>
                    <span className="text-xs font-bold text-[#ff4d36] block">{member.role}</span>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{member.credentials}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">NOTABLE EXPEDITIONS & ASCENTS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.summits.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ff4d36]" />
                  {member.baseLocation}
                </span>
                <button
                  onClick={() => onNavigatePage('contact')}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Request Consultation →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
