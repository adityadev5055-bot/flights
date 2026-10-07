export type TabType = 'flights' | 'hotels' | 'cars' | 'holidays';

export type TripType = 'round-trip' | 'one-way' | 'multi-city';

export type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';

export interface SearchParams {
  tab: TabType;
  tripType: TripType;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departDate: string;
  returnDate: string;
  adults: number;
  children: number;
  cabinClass: CabinClass;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  code: string;
  imageUrl: string;
  priceFrom: number;
  tag?: string;
  description: string;
}

export interface AirlinePartner {
  id: string;
  name: string;
  code: string;
  logoUrl?: string;
  accentColor: string;
  alliance?: string;
  rating: number;
}

export interface FlightDeal {
  id: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  dates: string;
  tripType: string;
  cabinClass: string;
  imageUrl: string;
  airline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  review: string;
  avatar: string;
  tripRoute: string;
}

export interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  price: number;
  cabinClass: CabinClass;
  baggage: string;
  features: string[];
}
