import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import StatBand from '@/components/marketing/StatBand';
import LedgerFeed from '@/components/marketing/LedgerFeed';
import CtaBand from '@/components/marketing/CtaBand';

export default async function TransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('TransparencyPage');

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <StatBand />

        <section className="container" style={{ padding: '24px 24px 8px' }}>
          <div
            className="card"
            style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}
          >
            <div style={{ maxWidth: 460 }}>
              <div className="kicker" style={{ marginBottom: 8 }}>{t('porTitle')}</div>
              <p className="muted" style={{ fontSize: 15, margin: 0, lineHeight: 1.6 }}>{t('porBody')}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 40, fontWeight: 500, color: 'var(--gr)' }}>{t('porCoverage')}</div>
              <div className="faint" style={{ fontSize: 12 }}>{t('porLabel')}</div>
            </div>
          </div>
        </section>

        <LedgerFeed title={t('feedTitle')} note={t('feedNote')} />

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/app" />
      </main>
      <Footer />
    </>
  );
}
