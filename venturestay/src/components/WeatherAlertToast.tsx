import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Radio, ChevronRight, Volume2 } from 'lucide-react';
import { WeatherAlert, getAlertsForRegion } from '../data/weatherAlertsData';

interface WeatherAlertToastProps {
  selectedRegion?: string;
  alert?: WeatherAlert | null;
  onNavigateToRadar: (regionOrStationId?: string, stationId?: string) => void;
  onDismiss?: () => void;
}

export const WeatherAlertToast: React.FC<WeatherAlertToastProps> = ({
  selectedRegion,
  alert,
  onNavigateToRadar,
  onDismiss
}) => {
  const [visible, setVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<WeatherAlert | null>(null);

  useEffect(() => {
    if (alert) {
      setCurrentAlert(alert);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, 9000);
      return () => clearTimeout(timer);
    }

    // When region changes and is a mountain region, display toast
    if (!selectedRegion || selectedRegion === 'All Regions') {
      setVisible(false);
      return;
    }

    const alerts = getAlertsForRegion(selectedRegion);
    if (alerts && alerts.length > 0) {
      setCurrentAlert(alerts[0]);
      setVisible(true);

      // Auto dismiss after 9 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [selectedRegion, alert]);

  const handleClose = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible || !currentAlert) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slideUp">
      <div className="bg-white/40 backdrop-blur-3xl border border-red-500/50 rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.15)] text-slate-900">
        
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-mono text-[11px] uppercase font-bold text-red-600 tracking-wider">
              {currentAlert.severity} HIGH-ALTITUDE ADVISORY
            </span>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-white/40 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 space-y-1">
          <div className="text-xs font-mono text-slate-600 flex items-center gap-1">
            <Radio className="w-3 h-3 text-[#ff4d36]" />
            <span>{currentAlert.stationName} • {currentAlert.altitude}</span>
          </div>
          <h4 className="font-syne font-bold text-sm text-slate-900 line-clamp-1">
            {currentAlert.headline}
          </h4>
          <p className="text-xs text-slate-600 line-clamp-2">
            {currentAlert.summary}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/30 flex items-center justify-between text-xs">
          <div className="font-mono text-[11px] text-slate-600 font-medium">
            <span className="text-[#ff4d36] font-bold">{currentAlert.tempC}°C</span>
            <span className="mx-1.5">•</span>
            <span>Gusts {currentAlert.windGustKmh}km/h</span>
          </div>

          <button
            onClick={() => {
              handleClose();
              onNavigateToRadar(currentAlert.region, currentAlert.stationId);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#ff4d36] hover:bg-red-600 text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
          >
            <span>Live Radar</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
