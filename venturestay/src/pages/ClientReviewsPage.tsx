import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp, Filter, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  tripTaken: string;
  rating: number;
  date: string;
  verifiedBooking: boolean;
  avatar: string;
  comment: string;
  highlight: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r-1',
    name: 'Henrik & Sophie Althaus',
    location: 'Munich, Germany',
    tripTaken: 'The Frozen Zanskar Chadar & Ice Gorge Odyssey',
    rating: 5,
    date: 'February 2026',
    verifiedBooking: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'Nothing prepares you for the sound of sheet ice vibrating beneath your crampons while looking up at 800m sheer vertical canyon walls. Guide Tenzin Norbu was extraordinary—his pulse oximeter checks twice daily and hot ginger thukpa at night kept our spirits soaring in -25°C. Flawless logistics from start to finish.',
    highlight: 'Safe, life-altering winter ice expedition'
  },
  {
    id: 'r-2',
    name: 'Dr. Raymond Chen',
    location: 'San Francisco, USA',
    tripTaken: 'Patagonia Southern Icefield & Granite Towers Circuit',
    rating: 5,
    date: 'January 2026',
    verifiedBooking: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'Having done climbs across four continents, I hold high standards for safety and logistics. VentureTravel delivered perfection. The chartered helicopter directly to our geodesic dome saved 8 hours of bumpy driving, and seeing three wild pumas near Laguna Amarga with Matias was unforgettable.',
    highlight: 'World-class guides and seamless heli transfers'
  },
  {
    id: 'r-3',
    name: 'Kavita & Arvind Swaminathan',
    location: 'Mumbai, India',
    tripTaken: 'Spiti Valley High Altitude Fossil & Monastery Trail',
    rating: 5,
    date: 'October 2025',
    verifiedBooking: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    comment: 'We wanted a true spiritual and geological journey through Spiti without roughing it in sub-standard motels. The mud-brick heated villa in Langza was pure boutique bliss, with heated floors and clear views of Chau Chau Kang Nilda. We even found prehistoric ammonite fossils with local villagers!',
    highlight: 'Boutique Himalayan luxury at 14,500ft'
  },
  {
    id: 'r-4',
    name: 'Captain Liam O’Connor',
    location: 'Dublin, Ireland',
    tripTaken: 'Lofoten Arctic Midnight Kayak & Fjord Odyssey',
    rating: 5,
    date: 'July 2025',
    verifiedBooking: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Paddling through Reinefjorden at midnight under broad daylight, followed by an immediate wood-fired sauna and fjord plunge, is the definition of pure living. Astrid Lindholm is the most skilled sea kayak guide I have ever followed.',
    highlight: 'Unmatched Arctic sea kayaking'
  }
];

export const ClientReviewsPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [filterRating, setFilterRating] = useState<number>(0);

  const filtered = filterRating > 0 ? REVIEWS.filter(r => r.rating === filterRating) : REVIEWS;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.98 / 5.0 RATING ACROSS 520+ EXPEDITIONS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Verified Client Reviews & <span className="text-[#ff4d36]">Expedition Testimonials</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Read unfiltered impressions from seasoned mountaineers, solo wilderness photographers, and luxury travelers who explored with VentureTravel Agency.
          </p>

          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setFilterRating(0)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold cursor-pointer ${
                filterRating === 0 ? 'bg-[#ff4d36] text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold cursor-pointer flex items-center gap-1 ${
                filterRating === 5 ? 'bg-[#ff4d36] text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              <span>5 Stars Only</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs" />
                  <div>
                    <h3 className="font-syne font-bold text-sm sm:text-base text-slate-900">{r.name}</h3>
                    <span className="text-xs text-slate-500 font-mono">{r.location} • {r.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {r.verifiedBooking && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Climber</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono font-bold text-blue-600 block mb-1">
                  Trip: {r.tripTaken}
                </span>
                <h4 className="font-syne font-bold text-base text-slate-900 mb-2">
                  "{r.highlight}"
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
