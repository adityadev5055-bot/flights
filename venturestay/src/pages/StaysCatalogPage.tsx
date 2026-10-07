import React, { useState } from 'react';
import { ACCOMMODATIONS } from '../data/mockData';
import { Accommodation } from '../types';
import { ListingCard } from '../components/ListingCard';
import { ThreeDCardStage } from '../components/ThreeDCardStage';
import { Filter, SlidersHorizontal, Home, Sparkles, ShieldCheck } from 'lucide-react';

interface StaysCatalogPageProps {
  onSelectStay: (stay: Accommodation) => void;
  onBookStay: (stay: Accommodation) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigatePage: (pageId: string) => void;
}

export const StaysCatalogPage: React.FC<StaysCatalogPageProps> = ({
  onSelectStay,
  onBookStay,
  favorites,
  onToggleFavorite,
  onNavigatePage
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  const filteredStays = ACCOMMODATIONS.filter(item => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (selectedRegion !== 'All' && !item.region.toLowerCase().includes(selectedRegion.toLowerCase())) return false;
    if (verifiedOnly && !item.verified) return false;
    return true;
  });

  const propertyTypes = ['all', 'Alpine Chalet', 'Eco-Lodge', 'Glass Glamping Dome', 'Cliffside Villa', 'Wilderness Cabin'];
  const regions = ['All', 'Spiti', 'Ladakh', 'Meghalaya', 'Alps', 'Patagonia', 'Fjords'];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5 text-[#ff4d36]" />
            <span>CURATED HIGH-ALTITUDE LODGES & GLACIAL DOMES</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Architectural Wilderness <span className="text-[#ff4d36]">Sanctuaries</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Each stay in our portfolio is personally audited for thermal insulation, solar heating efficiency, local culinary excellence, and unobstructed alpine panoramas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* 3D Showcase Strip */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-[#ff4d36] uppercase font-bold tracking-wider">3D INTERACTIVE CAROUSEL</span>
              <h2 className="font-syne font-bold text-xl sm:text-2xl text-slate-900">Featured Sanctuary Collection</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">Drag or click to inspect properties</span>
          </div>
          <ThreeDCardStage 
            onSelectStay={onSelectStay}
            onBookStay={onBookStay}
          />
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase font-mono mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Type:
            </span>
            {propertyTypes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors ${
                  selectedType === t ? 'bg-[#ff4d36] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 border ${
                verifiedOnly 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Stays Only</span>
            </button>
            <span className="text-xs font-mono text-slate-500">
              Showing <strong>{filteredStays.length}</strong> lodges
            </span>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStays.map(stay => (
            <ListingCard
              key={stay.id}
              item={stay}
              isSelected={false}
              isFavorite={favorites.includes(stay.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectStay}
              onBook={onBookStay}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
