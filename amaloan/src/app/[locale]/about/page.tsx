import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import FeatureGrid from '@/components/marketing/FeatureGrid';
import CtaBand from '@/components/marketing/CtaBand';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');

  const values = [
    { icon: 'ti-shield-check', title: t('v1Title'), body: t('v1Body') },
    { icon: 'ti-sparkles', title: t('v2Title'), body: t('v2Body') },
    { icon: 'ti-plug-connected', title: t('v3Title'), body: t('v3Body') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />

        <section className="container" style={{ padding: '12px 24px' }}>
          <div className="card" style={{ padding: '30px 32px', maxWidth: 760, margin: '0 auto' }}>
            <div className="kicker" style={{ marginBottom: 10 }}>{t('missionTitle')}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0, color: 'var(--tx)' }}>{t('missionBody')}</p>
          </div>
        </section>

        <FeatureGrid items={values} />
        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/careers" />
      </main>
      <Footer />
    </>
  );
}
