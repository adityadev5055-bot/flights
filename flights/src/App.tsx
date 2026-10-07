import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FlightSearchResultsModal } from './components/FlightSearchResultsModal';
import { SearchParams } from './types';

export default function App() {
  const [currency] = useState('USD');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    tab: 'flights',
    tripType: 'round-trip',
    from: 'New York',
    fromCode: 'JFK',
    to: 'London',
    toCode: 'LHR',
    departDate: '2025-04-20',
    returnDate: '2025-04-27',
    adults: 1,
    children: 0,
    cabinClass: 'Economy',
  });

  const handleHeroSearch = (params: SearchParams) => {
    setSearchParams(params);
    setIsSearchModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 
        Only the first part: Hero Section (No header, no images, everything transparent).
      */}
      <main className="flex-1 w-full flex flex-col justify-center">
        <HeroSection
          onSearch={handleHeroSearch}
          currencySymbol="$"
        />
      </main>

      {/* Flight Search Results & Booking Modal */}
      <FlightSearchResultsModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        searchParams={searchParams}
        currencySymbol="$"
      />
    </div>
  );
}
