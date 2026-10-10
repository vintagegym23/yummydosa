import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Flame, MessageCircle, Images, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { CATERING_CONTENT, CATERING_MENU, BUSINESS, WHATSAPP_TEST_NUMBER } from '../data/content';

export default function CateringPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', occasion: '', guests: '', message: '' });
  const [sent, setSent] = useState(false);
  const [occasionHighlighted, setOccasionHighlighted] = useState(false);
  const occasionRef = useRef<HTMLInputElement>(null);

  useDocumentMeta({
    title: 'Catering',
    description: 'South Indian catering from Yummy Dosa -- corporate catering, weddings, birthdays and private parties, including a live dosa station.',
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSelectOccasion = (occasion: string) => {
    setForm((f) => ({ ...f, occasion }));
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOccasionHighlighted(true);
    window.setTimeout(() => occasionRef.current?.focus(), 500);
    window.setTimeout(() => setOccasionHighlighted(false), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello, I'd like to enquire about Yummy Dosa catering.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nOccasion: ${form.occasion}\nGuests: ${form.guests}\nMessage: ${form.message || 'None'}`;
    window.open(`https://wa.me/${WHATSAPP_TEST_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="CATERING"
        title="South Indian Catering for Every Occasion"
        description={CATERING_CONTENT.intro}
        demoKey="cateringChafingDishes"
        primaryAction={{ label: 'Enquire About Catering', href: '#enquiry' }}
        height="tall"
      />
      <Breadcrumbs items={[{ label: 'Catering' }]} />

      {/* Occasions */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">OCCASIONS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">We Cater For</h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {CATERING_CONTENT.occasions.map((occasion) => (
              <StaggerItem key={occasion} direction="up">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_SNAPPY}
                  type="button"
                  onClick={() => handleSelectOccasion(occasion)}
                  aria-label={`Enquire about ${occasion.toLowerCase()} -- jumps to the enquiry form below`}
                  className="w-full bg-white rounded-2xl p-5 text-center border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#D9531E]/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40"
                >
                  <ChefHat className="w-6 h-6 text-[#D9531E] mx-auto mb-2" />
                  <p className="font-bold text-stone-800 text-xs">{occasion}</p>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Catering menu -- unlimited live dosa + add-ons (client's latest catering flyer) */}
      <section id="catering-menu" className="py-16 bg-[#FBF8EE] border-y border-[#F3E5C8]/50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">CATERING MENU</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">Catering & Add-Ons Menu</h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3">
              Authentic South Indian food for every occasion -- freshly cooked on site, with menus customised to your event.
            </p>
          </Reveal>

          {/* Unlimited live dosa -- headline offer */}
          <Reveal direction="scale" className="bg-[#1b4332] text-white rounded-3xl shadow-lg overflow-hidden mb-10">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 p-8 sm:p-10 flex flex-col items-center justify-center text-center bg-[#133527]">
                <Flame className="w-8 h-8 text-amber-300 mb-3" />
                <p className="text-sm font-bold uppercase tracking-widest text-amber-300">{CATERING_MENU.liveDosa.title}</p>
                <p className="text-6xl sm:text-7xl font-extrabold leading-none mt-3">{CATERING_MENU.liveDosa.price}</p>
                <p className="text-lg font-semibold text-stone-200 mt-1">{CATERING_MENU.liveDosa.unit}</p>
              </div>
              <div className="md:w-3/5 p-8 sm:p-10">
                <h3 className="text-xl font-extrabold mb-1">Live Dosa Items</h3>
                <p className="text-stone-300 text-sm mb-5">Made fresh in front of your guests -- as much as they like.</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {CATERING_MENU.liveDosa.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-stone-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Add-ons */}
          <Reveal className="text-center mb-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-stone-900">Add-Ons</h3>
            <p className="text-stone-500 text-xs mt-1">Section price applies to every item unless shown otherwise.</p>
          </Reveal>
          <StaggerGroup className="columns-1 sm:columns-2 lg:columns-3 gap-5" stagger={0.05}>
            {CATERING_MENU.addOns.map((section, i) => (
              <StaggerItem
                key={section.title}
                direction="up"
                className="break-inside-avoid mb-5 bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
              >
                <div className={`flex items-center justify-between px-5 py-3 text-white ${i % 2 === 0 ? 'bg-[#1F6F3A]' : 'bg-[#EA262A]'}`}>
                  <h4 className="font-extrabold uppercase tracking-wide text-sm">{section.title}</h4>
                  <span className="font-extrabold text-sm">{section.price}</span>
                </div>
                <ul className="px-5 py-4 space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-3 text-sm text-stone-700">
                      <span>{item.name}</span>
                      {item.price && <span className="font-bold text-[#EA262A] shrink-0">{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="text-center mt-6">
            <a href="#enquiry" className="inline-flex items-center gap-2 text-sm font-bold text-[#D9531E] hover:underline">
              <span>Enquire about catering</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Catering gallery teaser */}
      <Reveal direction="scale" as="section" className="py-16 bg-[#133527] text-white text-center">
        <Images className="w-7 h-7 text-amber-300 mx-auto mb-3" />
        <h2 className="text-2xl font-extrabold mb-3">See Catering in Action</h2>
        <p className="text-stone-300 text-sm mb-6 max-w-md mx-auto">
          Browse the Catering category in the Yummy Dosa gallery.
        </p>
        <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block">
          <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold transition-colors">
            View Gallery
          </Link>
        </motion.div>
      </Reveal>

      {/* Enquiry */}
      <section id="enquiry" className="py-16 bg-[#FFFDF7] scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">ENQUIRE ABOUT CATERING</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Let's Plan Your Menu</h2>
            <p className="text-stone-500 text-sm mt-2">Or call us directly on {BUSINESS.phoneDisplay}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5" htmlFor="occasion">Occasion <span className="text-red-500">*</span></label>
                <input
                  id="occasion"
                  ref={occasionRef}
                  required
                  value={form.occasion}
                  onChange={handleChange('occasion')}
                  placeholder="Corporate, wedding..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40 transition-shadow ${
                    occasionHighlighted ? 'border-emerald-400 ring-2 ring-emerald-300' : 'border-stone-200'
                  }`}
                />
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
              <span>Send Catering Enquiry</span>
            </motion.button>
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
