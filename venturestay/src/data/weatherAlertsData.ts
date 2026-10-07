import { playTelemetryAlertChime } from '../utils/audioAlert';
export { playTelemetryAlertChime };

export interface MountainWeatherStation {
  id: string;
  name: string;
  country: string;
  region: string;
  altitude: string;
  status: string;
  tempC: number;
  feelsLikeC: number;
  windSpeedKmh: number;
  windGustKmh: number;
  windDirection: string;
  avalancheRisk: string | number;
  snowDepthCm: number;
  visibilityKm: number;
  freezingLevelM: number;
  condition: string;
  sunrise: string;
  sunset: string;
  alertId?: string;
  forecast: Array<{
    time: string;
    tempC: number;
    condition: string;
  }>;
}

export interface WeatherAlert {
  id: string;
  region: string;
  stationId: string;
  stationName: string;
  altitude: string;
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY';
  category: string;
  headline: string;
  alertSummary: string;
  summary: string;
  detailedAdvisory: string;
  temperatureC: number;
  tempC: number;
  feelsLikeC: number;
  windSpeedKmh: number;
  windGustKmh: number;
  avalancheRisk: string;
  snowAccumulationCm: number;
  snowDepthCm: number;
  passesAffected: string[];
  affectedPasses: string[];
  passStatus: string;
  mandatedGear: string[];
  emergencyVhfFreq: string;
  satelliteChannel: string;
  issuedAt: string;
  validDuration: string;
}

export const MOUNTAIN_WEATHER_ALERTS: WeatherAlert[] = [
  {
    id: 'alert-spiti-avalanche',
    region: 'Spiti & Ladakh',
    stationId: 'kibber-station',
    stationName: 'Kibber High Plateau Observatory',
    altitude: '4,270m / 14,009ft',
    severity: 'CRITICAL',
    category: 'Level 4 Avalanche & Sub-Zero Whiteout',
    headline: 'LEVEL 4 AVALANCHE & -24°C SUB-ZERO WHITEOUT WARNING',
    alertSummary: 'Heavy slab snow accumulation (72cm) with gale gusts up to 88 km/h. High-pass transit is strictly suspended.',
    summary: 'Heavy slab snow accumulation (72cm) with gale gusts up to 88 km/h. High-pass transit is strictly suspended.',
    detailedAdvisory: 'Unstable slab snowpack identified on north-facing couloirs above 3,900m. Gale winds are causing rapid cornice build-ups along Kunzum ridge. Extreme windchill down to -36°C poses severe frostbite risks within 10 minutes of exposed skin. Solo ascents are prohibited by District Disaster Management Authority (DDMA).',
    temperatureC: -16,
    tempC: -16,
    feelsLikeC: -29,
    windSpeedKmh: 54,
    windGustKmh: 88,
    avalancheRisk: 'High (Level 4)',
    snowAccumulationCm: 72,
    snowDepthCm: 72,
    passesAffected: ['Kunzum La (4,551m) - CLOSED', 'Rohtang Pass (3,978m) - TECHNICAL TRANSIT ONLY', 'Kaza-Manali Highway - BLOCKED AT BATAL'],
    affectedPasses: ['Kunzum La (4,551m) - CLOSED', 'Rohtang Pass (3,978m) - TECHNICAL TRANSIT ONLY', 'Kaza-Manali Highway - BLOCKED AT BATAL'],
    passStatus: 'CLOSED',
    mandatedGear: ['Triple-antenna 457kHz Avalanche Transceiver', 'ABS Inflatable Airbag Pack', '4-Season Down Suit (-40°C rated)', 'Satellite InReach / Iridium Messenger'],
    emergencyVhfFreq: 'VHF 144.600 MHz (ITBP / Spiti SAR)',
    satelliteChannel: 'Iridium Gateway S-78 / Garmin InReach SOS Tier 1',
    issuedAt: '12 minutes ago (Live Uplink)',
    validDuration: 'Next 24 Hours'
  },
  {
    id: 'alert-alps-gale',
    region: 'Alps',
    stationId: 'tre-cime-station',
    stationName: 'Tre Cime Alpine High Refuge Post',
    altitude: '2,450m / 8,038ft',
    severity: 'CRITICAL',
    category: 'Alpine Gale & Rime Ice Storm',
    headline: '95 KM/H KATABATIC GALE & RIME ICE COATING WARNING',
    alertSummary: 'Violent squalls sweeping Dolomites north face with rapid barometric pressure plunge. Exposed via ferrata cables are iced over.',
    summary: 'Violent squalls sweeping Dolomites north face with rapid barometric pressure plunge. Exposed via ferrata cables are iced over.',
    detailedAdvisory: 'Severe rime ice accumulation along all exposed steel safety cables on Via Ferrata De Luca-Innerkofler. High wind gusts reaching 95 km/h on ridge saddles will cause loss of balance. Bivouac winter rooms are unlocked for emergency refuge.',
    temperatureC: -5,
    tempC: -5,
    feelsLikeC: -15,
    windSpeedKmh: 68,
    windGustKmh: 95,
    avalancheRisk: 'Considerable (Level 3)',
    snowAccumulationCm: 48,
    snowDepthCm: 48,
    passesAffected: ['Tre Cime Circuit Ridge - VIA FERRATA CLOSED', 'Passo Falzarego - CHAINS MANDATORY'],
    affectedPasses: ['Tre Cime Circuit Ridge - VIA FERRATA CLOSED', 'Passo Falzarego - CHAINS MANDATORY'],
    passStatus: 'TECHNICAL ONLY',
    mandatedGear: ['Crampons (C2 semi-rigid)', 'Bivouac storm tent / Bothy bag', 'Insulated Gore-Tex Pro shell (28,000mm)', 'Alpine helmet'],
    emergencyVhfFreq: 'VHF 161.300 MHz (Canal E Emergency Alps)',
    satelliteChannel: 'Alpine Club SAR Heli Dispatch 118',
    issuedAt: '18 minutes ago',
    validDuration: 'Next 18 Hours'
  },
  {
    id: 'alert-patagonia-williwaw',
    region: 'Patagonia',
    stationId: 'torres-station',
    stationName: 'Torres del Paine Mirador Post',
    altitude: '900m / 2,952ft',
    severity: 'CRITICAL',
    category: 'Hurricane-Force Williwaw Wind Gusts',
    headline: '115 KM/H WILLIWAW HURRICANE GUSTS WARNING',
    alertSummary: 'Catastrophic downdraft winds originating from the Southern Patagonian Icefield. French Valley & Británico suspension crossings restricted.',
    summary: 'Catastrophic downdraft winds originating from the Southern Patagonian Icefield. French Valley & Británico suspension crossings restricted.',
    detailedAdvisory: 'CONAF rangers have issued a Level 3 high-wind restriction. Winds exceeding 30 m/s (110+ km/h) are capable of blowing backpackers off ridge crests. Lake Pehoé catamarans are operating on modified safety schedules due to 2.5m lake chop waves.',
    temperatureC: 6,
    tempC: 6,
    feelsLikeC: -1,
    windSpeedKmh: 82,
    windGustKmh: 115,
    avalancheRisk: 'Moderate (Level 2)',
    snowAccumulationCm: 14,
    snowDepthCm: 14,
    passesAffected: ['John Gardner Pass (1,200m) - CLOSURE IN EFFECT', 'French Valley Lookout - ACCESS SUSPENDED ABOVE CAMP ITALIANO'],
    affectedPasses: ['John Gardner Pass (1,200m) - CLOSURE IN EFFECT', 'French Valley Lookout - ACCESS SUSPENDED ABOVE CAMP ITALIANO'],
    passStatus: 'CLOSED',
    mandatedGear: ['Windproof ripstop shelter with heavy steel snow stakes', 'High-impact eye protection / glacier goggles', 'Stiff leather alpine boots'],
    emergencyVhfFreq: 'VHF 150.100 MHz (CONAF Ranger Central)',
    satelliteChannel: 'Punta Arenas Heli-SAR Satellite Link',
    issuedAt: '8 minutes ago',
    validDuration: 'Next 12 Hours'
  },
  {
    id: 'alert-rockies-blizzard',
    region: 'Rockies',
    stationId: 'loveland-station',
    stationName: 'Loveland Pass Continental Divide Sensor',
    altitude: '3,655m / 11,990ft',
    severity: 'WARNING',
    category: 'Continental Divide Rapid Freeze & Blizzard',
    headline: 'CONTINENTAL DIVIDE BLIZZARD & -18°C FLASH FREEZE',
    alertSummary: 'Rapid cold front dropped temperatures 14°C in 2 hours. Whiteout blowing snow reducing roadway visibility to under 10 meters.',
    summary: 'Rapid cold front dropped temperatures 14°C in 2 hours. Whiteout blowing snow reducing roadway visibility to under 10 meters.',
    detailedAdvisory: 'Significant wind slab development across east and southeast facing couloirs. Highway 6 Loveland Pass subject to intermittent safety closures for avalanche mitigation. Extreme windchill warning in effect above tree line.',
    temperatureC: -12,
    tempC: -12,
    feelsLikeC: -24,
    windSpeedKmh: 48,
    windGustKmh: 75,
    avalancheRisk: 'Considerable (Level 3)',
    snowAccumulationCm: 85,
    snowDepthCm: 85,
    passesAffected: ['Loveland Pass (US-6) - ACTIVE MITIGATION', 'Berthoud Pass - CHAIN LAW CODE 15 IN EFFECT'],
    affectedPasses: ['Loveland Pass (US-6) - ACTIVE MITIGATION', 'Berthoud Pass - CHAIN LAW CODE 15 IN EFFECT'],
    passStatus: 'CHAINS REQUIRED',
    mandatedGear: ['Tire chains or auto-socks', 'Avalanche beacon, probe, and metal shovel', 'Sub-zero sleeping bag (0°F / -18°C)'],
    emergencyVhfFreq: 'VHF 155.160 MHz (Colorado SAR)',
    satelliteChannel: 'Garmin InReach CO-SAR Gateway',
    issuedAt: '30 minutes ago',
    validDuration: 'Next 24 Hours'
  },
  {
    id: 'alert-fjords-squall',
    region: 'Fjords',
    stationId: 'reine-station',
    stationName: 'Reinebringen Arctic Fjord Sensor',
    altitude: '448m / 1,470ft',
    severity: 'ADVISORY',
    category: 'Arctic Marine Squall & Granite Sheet Ice',
    headline: 'ARCTIC FJORD GALE & WET ROCK SLIP ADVISORY',
    alertSummary: 'North Atlantic maritime storm front generating sudden heavy graupel and high gusts along steep coastal granite faces.',
    summary: 'North Atlantic maritime storm front generating sudden heavy graupel and high gusts along steep coastal granite faces.',
    detailedAdvisory: 'The 1,560 Sherpa stone steps leading to Reinebringen viewpoint have developed a micro-layer of black ice. Coastal wind gusts up to 72 km/h can destabilize climbers along narrow summit ridges. Kayaking in Reinefjorden suspended for non-guided craft.',
    temperatureC: 3,
    tempC: 3,
    feelsLikeC: -3,
    windSpeedKmh: 42,
    windGustKmh: 72,
    avalancheRisk: 'Low (Level 1)',
    snowAccumulationCm: 10,
    snowDepthCm: 10,
    passesAffected: ['Reinebringen Ridge Summit - SLIP HAZARD', 'Ryten Trail - HEAVY MUD & SLAB SHEARING'],
    affectedPasses: ['Reinebringen Ridge Summit - SLIP HAZARD', 'Ryten Trail - HEAVY MUD & SLAB SHEARING'],
    passStatus: 'TECHNICAL ONLY',
    mandatedGear: ['Microspikes / crampons for granite steps', 'Waterproof storm pants and shell', 'Headlamp with 400+ lumens (Arctic darkness)'],
    emergencyVhfFreq: 'VHF Marine Ch 16 / Tjøme Radio',
    satelliteChannel: 'HRS Nord-Norge Arctic SAR',
    issuedAt: '42 minutes ago',
    validDuration: 'Next 14 Hours'
  },
  {
    id: 'alert-highlands-fog',
    region: 'Highlands',
    stationId: 'ben-nevis-station',
    stationName: 'Ben Nevis North Face Automated Post',
    altitude: '1,345m / 4,413ft',
    severity: 'WARNING',
    category: 'Plateau Whiteout & Cornice Collapse Threat',
    headline: 'BEN NEVIS SUMMIT WHITEOUT & GALE DISORIENTATION WARNING',
    alertSummary: 'Zero visibility (under 5m) on the summit plateau with treacherous fragile cornices overlooking Five Finger Gully.',
    summary: 'Zero visibility (under 5m) on the summit plateau with treacherous fragile cornices overlooking Five Finger Gully.',
    detailedAdvisory: 'Magnetic compass declination grid bearings strictly required to safely navigate around Gardyloo Gully. 80 km/h summit winds with driving sleet. Multiple parties have reported disorientation on the descent cairn route.',
    temperatureC: -1,
    tempC: -1,
    feelsLikeC: -9,
    windSpeedKmh: 55,
    windGustKmh: 82,
    avalancheRisk: 'Considerable (Level 3)',
    snowAccumulationCm: 45,
    snowDepthCm: 45,
    passesAffected: ['Ben Nevis Mountain Track - VISIBILITY UNDER 5 METERS', 'Càrn Mòr Dearg Arête - HIGH EXPOSURE WINDS'],
    affectedPasses: ['Ben Nevis Mountain Track - VISIBILITY UNDER 5 METERS', 'Càrn Mòr Dearg Arête - HIGH EXPOSURE WINDS'],
    passStatus: 'TECHNICAL ONLY',
    mandatedGear: ['Silva compass & OS Explorer Map 392', 'Ice axe and 10-point walking crampons', 'Survival blizzard bag'],
    emergencyVhfFreq: 'UK SAR Channel 0 / 999 Police Mountain Rescue',
    satelliteChannel: 'Lochaber Mountain Rescue InReach Relay',
    issuedAt: '15 minutes ago',
    validDuration: 'Next 12 Hours'
  },
  {
    id: 'alert-northeast-cloudburst',
    region: 'Meghalaya & Northeast',
    stationId: 'cherrapunji-station',
    stationName: 'Cherrapunji Gorge Monsoonal Sensor',
    altitude: '1,430m / 4,691ft',
    severity: 'WARNING',
    category: 'Gorge Cloudburst & Living Root Surge',
    headline: 'GORGE CLOUDBURST & SACRED ROOT TRAIL SURGE WARNING',
    alertSummary: 'Intense rain bands (140mm / 6 hrs) causing sudden torrent swells across Umngot river gorges and misty karst canyons.',
    summary: 'Intense rain bands (140mm / 6 hrs) causing sudden torrent swells across Umngot river gorges and misty karst canyons.',
    detailedAdvisory: 'River crossing along Double Decker living root bridge has elevated to Tier 2 precautionary status. Karst limestone stairways are extremely slick. Waterfall mist creates localized zero-visibility along cliff trails.',
    temperatureC: 17,
    tempC: 17,
    feelsLikeC: 16,
    windSpeedKmh: 28,
    windGustKmh: 50,
    avalancheRisk: 'Low (Level 1)',
    snowAccumulationCm: 0,
    snowDepthCm: 0,
    passesAffected: ['Nongriat Root Bridge Descent - HIGH SLIP CAUTION', 'Sohra Canyon Trails - FLASH SURGE WATCH'],
    affectedPasses: ['Nongriat Root Bridge Descent - HIGH SLIP CAUTION', 'Sohra Canyon Trails - FLASH SURGE WATCH'],
    passStatus: 'TECHNICAL ONLY',
    mandatedGear: ['Vibram MegaGrip high-traction footwear', 'Dry bag dry-sacks for communications gear', 'Emergency river throw-rope line'],
    emergencyVhfFreq: 'VHF 151.200 MHz (Meghalaya SDRF)',
    satelliteChannel: 'Shillong Disaster Management Uplink',
    issuedAt: '35 minutes ago',
    validDuration: 'Next 18 Hours'
  },
  {
    id: 'alert-ghats-mist',
    region: 'Western Ghats',
    stationId: 'meesapulimala-station',
    stationName: 'Meesapulimala Ridge Tower',
    altitude: '2,640m / 8,661ft',
    severity: 'ADVISORY',
    category: 'High Shola Mist & Wild Elephant Corridor',
    headline: 'MEESAPULIMALA DENSE RIDGE MIST & ELEPHANT CORRIDOR NOTICE',
    alertSummary: 'Sub-10 meter fog across Kurinjimala grasslands with active wild tusker herd movement across rhodo-valley saddles.',
    summary: 'Sub-10 meter fog across Kurinjimala grasslands with active wild tusker herd movement across rhodo-valley saddles.',
    detailedAdvisory: 'Sudden cold mountain mist blanketing high-altitude shola grasslands. Forest Department requires all groups to maintain visual contact with designated tribal wilderness guides. Night trekking is prohibited by Kerala/TN Forest Departments.',
    temperatureC: 11,
    tempC: 11,
    feelsLikeC: 9,
    windSpeedKmh: 26,
    windGustKmh: 45,
    avalancheRisk: 'Low (Level 1)',
    snowAccumulationCm: 0,
    snowDepthCm: 0,
    passesAffected: ['Meesapulimala Summit Trail - MANDATORY FOREST GUIDE ESCORT', 'Silent Valley Buffer - RESTRICTED ENTRY'],
    affectedPasses: ['Meesapulimala Summit Trail - MANDATORY FOREST GUIDE ESCORT', 'Silent Valley Buffer - RESTRICTED ENTRY'],
    passStatus: 'TECHNICAL ONLY',
    mandatedGear: ['High-decibel bear/wildlife whistle', 'High-visibility fluorescent trail vest', 'Thermal base layers for sub-10°C night drops'],
    emergencyVhfFreq: 'VHF 142.800 MHz (Munnar Wildlife Division)',
    satelliteChannel: 'Kerala Forest Emergency SOS Relay',
    issuedAt: '50 minutes ago',
    validDuration: 'Next 24 Hours'
  },
  {
    id: 'alert-rainforest-canopy',
    region: 'Rainforest',
    stationId: 'monteverde-station',
    stationName: 'Monteverde Cloud Forest Canopy Tower',
    altitude: '1,540m / 5,052ft',
    severity: 'ADVISORY',
    category: 'Canopy Squall & Treefall Hazard',
    headline: 'CLOUD FOREST CANOPY SQUALL & SWAY WARNING',
    alertSummary: 'High Pacific trade winds pushing 55 km/h gusts through the cloud forest canopy. Suspension skywalk bridges operating at 50% capacity.',
    summary: 'High Pacific trade winds pushing 55 km/h gusts through the cloud forest canopy. Suspension skywalk bridges operating at 50% capacity.',
    detailedAdvisory: 'Saturated volcanic soils combined with canopy winds create moderate treefall and falling epiphyte branch hazards along lower trails. Rubber boots and rain capes recommended.',
    temperatureC: 18,
    tempC: 18,
    feelsLikeC: 17,
    windSpeedKmh: 35,
    windGustKmh: 58,
    avalancheRisk: 'Low (Level 1)',
    snowAccumulationCm: 0,
    snowDepthCm: 0,
    passesAffected: ['Sky Walk Suspension Bridges - RESTRICTED PARTY SPACING', 'Continental Divide Trail - SLICK VOLCANIC MUD'],
    affectedPasses: ['Sky Walk Suspension Bridges - RESTRICTED PARTY SPACING', 'Continental Divide Trail - SLICK VOLCANIC MUD'],
    passStatus: 'OPEN',
    mandatedGear: ['Deep tread rubber boots', 'Silica-gel pack camera housing', 'Waterproof poncho'],
    emergencyVhfFreq: 'VHF 154.500 MHz (Cruz Roja Monteverde)',
    satelliteChannel: 'SINAC Costa Rica Ranger Relay',
    issuedAt: '1 hour ago',
    validDuration: 'Next 12 Hours'
  }
];

export const HIGH_ALTITUDE_ALERTS = MOUNTAIN_WEATHER_ALERTS;

export const ALL_MOUNTAIN_STATIONS: MountainWeatherStation[] = [
  {
    id: 'kibber-station',
    name: 'Kibber High Plateau Observatory',
    country: 'Spiti Valley, India',
    region: 'Spiti & Ladakh',
    altitude: '4,270m / 14,009ft',
    status: 'CLOSED - AVALANCHE LEVEL 4',
    tempC: -16,
    feelsLikeC: -29,
    windSpeedKmh: 54,
    windGustKmh: 88,
    windDirection: 'NW (315°)',
    avalancheRisk: '4 (High)',
    snowDepthCm: 72,
    visibilityKm: 0.4,
    freezingLevelM: 2800,
    condition: 'Heavy Blowing Snow & Ground Blizzard',
    sunrise: '06:14 AM',
    sunset: '05:42 PM',
    alertId: 'alert-spiti-avalanche',
    forecast: [
      { time: '12:00', tempC: -16, condition: 'Blizzard' },
      { time: '15:00', tempC: -18, condition: 'Heavy Snow' },
      { time: '18:00', tempC: -22, condition: 'Sub-Zero Freeze' },
      { time: '21:00', tempC: -25, condition: 'Whiteout' },
      { time: '00:00', tempC: -28, condition: 'Whiteout' },
    ]
  },
  {
    id: 'chadar-station',
    name: 'Zanskar Gorge Ice Thickness Post',
    country: 'Ladakh, India',
    region: 'Spiti & Ladakh',
    altitude: '3,300m / 10,826ft',
    status: 'CAUTION - THIN ICE ADVISORY',
    tempC: -18,
    feelsLikeC: -28,
    windSpeedKmh: 22,
    windGustKmh: 42,
    windDirection: 'NE (045°)',
    avalancheRisk: '2 (Moderate)',
    snowDepthCm: 32,
    visibilityKm: 6.0,
    freezingLevelM: 2100,
    condition: 'Deep Freeze & Sub-Surface Current',
    sunrise: '06:22 AM',
    sunset: '05:38 PM',
    alertId: 'alert-spiti-avalanche',
    forecast: [
      { time: '12:00', tempC: -18, condition: 'Clear Cold' },
      { time: '15:00', tempC: -15, condition: 'Solar Slush' },
      { time: '18:00', tempC: -20, condition: 'Rapid Freeze' },
      { time: '21:00', tempC: -26, condition: 'Ice Cracking' },
      { time: '00:00', tempC: -30, condition: 'Extreme Cold' },
    ]
  },
  {
    id: 'tre-cime-station',
    name: 'Tre Cime Alpine High Refuge Post',
    country: 'Dolomites, Italy',
    region: 'Alps',
    altitude: '2,450m / 8,038ft',
    status: 'CLOSED - VIA FERRATA ICED OVER',
    tempC: -5,
    feelsLikeC: -15,
    windSpeedKmh: 68,
    windGustKmh: 95,
    windDirection: 'N (010°)',
    avalancheRisk: '3 (Considerable)',
    snowDepthCm: 48,
    visibilityKm: 1.2,
    freezingLevelM: 1900,
    condition: 'Rime Ice Squall & North Face Gale',
    sunrise: '07:05 AM',
    sunset: '05:15 PM',
    alertId: 'alert-alps-gale',
    forecast: [
      { time: '12:00', tempC: -5, condition: 'Rime Storm' },
      { time: '15:00', tempC: -6, condition: 'Gale Squall' },
      { time: '18:00', tempC: -8, condition: 'Ridge Ice' },
      { time: '21:00', tempC: -11, condition: 'Deep Freeze' },
      { time: '00:00', tempC: -13, condition: 'Alpine Gale' },
    ]
  },
  {
    id: 'torres-station',
    name: 'Torres del Paine Mirador Post',
    country: 'Magallanes, Chile',
    region: 'Patagonia',
    altitude: '900m / 2,952ft',
    status: 'CLOSED - WILLIWAW 115 KM/H GALE',
    tempC: 6,
    feelsLikeC: -1,
    windSpeedKmh: 82,
    windGustKmh: 115,
    windDirection: 'W (270°)',
    avalancheRisk: '2 (Moderate)',
    snowDepthCm: 14,
    visibilityKm: 3.5,
    freezingLevelM: 1100,
    condition: 'Violent Downdrafts & Glacial Spray',
    sunrise: '05:48 AM',
    sunset: '09:20 PM',
    alertId: 'alert-patagonia-williwaw',
    forecast: [
      { time: '12:00', tempC: 6, condition: 'Williwaw Gusts' },
      { time: '15:00', tempC: 7, condition: 'Glacial Gale' },
      { time: '18:00', tempC: 4, condition: 'Wind Sleet' },
      { time: '21:00', tempC: 2, condition: 'Storm Winds' },
      { time: '00:00', tempC: 0, condition: 'Ridge Squall' },
    ]
  },
  {
    id: 'loveland-station',
    name: 'Loveland Pass Continental Divide Sensor',
    country: 'Colorado, United States',
    region: 'Rockies',
    altitude: '3,655m / 11,990ft',
    status: 'CAUTION - CHAIN LAW CODE 15',
    tempC: -12,
    feelsLikeC: -24,
    windSpeedKmh: 48,
    windGustKmh: 75,
    windDirection: 'WNW (290°)',
    avalancheRisk: '3 (Considerable)',
    snowDepthCm: 85,
    visibilityKm: 0.8,
    freezingLevelM: 2200,
    condition: 'Blowing Snow & Flash Freeze',
    sunrise: '06:50 AM',
    sunset: '05:25 PM',
    alertId: 'alert-rockies-blizzard',
    forecast: [
      { time: '12:00', tempC: -12, condition: 'Blowing Snow' },
      { time: '15:00', tempC: -14, condition: 'Blizzard' },
      { time: '18:00', tempC: -17, condition: 'Heavy Drift' },
      { time: '21:00', tempC: -20, condition: 'Divide Freeze' },
      { time: '00:00', tempC: -22, condition: 'Sub-Zero Gale' },
    ]
  },
  {
    id: 'reine-station',
    name: 'Reinebringen Arctic Fjord Sensor',
    country: 'Lofoten, Norway',
    region: 'Fjords',
    altitude: '448m / 1,470ft',
    status: 'CAUTION - BLACK ICE ON STEPS',
    tempC: 3,
    feelsLikeC: -3,
    windSpeedKmh: 42,
    windGustKmh: 72,
    windDirection: 'SW (225°)',
    avalancheRisk: '1 (Low)',
    snowDepthCm: 10,
    visibilityKm: 4.0,
    freezingLevelM: 400,
    condition: 'Arctic Graupel & Maritime Gusts',
    sunrise: '08:15 AM',
    sunset: '03:40 PM',
    alertId: 'alert-fjords-squall',
    forecast: [
      { time: '12:00', tempC: 3, condition: 'Graupel Squall' },
      { time: '15:00', tempC: 2, condition: 'Sleet' },
      { time: '18:00', tempC: 0, condition: 'Freezing Spray' },
      { time: '21:00', tempC: -1, condition: 'Granite Ice' },
      { time: '00:00', tempC: -2, condition: 'Coastal Gale' },
    ]
  },
  {
    id: 'ben-nevis-station',
    name: 'Ben Nevis North Face Automated Post',
    country: 'Highlands, Scotland',
    region: 'Highlands',
    altitude: '1,345m / 4,413ft',
    status: 'CAUTION - ZERO VISIBILITY WHITEOUT',
    tempC: -1,
    feelsLikeC: -9,
    windSpeedKmh: 55,
    windGustKmh: 82,
    windDirection: 'W (270°)',
    avalancheRisk: '3 (Considerable)',
    snowDepthCm: 45,
    visibilityKm: 0.1,
    freezingLevelM: 1050,
    condition: 'Plateau Fog & Driving Sleet',
    sunrise: '07:40 AM',
    sunset: '04:50 PM',
    alertId: 'alert-highlands-fog',
    forecast: [
      { time: '12:00', tempC: -1, condition: 'Summit Fog' },
      { time: '15:00', tempC: -2, condition: 'Driving Sleet' },
      { time: '18:00', tempC: -4, condition: 'Ridge Whiteout' },
      { time: '21:00', tempC: -5, condition: 'Gale Snow' },
      { time: '00:00', tempC: -6, condition: 'Plateau Freeze' },
    ]
  },
  {
    id: 'cherrapunji-station',
    name: 'Cherrapunji Gorge Monsoonal Sensor',
    country: 'Meghalaya, India',
    region: 'Meghalaya & Northeast',
    altitude: '1,430m / 4,691ft',
    status: 'CAUTION - RIVER SURGE WATCH',
    tempC: 17,
    feelsLikeC: 16,
    windSpeedKmh: 28,
    windGustKmh: 50,
    windDirection: 'S (180°)',
    avalancheRisk: '1 (Low)',
    snowDepthCm: 0,
    visibilityKm: 1.5,
    freezingLevelM: 4600,
    condition: 'Heavy Monsoonal Rain Bands & Mist',
    sunrise: '05:35 AM',
    sunset: '05:10 PM',
    alertId: 'alert-northeast-cloudburst',
    forecast: [
      { time: '12:00', tempC: 17, condition: 'Torrential Rain' },
      { time: '15:00', tempC: 18, condition: 'Gorge Cloudburst' },
      { time: '18:00', tempC: 16, condition: 'Heavy Mist' },
      { time: '21:00', tempC: 15, condition: 'River Surge' },
      { time: '00:00', tempC: 14, condition: 'Karst Fog' },
    ]
  },
  {
    id: 'meesapulimala-station',
    name: 'Meesapulimala Ridge Tower',
    country: 'Kerala, India',
    region: 'Western Ghats',
    altitude: '2,640m / 8,661ft',
    status: 'OPEN - GUIDE ESCORT MANDATORY',
    tempC: 11,
    feelsLikeC: 9,
    windSpeedKmh: 26,
    windGustKmh: 45,
    windDirection: 'SW (210°)',
    avalancheRisk: '1 (Low)',
    snowDepthCm: 0,
    visibilityKm: 0.2,
    freezingLevelM: 4800,
    condition: 'Dense Shola Cloud Inversion',
    sunrise: '06:12 AM',
    sunset: '06:20 PM',
    alertId: 'alert-ghats-mist',
    forecast: [
      { time: '12:00', tempC: 11, condition: 'Grassland Mist' },
      { time: '15:00', tempC: 13, condition: 'Passing Sun' },
      { time: '18:00', tempC: 10, condition: 'Cold Cloud Inversion' },
      { time: '21:00', tempC: 7, condition: 'High Ridge Fog' },
      { time: '00:00', tempC: 5, condition: 'Chilly Shola Wind' },
    ]
  },
  {
    id: 'monteverde-station',
    name: 'Monteverde Cloud Forest Canopy Tower',
    country: 'Puntarenas, Costa Rica',
    region: 'Rainforest',
    altitude: '1,540m / 5,052ft',
    status: 'OPEN - SKYWALK RESTRICTED',
    tempC: 18,
    feelsLikeC: 17,
    windSpeedKmh: 35,
    windGustKmh: 58,
    windDirection: 'NE (050°)',
    avalancheRisk: '1 (Low)',
    snowDepthCm: 0,
    visibilityKm: 3.0,
    freezingLevelM: 4900,
    condition: 'Canopy Trade Winds & Moisture Drift',
    sunrise: '05:30 AM',
    sunset: '05:40 PM',
    alertId: 'alert-rainforest-canopy',
    forecast: [
      { time: '12:00', tempC: 18, condition: 'Moisture Drift' },
      { time: '15:00', tempC: 19, condition: 'Canopy Squall' },
      { time: '18:00', tempC: 17, condition: 'Cloud Mist' },
      { time: '21:00', tempC: 16, condition: 'Trade Breeze' },
      { time: '00:00', tempC: 15, condition: 'Rainforest Hum' },
    ]
  }
];

export function getAlertForRegion(region: string): WeatherAlert | null {
  if (!region || region === 'All Sectors' || region === 'All Regions') {
    return MOUNTAIN_WEATHER_ALERTS[0];
  }
  const normalized = region.toLowerCase().trim();
  const found = MOUNTAIN_WEATHER_ALERTS.find(a => {
    const aReg = a.region.toLowerCase();
    if (aReg === normalized) return true;
    if ((normalized.includes('spiti') || normalized.includes('ladakh') || normalized.includes('india')) && a.region === 'Spiti & Ladakh') return true;
    if (normalized.includes('alp') && a.region === 'Alps') return true;
    if (normalized.includes('patagon') && a.region === 'Patagonia') return true;
    if (normalized.includes('rocki') && a.region === 'Rockies') return true;
    if ((normalized.includes('fjord') || normalized.includes('lofot')) && a.region === 'Fjords') return true;
    if ((normalized.includes('highland') || normalized.includes('scot')) && a.region === 'Highlands') return true;
    if ((normalized.includes('meghalaya') || normalized.includes('northeast')) && a.region === 'Meghalaya & Northeast') return true;
    if ((normalized.includes('ghat') || normalized.includes('kerala')) && a.region === 'Western Ghats') return true;
    if ((normalized.includes('rainforest') || normalized.includes('costa rica')) && a.region === 'Rainforest') return true;
    return false;
  });
  return found || MOUNTAIN_WEATHER_ALERTS[0];
}

export function getAlertsForRegion(region: string): WeatherAlert[] {
  const single = getAlertForRegion(region);
  return single ? [single] : [MOUNTAIN_WEATHER_ALERTS[0]];
}

export interface HistoricalAlert {
  id: string;
  hoursAgo: number;
  timeLabel: string;
  recordedAt: string;
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'RESOLVED';
  headline: string;
  category: string;
  summary: string;
  tempC: number;
  windGustKmh: number;
  passStatus: string;
  status: 'ACTIVE' | 'DOWNGRADED' | 'EXPIRED' | 'RESOLVED';
  actionTaken?: string;
}

export const REGIONAL_24H_HISTORY: Record<string, HistoricalAlert[]> = {
  'Spiti & Ladakh': [
    {
      id: 'spiti-hist-1',
      hoursAgo: 0.2,
      timeLabel: '12 min ago',
      recordedAt: '08:48 AM Today',
      severity: 'CRITICAL',
      headline: 'Level 4 Avalanche & -24°C Sub-Zero Whiteout Warning',
      category: 'Avalanche & Blizzard',
      summary: 'Heavy slab snow accumulation (72cm) with gale gusts up to 88 km/h. High-pass transit strictly suspended.',
      tempC: -16,
      windGustKmh: 88,
      passStatus: 'CLOSED',
      status: 'ACTIVE',
      actionTaken: 'Kunzum La gate sealed by District Disaster Management; emergency shelters stocked at Losar.'
    },
    {
      id: 'spiti-hist-2',
      hoursAgo: 4.5,
      timeLabel: '4.5 hours ago',
      recordedAt: '04:30 AM Today',
      severity: 'CRITICAL',
      headline: 'Kunzum La Ridge High-Velocity Snow Squall',
      category: 'Squall & Gale',
      summary: 'Continuous 75 km/h drifting snow blocked visibility to under 15 meters on the Batal-Chhatru corridor.',
      tempC: -19,
      windGustKmh: 82,
      passStatus: 'CLOSED',
      status: 'DOWNGRADED',
      actionTaken: 'BRO bulldozer team halted plowing until dawn due to sub-zero whiteout.'
    },
    {
      id: 'spiti-hist-3',
      hoursAgo: 9,
      timeLabel: '9 hours ago',
      recordedAt: '12:00 AM Midnight',
      severity: 'WARNING',
      headline: 'Sub-Zero Temperature Plunge (-26°C Flash Freeze)',
      category: 'Extreme Cold',
      summary: 'Valley floor temperatures dropped to -26°C. Severe fuel line freezing reported along Kaza highway.',
      tempC: -26,
      windGustKmh: 45,
      passStatus: 'TECHNICAL ONLY',
      status: 'EXPIRED',
      actionTaken: 'Satellite telemetry broadcasted mandatory anti-freeze advisory to all registered expeditions.'
    },
    {
      id: 'spiti-hist-4',
      hoursAgo: 16,
      timeLabel: '16 hours ago',
      recordedAt: '05:00 PM Yesterday',
      severity: 'ADVISORY',
      headline: 'Upper Ridge Gale Incursion & Rotor Turbulence',
      category: 'Wind Incursion',
      summary: 'Katabatic wind shear developed over Pin Valley ridge crests, causing helicopter SAR grounding.',
      tempC: -11,
      windGustKmh: 68,
      passStatus: 'OPEN WITH CAUTION',
      status: 'RESOLVED',
      actionTaken: 'Air dispatch advisory lifted after wind subsided below 60 km/h threshold.'
    },
    {
      id: 'spiti-hist-5',
      hoursAgo: 22,
      timeLabel: '22 hours ago',
      recordedAt: '11:00 AM Yesterday',
      severity: 'ADVISORY',
      headline: 'Himalayan Western Disturbance Pre-Frontal Shift',
      category: 'Barometric Shift',
      summary: 'Barometric pressure plunged 9 hPa over a 3-hour period, signaling incoming intense winter storm system.',
      tempC: -8,
      windGustKmh: 35,
      passStatus: 'NORMAL',
      status: 'RESOLVED',
      actionTaken: 'ITBP check-posts initiated mandatory sat-phone verification for all outgoing trekking parties.'
    }
  ],
  'Alps': [
    {
      id: 'alps-hist-1',
      hoursAgo: 0.3,
      timeLabel: '18 min ago',
      recordedAt: '08:42 AM Today',
      severity: 'CRITICAL',
      headline: '95 KM/H Katabatic Gale & Rime Ice Coating Warning',
      category: 'Gale & Icing',
      summary: 'Violent squalls sweeping Dolomites north face with rapid barometric pressure plunge. Exposed via ferrata cables iced over.',
      tempC: -5,
      windGustKmh: 95,
      passStatus: 'TECHNICAL ONLY',
      status: 'ACTIVE',
      actionTaken: 'Mountain rescue (CNSAS) cordoned Via Ferrata De Luca-Innerkofler; winter bivouacs opened.'
    },
    {
      id: 'alps-hist-2',
      hoursAgo: 5,
      timeLabel: '5 hours ago',
      recordedAt: '04:00 AM Today',
      severity: 'WARNING',
      headline: 'Passo Falzarego Black Ice & Switchback Freezing',
      category: 'Road Hazard',
      summary: 'Sub-freezing rain glazed roadway surface between Cortina and Arabba. Snow chains strictly mandated.',
      tempC: -3,
      windGustKmh: 62,
      passStatus: 'CHAINS MANDATORY',
      status: 'DOWNGRADED',
      actionTaken: 'Grit and brine dispersal units completed salting operations on northern aspects.'
    },
    {
      id: 'alps-hist-3',
      hoursAgo: 11,
      timeLabel: '11 hours ago',
      recordedAt: '10:00 PM Yesterday',
      severity: 'WARNING',
      headline: 'High Alpine Wind Shear on Tre Cime Ridge',
      category: 'Wind Alert',
      summary: 'Ridge crest sensors clocked sustained gusts of 88 km/h. Bivouac Locatelli shelter reached capacity.',
      tempC: -7,
      windGustKmh: 88,
      passStatus: 'CAUTION',
      status: 'EXPIRED',
      actionTaken: 'Rangers verified all bivouac emergency heating systems were active.'
    },
    {
      id: 'alps-hist-4',
      hoursAgo: 18,
      timeLabel: '18 hours ago',
      recordedAt: '03:00 PM Yesterday',
      severity: 'ADVISORY',
      headline: 'Föhn Breakdown & Rapid Temperature Drop',
      category: 'Thermal Front',
      summary: 'Warm southern föhn wind collapsed suddenly, resulting in a 12°C drop in under 90 minutes.',
      tempC: 4,
      windGustKmh: 55,
      passStatus: 'OPEN',
      status: 'RESOLVED',
      actionTaken: 'Alpine huts notified overnight guests to prepare 4-season thermal layers.'
    },
    {
      id: 'alps-hist-5',
      hoursAgo: 23,
      timeLabel: '23 hours ago',
      recordedAt: '10:00 AM Yesterday',
      severity: 'ADVISORY',
      headline: 'Dolomites Cloud Inversion with Valley Fog',
      category: 'Visibility',
      summary: 'Low stratus cloud ceiling at 1,900m reduced vertical flight clearance for panoramic helicopter tours.',
      tempC: 6,
      windGustKmh: 28,
      passStatus: 'OPEN',
      status: 'RESOLVED',
      actionTaken: 'VFR aviation clearance resumed by midday after inversion dissipation.'
    }
  ],
  'Patagonia': [
    {
      id: 'pat-hist-1',
      hoursAgo: 0.1,
      timeLabel: '8 min ago',
      recordedAt: '08:52 AM Today',
      severity: 'CRITICAL',
      headline: '115 KM/H Williwaw Hurricane Gusts Warning',
      category: 'Catastrophic Wind',
      summary: 'Catastrophic downdraft winds originating from Southern Patagonian Icefield. French Valley transit restricted.',
      tempC: 6,
      windGustKmh: 115,
      passStatus: 'CLOSED',
      status: 'ACTIVE',
      actionTaken: 'CONAF rangers suspended hiking above Campamento Italiano; Catamaran Pehoé delayed.'
    },
    {
      id: 'pat-hist-2',
      hoursAgo: 4,
      timeLabel: '4 hours ago',
      recordedAt: '05:00 AM Today',
      severity: 'CRITICAL',
      headline: 'John Gardner Pass Col Severe Downdraft Hazard',
      category: 'Pass Hazard',
      summary: 'Sustained winds over 90 km/h with gusts exceeding 110 km/h at pass summit. Risk of falling debris.',
      tempC: 2,
      windGustKmh: 110,
      passStatus: 'CLOSED',
      status: 'DOWNGRADED',
      actionTaken: 'Pass access closed from Grey Camp; rangers redirected trekkers toward shelter huts.'
    },
    {
      id: 'pat-hist-3',
      hoursAgo: 10,
      timeLabel: '10 hours ago',
      recordedAt: '11:00 PM Yesterday',
      severity: 'WARNING',
      headline: 'Lake Pehoé Ferry Crossing Wave Warning',
      category: 'Water Transit',
      summary: '2.5-meter chop waves driven by 80 km/h crosswinds along Puerto Pudeto crossing route.',
      tempC: 5,
      windGustKmh: 85,
      passStatus: 'RESTRICTED',
      status: 'EXPIRED',
      actionTaken: 'Catamaran operations restricted to dual-engine displacement vessels only.'
    },
    {
      id: 'pat-hist-4',
      hoursAgo: 17,
      timeLabel: '17 hours ago',
      recordedAt: '04:00 PM Yesterday',
      severity: 'ADVISORY',
      headline: 'Cuernos del Paine Sleet & Glaze Squall',
      category: 'Squall',
      summary: 'Passing frontal band brought heavy sleet and squall winds along the W-Trek trail sections.',
      tempC: 4,
      windGustKmh: 68,
      passStatus: 'CAUTION',
      status: 'RESOLVED',
      actionTaken: 'Refugio staff checked all bridge anchor lines along French River.'
    },
    {
      id: 'pat-hist-5',
      hoursAgo: 23,
      timeLabel: '23 hours ago',
      recordedAt: '10:00 AM Yesterday',
      severity: 'ADVISORY',
      headline: 'Southern Ocean Low Pressure Approach',
      category: 'Frontal System',
      summary: 'Deep cyclonic system centered 400km southwest began pushing gale force wind bands toward coast.',
      tempC: 9,
      windGustKmh: 52,
      passStatus: 'OPEN',
      status: 'RESOLVED',
      actionTaken: 'Satellite tracking alert issued to all certified expedition guides.'
    }
  ],
  'Rockies': [
    {
      id: 'roc-hist-1',
      hoursAgo: 0.4,
      timeLabel: '24 min ago',
      recordedAt: '08:36 AM Today',
      severity: 'WARNING',
      headline: 'Continental Divide Blizzard & -18°C Flash Freeze',
      category: 'Blizzard & Freezing',
      summary: 'Rapid cold front dropped temperatures 14°C in 2 hours. Whiteout blowing snow reducing roadway visibility.',
      tempC: -14,
      windGustKmh: 75,
      passStatus: 'AVALANCHE MITIGATION',
      status: 'ACTIVE',
      actionTaken: 'CDOT initiated periodic avalanche mitigation closures on Highway 6 Loveland Pass.'
    },
    {
      id: 'roc-hist-2',
      hoursAgo: 6,
      timeLabel: '6 hours ago',
      recordedAt: '03:00 AM Today',
      severity: 'WARNING',
      headline: 'Berthoud Pass Blowing Snow & Drift Buildup',
      category: 'Snow Drift',
      summary: 'Drifts reaching 1.2m on windward highway cuts. Passenger vehicle traction laws enforced.',
      tempC: -16,
      windGustKmh: 68,
      passStatus: 'CHAINS REQUIRED',
      status: 'DOWNGRADED',
      actionTaken: 'Rotary snowplows cleared switchbacks between Empire and Winter Park.'
    },
    {
      id: 'roc-hist-3',
      hoursAgo: 12,
      timeLabel: '12 hours ago',
      recordedAt: '09:00 PM Yesterday',
      severity: 'WARNING',
      headline: 'CAIC Backcountry Avalanche Watch Issued',
      category: 'Avalanche Watch',
      summary: 'Colorado Avalanche Information Center upgraded danger rating to Level 3 for east-facing slopes.',
      tempC: -10,
      windGustKmh: 58,
      passStatus: 'CAUTION',
      status: 'EXPIRED',
      actionTaken: 'Backcountry warning signs posted at all trailhead kiosks.'
    },
    {
      id: 'roc-hist-4',
      hoursAgo: 19,
      timeLabel: '19 hours ago',
      recordedAt: '02:00 PM Yesterday',
      severity: 'ADVISORY',
      headline: 'High Elevation Jet Stream Wind Turbulence',
      category: 'High Wind',
      summary: 'Ridge gusts exceeded 85 km/h along the Continental Divide crest above 3,500m.',
      tempC: -4,
      windGustKmh: 85,
      passStatus: 'OPEN',
      status: 'RESOLVED',
      actionTaken: 'Ski patrol temporarily closed summit express chairlifts.'
    },
    {
      id: 'roc-hist-5',
      hoursAgo: 24,
      timeLabel: '24 hours ago',
      recordedAt: '09:00 AM Yesterday',
      severity: 'ADVISORY',
      headline: 'Arctic Front Approach & Temperature Inversion',
      category: 'Cold Air Influx',
      summary: 'High pressure ridge weakened, allowing Canadian arctic air mass to penetrate the Front Range.',
      tempC: 2,
      windGustKmh: 35,
      passStatus: 'OPEN',
      status: 'RESOLVED',
      actionTaken: 'Routine winter maintenance teams readied snow removal fleet.'
    }
  ]
};

export function get24HourAlertHistory(region: string): HistoricalAlert[] {
  if (REGIONAL_24H_HISTORY[region]) {
    return REGIONAL_24H_HISTORY[region];
  }

  // Check normalized match
  const normalized = region.toLowerCase();
  for (const key of Object.keys(REGIONAL_24H_HISTORY)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return REGIONAL_24H_HISTORY[key];
    }
  }

  // Fallback realistic 24-hour generated history based on current alert for this region
  const baseAlert = getAlertForRegion(region) || MOUNTAIN_WEATHER_ALERTS[0];
  return [
    {
      id: `${baseAlert.id}-hist-1`,
      hoursAgo: 0.5,
      timeLabel: '30 min ago',
      recordedAt: '08:30 AM Today',
      severity: baseAlert.severity,
      headline: baseAlert.headline,
      category: baseAlert.category,
      summary: baseAlert.summary,
      tempC: baseAlert.tempC,
      windGustKmh: baseAlert.windGustKmh,
      passStatus: baseAlert.passStatus,
      status: 'ACTIVE',
      actionTaken: 'Live satellite sensors transmitting telemetry continuously.'
    },
    {
      id: `${baseAlert.id}-hist-2`,
      hoursAgo: 5,
      timeLabel: '5 hours ago',
      recordedAt: '04:00 AM Today',
      severity: baseAlert.severity === 'CRITICAL' ? 'WARNING' : 'ADVISORY',
      headline: `${region} Atmospheric Pressure & Wind Shear Alert`,
      category: 'Pressure Trend',
      summary: `Microclimate sensors recorded sudden shifts in wind vectors and localized air density drops across ${region}.`,
      tempC: baseAlert.tempC - 2,
      windGustKmh: Math.round(baseAlert.windGustKmh * 0.85),
      passStatus: 'TECHNICAL CAUTION',
      status: 'DOWNGRADED',
      actionTaken: 'Field ranger stations updated weather advisory boards.'
    },
    {
      id: `${baseAlert.id}-hist-3`,
      hoursAgo: 11,
      timeLabel: '11 hours ago',
      recordedAt: '10:00 PM Yesterday',
      severity: 'WARNING',
      headline: `${region} Nighttime Inversion & Temperature Dip`,
      category: 'Diurnal Drop',
      summary: `Rapid nocturnal radiational cooling observed at high-altitude monitoring stations across ${region}.`,
      tempC: baseAlert.tempC - 4,
      windGustKmh: Math.round(baseAlert.windGustKmh * 0.7),
      passStatus: 'CAUTION',
      status: 'EXPIRED',
      actionTaken: 'Automated satellite telemetry alerts dispatched to registered guides.'
    },
    {
      id: `${baseAlert.id}-hist-4`,
      hoursAgo: 17,
      timeLabel: '17 hours ago',
      recordedAt: '04:00 PM Yesterday',
      severity: 'ADVISORY',
      headline: `${region} Regional Wind Convergence`,
      category: 'Wind Shift',
      summary: `High elevation air stream convergence caused turbulent gusts along ridge passes in ${region}.`,
      tempC: baseAlert.tempC + 3,
      windGustKmh: Math.round(baseAlert.windGustKmh * 0.6),
      passStatus: 'OPEN',
      status: 'RESOLVED',
      actionTaken: 'Ridge stations confirmed wind stabilization.'
    },
    {
      id: `${baseAlert.id}-hist-5`,
      hoursAgo: 23,
      timeLabel: '23 hours ago',
      recordedAt: '10:00 AM Yesterday',
      severity: 'ADVISORY',
      headline: `${region} Baseline Daily Telemetry Calibrated`,
      category: 'Telemetry Sync',
      summary: `Daily morning sensor calibration completed successfully across all ${region} satellite stations.`,
      tempC: baseAlert.tempC + 2,
      windGustKmh: Math.round(baseAlert.windGustKmh * 0.5),
      passStatus: 'NORMAL',
      status: 'RESOLVED',
      actionTaken: 'Sensors cross-referenced against satellite meteorological telemetry.'
    }
  ];
}

