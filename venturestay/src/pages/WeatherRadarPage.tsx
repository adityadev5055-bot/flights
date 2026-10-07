import React, { useState, useEffect } from 'react';
import { 
  CloudSnow, Wind, Thermometer, Eye, AlertTriangle, Sun, 
  Compass, RefreshCw, Radio, Mountain, MapPin, CheckCircle2,
  ShieldAlert, Volume2, VolumeX, ShieldCheck, ArrowLeft,
  Activity, Bell, ExternalLink, Snowflake, Layers
} from 'lucide-react';
import { 
  ALL_MOUNTAIN_STATIONS, 
  MOUNTAIN_WEATHER_ALERTS, 
  MountainWeatherStation, 
  WeatherAlert, 
  getAlertForRegion, 
  playTelemetryAlertChime 
} from '../data/weatherAlertsData';

interface WeatherRadarPageProps {
  onNavigatePage: (pageId: string) => void;
  initialRegion?: string;
  initialStationId?: string;
}

export const WeatherRadarPage: React.FC<WeatherRadarPageProps> = ({ 
  onNavigatePage,
  initialRegion,
  initialStationId
}) => {
  // Region filter or station selection
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>(() => {
    return initialRegion || 'All Sectors';
  });

  const [selectedStationId, setSelectedStationId] = useState<string>(() => {
    if (initialStationId) return initialStationId;
    if (initialRegion) {
      const match = ALL_MOUNTAIN_STATIONS.find(s => s.region === initialRegion);
      if (match) return match.id;
    }
    return ALL_MOUNTAIN_STATIONS[0].id;
  });

  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now (Telemetry Live Uplink)');
  const [isSimulatingFeed, setIsSimulatingFeed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [simulatedAlertCount, setSimulatedAlertCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'station' | 'all-alerts' | 'passes'>('station');

  // Filter stations based on selected region
  const displayedStations = selectedRegionFilter === 'All Sectors' 
    ? ALL_MOUNTAIN_STATIONS 
    : ALL_MOUNTAIN_STATIONS.filter(s => s.region === selectedRegionFilter);

  const currentStation = ALL_MOUNTAIN_STATIONS.find(s => s.id === selectedStationId) || displayedStations[0] || ALL_MOUNTAIN_STATIONS[0];

  // Active alert for the currently viewed station/region
  const currentAlert: WeatherAlert | null = getAlertForRegion(currentStation.region);

  // If initialRegion changed from props, update selected station
  useEffect(() => {
    if (initialRegion && initialRegion !== 'All Regions') {
      setSelectedRegionFilter(initialRegion);
      const match = ALL_MOUNTAIN_STATIONS.find(s => s.region === initialRegion);
      if (match) {
        setSelectedStationId(match.id);
      }
    }
    if (initialStationId) {
      setSelectedStationId(initialStationId);
    }
  }, [initialRegion, initialStationId]);

  // Simulate real-time satellite telemetry ping
  const handleSimulateUplink = () => {
    setIsSimulatingFeed(true);
    if (soundEnabled) {
      playTelemetryAlertChime();
    }
    setTimeout(() => {
      setLastRefreshed('Refreshed via Iridium Satellite 10s ago');
      setIsSimulatingFeed(false);
      setSimulatedAlertCount(prev => prev + 1);
    }, 1200);
  };

  const isCritical = currentAlert?.severity === 'CRITICAL';
  const isWarning = currentAlert?.severity === 'WARNING';

  // Distinct regions for filter tabs
  const REGION_TABS = ['All Sectors', 'Spiti & Ladakh', 'Alps', 'Patagonia', 'Rockies', 'Fjords', 'Highlands', 'Meghalaya & Northeast', 'Western Ghats', 'Rainforest'];

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      
      {/* Top Breadcrumb & Live Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigatePage('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-[#ff4d36] text-slate-200 hover:text-white transition-all cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Dashboard</span>
            </button>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-emerald-400 font-bold">RADAR SATELLITE NETWORK</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>10 REMOTE GROUND SENSORS ONLINE</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer px-2 py-1 rounded bg-slate-800"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span>{soundEnabled ? 'Chime Active' : 'Muted'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#ff4d36] uppercase font-bold mb-3">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>REAL-TIME EXPEDITION RADAR • HIGH-ALTITUDE TELEMETRY NETWORK</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Alpine Weather & <span className="text-[#ff4d36]">High-Altitude Warning Radar</span>
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Direct weather station feeds from remote high-altitude telemetry posts in Spiti, Ladakh, the Alps, Patagonia, Rockies, and Lofoten. Immediate satellite warning alerts are issued for avalanche triggers, ground blizzards, gale-force winds, and pass closures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* ========================================================= */}
        {/* 1. HIGH-ALTITUDE WEATHER WARNING EMERGENCY BULLETIN BOX */}
        {/* ========================================================= */}
        {currentAlert && (
          <div className={`mb-8 p-5 sm:p-7 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border ${
            isCritical ? 'border-red-500/80 shadow-[0_10px_35px_rgba(239,68,68,0.25)]' : isWarning ? 'border-amber-500/80 shadow-[0_10px_35px_rgba(245,158,11,0.22)]' : 'border-blue-500/60'
          } relative overflow-hidden transition-all`}>
            
            {/* Background Red/Amber Pulse */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25 ${isCritical ? 'bg-red-500' : 'bg-amber-400'}`} />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritical ? 'bg-red-400' : 'bg-amber-400'}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isCritical ? 'bg-red-500' : 'bg-amber-500'}`} />
                </span>
                <span className="font-mono text-xs font-black tracking-widest text-[#ff4d36] uppercase flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  OFFICIAL HIGH-ALTITUDE ADVISORY BULLETIN
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-xs text-slate-300">
                  Target Sector: <strong className="text-white">{currentAlert.region}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  isCritical ? 'bg-red-500/20 text-red-300 border-red-500/50' : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                }`}>
                  {currentAlert.severity} ALERT
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {currentAlert.issuedAt}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Headline & Advisory */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-xl sm:text-2xl font-black font-syne text-white flex items-center gap-2.5">
                  <AlertTriangle className={`w-6 h-6 shrink-0 ${isCritical ? 'text-red-500 animate-pulse' : 'text-amber-400'}`} />
                  <span>{currentAlert.headline}</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentAlert.alertSummary}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  <strong className="text-amber-400 block mb-1">TECHNICAL FIELD DISPATCH:</strong>
                  {currentAlert.detailedAdvisory}
                </div>

                {/* Passes affected */}
                {currentAlert.passesAffected.length > 0 && (
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400 font-bold uppercase">Pass Impairments:</span>
                    {currentAlert.passesAffected.map((pass, pIdx) => (
                      <span key={pIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-red-300 font-semibold">
                        {pass}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Col: Telemetry Box & Emergency Comms */}
              <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-[#ff4d36] font-bold uppercase block mb-3">
                    REAL-TIME HAZARD SENSORS:
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">WIND GUSTS</span>
                      <strong className="text-white text-sm">{currentAlert.windGustKmh} km/h</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">TEMP / CHILL</span>
                      <strong className="text-white text-sm">{currentAlert.temperatureC}°C / {currentAlert.feelsLikeC}°C</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">AVALANCHE TIER</span>
                      <strong className="text-amber-300 text-sm">{currentAlert.avalancheRisk}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SNOW ACCUM</span>
                      <strong className="text-white text-sm">{currentAlert.snowAccumulationCm} cm</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="text-[11px] text-slate-400">
                    Emergency VHF: <strong className="text-emerald-400">{currentAlert.emergencyVhfFreq}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Satellite Mesh: <strong className="text-slate-200">{currentAlert.satelliteChannel}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigatePage('gear-checklist')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Check Required Alpine Gear</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 2. REGION FILTER TABS */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Compass className="w-4 h-4 text-[#ff4d36]" />
            <span className="font-bold uppercase text-slate-300">SELECT MOUNTAIN REGION:</span>
          </div>

          <button
            onClick={handleSimulateUplink}
            disabled={isSimulatingFeed}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs border border-slate-700 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Poll Satellite Telemetry Feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingFeed ? 'animate-spin text-[#ff4d36]' : 'text-emerald-400'}`} />
            <span>{isSimulatingFeed ? 'Uplinking Satellite Feed...' : 'Poll Satellite Uplink'}</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {REGION_TABS.map((reg) => {
            const isSelected = selectedRegionFilter === reg;
            return (
              <button
                key={reg}
                onClick={() => {
                  setSelectedRegionFilter(reg);
                  if (reg !== 'All Sectors') {
                    const match = ALL_MOUNTAIN_STATIONS.find(s => s.region === reg);
                    if (match) setSelectedStationId(match.id);
                  }
                  if (soundEnabled) playTelemetryAlertChime();
                }}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff4d36] text-white font-bold shadow-md shadow-[#ff4d36]/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {reg}
              </button>
            );
          })}
        </div>

        {/* Station Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {displayedStations.map(st => {
            const hasAlert = st.alertId || st.status.includes('CLOSED');
            return (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedStationId(st.id);
                  if (soundEnabled) playTelemetryAlertChime();
                }}
                className={`shrink-0 p-4 rounded-2xl border text-left transition-all cursor-pointer min-w-[260px] ${
                  selectedStationId === st.id
                    ? 'bg-slate-900 border-[#ff4d36] ring-2 ring-[#ff4d36]/30 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                  <span className="text-slate-400 truncate max-w-[140px]">{st.country}</span>
                  <div className="flex items-center gap-1.5">
                    {hasAlert && (
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" title="Active Warning" />
                    )}
                    <span className="text-emerald-400 font-bold">LIVE</span>
                  </div>
                </div>
                <h4 className="font-syne font-bold text-sm text-white truncate">{st.name}</h4>
                <div className="mt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-lg font-black text-[#ff4d36]">{st.tempC}°C</span>
                  <span className="text-slate-400">{st.altitude}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Gusts: {st.windGustKmh} km/h</span>
                  <span className={st.status.startsWith('CLOSED') ? 'text-red-400 font-bold' : st.status.startsWith('CAUTION') ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                    {st.status.split(' - ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. LIVE STATION DETAILED TELEMETRY DASHBOARD */}
        {/* ========================================================= */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  currentStation.status.startsWith('OPEN') 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : currentStation.status.startsWith('CAUTION')
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}>
                  {currentStation.status}
                </span>
                <span className="text-xs font-mono text-slate-400">Station ID: {currentStation.id}</span>
              </div>
              <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mt-2">
                {currentStation.name}
              </h2>
              <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#ff4d36]" />
                {currentStation.country} • Elevation: {currentStation.altitude}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">TELEMETRY UPLINK</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">{lastRefreshed}</span>
              </div>
              <button
                onClick={handleSimulateUplink}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer border border-slate-700 transition-colors"
                title="Refresh Satellite Data"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulatingFeed ? 'animate-spin text-[#ff4d36]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Large Metrics Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8">
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-[#ff4d36]" />
                TEMPERATURE
              </span>
              <span className="block text-3xl sm:text-4xl font-black font-syne text-white mt-2">
                {currentStation.tempC}°C
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                Feels like {currentStation.feelsLikeC}°C
              </span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-blue-400" />
                WIND VELOCITY
              </span>
              <span className="block text-3xl sm:text-4xl font-black font-syne text-white mt-2">
                {currentStation.windSpeedKmh} <span className="text-sm font-normal text-slate-400">km/h</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                Gusts {currentStation.windGustKmh} km/h • Dir {currentStation.windDirection}
              </span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                AVALANCHE RISK
              </span>
              <span className="block text-2xl sm:text-3xl font-black font-syne text-amber-400 mt-2">
                Level {currentStation.avalancheRisk}
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                Snow Depth: {currentStation.snowDepthCm} cm
              </span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                VISIBILITY
              </span>
              <span className="block text-3xl sm:text-4xl font-black font-syne text-white mt-2">
                {currentStation.visibilityKm} <span className="text-sm font-normal text-slate-400">km</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                Freezing Line: {currentStation.freezingLevelM}m
              </span>
            </div>
          </div>

          {/* Current Station Condition Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <CloudSnow className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs font-mono text-slate-400 block">CURRENT SENSOR CONDITIONS</span>
                <span className="text-sm font-bold text-white font-sans">{currentStation.condition}</span>
              </div>
            </div>

            <div className="text-right text-xs font-mono text-slate-400 hidden sm:block">
              <span>Sunrise: {currentStation.sunrise} • Sunset: {currentStation.sunset}</span>
            </div>
          </div>

          {/* Hourly Timeline */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d36] font-bold block mb-3">
              12-HOUR EXPEDITION FORECAST PROJECTION
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {currentStation.forecast.map((f, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs font-mono text-slate-400 block">{f.time}</span>
                  <span className="text-xl font-bold font-syne text-white my-1 block">{f.tempC}°C</span>
                  <span className="text-[11px] text-slate-400 block truncate">{f.condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Protocol Box */}
          <div className="mt-8 bg-blue-950/40 p-6 rounded-2xl border border-blue-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white block mb-0.5">VentureTravel Agency Trail Safety Advisory</span>
                Active weather telemetry for {currentStation.name} requires certified alpine guides and high-altitude thermal gear. Crossings without satellite transponders are strictly prohibited by local SAR authorities.
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigatePage('gear-checklist')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Verify Gear Checklist
              </button>
              <button
                onClick={() => onNavigatePage('emergency-sos')}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer transition-colors"
              >
                SOS Protocols
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
