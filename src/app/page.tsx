import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ClientJourney } from '@/components/sections/ClientJourney';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CaseStudiesSlider } from '@/components/sections/CaseStudiesSlider';
import { GallerySection } from '@/components/sections/GallerySection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientJourney />
        <TrustStrip />
        <AboutSection />
        <ServicesSection />
        <CaseStudiesSlider />
        <ProcessTimeline />
        <GallerySection />
        <WhyChooseUs />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
