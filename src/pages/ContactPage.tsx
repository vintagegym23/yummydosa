import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/motion/Reveal';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { BUSINESS } from '../data/content';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  useDocumentMeta({
    title: 'Contact Us',
    description: 'Contact Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH. Phone 020 8637 3026, email info@yummydosarestaurant.co.uk.',
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Yummy Dosa,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(`${RESTAURANT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Find Yummy Dosa"
        description={BUSINESS.address.full}
        demoKey="restaurantExterior"
        height="compact"
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact details + map */}
        <Reveal direction="left" className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D9531E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Address</h3>
                <p className="text-stone-600 text-sm mt-1">{BUSINESS.address.full}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#D9531E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Phone</h3>
                <a href={`tel:${RESTAURANT_INFO.displayPhone.replace(/\s+/g, '')}`} className="text-stone-600 text-sm mt-1 block hover:text-[#D9531E]">
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#D9531E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Email</h3>
                <a href={`mailto:${BUSINESS.email}`} className="text-stone-600 text-sm mt-1 block hover:text-[#D9531E]">
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#D9531E] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Opening Hours</h3>
                <ul className="text-stone-600 text-sm mt-1 space-y-0.5">
                  {BUSINESS.hours.map((h) => (
                    <li key={h.days}>{h.days}: {h.time}</li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.a
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SNAPPY}
              href={`${RESTAURANT_INFO.whatsappUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp</span>
            </motion.a>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-sm aspect-video">
            <iframe
              title="Yummy Dosa location map"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d310.0522286746789!2d0.06974391870791513!3d51.56057338852618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7b643796f1d%3A0x184cf3e5cb10d34e!2sYummy%20Dosa%20Pure%20Veg%20indian%20Restaurant!5e0!3m2!1sen!2sin!4v1790088347867!5m2!1sen!2sin"
            />
          </div>
          <a
            href={BUSINESS.mapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D9531E] hover:underline"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Reveal>

        {/* Contact form */}
        <Reveal direction="right" delay={0.1} as="section" className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-extrabold text-stone-900">Send Us a Message</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="name">Name</label>
                <input id="name" required value={form.name} onChange={handleChange('name')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="phone">Phone</label>
                <input id="phone" type="tel" value={form.phone} onChange={handleChange('phone')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={handleChange('email')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="message">Message</label>
              <textarea id="message" rows={5} required value={form.message} onChange={handleChange('message')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SNAPPY}
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white font-bold text-sm transition-colors shadow-sm cursor-pointer"
            >
              Send Message
            </motion.button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-emerald-700 text-xs font-semibold text-center overflow-hidden"
                >
                  Your message has been opened in WhatsApp -- send it to reach us directly.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </>
  );
}
