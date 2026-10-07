import React, { useState } from 'react';
import { ShieldCheck, Award, MapPin, Compass, Search, Star, CheckCircle2 } from 'lucide-react';

interface GuideProfile {
  id: string;
  name: string;
  region: 'Himalayas' | 'Patagonia' | 'Arctic Norway';
  certification: string;
  experienceYears: number;
  spokenLanguages: string[];
  specialty: string;
  avatar: string;
  safetyRecord: string;
}

const ALL_GUIDES: GuideProfile[] = [
  {
    id: 'g-1',
    name: 'Tenzin Norbu Lama',
    region: 'Himalayas',
    certification: 'IFMGA / UIAGM Full Mountain Guide',
    experienceYears: 22,
    spokenLanguages: ['Tibetan', 'Hindi', 'English'],
    specialty: 'High-Altitude Technical Summits & Ice Fall Navigation',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    safetyRecord: '100% Incident-Free Safety Record over 280+ high-altitude ascents'
  },
  {
    id: 'g-2',
    name: 'Kalsang Dorje',
    region: 'Himalayas',
    certification: 'IMF Advanced Mountaineering & WFR',
    experienceYears: 14,
    spokenLanguages: ['Spitian', 'Hindi', 'English'],
    specialty: 'Snow Leopard Telemetry & Winter Chadar Ice Formations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    safetyRecord: 'Recipient of Himachal Pradesh Mountaineering Rescue Commendation'
  },
  {
    id: 'g-3',
    name: 'Matias Valenzuela',
    region: 'Patagonia',
    certification: 'CONAF Senior Naturalist Guide & UIAGM Aspirant',
    experienceYears: 18,
    spokenLanguages: ['Spanish', 'English', 'German'],
    specialty: 'Southern Icefield Traverses & Wild Puma Tracking',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    safetyRecord: 'Over 140 W-Circuits and 45 Southern Patagonian Ice Cap expeditions'
  },
  {
    id: 'g-4',
    name: 'Camila Rodriguez',
    region: 'Patagonia',
    certification: 'Chilean Alpine Federation (FEACH) Senior Climber',
    experienceYears: 11,
    spokenLanguages: ['Spanish', 'English', 'French'],
    specialty: 'Granite Big Wall Rope Systems & Glacier Crevasse Rescue',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    safetyRecord: 'Certified Wilderness Emergency Medical Technician (WEMT)'
  },
  {
    id: 'g-5',
    name: 'Astrid Lindholm',
    region: 'Arctic Norway',
    certification: 'British Canoeing Level 5 Sea Leader & NORTIND Guide',
    experienceYears: 15,
    spokenLanguages: ['Norwegian', 'English', 'Swedish'],
    specialty: 'Arctic Sea Kayaking, Fjord Tides & Polar Winter Survival',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    safetyRecord: 'Certified Royal Norwegian Marine Rescue volunteer instructor'
  },
  {
    id: 'g-6',
    name: 'Sven Halvorsen',
    region: 'Arctic Norway',
    certification: 'UIAGM Mountain Guide & Polar Bear Defense Qualified',
    experienceYears: 19,
    spokenLanguages: ['Norwegian', 'English'],
    specialty: 'Ski Mountaineering Couloirs & Svalbard Glacier Crossings',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    safetyRecord: 'Former Norwegian Alpine Rescue Corps Team Leader'
  }
];

export const GuidesDirectoryPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = ALL_GUIDES.filter(g => {
    if (filterRegion !== 'All' && g.region !== filterRegion) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase()) && !g.specialty.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>CERTIFIED UIAGM / IFMGA & CONAF MOUNTAIN MASTERS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Certified Expedition <span className="text-[#ff4d36]">Guides Directory</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            VentureTravel operates with a strict 1:4 maximum guide-to-client ratio. Every guide holds internationally accredited licenses, wilderness trauma medical certification, and multi-decade regional experience.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['All', 'Himalayas', 'Patagonia', 'Arctic Norway'].map(r => (
              <button
                key={r}
                onClick={() => setFilterRegion(r)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors ${
                  filterRegion === r ? 'bg-[#ff4d36] text-white' : 'bg-slate-900 border border-slate-800 text-slate-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(guide => (
            <div key={guide.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={guide.avatar} alt={guide.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                  <div>
                    <h3 className="font-syne font-bold text-base text-slate-900">{guide.name}</h3>
                    <span className="text-xs font-bold text-[#ff4d36] block">{guide.region}</span>
                    <span className="text-[11px] font-mono text-slate-500 block">{guide.experienceYears} Years Experience</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px] font-mono uppercase text-blue-600 mb-0.5">License & Credential</span>
                  {guide.certification}
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  <strong>Specialty:</strong> {guide.specialty}
                </p>

                <div className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/80 font-mono">
                  ✓ {guide.safetyRecord}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Languages: {guide.spokenLanguages.join(', ')}</span>
                <button
                  onClick={() => onNavigatePage('trip-builder')}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Request Guide →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
