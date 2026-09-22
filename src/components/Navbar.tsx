import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Phone, MessageCircle, Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BrandMark } from './BrandMark';
import { StaggerGroup, StaggerItem } from './motion/Stagger';
import { SPRING_SNAPPY, EASE_OUT } from './motion/variants';

interface NavbarProps {
  onOpenOrderModal?: () => void;
}

const EXPERIENCE_LINKS = [
  { to: '/book-a-table', label: 'Book a Table' },
  { to: '/banquet-hall', label: 'Banquet Hall' },
  { to: '/catering', label: 'Catering' },
];

const MOBILE_LINKS = [
  { to: '/', label: 'Home', end: true },
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

/** Desktop nav link with a shared-layout underline that glides between active items. */
const DesktopNavLink: React.FC<{ to: string; end?: boolean; children: React.ReactNode }> = ({ to, end, children }) => (
  <NavLink to={to} end={end} className="relative py-1">
    {({ isActive }) => (
      <>
        <span className={`transition-colors ${isActive ? 'text-[#D9531E] font-bold' : 'hover:text-[#D9531E]'}`}>
          {children}
        </span>
        {isActive && (
          <motion.span
            layoutId="desktop-nav-underline"
            className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-[#D9531E]"
            transition={SPRING_SNAPPY}
          />
        )}
      </>
    )}
  </NavLink>
);

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);

  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo block */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Yummy Dosa Home">
            <motion.div whileTap={{ scale: 0.9 }} transition={SPRING_SNAPPY}>
              <BrandMark className="transition-transform group-hover:scale-105 duration-200" />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-4 xl:gap-6 font-medium text-sm text-stone-700"
          >
            <DesktopNavLink to="/" end>Home</DesktopNavLink>
            <DesktopNavLink to="/menu">Menu</DesktopNavLink>
            <DesktopNavLink to="/about">About</DesktopNavLink>

            {/* Experience dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExperienceOpen(true)}
              onMouseLeave={() => setExperienceOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#D9531E] transition-colors cursor-pointer"
                aria-haspopup="true"
                aria-expanded={experienceOpen}
                onClick={() => setExperienceOpen((v) => !v)}
              >
                <span>Experience</span>
                <motion.span animate={{ rotate: experienceOpen ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE_OUT }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {experienceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: EASE_OUT }}
                    className="absolute top-full left-0 pt-3 w-52 origin-top"
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-stone-100 py-2 overflow-hidden">
                      {EXPERIENCE_LINKS.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm font-medium transition-colors ${
                              isActive ? 'text-[#D9531E] bg-orange-50' : 'text-stone-700 hover:bg-stone-50'
                            }`
                          }
                          onClick={() => setExperienceOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DesktopNavLink to="/gallery">Gallery</DesktopNavLink>
            <DesktopNavLink to="/franchise">Franchise</DesktopNavLink>
            <DesktopNavLink to="/careers">Careers</DesktopNavLink>
            <DesktopNavLink to="/contact">Contact</DesktopNavLink>
          </nav>

          {/* Header Action CTA (Order Online) */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_SNAPPY}>
              <Link
                to="/order-online"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600 text-white text-xs xl:text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order Online</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SNAPPY}
              onClick={onOpenOrderModal}
              className="sm:hidden inline-flex items-center p-2 rounded-full bg-emerald-600 text-white shadow-sm"
              aria-label="Order via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SNAPPY}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  className="block"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="lg:hidden bg-white border-b border-stone-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <StaggerGroup as="div" stagger={0.045} className="flex flex-col space-y-1 text-base font-semibold text-stone-700">
                {MOBILE_LINKS.map((link) => (
                  <StaggerItem key={link.to} direction="right" duration={0.28}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2.5 rounded-lg transition-colors ${
                          isActive ? 'text-[#D9531E] bg-orange-50 font-bold' : 'hover:bg-stone-100'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35, ease: EASE_OUT }}
                className="pt-3 border-t border-stone-200 flex flex-col gap-2.5"
              >
                <motion.a
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_SNAPPY}
                  href={`tel:${RESTAURANT_INFO.displayPhone.replace(/\s+/g, '')}`}
                  className="w-full text-center py-2.5 rounded-full bg-[#D9531E] text-white text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {RESTAURANT_INFO.displayPhone}</span>
                </motion.a>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_SNAPPY}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenOrderModal) onOpenOrderModal();
                  }}
                  className="w-full text-center py-2.5 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
