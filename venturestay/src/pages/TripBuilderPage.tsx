import React, { useState } from 'react';
import { 
  Sparkles, Compass, Calendar, Users, Mountain, ShieldCheck, 
  Send, Check, ArrowRight, DollarSign, Download, Sliders, CheckCircle2
} from 'lucide-react';

interface TripBuilderPageProps {
  onPlanTripSubmit?: (tripDetails: any) => void;
  onNavigatePage: (pageId: string) => void;
}

export const TripBuilderPage: React.FC<TripBuilderPageProps> = ({ 
  onPlanTripSubmit,
  onNavigatePage 
}) => {
  const [step, setStep] = useState<number>(1);
  const [region, setRegion] = useState<string>('Spiti & Ladakh');
  const [activity, setActivity] = useState<string>('High Altitude Mountaineering');
  const [duration, setDuration] = useState<number>(7);
  const [groupSize, setGroupSize] = useState<number>(2);
  const [comfortLevel, setComfortLevel] = useState<'Expedition Rugged' | 'Boutique Wilderness' | 'Ultra-Luxury'>('Boutique Wilderness');
  const [heliDrop, setHeliDrop] = useState<boolean>(false);
  const [privateChef, setPrivateChef] = useState<boolean>(true);
  const [satelliteComms, setSatelliteComms] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Dynamic pricing calculation
  const baseDayRate = comfortLevel === 'Expedition Rugged' ? 240 : comfortLevel === 'Boutique Wilderness' ? 380 : 590;
  const heliAddon = heliDrop ? 1800 : 0;
  const chefAddon = privateChef ? 95 * duration : 0;
  const satAddon = satelliteComms ? 35 * duration : 0;

  const totalPerPerson = (baseDayRate * duration) + (heliAddon / groupSize) + (chefAddon / groupSize) + (satAddon / groupSize);
  const grandTotal = Math.round(totalPerPerson * groupSize);

  const handleNext = () => setStep(prev => Math.min(5, prev + 1));
  const handlePrev = () => setStep(prev => Math.max(1, prev - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onPlanTripSubmit) {
      onPlanTripSubmit({
        region,
        activity,
        duration,
        groupSize,
        comfortLevel,
        heliDrop,
        privateChef,
        totalEstimate: grandTotal,
        clientName,
        clientEmail,
        clientNotes
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>TAILOR-MADE EXPEDITION PLANNER</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Build Your Bespoke <span className="text-[#ff4d36]">Adventure Itinerary</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Design a custom private expedition tailored to your fitness, dates, and dream frontiers. Receive an instant cost calculation and proposal from our certified travel specialists.
          </p>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 max-w-xl mx-auto">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all ${
                    step === s 
                      ? 'bg-[#ff4d36] text-white ring-4 ring-[#ff4d36]/20' 
                      : step > s 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s ? '✓' : s}
                </button>
                {s < 5 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-1 transition-colors ${
                    step > s ? 'bg-blue-600' : 'bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">

          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Steps */}
              <div className="lg:col-span-8 space-y-6">

                {/* STEP 1: DESTINATION & TERRAIN */}
                {step === 1 && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">STEP 1 OF 5</span>
                    <h2 className="font-syne font-bold text-2xl text-slate-900">Choose Your Frontier & Landscape</h2>
                    <p className="text-xs text-slate-600">Select where your custom expedition will unfold.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { name: 'Spiti & Ladakh', country: 'Indian High Himalaya', altitude: '3,000m - 5,200m', desc: 'Arid moonscapes, ancient Tibetan monasteries, and snow leopard habitats.' },
                        { name: 'Patagonia & Icefields', country: 'Chile & Argentina', altitude: 'Sea Level - 1,400m', desc: 'Granite towers, cobalt glaciers, puma pampas, and windswept fjords.' },
                        { name: 'Lofoten & Arctic Fjords', country: 'Norway', altitude: '0m - 1,000m', desc: 'Midnight sun kayaking, dramatic sea cliffs, and coastal fishing rorbuer.' },
                        { name: 'Meghalaya & Northeast', country: 'Living Root Forests', altitude: '800m - 1,800m', desc: 'Subtropical monsoon canyons, ancient limestone caves, and cloud cascades.' },
                        { name: 'Western Ghats Rainforest', country: 'Biodiversity Hotspot', altitude: '600m - 2,100m', desc: 'Mist-shrouded montane shola forests, endemic hornbills, and tea estates.' },
                        { name: 'Swiss Alps Valais & Haute Route', country: 'Switzerland', altitude: '1,500m - 4,000m', desc: 'Iconic Matterhorn glaciers, historic mountain huts, and high alpine passes.' }
                      ].map(item => (
                        <div
                          key={item.name}
                          onClick={() => setRegion(item.name)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            region === item.name
                              ? 'border-[#ff4d36] bg-red-50/40 ring-2 ring-[#ff4d36]/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-syne font-bold text-sm text-slate-900">{item.name}</h4>
                            {region === item.name && <Check className="w-4 h-4 text-[#ff4d36]" />}
                          </div>
                          <span className="text-[11px] font-mono text-blue-600 block">{item.country} • {item.altitude}</span>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: EXPEDITION STYLE */}
                {step === 2 && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">STEP 2 OF 5</span>
                    <h2 className="font-syne font-bold text-2xl text-slate-900">Select Primary Adventure Disciplines</h2>
                    <p className="text-xs text-slate-600">What will you and your guide be conquering?</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { title: 'High Altitude Mountaineering', icon: '🏔️', desc: 'Summit climbs, glacier traverses, crampon work, and high pass crossings.' },
                        { title: 'Snow Leopard & Wildlife Safari', icon: '🐆', desc: 'Field spotting with thermal optics, telemetry tracking, and local naturalists.' },
                        { title: 'Sea Kayaking & Arctic Archipelago', icon: '🛶', desc: 'Fjord navigation, secluded beach camping, and tidal sound crossings.' },
                        { title: 'Dark Sky & Astrophotography', icon: '🌌', desc: 'Bortle-1 deep space telescope sessions, Milky Way framing, and auroras.' },
                        { title: 'Ancient Caving & Living Bridges', icon: '🌿', desc: 'Subterranean river tracing, root canopy treks, and monsoon falls.' },
                        { title: 'Overland 4x4 Expedition Traverse', icon: '🚙', desc: 'Remote river fording, high pass gravel navigation, and wild bivouacs.' }
                      ].map(item => (
                        <div
                          key={item.title}
                          onClick={() => setActivity(item.title)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            activity === item.title
                              ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <h4 className="font-syne font-bold text-sm text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: DURATION & GROUP SIZE */}
                {step === 3 && (
                  <div className="space-y-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">STEP 3 OF 5</span>
                    <h2 className="font-syne font-bold text-2xl text-slate-900">Duration & Climber Party Size</h2>

                    {/* Duration slider */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Expedition Duration</label>
                        <span className="text-xl font-syne font-black text-[#ff4d36]">{duration} Days / {duration - 1} Nights</span>
                      </div>
                      <input 
                        type="range" 
                        min="3" 
                        max="21" 
                        value={duration} 
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff4d36]"
                      />
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                        <span>3 Days (Weekend Alpine)</span>
                        <span>7 Days (Classic Circuit)</span>
                        <span>14 Days (Grand Traverse)</span>
                        <span>21 Days (Epic Frontier)</span>
                      </div>
                    </div>

                    {/* Group Size selection */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Number of Travelers</label>
                        <span className="text-base font-syne font-bold text-blue-600">{groupSize} Climbers</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 4, 6, 8, 12].map(num => (
                          <button
                            key={num}
                            onClick={() => setGroupSize(num)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              groupSize === num
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {num} {num === 1 ? 'Solo' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: COMFORT LEVEL & PRIVATE ADD-ONS */}
                {step === 4 && (
                  <div className="space-y-5">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">STEP 4 OF 5</span>
                    <h2 className="font-syne font-bold text-2xl text-slate-900">Accommodation Tier & Private Upgrades</h2>

                    {/* Tiers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { tier: 'Expedition Rugged', price: '$240/day', desc: 'Four-season alpine double tents, high mountain huts, and authentic local homestays.' },
                        { tier: 'Boutique Wilderness', price: '$380/day', desc: 'Solar-heated geodesic domes, private eco-lodges, heated blankets, and en-suite cabins.' },
                        { tier: 'Ultra-Luxury', price: '$590/day', desc: 'Private luxury wilderness chalets, glass suites, private saunas, and 5-star concierge.' }
                      ].map(item => (
                        <div
                          key={item.tier}
                          onClick={() => setComfortLevel(item.tier as any)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            comfortLevel === item.tier
                              ? 'border-[#ff4d36] bg-red-50/40 ring-2 ring-[#ff4d36]/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold text-[#ff4d36] block">{item.price}</span>
                          <h4 className="font-syne font-bold text-sm text-slate-900 mt-1">{item.tier}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Special Logistics Add-ons</label>
                      
                      <div 
                        onClick={() => setHeliDrop(!heliDrop)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          heliDrop ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-syne font-bold text-sm text-slate-900">Private High-Altitude Helicopter Drop / Transfer</span>
                            <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">+$1,800 group</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Eurocopter B3 aerial drop over high passes to bypass multi-day approach.</p>
                        </div>
                        <input type="checkbox" checked={heliDrop} onChange={() => {}} className="w-5 h-5 text-blue-600 accent-blue-600 cursor-pointer" />
                      </div>

                      <div 
                        onClick={() => setPrivateChef(!privateChef)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          privateChef ? 'border-emerald-600 bg-emerald-50/40' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-syne font-bold text-sm text-slate-900">Private Wilderness Field Chef & Organic Alpine Dining</span>
                            <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">+$95/day</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Custom dietary meals, fresh hot broths, local foraged dinners, and morning espresso.</p>
                        </div>
                        <input type="checkbox" checked={privateChef} onChange={() => {}} className="w-5 h-5 text-emerald-600 accent-emerald-600 cursor-pointer" />
                      </div>

                      <div 
                        onClick={() => setSatelliteComms(!satelliteComms)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          satelliteComms ? 'border-amber-600 bg-amber-50/40' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-syne font-bold text-sm text-slate-900">Garmin InReach Global Satellite Comms & SOS Kit</span>
                            <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">+$35/day</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Two-way text satellite messenger with live telemetry map link for family at home.</p>
                        </div>
                        <input type="checkbox" checked={satelliteComms} onChange={() => {}} className="w-5 h-5 text-amber-600 accent-amber-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & CONTACT */}
                {step === 5 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">STEP 5 OF 5</span>
                    <h2 className="font-syne font-bold text-2xl text-slate-900">Your Contact & Expedition Proposal</h2>
                    <p className="text-xs text-slate-600">Enter your contact details to receive the full day-by-day customized PDF prospectus and advisor consultation.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Lead Traveler Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={clientName} 
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Captain Alexandra Vance" 
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff4d36] text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          value={clientEmail} 
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="e.g. alexandra@expedition.org" 
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff4d36] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Special Climbing Goals or Dietary Constraints</label>
                      <textarea 
                        rows={3}
                        value={clientNotes} 
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="Tell us about previous high altitude experience, preferred dates, physical injuries, or desired summits..." 
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff4d36] text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#ff4d36]/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Generate Custom Expedition Prospectus</span>
                    </button>
                  </form>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <button
                    onClick={handlePrev}
                    disabled={step === 1}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs disabled:opacity-40 cursor-pointer"
                  >
                    ← Back
                  </button>
                  {step < 5 && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column: Live Price & Route Summary Card */}
              <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff4d36] font-bold">ESTIMATE ENGINE</span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">LIVE RATES</span>
                </div>

                <div className="py-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frontier Region:</span>
                    <span className="font-bold text-white text-right">{region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Focus Activity:</span>
                    <span className="font-bold text-white text-right">{activity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expedition Length:</span>
                    <span className="font-bold text-white">{duration} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Party Size:</span>
                    <span className="font-bold text-white">{groupSize} Travelers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Accommodation:</span>
                    <span className="font-bold text-white">{comfortLevel}</span>
                  </div>
                  {heliDrop && (
                    <div className="flex justify-between text-blue-400">
                      <span>• Helicopter Charter:</span>
                      <span className="font-mono font-bold">+$1,800</span>
                    </div>
                  )}
                  {privateChef && (
                    <div className="flex justify-between text-emerald-400">
                      <span>• Private Field Chef:</span>
                      <span className="font-mono font-bold">+${chefAddon}</span>
                    </div>
                  )}
                  {satelliteComms && (
                    <div className="flex justify-between text-amber-400">
                      <span>• Satellite Comms SOS:</span>
                      <span className="font-mono font-bold">+${satAddon}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Estimated Total:</span>
                    <span className="text-2xl font-black font-syne text-[#ff4d36]">${grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>Per Traveler:</span>
                    <span>${Math.round(totalPerPerson).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] leading-relaxed">
                    <strong className="text-white block mb-0.5">🛡️ 100% Free Demo Simulator:</strong>
                    No money or payment transactions are involved. All prices are simulated budget estimates for itinerary planning.
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sample Custom Expedition Prospectus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>100% Carbon Offset Included</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Success confirmation screen */
            <div className="text-center py-12 space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-syne font-bold text-3xl text-slate-900">Custom Expedition Dossier Created!</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <strong>{clientName}</strong>. Your customized {duration}-day expedition blueprint for <strong>{region}</strong> has been logged under reference code <span className="font-mono font-bold text-[#ff4d36]">#VT-EXP-{Math.floor(10000 + Math.random() * 90000)}</span>.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto space-y-1 text-left">
                <p>• A senior destination advisor will contact you at <strong>{clientEmail}</strong> within 4 business hours.</p>
                <p>• Estimated budget: <strong>${grandTotal.toLocaleString()}</strong> ({groupSize} travelers, {comfortLevel}).</p>
                <p>• Includes private IFMGA mountain guide reservation and wilderness permits.</p>
              </div>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Create Another Blueprint
                </button>
                <button
                  onClick={() => onNavigatePage('expeditions')}
                  className="px-6 py-2.5 rounded-xl bg-[#ff4d36] text-white text-xs font-bold hover:bg-[#e03820] shadow-md cursor-pointer"
                >
                  View Signature Expeditions
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
