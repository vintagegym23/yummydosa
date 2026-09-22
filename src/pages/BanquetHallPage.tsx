import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper, Phone, MessageCircle, Utensils, Images } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DishImage } from '../components/DishImage';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { BANQUET_CONTENT, BUSINESS, WHATSAPP_TEST_NUMBER } from '../data/content';

const banquetWhatsappDigits = BUSINESS.banquetContact.phone.replace(/\D/g, '');

export default function BanquetHallPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: '' });
  const [sent, setSent] = useState(false);
  const [eventTypeHighlighted, setEventTypeHighlighted] = useState(false);
  const eventTypeRef = useRef<HTMLInputElement>(null);

  useDocumentMeta({
    title: 'Banquet Hall',
    description: 'The Yummy Dosa banquet hall in Ilford hosts birthdays, weddings, engagements, corporate events and family gatherings.',
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSelectEventType = (event: string) => {
    setForm((f) => ({ ...f, eventType: event }));
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setEventTypeHighlighted(true);
    window.setTimeout(() => eventTypeRef.current?.focus(), 500);
    window.setTimeout(() => setEventTypeHighlighted(false), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello, I'd like to enquire about the Yummy Dosa banquet hall.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nEvent type: ${form.eventType}\nDate: ${form.date}\nGuests: ${form.guests}\nMessage: ${form.message || 'None'}`;
    window.open(`https://wa.me/${WHATSAPP_TEST_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="BANQUET HALL"
        title="Your Celebration, Our Table"
        description={BANQUET_CONTENT.intro}
        demoKey="banquetRoundTables"
        primaryAction={{ label: 'Enquire Now', href: '#enquiry' }}
        height="tall"
      />
      <Breadcrumbs items={[{ label: 'Banquet Hall' }]} />

      {/* Events supported */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">EVENTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Hosted at Yummy Dosa
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BANQUET_CONTENT.eventTypes.map((event) => (
              <StaggerItem key={event} direction="up">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_SNAPPY}
                  type="button"
                  onClick={() => handleSelectEventType(event)}
                  aria-label={`Enquire about a ${event.toLowerCase()} -- jumps to the enquiry form below`}
                  className="w-full bg-white rounded-2xl p-5 text-center border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#D9531E]/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40"
                >
                  <PartyPopper className="w-6 h-6 text-[#D9531E] mx-auto mb-2" />
                  <p className="font-bold text-stone-800 text-sm">{event}</p>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Venue */}
      <section className="py-16 bg-[#FBF8EE] border-y border-[#F3E5C8]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <Reveal direction="left" className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
            <DishImage imageId="north-indian-thali" alt="Banquet hall dining" className="w-full h-full object-cover" />
          </Reveal>
          <Reveal direction="right" className="w-full lg:w-1/2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E]">The Venue</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">A Dedicated Space for Your Event</h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Alongside the main restaurant at 68 Cranbrook Rd, Ilford, Yummy Dosa operates a dedicated banquet
              hall for private functions -- from an intimate family gathering to a full celebration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Food & catering -- the live dosa station */}
      <section className="py-16 bg-[#FFFDF7]">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Utensils className="w-7 h-7 text-[#D9531E] mx-auto mb-3" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">FOOD & CATERING</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 mb-4">Live Dosa Station</h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8">
            Public listings for Yummy Dosa's events describe a live dosa station, freshly prepared in front of
            guests, alongside a weekend breakfast buffet ({BUSINESS.weekendBreakfastBuffet.days},{' '}
            {BUSINESS.weekendBreakfastBuffet.time}).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {BANQUET_CONTENT.liveDosaStationItems.map((item) => (
              <span key={item} className="px-3.5 py-1.5 rounded-full bg-amber-50 text-[#BC3908] text-xs font-bold border border-amber-100">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Gallery teaser */}
      <Reveal direction="scale" as="section" className="py-16 bg-[#133527] text-white text-center">
        <Images className="w-7 h-7 text-amber-300 mx-auto mb-3" />
        <h2 className="text-2xl font-extrabold mb-3">See the Banquet Hall</h2>
        <p className="text-stone-300 text-sm mb-6 max-w-md mx-auto">
          Browse banquet hall and event photos in the Yummy Dosa gallery.
        </p>
        <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block">
          <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">
            View Gallery
          </Link>
        </motion.div>
      </Reveal>

      {/* Enquiry form */}
      <section id="enquiry" className="py-16 bg-[#FFFDF7] scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">ENQUIRE NOW</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Plan Your Event</h2>
            <p className="text-stone-500 text-sm mt-2">
              For more, contact manager {BUSINESS.banquetContact.name} on{' '}
              <a href={`tel:${banquetWhatsappDigits}`} className="text-[#D9531E] font-semibold hover:underline">
                {BUSINESS.banquetContact.phone}
              </a>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="eventType">Event Type <span className="text-red-500">*</span></label>
                <input
                  id="eventType"
                  ref={eventTypeRef}
                  required
                  value={form.eventType}
                  onChange={handleChange('eventType')}
                  placeholder="Wedding, Birthday..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40 transition-shadow ${
                    eventTypeHighlighted ? 'border-emerald-400 ring-2 ring-emerald-300' : 'border-stone-200'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="date">Date <span className="text-red-500">*</span></label>
                <input id="date" type="date" required value={form.date} onChange={handleChange('date')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="guests">Guests <span className="text-red-500">*</span></label>
                <input id="guests" type="number" min={1} required value={form.guests} onChange={handleChange('guests')} className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40" />
              </div>
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
              <span>Send Enquiry via WhatsApp</span>
            </motion.button>
            <a
              href={`tel:${banquetWhatsappDigits}`}
              className="w-full py-3 rounded-full border-2 border-[#1b4332] text-[#1b4332] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1b4332] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS.banquetContact.name}</span>
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
