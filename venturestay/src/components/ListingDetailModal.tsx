import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  BedDouble, 
  Bath, 
  Users, 
  Check, 
  Calendar, 
  Leaf, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  ExternalLink,
  MessageCircle,
  Smartphone
} from 'lucide-react';
import { Accommodation } from '../types';

interface ListingDetailModalProps {
  accommodation: Accommodation | null;
  onClose: () => void;
  onBook: (stay: Accommodation) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  accommodation,
  onClose,
  onBook,
  isSaved,
  onToggleSave
}) => {
  if (!accommodation) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedNights, setSelectedNights] = useState(3);
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?stay=${accommodation.id}`
    : `https://venturestay.travel/stays/${accommodation.id}`;

  const shareTitle = `${accommodation.title} | VentureTravel`;
  const shareText = `Explore ${accommodation.title} in ${accommodation.locationName}, ${accommodation.country} on VentureTravel.`;

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setShareNotice('Listing link copied to clipboard!');
      setTimeout(() => setCopied(false), 2600);
      setTimeout(() => setShareNotice(null), 3200);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        setShareNotice('Shared successfully via native share!');
        setTimeout(() => setShareNotice(null), 3000);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white/40 backdrop-blur-2xl border border-white/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] my-auto text-slate-800">
        
        {/* Top Floating Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Social Media Share Button */}
          <button
            id="share-listing-top-btn"
            onClick={() => setIsShareOpen(!isShareOpen)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer border ${
              isShareOpen 
                ? 'bg-[#ff4d36] text-white border-[#ff4d36]' 
                : 'bg-white/30 hover:bg-white/60 text-slate-700 border border-white/40'
            }`}
            title="Share this listing"
            aria-label="Share listing"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleSave(accommodation.id)}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-white/30 hover:bg-white/60 text-slate-700 border border-white/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/30 hover:bg-white/60 text-slate-700 shadow-md backdrop-blur-md transition-all cursor-pointer border border-white/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Social Media Share Dropdown / Popover Modal */}
        <AnimatePresence>
          {isShareOpen && (
            <>
              <div 
                className="fixed inset-0 z-20"
                onClick={() => setIsShareOpen(false)} 
              />
              <motion.div
                id="social-share-popover"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 right-4 sm:right-6 z-30 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-5 text-white"
              >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#ff4d36]/20 border border-[#ff4d36]/30 text-[#ff4d36]">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm text-white">Share Listing</h4>
                    <span className="text-[11px] text-slate-400 font-mono">Social media & direct link</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Listing Summary Preview */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                <img
                  src={accommodation.images[0]}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="font-semibold text-xs text-white truncate">{accommodation.title}</h5>
                  <p className="text-[11px] text-slate-400 truncate">{accommodation.locationName}, {accommodation.country}</p>
                </div>
              </div>

              {/* Native Web Share Button (if supported) */}
              {hasNativeShare && (
                <div className="mt-3">
                  <button
                    id="native-web-share-btn"
                    onClick={handleNativeShare}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#ff4d36] hover:bg-red-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#ff4d36]/30"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Share via Device Apps (AirDrop, Messages, etc.)</span>
                  </button>
                </div>
              )}

              {/* Copy Link to Clipboard Bar */}
              <div className="mt-3 space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  Copy Direct Listing Link
                </label>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-transparent px-2.5 py-1 text-xs text-slate-300 font-mono focus:outline-none truncate"
                  />
                  <button
                    id="copy-listing-link-btn"
                    onClick={handleCopyLink}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      copied 
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#ff4d36]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* One-Click Social Media Platforms */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold mb-2">
                  Quick Share to Social Platforms
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 hover:text-emerald-200 transition-colors flex flex-col items-center gap-1 cursor-pointer"
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-medium">WhatsApp</span>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors flex flex-col items-center gap-1 cursor-pointer"
                    title="Share to X (Twitter)"
                  >
                    <span className="w-4 h-4 font-bold text-xs flex items-center justify-center">𝕏</span>
                    <span className="text-[10px] font-medium">X (Twitter)</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-700/50 text-blue-300 hover:text-blue-200 transition-colors flex flex-col items-center gap-1 cursor-pointer"
                    title="Share to Facebook"
                  >
                    <span className="w-4 h-4 font-bold text-xs flex items-center justify-center">fb</span>
                    <span className="text-[10px] font-medium">Facebook</span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors flex flex-col items-center gap-1 cursor-pointer"
                    title="Share via Email"
                  >
                    <Mail className="w-4 h-4 text-slate-300" />
                    <span className="text-[10px] font-medium">Email</span>
                  </a>
                </div>
              </div>

              {/* Toast Feedback */}
              {shareNotice && (
                <div className="mt-3 py-1.5 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{shareNotice}</span>
                </div>
              )}
            </motion.div>
          </>
        )}
        </AnimatePresence>

        {/* Hero Photo Gallery */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-900/10 overflow-hidden">
          <img
            src={accommodation.images[activePhotoIdx]}
            alt={accommodation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Photo Arrows */}
          {accommodation.images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-auto">
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev - 1 + accommodation.images.length) % accommodation.images.length)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev + 1) % accommodation.images.length)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Photo Thumbnail Strip */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2 z-10">
            {accommodation.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shadow-md ${
                  activePhotoIdx === idx ? 'border-[#ff4d36] scale-105' : 'border-white/60 opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Header & Verification Badge */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 text-[#ff4d36] border border-red-300/30 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-[#ff4d36]" />
                <span>Verified Inspection Passed</span>
              </div>
              <span className="text-xs bg-white/30 backdrop-blur-md text-slate-800 border border-white/40 px-3 py-1 rounded-full font-semibold">
                {accommodation.type}
              </span>
              <span className="text-xs text-slate-600">
                Region: <strong className="text-slate-900">{accommodation.region}</strong>
              </span>
            </div>

            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-slate-900">
              {accommodation.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              <div className="flex items-center gap-1 text-[#ff4d36] font-semibold">
                <MapPin className="w-4 h-4" />
                <span>{accommodation.locationName}, {accommodation.country}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{accommodation.rating} ({accommodation.reviewCount} verified reviews)</span>
              </div>
              <span>•</span>
              <button
                id="share-listing-inline-btn"
                onClick={() => setIsShareOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 hover:bg-white/70 border border-white/60 text-slate-700 hover:text-[#ff4d36] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Share this listing"
              >
                <Share2 className="w-3.5 h-3.5 text-[#ff4d36]" />
                <span>Share Listing</span>
              </button>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-center">
            <div>
              <span className="text-xs text-slate-600 block font-medium">Bedrooms</span>
              <span className="font-syne font-bold text-lg text-slate-900">{accommodation.bedrooms} Rooms</span>
            </div>
            <div className="border-x border-white/30">
              <span className="text-xs text-slate-600 block font-medium">Bathrooms</span>
              <span className="font-syne font-bold text-lg text-slate-900">{accommodation.bathrooms} Baths</span>
            </div>
            <div>
              <span className="text-xs text-slate-600 block font-medium">Max Capacity</span>
              <span className="font-syne font-bold text-lg text-slate-900">{accommodation.maxGuests} Guests</span>
            </div>
          </div>

          {/* Verified Audit Banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-300/30 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-800 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-semibold text-emerald-950">VentureTravel Agency On-Site Verification Guarantee</h4>
              <p className="text-emerald-900 leading-relaxed">
                {accommodation.verifiedNotes}
              </p>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="space-y-4">
            <h3 className="font-syne font-bold text-lg text-slate-900">About this Wilderness Retreat</h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {accommodation.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ff4d36] mb-2">Key Highlights</h4>
              <div className="space-y-1.5">
                {accommodation.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-800">
                    <Check className="w-4 h-4 text-[#ff4d36] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Eco Credentials */}
          <div className="space-y-3">
            <h3 className="font-syne font-bold text-lg text-slate-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>Certified Eco-Credentials</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {accommodation.ecoCredentials.map((eco, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-500/10 backdrop-blur-md border border-emerald-300/30 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>{eco}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h3 className="font-syne font-bold text-lg text-slate-900">Included Amenities & Comforts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-800">
              {accommodation.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                  <Check className="w-3.5 h-3.5 text-[#ff4d36] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Profile */}
          <div className="p-5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={accommodation.host.avatar}
                alt={accommodation.host.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#ff4d36]"
              />
              <div>
                <h4 className="font-syne font-bold text-slate-900 text-base flex items-center gap-1.5">
                  <span>Hosted by {accommodation.host.name}</span>
                  {accommodation.host.superhost && (
                    <span className="text-[10px] bg-red-100/70 text-[#ff4d36] border border-red-200/50 px-2 py-0.5 rounded-full font-bold">
                      Superhost
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {accommodation.host.yearsHosting} years hosting • Responds {accommodation.host.responseRate}
                </p>
              </div>
            </div>
          </div>

          {/* Non-Monetary Wilderness Permit & Reservation Box */}
          <div className="p-5 rounded-2xl bg-white/25 backdrop-blur-xl border border-emerald-300/50 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-syne font-extrabold text-2xl text-emerald-800 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-xl">
                    Free Sanctuary Access
                  </span>
                </div>
                <span className="text-xs text-emerald-700 font-semibold block mt-1">Zero Cost • Wilderness Permit Required</span>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-1">Nights</label>
                  <select
                    value={selectedNights}
                    onChange={(e) => setSelectedNights(Number(e.target.value))}
                    className="bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 focus:border-[#ff4d36]"
                  >
                    {[1, 2, 3, 5, 7, 10, 14].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Night' : 'Nights'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-1">Guests</label>
                  <select
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(Number(e.target.value))}
                    className="bg-white/30 backdrop-blur-md border border-white/40 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 focus:border-[#ff4d36]"
                  >
                    {Array.from({ length: accommodation.maxGuests }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={g}>{g} {g === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Non-monetary registration breakdown */}
            <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-white/30">
              <div className="flex justify-between">
                <span>Duration & Occupancy:</span>
                <span className="font-semibold text-slate-900">{selectedNights} Nights • {selectedGuests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span>Wilderness Ranger Permit & Satellite Registration:</span>
                <span className="font-semibold text-emerald-700">Included ($0.00)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-white/30">
                <span>Total Due</span>
                <span className="text-emerald-700 font-syne text-base font-extrabold">$0.00 (100% Free Access)</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBook(accommodation);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm tracking-wide shadow-md transition-transform hover:scale-[1.01] cursor-pointer"
            >
              Request Free Wilderness Permit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
