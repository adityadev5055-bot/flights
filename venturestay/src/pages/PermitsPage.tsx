import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, AlertTriangle, 
  Download, Clock, Globe, ArrowRight, ExternalLink 
} from 'lucide-react';

interface PermitProtocol {
  region: string;
  permitName: string;
  authority: string;
  leadTimeDays: number;
  documentsRequired: string[];
  mandatoryRequirements: string[];
  statusForForeignNationals: string;
  agencyHandling: string;
}

const PERMITS: PermitProtocol[] = [
  {
    region: 'Spiti & Ladakh (India)',
    permitName: 'Inner Line Permit (ILP) & Protected Area Permit (PAP)',
    authority: 'Deputy Commissioner Office (Leh & Kaza) / Ministry of Home Affairs',
    leadTimeDays: 7,
    statusForForeignNationals: 'PAP required in groups of 2+ with registered agency',
    agencyHandling: 'Turnkey: 100% processed by VentureTravel liaisons prior to your arrival.',
    documentsRequired: [
      'Valid Passport with 6-month validity + Indian Visa',
      'Passport-sized digital photograph (white background)',
      'Detailed itinerary and guide verification affidavit'
    ],
    mandatoryRequirements: [
      'Mandatory 48-hour acclimatization rest in Leh before border checkpoint passage',
      'Original passport must be carried during all high-pass military checkpoints'
    ]
  },
  {
    region: 'Torres del Paine (Chile)',
    permitName: 'CONAF Wilderness Access & Camping Reservation (W & O Circuits)',
    authority: 'Corporación Nacional Forestal (CONAF) Chile',
    leadTimeDays: 90,
    statusForForeignNationals: 'Nominal advance booking mandatory before entering park',
    agencyHandling: 'Included with all VentureTravel Patagonian expeditions.',
    documentsRequired: [
      'PDI Tourist Card issued at Santiago / Punta Arenas immigration',
      'Passport copy and proof of comprehensive medical evacuation insurance'
    ],
    mandatoryRequirements: [
      'Strict fire ban across entire national park (stoves permitted only in marked refugios)',
      'Proof of official camp reservation at Laguna Amarga gateway'
    ]
  },
  {
    region: 'Meghalaya & Northeast (India)',
    permitName: 'Restricted Area Permit (RAP) / ILP for Arunachal & Nagaland borders',
    authority: 'State Home Department & Ministry of Development of North Eastern Region',
    leadTimeDays: 14,
    statusForForeignNationals: 'Mandatory registered tour operator escort required',
    agencyHandling: 'Direct government e-permit processed by our Guwahati agency desk.',
    documentsRequired: [
      'Passport copy, photo, and certified travel insurance'
    ],
    mandatoryRequirements: [
      'Accompanied by state-certified Khasi/Garo or Naga cultural guide'
    ]
  },
  {
    region: 'Svalbard & Arctic Waters (Norway)',
    permitName: 'Governor of Svalbard Expedition Notification & Polar Bear Safety',
    authority: 'Sysselmesteren på Svalbard',
    leadTimeDays: 30,
    statusForForeignNationals: 'Mandatory field search & rescue insurance bond (NOK 100,000)',
    agencyHandling: 'Handled under VentureTravel’s certified polar operator license.',
    documentsRequired: [
      'Expedition itinerary filing and certified firearm safety qualification'
    ],
    mandatoryRequirements: [
      'Flare guns and minimum .308 caliber rifle carried by certified expedition guide'
    ]
  }
];

export const PermitsPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const current = PERMITS[selectedIdx];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>OFFICIAL CLEARANCES & BORDER PROTOCOLS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            High-Altitude Permits, <span className="text-[#ff4d36]">Visas & Regulations</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Navigating sensitive frontier zones requires meticulous compliance. As an accredited travel agency, VentureTravel secures all Inner Line Permits, CONAF wilderness passes, and environmental clearances.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {PERMITS.map((p, i) => (
              <button
                key={p.region}
                onClick={() => setSelectedIdx(i)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedIdx === i
                    ? 'bg-[#ff4d36] text-white shadow-lg'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {p.region}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold">
                {current.authority}
              </span>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
                {current.permitName}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-mono">Region: {current.region}</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 text-right shrink-0">
              <span className="text-[10px] font-mono text-blue-600 block uppercase">REQUIRED LEAD TIME</span>
              <span className="text-sm font-bold text-blue-950">{current.leadTimeDays} Days Minimum</span>
            </div>
          </div>

          <div className="my-6 bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80">
            <h3 className="font-syne font-bold text-sm text-emerald-950 flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>VentureTravel Full Agency Concierge Service</span>
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {current.agencyHandling} When booking an expedition with us, simply upload clear digital scans during checkout, and our licensed officers submit applications directly to the respective district magistracies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-syne font-bold text-sm text-slate-900 mb-3">Required Client Documentation</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {current.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-syne font-bold text-sm text-slate-900 mb-3">Mandatory Field Protocols & Checkpoints</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {current.mandatoryRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Official IATA & ASTA accredited tour operations. Zero unauthorized illegal crossings.
            </div>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shrink-0"
            >
              Consult With Permit Officer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
