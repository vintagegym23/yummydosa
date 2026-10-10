import React, { useState } from 'react';
import { Leaf, Sparkles, Users, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { BUSINESS } from '../data/content';
import { RESTAURANT_INFO } from '../data/restaurantData';

const WHY_DINE = [
  { icon: Leaf, title: '100% Pure Vegetarian', body: 'No shortcuts, no compromises -- every dish is South Indian vegetarian.' },
  { icon: Sparkles, title: 'Fresh, Stone-Ground Batter', body: 'Traditional preparation, made fresh rather than mass-produced.' },
  { icon: Users, title: 'Family & Group Friendly', body: 'Yummy Dosa is built around families, friends and celebrations.' },
];

export default function BookTablePage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '',
  });
  const [sent, setSent] = useState(false);

  useDocumentMeta({
    title: 'Book a Table',
    description: 'Reserve a table at Yummy Dosa, 68 Cranbrook Rd, Ilford. Send your booking request directly via WhatsApp.',
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Yummy Dosa! I'd like to book a table.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nSpecial request: ${form.notes || 'None'}`;
    window.open(`${RESTAURANT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="RESERVATIONS"
        title="Book a Table at Yummy Dosa"
        description="Join us at 68 Cranbrook Rd, Ilford for an authentic South Indian vegetarian meal."
        image="/images/book-a-table-hero.jpg"
        align="center"
      />
      <Breadcrumbs items={[{ label: 'Book a Table' }]} />

      {/* Why dine with us */}
      <section className="py-16 bg-[#FFFDF7]">
        <StaggerGroup className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_DINE.map((item) => (
            <StaggerItem key={item.title} direction="up" className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm">
              <item.icon className="w-7 h-7 text-[#D9531E] mx-auto mb-3" />
              <h3 className="font-bold text-stone-900 text-sm mb-1.5">{item.title}</h3>
              <p className="text-stone-500 text-xs leading-relaxed">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Reservation form + hours/location */}
      <section className="py-16 bg-[#FBF8EE] border-y border-[#F3E5C8]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <Reveal direction="left" as="section" className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900 mb-1">Reservation Request</h2>
            <p className="text-stone-500 text-xs mb-4">
              This sends your request straight to us on WhatsApp -- we'll confirm availability directly.
              It doesn't guarantee your table until we reply.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="name">Name</label>
                <input id="name" required value={form.name} onChange={handleChange('name')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="phone">Phone</label>
                <input id="phone" type="tel" required value={form.phone} onChange={handleChange('phone')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={handleChange('email')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="date">Date</label>
                <input id="date" type="date" required value={form.date} onChange={handleChange('date')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="time">Time</label>
                <input id="time" type="time" required value={form.time} onChange={handleChange('time')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="guests">Guests</label>
                <select id="guests" value={form.guests} onChange={handleChange('guests')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="notes">Special Request</label>
              <textarea id="notes" rows={3} value={form.notes} onChange={handleChange('notes')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SNAPPY}
              type="submit"
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Booking Request via WhatsApp</span>
            </motion.button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-emerald-700 text-xs font-semibold text-center overflow-hidden"
                >
                  Your request has been opened in WhatsApp -- send the message to complete your request.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D9531E]" /> Opening Hours
              </h3>
              <ul className="space-y-2 text-sm text-stone-600">
                {BUSINESS.hours.map((h) => (
                  <li key={h.days} className="flex justify-between">
                    <span>{h.days}</span>
                    <span className="font-semibold text-stone-900">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D9531E]" /> Location
              </h3>
              <p className="text-sm text-stone-600 mb-3">{BUSINESS.address.full}</p>
              <a
                href={BUSINESS.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-[#D9531E] hover:underline"
              >
                Get Directions →
              </a>
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9531E]" /> Contact
              </h3>
              <a href={`tel:${RESTAURANT_INFO.displayPhone.replace(/\s+/g, '')}`} className="block text-sm text-stone-600 hover:text-[#D9531E]">
                {BUSINESS.phoneDisplay}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="block text-sm text-stone-600 hover:text-[#D9531E] mt-1">
                {BUSINESS.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
