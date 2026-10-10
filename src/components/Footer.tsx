import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BUSINESS } from '../data/content';
import { BrandMark } from './BrandMark';
import { Reveal } from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/Stagger';

const PAGE_LINKS = [
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/order-online', label: 'Order Online' },
  { to: '/book-a-table', label: 'Book a Table' },
  { to: '/banquet-hall', label: 'Banquet Hall' },
  { to: '/catering', label: 'Catering' },
  { to: '/franchise', label: 'Franchise' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer
      id="site-footer"
      className="bg-[#0b1d15] text-stone-400 text-xs sm:text-sm pt-16 pb-12 border-t border-white/5 select-none"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10" stagger={0.1}>
          {/* Brand Description */}
          <StaggerItem direction="up" className="md:col-span-5 space-y-4">
            <BrandMark />
            <p className="text-stone-400 text-xs leading-relaxed max-w-md font-normal">
              A South Indian vegetarian restaurant in Ilford, London, serving dosas, tiffin,
              thalis and more -- inspired by the food traditions of Tamil Nadu, Karnataka, Kerala,
              Andhra Pradesh and Telangana.
            </p>
            <div className="space-y-2 pt-2">
              <a href={`tel:${RESTAURANT_INFO.displayPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{BUSINESS.email}</span>
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{BUSINESS.address.full}</span>
              </span>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem direction="up" className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {PAGE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Hours */}
          <StaggerItem direction="up" className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Opening Hours</h4>
            <ul className="space-y-2 text-xs">
              {BUSINESS.hours.map((h) => (
                <li key={h.days}>
                  <span className="text-white font-semibold">{h.days}</span>
                  <br />
                  {h.time}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerGroup>

        {/* Copyright Notice */}
        <Reveal delay={0.1} className="pt-8 text-center text-xs text-stone-500 font-medium">
          © {new Date().getFullYear()} Yummy Dosa. All rights reserved.
        </Reveal>
      </div>
    </footer>
  );
};
