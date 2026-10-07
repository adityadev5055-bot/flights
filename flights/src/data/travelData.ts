import { Destination, AirlinePartner, FlightDeal, Testimonial, FlightResult } from '../types';

export const POPULAR_AIRPORTS = [
  { city: 'New York', code: 'JFK', name: 'John F. Kennedy Intl Airport', country: 'United States' },
  { city: 'London', code: 'LHR', name: 'Heathrow Airport', country: 'United Kingdom' },
  { city: 'New Delhi', code: 'DEL', name: 'Indira Gandhi Intl Airport', country: 'India' },
  { city: 'Mumbai', code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Intl Airport', country: 'India' },
  { city: 'Dubai', code: 'DXB', name: 'Dubai International Airport', country: 'United Arab Emirates' },
  { city: 'Bangkok', code: 'BKK', name: 'Suvarnabhumi Airport', country: 'Thailand' },
  { city: 'Paris', code: 'CDG', name: 'Charles de Gaulle Airport', country: 'France' },
  { city: 'Singapore', code: 'SIN', name: 'Singapore Changi Airport', country: 'Singapore' },
  { city: 'Tokyo', code: 'HND', name: 'Haneda Tokyo Airport', country: 'Japan' },
  { city: 'Istanbul', code: 'IST', name: 'Istanbul Grand Airport', country: 'Turkey' },
  { city: 'Frankfurt', code: 'FRA', name: 'Frankfurt Airport', country: 'Germany' },
  { city: 'Sydney', code: 'SYD', name: 'Sydney Kingsford Smith Airport', country: 'Australia' },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    code: 'DXB',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    priceFrom: 349,
    tag: 'Trending',
    description: 'Iconic modern skyscrapers, luxury desert safaris, and vibrant coastal entertainment.'
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    code: 'BKK',
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    priceFrom: 399,
    tag: 'Popular',
    description: 'Majestic Buddhist temples, world-class street food, and bustling floating markets.'
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    code: 'CDG',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    priceFrom: 420,
    tag: 'Romantic',
    description: 'The city of lights, legendary art museums, charming cafés, and haute cuisine.'
  },
  {
    id: 'new-york',
    city: 'New York',
    country: 'USA',
    code: 'JFK',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    priceFrom: 299,
    tag: 'Metropolis',
    description: 'Broadway theaters, Central Park, iconic skyline vistas, and endless energy.'
  },
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    code: 'IST',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    priceFrom: 380,
    tag: 'Historic',
    description: 'Where East meets West across the Bosphorus with grand domes and historic bazaars.'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    code: 'SIN',
    imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    priceFrom: 450,
    tag: 'Futuristic',
    description: 'Gardens by the Bay, Marina Bay architecture, and lush tropical gardens.'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    code: 'HND',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    priceFrom: 620,
    tag: 'Culture',
    description: 'Futuristic neon cityscape blended harmoniously with timeless shrines and cuisine.'
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    code: 'LHR',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    priceFrom: 489,
    tag: 'Iconic',
    description: 'Historic landmarks along the Thames, West End shows, and regal royal palaces.'
  }
];

export const AIRLINES: AirlinePartner[] = [
  {
    id: 'emirates',
    name: 'Emirates',
    code: 'EK',
    accentColor: '#D71921',
    alliance: 'Independent',
    rating: 4.8
  },
  {
    id: 'qatar',
    name: 'Qatar Airways',
    code: 'QR',
    accentColor: '#5C0632',
    alliance: 'Oneworld',
    rating: 4.9
  },
  {
    id: 'singapore-air',
    name: 'Singapore Airlines',
    code: 'SQ',
    accentColor: '#1A3B70',
    alliance: 'Star Alliance',
    rating: 4.9
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    code: 'LH',
    accentColor: '#05164D',
    alliance: 'Star Alliance',
    rating: 4.6
  },
  {
    id: 'british-airways',
    name: 'British Airways',
    code: 'BA',
    accentColor: '#075AAA',
    alliance: 'Oneworld',
    rating: 4.5
  },
  {
    id: 'air-france',
    name: 'Air France',
    code: 'AF',
    accentColor: '#002157',
    alliance: 'SkyTeam',
    rating: 4.6
  },
  {
    id: 'air-india',
    name: 'Air India',
    code: 'AI',
    accentColor: '#ED1B24',
    alliance: 'Star Alliance',
    rating: 4.5
  }
];

export const TOP_FLIGHT_DEALS: FlightDeal[] = [
  {
    id: 'deal-1',
    fromCity: 'New York',
    fromCode: 'JFK',
    toCity: 'London',
    toCode: 'LHR',
    price: 489,
    originalPrice: 699,
    discountPercent: 30,
    dates: 'Apr 20 - Apr 27',
    tripType: 'Round Trip',
    cabinClass: 'Economy',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    airline: 'British Airways'
  },
  {
    id: 'deal-2',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Bangkok',
    toCode: 'BKK',
    price: 399,
    originalPrice: 549,
    discountPercent: 25,
    dates: 'May 10 - May 18',
    tripType: 'Round Trip',
    cabinClass: 'Economy',
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
    airline: 'Emirates'
  },
  {
    id: 'deal-3',
    fromCity: 'Istanbul',
    fromCode: 'IST',
    toCity: 'Paris',
    toCode: 'CDG',
    price: 459,
    originalPrice: 620,
    discountPercent: 26,
    dates: 'May 14 - May 22',
    tripType: 'Round Trip',
    cabinClass: 'Economy',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    airline: 'Air France'
  },
  {
    id: 'deal-4',
    fromCity: 'Singapore',
    fromCode: 'SIN',
    toCity: 'Tokyo',
    toCode: 'HND',
    price: 628,
    originalPrice: 850,
    discountPercent: 26,
    dates: 'Jun 02 - Jun 10',
    tripType: 'Round Trip',
    cabinClass: 'Economy',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    airline: 'Singapore Airlines'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Johnson',
    country: 'United States',
    rating: 5,
    review: 'Booking with flights.com was so easy! I got the best price for my trip to Europe. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    tripRoute: 'New York ➔ Paris'
  },
  {
    id: 'test-2',
    name: 'David Miller',
    country: 'Canada',
    rating: 5,
    review: 'Great service and super quick support. Found an incredible deal on last-minute tickets. I will definitely book again for my next trip!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tripRoute: 'Toronto ➔ London'
  },
  {
    id: 'test-3',
    name: 'Priya Sharma',
    country: 'India',
    rating: 5,
    review: 'Amazing deals and a smooth booking experience. Flights.com made our family international vacation stress-free and very affordable!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tripRoute: 'Delhi ➔ Singapore'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 'best-price',
    title: 'Best Price Guarantee',
    description: 'We search the lowest fares across 500+ airlines, always ensuring top value.',
    icon: 'ShieldCheck',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'easy-booking',
    title: 'Easy Booking',
    description: 'Simple, fast, transparent steps with no hidden fees or unexpected charges.',
    icon: 'Zap',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    id: 'flexible',
    title: 'Flexible Options',
    description: 'Free cancellation on selected flights and zero hassle rescheduling protection.',
    icon: 'CalendarSync',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'trusted',
    title: 'Trusted by Millions',
    description: 'Join 20M+ travelers worldwide who rely on us for seamless flight reservations.',
    icon: 'Award',
    color: 'bg-indigo-50 text-indigo-600'
  }
];

export function generateFlightsForRoute(fromCode: string, fromCity: string, toCode: string, toCity: string, basePrice: number = 450): FlightResult[] {
  return [
    {
      id: 'fl-1',
      airline: 'Emirates',
      airlineCode: 'EK',
      flightNumber: 'EK-203',
      fromCode,
      fromCity,
      toCode,
      toCity,
      departureTime: '08:30 AM',
      arrivalTime: '06:45 PM',
      duration: '7h 15m',
      stops: 0,
      price: basePrice,
      cabinClass: 'Economy',
      baggage: '23kg included',
      features: ['In-flight Wi-Fi', 'Free Meal', 'USB Power', 'Entertainment']
    },
    {
      id: 'fl-2',
      airline: 'Qatar Airways',
      airlineCode: 'QR',
      flightNumber: 'QR-701',
      fromCode,
      fromCity,
      toCode,
      toCity,
      departureTime: '11:15 AM',
      arrivalTime: '09:50 PM',
      duration: '8h 35m',
      stops: 1,
      stopDetails: '1h 20m layover in Doha',
      price: Math.round(basePrice * 0.88),
      cabinClass: 'Economy',
      baggage: '25kg included',
      features: ['World-class Dining', 'Award-winning Crew', 'Spacious Seating']
    },
    {
      id: 'fl-3',
      airline: 'British Airways',
      airlineCode: 'BA',
      flightNumber: 'BA-178',
      fromCode,
      fromCity,
      toCode,
      toCity,
      departureTime: '06:40 PM',
      arrivalTime: '06:50 AM (+1)',
      duration: '7h 10m',
      stops: 0,
      price: Math.round(basePrice * 1.05),
      cabinClass: 'Economy',
      baggage: '23kg included',
      features: ['Complimentary Drinks', 'Comfort Blanket', 'On-demand movies']
    },
    {
      id: 'fl-4',
      airline: 'Singapore Airlines',
      airlineCode: 'SQ',
      flightNumber: 'SQ-321',
      fromCode,
      fromCity,
      toCode,
      toCity,
      departureTime: '02:00 PM',
      arrivalTime: '11:20 PM',
      duration: '7h 20m',
      stops: 0,
      price: Math.round(basePrice * 1.15),
      cabinClass: 'Economy',
      baggage: '30kg included',
      features: ['Gourmet Cuisine', 'KrisFlyer Wi-Fi', 'Priority Boarding Option']
    },
    {
      id: 'fl-5',
      airline: 'Lufthansa',
      airlineCode: 'LH',
      flightNumber: 'LH-401',
      fromCode,
      fromCity,
      toCode,
      toCity,
      departureTime: '09:20 PM',
      arrivalTime: '10:40 AM (+1)',
      duration: '8h 20m',
      stops: 1,
      stopDetails: '1h 10m layover in Frankfurt',
      price: Math.round(basePrice * 0.82),
      cabinClass: 'Economy',
      baggage: '23kg included',
      features: ['Ergonomic Seats', 'FlyNet Internet', 'German Hospitality']
    }
  ];
}
