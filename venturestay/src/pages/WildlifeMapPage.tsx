import React, { useState } from 'react';
import { 
  Compass, MapPin, Calendar, Eye, ShieldCheck, 
  Sparkles, ArrowRight, HeartHandshake, CheckCircle2 
} from 'lucide-react';

interface WildlifeCorridor {
  id: string;
  species: string;
  scientificName: string;
  region: string;
  country: string;
  conservationStatus: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Near Threatened';
  peakSightingWindow: string;
  sightingProbability: string; // e.g. 78%
  habitatAltitude: string;
  trackingProtocol: string;
  sanctuaryNotes: string;
  ethicalGuidelines: string[];
}

const CORRIDORS: WildlifeCorridor[] = [
  {
    id: 'snow-leopard',
    species: 'Himalayan Snow Leopard (Shan)',
    scientificName: 'Panthera uncia',
    region: 'Kibber Wildlife Sanctuary, Spiti',
    country: 'India',
    conservationStatus: 'Vulnerable',
    peakSightingWindow: 'December to March (Winter Snowline Descent)',
    sightingProbability: '82% on 7-day winter field tracking',
    habitatAltitude: '3,800m - 4,800m',
    trackingProtocol: 'Swarovski 85mm spotting scopes, high-ridge telemetry, and native Spitian trackers (Kalsang & Norbu)',
    sanctuaryNotes: 'Kibber is home to one of the highest densities of snow leopards on Earth, following blue sheep (bharal) and ibex herds as heavy winter snowfall drives them down into river gorges.',
    ethicalGuidelines: [
      'Strict 200m minimum standoff distance using high-power spotting scopes',
      'Zero drone flight permits within the wildlife sanctuary perimeter',
      'Silenced movement in gorge corridors to prevent herd disruption'
    ]
  },
  {
    id: 'patagonian-puma',
    species: 'Patagonian Mountain Lion (Puma)',
    scientificName: 'Puma concolor puma',
    region: 'Torres del Paine Estancia Corridors',
    country: 'Chile',
    conservationStatus: 'Near Threatened',
    peakSightingWindow: 'October to April',
    sightingProbability: '88% with private estancia tracker',
    habitatAltitude: '100m - 1,200m',
    trackingProtocol: 'Early dawn 4x4 perimeter sweeps along Laguna Amarga sheep corridors and guanaco hunting grounds',
    sanctuaryNotes: 'Protected within private conservation estancias bordering Torres del Paine National Park, where pumas hunt wild guanacos across the golden pampas.',
    ethicalGuidelines: [
      'Single tracking vehicle per puma family to avoid stressing cubs',
      'Never interpose between a predator and its cached prey',
      'All tracking conducted alongside licensed CONAF biological guides'
    ]
  },
  {
    id: 'humpback-orca',
    species: 'Arctic Orcas & Humpback Whales',
    scientificName: 'Megaptera novaeangliae & Orcinus orca',
    region: 'Lofoten & Vestfjorden',
    country: 'Norway',
    conservationStatus: 'Vulnerable',
    peakSightingWindow: 'November to February (Winter Herring Inflow)',
    sightingProbability: '92% on winter fjord expeditions',
    habitatAltitude: 'Sea Level / Glacial Fjords',
    trackingProtocol: 'Hydrophone underwater listening arrays and silent RIB drift navigation',
    sanctuaryNotes: 'Billions of spring-spawning Atlantic herrings shelter inside Vestfjorden, drawing massive pods of humpback whales, orcas, and fin whales.',
    ethicalGuidelines: [
      'Engine cut to idle at 300m boundary',
      'Hydrophone passive listening without acoustic sonar pings',
      'Support local marine research tagging programs'
    ]
  },
  {
    id: 'bengal-tiger-rhino',
    species: 'One-Horned Rhinoceros & Royal Bengal Tiger',
    scientificName: 'Rhinoceros unicornis & Panthera tigris',
    region: 'Kaziranga & Manas National Park, Assam',
    country: 'Northeast India',
    conservationStatus: 'Endangered',
    peakSightingWindow: 'November to April',
    sightingProbability: '95% (Rhino) / 64% (Tiger)',
    habitatAltitude: '60m - 120m',
    trackingProtocol: 'Low-impact electric safari vehicles and licensed Assam Forest Department armed rangers',
    sanctuaryNotes: 'Kaziranga hosts two-thirds of the world’s great one-horned rhinoceroses amidst elephant grass plains and Brahmaputra floodplains.',
    ethicalGuidelines: [
      'Strict adherence to forest department designated trail paths',
      'No flash photography or baiting under any circumstances',
      '10% of expedition revenue directly fund anti-poaching patrol camps'
    ]
  }
];

export const WildlifeMapPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [selectedId, setSelectedId] = useState<string>(CORRIDORS[0].id);
  const current = CORRIDORS.find(c => c.id === selectedId) || CORRIDORS[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>ETHICAL WILDLIFE CONSERVATION CORRIDORS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Wildlife Migration & <span className="text-[#ff4d36]">Sanctuary Tracking</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Experience non-invasive tracking of the planet's most elusive apex predators alongside native naturalists, thermal optics, and strict conservation protocols.
          </p>

          {/* Species tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {CORRIDORS.map(cor => (
              <button
                key={cor.id}
                onClick={() => setSelectedId(cor.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedId === cor.id
                    ? 'bg-[#ff4d36] text-white shadow-lg'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cor.species}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-mono font-bold">
                  Status: {current.conservationStatus}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  Sighting Odds: {current.sightingProbability}
                </span>
              </div>
              <h2 className="font-syne font-black text-2xl sm:text-4xl text-slate-900">
                {current.species}
              </h2>
              <p className="text-xs font-mono italic text-slate-500 mt-1">
                {current.scientificName} • {current.region}, {current.country}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">PEAK FIELD WINDOW</span>
              <span className="text-xs font-bold font-syne text-[#ff4d36]">{current.peakSightingWindow}</span>
              <span className="text-[11px] text-slate-500 block mt-1 font-mono">Elevation: {current.habitatAltitude}</span>
            </div>
          </div>

          <div className="py-6 border-b border-slate-200">
            <h3 className="font-syne font-bold text-base text-slate-900 mb-2">
              Habitat Ecology & Sighting Mechanics
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {current.sanctuaryNotes}
            </p>
          </div>

          <div className="py-6 border-b border-slate-200">
            <h3 className="font-syne font-bold text-base text-slate-900 mb-2">
              VentureTravel Tracking & Field Protocol
            </h3>
            <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed font-mono text-xs">
              {current.trackingProtocol}
            </p>
          </div>

          <div className="pt-6">
            <h3 className="font-syne font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Ethical Wildlife Viewing Protocols</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {current.ethicalGuidelines.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-slate-800">
                  <span className="text-emerald-700 font-bold block mb-1">Standard 0{idx + 1}</span>
                  {rule}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Includes mandatory conservation levy fees paid directly to local wildlife forest guards.
            </div>
            <button
              onClick={() => onNavigatePage('trip-builder')}
              className="px-6 py-3 rounded-full bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-xs shadow-md cursor-pointer shrink-0"
            >
              Plan Custom Wildlife Safari
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
