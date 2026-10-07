/**
 * ==============================================================================
 * FLIGHTS.COM + 5-CHAPTER EDITORIAL SCROLL CONTROLLER
 * Zero Video Auto-Play — 100% Calibrated Smooth Scroll Cinematic Storytelling
 * ==============================================================================
 */

'use strict';

// -------------------------------------------------------------
// 1. DOM ELEMENTS
// -------------------------------------------------------------
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloaderBar');
const scrollProgressBar = document.getElementById('scrollProgressBar');
const fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn');
const sceneDots = document.querySelectorAll('.scene-dot');

// Scene Story Sections
const sceneSection0 = document.getElementById('sceneSection0'); // Plane / Flights.com
const sceneSection1 = document.getElementById('sceneSection1'); // Spiti Valley
const sceneSection2 = document.getElementById('sceneSection2'); // Meghalaya
const sceneSection3 = document.getElementById('sceneSection3'); // Zanskar
const sceneSection4 = document.getElementById('sceneSection4'); // Western Ghats
const sceneFinale = document.getElementById('sceneFinale');       // Grand Finale

// Finale buttons
const finaleBookFlightBtn = document.getElementById('finaleBookFlightBtn');
const finaleReplayBtn = document.getElementById('finaleReplayBtn');

// Flights UI Elements
const fromCityText = document.getElementById('fromCityText');
const fromCodeBadge = document.getElementById('fromCodeBadge');
const toCityText = document.getElementById('toCityText');
const toCodeBadge = document.getElementById('toCodeBadge');
const inputFromBox = document.getElementById('inputFromBox');
const inputToBox = document.getElementById('inputToBox');
const fromAirportDropdown = document.getElementById('fromAirportDropdown');
const toAirportDropdown = document.getElementById('toAirportDropdown');
const fromAirportList = document.getElementById('fromAirportList');
const toAirportList = document.getElementById('toAirportList');
const swapLocationsBtn = document.getElementById('swapLocationsBtn');
const departDateInput = document.getElementById('departDateInput');
const returnDateInput = document.getElementById('returnDateInput');
const returnDateContainer = document.getElementById('returnDateContainer');

// Passenger popover elements
const passengerSelectorBox = document.getElementById('passengerSelectorBox');
const passengerDropdown = document.getElementById('passengerDropdown');
const passengerSummaryText = document.getElementById('passengerSummaryText');
const adultsMinusBtn = document.getElementById('adultsMinusBtn');
const adultsPlusBtn = document.getElementById('adultsPlusBtn');
const adultsCount = document.getElementById('adultsCount');
const childrenMinusBtn = document.getElementById('childrenMinusBtn');
const childrenPlusBtn = document.getElementById('childrenPlusBtn');
const childrenCount = document.getElementById('childrenCount');
const cabinClassButtonGroup = document.getElementById('cabinClassButtonGroup');
const applyPassengersBtn = document.getElementById('applyPassengersBtn');

// Search & Modals
const flightSearchSubmitBtn = document.getElementById('flightSearchSubmitBtn');
const flightResultsModal = document.getElementById('flightResultsModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalRouteSummary = document.getElementById('modalRouteSummary');
const modalFromCity = document.getElementById('modalFromCity');
const modalToCity = document.getElementById('modalToCity');
const flightResultsList = document.getElementById('flightResultsList');
const sortFlightsSelect = document.getElementById('sortFlightsSelect');
const bookingConfirmModal = document.getElementById('bookingConfirmModal');
const bookingConfirmationDetails = document.getElementById('bookingConfirmationDetails');
const closeBookingConfirmBtn = document.getElementById('closeBookingConfirmBtn');

// -------------------------------------------------------------
// 2. STATE MANAGEMENT
// -------------------------------------------------------------
const searchState = {
  activeTab: 'flights',
  tripType: 'round-trip',
  fromCity: 'New York',
  fromCode: 'JFK',
  toCity: 'London',
  toCode: 'LHR',
  departDate: '2026-10-15',
  returnDate: '2026-10-22',
  adults: 1,
  children: 0,
  cabinClass: 'Economy',
  filterStops: 'all',
  sortBy: 'price-asc'
};

// -------------------------------------------------------------
// 3. SMOOTH SCROLL-DRIVEN FRAME ENGINE
// -------------------------------------------------------------
const engine = new SmoothScrollFrameEngine({
  canvasId: 'sequenceCanvas',
  lerpRate: 0.08,  // Gentle luxury inertial damping
  maxFps: 25,      // Calibrated normal cinema speed cap
});

let isRevealed = false;

function reveal() {
  if (isRevealed) return;
  isRevealed = true;
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
}

engine.onLoadProgress = (loaded, total, pct) => {
  if (preloaderBar) preloaderBar.style.width = `${pct}%`;
};

engine.onInitialReady = () => {
  setTimeout(reveal, 150);
};

setTimeout(reveal, 2500);

// --------------------------------------------------------------------------
// CONTINUOUS SCROLL-COUPLED MOTION ENGINE
// Text and cards move continuously with every pixel/notch of scroll!
// --------------------------------------------------------------------------

// Hero Section: smoothly scrolls UPWARDS out of view as user scrolls down
function updateHeroSection(elem, progress, endProg = 0.16, travelDistance = 500) {
  if (!elem) return;
  const rel = Math.max(0, Math.min(1, progress / endProg));

  // Directly translates upwards with user scroll
  const currentY = -rel * travelDistance;
  elem.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`;

  // Opacity: stays solid until 55% of travel, then fades out smoothly
  let opacity = 1.0;
  if (rel > 0.55) {
    opacity = (1 - rel) / 0.45;
  }
  elem.style.opacity = Math.max(0, opacity).toFixed(3);
  elem.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';

  // Parallax on flight corridors cards grid
  const corridorGrid = elem.querySelector('.grid-cols-6');
  if (corridorGrid) {
    corridorGrid.style.transform = `translate3d(0, ${(-rel * 120).toFixed(1)}px, 0)`;
  }
}

// Chapter Stories: continuously glide upwards through the screen during scroll
function updateStorySection(elem, progress, startProg, endProg, travelDistance = 380) {
  if (!elem) return;

  const range = endProg - startProg;
  const rel = (progress - startProg) / range;

  if (rel < -0.15 || rel > 1.15) {
    elem.style.opacity = '0';
    elem.style.transform = `translate3d(0, ${rel < 0 ? travelDistance * 0.5 : -travelDistance * 0.5}px, 0)`;
    elem.style.pointerEvents = 'none';
    return;
  }

  // Continuous linear scroll glide:
  // rel = 0.0 -> enters from bottom (+190px)
  // rel = 0.5 -> perfect screen center (0px)
  // rel = 1.0 -> exits towards top (-190px)
  const currentY = (0.5 - rel) * travelDistance;
  elem.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`;

  // Opacity bell curve: fades in first 22%, fully visible middle 56%, fades out last 22%
  let opacity = 0;
  if (rel >= 0 && rel <= 1) {
    if (rel < 0.22) {
      opacity = rel / 0.22;
    } else if (rel > 0.78) {
      opacity = (1 - rel) / 0.22;
    } else {
      opacity = 1.0;
    }
  } else if (rel < 0) {
    opacity = Math.max(0, 1 + rel / 0.15) * 0.1;
  } else {
    opacity = Math.max(0, 1 - (rel - 1) / 0.15) * 0.1;
  }

  elem.style.opacity = opacity.toFixed(3);
  elem.style.pointerEvents = opacity > 0.35 ? 'auto' : 'none';

  // Subtle differential parallax for child columns and cards
  const leftCol = elem.querySelector('.lg\\:col-span-7');
  const rightCol = elem.querySelector('.lg\\:col-span-5');
  if (leftCol && rightCol) {
    leftCol.style.transform = `translate3d(0, ${(currentY * 0.15).toFixed(1)}px, 0)`;
    rightCol.style.transform = `translate3d(0, ${(-currentY * 0.22).toFixed(1)}px, 0)`;
  }
}

// Grand Finale Section: glides smoothly in from bottom and settles into center
function updateFinaleSection(elem, progress, startProg = 0.93, travelDistance = 320) {
  if (!elem) return;
  const rel = Math.max(0, Math.min(1, (progress - startProg) / (1 - startProg)));

  // Glides into center as progress reaches 1.0
  const currentY = (1 - rel) * travelDistance;
  elem.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`;

  let opacity = rel / 0.35;
  if (opacity > 1) opacity = 1;
  elem.style.opacity = opacity.toFixed(3);
  elem.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none';
}

// Scroll animation updates
engine.onProgress = (progress, currentFrame, totalFrames) => {
  // 1. Update bottom scroll progress bar
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${(progress * 100).toFixed(2)}%`;
  }

  // 2. Continuously move text and cards with scroll across all scenes:
  // Scene 1: Plane & Flights.com (0.00 to 0.16) - moves upwards with scroll
  updateHeroSection(sceneSection0, progress, 0.16, 520);

  // Scene 2: Spiti Valley & Ki Gompa (0.14 to 0.32) - glides continuously
  updateStorySection(sceneSection1, progress, 0.14, 0.32, 400);

  // Scene 3: Meghalaya Living Roots (0.30 to 0.48) - glides continuously
  updateStorySection(sceneSection2, progress, 0.30, 0.48, 400);

  // Scene 4: Zanskar Chadar Ice Gorge (0.47 to 0.65) - glides continuously
  updateStorySection(sceneSection3, progress, 0.47, 0.65, 400);

  // Scene 5: Munnar & Western Ghats (0.64 to 0.82) - glides continuously
  updateStorySection(sceneSection4, progress, 0.64, 0.82, 400);

  // Scene 6: 8 Wilderness Stays Grid & Charter (0.81 to 0.94) - glides continuously
  updateStorySection(document.getElementById('sceneSection5'), progress, 0.81, 0.94, 420);

  // Grand Finale CTA (0.93 to 1.00) - settles into center
  updateFinaleSection(sceneFinale, progress, 0.93, 320);

  // 3. Update Scene Dot indicators
  const activeSceneIndex = engine.getSceneForProgress(progress);
  sceneDots.forEach((dot, idx) => {
    if (idx === activeSceneIndex) {
      dot.className = 'scene-dot active w-3 h-3 rounded-full bg-blue-500 transition-all hover:scale-125';
    } else {
      dot.className = 'scene-dot w-2 h-2 rounded-full bg-white/40 transition-all hover:scale-125';
    }
  });
};

// Scene dots click to smooth-scroll
sceneDots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    const sceneIdx = parseInt(dot.getAttribute('data-scene'), 10);
    engine.scrollToScene(sceneIdx);
  });
});

// Finale action buttons
if (finaleBookFlightBtn) {
  finaleBookFlightBtn.addEventListener('click', () => {
    engine.scrollToProgress(0, true);
    setTimeout(() => {
      if (flightSearchSubmitBtn) flightSearchSubmitBtn.click();
    }, 800);
  });
}

if (finaleReplayBtn) {
  finaleReplayBtn.addEventListener('click', () => {
    engine.scrollToProgress(0, true);
  });
}

// Fullscreen toggle
if (fullscreenToggleBtn) {
  fullscreenToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });
}

// -------------------------------------------------------------
// SPEED CONTROL SYSTEM
// Speed controls the scrollTrack height:
//   0.5x → 1600vh (slow, long scroll)
//   1.0x → 800vh  (normal)
//   1.5x → 533vh  (fast)
//   2.0x → 400vh  (very fast)
// -------------------------------------------------------------
const scrollTrack = document.getElementById('scrollTrack');
const speedPresetBtns = document.querySelectorAll('.speed-preset-btn');
const speedRangeSlider = document.getElementById('speedRangeSlider');
const activeSpeedBadge = document.getElementById('activeSpeedBadge');
const headerSpeedLabel = document.getElementById('headerSpeedLabel');
const autoCruiseBtn = document.getElementById('autoCruiseBtn');
const cruiseIcon = document.getElementById('cruiseIcon');
const cruiseBtnText = document.getElementById('cruiseBtnText');

let currentSpeed = 0.4;
let autoCruiseActive = false;
let autoCruiseTimer = null;

const SPEED_LABELS = {
  0.2: '0.2x Ultra Slow',
  0.4: '0.4x Cinematic',
  0.6: '0.6x Slow-Mo',
  0.8: '0.8x Gentle',
  1.0: '1.0x Normal',
  1.5: '1.5x Fast',
  2.0: '2.0x Sonic',
};

function applySpeed(speed) {
  currentSpeed = speed;
  // Base height 800vh at 1x → height = 800/speed vh
  const newHeightVh = Math.round(800 / speed);
  if (scrollTrack) {
    // Save current scroll progress to restore position after height change
    const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(1, docHeight - winHeight);
    const savedProgress = window.scrollY / maxScroll;

    scrollTrack.style.height = `${newHeightVh}vh`;

    // Restore scroll position after height change
    requestAnimationFrame(() => {
      const newDocHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const newMaxScroll = Math.max(1, newDocHeight - winHeight);
      window.scrollTo({ top: savedProgress * newMaxScroll, behavior: 'instant' });
    });
  }

  // Update slider
  if (speedRangeSlider) speedRangeSlider.value = speed;

  // Update header speed badge
  const labelKey = Object.keys(SPEED_LABELS).reduce((prev, curr) =>
    Math.abs(parseFloat(curr) - speed) < Math.abs(parseFloat(prev) - speed) ? curr : prev
  );
  const label = SPEED_LABELS[labelKey] || `${speed.toFixed(1)}x`;

  if (activeSpeedBadge) activeSpeedBadge.textContent = label;
  if (headerSpeedLabel) headerSpeedLabel.textContent = `Speed: ${speed.toFixed(1)}x`;

  // Update preset button active states
  speedPresetBtns.forEach(btn => {
    const btnSpeed = parseFloat(btn.getAttribute('data-speed'));
    if (Math.abs(btnSpeed - speed) < 0.05) {
      btn.className = 'speed-preset-btn active px-2 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white transition-all border border-blue-400 cursor-pointer';
    } else {
      btn.className = 'speed-preset-btn px-2 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-300 transition-all border border-white/10 cursor-pointer';
    }
  });

  // Also sync any inline speed cards
  document.querySelectorAll('.inline-speed-btn').forEach(btn => {
    const btnSpeed = parseFloat(btn.getAttribute('data-speed'));
    if (Math.abs(btnSpeed - speed) < 0.05) {
      btn.classList.add('ring-2', 'ring-blue-400', 'bg-blue-600/30');
      btn.classList.remove('bg-white/10');
    } else {
      btn.classList.remove('ring-2', 'ring-blue-400', 'bg-blue-600/30');
      btn.classList.add('bg-white/10');
    }
  });
}

// Wire speed preset buttons
speedPresetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const speed = parseFloat(btn.getAttribute('data-speed'));
    applySpeed(speed);
  });
});

// Wire speed range slider
if (speedRangeSlider) {
  speedRangeSlider.addEventListener('input', () => {
    const speed = parseFloat(speedRangeSlider.value);
    applySpeed(speed);
  });
}

// Auto-Cruise: slowly auto-scrolls the page
if (autoCruiseBtn) {
  autoCruiseBtn.addEventListener('click', () => {
    autoCruiseActive = !autoCruiseActive;
    if (autoCruiseActive) {
      cruiseBtnText.textContent = 'Stop Auto-Cruise';
      if (cruiseIcon) cruiseIcon.setAttribute('data-lucide', 'pause');
      autoCruiseBtn.classList.add('bg-blue-600/30', 'border-blue-400/50');
      startAutoCruise();
    } else {
      cruiseBtnText.textContent = 'Start Auto-Cruise Tour';
      if (cruiseIcon) cruiseIcon.setAttribute('data-lucide', 'play');
      autoCruiseBtn.classList.remove('bg-blue-600/30', 'border-blue-400/50');
      stopAutoCruise();
    }
    if (window.lucide) window.lucide.createIcons();
  });
}

function startAutoCruise() {
  function cruiseTick() {
    if (!autoCruiseActive) return;
    const speed = currentSpeed;
    window.scrollBy({ top: speed * 2.5, behavior: 'instant' });
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 10) {
      // Reached end, loop back
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    autoCruiseTimer = requestAnimationFrame(cruiseTick);
  }
  autoCruiseTimer = requestAnimationFrame(cruiseTick);
}

function stopAutoCruise() {
  if (autoCruiseTimer) cancelAnimationFrame(autoCruiseTimer);
  autoCruiseTimer = null;
}

// Wire inline speed buttons (added in scene sections)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.inline-speed-btn');
  if (btn) {
    const speed = parseFloat(btn.getAttribute('data-speed'));
    if (!isNaN(speed)) applySpeed(speed);
  }
});

// Initialize speed
applySpeed(1.0);

// Keyboard controls
window.addEventListener('keydown', (e) => {
  if (flightResultsModal && !flightResultsModal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeModalBtn.click();
    return;
  }
  const scrollStep = window.innerHeight * 0.5;
  switch (e.key) {
    case 'ArrowDown':
    case 'PageDown':
      e.preventDefault();
      window.scrollBy({ top: scrollStep, behavior: 'smooth' });
      break;
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault();
      window.scrollBy({ top: -scrollStep, behavior: 'smooth' });
      break;
    case 'Home':
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'End':
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      if (fullscreenToggleBtn) fullscreenToggleBtn.click();
      break;
  }
});

// -------------------------------------------------------------
// 4. FLIGHTS.COM INTERACTIVE LOGIC
// -------------------------------------------------------------

function renderAirportList(container, fieldType) {
  if (!container || !window.POPULAR_AIRPORTS) return;
  container.innerHTML = '';
  window.POPULAR_AIRPORTS.forEach((airport) => {
    const item = document.createElement('div');
    item.className = 'px-3 py-2 hover:bg-blue-600/20 rounded-xl cursor-pointer flex items-center justify-between transition-colors';
    item.innerHTML = `
      <div>
        <div class="text-xs font-bold text-white">${airport.city}</div>
        <div class="text-[10px] text-slate-400 truncate max-w-[170px]">${airport.name}</div>
      </div>
      <span class="text-xs font-extrabold text-blue-400 bg-blue-500/10 border border-blue-400/30 px-1.5 py-0.5 rounded">
        ${airport.code}
      </span>
    `;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fieldType === 'from') {
        searchState.fromCity = airport.city;
        searchState.fromCode = airport.code;
        fromCityText.textContent = airport.city;
        fromCodeBadge.textContent = airport.code;
        fromAirportDropdown.classList.add('hidden');
      } else {
        searchState.toCity = airport.city;
        searchState.toCode = airport.code;
        toCityText.textContent = airport.city;
        toCodeBadge.textContent = airport.code;
        toAirportDropdown.classList.add('hidden');
      }
    });
    container.appendChild(item);
  });
}

renderAirportList(fromAirportList, 'from');
renderAirportList(toAirportList, 'to');

if (inputFromBox) {
  inputFromBox.addEventListener('click', (e) => {
    e.stopPropagation();
    fromAirportDropdown.classList.toggle('hidden');
    toAirportDropdown.classList.add('hidden');
    passengerDropdown.classList.add('hidden');
  });
}

if (inputToBox) {
  inputToBox.addEventListener('click', (e) => {
    e.stopPropagation();
    toAirportDropdown.classList.toggle('hidden');
    fromAirportDropdown.classList.add('hidden');
    passengerDropdown.classList.add('hidden');
  });
}

if (swapLocationsBtn) {
  swapLocationsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const tempCity = searchState.fromCity;
    const tempCode = searchState.fromCode;
    searchState.fromCity = searchState.toCity;
    searchState.fromCode = searchState.toCode;
    searchState.toCity = tempCity;
    searchState.toCode = tempCode;

    fromCityText.textContent = searchState.fromCity;
    fromCodeBadge.textContent = searchState.fromCode;
    toCityText.textContent = searchState.toCity;
    toCodeBadge.textContent = searchState.toCode;
  });
}

document.addEventListener('click', () => {
  if (fromAirportDropdown) fromAirportDropdown.classList.add('hidden');
  if (toAirportDropdown) toAirportDropdown.classList.add('hidden');
  if (passengerDropdown) passengerDropdown.classList.add('hidden');
});

document.querySelectorAll('input[name="tripType"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    searchState.tripType = e.target.value;
    if (searchState.tripType === 'one-way') {
      returnDateContainer.style.opacity = '0.35';
      returnDateInput.disabled = true;
    } else {
      returnDateContainer.style.opacity = '1';
      returnDateInput.disabled = false;
    }
  });
});

if (passengerSelectorBox) {
  passengerSelectorBox.addEventListener('click', (e) => {
    e.stopPropagation();
    passengerDropdown.classList.toggle('hidden');
    fromAirportDropdown.classList.add('hidden');
    toAirportDropdown.classList.add('hidden');
  });
}

if (passengerDropdown) {
  passengerDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

function updatePassengerSummary() {
  const total = searchState.adults + searchState.children;
  const label = total === 1 ? '1 Guest' : `${total} Guests`;
  passengerSummaryText.textContent = `${label}, ${searchState.cabinClass}`;
}

adultsPlusBtn.addEventListener('click', () => {
  searchState.adults++;
  adultsCount.textContent = searchState.adults;
  adultsMinusBtn.disabled = false;
  updatePassengerSummary();
});

adultsMinusBtn.addEventListener('click', () => {
  if (searchState.adults > 1) {
    searchState.adults--;
    adultsCount.textContent = searchState.adults;
    if (searchState.adults === 1) adultsMinusBtn.disabled = true;
    updatePassengerSummary();
  }
});

childrenPlusBtn.addEventListener('click', () => {
  searchState.children++;
  childrenCount.textContent = searchState.children;
  childrenMinusBtn.disabled = false;
  updatePassengerSummary();
});

childrenMinusBtn.addEventListener('click', () => {
  if (searchState.children > 0) {
    searchState.children--;
    childrenCount.textContent = searchState.children;
    if (searchState.children === 0) childrenMinusBtn.disabled = true;
    updatePassengerSummary();
  }
});

if (cabinClassButtonGroup) {
  cabinClassButtonGroup.querySelectorAll('.cabin-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      cabinClassButtonGroup.querySelectorAll('.cabin-btn').forEach((b) => {
        b.className = 'cabin-btn px-2 py-1.5 rounded-lg text-[11px] font-semibold text-center border border-white/20 text-slate-300 hover:border-white/40';
      });
      btn.className = 'cabin-btn active px-2 py-1.5 rounded-lg text-[11px] font-semibold text-center border border-blue-400 text-blue-400 bg-blue-500/10 font-bold';
      searchState.cabinClass = btn.getAttribute('data-cabin');
      updatePassengerSummary();
    });
  });
}

if (applyPassengersBtn) {
  applyPassengersBtn.addEventListener('click', () => {
    passengerDropdown.classList.add('hidden');
  });
}

// -------------------------------------------------------------
// 5. FLIGHT SEARCH RESULTS MODAL & BOOKING FLOW
// -------------------------------------------------------------
function renderFlightResults() {
  if (!flightResultsList || !window.generateFlightsForRoute) return;

  const baseFlights = window.generateFlightsForRoute(
    searchState.fromCode,
    searchState.fromCity,
    searchState.toCode,
    searchState.toCity,
    490
  );

  let filtered = baseFlights.filter((flight) => {
    if (searchState.filterStops === '0' && flight.stops !== 0) return false;
    if (searchState.filterStops === '1' && flight.stops !== 1) return false;
    return true;
  });

  if (searchState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (searchState.sortBy === 'duration') {
    filtered.sort((a, b) => a.duration.localeCompare(b.duration));
  }

  flightResultsList.innerHTML = '';

  filtered.forEach((flight) => {
    const card = document.createElement('div');
    card.className = 'p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4';
    card.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-extrabold text-sm shrink-0">
          ${flight.airlineCode}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-base text-white">${flight.airline}</span>
            <span class="text-[11px] font-mono text-slate-400">${flight.flightNumber}</span>
          </div>
          <div class="flex items-center gap-3 mt-1 text-sm text-slate-200">
            <span class="font-bold">${flight.departureTime}</span>
            <span class="text-xs text-slate-400 font-medium">→ ${flight.duration} (${flight.stops === 0 ? 'Nonstop' : flight.stopDetails}) →</span>
            <span class="font-bold">${flight.arrivalTime}</span>
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-2">
            ${flight.features.map(f => `<span class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">${f}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
        <div class="text-right">
          <span class="text-2xl font-extrabold text-blue-400">$${flight.price}</span>
          <span class="text-[10px] text-slate-400 block -mt-1">includes taxes & fees</span>
        </div>
        <button class="book-flight-btn px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all cursor-pointer">
          Select & Book
        </button>
      </div>
    `;

    card.querySelector('.book-flight-btn').addEventListener('click', () => {
      openBookingConfirmation(flight);
    });

    flightResultsList.appendChild(card);
  });
}

function openBookingConfirmation(flight) {
  flightResultsModal.classList.add('hidden');
  bookingConfirmModal.classList.remove('hidden');
  bookingConfirmationDetails.innerHTML = `
    <strong>${flight.airline} (${flight.flightNumber})</strong><br/>
    ${searchState.fromCity} (${searchState.fromCode}) → ${searchState.toCity} (${searchState.toCode})<br/>
    Total: <span class="text-blue-400 font-extrabold text-base">$${flight.price} USD</span> • ${searchState.cabinClass}
  `;
}

if (closeBookingConfirmBtn) {
  closeBookingConfirmBtn.addEventListener('click', () => {
    bookingConfirmModal.classList.add('hidden');
  });
}

if (flightSearchSubmitBtn) {
  flightSearchSubmitBtn.addEventListener('click', () => {
    modalFromCity.textContent = `${searchState.fromCity} (${searchState.fromCode})`;
    modalToCity.textContent = `${searchState.toCity} (${searchState.toCode})`;
    const travelerCount = searchState.adults + searchState.children;
    modalRouteSummary.textContent = `${searchState.tripType.toUpperCase()} • ${searchState.cabinClass.toUpperCase()} • ${travelerCount} TRAVELER${travelerCount > 1 ? 'S' : ''}`;
    
    renderFlightResults();
    flightResultsModal.classList.remove('hidden');
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    flightResultsModal.classList.add('hidden');
  });
}

document.querySelectorAll('.filter-stops-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-stops-btn').forEach(b => {
      b.className = 'filter-stops-btn px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 font-bold hover:bg-white/20';
    });
    btn.className = 'filter-stops-btn active px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold';
    searchState.filterStops = btn.getAttribute('data-stops');
    renderFlightResults();
  });
});

if (sortFlightsSelect) {
  sortFlightsSelect.addEventListener('change', (e) => {
    searchState.sortBy = e.target.value;
    renderFlightResults();
  });
}

// -------------------------------------------------------------
// 6. INITIALIZATION
// -------------------------------------------------------------
engine.init();
applySpeed(0.4);

if (window.lucide) {
  window.lucide.createIcons();
}

// Global helpers referenced by HTML onclick attributes
window.jumpToScene = (sceneIndex) => {
  if (sceneIndex === 5) {
    engine.scrollToProgress(0.88, true);
  } else {
    engine.scrollToScene(sceneIndex);
  }
};

window.openFieldGuideModal = () => {
  const modal = document.getElementById('fieldGuideModal');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
};

window.openFlightModal = () => {
  if (flightSearchSubmitBtn) flightSearchSubmitBtn.click();
};

window.openBookingStay = (stayId) => {
  bookingConfirmModal.classList.remove('hidden');
  if (bookingConfirmationDetails) {
    const stayNames = {
      'stay-india-1': 'Kaza Stone Sanctuary, Spiti Valley — $165/night',
      'stay-india-2': 'Living Canopy Treehouse, Meghalaya — $195/night',
      'stay-india-3': 'Glacial Cliff Hermitage, Zanskar — $220/night',
      'stay-india-4': 'Munnar Cloud Forest Villa — $180/night',
      'stay-india-5': 'Nubra Starlight Dome, Ladakh — $210/night',
      'stay-india-6': 'Cherrapunji Rain Cottage, Meghalaya — $175/night',
      'stay-india-7': 'Leh Indus Heritage Villa, Ladakh — $240/night',
      'stay-india-8': 'Kolukkumalai Planter Estate, Munnar — $190/night',
    };
    bookingConfirmationDetails.innerHTML = `
      <strong>${stayNames[stayId] || 'Wilderness Stay'}</strong><br/>
      Reservation confirmed with zero-footprint conservation standards.<br/>
      E-ticket and itinerary receipt sent to your email.
    `;
  }
};

window.setRoute = (fromCode, fromCity, toCode, toCity) => {
  searchState.fromCity = fromCity;
  searchState.fromCode = fromCode;
  searchState.toCity = toCity;
  searchState.toCode = toCode;
  if (fromCityText) fromCityText.textContent = fromCity;
  if (fromCodeBadge) fromCodeBadge.textContent = fromCode;
  if (toCityText) toCityText.textContent = toCity;
  if (toCodeBadge) toCodeBadge.textContent = toCode;
  engine.scrollToProgress(0, true);
};

