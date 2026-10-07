import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Languages, 
  Award, 
  Clock, 
  Users, 
  Compass, 
  Heart,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { ExperienceGuide } from '../types';

interface GuideDetailModalProps {
  guide: ExperienceGuide | null;
  onClose: () => void;
  onBookGuide: (guide: ExperienceGuide) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const GuideDetailModal: React.FC<GuideDetailModalProps> = ({
  guide,
  onClose,
  onBookGuide,
  isSaved,
  onToggleSave
}) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white/40 backdrop-blur-2xl border border-white/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] my-auto text-slate-800">
        
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleSave(guide.id)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-white/30 hover:bg-white/60 text-slate-700 border border-white/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/30 hover:bg-white/60 text-slate-700 backdrop-blur-md transition-all cursor-pointer shadow-md border border-white/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cover with Guide Badge */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900/10">
          <img
            src={guide.coverImage}
            alt={guide.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

          {/* Verification Badge */}
          <div className="absolute top-4 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-semibold backdrop-blur-md shadow-md">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Certified Regional Guide</span>
          </div>

          {/* Guide Portrait Overlay */}
          <div className="absolute -bottom-6 left-6 flex items-end gap-4">
            <img
              src={guide.avatar}
              alt={guide.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
            <div className="pb-8">
              <h2 className="font-syne font-extrabold text-2xl text-white drop-shadow-md">
                {guide.name}
              </h2>
              <p className="text-xs text-blue-200 font-medium drop-shadow-sm">
                {guide.title}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="pt-10 p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-sm">
          
          {/* Location & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/30 pb-4">
            <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{guide.locationName} ({guide.region})</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{guide.rating}</span>
              </div>
              <span className="text-slate-500 text-xs">({guide.reviewCount} verified tourist expeditions)</span>
            </div>
          </div>

          {/* Certification Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Accreditation License</span>
                <span className="text-xs font-bold text-slate-900">{guide.certification}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-3">
              <Languages className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Spoken Languages</span>
                <span className="text-xs font-bold text-slate-900">{guide.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h3 className="font-syne font-bold text-base text-slate-900">About the Guide</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {guide.bio}
            </p>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <h3 className="font-syne font-bold text-base text-slate-900">Guiding Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {guide.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-500/10 text-blue-700 border border-blue-300/30 backdrop-blur-md px-3 py-1 rounded-full font-semibold"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Tours Offered */}
          <div className="space-y-3">
            <h3 className="font-syne font-bold text-base text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Available Expeditions & Tours</span>
            </h3>

            <div className="space-y-2.5">
              {guide.popularTours.map((tour, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{tour.name}</h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>{tour.duration}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>Max {tour.groupSize} guests</span>
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold self-start sm:self-center ${
                    tour.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                    tour.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {tour.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Booking CTA */}
          <div className="p-5 rounded-2xl bg-white/25 backdrop-blur-xl border border-blue-300/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-syne font-extrabold text-2xl text-slate-900">
                  ${guide.dayRate}
                </span>
                <span className="text-xs text-slate-500">/ full day</span>
                <span className="text-xs text-slate-400 ml-2">(${guide.hourlyRate}/hr hourly)</span>
              </div>
              <span className="text-xs text-blue-700 font-medium">Includes emergency satellite locator & permits</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookGuide(guide);
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              Book Guide Service
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
