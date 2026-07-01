'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CtaBand({
  title,
  body,
  btn,
  href,
}: {
  title: string;
  body: string;
  btn: string;
  href: string;
}) {
  return (
    <section className="container" style={{ padding: '24px 24px 64px' }}>
      <motion.div
        className="card"
        style={{ padding: '40px 32px', textAlign: 'center', background: 'var(--el)' }}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h2 className="disp" style={{ fontSize: 26, margin: '0 0 8px' }}>{title}</h2>
        <p className="muted" style={{ fontSize: 15, margin: '0 0 22px' }}>{body}</p>
        <Link href={href} className="btn btn-primary">{btn}</Link>
      </motion.div>
    </section>
  );
}
