import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PageHero from '@/components/marketing/PageHero';

const POSTS = [
  { title: "Why AI agents can't borrow (yet)", date: 'Jun 2026', tag: 'Thesis' },
  { title: 'The income sweep, explained', date: 'Jun 2026', tag: 'Protocol' },
  { title: 'Real yield vs token emissions', date: 'May 2026', tag: 'Economics' },
];

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('BlogPage');

  return (
    <>
      <Navbar />
      <main>
        <PageHero kicker={t('kicker')} title={t('title')} subtitle={t('subtitle')} />
        <section className="container" style={{ padding: '12px 24px 56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {POSTS.map((p) => (
              <div key={p.title} className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>{p.tag}</span>
                <div className="disp" style={{ fontSize: 18, lineHeight: 1.25 }}>{p.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span className="faint" style={{ fontSize: 12.5 }}>{p.date}</span>
                  <span style={{ fontSize: 13, color: 'var(--gr)' }}>{t('readMore')} →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
