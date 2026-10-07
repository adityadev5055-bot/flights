import React, { useState } from 'react';
import { 
  HeartPulse, ShieldAlert, Activity, CheckCircle2, 
  HelpCircle, AlertTriangle, ArrowRight, Thermometer, PhoneCall 
} from 'lucide-react';

export const AltitudeMedicalPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  // Lake Louise Scoring State
  const [headache, setHeadache] = useState<number>(0);
  const [gastro, setGastro] = useState<number>(0);
  const [fatigue, setFatigue] = useState<number>(0);
  const [dizziness, setDizziness] = useState<number>(0);
  const [altitudeMeters, setAltitudeMeters] = useState<number>(3500);

  const totalScore = headache + gastro + fatigue + dizziness;

  const getDiagnosis = () => {
    if (headache === 0 && totalScore < 3) {
      return {
        level: 'Normal Acclimatization',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        advice: 'No significant AMS symptoms detected. Continue standard hydration (3-4L daily) and adhere to the "climb high, sleep low" rule (max 500m net sleeping gain per day).'
      };
    } else if (headache > 0 && totalScore >= 3 && totalScore <= 5) {
      return {
        level: 'Mild to Moderate Acute Mountain Sickness (AMS)',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        advice: 'Halt further ascent immediately. Rest at current altitude. Administer mild analgesics (ibuprofen 400-600mg) and consider Acetazolamide (Diamox 125-250mg bid). Do not climb until symptoms completely resolve.'
      };
    } else {
      return {
        level: 'Severe AMS / Imminent HAPE or HACE Warning',
        color: 'text-red-800 bg-red-50 border-red-300 ring-2 ring-red-400',
        advice: 'EMERGENCY PROTOCOL: Immediate descent of at least 500-1,000 meters is mandatory. Administer supplemental oxygen (4L/min) or Gamow hyperbaric chamber immediately. Activate satellite medevac dispatch.'
      };
    }
  };

  const diagnosis = getDiagnosis();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>HIGH-ALTITUDE MEDICINE & HYPERBARIC PROTOCOLS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            High Altitude Medicine & <span className="text-[#ff4d36]">Acclimatization Portal</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            VentureTravel expeditions are supervised by certified wilderness physicians. Use our interactive Lake Louise AMS calculator to self-evaluate symptoms above 2,500m (8,200ft).
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Interactive Calculator Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 mb-8">
          
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">
              OFFICIAL CLINICAL ASSESSMENT TOOL
            </span>
            <h2 className="font-syne font-bold text-2xl text-slate-900 mt-1">
              Interactive Lake Louise Acute Mountain Sickness (AMS) Score
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Used worldwide by mountaineering expeditions to diagnose hypoxia and AMS before it evolves into pulmonary (HAPE) or cerebral (HACE) edema.
            </p>
          </div>

          {/* Altitude Selector Slider */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Current / Target Elevation</label>
              <span className="text-lg font-mono font-black text-blue-600">{altitudeMeters}m / {Math.round(altitudeMeters * 3.28084)}ft</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="6000" 
              step="100"
              value={altitudeMeters} 
              onChange={(e) => setAltitudeMeters(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>2,000m (Manali)</span>
              <span>3,500m (Leh)</span>
              <span>4,400m (Langza/Kibber)</span>
              <span>5,400m (Kala Patthar)</span>
            </div>
          </div>

          {/* Scoring Questions */}
          <div className="space-y-6">
            
            {/* 1. Headache */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                1. Headache Severity (Cardiovascular indicator)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { score: 0, label: '0 - None' },
                  { score: 1, label: '1 - Mild' },
                  { score: 2, label: '2 - Moderate' },
                  { score: 3, label: '3 - Severe / Incapacitating' }
                ].map(opt => (
                  <button
                    key={opt.score}
                    onClick={() => setHeadache(opt.score)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      headache === opt.score 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Gastrointestinal */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                2. Gastrointestinal Symptoms
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { score: 0, label: '0 - Good appetite' },
                  { score: 1, label: '1 - Poor appetite / nausea' },
                  { score: 2, label: '2 - Moderate nausea' },
                  { score: 3, label: '3 - Severe nausea / vomiting' }
                ].map(opt => (
                  <button
                    key={opt.score}
                    onClick={() => setGastro(opt.score)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      gastro === opt.score 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Fatigue & Weakness */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                3. Fatigue or Weakness
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { score: 0, label: '0 - Normal stamina' },
                  { score: 1, label: '1 - Mild fatigue' },
                  { score: 2, label: '2 - Moderate exhaustion' },
                  { score: 3, label: '3 - Severe incapacitation' }
                ].map(opt => (
                  <button
                    key={opt.score}
                    onClick={() => setFatigue(opt.score)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      fatigue === opt.score 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Dizziness */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                4. Dizziness / Lightheadedness
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { score: 0, label: '0 - None' },
                  { score: 1, label: '1 - Mild' },
                  { score: 2, label: '2 - Moderate vertigo' },
                  { score: 3, label: '3 - Severe disorientation' }
                ].map(opt => (
                  <button
                    key={opt.score}
                    onClick={() => setDizziness(opt.score)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      dizziness === opt.score 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Display */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className={`p-6 rounded-2xl border ${diagnosis.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest block font-bold">TOTAL AMS SCORE</span>
                  <span className="text-3xl font-black font-syne">{totalScore} Points</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono block">DIAGNOSTIC STATUS</span>
                  <span className="text-base font-bold font-syne">{diagnosis.level}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm mt-3 pt-3 border-t border-current/20 leading-relaxed font-medium">
                {diagnosis.advice}
              </p>
            </div>
          </div>

          {/* Field Kit Standards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Gamow Hyperbaric Bags</span>
              Carried on all 4,000m+ expeditions. Simulates an immediate 1,500m descent via foot-pump pressurization.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Nonin Pulse Oximetry</span>
              Mandatory morning and evening SpO2% oxygen saturation logs recorded by your expedition leader.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Medical Oxygen Bottles</span>
              Bottled medical O2 with high-flow demand regulators deployed in our 4x4 support vehicles.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
