import React, { useState } from 'react';
import { 
  CheckSquare, Square, Scale, ShieldCheck, Download, 
  Printer, Sparkles, AlertCircle, Backpack, Compass, Check 
} from 'lucide-react';

interface GearItem {
  id: string;
  name: string;
  weightGrams: number;
  category: 'Technical Hardware' | 'Apparel & Layers' | 'Sleep & Shelter' | 'Comms & Medical' | 'Footwear & Optics';
  required: boolean;
  notes: string;
}

const DEFAULT_GEAR: Record<string, GearItem[]> = {
  alpine: [
    { id: 'g1', name: 'Kahtoola / Grivel 10-Point Technical Crampons', weightGrams: 820, category: 'Technical Hardware', required: true, notes: 'Fitted to rigid boots with anti-balling plates' },
    { id: 'g2', name: 'Petzl Summit Ice Axe (59cm)', weightGrams: 360, category: 'Technical Hardware', required: true, notes: 'Classic mountaineering piolet for glacier traverse' },
    { id: 'g3', name: 'Black Diamond Couloir Alpine Harness', weightGrams: 215, category: 'Technical Hardware', required: true, notes: 'Ultralight packable harness with ice screw clippers' },
    { id: 'g4', name: 'Gore-Tex Pro 3-Layer Mountaineering Jacket', weightGrams: 490, category: 'Apparel & Layers', required: true, notes: '70D durable face fabric, helmet-compatible hood' },
    { id: 'g5', name: '850+ Fill Power Goose Down Expedition Parka', weightGrams: 890, category: 'Apparel & Layers', required: true, notes: 'Rated to -30°C comfort with box-wall baffles' },
    { id: 'g6', name: '260gsm Heavyweight Merino Wool Base Layers (Top & Bottom)', weightGrams: 520, category: 'Apparel & Layers', required: true, notes: '100% pure merino, odor resistant' },
    { id: 'g7', name: 'Western Mountaineering -30°C Down Sleeping Bag', weightGrams: 1580, category: 'Sleep & Shelter', required: true, notes: 'DryLoft water-resistant shell' },
    { id: 'g8', name: 'Therm-a-Rest NeoAir XTherm Insulated Pad (R-value 7.3)', weightGrams: 430, category: 'Sleep & Shelter', required: true, notes: 'Reflective barrier prevents conductive ground chill' },
    { id: 'g9', name: 'Garmin InReach Mini 2 Satellite Transponder', weightGrams: 100, category: 'Comms & Medical', required: true, notes: 'Two-way global Iridium SOS with active tracking' },
    { id: 'g10', name: 'Expedition High Altitude Medical Kit (Diamox, Dexamethasone)', weightGrams: 380, category: 'Comms & Medical', required: true, notes: 'Prescription altitude meds and sterile dressings' },
    { id: 'g11', name: 'Scarpa Phantom 6000 Double Mountaineering Boots', weightGrams: 1980, category: 'Footwear & Optics', required: true, notes: 'Integrated gaiter and heat-moldable insulated liner' },
    { id: 'g12', name: 'Julbo Vermont Classic Glacier Sunglasses (Category 4)', weightGrams: 40, category: 'Footwear & Optics', required: true, notes: 'Leather side shields blocking 95% of visible light' }
  ],
  patagonia: [
    { id: 'p1', name: 'Trekking Poles with Snow & Mud Baskets (Pair)', weightGrams: 480, category: 'Technical Hardware', required: true, notes: 'Carbon fiber flick-lock for 90 km/h wind gusts' },
    { id: 'p2', name: 'Windproof Softshell Salopettes / Pants', weightGrams: 540, category: 'Apparel & Layers', required: true, notes: 'Abrasion resistant for Patagonian scree' },
    { id: 'p3', name: 'Primaloft Gold Lightweight Insulated Hoody', weightGrams: 370, category: 'Apparel & Layers', required: true, notes: 'Retains warmth even if saturated by drizzle' },
    { id: 'p4', name: 'Waterproof 65L Expedition Backpack with Rain Cover', weightGrams: 1850, category: 'Sleep & Shelter', required: true, notes: 'Internal aluminum stay for heavy moraine loads' },
    { id: 'p5', name: 'Waterproof Gore-Tex Trekking Boots with Ankle Support', weightGrams: 1400, category: 'Footwear & Optics', required: true, notes: 'Vibram high-traction lugs' },
    { id: 'p6', name: 'UV400 Polarized Sunglasses & Mountain Sun Shield', weightGrams: 35, category: 'Footwear & Optics', required: true, notes: 'Protects against ozone depletion over Southern Cone' }
  ],
  arctic: [
    { id: 'a1', name: 'Kokatat Gore-Tex Expedition Sea Kayak Drysuit', weightGrams: 1650, category: 'Apparel & Layers', required: true, notes: 'Latex neck & wrist gaskets with relief zipper' },
    { id: 'a2', name: 'Werner Ikelos Carbon Crank Shaft Paddle', weightGrams: 750, category: 'Technical Hardware', required: true, notes: 'High-angle foam core carbon blades' },
    { id: 'a3', name: 'Neoprene 5mm Paddling Pogies & Thermal Booties', weightGrams: 420, category: 'Footwear & Optics', required: true, notes: 'Prevents numbness in 4°C Arctic fjord waters' },
    { id: 'a4', name: 'Waterproof Roll-Top Compression Dry Bags (20L + 10L)', weightGrams: 280, category: 'Sleep & Shelter', required: true, notes: 'Submersible IPX7 rated' }
  ]
};

export const GearChecklistPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [activeProfile, setActiveProfile] = useState<'alpine' | 'patagonia' | 'arctic'>('alpine');
  const [checkedIds, setCheckedIds] = useState<string[]>(['g1', 'g4', 'g6', 'g9']);

  const currentItems = DEFAULT_GEAR[activeProfile];

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const checkAll = () => {
    setCheckedIds(currentItems.map(i => i.id));
  };

  const clearAll = () => {
    setCheckedIds([]);
  };

  // Calculations
  const totalWeightGrams = currentItems.reduce((acc, curr) => acc + curr.weightGrams, 0);
  const packedWeightGrams = currentItems
    .filter(i => checkedIds.includes(i.id))
    .reduce((acc, curr) => acc + curr.weightGrams, 0);

  const packedPct = Math.round((checkedIds.length / currentItems.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>FIELD LOGISTICS & WEIGHT CALIBRATION</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Extreme Expedition <span className="text-[#ff4d36]">Gear Checklist & Pack Profiler</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Calculate your base weight, verify critical mountaineering safety gear, and ensure zero equipment failures in sub-zero alpine and Arctic environments.
          </p>

          {/* Profile Switcher */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveProfile('alpine')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeProfile === 'alpine'
                  ? 'bg-[#ff4d36] text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Himalaya & High Alpine (-30°C Ice)
            </button>
            <button
              onClick={() => setActiveProfile('patagonia')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeProfile === 'patagonia'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Patagonia Windswept Granite
            </button>
            <button
              onClick={() => setActiveProfile('arctic')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activeProfile === 'arctic'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Lofoten Arctic Kayak & Fjord
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Weight & Progress Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
                PACK READINESS
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black font-syne text-slate-900">{packedPct}%</span>
                <span className="text-xs text-slate-500 font-mono">({checkedIds.length} of {currentItems.length} packed)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3">
                <div 
                  style={{ width: `${packedPct}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-[#ff4d36] transition-all duration-500" 
                />
              </div>
            </div>

            <div className="sm:border-l sm:border-r border-slate-100 sm:px-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
                CURRENT BASE WEIGHT
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black font-syne text-[#ff4d36]">
                  {(packedWeightGrams / 1000).toFixed(2)} <span className="text-sm font-normal text-slate-500">kg</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({((packedWeightGrams / 1000) * 2.20462).toFixed(1)} lbs)
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Full kit weight: {(totalWeightGrams / 1000).toFixed(2)} kg
              </span>
            </div>

            <div className="flex sm:justify-end gap-2">
              <button
                onClick={checkAll}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Mark All Packed
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div>
              <h2 className="font-syne font-bold text-xl text-slate-900">
                Equipment Verification Roster
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Click each piece of hardware or apparel once physically verified and packed.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Roster</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {currentItems.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`py-4 px-3 rounded-2xl flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                    isChecked ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isChecked 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {item.name}
                        </span>
                        {item.required && (
                          <span className="text-[10px] font-mono font-bold text-[#ff4d36] bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
                            MANDATORY
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.notes}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-800 block">
                      {item.weightGrams >= 1000 ? `${(item.weightGrams / 1000).toFixed(2)} kg` : `${item.weightGrams} g`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">{item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advice Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900 block mb-0.5">Need High-Altitude Equipment Rental?</span>
              Our agency provides sanitized 850fp down parkas, double boots, and satellite messengers for rent at all gateway hubs.
            </div>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer shrink-0"
            >
              Request Gear Rental Quote
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
