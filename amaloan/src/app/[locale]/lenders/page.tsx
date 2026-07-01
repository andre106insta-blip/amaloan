import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import Steps from '@/components/marketing/Steps';
import PoolCard from '@/components/marketing/PoolCard';
import StatBand from '@/components/marketing/StatBand';
import CtaBand from '@/components/marketing/CtaBand';

export default async function LendersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LendersPage');

  const steps = [
    { n: '1', title: t('s1Title'), body: t('s1Body') },
    { n: '2', title: t('s2Title'), body: t('s2Body') },
    { n: '3', title: t('s3Title'), body: t('s3Body') },
  ];
  const trust = [t('trustNonCustodial'), t('trustPor'), t('trustAudited'), t('trustBuffer')];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />

        <section className="container" style={{ padding: '20px 24px' }}>
          <div className="kicker" style={{ marginBottom: 16, textAlign: 'center' }}>{t('poolsTitle')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <PoolCard name={t('poolConsName')} apy={t('poolConsApy')} desc={t('poolConsDesc')} accent />
            <PoolCard name={t('poolHighName')} apy={t('poolHighApy')} desc={t('poolHighDesc')} delay={0.08} />
          </div>
        </section>

        <Steps title={t('stepsTitle')} items={steps} />

        <section className="container" style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {trust.map((x) => (
              <span key={x} className="badge">{x}</span>
            ))}
          </div>
        </section>

        <StatBand />

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} btn={t('ctaBtn')} href="/app" />
      </main>
      <Footer />
    </>
  );
}
