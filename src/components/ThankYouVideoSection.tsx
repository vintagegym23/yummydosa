import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { SPRING_SNAPPY, EASE_OUT } from './motion/variants';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/** Guests cheering "Thank you Yummy Dosa!" (720p landscape clip, ~1.8 MB -- only fetched once the section is near). */
const THANK_YOU_VIDEO = '/videos/thank-you.mp4';
const THANK_YOU_POSTER = '/videos/thank-you-poster.webp';

/**
 * Celebration section after the video reviews: handwritten caption on the left,
 * the guests' thank-you cheer on the right as a card (phone footage -- a card keeps
 * it sharp where full-width would upscale it), looping muted with a sound button.
 */
export const ThankYouVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !unmuted;
    if (inView && (unmuted || !prefersReducedMotion)) video.play().catch(() => setUnmuted(false));
    else video.pause();
    if (!inView && unmuted) setUnmuted(false);
  }, [inView, unmuted, prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="thank-you" className="py-20 bg-[#FBF8EE] select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-[#BC3908] text-xs font-bold tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-current" />
            STRAIGHT FROM OUR GUESTS
          </span>
          <h2 className="font-handwritten text-6xl sm:text-7xl leading-[0.95] -rotate-2 origin-left text-[#1b4332]">
            “Thank you,
            <br />
            <span className="text-[#D9531E]">Yummy Dosa!”</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-6 max-w-md leading-relaxed">
            Full plates, big smiles and a whole room cheering -- moments like this are why we cook. Come and share the
            next one with us.
          </p>
          <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block mt-6">
            <Link
              to="/book-a-table"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors shadow-md"
            >
              <span>Book Your Table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Card size keeps the phone footage near its native resolution, so it stays sharp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          className="relative aspect-video rounded-3xl overflow-hidden bg-stone-900 shadow-xl ring-4 ring-white -rotate-1"
        >
          <video
            ref={videoRef}
            src={THANK_YOU_VIDEO}
            poster={THANK_YOU_POSTER}
            muted
            loop
            playsInline
            preload="none"
            aria-label="Guests raising their arms and cheering “Thank you Yummy Dosa!”"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            transition={SPRING_SNAPPY}
            type="button"
            onClick={() => setUnmuted((u) => !u)}
            aria-pressed={unmuted}
            className={`absolute bottom-3 right-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border text-sm font-bold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
              unmuted
                ? 'bg-amber-300 text-stone-900 border-amber-200'
                : 'bg-black/50 text-white border-white/30 hover:bg-black/70'
            }`}
          >
            {unmuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{unmuted ? 'Sound on' : 'Hear the cheer'}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
