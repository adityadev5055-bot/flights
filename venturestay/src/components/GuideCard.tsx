import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Languages, 
  Award, 
  Calendar, 
  Heart,
  ChevronRight,
  Compass,
  LocateFixed
} from 'lucide-react';
import { ExperienceGuide } from '../types';
import { useCard3DMovement } from '../hooks/useCard3DMovement';

interface GuideCardProps {
  guide: ExperienceGuide;
  isSelected?: boolean;
  isSaved?: boolean;
  onSelect: (guide: ExperienceGuide) => void;
  onOpenDetails: (guide: ExperienceGuide) => void;
  onToggleSave: (guideId: string) => void;
  onBookGuide: (guide: ExperienceGuide) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  isSelected = false,
  isSaved = false,
  onSelect,
  onOpenDetails,
  onToggleSave,
  onBookGuide
}) => {
  // 3D Tilt Movement on Desktop, Mobile (touch + drag), and Tablet (gyroscope + touch)
  const { rotX, rotY, isInteracting, cardMovementProps } = useCard3DMovement({
    maxTilt: 9,
    enableDeviceTilt: 6
  });

  return (
    <motion.div
      id={`guide-card-${guide.id}`}
      onClick={() => onSelect(guide)}
      {...cardMovementProps}
      whileTap={{ scale: 0.985 }}
      animate={{
        rotateX: rotX,
        rotateY: rotY,
        y: isInteracting ? -6 : 0,
        scale: isInteracting ? 1.025 : 1,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 280, damping: 22 },
        rotateY: { type: "spring", stiffness: 280, damping: 22 },
        y: { type: "spring", stiffness: 350, damping: 25 },
        scale: { type: "spring", stiffness: 350, damping: 25 },
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`group relative flex flex-col bg-white/15 backdrop-blur-2xl rounded-2xl overflow-hidden border transition-colors duration-300 cursor-pointer ${
        isSelected
          ? 'border-blue-600 shadow-[0_16px_36px_rgba(37,99,235,0.28)] ring-2 ring-blue-600 bg-white/30'
          : 'border-white/30 hover:border-blue-500 hover:bg-white/25 hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.15)]'
      }`}
    >
      {/* Cover Header with Guide Avatar */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-900/10">
        <img
          src={guide.coverImage}
          alt={guide.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-blue-800 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Certified Guide</span>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(guide.id);
          }}
          aria-label="Save guide"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xl border transition-all shadow-xs ${
            isSaved
              ? 'bg-[#ff4d36] border-[#ff4d36] text-white scale-110 shadow-md'
              : 'bg-white/30 hover:bg-white/60 border-white/40 text-slate-800 hover:text-[#ff4d36]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Floating Guide Avatar */}
        <div className="absolute -bottom-5 left-4 flex items-end gap-3">
          <div className="relative">
            <img
              src={guide.avatar}
              alt={guide.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-white/80 shadow-md bg-white/40 backdrop-blur-md"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-xs">
              <Compass className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Guide Info Body */}
      <div className="pt-7 p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1">
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate font-medium">{guide.locationName}</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{guide.rating}</span>
              <span className="text-slate-500 font-normal">({guide.reviewCount} tours)</span>
            </div>
          </div>

          {/* Guide Name & Title */}
          <h3 className="font-syne font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
            {guide.name}
          </h3>

          <p className="text-xs text-blue-600 font-semibold mb-2">
            {guide.title}
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {guide.bio}
          </p>

          {/* Accreditations & Languages */}
          <div className="space-y-1.5 py-2 border-y border-white/20 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate text-[11px] text-slate-800 font-medium">{guide.certification}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Languages className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] text-slate-800 font-medium">{guide.languages.join(', ')}</span>
            </div>
          </div>

          {/* Specialties Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {guide.specialties.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-blue-500/15 backdrop-blur-md text-blue-800 border border-blue-400/30 px-2 py-0.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Rates & Actions Footer */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-syne font-black text-sm text-blue-700 bg-blue-500/15 border border-blue-500/30 px-2.5 py-0.5 rounded-lg">
                Volunteer Guide
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Free Guidance • Community Ranger</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(guide);
              }}
              title="Focus map to coordinates"
              className={`px-2.5 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.35)]'
                  : 'bg-white/20 border-white/30 text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:bg-white/35'
              }`}
            >
              <LocateFixed className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Focus</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(guide);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:border-slate-800 text-xs font-semibold text-slate-800 hover:text-slate-950 hover:bg-white/35 transition-colors cursor-pointer"
            >
              Profile
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookGuide(guide);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              Request Guide
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
