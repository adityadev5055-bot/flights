import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { animate } from 'motion/react';
import { Accommodation, ExperienceGuide } from '../types';
import { ShieldCheck, Star, ExternalLink, Compass, Home, LocateFixed, X, Plane, Globe } from 'lucide-react';
import { MapSearchBar, SearchTarget } from './MapSearchBar';

export interface FocusTarget {
  lat: number;
  lng: number;
  zoom?: number;
  id: string;
  timestamp: number;
}

interface InteractiveMapProps {
  accommodations: Accommodation[];
  guides: ExperienceGuide[];
  selectedItemId: string | null;
  focusedTarget?: FocusTarget | null;
  onSelectItem: (item: Accommodation | ExperienceGuide, type: 'stay' | 'guide') => void;
  onOpenDetails: (item: Accommodation | ExperienceGuide, type: 'stay' | 'guide') => void;
  onClearFocus?: () => void;
}

// Marker Icon Builder with Framer Motion wrapper for subtle pop-in scaling
const createStayMarkerIcon = (stay: Accommodation, isFocused: boolean, isSelected: boolean) => {
  const customHtml = `
    <div class="marker-pop-wrapper" style="transform-origin: center center; display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
      <div class="custom-map-price-marker ${isFocused ? 'active focused' : isSelected ? 'active' : ''}">
        <span style="color: ${isFocused ? '#ffffff' : '#ff4d36'}; margin-right: 2px;">$</span>${stay.pricePerNight}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: customHtml,
    iconSize: [68, 30],
    iconAnchor: [34, 15]
  });
};

const createGuideMarkerIcon = (guide: ExperienceGuide, isFocused: boolean, isSelected: boolean) => {
  const customHtml = `
    <div class="marker-pop-wrapper" style="transform-origin: center center; display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
      <div class="custom-map-guide-marker ${isFocused ? 'active' : isSelected ? 'active' : ''}">
        <span>🧭</span>
        <span>${guide.name.split(' ')[0]}</span>
        <span style="font-size: 9px; opacity: 0.85;">★${guide.rating}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: customHtml,
    iconSize: [84, 28],
    iconAnchor: [42, 14]
  });
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  accommodations,
  guides,
  selectedItemId,
  focusedTarget,
  onSelectItem,
  onOpenDetails,
  onClearFocus
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const initialFitDoneRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);
  const lastFilterPopTimeRef = useRef(0);

  // Subtle Framer Motion pop-in entry animation when the user zooms
  const triggerMarkerZoomPopIn = () => {
    // Avoid double animation if a filter change or map flight just triggered fitBounds/zoom
    if (Date.now() - lastFilterPopTimeRef.current < 450) return;

    const markers: L.Marker[] = Object.values(markersRef.current);
    markers.forEach((marker, index) => {
      const el = marker.getElement()?.querySelector<HTMLElement>('.marker-pop-wrapper');
      if (el) {
        animate(
          el,
          {
            scale: [0.82, 1.05, 1],
            opacity: [0.75, 1]
          },
          {
            duration: 0.28,
            delay: Math.min(index * 0.012, 0.16),
            ease: [0.34, 1.56, 0.64, 1]
          }
        );
      }
    });
  };

  const triggerZoomPopInRef = useRef(triggerMarkerZoomPopIn);
  triggerZoomPopInRef.current = triggerMarkerZoomPopIn;

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center or target center
    const initialCenter: [number, number] = focusedTarget 
      ? [focusedTarget.lat, focusedTarget.lng]
      : [48.0, 10.0];
    const initialZoom = focusedTarget ? (focusedTarget.zoom ?? 13) : 4;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false
    });

    // CARTO Voyager tiles (clean, light, high-contrast, beautiful for travel apps)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Register zoomend listener for subtle Framer Motion marker pop-in on zoom
    const handleZoomEnd = () => {
      requestAnimationFrame(() => {
        triggerZoomPopInRef.current();
      });
    };
    map.on('zoomend', handleZoomEnd);

    mapInstanceRef.current = map;
    setMapReady(true);

    // Handle container resizing (e.g. split view / full map toggles)
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      map.off('zoomend', handleZoomEnd);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, []);

  // Update Markers and trigger Framer Motion pop-in when accommodations or guides change (filters change)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.keys(markersRef.current).forEach((id) => {
      markersRef.current[id]?.remove();
    });
    markersRef.current = {};

    const bounds = L.latLngBounds([]);

    // Add Accommodation Markers (Price Badges)
    accommodations.forEach((stay) => {
      const isSelected = selectedItemId === stay.id;
      const isFocused = (focusedTarget && focusedTarget.id === stay.id) || isSelected;

      const icon = createStayMarkerIcon(stay, isFocused, isSelected);
      const marker = L.marker([stay.coordinates.lat, stay.coordinates.lng], { icon });

      // Popup card content
      const popupHtml = `
        <div style="width: 230px; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif;">
          <img src="${stay.images[0]}" alt="${stay.title}" style="width: 100%; height: 115px; object-fit: cover; border-top-left-radius: 14px; border-top-right-radius: 14px;" />
          <div style="padding: 12px 14px; background: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; text-transform: uppercase; color: #ff4d36; font-weight: 800; letter-spacing: 0.5px;">${stay.type}</span>
              <span style="font-size: 11px; color: #f59e0b; font-weight: 700;">★ ${stay.rating}</span>
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">
              ${stay.title}
            </div>
            <div style="font-size: 11px; color: #64748b; margin-bottom: 10px;">
              ${stay.locationName}, ${stay.country}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 10px;">
              <div>
                <span style="font-size: 15px; font-weight: 800; color: #0f172a;">$${stay.pricePerNight}</span>
                <span style="font-size: 11px; color: #64748b;">/ night</span>
              </div>
              <button id="map-popup-btn-${stay.id}" style="background: #ff4d36; color: #ffffff; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(255,77,54,0.3);">
                Details
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 250 });

      marker.on('click', () => {
        onSelectItem(stay, 'stay');
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`map-popup-btn-${stay.id}`);
        if (btn) {
          btn.onclick = () => onOpenDetails(stay, 'stay');
        }
      });

      marker.addTo(map);
      markersRef.current[stay.id] = marker;
      bounds.extend([stay.coordinates.lat, stay.coordinates.lng]);
    });

    // Add Guide Markers (Royal Blue Badges)
    guides.forEach((guide) => {
      const isSelected = selectedItemId === guide.id;
      const isFocused = (focusedTarget && focusedTarget.id === guide.id) || isSelected;

      const icon = createGuideMarkerIcon(guide, isFocused, isSelected);
      const marker = L.marker([guide.coordinates.lat, guide.coordinates.lng], { icon });

      const popupHtml = `
        <div style="width: 230px; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif;">
          <img src="${guide.coverImage}" alt="${guide.name}" style="width: 100%; height: 110px; object-fit: cover; border-top-left-radius: 14px; border-top-right-radius: 14px;" />
          <div style="padding: 12px 14px; background: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
              <span style="font-size: 10px; text-transform: uppercase; color: #2563eb; font-weight: 800;">Verified Guide</span>
              <span style="font-size: 11px; color: #f59e0b; font-weight: 700;">★ ${guide.rating}</span>
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${guide.name}
            </div>
            <div style="font-size: 11px; color: #64748b; margin-bottom: 10px;">
              ${guide.locationName}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 10px;">
              <div>
                <span style="font-size: 15px; font-weight: 800; color: #0f172a;">$${guide.dayRate}</span>
                <span style="font-size: 11px; color: #64748b;">/ day</span>
              </div>
              <button id="map-popup-guide-btn-${guide.id}" style="background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(37,99,235,0.3);">
                Profile
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 250 });

      marker.on('click', () => {
        onSelectItem(guide, 'guide');
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`map-popup-guide-btn-${guide.id}`);
        if (btn) {
          btn.onclick = () => onOpenDetails(guide, 'guide');
        }
      });

      marker.addTo(map);
      markersRef.current[guide.id] = marker;
      bounds.extend([guide.coordinates.lat, guide.coordinates.lng]);
    });

    // Subtle Framer Motion pop-in entry animation when new markers appear after filter update
    lastFilterPopTimeRef.current = Date.now();
    requestAnimationFrame(() => {
      const allMarkers: L.Marker[] = Object.values(markersRef.current);
      allMarkers.forEach((marker, index) => {
        const el = marker.getElement()?.querySelector<HTMLElement>('.marker-pop-wrapper');
        if (el) {
          animate(
            el,
            {
              scale: [0.35, 1.08, 1],
              opacity: [0, 1],
              y: [7, -1, 0]
            },
            {
              duration: 0.36,
              delay: Math.min(index * 0.02, 0.28),
              ease: [0.34, 1.56, 0.64, 1]
            }
          );
        }
      });
    });

    // Auto fit bounds only once on initial load when no focusedTarget is active
    if (!initialFitDoneRef.current && !focusedTarget && bounds.isValid() && (accommodations.length > 0 || guides.length > 0)) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      initialFitDoneRef.current = true;
    }
  }, [mapReady, accommodations, guides]);

  // Focus effect: Smoothly fly to and zoom into the specific accommodation coordinates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.invalidateSize();

    if (focusedTarget) {
      const targetZoom = focusedTarget.zoom ?? 13;
      map.flyTo([focusedTarget.lat, focusedTarget.lng], targetZoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });

      const targetMarker = markersRef.current[focusedTarget.id];
      if (targetMarker) {
        setTimeout(() => {
          if (mapInstanceRef.current) {
            targetMarker.openPopup();
          }
        }, 400);
      }
    } else if (selectedItemId) {
      const targetMarker = markersRef.current[selectedItemId];
      if (targetMarker) {
        const latLng = targetMarker.getLatLng();
        map.flyTo(latLng, 13, {
          duration: 1.4,
          easeLinearity: 0.25
        });
        setTimeout(() => {
          if (mapInstanceRef.current) {
            targetMarker.openPopup();
          }
        }, 350);
      }
    }
  }, [focusedTarget, selectedItemId]);

  // Update marker icons dynamically when focus or selection changes
  useEffect(() => {
    Object.keys(markersRef.current).forEach((id) => {
      const marker = markersRef.current[id];
      if (!marker) return;

      const stay = accommodations.find(a => a.id === id);
      if (stay) {
        const isSelected = selectedItemId === stay.id;
        const isFocused = (focusedTarget && focusedTarget.id === stay.id) || isSelected;

        marker.setIcon(createStayMarkerIcon(stay, isFocused, isSelected));

        if (isFocused || isSelected) {
          const el = marker.getElement()?.querySelector<HTMLElement>('.marker-pop-wrapper');
          if (el) {
            animate(
              el,
              {
                scale: [1, 1.25, 1.15],
                opacity: [0.85, 1]
              },
              {
                duration: 0.32,
                ease: [0.34, 1.56, 0.64, 1]
              }
            );
          }
        }
      }

      const guide = guides.find(g => g.id === id);
      if (guide) {
        const isSelected = selectedItemId === guide.id;
        const isFocused = (focusedTarget && focusedTarget.id === guide.id) || isSelected;

        marker.setIcon(createGuideMarkerIcon(guide, isFocused, isSelected));

        if (isFocused || isSelected) {
          const el = marker.getElement()?.querySelector<HTMLElement>('.marker-pop-wrapper');
          if (el) {
            animate(
              el,
              {
                scale: [1, 1.25, 1.15],
                opacity: [0.85, 1]
              },
              {
                duration: 0.32,
                ease: [0.34, 1.56, 0.64, 1]
              }
            );
          }
        }
      }
    });
  }, [selectedItemId, focusedTarget, accommodations, guides]);

  const [activeFlyTarget, setActiveFlyTarget] = useState<SearchTarget | null>(null);

  const handleFlyToDestination = (target: SearchTarget) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setActiveFlyTarget(target);

    // Clear individual stay focus when flying to a region or city
    if (onClearFocus) {
      onClearFocus();
    }

    if (target.type === 'region') {
      // Find accommodations and guides in this region to frame bounds
      const regionStays = accommodations.filter(a => a.region.toLowerCase() === target.name.toLowerCase());
      const regionGuides = guides.filter(g => g.region.toLowerCase() === target.name.toLowerCase());

      const bounds = L.latLngBounds([]);
      regionStays.forEach(a => bounds.extend([a.coordinates.lat, a.coordinates.lng]));
      regionGuides.forEach(g => bounds.extend([g.coordinates.lat, g.coordinates.lng]));

      if (bounds.isValid() && (regionStays.length > 0 || regionGuides.length > 0)) {
        map.fitBounds(bounds, {
          padding: [60, 60],
          maxZoom: target.zoom + 1
        });
      } else {
        map.flyTo([target.lat, target.lng], target.zoom, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    } else {
      // City or specific destination
      map.flyTo([target.lat, target.lng], target.zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });

      // If there is an accommodation matching this city, open its popup after flight
      const matchingStay = accommodations.find(a => 
        a.locationName.toLowerCase().includes(target.name.toLowerCase()) ||
        target.name.toLowerCase().includes(a.locationName.toLowerCase())
      );
      if (matchingStay && markersRef.current[matchingStay.id]) {
        setTimeout(() => {
          if (mapInstanceRef.current) {
            markersRef.current[matchingStay.id]?.openPopup();
          }
        }, 800);
      }
    }
  };

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    setActiveFlyTarget(null);
    const bounds = L.latLngBounds([]);
    accommodations.forEach(a => bounds.extend([a.coordinates.lat, a.coordinates.lng]));
    guides.forEach(g => bounds.extend([g.coordinates.lat, g.coordinates.lng]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
    if (onClearFocus) {
      onClearFocus();
    }
  };

  const focusedStay = accommodations.find(a => a.id === (focusedTarget?.id || selectedItemId));

  return (
    <div className="relative w-full h-full min-h-[450px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-white/60 shadow-xl bg-white/30 backdrop-blur-xl">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Search Input & Quick Fly Bar */}
      <div className="absolute top-3 right-3 left-3 sm:left-auto sm:right-4 sm:top-4 z-[420] sm:w-88 max-w-sm">
        <MapSearchBar
          accommodations={accommodations}
          guides={guides}
          activeDestination={activeFlyTarget?.name || null}
          onSelectDestination={handleFlyToDestination}
          onResetView={handleResetView}
        />
      </div>

      {/* Floating Map Legend & Control Overlay */}
      <div className="absolute top-28 sm:top-4 left-3 sm:left-4 z-[400] flex flex-col gap-2 max-w-[240px] sm:max-w-[280px]">
        
        {/* Active Region/City Flight Banner */}
        {activeFlyTarget && (
          <div className="bg-white/95 backdrop-blur-xl px-3.5 py-2.5 rounded-xl border border-[#ff4d36]/60 shadow-xl text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[#ff4d36] font-bold text-[11px] uppercase tracking-wider">
                <Plane className="w-3.5 h-3.5 animate-pulse" />
                <span>Active Region / City</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveFlyTarget(null)}
                className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
                title="Dismiss banner"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="font-syne font-bold text-slate-900 line-clamp-1 text-sm">
              {activeFlyTarget.name}
            </div>
            <div className="flex items-center justify-between pt-0.5 text-[11px] text-slate-600">
              <span className="capitalize">{activeFlyTarget.type} • {activeFlyTarget.country || activeFlyTarget.region}</span>
              {activeFlyTarget.itemCount > 0 && (
                <span className="font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                  {activeFlyTarget.itemCount} listings
                </span>
              )}
            </div>
          </div>
        )}

        {/* Active Focus Pill when an accommodation is focused */}
        {focusedStay && (
          <div className="bg-white/90 backdrop-blur-xl px-3.5 py-2.5 rounded-xl border border-[#ff4d36]/60 shadow-xl text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[#ff4d36] font-bold text-[11px] uppercase tracking-wider">
                <LocateFixed className="w-3.5 h-3.5 animate-pulse" />
                <span>Map Focused</span>
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-500">
                {focusedStay.coordinates.lat.toFixed(3)}°, {focusedStay.coordinates.lng.toFixed(3)}°
              </span>
            </div>
            <div className="font-syne font-bold text-slate-900 line-clamp-1">
              {focusedStay.title}
            </div>
            <div className="flex items-center justify-between pt-0.5 text-[11px]">
              <span className="text-slate-600 truncate">{focusedStay.locationName}</span>
              <button
                onClick={() => onOpenDetails(focusedStay, 'stay')}
                className="font-bold text-[#ff4d36] hover:underline cursor-pointer shrink-0 ml-2"
              >
                View Details →
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/75 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/60 text-xs text-slate-800 shadow-lg space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff4d36] inline-block shadow-sm" />
            <span className="font-semibold text-slate-700">Verified Stays ({accommodations.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2563eb] inline-block shadow-sm" />
            <span className="font-semibold text-slate-700">Experience Guides ({guides.length})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetView}
            className="px-3 py-1.5 bg-white/75 backdrop-blur-md hover:bg-white/90 text-xs font-bold text-[#ff4d36] rounded-lg border border-white/60 shadow transition-all cursor-pointer"
          >
            Reset View
          </button>
          {(focusedStay || activeFlyTarget) && (
            <button
              onClick={() => {
                setActiveFlyTarget(null);
                if (onClearFocus) onClearFocus();
                handleResetView();
              }}
              className="p-1.5 bg-white/75 backdrop-blur-md hover:bg-white/90 text-slate-600 hover:text-slate-900 rounded-lg border border-white/60 shadow transition-all cursor-pointer"
              title="Clear Map Focus & Reset"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Live Map Watermark / Prompt */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/60 text-[11px] text-slate-600 shadow-sm">
        <LocateFixed className="w-3 h-3 text-[#ff4d36] animate-pulse" />
        <span>Live map radar • Markers pop in on zoom & filter changes</span>
      </div>
    </div>
  );
};

