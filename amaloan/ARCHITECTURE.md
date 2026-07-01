# AMALoan AI — Frontend architecture (designer handoff)

A precise map of the current frontend: every page, every section top-to-bottom,
which component renders it, and which file to edit to change it.

Stack: Next.js 15 (App Router) · TypeScript · Tailwind v4 · next-intl (11 locales) ·
Framer Motion. Design is dark-first "Plata steel" (obsidian + platinum/steel accent).

---

## 1. Where things live

```
amaloan/src/
├─ app/globals.css                 ← DESIGN SYSTEM: all colors, fonts, buttons, radii, sweep
├─ app/[locale]/
│  ├─ layout.tsx                    ← <html>, fonts, i18n provider, RTL, Tabler icons
│  ├─ page.tsx                      ← Landing (/)
│  ├─ how-it-works/page.tsx
│  ├─ lenders/page.tsx
│  ├─ developers/page.tsx
│  ├─ security/page.tsx
│  ├─ transparency/page.tsx
│  ├─ economics/page.tsx
│  ├─ docs/page.tsx
│  ├─ about/page.tsx
│  ├─ team/page.tsx
│  ├─ careers/page.tsx
│  ├─ blog/page.tsx
│  ├─ contact/page.tsx
│  ├─ legal/[doc]/page.tsx          ← terms / privacy / risk
│  └─ app/                          ← the product (wallet-gated UI)
│     ├─ layout.tsx                 ← AppShell wrapper
│     ├─ page.tsx                   ← Overview
│     ├─ lender/page.tsx            ← Lender vault
│     ├─ agent/page.tsx             ← Agent console (interactive sweep)
│     └─ ledger/page.tsx            ← Ledger
├─ components/marketing/            ← all reusable marketing blocks (see §3)
├─ components/app/AppShell.tsx      ← product sidebar + top bar
├─ i18n/{routing,request,navigation}.ts
├─ messages/<locale>.json           ← ALL TEXT lives here, one file per language
└─ lib/data/stats.ts               ← mock numbers for the stat band
```

Rule of thumb:
- Change a COLOR / FONT / BUTTON / SPACING token → `app/globals.css`
- Change TEXT / COPY → `messages/en.json` (then translate the other 10 files)
- Change a PAGE's section order / layout → that page's `page.tsx`
- Change a REUSABLE block → its file in `components/marketing/`

---

## 2. Design system — `app/globals.css`

This is the single source of truth. Everything references these variables.

Colors (`:root`):
- `--bg #0A0C10` page background (obsidian)
- `--el #10131A` elevated bg (footer, sidebar)
- `--s1 #151922` card background
- `--s2 #1C212B` inner surfaces (inputs, chips, sweep nodes)
- `--bd #272D39` borders · `--hair rgba(255,255,255,.07)` hairline borders
- `--gr #AEC0DC` ACCENT (steel) — numbers, links, icons, kickers
- `--gr2 #C9D4E6` accent bright · `--accent-soft` accent tint (icon chips)
- `--accent-grad` platinum gradient — PRIMARY BUTTONS + logo mark
- `--on-accent #11151E` dark text on the accent button
- `--tx #F2F5F9` primary text · `--tx2 #99A2AE` secondary · `--tx3 #5E6675` tertiary/hints

Fonts (set in `layout.tsx`, used via vars):
- `--font-display` Space Grotesk → headings (class `.disp`)
- `--font-sans` Inter → body (default)
- `--font-mono` JetBrains Mono → numbers, addresses, code (class `.mono`)

Helper classes: `.container` (max 1120px, 24px side padding) · `.disp` · `.mono` ·
`.muted`/`.faint` (text colors) · `.kicker` (small uppercase accent label) ·
`.btn` + `.btn-primary`/`.btn-ghost`/`.btn-sm` (pill buttons) · `.card` · `.badge` ·
sweep classes (`.sweep-node`, `.sweep-wire`, `.meter-bar`).

---

## 3. Reusable blocks (`components/marketing/`)

- `Navbar.tsx` — sticky top bar. Logo (» mark + "AMALoan AI"), 5 links
  (Product→/how-it-works, Developers, Lenders, Docs, Company→/about),
  `LocaleSwitcher`, "Open app" button. Background blurs/darkens on scroll.
- `Footer.tsx` — logo + tagline, 3 link columns (Product / Company / Trust),
  Contact emails, a row of 11 language pills, risk disclaimer + copyright.
- `LocaleSwitcher.tsx` — `<select>` of 11 language endonyms; switches locale in-place.
- `PageHero.tsx` — centered kicker + H1 + subtitle + soft radial glow. Used on every inner page.
- `CtaBand.tsx` — centered call-to-action card (title + body + one button).
- `Steps.tsx` — kicker? + H2 + N numbered step cards (number badge, title, body).
- `FeatureGrid.tsx` — kicker?/title? + N cards, each with an optional icon, title, body.
- `PoolCard.tsx` — pool name + big APY number + description (lenders pools).
- `StatBand.tsx` — 6-cell metric strip with animated count-up (TVL, APY, etc.). Data from `lib/data/stats.ts`.
- `SweepVisual.tsx` — the signature diagram: 3 nodes (x402 income → vault → agent),
  animated dots travelling the wires, a "loan repaid" meter bar.
- `HowItWorks.tsx` — landing's 3-step "income that repays itself" block.
- `AudienceCards.tsx` — landing's 2 cards: developer code snippet + lender 9.4% yield + trust chips.
- `LedgerFeed.tsx` — card with "live" badge + rows of on-chain events (sweep / loan / repaid / default + tx hash).
- `ContactForm.tsx` — name / email / message form; shows a "thanks" state on submit (no backend yet).

App: `components/app/AppShell.tsx` — left sidebar (logo + Overview/Lend/Borrow/Ledger)
+ top bar (devnet badge + Connect wallet) + centered content area (max 940px).

---

## 4. Marketing pages — section by section (top → bottom)

Every page is wrapped by `Navbar` (top) and `Footer` (bottom). Text per page lives
under a matching namespace in `messages/en.json` (named in brackets).

### Landing `/` — `app/[locale]/page.tsx`  [Hero, Stats, HowItWorks, Developers, Lenders]
1. `Hero` — left: badge, H1 "Credit for AI agents.", subtitle, 2 buttons (Start lending / Read the docs). right: `SweepVisual`.
2. `StatBand` — 6 animated metrics (total lent, value locked, lender APY, active loans, on-time, total swept).
3. `HowItWorks` — kicker + H2 + 3 step cards.
4. `AudienceCards` — 2 cards: developers (code) + lenders (9.4% + 3 trust chips).

### How it works `/how-it-works`  [HowItWorksPage, Hero, HowItWorks]
1. `PageHero` (centered title/subtitle).
2. centered `SweepVisual`.
3. `HowItWorks` (3 steps).
4. "first-claim" card — kicker + title + body + 3 feature columns (Non-custodial / Automatic / Fair).
5. `CtaBand`.

### Lenders `/lenders`  [LendersPage, Stats]
1. `PageHero`.
2. "Choose your risk" — 2 `PoolCard`s (Conservative 9.4% / Higher-yield 28%).
3. `Steps` — "How lending works" (3).
4. trust badges row (4: non-custodial vault / proof-of-reserves / audited / first-loss buffer).
5. `StatBand`.
6. `CtaBand`.

### Developers `/developers`  [DevelopersPage]
1. `PageHero`.
2. code-window card ("agent.ts" with the SDK snippet).
3. `Steps` — "Ship it in three steps".
4. 3 feature cards (Instant quotes / Non-custodial / Builds credit).
5. `CtaBand`.

### Security `/security`  [SecurityPage]
1. `PageHero`.
2. `FeatureGrid` — 6 pillars with icons (Non-custodial vaults, Timelock + multisig, Proof-of-reserves, Independent audit, Isolation + caps, Pause-only guardian).
3. "Don't trust, verify" card + 3 badges (Open-source / Verified on-chain / Public dashboard).
4. `CtaBand`.

### Transparency `/transparency`  [TransparencyPage, Stats]
1. `PageHero`.
2. `StatBand`.
3. Proof-of-reserves card — left text, right big "100%" coverage.
4. `LedgerFeed` — live event list.
5. `CtaBand`.

### Economics `/economics`  [EconomicsPage]
1. `PageHero`. 2. `Steps` (where yield comes from). 3. `FeatureGrid` (3: interest spread / origination fees / no Ponzi). 4. `CtaBand`.

### Docs `/docs`  [DocsPage]
1. `PageHero`. 2. `FeatureGrid` — 4 doc cards with icons (Quickstart / SDK / API / x402). 3. `CtaBand`.

### About `/about`  [AboutPage]
1. `PageHero`. 2. mission card (centered, big paragraph). 3. `FeatureGrid` (3 values). 4. `CtaBand`.

### Team `/team`  [TeamPage]
1. `PageHero`. 2. 4 member cards (initials avatar + name + role). 3. `CtaBand`.

### Careers `/careers`  [CareersPage]
1. `PageHero`. 2. roles list card (4 rows: title + meta + Apply). 3. `CtaBand`.

### Blog `/blog`  [BlogPage]
1. `PageHero`. 2. 3 post cards (tag pill + title + date + Read →). (no CTA band)

### Contact `/contact`  [ContactPage]
1. `PageHero`. 2. two columns: `ContactForm` + Direct info card (4 emails: hello@ / press@ / security@ / founders@).

### Legal `/legal/terms` `/legal/privacy` `/legal/risk`  [LegalPage]
1. `PageHero` (title = doc name, subtitle = "last updated"). 2. placeholder legal text paragraph.

---

## 5. App (product) screens — wrapped by `AppShell`

Sidebar nav: Overview · Lend · Borrow · Ledger. Top bar: "Solana devnet" + Connect wallet.

- Overview `/app` — H1 + 4 metric cards (deposit / earned / APY / active loans) + 3 quick-link cards.
- Lender vault `/app/lender` — position card (deposit/withdraw) + 4 pool stat cards + loan-book list.
- Agent console `/app/agent` — agent card (credit line) + active-loan card with progress bar
  and "Simulate x402 income" button (INTERACTIVE: each click splits a payment, repays the loan
  first, advances the bar, logs to the feed) + activity feed.
- Ledger `/app/ledger` — 4 metric cards + `LedgerFeed`.

App screens currently use mock data and are English-only (product i18n is a later pass).

---

## 6. i18n — why everything shows English right now

- 11 locales: en, es, pt-BR, fr, de, ja, ko, zh-Hans, ar (RTL), ru, tr.
- ALL text lives in `messages/<locale>.json`, keyed by namespace (Hero, LendersPage, …).
- IMPORTANT: `messages/en.json` is the real source. The other 10 files are currently
  EXACT COPIES of English — that is why nothing is actually translated yet.
- To translate: open each `messages/<locale>.json` and replace the English values with
  the translated values (keys stay identical). Arabic also drives RTL automatically.
- The locale-switcher (footer pills + navbar dropdown) already works; it just shows
  English text until the JSON files are translated.

---

## 7. "I want to change X → edit this file"

- Brand colors / accent / button look / corner radius / fonts → `app/globals.css`
- A page's wording / headlines → `messages/en.json` (namespace per §4) + translate copies
- A page's section order or layout → `app/[locale]/<route>/page.tsx`
- Top navigation links / logo → `components/marketing/Navbar.tsx`
- Footer columns / language pills → `components/marketing/Footer.tsx`
- The sweep diagram → `components/marketing/SweepVisual.tsx` (+ sweep classes in globals.css)
- The stat numbers → `lib/data/stats.ts`
- The product sidebar / app chrome → `components/app/AppShell.tsx`
- A reusable block (Steps, FeatureGrid, PoolCard, CtaBand, PageHero) → its file in `components/marketing/`

---

## 8. Known rough spots for the designer to address (honest)

- Typography hierarchy and vertical rhythm are basic — heading sizes/spacing per section need a real scale.
- Sections are text-on-dark cards; there is NO imagery / illustration / product screenshots yet — pages feel sparse.
- Inner pages reuse the same `PageHero` + cards pattern, so they look similar — each needs a distinct hero/visual.
- Mobile layout is functional (auto-fit grids) but not hand-tuned (nav has no mobile menu yet).
- Translations are placeholders (English copies) — see §6.
- App screens are mock UI; real states (empty/loading/error), wallet connect, and live data are not built.
