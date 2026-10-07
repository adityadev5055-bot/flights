import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  Wind, 
  Thermometer, 
  Clock, 
  CheckCircle2, 
  Compass,
  ArrowDownRight,
  Radio
} from 'lucide-react';
import { get24HourAlertHistory, HistoricalAlert } from '../data/weatherAlertsData';

interface WeatherAlertHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  region: string;
  onNavigateToRadar?: (stationId?: string, region?: string) => void;
}

export const WeatherAlertHistoryModal: React.FC<WeatherAlertHistoryModalProps> = ({
  isOpen,
  onClose,
  region,
  onNavigateToRadar
}) => {
  const historyRecords: HistoricalAlert[] = get24HourAlertHistory(region);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSeverityBadge = (severity: HistoricalAlert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border border-red-500/40';
      case 'WARNING':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
      case 'ADVISORY':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
      case 'RESOLVED':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border border-slate-600';
    }
  };

  const getStatusBadge = (status: HistoricalAlert['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            ACTIVE
          </span>
        );
      case 'DOWNGRADED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <ArrowDownRight className="w-2.5 h-2.5" />
            DOWNGRADED
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
            <Clock className="w-2.5 h-2.5" />
            EXPIRED
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            RESOLVED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="weather-alert-history-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="weather-alert-history-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="history-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl max-h-[85vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-slate-100"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[#ff4d36] shrink-0 mt-0.5">
                <History className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 id="history-modal-title" className="font-syne font-bold text-base sm:text-lg text-white">
                    Recent Weather Alert History
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300">
                    Last 24 Hours
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                  <Compass className="w-3.5 h-3.5 text-[#ff4d36]" />
                  <span>Sector: <strong className="text-slate-200">{region}</strong></span>
                  <span>•</span>
                  <span>{historyRecords.length} satellite log entries</span>
                </div>
              </div>
            </div>

            <button
              id="close-weather-history-btn"
              onClick={onClose}
              aria-label="Close alert history modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick 24h Metrics Overview Strip */}
          <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800/80 bg-slate-950/40 text-center py-2 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Recorded Events</span>
              <span className="font-bold text-white text-sm">{historyRecords.length} Records</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Peak Gust</span>
              <span className="font-bold text-amber-400 text-sm">
                {Math.max(...historyRecords.map(r => r.windGustKmh))} km/h
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Lowest Temp</span>
              <span className="font-bold text-blue-400 text-sm">
                {Math.min(...historyRecords.map(r => r.tempC))}°C
              </span>
            </div>
          </div>

          {/* Modal Scrollable Timeline Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 overscroll-contain">
            <div className="relative pl-6 sm:pl-7 border-l-2 border-slate-800 space-y-6">
              {historyRecords.map((record, index) => {
                const isLatest = index === 0;
                return (
                  <div key={record.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <div 
                      className={`absolute -left-[31px] sm:-left-[35px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        record.severity === 'CRITICAL'
                          ? 'bg-red-950 border-red-500'
                          : record.severity === 'WARNING'
                          ? 'bg-amber-950 border-amber-500'
                          : record.severity === 'RESOLVED'
                          ? 'bg-emerald-950 border-emerald-500'
                          : 'bg-blue-950 border-blue-500'
                      }`}
                    >
                      {isLatest && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      )}
                    </div>

                    {/* Timeline Entry Card */}
                    <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
                      {/* Top Header of Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-white flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {record.timeLabel}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            ({record.recordedAt})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${getSeverityBadge(record.severity)}`}>
                            {record.severity}
                          </span>
                          {getStatusBadge(record.status)}
                        </div>
                      </div>

                      {/* Headline & Category */}
                      <h4 className="font-semibold text-sm text-white mb-1 leading-snug">
                        {record.headline}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {record.summary}
                      </p>

                      {/* Telemetry Chips */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/50 text-[11px] font-mono">
                        <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                          <Thermometer className="w-3 h-3 text-[#ff4d36]" />
                          {record.tempC}°C
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                          <Wind className="w-3 h-3 text-blue-400" />
                          Gusts {record.windGustKmh} km/h
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          Pass: <strong className={record.passStatus.includes('CLOSED') ? 'text-red-400' : 'text-slate-200'}>{record.passStatus}</strong>
                        </span>
                      </div>

                      {/* Action / Mitigation Note */}
                      {record.actionTaken && (
                        <div className="mt-2.5 p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider block">Field Mitigation:</span>
                            {record.actionTaken}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3 text-xs">
            <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
              <Radio className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Telemetry synced from InReach satellite archive</span>
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {onNavigateToRadar && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToRadar(undefined, region);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Radar
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#ff4d36] hover:bg-red-600 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
