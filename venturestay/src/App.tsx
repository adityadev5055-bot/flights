import React, { useState, useMemo, useEffect } from 'react';
import { 
  ACCOMMODATIONS, 
  EXPERIENCE_GUIDES, 
  HERO_HIGHLIGHTS 
} from './data/mockData';
import { 
  Accommodation, 
  ExperienceGuide, 
  FilterState, 
  ViewLayoutMode 
} from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { InteractiveMap, FocusTarget } from './components/InteractiveMap';
import { ListingCard } from './components/ListingCard';
import { GuideCard } from './components/GuideCard';
import { WondersOfNature } from './components/WondersOfNature';
import { ThreeDCardStage } from './components/ThreeDCardStage';
import { WhyChooseUs } from './components/WhyChooseUs';
import { VacationPerfect } from './components/VacationPerfect';
import { ExploreInteractive } from './components/ExploreInteractive';
import { ListingDetailModal } from './components/ListingDetailModal';
import { GuideDetailModal } from './components/GuideDetailModal';
import { BookingModal } from './components/BookingModal';
import { SavedFavoritesDrawer } from './components/SavedFavoritesDrawer';
import { Footer } from './components/Footer';

// Adventure & Agency Pages
import { ExpeditionsPage } from './pages/ExpeditionsPage';
import { TripBuilderPage } from './pages/TripBuilderPage';
import { WeatherRadarPage } from './pages/WeatherRadarPage';
import { GearChecklistPage } from './pages/GearChecklistPage';
import { AltitudeMedicalPage } from './pages/AltitudeMedicalPage';
import { DarkSkyPage } from './pages/DarkSkyPage';
import { WildlifeMapPage } from './pages/WildlifeMapPage';
import { PermitsPage } from './pages/PermitsPage';
import { LogisticsFleetPage } from './pages/LogisticsFleetPage';
import { EmergencySosPage } from './pages/EmergencySosPage';
import { DispatchesPage } from './pages/DispatchesPage';
import { TeamPage } from './pages/TeamPage';
import { AlpineGastronomyPage } from './pages/AlpineGastronomyPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { InsuranceBondingPage } from './pages/InsuranceBondingPage';
import { ClientReviewsPage } from './pages/ClientReviewsPage';
import { AgencyFaqPage } from './pages/AgencyFaqPage';
import { ContactDesksPage } from './pages/ContactDesksPage';
import { GuidesDirectoryPage } from './pages/GuidesDirectoryPage';
import { StaysCatalogPage } from './pages/StaysCatalogPage';
import { MapExplorerPage } from './pages/MapExplorerPage';

// Real-Time High-Altitude Weather Alert System
import { HighAltitudeWeatherBanner } from './components/HighAltitudeWeatherBanner';
import { WeatherAlertToast } from './components/WeatherAlertToast';
import { getAlertForRegion, MOUNTAIN_WEATHER_ALERTS, WeatherAlert } from './data/weatherAlertsData';

import { ShieldCheck, MapPin, Compass, Home, SlidersHorizontal, Sparkles, ArrowLeft, Layers } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  region: 'All Regions',
  propertyType: 'All Types',
  priceRange: [100, 600],
  minRating: 0,
  bedrooms: 0,
  guests: 1,
  verifiedOnly: false,
  selectedAmenities: [],
  selectedSpecialties: [],
  sortBy: 'recommended'
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState<ViewLayoutMode>('split');
  const [edition, setEdition] = useState<'india' | 'global'>('india');
  
  // Selected item on map
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [focusedTarget, setFocusedTarget] = useState<FocusTarget | null>(null);
  
  // Modals state
  const [detailStay, setDetailStay] = useState<Accommodation | null>(null);
  const [detailGuide, setDetailGuide] = useState<ExperienceGuide | null>(null);
  const [bookingItem, setBookingItem] = useState<{
    item: Accommodation | ExperienceGuide;
    type: 'stay' | 'guide';
  } | null>(null);
  
  // Saved favorites (persisted in localStorage with agency keys)
  const [savedStayIds, setSavedStayIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('venturetravel_saved_stays') || localStorage.getItem('venturestay_saved_stays');
      return stored ? JSON.parse(stored) : ['stay-1'];
    } catch {
      return ['stay-1'];
    }
  });

  const [savedGuideIds, setSavedGuideIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('venturetravel_saved_guides') || localStorage.getItem('venturestay_saved_guides');
      return stored ? JSON.parse(stored) : ['guide-1'];
    } catch {
      return ['guide-1'];
    }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('venturetravel_saved_stays', JSON.stringify(savedStayIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedStayIds]);

  useEffect(() => {
    try {
      localStorage.setItem('venturetravel_saved_guides', JSON.stringify(savedGuideIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedGuideIds]);

  const toggleSaveStay = (id: string) => {
    setSavedStayIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSaveGuide = (id: string) => {
    setSavedGuideIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Weather Radar & High-Altitude Alerts State
  const [radarRegion, setRadarRegion] = useState<string>('Spiti & Ladakh');
  const [radarStationId, setRadarStationId] = useState<string | undefined>(undefined);
  const [toastAlert, setToastAlert] = useState<WeatherAlert | null>(null);
  const [dismissedAlertRegion, setDismissedAlertRegion] = useState<string | null>(null);

  // Active Weather Alert derived from current region filter (or Spiti & Ladakh by default)
  const activeWeatherAlert = useMemo(() => {
    return getAlertForRegion(filters.region);
  }, [filters.region]);

  const handleNavigateToRadarWithAlert = (regionName: string, stationId?: string) => {
    setRadarRegion(regionName);
    if (stationId) setRadarStationId(stationId);
    setCurrentPage('weather-radar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    if (newFilters.region) {
      setRadarRegion(newFilters.region);
      const alert = getAlertForRegion(newFilters.region);
      if (alert) {
        setToastAlert(alert);
        setDismissedAlertRegion(null);
      }
    }
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Filter accommodations
  const filteredAccommodations = useMemo(() => {
    if (filters.category === 'guides') return [];

    return ACCOMMODATIONS.filter(stay => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = stay.title.toLowerCase().includes(q);
        const matchesLocation = stay.locationName.toLowerCase().includes(q) || stay.country.toLowerCase().includes(q);
        const matchesRegion = stay.region.toLowerCase().includes(q);
        const matchesType = stay.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesRegion && !matchesType) return false;
      }

      // Region
      if (filters.region !== 'All Regions' && stay.region !== filters.region) {
        return false;
      }

      // Property Type
      if (filters.propertyType !== 'All Types' && stay.type !== filters.propertyType) {
        return false;
      }

      // Price
      if (stay.pricePerNight < filters.priceRange[0] || stay.pricePerNight > filters.priceRange[1]) {
        return false;
      }

      // Verified
      if (filters.verifiedOnly && !stay.verified) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms > 0 && stay.bedrooms < filters.bedrooms) {
        return false;
      }

      // Guests
      if (filters.guests > 1 && stay.maxGuests < filters.guests) {
        return false;
      }

      // Amenities
      if (filters.selectedAmenities.length > 0) {
        const hasAll = filters.selectedAmenities.every(a => stay.amenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    });
  }, [filters]);

  // Filter guides
  const filteredGuides = useMemo(() => {
    if (filters.category === 'accommodations') return [];

    return EXPERIENCE_GUIDES.filter(guide => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = guide.name.toLowerCase().includes(q);
        const matchesLocation = guide.locationName.toLowerCase().includes(q);
        const matchesRegion = guide.region.toLowerCase().includes(q);
        const matchesSpecialty = guide.specialties.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesLocation && !matchesRegion && !matchesSpecialty) return false;
      }

      // Region
      if (filters.region !== 'All Regions' && guide.region !== filters.region) {
        return false;
      }

      // Price (Day rate)
      if (guide.dayRate < filters.priceRange[0] || guide.dayRate > filters.priceRange[1]) {
        return false;
      }

      // Verified
      if (filters.verifiedOnly && !guide.verified) {
        return false;
      }

      // Guide Specialties
      if (filters.selectedSpecialties.length > 0) {
        const hasAny = filters.selectedSpecialties.some(s => guide.specialties.includes(s));
        if (!hasAny) return false;
      }

      return true;
    });
  }, [filters]);

  const savedStaysList = useMemo(() => {
    return ACCOMMODATIONS.filter(s => savedStayIds.includes(s.id));
  }, [savedStayIds]);

  const savedGuidesList = useMemo(() => {
    return EXPERIENCE_GUIDES.filter(g => savedGuideIds.includes(g.id));
  }, [savedGuideIds]);

  const handleSelectItem = (item: Accommodation | ExperienceGuide, type: 'stay' | 'guide') => {
    setSelectedItemId(item.id);
    setFocusedTarget({
      lat: item.coordinates.lat,
      lng: item.coordinates.lng,
      zoom: 14,
      id: item.id,
      timestamp: Date.now()
    });

    // If currently in grid view, automatically switch to split view so the map is visible to the user
    if (viewMode === 'grid') {
      setViewMode('split');
    }

    // On mobile or smaller screens where the map is positioned below listings, smoothly scroll down to it
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const mapEl = document.getElementById('map-section');
        if (mapEl) {
          mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 150);
    }
  };

  const handleOpenDetails = (item: Accommodation | ExperienceGuide, type: 'stay' | 'guide') => {
    if (type === 'stay') {
      setDetailStay(item as Accommodation);
    } else {
      setDetailGuide(item as ExperienceGuide);
    }
  };

  const handleBookItem = (item: Accommodation | ExperienceGuide, type: 'stay' | 'guide') => {
    setBookingItem({ item, type });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100/90 via-sky-50/40 to-orange-50/40 text-slate-900 flex flex-col font-sans selection:bg-[#ff4d36] selection:text-white relative overflow-x-hidden">
      
      {/* Floating Ambient Color Mesh for True Optical Glassmorphism */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-gradient-to-br from-rose-500/20 via-orange-400/20 to-transparent rounded-full blur-[130px] animate-float-1" />
        <div className="absolute top-1/4 -right-32 w-[750px] h-[750px] bg-gradient-to-bl from-blue-600/20 via-indigo-400/20 to-transparent rounded-full blur-[150px] animate-float-2" />
        <div className="absolute top-2/3 -left-32 w-[700px] h-[700px] bg-gradient-to-tr from-amber-400/20 via-rose-300/15 to-transparent rounded-full blur-[140px] animate-float-3" />
        <div className="absolute -bottom-32 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-teal-400/15 via-blue-500/18 to-transparent rounded-full blur-[150px] animate-float-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-300/10 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* 1. Top Global Navigation Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        savedCount={savedStayIds.length + savedGuideIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onNavigateSection={scrollToSection}
        onOpenBookingGeneral={() => {
          setBookingItem({ item: ACCOMMODATIONS[0], type: 'stay' });
        }}
        currentPage={currentPage}
        onNavigatePage={(pageId) => {
          setCurrentPage(pageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeAlertCount={Object.keys(MOUNTAIN_WEATHER_ALERTS).length}
      />

      {/* Breadcrumb Return Bar when outside homepage */}
      {currentPage !== 'home' && (
        <div className="bg-white/20 text-slate-800 px-4 sm:px-6 lg:px-8 py-3 border-b border-white/30 flex items-center justify-between text-xs sticky top-20 z-30 backdrop-blur-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 hover:bg-[#ff4d36] text-slate-800 hover:text-white transition-all cursor-pointer font-medium border border-white/40 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Agency Dashboard</span>
            </button>
            <span className="text-slate-400">/</span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-slate-600 uppercase font-bold tracking-wider">PORTAL:</span>
              <span className="text-[#ff4d36] uppercase font-bold tracking-widest bg-[#ff4d36]/15 px-2 py-0.5 rounded border border-[#ff4d36]/30">
                {currentPage.replace('-', ' ')}
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-600 font-mono font-medium">
            <span>22 ADVENTURE & FIELD TELEMETRY MODULES</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <>

      {/* 2. Hero Section (Recreated faithfully from the user's reference mockup with Never Explored India) */}
      <HeroSection
        activeEdition={edition}
        onChangeEdition={setEdition}
        onSelectHighlight={(region) => {
          handleFilterChange({ region });
          scrollToSection('listings-section');
        }}
        onExploreMap={() => {
          setViewMode('map');
          scrollToSection('listings-section');
        }}
      />

      {/* 3. Wonders of Nature Carousel Section (Matching the user's image with Never Explored India) */}
      <WondersOfNature
        initialCollection={edition}
        onSelectWonder={(region) => {
          handleFilterChange({ region });
          scrollToSection('listings-section');
        }}
        onOpenStayDetails={(stayId) => {
          const found = ACCOMMODATIONS.find(a => a.id === stayId);
          if (found) setDetailStay(found);
        }}
      />

      {/* 4. Interactive 3D Spatial Cards Stage (Cards moving from their place in 3D space) */}
      <ThreeDCardStage
        onSelectStay={(stayId) => {
          const found = ACCOMMODATIONS.find(a => a.id === stayId);
          if (found) {
            setDetailStay(found);
          } else {
            scrollToSection('listings-section');
          }
        }}
        onExploreRegion={(region) => {
          handleFilterChange({ region });
          scrollToSection('listings-section');
        }}
      />

      {/* 5. Real Estate Listings & Integrated Map with Live Filter Options */}
      <section id="listings-section" className="w-full relative scroll-mt-20">
        
        {/* Dynamic Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalAccommodationsCount={filteredAccommodations.length}
          totalGuidesCount={filteredGuides.length}
        />

        {/* Real-Time High-Altitude Weather Warning Banner */}
        {activeWeatherAlert && dismissedAlertRegion !== filters.region && (
          <HighAltitudeWeatherBanner
            alert={activeWeatherAlert}
            selectedRegion={filters.region}
            onSelectRegion={(reg) => handleFilterChange({ region: reg })}
            onNavigateToRadar={handleNavigateToRadarWithAlert}
            onDismiss={() => setDismissedAlertRegion(filters.region)}
          />
        )}

        {/* Listings Display Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Active Search & Filter Feedback */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
                <span>
                  {filters.category === 'guides' 
                    ? 'Certified Local Experience Guides' 
                    : filters.category === 'accommodations' 
                    ? 'Verified Real Estate & Nature Stays' 
                    : 'Verified Stays & Local Experience Guides'}
                </span>
                <span className="text-xs font-mono font-bold bg-red-50 text-[#ff4d36] border border-red-200 px-2.5 py-1 rounded-full">
                  {filteredAccommodations.length + filteredGuides.length} Found
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore pinpointed wilderness accommodations and certified guides across {filters.region}
              </p>
            </div>

            {/* Quick Map Jump */}
            {viewMode !== 'map' && (
              <button
                onClick={() => setViewMode('map')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 backdrop-blur-md hover:bg-white/70 text-xs font-semibold text-blue-600 border border-white/60 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Full Map Mode</span>
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredAccommodations.length === 0 && filteredGuides.length === 0 && (
            <div className="text-center py-20 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 p-8">
              <Compass className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-syne font-bold text-lg text-slate-900">No listings match your filter criteria</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Try widening your price range, selecting "All Regions", or resetting verified filters to discover more locations.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#ff4d36] text-white font-bold text-xs hover:bg-[#e03820] shadow-sm cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* VIEW MODE 1: SPLIT SCREEN (Listings on Left, Sticky Integrated Map on Right) */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Listings */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Accommodations Subsection */}
                {filteredAccommodations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#ff4d36] mb-3">
                      <Home className="w-3.5 h-3.5" />
                      <span>Verified Accommodations & Rentals ({filteredAccommodations.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {filteredAccommodations.map(stay => (
                        <ListingCard
                          key={stay.id}
                          accommodation={stay}
                          isSelected={selectedItemId === stay.id}
                          isSaved={savedStayIds.includes(stay.id)}
                          onSelect={(item) => handleSelectItem(item, 'stay')}
                          onOpenDetails={(item) => handleOpenDetails(item, 'stay')}
                          onToggleSave={toggleSaveStay}
                          onBookNow={(item) => handleBookItem(item, 'stay')}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Guides Subsection */}
                {filteredGuides.length > 0 && (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-blue-600 mb-3">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Certified Local Experience Guides ({filteredGuides.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {filteredGuides.map(guide => (
                        <GuideCard
                          key={guide.id}
                          guide={guide}
                          isSelected={selectedItemId === guide.id}
                          isSaved={savedGuideIds.includes(guide.id)}
                          onSelect={(item) => handleSelectItem(item, 'guide')}
                          onOpenDetails={(item) => handleOpenDetails(item, 'guide')}
                          onToggleSave={toggleSaveGuide}
                          onBookGuide={(item) => handleBookItem(item, 'guide')}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Sticky Integrated Map */}
              <div id="map-section" className="lg:col-span-5 sticky top-36 h-[650px] lg:h-[calc(100vh-160px)]">
                <InteractiveMap
                  accommodations={filteredAccommodations}
                  guides={filteredGuides}
                  selectedItemId={selectedItemId}
                  focusedTarget={focusedTarget}
                  onSelectItem={handleSelectItem}
                  onOpenDetails={handleOpenDetails}
                  onClearFocus={() => setFocusedTarget(null)}
                />
              </div>

            </div>
          )}

          {/* VIEW MODE 2: GRID VIEW (Multi-column spacious cards) */}
          {viewMode === 'grid' && (
            <div className="space-y-10">
              {filteredAccommodations.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold text-[#ff4d36]">
                      <Home className="w-4 h-4" />
                      <span>Verified Accommodations ({filteredAccommodations.length})</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAccommodations.map(stay => (
                      <ListingCard
                        key={stay.id}
                        accommodation={stay}
                        isSelected={selectedItemId === stay.id}
                        isSaved={savedStayIds.includes(stay.id)}
                        onSelect={(item) => handleSelectItem(item, 'stay')}
                        onOpenDetails={(item) => handleOpenDetails(item, 'stay')}
                        onToggleSave={toggleSaveStay}
                        onBookNow={(item) => handleBookItem(item, 'stay')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredGuides.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-bold text-blue-600">
                      <Compass className="w-4 h-4" />
                      <span>Certified Local Experience Guides ({filteredGuides.length})</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGuides.map(guide => (
                      <GuideCard
                        key={guide.id}
                        guide={guide}
                        isSelected={selectedItemId === guide.id}
                        isSaved={savedGuideIds.includes(guide.id)}
                        onSelect={(item) => handleSelectItem(item, 'guide')}
                        onOpenDetails={(item) => handleOpenDetails(item, 'guide')}
                        onToggleSave={toggleSaveGuide}
                        onBookGuide={(item) => handleBookItem(item, 'guide')}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 3: FULL MAP VIEW (Immersive Map with floating bottom bar) */}
          {viewMode === 'map' && (
            <div className="relative w-full h-[78vh] rounded-3xl overflow-hidden border border-white/60 shadow-xl">
              <InteractiveMap
                accommodations={filteredAccommodations}
                guides={filteredGuides}
                selectedItemId={selectedItemId}
                focusedTarget={focusedTarget}
                onSelectItem={handleSelectItem}
                onOpenDetails={handleOpenDetails}
                onClearFocus={() => setFocusedTarget(null)}
              />

              {/* Floating bottom carousel of listings on the map */}
              <div className="absolute bottom-4 left-4 right-4 z-[400] flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {filteredAccommodations.slice(0, 6).map(stay => (
                  <div
                    key={stay.id}
                    onClick={() => {
                      handleSelectItem(stay, 'stay');
                      handleOpenDetails(stay, 'stay');
                    }}
                    className={`shrink-0 w-64 bg-white/30 backdrop-blur-2xl rounded-2xl p-3 border cursor-pointer transition-all ${
                      selectedItemId === stay.id ? 'border-[#ff4d36] scale-105 shadow-lg ring-2 ring-[#ff4d36]/30 bg-white/45' : 'border-white/50 hover:border-[#ff4d36]/50 hover:bg-white/40 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={stay.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover border border-white/40" />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#ff4d36] font-bold block">{stay.type}</span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{stay.title}</h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 mt-1">
                          <span className="font-extrabold text-slate-900">${stay.pricePerNight}/nt</span>
                          <span className="text-amber-500 font-bold">★ {stay.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. "Reason For Choosing Us" Section (From user reference image) */}
      <WhyChooseUs 
        onNavigatePage={(pageId) => {
          setCurrentPage(pageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onPlanTripClick={() => {
          setCurrentPage('trip-builder');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. "Here's makes a vacation perfect for you!" Section (From user reference image) */}
      <VacationPerfect
        onBookNow={() => {
          setBookingItem({ item: ACCOMMODATIONS[0], type: 'stay' });
        }}
        onExploreStays={() => {
          handleFilterChange({ category: 'accommodations' });
          scrollToSection('listings-section');
        }}
      />

      {/* 7. "Explore The Nature With Us" Interactive Eco Diagram (From user reference image) */}
      <ExploreInteractive
        onOpenStays={() => {
          handleFilterChange({ category: 'accommodations' });
          scrollToSection('listings-section');
        }}
        onOpenGuides={() => {
          handleFilterChange({ category: 'guides' });
          scrollToSection('listings-section');
        }}
      />
        </>
      )}

      {/* 21 Dedicated Sub-Pages Routing */}
      {currentPage === 'expeditions' && (
        <ExpeditionsPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          onBookExpedition={() => handleBookItem(ACCOMMODATIONS[0], 'stay')} 
        />
      )}

      {currentPage === 'trip-builder' && (
        <TripBuilderPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onPlanTripSubmit={() => handleBookItem(ACCOMMODATIONS[0], 'stay')}
        />
      )}

      {currentPage === 'stays' && (
        <StaysCatalogPage
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectStay={(stay) => setDetailStay(stay)}
          onBookStay={(stay) => handleBookItem(stay, 'stay')}
          favorites={savedStayIds}
          onToggleFavorite={toggleSaveStay}
        />
      )}

      {currentPage === 'guides' && (
        <GuidesDirectoryPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'map-explorer' && (
        <MapExplorerPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectStay={(stay) => setDetailStay(stay)}
          onSelectGuide={(guide) => setDetailGuide(guide)}
        />
      )}

      {currentPage === 'weather-radar' && (
        <WeatherRadarPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initialRegion={radarRegion}
          initialStationId={radarStationId}
        />
      )}

      {currentPage === 'gear-checklist' && (
        <GearChecklistPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'altitude-medicine' && (
        <AltitudeMedicalPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'dark-sky' && (
        <DarkSkyPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'wildlife-corridors' && (
        <WildlifeMapPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'permits' && (
        <PermitsPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'logistics-fleet' && (
        <LogisticsFleetPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'emergency-sos' && (
        <EmergencySosPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'dispatches' && (
        <DispatchesPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'team' && (
        <TeamPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'alpine-gastronomy' && (
        <AlpineGastronomyPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'sustainability' && (
        <SustainabilityPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'insurance-bonding' && (
        <InsuranceBondingPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'reviews' && (
        <ClientReviewsPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'faq' && (
        <AgencyFaqPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {currentPage === 'contact' && (
        <ContactDesksPage 
          onNavigatePage={(pageId) => {
            setCurrentPage(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

      {/* 8. Global Luxury Dark Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onNavigatePage={(pageId) => {
          setCurrentPage(pageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 9. Accommodation Details Modal */}
      <ListingDetailModal
        accommodation={detailStay}
        onClose={() => setDetailStay(null)}
        onBook={(stay) => handleBookItem(stay, 'stay')}
        isSaved={detailStay ? savedStayIds.includes(detailStay.id) : false}
        onToggleSave={toggleSaveStay}
      />

      {/* 10. Local Experience Guide Details Modal */}
      <GuideDetailModal
        guide={detailGuide}
        onClose={() => setDetailGuide(null)}
        onBookGuide={(guide) => handleBookItem(guide, 'guide')}
        isSaved={detailGuide ? savedGuideIds.includes(detailGuide.id) : false}
        onToggleSave={toggleSaveGuide}
      />

      {/* 11. Interactive Booking Reservation Modal */}
      <BookingModal
        item={bookingItem?.item || null}
        itemType={bookingItem?.type || 'stay'}
        onClose={() => setBookingItem(null)}
      />

      {/* 12. Saved Favorites Drawer */}
      <SavedFavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        savedStays={savedStaysList}
        savedGuides={savedGuidesList}
        onRemoveStay={toggleSaveStay}
        onRemoveGuide={toggleSaveGuide}
        onSelectStay={(stay) => {
          setDetailStay(stay);
          setSelectedItemId(stay.id);
        }}
        onSelectGuide={(guide) => {
          setDetailGuide(guide);
          setSelectedItemId(guide.id);
        }}
      />

      {/* Real-Time Mountain Weather Alert Floating Toast */}
      <WeatherAlertToast
        alert={toastAlert}
        onNavigateToRadar={handleNavigateToRadarWithAlert}
        onDismiss={() => setToastAlert(null)}
      />

    </div>
  );
}
