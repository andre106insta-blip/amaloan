import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';

export function generateStaticParams() {
  return [{ doc: 'terms' }, { doc: 'privacy' }, { doc: 'risk' }];
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; doc: string }> }) {
  const { locale, doc } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('LegalPage');

  const titles: Record<string, string> = {
    terms: t('termsTitle'),
    privacy: t('privacyTitle'),
    risk: t('riskTitle'),
  };
  const title = titles[doc] ?? titles.terms;

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={title} subtitle={t('updated')} />
        <section className="container" style={{ padding: '8px 24px 56px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="muted" style={{ fontSize: 15, lineHeight: 1.75 }}>{t('placeholder')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
