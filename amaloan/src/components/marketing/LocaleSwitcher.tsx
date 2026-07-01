'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeNames } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span className="mono" style={{ position: 'absolute', left: 12, fontSize: 12, color: 'var(--tx2)', pointerEvents: 'none' }}>
        {localeNames[locale] ?? locale}
      </span>
      <select
        aria-label="Language"
        value={locale}
        onChange={onChange}
        disabled={isPending}
        style={{
          appearance: 'none',
          background: 'transparent',
          color: 'transparent',
          border: '1px solid var(--bd)',
          borderRadius: 999,
          padding: '7px 30px 7px 12px',
          fontSize: 12,
          cursor: 'pointer',
          minWidth: 96,
        }}
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} style={{ color: '#111' }}>
            {localeNames[l] ?? l}
          </option>
        ))}
      </select>
      <span style={{ position: 'absolute', right: 12, color: 'var(--tx2)', pointerEvents: 'none', fontSize: 11 }}>▾</span>
    </label>
  );
}
