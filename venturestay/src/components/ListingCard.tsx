import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  Star, 
  MapPin, 
  BedDouble, 
  Users, 
  Bath, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  LocateFixed
} from 'lucide-react';
import { Accommodation } from '../types';
import { useCard3DMovement } from '../hooks/useCard3DMovement';

interface ListingCardProps {
  accommodation: Accommodation;
  isSelected?: boolean;
  isSaved?: boolean;
  onSelect: (stay: Accommodation) => void;
  onOpenDetails: (stay: Accommodation) => void;
  onToggleSave: (stayId: string) => void;
  onBookNow: (stay: Accommodation) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  accommodation,
  isSelected = false,
  isSaved = false,
  onSelect,
  onOpenDetails,
  onToggleSave,
  onBookNow
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // 3D Tilt Movement on Desktop, Mobile (touch + drag), and Tablet (gyroscope + touch)
  const { rotX, rotY, isInteracting, cardMovementProps } = useCard3DMovement({
    maxTilt: 9,
    enableDeviceTilt: 6
  });

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % accommodation.images.length);
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + accommodation.images.length) % accommodation.images.length);
  };

  // Touch swipe support for photo carousel on mobile and tablet
  const touchCarouselStartX = useRef<number | null>(null);
  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchCarouselStartX.current = e.touches[0].clientX;
    }
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    if (touchCarouselStartX.current !== null && e.changedTouches.length > 0) {
      const diffX = e.changedTouches[0].clientX - touchCarouselStartX.current;
      if (diffX > 35) {
        // Swiped right -> previous photo
        prevImage();
      } else if (diffX < -35) {
        // Swiped left -> next photo
        nextImage();
      }
      touchCarouselStartX.current = null;
    }
  };

  return (
    <motion.div
      id={`listing-card-${accommodation.id}`}
      onClick={() => onSelect(accommodation)}
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
          ? 'border-[#ff4d36] shadow-[0_16px_36px_rgba(255,77,54,0.28)] ring-2 ring-[#ff4d36] bg-white/30'
          : 'border-white/30 hover:border-[#ff4d36]/70 hover:bg-white/25 hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.15)]'
      }`}
    >
      {/* Image Carousel Container */}
      <div 
        onTouchStart={handleCarouselTouchStart}
        onTouchEnd={handleCarouselTouchEnd}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900/10"
      >
        <img
          src={accommodation.images[currentImageIdx]}
          alt={accommodation.title}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ${
            isInteracting ? 'scale-105' : 'scale-100 group-hover:scale-105'
          }`}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Carousel Arrow Controls (Visible on hover and when touched/interacted on mobile/tablet) */}
        {accommodation.images.length > 1 && (
          <div className={`absolute inset-0 flex items-center justify-between p-2 transition-opacity ${
            isInteracting ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 active:scale-95 text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-md border border-white/40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="w-8 h-8 rounded-full bg-white/50 hover:bg-white/80 active:scale-95 text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-md border border-white/40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Badges: Verified & Category */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {accommodation.verified && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-blue-800 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Stay</span>
            </div>
          )}
          <span className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 text-[11px] font-semibold text-white uppercase tracking-wide">
            {accommodation.type}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(accommodation.id);
          }}
          aria-label="Save stay"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xl border transition-all shadow-xs ${
            isSaved
              ? 'bg-[#ff4d36] border-[#ff4d36] text-white scale-110 shadow-md'
              : 'bg-white/30 hover:bg-white/60 border-white/40 text-slate-800 hover:text-[#ff4d36]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Image Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {accommodation.images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                currentImageIdx === idx ? 'w-4 bg-[#ff4d36]' : 'w-1.5 bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating with Focus Trigger */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[#ff4d36] shrink-0" />
              <span className="truncate font-medium text-slate-700">{accommodation.locationName}, {accommodation.country}</span>
              <span className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-all shrink-0 ${
                isSelected 
                  ? 'bg-[#ff4d36] text-white shadow-xs' 
                  : 'bg-[#ff4d36]/10 text-[#ff4d36] border border-[#ff4d36]/25'
              }`}>
                <LocateFixed className="w-2.5 h-2.5" />
                <span>{isSelected ? 'Focused' : 'Focus'}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-bold text-slate-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{accommodation.rating}</span>
              <span className="text-slate-500 font-normal">({accommodation.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-syne font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#ff4d36] transition-colors line-clamp-1 mb-1">
            {accommodation.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {accommodation.tagline}
          </p>

          {/* Specs: Bed / Bath / Guests */}
          <div className="flex items-center gap-3 text-xs text-slate-600 py-2 border-y border-white/20 font-medium">
            <div className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-slate-500" />
              <span>{accommodation.bedrooms} Beds</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-500" />
              <span>{accommodation.bathrooms} Baths</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Up to {accommodation.maxGuests}</span>
            </div>
          </div>

          {/* Quick Highlight Amenity Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {accommodation.amenities.slice(0, 2).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white/20 backdrop-blur-md text-slate-800 px-2 py-0.5 rounded-md border border-white/30 font-medium"
              >
                {amenity}
              </span>
            ))}
            {accommodation.amenities.length > 2 && (
              <span className="text-[11px] text-[#ff4d36] font-semibold px-1 py-0.5">
                +{accommodation.amenities.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-syne font-black text-sm text-emerald-700 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                Free Sanctuary
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Zero Cost • Open Access Permit</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(accommodation);
              }}
              title="Focus map to coordinates"
              className={`px-2.5 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                isSelected
                  ? 'bg-[#ff4d36] text-white border-[#ff4d36] shadow-[0_0_12px_rgba(255,77,54,0.35)]'
                  : 'bg-white/20 border-white/30 text-slate-700 hover:text-[#ff4d36] hover:border-[#ff4d36]/50 hover:bg-white/35'
              }`}
            >
              <LocateFixed className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Focus</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(accommodation);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:border-blue-600 text-xs font-semibold text-slate-800 hover:text-blue-600 hover:bg-white/35 transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookNow(accommodation);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff4d36] to-[#ff6b4a] hover:from-[#e03820] hover:to-[#f05330] text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              Reserve Slot
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
