import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import Steps from '@/components/marketing/Steps';
import CtaBand from '@/components/marketing/CtaBand';

const SNIPPET = `import { Float } from "@amaloan/sdk";

// install the first-claim sweep module once
await Float.installSweep(agent.account);

// borrow the moment you need working capital
const loan = await Float.borrow({
  amount: 50,        // USDC
  term: "2d",
});

// ...your agent works, gets paid via x402...
// income auto-repays the loan, remainder forwards to you.`;

export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('DevelopersPage');

  const steps = [
    { n: '1', title: t('s1Title'), body: t('s1Body') },
    { n: '2', title: t('s2Title'), body: t('s2Body') },
    { n: '3', title: t('s3Title'), body: t('s3Body') },
  ];
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

        <section className="container" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: 640, padding: 4, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid var(--hair)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--bd)' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--bd)' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--bd)' }} />
              <span className="mono faint" style={{ fontSize: 12, marginLeft: 6 }}>agent.ts</span>
            </div>
            <pre
              className="mono"
              style={{ margin: 0, padding: '16px 18px', fontSize: 12.5, color: 'var(--tx2)', lineHeight: 1.75, overflow: 'auto', background: 'var(--bg)' }}
            >
              {SNIPPET}
            </pre>
          </div>
        </section>

        <Steps title={t('stepsTitle')} items={steps} />

        <section className="container" style={{ padding: '0 24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {features.map((f) => (
              <div key={f.title} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{f.title}</div>
                <div className="muted" style={{ fontSize: 13, lineHeight: 1.55 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </section>

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/docs" />
      </main>
      <Footer />
    </>
  );
}
