# Design Tokens & Style Guide — GritDesk (working name)

Status: v1 — UX-UI-Designer-Squad, TSK-003. Working product name is "GritDesk" pending
TSK-001's brand-name outcome (Researcher-Squad); token names below are brand-agnostic (`brand`,
`ink`, etc.) so a rename doesn't require restructuring this file.

## 1. Design Principles

GritDesk is B2B software for professional coaches (life/business/executive/fitness), not a
consumer self-help app. Every token below is chosen to read **credible, calm, and operational** —
the visual opposite of gamified consumer habit-trackers (no badges, confetti, or neon streak
counters). The coach is triaging real client relationships; the UI should feel like a trustworthy
instrument, not a game.

- **Legible over decorative.** Coaches scan a dashboard between client calls. Optimize for fast
  scanning (dashboard row density, risk-flag glanceability) over visual flourish.
- **Calm neutrals, one confident accent.** A muted slate/navy neutral system with a single teal
  accent for actions, so the risk-flag semantic colors (amber/red) stand out unambiguously and
  aren't competing with a busy brand palette.
- **Restrained motion & ornament.** Subtle, not playful. Rounded corners are moderate (professional
  software, not consumer app); no heavy skeuomorphism or bouncy easing.

## 2. Color Palette

### 2.1 Brand / Neutral scale ("ink")

Cool slate-navy neutral, used for text, surfaces, and borders. Doubles as the low-saturation base
the brand accent sits on top of.

| Token       | Hex       | Usage                                  |
|-------------|-----------|-----------------------------------------|
| `ink-50`    | `#F7F8FA` | App background                          |
| `ink-100`   | `#EEF1F5` | Card / panel background                 |
| `ink-200`   | `#E2E6ED` | Borders, dividers                       |
| `ink-300`   | `#C7CEDA` | Disabled borders, subtle icons          |
| `ink-400`   | `#9AA5B8` | Placeholder text, muted icons           |
| `ink-500`   | `#6B7690` | Secondary text                          |
| `ink-600`   | `#4C5670` | Body text (secondary emphasis)          |
| `ink-700`   | `#333B52` | Body text (default)                     |
| `ink-800`   | `#1F2538` | Headings                                |
| `ink-900`   | `#12151F` | Highest-emphasis text, dark surfaces    |

### 2.2 Brand accent ("teal")

Primary interactive color — buttons, links, active nav states, focus rings. Deliberately not blue
(too generic-SaaS) or purple (too consumer-startup); a deep teal reads professional/financial
without being cold.

| Token        | Hex       | Usage                                   |
|--------------|-----------|-------------------------------------------|
| `brand-50`   | `#ECFAF8` | Accent-tinted backgrounds                 |
| `brand-100`  | `#D2F1EC` | Hover backgrounds on light surfaces       |
| `brand-300`  | `#7DD3C4` | Decorative accents, chart secondary       |
| `brand-500`  | `#149685` | Default accent (icons, links)             |
| `brand-600`  | `#0F7A6C` | Primary button, primary CTA               |
| `brand-700`  | `#0C6255` | Primary button hover/active               |
| `brand-900`  | `#053F36` | High-contrast accent text on light bg     |

### 2.3 Semantic — Risk Flags

These three are the product's core differentiator (AI-flagged disengagement risk on the coach
dashboard) — treat as reserved colors. **Never reuse amber/red for anything except risk state or
destructive actions**, so a coach scanning the dashboard reads them unambiguously at a glance.

| Token          | Hex       | Usage                                         |
|----------------|-----------|-------------------------------------------------|
| `risk-low`     | `#1A8A5F` | LOW risk badge (green — client engaged)         |
| `risk-low-bg`  | `#E4F5EC` | LOW risk badge background                       |
| `risk-medium`  | `#B5790A` | MEDIUM risk badge (amber — watch)               |
| `risk-medium-bg`| `#FBF0DC`| MEDIUM risk badge background                    |
| `risk-high`    | `#C23B3B` | HIGH risk badge (red — needs attention now)     |
| `risk-high-bg` | `#FBE6E6` | HIGH risk badge background                      |

### 2.4 Semantic — System feedback

| Token          | Hex       | Usage                                  |
|----------------|-----------|------------------------------------------|
| `success`      | `#1A8A5F` | Confirmation toasts, success states (= `risk-low`) |
| `warning`      | `#B5790A` | Non-destructive warnings (= `risk-medium`) |
| `danger`       | `#C23B3B` | Destructive actions, errors (= `risk-high`) |
| `info`         | `#149685` | Informational banners (= `brand-500`)  |

Reusing the risk-flag hexes for generic system feedback is intentional (fewer colors to hold in
mind) — the *context* (badge on a client row vs. a toast) disambiguates meaning, not the hue.

## 3. Typography

Single typeface family to keep the tone calm and consistent — no display/serif pairing. Coaches
are professionals scanning data, not consumers browsing a lifestyle brand.

- **Font family:** [Inter](https://fonts.google.com/specimen/Inter) (`font-sans`), fallback
  `ui-sans-serif, system-ui, -apple-system, sans-serif`. Variable font, use weights 400/500/600/700
  only — avoid 300/800+ (too thin/heavy for dense dashboard UI).
- **Numeric/tabular data** (streaks, client counts, dashboard stats): apply `tabular-nums` so
  numbers align in columns.

### Type scale

| Token        | Size / Line-height | Weight | Usage                                  |
|--------------|---------------------|--------|-------------------------------------------|
| `text-xs`    | 12px / 16px         | 500    | Badges, meta labels, timestamps           |
| `text-sm`    | 14px / 20px         | 400    | Secondary body text, table cells          |
| `text-base`  | 16px / 24px         | 400    | Default body text                         |
| `text-lg`    | 18px / 28px         | 500    | Card titles, emphasized body              |
| `text-xl`    | 20px / 28px         | 600    | Section headings                          |
| `text-2xl`   | 24px / 32px         | 600    | Page titles (dashboard, settings)         |
| `text-3xl`   | 30px / 36px         | 700    | Marketing hero subheading                 |
| `text-4xl`   | 36px / 44px         | 700    | Marketing hero headline (desktop)         |
| `text-5xl`   | 48px / 56px         | 700    | Marketing hero headline (large desktop)   |

## 4. Spacing Scale

Standard 4px base unit (Tailwind default scale) — reused as-is, no custom override needed. Called
out here so component specs have a shared vocabulary:

`0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px),
16 (64px), 20 (80px), 24 (96px)`

- **Dashboard row/card padding:** `4` (16px) internal, `6` (24px) between cards.
- **Form field spacing:** `4` (16px) vertical gap between fields, `2` (8px) label-to-input gap.
- **Page margins:** `6` (24px) mobile, `12` (48px) desktop, capped at a `max-w-7xl` (1280px)
  content container.

## 5. Radius, Elevation, Borders

Moderate, not playful — professional SaaS rounding, not consumer-app bubbliness.

| Token          | Value    | Usage                                    |
|----------------|----------|---------------------------------------------|
| `radius-sm`    | 6px      | Badges, inputs, small buttons               |
| `radius-md`    | 8px      | Cards, buttons, dropdowns (default)         |
| `radius-lg`    | 12px     | Modals, large panels                        |
| `radius-full`  | 9999px   | Avatar circles, pill badges (risk flags)    |

| Token          | Value                                          | Usage                        |
|----------------|-------------------------------------------------|-------------------------------|
| `shadow-sm`    | `0 1px 2px 0 rgb(18 21 31 / 0.05)`             | Cards at rest                 |
| `shadow-md`    | `0 4px 8px -2px rgb(18 21 31 / 0.08)`          | Dropdowns, popovers            |
| `shadow-lg`    | `0 12px 24px -4px rgb(18 21 31 / 0.12)`        | Modals                         |

Borders: default `1px solid ink-200`; focus rings use `brand-500` at 2px with a 2px offset (not a
glow/blur) for a crisp, accessible focus state.

## 6. Component Tone Notes

- **Buttons:** solid `brand-600` primary, `ink-100` bg / `ink-700` text secondary, `radius-md`.
  No gradients, no drop shadows on default state (shadow only appears on hover/elevation change).
- **Risk badges:** pill shape (`radius-full`), colored background + colored text (not white text
  on saturated fill — softer, more "data label" than "warning siren").
- **Streak indicator:** plain numeric + "week streak" label in `ink-600`, no flame/fire iconography
  or gamified badge art — this is the one place consumer habit-apps most visibly signal "not
  serious software," so we deliberately avoid it.
- **Forms (client check-in page):** large touch targets (min 44px height), generous spacing,
  single-column, since clients fill this on mobile with zero onboarding/context.
- **Empty states:** plain-language, no illustrations required for v1 — a short sentence + primary
  CTA is enough (e.g. "No clients yet — invite your first client to get started").

## 7. Accessibility Notes

- All `ink-700`-on-`ink-50` and `brand-600`-on-white text combinations meet WCAG AA (4.5:1) for
  body text at the sizes specified above.
- Risk-flag colors were chosen to remain distinguishable for the most common forms of color-vision
  deficiency (deuteranopia/protanopia) at the green/amber/red trio — but the risk badge component
  must **always pair color with a text label** ("Low" / "Medium" / "High"), never color alone.
- Focus states must be visible on every interactive element (see `radius`/border section) — no
  `outline: none` without a replacement focus style.

## 8. Implementation

See `design/tailwind.config.snippet.js` for the Tailwind v3 `theme.extend` block Engineer-Squad
can merge directly into the scaffolded Next.js app's `tailwind.config.js` (TSK-005).
