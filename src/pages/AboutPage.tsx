import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DishImage } from '../components/DishImage';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ABOUT_CONTENT, BUSINESS } from '../data/content';

export default function AboutPage() {
  useDocumentMeta({
    title: 'About Us',
    description:
      'The story behind Yummy Dosa -- a South Indian pure vegetarian restaurant in Ilford, London, inspired by Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana.',
  });

  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="A Taste of South India in Ilford"
        description={BUSINESS.tagline}
        demoKey="diningGroupRestaurant"
        align="center"
        height="tall"
      />
      <Breadcrumbs items={[{ label: 'About' }]} />

      {/* Our Story -- editorial layout */}
      <section className="py-20 bg-[#FFFDF7]">
        <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-3">
            Our Story
          </span>
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-serif italic">
            "{BUSINESS.tagline}"
          </p>
          <p className="text-stone-600 leading-relaxed mt-6 text-sm sm:text-base">
            {ABOUT_CONTENT.story}
          </p>
        </Reveal>
      </section>

      {/* South Indian Heritage -- editorial region grid */}
      <section className="py-20 bg-[#FBF8EE] border-y border-[#F3E5C8]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">
              Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-[#1b4332]">A Kitchen Rooted in</span>{' '}
              <span className="text-[#D9531E]">Five Regions</span>
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {BUSINESS.regions.map((region) => (
              <StaggerItem
                key={region}
                direction="up"
                className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <Leaf className="w-6 h-6 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-stone-900 text-sm">{region}</h3>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Our Cuisine */}
      <section className="py-20 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <Reveal direction="left" className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
              <DishImage imageId="ghee-roast" alt="Yummy Dosa cuisine" className="w-full h-full object-cover" />
            </Reveal>
            <Reveal direction="right" className="w-full lg:w-1/2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E]">
                Our Cuisine
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                Traditional Recipes, Fresh Every Day
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {ABOUT_CONTENT.story}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {ABOUT_CONTENT.dishesMentioned.map((dish) => (
                  <span
                    key={dish}
                    className="px-3.5 py-1.5 rounded-full bg-amber-50 text-[#BC3908] text-xs font-bold border border-amber-100"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Philosophy / positioning points */}
      <section className="py-20 bg-[#133527] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-2">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What Yummy Dosa Stands For
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ABOUT_CONTENT.positioningPoints.map((point) => (
              <StaggerItem key={point.title} direction="up" className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-amber-300 text-base mb-2">{point.title}</h3>
                <p className="text-stone-300 text-sm leading-relaxed">{point.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Restaurant Experience */}
      <section className="py-20 bg-[#FFFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-2">
              Restaurant Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-6">
              Made For Every Occasion
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base mb-10">
              Yummy Dosa is positioned as a place for {ABOUT_CONTENT.audience.slice(0, -1).join(', ').toLowerCase()}
              {' '}and {ABOUT_CONTENT.audience[ABOUT_CONTENT.audience.length - 1].toLowerCase()} -- with a dedicated
              banquet hall for larger celebrations.
            </p>
          </Reveal>
          <StaggerGroup className="flex flex-wrap items-center justify-center gap-3 mb-10" stagger={0.06}>
            {ABOUT_CONTENT.audience.map((item) => (
              <StaggerItem key={item} direction="scale" as="span" duration={0.3}>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
                  <Users className="w-3.5 h-3.5" />
                  {item}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-4">
            <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY}>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors shadow-md"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY}>
              <Link
                to="/book-a-table"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#1b4332] text-[#1b4332] hover:bg-[#1b4332] hover:text-white text-sm font-bold transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Book a Table</span>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
