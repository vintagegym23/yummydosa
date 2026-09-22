import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DishImage } from '../DishImage';
import { DemoImageKey } from '../../data/demoImages';
import { StaggerGroup, StaggerItem } from '../motion/Stagger';
import { SPRING_SNAPPY, EASE_OUT } from '../motion/variants';

interface HeroAction {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  /** literal decorative image URL (e.g. an approved brand/ambience photo) */
  image?: string;
  /** real dish id, rendered via DishImage (real photo -> demo photo -> placeholder) */
  imageId?: string;
  /** demo venue/event photo (src/data/demoImages.ts), for pages not centered on one dish */
  demoKey?: DemoImageKey;
  align?: 'left' | 'center';
  height?: 'default' | 'tall' | 'compact';
  children?: React.ReactNode;
}

const HEIGHT_CLASS: Record<NonNullable<PageHeroProps['height']>, string> = {
  compact: 'min-h-[280px] py-14',
  default: 'min-h-[420px] py-20',
  tall: 'min-h-[560px] py-28',
};

// Hero photos no longer sit under a dark scrim, so text needs its own
// contrast insurance against whatever the underlying image looks like.
const TEXT_SHADOW = { textShadow: '0 2px 14px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.85)' };

function ActionButton({ action, variant }: { action: HeroAction; variant: 'primary' | 'secondary' }) {
  const className =
    variant === 'primary'
      ? 'px-7 py-3.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm sm:text-base font-bold transition-colors shadow-md flex items-center gap-2'
      : 'px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 text-sm sm:text-base font-semibold transition-colors';

  const content = (
    <>
      <span style={variant === 'secondary' ? TEXT_SHADOW : undefined}>{action.label}</span>
      {variant === 'primary' && <ArrowRight className="w-4 h-4" />}
    </>
  );

  const inner = action.href ? (
    <a
      href={action.href}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link to={action.to || '/'} className={className}>
      {content}
    </Link>
  );

  return (
    <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_SNAPPY}>
      {inner}
    </motion.div>
  );
}

/** Reusable, per-page-customizable hero. Every page picks its own image/copy/height/alignment. */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  imageId,
  demoKey,
  align = 'left',
  height = 'default',
  children,
}) => {
  return (
    <section
      className={`relative bg-stone-950 overflow-hidden text-white flex items-center select-none ${HEIGHT_CLASS[height]}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {imageId || demoKey ? (
          <motion.div
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.04, opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
            className="absolute inset-0 w-full h-full"
          >
            <DishImage
              imageId={imageId}
              demoKey={demoKey}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              priority
            />
          </motion.div>
        ) : image ? (
          <motion.img
            src={image}
            alt={title}
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.04, opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332] via-stone-950 to-[#2d1a0f]" />
        )}
        {/* Very light tone-down so bright photos don't wash out -- not a dark scrim. */}
        {(imageId || demoKey || image) && <div className="absolute inset-0 bg-black/20" />}
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        <StaggerGroup as="div" className={align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl'} stagger={0.1}>
          {eyebrow && (
            <StaggerItem direction="up">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D9531E] text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                {eyebrow}
              </span>
            </StaggerItem>
          )}
          <StaggerItem direction="up">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight"
              style={TEXT_SHADOW}
            >
              {title}
            </h1>
          </StaggerItem>
          {description && (
            <StaggerItem direction="up">
              <p className="text-base sm:text-lg text-white font-normal mb-8 leading-relaxed" style={TEXT_SHADOW}>
                {description}
              </p>
            </StaggerItem>
          )}
          {(primaryAction || secondaryAction) && (
            <StaggerItem direction="up">
              <div className={`flex flex-wrap items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
                {primaryAction && <ActionButton action={primaryAction} variant="primary" />}
                {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
              </div>
            </StaggerItem>
          )}
          {children}
        </StaggerGroup>
      </div>
    </section>
  );
};
