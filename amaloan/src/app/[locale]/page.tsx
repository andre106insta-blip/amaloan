import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import StatBand from '@/components/marketing/StatBand';
import HowItWorks from '@/components/marketing/HowItWorks';
import AudienceCards from '@/components/marketing/AudienceCards';
import Footer from '@/components/marketing/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatBand />
        <HowItWorks />
        <AudienceCards />
      </main>
      <Footer />
    </>
  );
}
