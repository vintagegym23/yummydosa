import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { FRANCHISE_CONTENT, BUSINESS, WHATSAPP_TEST_NUMBER } from '../data/content';

const SUPPORT_ICONS = [MapPin, Users, TrendingUp];
const franchiseDigits = BUSINESS.franchiseContact.phone.replace(/\D/g, '');

export default function FranchisePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [sent, setSent] = useState(false);

  useDocumentMeta({
    title: 'Franchise',
    description: 'Own a Yummy Dosa franchise -- location, setup, staff training, operations and marketing support for a growing South Indian vegetarian restaurant brand.',
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello, I'm interested in a Yummy Dosa franchise.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity/Territory of interest: ${form.city}\nMessage: ${form.message || 'None'}`;
    window.open(`https://wa.me/${WHATSAPP_TEST_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="FRANCHISE"
        title={FRANCHISE_CONTENT.headline}
        description={FRANCHISE_CONTENT.intro}
        demoKey="restaurantWindow"
        primaryAction={{ label: 'Enquire About Franchising', href: '#enquiry' }}
        height="tall"
      />
      <Breadcrumbs items={[{ label: 'Franchise' }]} />

      {/* Why the brand */}
      <section className="py-16 bg-[#FFFDF7]">
        <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">WHY YUMMY DOSA</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4">
            A Growing South Indian Vegetarian Brand
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {FRANCHISE_CONTENT.intro}
          </p>
        </Reveal>
      </section>

      {/* Support provided: Location/Setup, Training/Operations, Marketing */}
      <section className="py-16 bg-[#FBF8EE] border-y border-[#F3E5C8]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">SUPPORT PROVIDED</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Built to Help You Succeed
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FRANCHISE_CONTENT.support.map((block, i) => {
              const Icon = SUPPORT_ICONS[i % SUPPORT_ICONS.length];
              return (
                <StaggerItem key={block.title} direction="up" className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-[#BC3908] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-3">{block.title}</h3>
                  <ul className="space-y-1.5">
                    {block.points.map((point) => (
                      <li key={point} className="text-stone-500 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9531E] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
          <p className="text-center text-stone-400 text-xs mt-8 max-w-xl mx-auto">
            Investment amounts, ROI projections and territory availability are discussed directly with
            prospective franchisees -- get in touch for current details.
          </p>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="py-16 bg-[#FFFDF7] scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">ENQUIRE</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Start the Conversation</h2>
            <p className="text-stone-500 text-sm mt-2">
              Or call {BUSINESS.franchiseContact.phone} directly.
            </p>
          </Reveal>

          <Reveal direction="scale" delay={0.1} as="section">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="name">Name <span className="text-red-500">*</span></label>
                <input id="name" required value={form.name} onChange={handleChange('name')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="phone">Phone <span className="text-red-500">*</span></label>
                <input id="phone" type="tel" required value={form.phone} onChange={handleChange('phone')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input id="email" type="email" required value={form.email} onChange={handleChange('email')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="city">City / Territory of Interest <span className="text-red-500">*</span></label>
              <input id="city" required value={form.city} onChange={handleChange('city')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="message">Message</label>
              <textarea id="message" rows={3} value={form.message} onChange={handleChange('message')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SNAPPY}
              type="submit"
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Franchise Enquiry</span>
            </motion.button>
            <a
              href={`tel:${franchiseDigits}`}
              className="w-full py-3 rounded-full border-2 border-[#1b4332] text-[#1b4332] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1b4332] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS.franchiseContact.phone}</span>
            </a>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-emerald-700 text-xs font-semibold text-center overflow-hidden"
                >
                  Your enquiry has been opened in WhatsApp -- send the message to complete it.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
