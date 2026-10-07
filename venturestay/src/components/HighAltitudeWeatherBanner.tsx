import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Wind, 
  Thermometer, 
  Radio, 
  ShieldAlert, 
  ChevronRight, 
  X, 
  Compass, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  CheckCircle2,
  Zap,
  Mountain,
  Sparkles,
  ChevronDown,
  History
} from 'lucide-react';
import { getAlertsForRegion, WeatherAlert, HIGH_ALTITUDE_ALERTS } from '../data/weatherAlertsData';
import { REGIONS_LIST } from '../data/mockData';
import { playTelemetryAlertChime } from '../utils/audioAlert';
import { WeatherAlertHistoryModal } from './WeatherAlertHistoryModal';

interface HighAltitudeWeatherBannerProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  onNavigateToRadar: (regionOrStationId?: string, stationId?: string) => void;
  onNavigatePage?: (pageId: string) => void;
  alert?: WeatherAlert | null;
  onDismiss?: () => void;
}

const MOUNTAIN_REGIONS = [
  'Spiti & Ladakh',
  'Alps',
  'Patagonia',
  'Rockies',
  'Fjords',
  'Highlands',
  'Meghalaya & Northeast',
  'Western Ghats'
];

export const HighAltitudeWeatherBanner: React.FC<HighAltitudeWeatherBannerProps> = ({
  selectedRegion,
  onSelectRegion,
  onNavigateToRadar,
  onNavigatePage = (_pageId: string) => {},
  alert,
  onDismiss
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showFullAdvisory, setShowFullAdvisory] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSimulatingUpdate, setIsSimulatingUpdate] = useState<boolean>(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState<number>(0);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Transition & Highlight state for region changes via dropdown
  const [isRegionTransitioning, setIsRegionTransitioning] = useState<boolean>(false);
  const [highlightKey, setHighlightKey] = useState<number>(0);
  const prevRegionRef = useRef<string>(selectedRegion);

  const alerts = getAlertsForRegion(selectedRegion);
  const currentAlert: WeatherAlert = alert || alerts[activeAlertIndex] || alerts[0] || HIGH_ALTITUDE_ALERTS[0];

  // When region changes (via 'Select Region' dropdown or sector pills), trigger smooth transition animation & highlight
  useEffect(() => {
    setActiveAlertIndex(0);
    if (prevRegionRef.current !== selectedRegion) {
      prevRegionRef.current = selectedRegion;
      setIsRegionTransitioning(true);
      setHighlightKey(prev => prev + 1);

      if (soundEnabled && currentAlert.severity === 'CRITICAL') {
        playTelemetryAlertChime();
      }

      const timer = setTimeout(() => {
        setIsRegionTransitioning(false);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [selectedRegion, currentAlert.severity, soundEnabled]);

  const handleSimulateLiveUpdate = () => {
    setIsSimulatingUpdate(true);
    setIsRegionTransitioning(true);
    setHighlightKey(prev => prev + 1);
    if (soundEnabled) {
      playTelemetryAlertChime();
    }
    setTimeout(() => {
      setIsSimulatingUpdate(false);
    }, 1200);
    setTimeout(() => {
      setIsRegionTransitioning(false);
    }, 2200);
  };

  const getSeverityStyle = (severity: 'CRITICAL' | 'WARNING' | 'ADVISORY') => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-gradient-to-r from-red-950/90 via-slate-900/95 to-slate-950/90',
          border: 'border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.25)]',
          badge: 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]',
          accent: 'text-red-400',
          pulse: 'bg-red-500'
        };
      case 'WARNING':
        return {
          bg: 'bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-slate-950/90',
          border: 'border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.2)]',
          badge: 'bg-amber-500 text-slate-950 font-bold',
          accent: 'text-amber-400',
          pulse: 'bg-amber-500'
        };
      case 'ADVISORY':
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-950/90 via-slate-900/95 to-slate-950/90',
          border: 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]',
          badge: 'bg-blue-500 text-white font-bold',
          accent: 'text-blue-400',
          pulse: 'bg-blue-500'
        };
    }
  };

  const style = getSeverityStyle(currentAlert.severity);

  if (isMinimized) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-red-500/40 rounded-2xl p-3.5 flex items-center justify-between shadow-lg text-xs text-white">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-mono font-bold text-red-400 uppercase tracking-wider">
              HIGH-ALTITUDE WEATHER ALERT ACTIVE:
            </span>
            <span className="font-semibold text-slate-200 hidden sm:inline truncate max-w-md">
              {currentAlert.headline}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistoryModal(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1 border border-slate-700"
              title="View 24h Alert History"
            >
              <History className="w-3.5 h-3.5 text-[#ff4d36]" />
              <span>Recent History</span>
            </button>
            <button
              onClick={() => onNavigateToRadar(currentAlert.stationId, currentAlert.region)}
              className="px-3 py-1.5 rounded-lg bg-[#ff4d36] hover:bg-red-600 text-white font-bold text-[11px] transition-colors cursor-pointer"
            >
              Inspect Radar
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Expand Alert"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 24-Hour Weather Alert History Modal */}
        <WeatherAlertHistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          region={selectedRegion}
          onNavigateToRadar={onNavigateToRadar}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 transition-all">
      <div 
        className={`relative overflow-hidden rounded-3xl border transition-all duration-700 ${
          isRegionTransitioning
            ? 'ring-2 ring-[#ff4d36] border-[#ff4d36] shadow-[0_0_45px_rgba(255,77,54,0.45)]'
            : `${style.border} shadow-2xl`
        } ${style.bg} backdrop-blur-2xl text-white p-5 sm:p-7`}
      >
        
        {/* Animated Radar Sweep Highlight Beam on Region Switch */}
        <AnimatePresence>
          {isRegionTransitioning && (
            <motion.div
              key={`radar-sweep-${highlightKey}`}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '250%', opacity: [0, 0.85, 0.85, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-[#ff4d36]/30 to-transparent pointer-events-none z-20 -skew-x-12 blur-xs"
            />
          )}
        </AnimatePresence>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Telemetry Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-[11px] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>LIVE SATELLITE TELEMETRY ALERT</span>
            </div>

            <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-[#ff4d36]" />
              <strong className="text-white">{currentAlert.stationName}</strong> ({currentAlert.altitude})
            </span>

            <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-black ${style.badge}`}>
              {currentAlert.severity} ADVISORY
            </span>

            {/* 'Recent History' Link Button in Header */}
            <button
              id="recent-history-header-link"
              onClick={() => setShowHistoryModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-[11px] font-mono transition-colors cursor-pointer group shadow-sm"
              title={`View ${selectedRegion} weather alert history over the last 24 hours`}
            >
              <History className="w-3.5 h-3.5 text-[#ff4d36] group-hover:rotate-[-25deg] transition-transform" />
              <span className="font-semibold underline underline-offset-4 decoration-slate-400/60 group-hover:decoration-white">
                Recent History
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-[10px] text-slate-300 font-bold border border-slate-700/80">
                24h
              </span>
            </button>

            {/* Region Update Pulsing Notification */}
            <AnimatePresence>
              {isRegionTransitioning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/60 text-emerald-300 font-mono text-[10px] font-extrabold shadow-sm shadow-emerald-500/30"
                >
                  <Sparkles className="w-3 h-3 text-emerald-300 animate-spin" />
                  <span>SECTOR SYNCED: {selectedRegion}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio chime toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playTelemetryAlertChime();
              }}
              className={`p-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-1 border cursor-pointer ${
                soundEnabled 
                  ? 'bg-slate-800/80 border-slate-700 text-emerald-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
              title={soundEnabled ? 'Chime Alert Enabled (Click to Mute)' : 'Chime Alert Muted (Click to Enable)'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{soundEnabled ? 'Beacon Sound' : 'Muted'}</span>
            </button>

            {/* Simulate Live Uplink Refresh */}
            <button
              onClick={handleSimulateLiveUpdate}
              className={`p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                isSimulatingUpdate ? 'animate-pulse ring-2 ring-[#ff4d36]' : ''
              }`}
              title="Ping Satellite Sensor Array"
            >
              <Zap className={`w-3.5 h-3.5 text-amber-400 ${isSimulatingUpdate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline text-[11px]">
                {isSimulatingUpdate ? 'Pinging InReach...' : 'Test Telemetry Uplink'}
              </span>
            </button>

            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Minimize Alert"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>

            {/* Dismiss */}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-red-900/60 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-600 transition-colors cursor-pointer"
                title="Dismiss Alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mountain Region Fast Selector & Region Dropdown */}
        <div className="pt-3 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Radio className="w-3 h-3 text-red-400" />
              Active Sectors:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {MOUNTAIN_REGIONS.map(reg => {
                const isSelected = selectedRegion === reg || (selectedRegion === 'All Regions' && reg === 'Spiti & Ladakh');
                return (
                  <button
                    key={reg}
                    onClick={() => onSelectRegion(reg)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#ff4d36] text-white border-[#ff4d36] shadow-sm shadow-[#ff4d36]/50 scale-105'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {reg}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explicit 'Select Region' Dropdown */}
          <div className="flex items-center gap-2">
            <label 
              htmlFor="weather-banner-region-select" 
              className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1"
            >
              <Compass className="w-3 h-3 text-[#ff4d36]" />
              <span>Select Region:</span>
            </label>
            <div className="relative">
              <select
                id="weather-banner-region-select"
                aria-label="Select Region"
                value={selectedRegion}
                onChange={(e) => onSelectRegion(e.target.value)}
                className="bg-slate-900/90 text-xs text-white font-medium border border-slate-700 rounded-xl px-3 py-1.5 pr-7 focus:outline-none focus:border-[#ff4d36] focus:ring-1 focus:ring-[#ff4d36] cursor-pointer appearance-none hover:bg-slate-800 transition-colors"
              >
                {REGIONS_LIST.map((reg) => (
                  <option key={reg} value={reg} className="bg-slate-900 text-white">
                    {reg === 'All Regions' ? '🌐 All Regions (Global)' : reg}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Alert Body with Smooth Transition Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentAlert.id}-${selectedRegion}`}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3 items-start relative z-10"
          >
          
            {/* Left: Headline & Advisory */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-6 h-6 animate-pulse text-red-400" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#ff4d36] font-bold tracking-widest uppercase">
                    {currentAlert.category} • VALID FOR {currentAlert.validDuration}
                  </div>
                  <h3 className="font-syne font-black text-xl sm:text-2xl text-white tracking-tight mt-0.5">
                    {currentAlert.headline}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                    {currentAlert.summary}
                  </p>
                </div>
              </div>

              {/* Passes & Route Closures Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-widest block font-bold">
                    HIGH-PASS ROUTE STATUS & PERMIT RESTRICTION:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {currentAlert.affectedPasses.map((pass, i) => (
                      <span 
                        key={i} 
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          pass.includes('CLOSED') 
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {pass}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <span className="text-[10px] text-slate-500 block">UPDATED VIA SATELLITE</span>
                  <div className="flex items-center gap-2.5 justify-end mt-0.5">
                    <span className="text-emerald-400 text-xs font-bold">{currentAlert.issuedAt}</span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <button
                      id="recent-history-satellite-link"
                      onClick={() => setShowHistoryModal(true)}
                      className="text-[11px] font-mono text-[#ff4d36] hover:text-red-300 underline underline-offset-2 inline-flex items-center gap-1 font-semibold cursor-pointer"
                      title="Open 24-Hour Alert Log"
                    >
                      <History className="w-3 h-3" />
                      <span>Recent History (24h)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details Accordion */}
              {showFullAdvisory && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/30 text-xs space-y-3 animate-fadeIn">
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                      Certified Mountain Guide Briefing & Meteorologist Advisory:
                    </h5>
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      {currentAlert.detailedAdvisory}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <span className="font-mono text-slate-400 block text-[10px] uppercase">MANDATED EXPEDITION GEAR:</span>
                      <ul className="mt-1 space-y-1 text-[11px] text-slate-200">
                        {currentAlert.mandatedGear.map((gear, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{gear}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-slate-400 block text-[10px] uppercase">EMERGENCY FIELD COMMS:</span>
                      <div className="mt-1 space-y-1 font-mono text-[11px]">
                        <div className="text-amber-400">📻 {currentAlert.emergencyVhfFreq}</div>
                        <div className="text-blue-400">🛰️ {currentAlert.satelliteChannel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Telemetry Gauges & CTA */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#ff4d36]" />
                    TEMPERATURE
                  </span>
                  <span className="block text-2xl font-black font-syne text-white mt-1">
                    {currentAlert.tempC}°C
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Chill: {currentAlert.feelsLikeC}°C
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-blue-400" />
                    WIND GUSTS
                  </span>
                  <span className="block text-2xl font-black font-syne text-white mt-1">
                    {currentAlert.windGustKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Sustained {currentAlert.windSpeedKmh} km/h
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    AVALANCHE
                  </span>
                  <span className="block text-lg font-black font-syne text-amber-400 mt-1 truncate">
                    {currentAlert.avalancheRisk}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Snow: {currentAlert.snowDepthCm} cm
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    PASS TRANSIT
                  </span>
                  <span className={`block text-sm font-black font-mono mt-1 ${
                    currentAlert.passStatus === 'CLOSED' ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {currentAlert.passStatus}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Auth Required
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => onNavigateToRadar(currentAlert.stationId, currentAlert.region)}
                  className="w-full py-3 px-4 rounded-xl bg-[#ff4d36] hover:bg-red-600 text-white font-bold text-xs shadow-lg shadow-[#ff4d36]/30 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.01]"
                >
                  <Radio className="w-4 h-4 text-white animate-pulse" />
                  <span>Open High-Altitude Weather Radar</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFullAdvisory(!showFullAdvisory)}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer text-center truncate"
                  >
                    {showFullAdvisory ? 'Hide Safety Details' : 'Full Safety Protocols'}
                  </button>
                  <button
                    id="recent-history-action-button"
                    onClick={() => setShowHistoryModal(true)}
                    className="py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    title={`View ${selectedRegion} 24-hour weather alerts`}
                  >
                    <History className="w-3.5 h-3.5 text-[#ff4d36]" />
                    <span className="whitespace-nowrap">Recent History</span>
                  </button>
                  <button
                    onClick={() => onNavigatePage('emergency-sos')}
                    className="py-2 px-3 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 font-semibold text-xs border border-red-800/60 transition-colors cursor-pointer shrink-0"
                  >
                    SOS
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* 24-Hour Weather Alert History Modal */}
      <WeatherAlertHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        region={selectedRegion}
        onNavigateToRadar={onNavigateToRadar}
      />
    </div>
  );
};
