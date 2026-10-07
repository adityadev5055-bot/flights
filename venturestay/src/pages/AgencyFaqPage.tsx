import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck, PhoneCall } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Fitness & Preparation' | 'Logistics & Permits' | 'Gear & Equipment' | 'Booking & Cancellation';
}

const FAQS: FaqItem[] = [
  {
    category: 'Fitness & Preparation',
    question: 'What physical fitness level is required for high-altitude Himalayan treks?',
    answer: 'For treks exceeding 3,500m (such as Spiti or Chadar), we recommend a minimum baseline of aerobic conditioning: being able to jog 5km in under 32 minutes or sustain 45 minutes on a stairmaster with a 10kg backpack. Our team provides an 8-week customized pre-departure conditioning guide upon booking.'
  },
  {
    category: 'Fitness & Preparation',
    question: 'How does VentureTravel manage acclimatization to prevent altitude sickness (AMS)?',
    answer: 'All Himalayan itineraries incorporate a mandatory 48-hour acclimatization rest in Leh (3,500m) or Manali before crossing high passes. We enforce a maximum sleeping elevation gain of 500m per day, conduct bi-daily pulse oximetry checks, and provide medical oxygen and Gamow hyperbaric chambers on all treks.'
  },
  {
    category: 'Logistics & Permits',
    question: 'Who arranges our Inner Line Permits (ILP) and Wildlife Sanctuary Passes?',
    answer: 'VentureTravel is a fully accredited agency with dedicated liaisons in Leh, Shimla, and Guwahati. We process all official government clearances, Inner Line Permits, and national park passes turnkey. You only need to submit digital passport scans during confirmation.'
  },
  {
    category: 'Logistics & Permits',
    question: 'Can foreign nationals participate in sensitive border region expeditions?',
    answer: 'Yes. Foreign nationals can enter Spiti, Ladakh, and Northeast India under Protected Area Permits (PAP). Foreigners must travel in groups of 2 or more with a certified, registered agency escort (which VentureTravel provides).'
  },
  {
    category: 'Gear & Equipment',
    question: 'Do I have to purchase expensive -30°C mountaineering gear, or can I rent?',
    answer: 'We maintain our own sanitized rental equipment vaults in Leh, Manali, and Punta Arenas. You can rent 850fp goose-down expedition parkas, Scarpa double boots, crampons, ice axes, and Garmin satellite messengers at modest daily rates.'
  },
  {
    category: 'Booking & Cancellation',
    question: 'What is VentureTravel’s payment schedule and cancellation policy?',
    answer: 'A 25% deposit secures your expedition date and guide reservation. The remaining 75% balance is due 60 days prior to departure. Cancellations made 60+ days before departure receive a 100% credit transfer to any future expedition within 24 months.'
  },
  {
    category: 'Booking & Cancellation',
    question: 'Are my payments protected if a mountain pass is closed by government decree?',
    answer: 'Yes. Under our IATA and ASTA consumer bond guarantees, if a natural catastrophe (e.g., flash flood or avalanche) officially shuts down a pass, our team immediately activates pre-planned alternate luxury routes or issues full trip vouchers.'
  }
];

export const AgencyFaqPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState<string>('');

  const categories = ['All', 'Fitness & Preparation', 'Logistics & Permits', 'Gear & Equipment', 'Booking & Cancellation'];

  const filtered = FAQS.filter(f => {
    if (activeCategory !== 'All' && f.category !== activeCategory) return false;
    if (search && !f.question.toLowerCase().includes(search.toLowerCase()) && !f.answer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>KNOWLEDGE BASE & EXPEDITION ESSENTIALS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Agency Frequently <span className="text-[#ff4d36]">Asked Questions</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Everything you need to know about high-altitude acclimatization, gear rental, permit clearances, and our IATA payment guarantees.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto mt-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g., altitude, gear, permits)..." 
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#ff4d36]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors ${
                  activeCategory === c ? 'bg-[#ff4d36] text-white' : 'bg-slate-900 border border-slate-800 text-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-4">
          
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 cursor-pointer"
                >
                  <span className="font-syne font-bold text-sm sm:text-base text-slate-900">
                    {item.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>{item.answer}</p>
                    <span className="inline-block mt-3 text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Category: {item.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Have a specific medical or route inquiry not answered here?
            </div>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shrink-0"
            >
              Contact Expedition Desk
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
