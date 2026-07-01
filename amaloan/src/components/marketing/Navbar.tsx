'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';

const LINKS = [
  { href: '/how-it-works', key: 'product' },
  { href: '/developers', key: 'developers' },
  { href: '/lenders', key: 'lenders' },
  { href: '/docs', key: 'docs' },
  { href: '/about', key: 'company' },
] as const;

export default function Navbar() {
  const t = useTranslations('Nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const logo = (
    <Link href="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span
        style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-grad)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18 }}
      >
        »
      </span>
      <span className="disp" style={{ fontSize: 16 }}>
        AMALoan<span className="faint" style={{ fontWeight: 400 }}>AI</span>
      </span>
    </Link>
  );

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 60, padding: scrolled ? '8px 0' : '14px 0', transition: 'padding 0.25s ease' }}>
        <div className="container">
          <nav
            className="glass-steel"
            aria-label="Main navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              borderRadius: 999,
              padding: scrolled ? '8px 10px 8px 16px' : '11px 12px 11px 18px',
              transition: 'padding 0.25s ease',
              boxShadow: scrolled ? '0 10px 34px rgba(0,0,0,0.38)' : 'none',
            }}
          >
            {logo}
            <div className="nav-desktop" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <div className="muted" style={{ display: 'flex', gap: 16, marginInlineEnd: 6 }}>
                {LINKS.map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 14 }}>{t(l.key)}</Link>
                ))}
              </div>
              <LocaleSwitcher />
              <Link href="/app" className="btn btn-primary btn-sm">{t('openApp')}</Link>
            </div>
            <button
              className="nav-burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              style={{ marginInlineStart: 'auto', background: 'transparent', border: 'none', color: 'var(--tx)', cursor: 'pointer', padding: 8, fontSize: 22, alignItems: 'center' }}
            >
              <i className={`ti ${open ? 'ti-x' : 'ti-menu-2'}`} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 55, background: 'rgba(8,9,12,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'absolute', insetBlock: 0, insetInlineEnd: 0, width: 'min(86%, 340px)', background: 'var(--el)', borderInlineStart: '1px solid var(--hair)', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                {logo}
                <button aria-label="Close menu" onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--tx2)', fontSize: 22, cursor: 'pointer' }}>
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>
              {LINKS.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '13px 4px', fontSize: 17, borderBottom: '1px solid var(--hair)' }}>
                    {t(l.key)}
                  </Link>
                </motion.div>
              ))}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <LocaleSwitcher />
                <Link href="/app" onClick={() => setOpen(false)} className="btn btn-primary" style={{ justifyContent: 'center' }}>{t('openApp')}</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
