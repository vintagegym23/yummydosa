import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Video } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { Reveal } from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/Stagger';

/** Customer video reviews filmed in the restaurant (public/review videos/, portrait phone clips). */
const VIDEO_REVIEWS = [1, 2, 3, 4, 5].map((n) => encodeURI(`/review videos/${n}.mp4`));

/** Muted previews loop just the opening seconds of each clip. */
const PREVIEW_SECONDS = 5;

/**
 * Homepage video reviews: five portrait clips side by side. Once the section is
 * on screen they autoplay muted, each looping its first few seconds. Hovering a
 * clip reveals an unmute button; unmuting plays that clip on with sound, and
 * only one clip is ever audible. While a clip has sound the other four pause
 * and turn grey; hovering another clip (or scrolling away) mutes it and every
 * clip returns to its colour preview loop.
 */
export const VideoReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [unmuted, setUnmuted] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Play the previews only while the section is visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === unmuted && inView) {
        video.muted = false;
        video.play().catch(() => setUnmuted(null));
        return;
      }
      video.muted = true;
      if (video.currentTime > PREVIEW_SECONDS) video.currentTime = 0;
      // While one clip has sound, the others hold still (and go grey) so it isn't drowned out visually.
      if (inView && unmuted === null && !prefersReducedMotion) video.play().catch(() => {});
      else video.pause();
    });
    if (!inView && unmuted !== null) setUnmuted(null);
  }, [inView, unmuted, prefersReducedMotion]);

  const handleTimeUpdate = (i: number) => {
    const video = videoRefs.current[i];
    if (video && i !== unmuted && video.currentTime >= PREVIEW_SECONDS) video.currentTime = 0;
  };

  const handleEnded = (i: number) => {
    // A clip played through with sound drops back to the muted preview loop.
    if (i === unmuted) setUnmuted(null);
  };

  return (
    <section ref={sectionRef} id="video-reviews" className="py-20 bg-[#133527] text-white select-none">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold tracking-wider mb-4">
            <Video className="w-3.5 h-3.5" />
            <span>VIDEO REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Real Guests, <span className="text-amber-300">Real Reviews</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-3">
            Hear it straight from our diners at Yummy Dosa, Ilford. Hover a video and tap the speaker to listen.
          </p>
        </Reveal>

        {/* Side by side on desktop; a swipeable row on smaller screens */}
        <StaggerGroup className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
          {VIDEO_REVIEWS.map((src, i) => {
            const isUnmuted = unmuted === i;
            const isDimmed = unmuted !== null && !isUnmuted;
            return (
              <StaggerItem key={src} direction="up" className="shrink-0 w-[70vw] sm:w-[42vw] lg:w-auto snap-center">
                <div
                  className={`group relative aspect-[9/16] rounded-3xl overflow-hidden bg-stone-900 shadow-lg ring-2 transition-[filter,opacity,box-shadow] duration-500 ${
                    isUnmuted ? 'ring-amber-300' : 'ring-white/10'
                  } ${isDimmed ? 'grayscale opacity-60' : ''}`}
                  onMouseEnter={() => {
                    if (unmuted !== null && unmuted !== i) setUnmuted(null);
                  }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={`${src}#t=0.1`}
                    muted
                    playsInline
                    loop={!isUnmuted}
                    preload="metadata"
                    onTimeUpdate={() => handleTimeUpdate(i)}
                    onEnded={() => handleEnded(i)}
                    aria-label={`Customer video review ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setUnmuted(isUnmuted ? null : i)}
                    aria-label={isUnmuted ? `Mute review ${i + 1}` : `Unmute review ${i + 1}`}
                    aria-pressed={isUnmuted}
                    className={`absolute bottom-3 right-3 flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                      isUnmuted
                        ? 'opacity-100 bg-amber-300 text-stone-900 border-amber-200'
                        : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 bg-black/50 text-white border-white/30 hover:bg-black/70'
                    }`}
                  >
                    {isUnmuted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
};
