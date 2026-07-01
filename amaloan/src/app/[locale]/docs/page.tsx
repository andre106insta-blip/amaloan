import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import FeatureGrid from '@/components/marketing/FeatureGrid';
import CtaBand from '@/components/marketing/CtaBand';

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('DocsPage');

  const docs = [
    { icon: 'ti-rocket', title: t('d1Title'), body: t('d1Body') },
    { icon: 'ti-code', title: t('d2Title'), body: t('d2Body') },
    { icon: 'ti-api-app', title: t('d3Title'), body: t('d3Body') },
    { icon: 'ti-arrows-exchange', title: t('d4Title'), body: t('d4Body') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <FeatureGrid items={docs} />
        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/developers" />
      </main>
      <Footer />
    </>
  );
}
