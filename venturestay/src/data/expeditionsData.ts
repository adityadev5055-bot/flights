export interface ExpeditionDay {
  day: number;
  title: string;
  altitude: string;
  distance: string;
  ascent: string;
  descent: string;
  highlights: string[];
  description: string;
  accommodation: string;
}

export interface Expedition {
  id: string;
  title: string;
  tagline: string;
  region: string;
  country: string;
  durationDays: number;
  maxAltitude: string;
  difficulty: 'Moderate' | 'Challenging' | 'Extreme Alpine';
  groupSize: string;
  pricePerPerson: number;
  coverImage: string;
  gallery: string[];
  overview: string;
  bestMonths: string[];
  elevationProfile: { day: string; elevationMeters: number }[];
  included: string[];
  requiredGear: string[];
  itinerary: ExpeditionDay[];
}

export const SIGNATURE_EXPEDITIONS: Expedition[] = [
  {
    id: 'exp-1',
    title: 'The Frozen Zanskar Chadar & Ice Gorge Odyssey',
    tagline: 'Navigate the frozen, emerald-blue Zanskar River gorge between sheer 1,000-meter cliffs in sub-zero winter isolation.',
    region: 'Spiti & Ladakh',
    country: 'India',
    durationDays: 9,
    maxAltitude: '3,850m / 12,630ft',
    difficulty: 'Extreme Alpine',
    groupSize: '4 - 8 Climbers',
    pricePerPerson: 2850,
    coverImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The Chadar trek is one of the planet’s most singular winter mountaineering adventures. For just four weeks each January and February, the torrential Zanskar River freezes into a gleaming highway of translucent ice. Led by veteran Zanskari winter masters and certified high-altitude medics, this expedition combines extreme cold survival with ancient Buddhist monastery hospitality.',
    bestMonths: ['January', 'February'],
    elevationProfile: [
      { day: 'Day 1', elevationMeters: 3500 },
      { day: 'Day 2', elevationMeters: 3500 },
      { day: 'Day 3', elevationMeters: 3150 },
      { day: 'Day 4', elevationMeters: 3280 },
      { day: 'Day 5', elevationMeters: 3450 },
      { day: 'Day 6', elevationMeters: 3600 },
      { day: 'Day 7', elevationMeters: 3850 },
      { day: 'Day 8', elevationMeters: 3500 },
      { day: 'Day 9', elevationMeters: 3500 }
    ],
    included: [
      'Private 4x4 heated transport Leh to Chilling trailhead',
      'IFMGA certified winter expedition leader & 1:2 guide ratio',
      'Mountain Hardwear 4-season alpine double-wall tents',
      '-30°C certified goose down sleeping bags & insulated neo-air pads',
      'All meals freshly prepared by winter field chef with hot soups & hydration',
      'Gamow hyperbaric chamber, pulse oximeters, and medical oxygen on sleds',
      'Wildlife conservation permits & Ladakh Wildlife Dept permits'
    ],
    requiredGear: [
      'Kahtoola microspikes / flexible crampons',
      'Gore-Tex Pro waterproof shell jacket & salopettes',
      'Insulated 800+ fill down mountaineering parka',
      'Double mountaineering winter boots (rated to -30°C)',
      'Neoprene gumboots for temporary ice slush crossings'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Leh & Medical Acclimatization Protocol',
        altitude: '3,500m',
        distance: '0 km',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['Leh Palace orientation', 'Mandatory resting protocol', 'Blood oxygen & pulse baseline check'],
        description: 'Land at Kushok Bakula Rimpochee Airport and transfer to your heated heritage hotel. Day dedicated to complete resting and hydration under medical monitoring.',
        accommodation: 'Grand Dragon Heated Heritage Suite'
      },
      {
        day: 2,
        title: 'Shanti Stupa Acclimatization Walk & Gear Inspection',
        altitude: '3,500m - 3,680m',
        distance: '4 km',
        ascent: '+180m',
        descent: '-180m',
        highlights: ['Panoramic views of Stok Kangri range', 'Individual layer fitting', 'Satellite comms check'],
        description: 'A gentle uphill walk to Shanti Stupa in the crisp morning air tests lung capacity. Afternoon gear inspection with lead guide Kalsang Tashi.',
        accommodation: 'Grand Dragon Heated Heritage Suite'
      },
      {
        day: 3,
        title: 'Drive Leh to Chilling & Step onto the Frozen River at Tilat Sumdo',
        altitude: '3,150m',
        distance: '8 km on ice',
        ascent: '+50m',
        descent: '-300m',
        highlights: ['Confluence of Indus and Zanskar rivers', 'First footsteps on solid sheet ice', 'Alpine campfire dinner'],
        description: 'Descend through the granite gorge to Chilling. Strap on ice microspikes and step onto the frozen glass of the Chadar.',
        accommodation: 'Heated Alpine Basecamp (Double Expedition Tents)'
      },
      {
        day: 4,
        title: 'Tilat Sumdo to Shingra Koma Gorge',
        altitude: '3,280m',
        distance: '10 km',
        ascent: '+130m',
        descent: '-0m',
        highlights: ['Sheer 800m rock walls', 'Turquoise ice caves', 'Hot butter tea trail break'],
        description: 'Trek along dramatic river bends where deep turquoise currents rush beneath transparent ice sheets. Camp inside a natural river cavern.',
        accommodation: 'Cavern River Camp'
      },
      {
        day: 5,
        title: 'Shingra Koma to Tibb Cave with Frozen Cascades',
        altitude: '3,450m',
        distance: '15 km',
        ascent: '+170m',
        descent: '-0m',
        highlights: ['Massive hanging frozen waterfalls', 'Golden eagle sightings', 'Sled-pulled supply train'],
        description: 'The canyon tightens. Towering frozen waterfalls cascade down dark rock walls like frozen cathedral pipes.',
        accommodation: 'Tibb Geological Cave Bivouac'
      },
      {
        day: 6,
        title: 'Tibb to Naerak & The Great Frozen Waterfall',
        altitude: '3,600m',
        distance: '12 km',
        ascent: '+150m',
        descent: '-0m',
        highlights: ['56-meter frozen Naerak waterfall', 'Ancient juniper incense ceremony', 'Zanskari village visit'],
        description: 'Arrive at the legendary Naerak frozen waterfall, a 56-meter pillar of crystalline azure ice. Meet local villagers.',
        accommodation: 'Naerak Traditional Wood-Heated Homestay'
      },
      {
        day: 7,
        title: 'Naerak High Ridge Scramble & Return to Tibb',
        altitude: '3,850m',
        distance: '14 km',
        ascent: '+250m',
        descent: '-250m',
        highlights: ['Chadar high vantage point', 'Snow leopard trail sign tracking', 'Starry Milky Way sky'],
        description: 'Hike to the ancient bridge lookout before beginning the rapid return along newly shifted ice formations.',
        accommodation: 'Tibb Basecamp'
      },
      {
        day: 8,
        title: 'Tibb to Chilling Trailhead & Private 4x4 Return to Leh',
        altitude: '3,500m',
        distance: '18 km on ice',
        ascent: '+50m',
        descent: '-200m',
        highlights: ['Final ice crossing', 'Hot shower & celebratory banquet in Leh', 'Expedition certificate awards'],
        description: 'Complete the ice trek back to Chilling where warm heated 4x4 Land Cruisers meet the team.',
        accommodation: 'Grand Dragon Heated Heritage Suite'
      },
      {
        day: 9,
        title: 'Himalayan Sunrise & Departure Flight',
        altitude: '3,500m',
        distance: 'Airport transfer',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['Stunning aerial views of Karakoram Range'],
        description: 'Private airport transfer for departure flight over the snow-capped Great Himalayas.',
        accommodation: 'Departure'
      }
    ]
  },
  {
    id: 'exp-2',
    title: 'Patagonia Southern Icefield & Granite Towers Circuit',
    tagline: 'A luxury wilderness traverse across Torres del Paine, Grey Glacier ice tunnels, and private estancia pampas.',
    region: 'Patagonia',
    country: 'Chile',
    durationDays: 8,
    maxAltitude: '1,200m / 3,937ft',
    difficulty: 'Challenging',
    groupSize: '4 - 10 Climbers',
    pricePerPerson: 3450,
    coverImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Experience the raw grandeur of Chilean Patagonia in unrivaled style. Hike beneath the sheer granite monoliths of Las Torres, traverse the hanging suspension bridges of French Valley, and strap on crampons to explore cobalt crevasses of Glacier Grey with UIAGM guides.',
    bestMonths: ['November', 'December', 'January', 'February', 'March'],
    elevationProfile: [
      { day: 'Day 1', elevationMeters: 100 },
      { day: 'Day 2', elevationMeters: 900 },
      { day: 'Day 3', elevationMeters: 450 },
      { day: 'Day 4', elevationMeters: 800 },
      { day: 'Day 5', elevationMeters: 300 },
      { day: 'Day 6', elevationMeters: 600 },
      { day: 'Day 7', elevationMeters: 200 },
      { day: 'Day 8', elevationMeters: 50 }
    ],
    included: [
      'Private helicopter transfers from Punta Arenas to Torres del Paine',
      'Luxury geodesic dome accommodation with private wood stoves',
      'CONAF national park permits and private catamaran charters',
      'Certified UIAGM mountain guide & local puma tracker on private retainer',
      'Gourmet Patagonian lamb asado and fine Chilean reserve wines',
      'Technical glacier climbing equipment (crampons, harnesses, ice axes)'
    ],
    requiredGear: [
      'Windproof hardshell jacket (rated to 100 km/h Patagonian gusts)',
      'Sturdy waterproof trekking boots with ankle support',
      'Trekking poles with rubber & mud baskets',
      'UV400 polarized mountain sunglasses & high SPF alpine balm'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Helicopter Transfer Punta Arenas to Torres del Paine',
        altitude: '100m',
        distance: 'Transfer',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['Strait of Magellan aerial views', 'Arrival at luxury eco-domes', 'Gaucho fireside welcome'],
        description: 'Board our private chartered helicopter across the sweeping pampas. Touch down directly at your luxury geothermal dome camp.',
        accommodation: 'EcoCamp Patagonia Geodesic Suite'
      },
      {
        day: 2,
        title: 'Base of the Towers (Mirador Las Torres) Alpine Ascent',
        altitude: '900m',
        distance: '22 km',
        ascent: '+850m',
        descent: '-850m',
        highlights: ['Ascent through ancient Lenga beech forest', 'Iconic three granite towers view', 'Glacial moraine lake'],
        description: 'Trek up the Ascencio Valley, crossing glacial streams and climbing the giant boulder moraine to the turquoise tarn beneath the three towers.',
        accommodation: 'EcoCamp Patagonia Geodesic Suite'
      },
      {
        day: 3,
        title: 'Lake Nordenskjöld Trail & Los Cuernos Horns',
        altitude: '450m',
        distance: '13 km',
        ascent: '+350m',
        descent: '-350m',
        highlights: ['Vibrant turquoise waters of Nordenskjöld', 'Hanging glaciers of Mount Almirante Nieto', 'Wild condor flybys'],
        description: 'Traverse the shores of Lake Nordenskjöld, taking in the contrasting black shale and pink granite of Los Cuernos.',
        accommodation: 'Refugio Cuernos Private Cabin'
      },
      {
        day: 4,
        title: 'French Valley Natural Amphitheatre Trek',
        altitude: '800m',
        distance: '16 km',
        ascent: '+600m',
        descent: '-600m',
        highlights: ['Roaring avalanches on Mount Paine Grande', 'Spire amphitheatre views', 'Catamaran crossing of Lake Pehoe'],
        description: 'Hike deep into the heart of the massif, surrounded by towering vertical rock amphitheaters and listening to cascading seracs.',
        accommodation: 'Lodge Paine Grande Lakefront Suite'
      },
      {
        day: 5,
        title: 'Grey Glacier Icefield & Cobalt Crevasse Exploration',
        altitude: '300m',
        distance: '11 km',
        ascent: '+250m',
        descent: '-150m',
        highlights: ['Suspension bridges over 50m canyons', 'Crampon walk on Glacier Grey blue ice', 'Floating iceberg navigation'],
        description: 'Hike above Lake Grey to the edge of the Southern Icefield. Strap on crampons and venture into shimmering sapphire ice caves.',
        accommodation: 'Glacier Grey Wilderness Retreat'
      },
      {
        day: 6,
        title: 'Private Catamaran Navigation & Estancia Puma Safari',
        altitude: '600m',
        distance: '10 km',
        ascent: '+200m',
        descent: '-200m',
        highlights: ['Catamaran cruise among icebergs', 'Private estate puma tracking with spotting scopes', 'Gaucho barbecue'],
        description: 'Board our private charter boat past calving glacier walls, followed by an evening wildlife safari tracking pumas and guanacos.',
        accommodation: 'Tierra Patagonia Luxury Lodge'
      },
      {
        day: 7,
        title: 'Sierra Baguales Desert Fossils & Secret Lagoon Drift',
        altitude: '200m',
        distance: '8 km',
        ascent: '+150m',
        descent: '-150m',
        highlights: ['Petrified wood forest & dinosaur fossils', 'Remote boundary with Argentina', 'Farewell gala dinner'],
        description: 'Explore the secluded moonscape of Sierra Baguales, discovering 50-million-year-old marine fossils in wild canyons.',
        accommodation: 'Tierra Patagonia Luxury Lodge'
      },
      {
        day: 8,
        title: 'Scenic Flight to Punta Arenas & Departure',
        altitude: '50m',
        distance: 'Flight transfer',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['Aerial panorama of the Southern Patagonian Icefield'],
        description: 'Scenic aerial transfer over the Patagonian fjords to connect with onward international flights.',
        accommodation: 'Departure'
      }
    ]
  },
  {
    id: 'exp-3',
    title: 'Spiti Valley High Altitude Fossil & Monastery Trail',
    tagline: 'Traverse ancient 1,000-year-old cliffside Buddhist monasteries, marine fossil plateaus at 14,500ft, and snow leopard sanctuaries.',
    region: 'Spiti & Ladakh',
    country: 'India',
    durationDays: 7,
    maxAltitude: '4,590m / 15,060ft',
    difficulty: 'Challenging',
    groupSize: '4 - 8 Climbers',
    pricePerPerson: 2200,
    coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Enter the "Middle Land" between India and Tibet. Spiti is an arid high-altitude desert surrounded by 6,000m peaks, fortified Tibetan monasteries built into mud cliffs, and villages where villagers find 200-million-year-old Tethys Ocean ammonites in their backyard fields.',
    bestMonths: ['May', 'June', 'July', 'August', 'September', 'October'],
    elevationProfile: [
      { day: 'Day 1', elevationMeters: 2000 },
      { day: 'Day 2', elevationMeters: 3100 },
      { day: 'Day 3', elevationMeters: 3800 },
      { day: 'Day 4', elevationMeters: 4400 },
      { day: 'Day 5', elevationMeters: 4590 },
      { day: 'Day 6', elevationMeters: 4250 },
      { day: 'Day 7', elevationMeters: 2050 }
    ],
    included: [
      'Customized 4x4 overland Toyota Land Cruisers with altitude oxygen',
      'Lead Spitian mountaineer Tenzin Norbu & cultural lama historian',
      'Special inner-line permits & high-altitude wildlife conservation passes',
      'Stays in solar-heated boutique mud-brick lodges with private heated floors',
      'Organic Himalayan valley dining, fresh sea buckthorn teas, and artisan breads',
      'High-resolution telescope session with astrophotographer in Bortle-1 dark sky'
    ],
    requiredGear: [
      'Warm down jacket with hood (comfort rating -10°C)',
      'UV Category 4 polarized glacier glasses',
      'Insulated reusable thermos (1.5L capacity)',
      'Lip and skin moisturizers for dry desert air'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Manali to Kalpa / Shimla Heritage Gateway',
        altitude: '2,000m',
        distance: 'Drive',
        ascent: '+500m',
        descent: '-0m',
        highlights: ['Apple orchards of Kinnaur', 'Kinner Kailash peak panorama'],
        description: 'Begin the journey winding along the roaring Sutlej River gorge to Kinnaur.',
        accommodation: 'The Himalayan Heritage Lodge'
      },
      {
        day: 2,
        title: 'Ascend into Spiti: Nako Sacred Lake & Tabo Monastery',
        altitude: '3,100m - 3,280m',
        distance: 'Drive & 4km walk',
        ascent: '+1100m',
        descent: '-0m',
        highlights: ['996 AD Tabo Monastery murals', 'Sacred Nako glacial tarn', 'Wind prayer flags'],
        description: 'Cross the dramatic boundary where alpine forests yield to bare Tibetan moonscape. Explore Tabo, known as the "Ajanta of the Himalayas".',
        accommodation: 'Tabo Monastery Eco Lodge'
      },
      {
        day: 3,
        title: 'Dhankar Fortified Cliff Monastery & High Mountain Lake Trek',
        altitude: '3,800m',
        distance: '6 km trek',
        ascent: '+450m',
        descent: '-450m',
        highlights: ['Balcony monastery perched over 300m drop', 'Dhankar Lake alpine reflection', 'Spiti River confluence'],
        description: 'Trek up to the ancient capital of Spiti. Visit the meditation caves of Dalai Lama and hike to the hidden turquoise lake of Dhankar.',
        accommodation: 'Kaza High-Altitude Mud Villa'
      },
      {
        day: 4,
        title: 'Key Monastery & High-Altitude Fossil Plateau of Langza',
        altitude: '4,400m',
        distance: '8 km walk',
        ascent: '+600m',
        descent: '-0m',
        highlights: ['1,000-year-old Key Gompa monastic library', 'Giant golden Buddha facing Chau Chau Kang Nilda', 'Finding marine ammonites'],
        description: 'Receive morning tea with monk elders at Key Monastery. Ascend to Langza to hunt for prehistoric marine fossils embedded in limestone.',
        accommodation: 'Langza Stargazing Mud Lodge'
      },
      {
        day: 5,
        title: 'Kibber Wildlife Sanctuary & Chicham Suspension Bridge',
        altitude: '4,590m',
        distance: '10 km trek',
        ascent: '+200m',
        descent: '-200m',
        highlights: ['Highest suspension bridge in Asia at 13,596ft', 'Snow leopard and blue sheep habitat search', 'Bortle 1 Milky Way night shoot'],
        description: 'Walk across the breathtaking Chicham gorge bridge spanning a 150-meter abyss. Track blue sheep herds with high-magnification Swarovski spotting scopes.',
        accommodation: 'Kibber Wildlife Sanctuary Lodge'
      },
      {
        day: 6,
        title: 'Chandratal "Moon Lake" High Alpine Camp',
        altitude: '4,250m',
        distance: '12 km trek',
        ascent: '+300m',
        descent: '-500m',
        highlights: ['Crescent-shaped emerald glacial lake', 'Crossing Kunzum La Pass at 15,060ft', 'Gourmet alpine hearth dinner'],
        description: 'Cross Kunzum Pass, circling the stupas clockwise. Descend to the serene banks of Chandratal as the sun sets behind jagged peaks.',
        accommodation: 'Luxury Heated Stargazing Glamping Dome'
      },
      {
        day: 7,
        title: 'Over Atal Tunnel to Manali & Farewell Banquet',
        altitude: '2,050m',
        distance: 'Drive',
        ascent: '+0m',
        descent: '-2200m',
        highlights: ['Traverse the 9.02km engineering marvel Atal Tunnel', 'Private farm-to-table banquet in old Manali cedar forest'],
        description: 'Descend through the Rohtang crest and Atal Tunnel into lush green deodar cedar valleys of Kullu.',
        accommodation: 'The Apple Orchard Estate'
      }
    ]
  },
  {
    id: 'exp-4',
    title: 'Lofoten Arctic Midnight Kayak & Fjord Odyssey',
    tagline: 'Glide beneath sheer 1,000m granite walls, navigate tidal narrows, and sleep in historic crimson rorbuer over pristine Arctic waters.',
    region: 'Fjords',
    country: 'Norway',
    durationDays: 6,
    maxAltitude: '448m / 1,470ft',
    difficulty: 'Moderate',
    groupSize: '4 - 8 Climbers',
    pricePerPerson: 2950,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The Lofoten Archipelago sits 100 miles north of the Arctic Circle, where dramatic alpine peaks plunge vertically into crystal fjords. Paddle expedition sea kayaks through narrow sounds, hike to isolated Atlantic surf beaches, and relax in private wood-fired saunas hanging over the sea.',
    bestMonths: ['May', 'June', 'July', 'August', 'September'],
    elevationProfile: [
      { day: 'Day 1', elevationMeters: 0 },
      { day: 'Day 2', elevationMeters: 448 },
      { day: 'Day 3', elevationMeters: 0 },
      { day: 'Day 4', elevationMeters: 380 },
      { day: 'Day 5', elevationMeters: 0 },
      { day: 'Day 6', elevationMeters: 0 }
    ],
    included: [
      'British Canoeing certified Arctic sea kayak guides & drysuits',
      'Top-tier fiberglass sea kayaks (P&H / Valley) with carbon paddles',
      'Historic waterfront fisherman rorbu cabin accommodations',
      'Private wood-fired barrel sauna sessions with ocean plunge access',
      'Nordic coastal cuisine: freshly caught Arctic cod, cloudberries, and local cheeses',
      'RIB speed-boat transfers to secluded beaches'
    ],
    requiredGear: [
      'Merino wool base layers (200-250 gsm)',
      'Waterproof dry bags for electronics (10L & 20L)',
      'Neoprene booties and paddling gloves',
      'Eye mask for 24-hour midnight sun'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Svolvær & Kayak Fitting Session',
        altitude: '0m',
        distance: 'Transfer',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['Svolvær goat twin horn peaks', 'Drysuit fitting & roll practice in sheltered bay'],
        description: 'Arrive in the historic fishing capital of Lofoten. Safety briefing and equipment fitting.',
        accommodation: 'Svinøya Rorbuer Luxury Fjord Cabin'
      },
      {
        day: 2,
        title: 'Paddle Reinefjorden & Reinebringen Summit',
        altitude: '448m',
        distance: '12 km kayak + 3km climb',
        ascent: '+448m',
        descent: '-448m',
        highlights: ['Glacial fjord paddling beneath Olstinden', 'Sherpa stone staircase climb to Reinebringen', 'Post-climb sauna plunge'],
        description: 'Paddle through the breathtaking Reinefjorden before climbing the 1,560 stone steps to Reinebringen for the most celebrated view in Norway.',
        accommodation: 'Reine Waterfront Rorbu Lodge'
      },
      {
        day: 3,
        title: 'Bunes Beach Remote Atlantic Crossing by Kayak & Hike',
        altitude: '50m',
        distance: '15 km kayak + 6km walk',
        ascent: '+150m',
        descent: '-150m',
        highlights: ['Wild Arctic surf beach', 'Towering granite amphitheatre of Helvetestinden', 'Driftwood campfire feast'],
        description: 'Paddle deep into Kjerkfjorden, portage ashore, and hike over a low pass to the immense white sands of Bunes Beach.',
        accommodation: 'Reine Waterfront Rorbu Lodge'
      },
      {
        day: 4,
        title: 'Ryten Peak & Kvalvika Secret Smuggler Bay',
        altitude: '380m',
        distance: '8 km trek',
        ascent: '+380m',
        descent: '-380m',
        highlights: ['Cliff edge photography over Kvalvika Beach', 'Arctic bog wildflower meadows', 'Midnight sun barbecue'],
        description: 'Hike to the summit ridge of Ryten with dizzying views down to the turquoise breakers of Kvalvika beach.',
        accommodation: 'Nusfjord Heritage Fishing Village Suite'
      },
      {
        day: 5,
        title: 'Trollfjorden Secret Passage & Sea Eagle Safari',
        altitude: '0m',
        distance: '20 km kayak & RIB',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['100m narrow entrance into Trollfjorden', 'White-tailed sea eagle feedings', 'Local artisan bakery tour in Henningsvær'],
        description: 'Explore the narrowest fjord in Northern Europe where rock walls loom directly over your kayak cockpit.',
        accommodation: 'Henningsvær Lighthouse Villa'
      },
      {
        day: 6,
        title: 'Henningsvær Football Pitch Visit & Departure',
        altitude: '0m',
        distance: 'Transfer',
        ascent: '+0m',
        descent: '-0m',
        highlights: ['World’s most scenic ocean football ground', 'Depart from Leknes or Harstad'],
        description: 'Morning stroll around the Venice of Lofoten before private transfer to Leknes airport.',
        accommodation: 'Departure'
      }
    ]
  }
];
