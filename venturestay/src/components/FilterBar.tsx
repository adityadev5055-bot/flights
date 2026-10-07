import React, { useState } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ShieldCheck, 
  Map as MapIcon, 
  Grid, 
  Columns2, 
  Home, 
  Compass, 
  Check, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { FilterState, ViewLayoutMode } from '../types';
import { REGIONS_LIST, PROPERTY_TYPES_LIST, AMENITIES_LIST, GUIDE_SPECIALTIES_LIST } from '../data/mockData';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  viewMode: ViewLayoutMode;
  onViewModeChange: (mode: ViewLayoutMode) => void;
  totalAccommodationsCount: number;
  totalGuidesCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalAccommodationsCount,
  totalGuidesCount
}) => {
  const [expandedFilters, setExpandedFilters] = useState(false);

  const activeFiltersCount = [
    filters.region !== 'All Regions',
    filters.propertyType !== 'All Types',
    filters.verifiedOnly,
    filters.bedrooms > 0,
    filters.guests > 1,
    filters.selectedAmenities.length > 0,
    filters.selectedSpecialties.length > 0,
    filters.priceRange[0] > 100 || filters.priceRange[1] < 600
  ].filter(Boolean).length;

  const toggleAmenity = (amenity: string) => {
    const exists = filters.selectedAmenities.includes(amenity);
    const updated = exists 
      ? filters.selectedAmenities.filter(a => a !== amenity)
      : [...filters.selectedAmenities, amenity];
    onFilterChange({ selectedAmenities: updated });
  };

  const toggleSpecialty = (spec: string) => {
    const exists = filters.selectedSpecialties.includes(spec);
    const updated = exists
      ? filters.selectedSpecialties.filter(s => s !== spec)
      : [...filters.selectedSpecialties, spec];
    onFilterChange({ selectedSpecialties: updated });
  };

  return (
    <div className="w-full bg-white/10 border-y border-white/20 sticky top-20 z-30 shadow-xs backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs: Stays vs Guides vs All */}
          <div className="flex items-center p-1 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 self-start shadow-xs">
            <button
              id="filter-cat-all"
              onClick={() => onFilterChange({ category: 'all' })}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filters.category === 'all'
                  ? 'bg-slate-900/90 backdrop-blur-md text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              All Explorer ({totalAccommodationsCount + totalGuidesCount})
            </button>
            <button
              id="filter-cat-stays"
              onClick={() => onFilterChange({ category: 'accommodations' })}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filters.category === 'accommodations'
                  ? 'bg-gradient-to-r from-[#ff4d36] to-[#ff6b4a] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Verified Stays ({totalAccommodationsCount})</span>
            </button>
            <button
              id="filter-cat-guides"
              onClick={() => onFilterChange({ category: 'guides' })}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filters.category === 'guides'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Local Guides ({totalGuidesCount})</span>
            </button>
          </div>

          {/* Quick Filter Controls & Layout Toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Quick Never Explored India Filter Button */}
            <button
              id="filter-never-explored-india-btn"
              onClick={() => {
                if (filters.region === 'Spiti & Ladakh' || filters.region === 'Meghalaya & Northeast' || filters.region === 'Western Ghats') {
                  onFilterChange({ region: 'All Regions' });
                } else {
                  onFilterChange({ region: 'Spiti & Ladakh' });
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                filters.region === 'Spiti & Ladakh' || filters.region === 'Meghalaya & Northeast' || filters.region === 'Western Ghats'
                  ? 'bg-orange-500/20 backdrop-blur-xl text-[#ff4d36] border-[#ff4d36] shadow-xs'
                  : 'bg-white/15 backdrop-blur-xl border-white/30 text-slate-800 hover:border-[#ff4d36]/60 hover:bg-orange-500/10'
              }`}
            >
              <span>🇮🇳</span>
              <span className="hidden sm:inline">Never Explored India</span>
              <span className="sm:hidden">India</span>
            </button>

            {/* Region Select */}
            <div className="relative">
              <select
                id="filter-region-select"
                value={filters.region}
                onChange={(e) => onFilterChange({ region: e.target.value })}
                className="bg-white/15 backdrop-blur-xl text-xs sm:text-sm text-slate-800 font-medium border border-white/30 rounded-xl px-3.5 py-2 pr-8 focus:outline-none focus:border-[#ff4d36] cursor-pointer appearance-none hover:bg-white/25"
              >
                {REGIONS_LIST.map((reg) => (
                  <option key={reg} value={reg} className="bg-white text-slate-900">
                    {reg}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Verified Only Toggle */}
            <button
              id="filter-verified-toggle"
              onClick={() => onFilterChange({ verifiedOnly: !filters.verifiedOnly })}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                filters.verifiedOnly
                  ? 'bg-blue-500/20 backdrop-blur-xl border-blue-600 text-blue-700 shadow-xs'
                  : 'bg-white/15 backdrop-blur-xl border-white/30 text-slate-800 hover:border-blue-400 hover:bg-blue-500/10'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${filters.verifiedOnly ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>Verified Only</span>
            </button>

            {/* Expand Deep Filters Button */}
            <button
              id="filter-more-options-btn"
              onClick={() => setExpandedFilters(!expandedFilters)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                expandedFilters || activeFiltersCount > 0
                  ? 'bg-orange-500/20 backdrop-blur-xl border-[#ff4d36] text-[#ff4d36]'
                  : 'bg-white/15 backdrop-blur-xl border-white/30 text-slate-800 hover:bg-white/25'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#ff4d36] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* View Mode Switcher (Split, Grid, Map) */}
            <div className="flex items-center bg-white/15 backdrop-blur-xl p-1 rounded-xl border border-white/30 ml-auto lg:ml-2">
              <button
                id="view-mode-split"
                title="Split View (Listings + Map)"
                onClick={() => onViewModeChange('split')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'split' ? 'bg-[#ff4d36] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns2 className="w-4 h-4" />
              </button>
              <button
                id="view-mode-grid"
                title="Grid View (Cards Only)"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#ff4d36] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                id="view-mode-map"
                title="Full Map Explorer"
                onClick={() => onViewModeChange('map')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'map' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Deep Filters Drawer */}
        {expandedFilters && (
          <div className="mt-4 pt-4 border-t border-white/25 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn text-sm">
            
            {/* Price Range Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-700">
                <span className="font-bold text-slate-900">Price Per Night / Day</span>
                <span className="font-mono font-bold text-[#ff4d36]">${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                step="25"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange({ priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
                className="w-full accent-[#ff4d36] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>$100</span>
                <span>$350</span>
                <span>$600+</span>
              </div>
            </div>

            {/* Property Type (for accommodations) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 block">Accommodation Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange({ propertyType: e.target.value })}
                className="w-full bg-white/20 backdrop-blur-xl text-xs text-slate-800 font-medium border border-white/30 rounded-xl p-2.5 focus:border-[#ff4d36]"
              >
                {PROPERTY_TYPES_LIST.map((type) => (
                  <option key={type} value={type} className="bg-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms & Guests */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 block">Min Bedrooms</label>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xl p-1 rounded-xl border border-white/30">
                  {[0, 1, 2, 3].map((b) => (
                    <button
                      key={b}
                      onClick={() => onFilterChange({ bedrooms: b })}
                      className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        filters.bedrooms === b ? 'bg-[#ff4d36] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {b === 0 ? 'Any' : `${b}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 block">Min Guests</label>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xl p-1 rounded-xl border border-white/30">
                  {[1, 2, 4, 6].map((g) => (
                    <button
                      key={g}
                      onClick={() => onFilterChange({ guests: g })}
                      className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        filters.guests === g ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {g === 1 ? 'Any' : `${g}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset & Apply */}
            <div className="flex items-end justify-between gap-3">
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-white/25 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>

              <button
                onClick={() => setExpandedFilters(false)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff4d36] to-[#ff6b4a] hover:from-[#e03820] hover:to-[#f05330] text-white text-xs font-bold transition-transform hover:scale-105 shadow-xs cursor-pointer"
              >
                Apply ({activeFiltersCount} active)
              </button>
            </div>

            {/* Amenities Chips row */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-2 pt-2 border-t border-white/25">
              <label className="text-xs font-bold text-slate-800 block">Verified Amenities & Features</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES_LIST.map((amenity) => {
                  const isSelected = filters.selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-orange-500/20 backdrop-blur-xl border-[#ff4d36] text-[#ff4d36] shadow-xs' 
                          : 'bg-white/15 backdrop-blur-xl border-white/30 text-slate-800 hover:bg-white/25 hover:border-orange-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#ff4d36]" />}
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guide Specialties if Guides enabled */}
            {(filters.category === 'all' || filters.category === 'guides') && (
              <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-2 pt-2 border-t border-white/25">
                <label className="text-xs font-bold text-slate-800 block">Local Guide Accreditations & Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {GUIDE_SPECIALTIES_LIST.map((spec) => {
                    const isSelected = filters.selectedSpecialties.includes(spec);
                    return (
                      <button
                        key={spec}
                        onClick={() => toggleSpecialty(spec)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-500/20 backdrop-blur-xl border-blue-600 text-blue-700 shadow-xs' 
                            : 'bg-white/15 backdrop-blur-xl border-white/30 text-slate-800 hover:bg-white/25 hover:border-blue-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-blue-600" />}
                        <span>{spec}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
