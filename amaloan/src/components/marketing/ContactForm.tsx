'use client';

import { useState } from 'react';

const inp: React.CSSProperties = {
  background: 'var(--s2)',
  border: '1px solid var(--bd)',
  borderRadius: 10,
  padding: '11px 13px',
  color: 'var(--tx)',
  fontSize: 14,
  fontFamily: 'inherit',
  width: '100%',
};

export default function ContactForm({
  name,
  email,
  msg,
  send,
  note,
}: {
  name: string;
  email: string;
  msg: string;
  send: string;
  note: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card" style={{ padding: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 26, color: 'var(--gr)', marginBottom: 8 }}>
          <i className="ti ti-circle-check" aria-hidden="true" />
        </div>
        <div className="disp" style={{ fontSize: 18, marginBottom: 6 }}>Thanks — message sent.</div>
        <p className="muted" style={{ fontSize: 14, margin: 0 }}>{note}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="card"
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className="faint" style={{ fontSize: 12.5 }}>{name}</span>
        <input type="text" required style={inp} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className="faint" style={{ fontSize: 12.5 }}>{email}</span>
        <input type="email" required style={inp} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className="faint" style={{ fontSize: 12.5 }}>{msg}</span>
        <textarea required rows={4} style={{ ...inp, resize: 'vertical' }} />
      </label>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>{send}</button>
      <p className="faint" style={{ fontSize: 12, margin: 0 }}>{note}</p>
    </form>
  );
}
