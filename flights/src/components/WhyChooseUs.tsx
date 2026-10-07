import React from 'react';
import { ShieldCheck, Zap, CalendarSync, Award } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/travelData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'CalendarSync':
        return <CalendarSync className="w-6 h-6" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-choose-us-section" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            THE SMARTER WAY TO TRAVEL
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Flights.com?
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            We simplify global travel by combining transparent fares, flexible changes, and 24/7 dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              id={`why-choose-card-${item.id}`}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-5`}>
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
