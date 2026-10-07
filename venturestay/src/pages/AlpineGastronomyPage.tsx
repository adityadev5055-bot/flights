import React from 'react';
import { UtensilsCrossed, Flame, Sparkles, Coffee, Heart, CheckCircle2 } from 'lucide-react';

export const AlpineGastronomyPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPEDITION CULINARY ARTS & HIGH-ALTITUDE NUTRITION</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Alpine Gastronomy & <span className="text-[#ff4d36]">Wilderness Dining</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            At 14,000 feet, standard freeze-dried rations are an insult to the journey. VentureTravel features private field chefs preparing organic local dishes, fresh baked hearth breads, and restorative high-calorie broths.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <span className="text-2xl mb-2 block">🫖</span>
              <h3 className="font-syne font-bold text-base text-slate-900 mb-1">Himalayan Basecamp Hearth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handcrafted Tibetan thukpa broths rich with wild Himalayan morel mushrooms, fresh barley tsampa cakes, yak butter tea, and hot spiced sea-buckthorn fruit infusions.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <span className="text-2xl mb-2 block">🥩</span>
              <h3 className="font-syne font-bold text-base text-slate-900 mb-1">Patagonian Gaucho Asado</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Slow-roasted organic grass-fed Cordero Patagónico (lamb) over native lenga wood fires, served with wild calafate berry reductions and premium Chilean reserve Carménère.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <span className="text-2xl mb-2 block">🐟</span>
              <h3 className="font-syne font-bold text-base text-slate-900 mb-1">Nordic Arctic Forage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fresh ocean Arctic skrei cod caught directly from the fjord, wild foraged cloudberry preserves, smoked reindeer carpaccio, and sourdough baked in historic rorbu hearths.
              </p>
            </div>
          </div>

          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/80">
            <h3 className="font-syne font-bold text-sm text-amber-950 mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>High-Altitude Caloric Optimization Science</span>
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              At extreme altitudes, human basal metabolic expenditure increases by up to 2.5x. Our certified nutritionists formulate daily 4,200 to 4,800 kcal menus designed for rapid carbohydrate absorption, optimal mitochondrial efficiency, and non-fatiguing digestion during technical ascents.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Custom dietary preferences (vegetarian, vegan, celiac, halal) are meticulously accommodated on all private expeditions.
            </div>
            <button
              onClick={() => onNavigatePage('trip-builder')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shrink-0"
            >
              Add Private Chef to Trip
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
