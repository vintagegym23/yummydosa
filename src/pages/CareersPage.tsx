import React, { useState } from 'react';
import { ChevronDown, MapPin, Mail, Briefcase, MessageCircle, Clock, PoundSterling, UserRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { EASE_OUT } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { JOB_OPENINGS } from '../data/content';

const formatSalary = (gbp: number) => `£${gbp.toLocaleString('en-GB')} gross per year`;

/** A titled bullet list inside an open job card. */
const JobList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div>
    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D9531E] mb-2">{title}</h3>
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="text-stone-600 text-sm flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9531E] shrink-0 mt-1.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

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
          <h2 className="font-bold text-stone-900 text-lg">{job.title}</h2>
          <p className="text-stone-500 text-sm mt-1">{job.summary}</p>
          {(job.employment || job.salaryPerYear) && (
            <p className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
              {job.employment && <span className="px-2.5 py-1 rounded-full bg-[#133527]/5 text-[#133527]">{job.employment}</span>}
              {job.salaryPerYear && (
                <span className="px-2.5 py-1 rounded-full bg-[#133527]/5 text-[#133527]">{formatSalary(job.salaryPerYear)}</span>
              )}
            </p>
          )}
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
              {job.intro && <p className="text-stone-600 text-sm leading-relaxed">{job.intro}</p>}
              {(job.salaryPerYear || job.hoursPerWeek || job.reportsTo) && (
                <dl className="grid sm:grid-cols-3 gap-3 text-sm">
                  {job.salaryPerYear && (
                    <div className="flex items-start gap-2">
                      <PoundSterling className="w-4 h-4 text-[#D9531E] mt-0.5 shrink-0" />
                      <div><dt className="text-stone-400 text-xs">Salary</dt><dd className="text-stone-700 font-medium">{formatSalary(job.salaryPerYear)}</dd></div>
                    </div>
                  )}
                  {job.hoursPerWeek && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#D9531E] mt-0.5 shrink-0" />
                      <div><dt className="text-stone-400 text-xs">Hours</dt><dd className="text-stone-700 font-medium">{job.hoursPerWeek} hours per week</dd></div>
                    </div>
                  )}
                  {job.reportsTo && (
                    <div className="flex items-start gap-2">
                      <UserRound className="w-4 h-4 text-[#D9531E] mt-0.5 shrink-0" />
                      <div><dt className="text-stone-400 text-xs">Reports to</dt><dd className="text-stone-700 font-medium">{job.reportsTo}</dd></div>
                    </div>
                  )}
                </dl>
              )}
              <JobList title={job.requirements ? 'Key Responsibilities' : 'Responsibilities'} items={job.responsibilities} />
              {job.requirements && <JobList title="Skills and Experience" items={job.requirements} />}
              <div className="pt-4 border-t border-stone-100 space-y-4 text-sm">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <MapPin className="w-4 h-4 text-[#D9531E]" />
                  {job.location}
                </span>
                {job.intro && job.contact.email && (
                  <p className="text-stone-600">
                    {job.contact.phone ? 'Apply on WhatsApp, or email your CV to' : 'To apply, email your CV to'}{' '}
                    <a href={`mailto:${job.contact.email}`} className="font-semibold text-[#133527] underline underline-offset-2">
                      {job.contact.email}
                    </a>
                  </p>
                )}
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
                      {job.contact.phone ? 'Apply via Email' : 'Email your CV'}
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
  useDocumentMeta();

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
