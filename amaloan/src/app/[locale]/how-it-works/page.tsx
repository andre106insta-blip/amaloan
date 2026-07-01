import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import HowItWorks from '@/components/marketing/HowItWorks';
import SweepVisual from '@/components/marketing/SweepVisual';
import CtaBand from '@/components/marketing/CtaBand';

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HowItWorksPage');

  const features = [
    { title: t('f1Title'), body: t('f1Body') },
    { title: t('f2Title'), body: t('f2Body') },
    { title: t('f3Title'), body: t('f3Body') },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />

        <section className="container" style={{ padding: '20px 24px 8px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 560 }}>
            <SweepVisual />
          </div>
        </section>

        <HowItWorks />

        <section className="container" style={{ padding: '40px 24px' }}>
          <div className="card" style={{ padding: '28px 30px' }}>
            <div className="kicker" style={{ marginBottom: 8 }}>first-claim</div>
            <h2 className="disp" style={{ fontSize: 22, margin: '0 0 10px' }}>{t('claimTitle')}</h2>
            <p className="muted" style={{ fontSize: 15, maxWidth: 640, margin: 0, lineHeight: 1.6 }}>{t('claimBody')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginTop: 24 }}>
              {features.map((f) => (
                <div key={f.title} style={{ borderTop: '1px solid var(--hair)', paddingTop: 14 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>{f.title}</div>
                  <div className="muted" style={{ fontSize: 13 }}>{f.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/docs" />
      </main>
      <Footer />
    </>
  );
}
