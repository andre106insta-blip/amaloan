import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import CtaBand from '@/components/marketing/CtaBand';

const ROLES = [
  { title: 'Senior Solana / Rust engineer', meta: 'Remote · Full-time' },
  { title: 'Frontend engineer (Next.js)', meta: 'Remote · Full-time' },
  { title: 'Growth lead', meta: 'Remote · Full-time' },
  { title: 'Product designer', meta: 'Remote · Contract' },
];

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('CareersPage');

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <section className="container" style={{ padding: '12px 24px' }}>
          <div className="kicker" style={{ marginBottom: 14 }}>{t('rolesTitle')}</div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {ROLES.map((r, i) => (
              <div
                key={r.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '16px 22px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--hair)',
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{r.title}</div>
                  <div className="faint" style={{ fontSize: 12.5, marginTop: 2 }}>{r.meta}</div>
                </div>
                <span className="btn btn-ghost btn-sm">{t('apply')}</span>
              </div>
            ))}
          </div>
        </section>
        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/contact" />
      </main>
      <Footer />
    </>
  );
}
