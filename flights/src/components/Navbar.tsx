import React, { useState } from 'react';
import { Plane, ChevronDown, User, Menu, X, Globe, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  currency: string;
  onSelectCurrency: (currency: string) => void;
  activeSection: string;
  onNavigateTab: (tab: string) => void;
  currentUser?: { name: string; email: string } | null;
}

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)', flag: '🇬🇧' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)', flag: '🇮🇳' },
  { code: 'AED', symbol: 'AED', label: 'AED (د.إ)', flag: '🇦🇪' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  currency,
  onSelectCurrency,
  onNavigateTab,
  currentUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const selectedCurr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Flights', id: 'flights' },
    { name: 'Hotels', id: 'hotels' },
    { name: 'Cars', id: 'cars' },
    { name: 'Holidays', id: 'holidays' },
    { name: 'Support', id: 'support' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="brand-logo"
          onClick={() => onNavigateTab('flights')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Plane className="w-5 h-5 -rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            flights<span className="text-blue-600">.com</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => onNavigateTab(link.id)}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative py-1 hover:border-b-2 hover:border-blue-600"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Currency / Region Picker */}
          <div className="relative">
            <button
              id="currency-selector-button"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <span className="text-sm">{selectedCurr.flag}</span>
              <span>{selectedCurr.code}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {currencyDropdownOpen && (
              <div 
                id="currency-dropdown-menu"
                className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onSelectCurrency(c.code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-left hover:bg-blue-50 transition-colors ${
                      currency === c.code ? 'text-blue-600 bg-blue-50/60 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign In / User Profile Button */}
          {currentUser ? (
            <div
              id="navbar-user-profile"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {currentUser.name[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-bold text-blue-900 max-w-[120px] truncate">
                {currentUser.name}
              </span>
            </div>
          ) : (
            <button
              id="navbar-signin-button"
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigateTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 text-left"
              >
                <span>{link.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Currency:</span>
              <select
                value={currency}
                onChange={(e) => onSelectCurrency(e.target.value)}
                className="text-xs font-semibold bg-slate-100 rounded-md px-2 py-1 border-0"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-full"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
