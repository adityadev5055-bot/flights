import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-16 md:py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            TRAVELER STORIES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Real experiences from travelers who booked flights and adventures with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* User Info Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/20 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {t.country}
                    </p>
                    <span className="text-[10px] font-semibold text-blue-600">
                      {t.tripRoute}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              {/* Bottom Quote Mark */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
                <Quote className="w-5 h-5 text-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
