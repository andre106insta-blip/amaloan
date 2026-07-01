import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import CtaBand from '@/components/marketing/CtaBand';

const MEMBERS = [
  { n: 'AM', name: 'Founder', role: 'Protocol & strategy' },
  { n: 'SK', name: 'Lead engineer', role: 'Solana / Rust' },
  { n: 'JD', name: 'Engineer', role: 'Frontend / product' },
  { n: 'RL', name: 'Growth', role: 'Community & BD' },
];

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('TeamPage');

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <section className="container" style={{ padding: '12px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {MEMBERS.map((m) => (
              <div key={m.name} className="card" style={{ padding: 22, textAlign: 'center' }}>
                <div
                  className="mono"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    margin: '0 auto 12px',
                    background: 'var(--accent-soft)',
                    color: 'var(--gr)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  {m.n}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{m.name}</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>{m.role}</div>
              </div>
            ))}
          </div>
        </section>
        <CtaBand title={t('joinTitle')} body={t('joinBody')} btn={t('joinBtn')} href="/careers" />
      </main>
      <Footer />
    </>
  );
}
