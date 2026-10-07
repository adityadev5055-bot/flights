export type PropertyType = 
  | 'all'
  | 'Alpine Chalet'
  | 'Eco-Lodge'
  | 'Forest Treehouse'
  | 'Glass Glamping Dome'
  | 'Cliffside Villa'
  | 'Wilderness Cabin';

export type RegionType = 
  | 'All Regions'
  | 'Spiti & Ladakh'
  | 'Meghalaya & Northeast'
  | 'Western Ghats'
  | 'Alps'
  | 'Rainforest'
  | 'Fjords'
  | 'Highlands'
  | 'Rockies'
  | 'Patagonia';

export interface HostInfo {
  name: string;
  avatar: string;
  verified: boolean;
  superhost: boolean;
  yearsHosting: number;
  responseRate: string;
}

export interface Accommodation {
  id: string;
  title: string;
  tagline: string;
  type: PropertyType;
  region: string;
  locationName: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pricePerNight: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  verified: boolean;
  verifiedNotes: string;
  images: string[];
  amenities: string[];
  description: string;
  highlights: string[];
  ecoCredentials: string[];
  host: HostInfo;
}

export interface ExperienceGuide {
  id: string;
  name: string;
  title: string;
  region: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  specialties: string[];
  languages: string[];
  hourlyRate: number;
  dayRate: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  certification: string;
  avatar: string;
  coverImage: string;
  bio: string;
  popularTours: {
    name: string;
    duration: string;
    difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
    groupSize: number;
  }[];
}

export interface FilterState {
  searchQuery: string;
  category: 'all' | 'accommodations' | 'guides';
  region: string;
  propertyType: string;
  priceRange: [number, number];
  minRating: number;
  bedrooms: number;
  guests: number;
  verifiedOnly: boolean;
  selectedAmenities: string[];
  selectedSpecialties: string[];
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc';
}

export type ViewLayoutMode = 'split' | 'grid' | 'map';

export interface BookingRequest {
  id?: string;
  itemType: 'stay' | 'guide';
  itemId: string;
  itemTitle: string;
  itemLocation: string;
  itemPrice: number;
  itemImage: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalNights: number;
  serviceFee: number;
  totalAmount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
}
