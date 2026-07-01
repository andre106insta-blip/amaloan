import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import FeatureGrid from '@/components/marketing/FeatureGrid';
import CtaBand from '@/components/marketing/CtaBand';

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SecurityPage');

  const pillars = [
    { icon: 'ti-lock', title: t('p1Title'), body: t('p1Body') },
    { icon: 'ti-clock-hour-4', title: t('p2Title'), body: t('p2Body') },
    { icon: 'ti-shield-check', title: t('p3Title'), body: t('p3Body') },
    { icon: 'ti-certificate', title: t('p4Title'), body: t('p4Body') },
    { icon: 'ti-layout-grid', title: t('p5Title'), body: t('p5Body') },
    { icon: 'ti-player-pause', title: t('p6Title'), body: t('p6Body') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <FeatureGrid title={t('pillarsTitle')} items={pillars} />

        <section className="container" style={{ padding: '8px 24px 24px' }}>
          <div className="card" style={{ padding: '28px 30px' }}>
            <div className="kicker" style={{ marginBottom: 8 }}>verify</div>
            <h2 className="disp" style={{ fontSize: 22, margin: '0 0 10px' }}>{t('verifyTitle')}</h2>
            <p className="muted" style={{ fontSize: 15, maxWidth: 640, margin: 0, lineHeight: 1.6 }}>{t('verifyBody')}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <span className="badge"><i className="ti ti-brand-github" aria-hidden="true" /> Open-source</span>
              <span className="badge"><i className="ti ti-link" aria-hidden="true" /> Verified on-chain</span>
              <span className="badge"><i className="ti ti-eye" aria-hidden="true" /> Public dashboard</span>
            </div>
          </div>
        </section>

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/docs" />
      </main>
      <Footer />
    </>
  );
}
