import React, { useState } from 'react';
import { ChevronDown, MapPin, Mail, Briefcase, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { EASE_OUT } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { JOB_OPENINGS } from '../data/content';

const JobCard: React.FC<{ job: (typeof JOB_OPENINGS)[number] }> = ({ job }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
      >
        <div>
          <h3 className="font-bold text-stone-900 text-lg">{job.title}</h3>
          <p className="text-stone-500 text-sm mt-1">{job.summary}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE_OUT }}>
          <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-stone-100 pt-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#D9531E] mb-2">Responsibilities</h4>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="text-stone-600 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9531E] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-100 space-y-4 text-sm">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <MapPin className="w-4 h-4 text-[#D9531E]" />
                  {job.location}
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  {job.contact.phone && (
                    <a
                      href={`https://wa.me/${job.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hi, I'd like to apply for the ${job.title} position at Yummy Dosa.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      Apply via WhatsApp
                    </a>
                  )}
                  {job.contact.email && (
                    <a
                      href={`mailto:${job.contact.email}?subject=${encodeURIComponent('Application: ' + job.title)}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border-2 border-[#D9531E] text-[#D9531E] hover:bg-[#D9531E] hover:text-white font-bold transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Apply via Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CareersPage() {
  useDocumentMeta({
    title: 'Careers',
    description: 'Current job openings at Yummy Dosa, Ilford -- Restaurant Manager, South Indian Chettinad Chef, Indian Curry Chef, Waiter and Waitress.',
  });

  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Join the Yummy Dosa Kitchen"
        description="We're a busy South Indian vegetarian restaurant in Ilford -- here are our current openings."
        demoKey="chefProfessionalKitchen"
        align="center"
        height="compact"
      />
      <Breadcrumbs items={[{ label: 'Careers' }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-4">
        <Reveal className="flex items-center gap-2 text-stone-500 text-sm mb-6">
          <Briefcase className="w-4 h-4" />
          <span>{JOB_OPENINGS.length} current openings</span>
        </Reveal>
        <StaggerGroup className="space-y-4" stagger={0.08}>
          {JOB_OPENINGS.map((job) => (
            <StaggerItem key={job.id} direction="up">
              <JobCard job={job} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </>
  );
}
