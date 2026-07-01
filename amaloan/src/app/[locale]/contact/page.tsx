import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';
import ContactForm from '@/components/marketing/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ContactPage');

  const directs = [
    { label: t('general'), email: 'hello@amaloan.ai' },
    { label: t('press'), email: 'press@amaloan.ai' },
    { label: t('security'), email: 'security@amaloan.ai' },
    { label: t('founders'), email: 'founders@amaloan.ai' },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <section className="container" style={{ padding: '12px 24px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, alignItems: 'start' }}>
            <ContactForm name={t('formName')} email={t('formEmail')} msg={t('formMsg')} send={t('formSend')} note={t('formNote')} />
            <div className="card" style={{ padding: 24 }}>
              <div className="kicker" style={{ marginBottom: 12 }}>{t('infoTitle')}</div>
              {directs.map((d, i) => (
                <div
                  key={d.email}
                  style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '11px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hair)' }}
                >
                  <span className="muted" style={{ fontSize: 14 }}>{d.label}</span>
                  <span className="mono" style={{ fontSize: 13, color: 'var(--gr)' }}>{d.email}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
