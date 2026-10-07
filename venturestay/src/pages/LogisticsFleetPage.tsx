import React, { useState } from 'react';
import { 
  Plane, Compass, Shield, Wind, Users, 
  MapPin, CheckCircle2, ArrowRight, Gauge, Fuel 
} from 'lucide-react';

interface FleetVehicle {
  id: string;
  name: string;
  type: 'Aviation Helicopter' | 'Charter Aircraft' | 'Overland 4x4 Rig' | 'Expedition Watercraft';
  model: string;
  image: string;
  capacity: string;
  operatingCeiling: string;
  cruisingRange: string;
  capabilities: string[];
  deploymentZones: string;
  description: string;
}

const FLEET: FleetVehicle[] = [
  {
    id: 'eurocopter-b3',
    name: 'Eurocopter AS350 B3 "Squirrel" High-Altitude Heli',
    type: 'Aviation Helicopter',
    model: 'Airbus H125 / AS350 B3e',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
    capacity: '1 Pilot + 5 Climbers with mountain packs',
    operatingCeiling: '7,010m / 23,000ft (Mount Everest summit touchdown record)',
    cruisingRange: '665 km / 360 NM',
    capabilities: [
      'Engineered specifically for hot & high mountain rescue and aerial drop operations',
      'Dual-channel FADEC high-output Turbomeca Arriel 2D turbine engine',
      'Equipped with Goodrich rescue hoist and long-line sling setup'
    ],
    deploymentZones: 'Leh/Ladakh, Manali/Spiti, Punta Arenas/Torres del Paine, Zermatt',
    description: 'The undisputed king of high-altitude rotary aviation. Used for private summit drops, aerial filming of remote crevasses, and rapid mountain evacuation.'
  },
  {
    id: 'landcruiser-79',
    name: 'Toyota Land Cruiser 79 Series Heavy-Duty Overlander',
    type: 'Overland 4x4 Rig',
    model: 'HZJ79 V8 4.5L Turbo Diesel Overland Build',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    capacity: '4 Passengers + Guide + Heavy Gear Vault',
    operatingCeiling: '5,600m Khardung La & Umling La Passes',
    cruisingRange: '1,400 km (Dual 90L + 80L Long-Range Diesel Tanks)',
    capabilities: [
      'ARB front and rear air lockers with ARB high-output onboard air compressor',
      'Old Man Emu BP-51 heavy-duty bypass reservoir suspension',
      'Heated cabin seating, dual battery solar inverter, and built-in medical O2 bottle mount'
    ],
    deploymentZones: 'Spiti Valley, Zanskar river beds, Changthang Plateau, Patagonia pampas',
    description: 'Indestructible mechanical overland power. Custom tuned for high-altitude thin air with secondary turbo intercoolers and deep river-wading snorkels.'
  },
  {
    id: 'twin-otter',
    name: 'DHC-6 Twin Otter STOL Mountain Bush Aircraft',
    type: 'Charter Aircraft',
    model: 'De Havilland Canada Series 400',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    capacity: '12 - 16 Passengers with full mountaineering freight',
    operatingCeiling: '7,620m / 25,000ft',
    cruisingRange: '1,435 km',
    capabilities: [
      'Short Takeoff and Landing (STOL) on gravel, ice runways, and short alpine strips',
      'Tundra oversized low-pressure tires for soft glacial moraines',
      'Twin Pratt & Whitney PT6A-34 turboprops with reversible pitch propellers'
    ],
    deploymentZones: 'Punta Arenas to King George Island, Arctic Norway fjords',
    description: 'The ultimate rugged twin-engine bush plane. Capable of landing on unpaved gravel riverbars and remote polar ice strips where commercial jets cannot operate.'
  },
  {
    id: 'zodiac-milpro',
    name: 'Zodiac Milpro Grand Raid Mark V Expedition Watercraft',
    type: 'Expedition Watercraft',
    model: 'Zodiac Milpro Heavy-Duty Hypalon RIB',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    capacity: '10 Explorers + 2 Crew',
    operatingCeiling: 'Sea Level / Coastal Arctic Waters',
    cruisingRange: '180 km',
    capabilities: [
      'Military-grade CSM/Neoprene heavy hypalon fabric impervious to ice floe abrasion',
      'Twin Yamaha 70HP 4-stroke low-emission outboards with prop guards',
      'Roll-on beach landings directly onto wild boulder shores'
    ],
    deploymentZones: 'Lofoten Fjords, Chilean Patagonia Fjords, Svalbard ice edges',
    description: 'The workhorse of marine wilderness exploration. Enables fast, dry transfers into hidden sea caves, iceberg lagoons, and inaccessible beaches.'
  }
];

export const LogisticsFleetPage: React.FC<{ onNavigatePage: (pageId: string) => void }> = ({ onNavigatePage }) => {
  const [selectedFleetId, setSelectedFleetId] = useState<string>(FLEET[0].id);
  const vehicle = FLEET.find(v => v.id === selectedFleetId) || FLEET[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Plane className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>PRIVATE EXPEDITION FLEET & OVERLAND ASSETS</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            High-Altitude Aviation & <span className="text-[#ff4d36]">4x4 Expedition Fleet</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            From Airbus B3 high-altitude helicopters capable of landing on Himalayan crests to military-grade Overland Land Cruisers and STOL bush planes.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {FLEET.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFleetId(f.id)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedFleetId === f.id
                    ? 'bg-[#ff4d36] text-white shadow-lg'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {f.name.split(' ')[0]} {f.name.split(' ')[1]}
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
                {vehicle.type} • {vehicle.model}
              </span>
              <h2 className="font-syne font-black text-2xl sm:text-3xl text-slate-900 mt-1">
                {vehicle.name}
              </h2>
              <span className="text-xs text-slate-500 font-mono mt-1 block">Active Deployments: {vehicle.deploymentZones}</span>
            </div>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">MAX CAPACITY</span>
              <span className="text-xs font-bold font-syne text-[#ff4d36]">{vehicle.capacity}</span>
            </div>
          </div>

          {/* Image & Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
            <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-mono text-slate-400 block flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-blue-600" />
                  OPERATIONAL CEILING
                </span>
                <span className="text-lg font-bold font-syne text-slate-900">{vehicle.operatingCeiling}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-mono text-slate-400 block flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                  CRUISING RANGE / ENDURANCE
                </span>
                <span className="text-lg font-bold font-syne text-slate-900">{vehicle.cruisingRange}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-mono text-slate-400 block mb-1">FIELD CAPABILITIES</span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {vehicle.capabilities.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            {vehicle.description}
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Available for private expedition charter, medical standby, or film production logistics.
            </div>
            <button
              onClick={() => onNavigatePage('trip-builder')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shrink-0"
            >
              Add Vehicle To Custom Trip
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
