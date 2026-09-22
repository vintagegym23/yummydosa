import React from 'react';
import { Utensils, Sparkles, ShoppingBag, BellRing, Flame } from 'lucide-react';
import { FEATURE_PILLARS } from '../data/restaurantData';
import { StaggerGroup, StaggerItem } from './motion/Stagger';

export const FeatureCards: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils className="w-7 h-7 text-[#E59819]" />;
      case 'sparkles':
        return <Sparkles className="w-7 h-7 text-emerald-600" />;
      case 'basket':
        return <ShoppingBag className="w-7 h-7 text-[#E59819]" />;
      case 'concierge':
        return <BellRing className="w-7 h-7 text-emerald-600" />;
      case 'pepper':
        return <Flame className="w-7 h-7 text-[#E59819]" />;
      default:
        return <Utensils className="w-7 h-7 text-[#E59819]" />;
    }
  };

  return (
    <section className="pb-16 bg-[#FFFDF7] border-b border-[#F3E5C8]/60" data-purpose="brand-pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {FEATURE_PILLARS.map((pillar, idx) => (
            <StaggerItem
              key={pillar.id}
              direction="up"
              className={`bg-white rounded-2xl p-6 text-center shadow-sm border border-[#F3E5C8]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full ${pillar.bgColor} flex items-center justify-center border ${pillar.borderColor}`}
              >
                {getIcon(pillar.iconName)}
              </div>
              <h3 className="font-bold text-stone-800 text-base mb-1">{pillar.title}</h3>
              <p className="text-xs text-stone-500 font-normal leading-relaxed">
                {pillar.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};
