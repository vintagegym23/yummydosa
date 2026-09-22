import React from 'react';
import { PartyPopper, ChefHat, Images, Store } from 'lucide-react';
import { Hero } from '../components/Hero';
import { WelcomeSection } from '../components/WelcomeSection';
import { FeatureCards } from '../components/FeatureCards';
import { MenuSection } from '../components/MenuSection';
import { SpecialsSection } from '../components/SpecialsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { LocationsSection } from '../components/LocationsSection';
import { PromoBanner } from '../components/PromoBanner';
import { useOrderModal } from '../context/OrderModalContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { BUSINESS } from '../data/content';

export default function HomePage() {
  const { openOrderModal } = useOrderModal();

  useDocumentMeta({
    title: 'South Indian Vegetarian Restaurant in Ilford',
    description:
      'Yummy Dosa is a South Indian pure vegetarian restaurant in Ilford, London -- dosas, tiffin, thalis, chaat and more, inspired by Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana.',
  });

  return (
    <>
      <Hero onViewSpecials={() => document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' })} />

      <WelcomeSection />

      <FeatureCards />

      <MenuSection onOrderWhatsApp={() => openOrderModal()} />

      <SpecialsSection onSelectSpecial={(item) => openOrderModal(item)} />

      <PromoBanner
        eyebrow="BANQUET HALL"
        title="Your Celebration, Our Table"
        description="Yummy Dosa has a dedicated banquet hall for private events -- from birthdays and weddings to corporate gatherings and family functions."
        points={['Birthday parties', 'Weddings', 'Corporate events', 'Family gatherings']}
        ctaLabel="Plan Your Event"
        ctaTo="/banquet-hall"
        imageId="madras-thali"
        icon={PartyPopper}
      />

      <PromoBanner
        eyebrow="CATERING"
        title="South Indian Catering, Freshly Made"
        description="From a live dosa station to a full buffet spread, Yummy Dosa brings South Indian catering to your corporate event, wedding or private party."
        points={['Live dosa station', 'Buffet catering', 'Corporate catering', 'Private parties']}
        ctaLabel="Explore Catering"
        ctaTo="/catering"
        imageId="masala-dosa"
        icon={ChefHat}
        reverse
        tone="dark"
      />

      <TestimonialsSection />

      <PromoBanner
        eyebrow="GALLERY"
        title="A Look Inside Yummy Dosa"
        description="Food, restaurant, banquet hall and catering -- browse the gallery for a closer look at Yummy Dosa."
        ctaLabel="View Gallery"
        ctaTo="/gallery"
        imageId="ghee-roast"
        icon={Images}
      />

      <PromoBanner
        eyebrow="FRANCHISE"
        title="Bring Yummy Dosa to Your City"
        description="Yummy Dosa is a growing South Indian vegetarian restaurant brand, inviting entrepreneurs and investors to explore franchise opportunities."
        points={['Location & setup support', 'Staff training', 'Marketing support', 'Operational guidance']}
        ctaLabel="Explore Franchise"
        ctaTo="/franchise"
        imageId="mysore-masala-dosa"
        icon={Store}
        reverse
      />

      <LocationsSection onOpenMap={() => window.open(BUSINESS.mapsQuery, '_blank')} />
    </>
  );
}
