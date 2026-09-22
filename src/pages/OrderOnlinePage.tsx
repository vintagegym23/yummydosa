import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ORDERING_LOGO_LINKS } from '../data/content';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { Reveal } from '../components/motion/Reveal';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/** Real partner/brand logos, supplied directly by the client (public/logos/). */
const LOGO_IMAGE: Record<string, string> = {
  justeat: encodeURI('/logos/just-eat logo.png'),
  ubereats: encodeURI('/logos/ubereats logo.png'),
  deliveroo: encodeURI('/logos/deliveroo logo.png'),
  direct: encodeURI('/logos/logo.png'),
};

const PlatformLink: React.FC<{ platform: (typeof ORDERING_LOGO_LINKS)[number]; className: string; imgClassName: string }> = ({
  platform,
  className,
  imgClassName,
}) => {
  return (
    <motion.a
      whileTap={{ scale: 0.95 }}
      transition={SPRING_SNAPPY}
      href={platform.href}
      onClick={(e) => {
        if (platform.href === '#') e.preventDefault();
      }}
      target={platform.href !== '#' ? '_blank' : undefined}
      rel={platform.href !== '#' ? 'noopener noreferrer' : undefined}
      aria-label={`Order on ${platform.name}`}
      title={platform.href === '#' ? 'Link coming soon' : undefined}
      className={className}
    >
      <img src={LOGO_IMAGE[platform.id]} alt={platform.name} className={imgClassName} />
    </motion.a>
  );
};

export default function OrderOnlinePage() {
  useDocumentMeta({
    title: 'Order Online',
    description: 'Order Yummy Dosa for delivery via Just Eat, Uber Eats and Deliveroo, or order direct.',
  });

  const [justeat, ubereats, deliveroo, direct] = ORDERING_LOGO_LINKS;

  return (
    <>
      <PageHero
        eyebrow="ORDER ONLINE"
        title="Order Your Yummy Dosa Favourites"
        description="Choose your platform below to get Yummy Dosa delivered, or order direct."
        primaryAction={{ label: 'Browse the Menu', to: '/menu' }}
        imageId="chilli-paneer-dosa"
        align="center"
      />
      <Breadcrumbs items={[{ label: 'Order Online' }]} />

      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Delivery partners -- 3 columns */}
          <StaggerGroup className="grid grid-cols-3 gap-4 sm:gap-6">
            {[justeat, ubereats, deliveroo].map((platform) => (
              <StaggerItem key={platform.id} direction="up">
                <PlatformLink
                  platform={platform}
                  className="group flex items-center justify-center aspect-square bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 sm:p-8"
                  imgClassName="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Order direct -- big highlighted card with discount badge */}
          <Reveal direction="scale" delay={0.15} className="relative mt-6">
            <PlatformLink
              platform={direct}
              className="group flex items-center justify-center bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-10 sm:p-14"
              imgClassName="w-full max-w-xl sm:max-w-2xl h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING_SNAPPY, delay: 0.4 }}
              className="absolute -top-6 -right-3 sm:right-6 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none"
            >
              <span className="absolute inset-0 rounded-full bg-[#E8B93B] opacity-60 blur-md animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#F3C75A] to-[#E8B93B] ring-4 ring-white shadow-lg shadow-amber-500/40 flex flex-col items-center justify-center text-stone-900 text-center leading-none animate-badge-grow-shrink">
                <span className="text-2xl sm:text-3xl font-extrabold">10%</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide mt-0.5">Off</span>
              </div>
            </motion.div>
          </Reveal>

          <p className="text-center text-stone-400 text-xs mt-10">
            <Link to="/menu" className="underline hover:text-[#D9531E]">
              Browse the full menu
            </Link>{' '}
            before you order.
          </p>
        </div>
      </section>
    </>
  );
}
