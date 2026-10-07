import React from 'react';
import { X, Heart, Trash2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Accommodation, ExperienceGuide } from '../types';

interface SavedFavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedStays: Accommodation[];
  savedGuides: ExperienceGuide[];
  onRemoveStay: (id: string) => void;
  onRemoveGuide: (id: string) => void;
  onSelectStay: (stay: Accommodation) => void;
  onSelectGuide: (guide: ExperienceGuide) => void;
}

export const SavedFavoritesDrawer: React.FC<SavedFavoritesDrawerProps> = ({
  isOpen,
  onClose,
  savedStays,
  savedGuides,
  onRemoveStay,
  onRemoveGuide,
  onSelectStay,
  onSelectGuide
}) => {
  if (!isOpen) return null;

  const totalCount = savedStays.length + savedGuides.length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white/40 backdrop-blur-2xl h-full border-l border-white/40 shadow-2xl flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="p-5 border-b border-white/30 flex items-center justify-between bg-white/20 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ff4d36] fill-[#ff4d36]" />
            <h3 className="font-syne font-bold text-lg text-slate-900">
              Saved Trips ({totalCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-white/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 text-sm">
          {totalCount === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <Heart className="w-12 h-12 stroke-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No saved items yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart icon on any verified accommodation or certified guide to save it for your journey.
              </p>
            </div>
          ) : (
            <>
              {/* Saved Stays */}
              {savedStays.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#ff4d36]">
                    Verified Accommodations ({savedStays.length})
                  </h4>
                  <div className="space-y-2.5">
                    {savedStays.map((stay) => (
                      <div
                        key={stay.id}
                        className="p-3 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center gap-3 group hover:border-[#ff4d36]/60 hover:bg-white/45 transition-all cursor-pointer shadow-xs"
                        onClick={() => {
                          onSelectStay(stay);
                          onClose();
                        }}
                      >
                        <img
                          src={stay.images[0]}
                          alt={stay.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-syne font-bold text-slate-900 text-xs truncate group-hover:text-[#ff4d36]">
                            {stay.title}
                          </h5>
                          <p className="text-[11px] text-slate-600 truncate font-medium">
                            {stay.locationName}, {stay.country}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-bold text-xs text-slate-900">${stay.pricePerNight}/night</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveStay(stay.id);
                              }}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Guides */}
              {savedGuides.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-blue-600">
                    Certified Local Guides ({savedGuides.length})
                  </h4>
                  <div className="space-y-2.5">
                    {savedGuides.map((guide) => (
                      <div
                        key={guide.id}
                        className="p-3 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center gap-3 group hover:border-blue-500 hover:bg-white/45 transition-all cursor-pointer shadow-xs"
                        onClick={() => {
                          onSelectGuide(guide);
                          onClose();
                        }}
                      >
                        <img
                          src={guide.avatar}
                          alt={guide.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-syne font-bold text-slate-900 text-xs truncate group-hover:text-blue-600">
                            {guide.name}
                          </h5>
                          <p className="text-[11px] text-slate-600 truncate font-medium">
                            {guide.locationName}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-bold text-xs text-slate-900">${guide.dayRate}/day</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveGuide(guide.id);
                              }}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {totalCount > 0 && (
          <div className="p-4 border-t border-white/30 bg-white/20 backdrop-blur-xl">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#ff4d36] hover:bg-[#e03820] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
