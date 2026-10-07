import React, { useState } from 'react';
import { 
  BookOpen, Calendar, MapPin, User, Star, 
  MessageSquare, Heart, Compass, ArrowRight 
} from 'lucide-react';

interface FieldDispatch {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  region: string;
  elevation: string;
  coverImage: string;
  readTime: string;
  excerpt: string;
  fullBody: string[];
  fieldNotes: string[];
  gearUsed: string;
}

const DISPATCHES: FieldDispatch[] = [
  {
    id: 'disp-1',
    title: 'Ten Below Zero on the Glass of the Chadar: Crossing the Zanskar Abyss',
    author: 'David Thorne',
    authorRole: 'Client Expedition Climber (London, UK)',
    date: 'February 14, 2026',
    region: 'Zanskar River Gorge, Ladakh',
    elevation: '3,850m',
    coverImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    excerpt: 'The ice groans beneath your crampons—a deep, resonating whale song echoing between sheer 800-meter vertical limestone cliffs.',
    fullBody: [
      'Stepping off the heated Land Cruiser at Chilling and onto the translucent sheet ice of the Zanskar River was like stepping onto another planet. The temperature had plunged to -24°C overnight. Steam rose from narrow leads where black, roaring glacial water tore through fissures in the ice.',
      'Our lead guide, Kalsang Tashi, tapped the ice ahead of each of us with his wooden pole, reading the color gradient: dark sapphire meant thick, solid sheet ice; milky white meant aerated brittle crust to be avoided. By afternoon of Day 4, we arrived at Naerak. Seeing a 56-meter waterfall frozen completely solid into azure stalactites suspended over the gorge brought complete silence to our entire team.',
      'That night, sitting around the juniper fire inside a natural geological cave while our chef served steaming thukpa broth, I realized why VentureTravel insists on private small groups. Out here, you are not a tourist; you are part of a tight-knit mountain fellowship.'
    ],
    fieldNotes: [
      'Average nighttime temperature: -28°C',
      'Crampon traction: 100% on bare river ice',
      'SpO2 reading: 88% after 48hr Leh acclimatization'
    ],
    gearUsed: 'Western Mountaineering -30°C bag, Scarpa Phantom 6000 boots, Kahtoola spikes'
  },
  {
    id: 'disp-2',
    title: 'Cathedral of Spires: Sunrise over Mirador Las Torres in 80 km/h Gusts',
    author: 'Elena & Marcus Lindqvist',
    authorRole: 'Private Traverse Travelers (Stockholm, Sweden)',
    date: 'January 28, 2026',
    region: 'Torres del Paine, Patagonia',
    elevation: '900m',
    coverImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    excerpt: 'We woke at 03:30 AM in our geodesic dome. The wind screamed across Lake Nordenskjöld, but our UIAGM guide Matias gave the nod: the clouds were parting above the towers.',
    fullBody: [
      'The final push up the moraine bouldering field in pitch darkness tested every fiber of our quadriceps. Patagonian wind gusts had the power to stop a grown climber in mid-stride. But when the first rays of horizontal orange sunlight struck the pink granite faces of the Central and North Towers, the glacial lake below turned into an incandescent sheet of liquid copper.',
      'The sheer verticality of 1,000 meters of bare granite rising straight from the moraine is humbling beyond words. Returning to our private dome camp to find a wood-fired sauna stoked and a glass of Carménère waiting was the height of wilderness luxury.'
    ],
    fieldNotes: [
      'Wind gusts measured at Mirador: 82 km/h',
      'Ascent time from Refugio: 3 hrs 40 mins',
      'Wild condor sighting: 2 adults banking overhead'
    ],
    gearUsed: 'Arc’teryx Alpha SV jacket, Leki carbon poles, UV Category 4 eyewear'
  },
  {
    id: 'disp-3',
    title: 'Finding 200-Million-Year-Old Sea Ammonites at 14,500 Feet in Langza',
    author: 'Priya Narayanan',
    authorRole: 'Astrophotographer & Solo Adventurer (Bangalore)',
    date: 'October 12, 2025',
    region: 'Spiti Valley, Himachal Pradesh',
    elevation: '4,420m',
    coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    readTime: '7 min read',
    excerpt: 'How does a prehistoric marine fossil end up on a rooftop plateau in the Himalayas? Holding an ammonite high in the thin air of Langza answers that question in awe.',
    fullBody: [
      'Standing beside the giant golden Buddha statue of Langza facing Chau Chau Kang Nilda peak at sunset is a spiritual benchmark. The rock beneath your boots was once the floor of the ancient Tethys Sea, thrust four vertical miles into the stratosphere by the continental collision of India and Asia.',
      'At 11:00 PM, the temperature dropped to -8°C. I set up my Sony A7IV and 14mm GM prime lens on the equator tracker. With zero artificial lights within 50 kilometers, the Milky Way core arching over the snow summits looked like a dense silver cloud.'
    ],
    fieldNotes: [
      'Sky Quality Meter reading: 21.98 mag/arcsec²',
      'Fossils located: 3 complete spiral ammonites',
      'Solar-heated mud villa maintained +21°C indoor warmth'
    ],
    gearUsed: 'Sony A7IV, 14mm f/1.8 GM, Sky-Watcher Star Adventurer GTi'
  }
];

export const DispatchesPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [selectedId, setSelectedId] = useState<string>(DISPATCHES[0].id);
  const current = DISPATCHES.find(d => d.id === selectedId) || DISPATCHES[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>AUTHENTIC CLIENT JOURNALS & FIELD DISPATCHES</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Expedition Field Logs & <span className="text-[#ff4d36]">Climber Dispatches</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Unfiltered field narratives, summit chronicles, and photographic logs written by clients and expedition leaders returning from high-altitude frontiers.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {DISPATCHES.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedId === d.id
                    ? 'bg-[#ff4d36] text-white shadow-lg'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {d.region.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>{current.date}</span>
            <span>•</span>
            <span>{current.region}</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">{current.elevation}</span>
            <span>•</span>
            <span>{current.readTime}</span>
          </div>

          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
            {current.title}
          </h2>

          <div className="flex items-center gap-3 my-4 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center font-syne text-sm">
              {current.author[0]}
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 block">{current.author}</span>
              <span className="text-xs text-slate-500">{current.authorRole}</span>
            </div>
          </div>

          <div className="h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md my-6">
            <img src={current.coverImage} alt={current.title} className="w-full h-full object-cover" />
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {current.fullBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Field telemetry box */}
          <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-syne font-bold text-xs uppercase tracking-widest text-slate-500 mb-3">
              Expedition Leader Field Telemetry Log
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              {current.fieldNotes.map((note, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                  {note}
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-slate-500 font-mono">
              Gear tested: <span className="text-slate-800 font-bold">{current.gearUsed}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Inspired by this dispatch? Our mountain specialists can replicate this route.
            </div>
            <button
              onClick={() => onNavigatePage('trip-builder')}
              className="px-6 py-2.5 rounded-xl bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-xs shadow-md cursor-pointer shrink-0"
            >
              Build Trip Along This Route
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
