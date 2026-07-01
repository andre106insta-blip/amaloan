import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import Steps from '@/components/marketing/Steps';
import FeatureGrid from '@/components/marketing/FeatureGrid';
import CtaBand from '@/components/marketing/CtaBand';

export default async function EconomicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('EconomicsPage');

  const steps = [
    { n: '1', title: t('s1Title'), body: t('s1Body') },
    { n: '2', title: t('s2Title'), body: t('s2Body') },
    { n: '3', title: t('s3Title'), body: t('s3Body') },
  ];
  const feats = [
    { icon: 'ti-percentage', title: t('f1Title'), body: t('f1Body') },
    { icon: 'ti-receipt', title: t('f2Title'), body: t('f2Body') },
    { icon: 'ti-circle-check', title: t('f3Title'), body: t('f3Body') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <Steps title={t('stepsTitle')} items={steps} />
        <FeatureGrid items={feats} />
        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/docs" />
      </main>
      <Footer />
    </>
  );
}
