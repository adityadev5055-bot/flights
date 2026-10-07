import React, { useState } from 'react';
import { Plane, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateTab('flights')}>
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                flights<span className="text-blue-500">.com</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Book flights easier, faster, and smarter. We bring together transparent prices, worldwide airline routes, and seamless trip management.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((network) => (
                <div
                  key={network}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 flex items-center justify-center cursor-pointer transition-colors text-xs font-bold"
                  title={network}
                >
                  {network[0]}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {['Home', 'Flights', 'Hotels', 'Cars', 'Holidays', 'Help Center'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateTab(item.toLowerCase())}
                    className="hover:text-white transition-colors text-left text-slate-400 hover:underline"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              {['About Us', 'Careers', 'Press', 'Blog', 'Contact Us', 'Partnerships'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest flight deals and travel inspiration straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                id="newsletter-subscribe-btn"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2025 Flights.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
