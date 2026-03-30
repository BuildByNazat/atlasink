# AtlasInk — Branding Assets Replacement Checklist

All code, metadata, and copy are fully rebranded. This file tracks the remaining
visual asset replacements. Do not delete any file listed here until a replacement is
ready. The app will still load from the existing assets in the meantime.

---

## Priority Legend

| Symbol | Meaning |
| --- | --- |
| 🔴 HIGH | Visible in the live app UI or shared in OG/social previews. Blocks public launch. |
| 🟡 MEDIUM | Visible in README or docs on GitHub. Important for brand impression. |
| 🟢 LOW | Internal tooling references or secondary marketing content. |

---

## Runtime Assets — Required for the App to Work

These files are referenced directly by the app at runtime. The app loads
successfully with the current files, but they visually show the previous brand.

### 🔴 `public/assets/logo.svg`

| Field | Detail |
| --- | --- |
| **Current path** | `public/assets/logo.svg` |
| **Used in** | `src/shared/ui/GeneralHeader.tsx` (desktop header logo), `src/features/location/ui/StartupLocationModal.tsx` (onboarding screen logo), `index.html` (SVG favicon, Safari mask icon) |
| **Runtime required** | ✅ Yes — missing file breaks the header and onboarding screen |
| **Replacement** | AtlasInk wordmark or logomark as SVG. Should degrade gracefully on dark and light backgrounds. File must remain at the same path. |
| **Priority** | 🔴 HIGH |

---

### 🔴 `public/assets/marker.svg`

| Field | Detail |
| --- | --- |
| **Current path** | `public/assets/marker.svg` |
| **Used in** | `src/features/markers/infrastructure/iconRegistry.ts` — registered as the default "AtlasInk" memory pin icon visible on the canvas |
| **Runtime required** | ✅ Yes — the default pin icon in the Symbol Library uses this file. Missing it causes a broken image in the memory picker and on the exported poster. |
| **Replacement** | A custom AtlasInk-branded map pin SVG. Should work when tinted (used with `tintWithMarkerColor: true`). Recommend a simple, clean pin silhouette. |
| **Note** | `logo.svg` and `marker.svg` are currently identical files (both 5726 bytes). They were likely the same asset. Replace independently with purpose-specific designs. |
| **Priority** | 🔴 HIGH |

---

### 🔴 PWA Icons — `icon-192.png`, `icon-512.png`, `icon-maskable.png`

| Field | Detail |
| --- | --- |
| **Current paths** | `public/assets/icon-192.png`, `public/assets/icon-512.png`, `public/assets/icon-maskable.png` |
| **Used in** | `public/site.webmanifest` (PWA install icons), `public/sw.js` (app shell cache), `index.html` (manifest link) |
| **Runtime required** | ✅ Yes — shown on device home screens when the app is installed as a PWA |
| **Replacement** | AtlasInk icon at 192×192 and 512×512 PNG. The maskable icon (`icon-maskable.png`) must include safe-zone padding per PWA maskable icon spec. All three must remain at the same paths. |
| **Priority** | 🔴 HIGH |

---

### 🔴 Favicons — `favicon-32.png`, `favicon-16.png`

| Field | Detail |
| --- | --- |
| **Current paths** | `public/assets/favicon-32.png`, `public/assets/favicon-16.png` |
| **Used in** | `index.html` (browser tab icon), `public/sw.js` (app shell cache), `public/site.webmanifest` |
| **Runtime required** | ✅ Yes — visible in browser tab and bookmark |
| **Replacement** | AtlasInk icon at 32×32 and 16×16 PNG, derived from the same logomark as the PWA icons. |
| **Priority** | 🔴 HIGH |

---

### 🔴 Apple Touch Icon — `apple-touch-icon.png`

| Field | Detail |
| --- | --- |
| **Current path** | `public/assets/apple-touch-icon.png` |
| **Used in** | `index.html` (iOS home screen icon), `public/sw.js` (app shell cache) |
| **Runtime required** | ✅ Yes — shown when the app is saved to an iOS home screen |
| **Replacement** | AtlasInk icon at 180×180 PNG with no transparency (iOS requires solid background). |
| **Priority** | 🔴 HIGH |

---

## Social / Marketing Assets — Not Runtime but Publicly Visible

### 🟡 `public/assets/banner.png`

| Field | Detail |
| --- | --- |
| **Current path** | `public/assets/banner.png` |
| **Used in** | `README.md` (top banner), `index.html` OG image (`og:image`), Twitter Card image, JSON-LD screenshot — served publicly at `https://atlasink.app/assets/banner.png` |
| **Runtime required** | ❌ No — the app runs without it, but social share previews and README will show the wrong brand |
| **Replacement** | AtlasInk social banner at 1200×630 px (standard OG size). Should show the AtlasInk logo, tagline "Turn places into art.", and a sample poster output. |
| **Priority** | 🟡 MEDIUM |

---

## Docs / GitHub-only Assets

### 🟡 `public/assets/screenshots/Web_UI.png`

| Field | Detail |
| --- | --- |
| **Current path** | `public/assets/screenshots/Web_UI.png` |
| **Used in** | `README.md` — "User Interface" section |
| **Runtime required** | ❌ No — docs only |
| **Replacement** | A clean screenshot of the AtlasInk UI with the new branding visible (updated nav labels, Place/Style/Terrain tabs, etc.). |
| **Priority** | 🟡 MEDIUM |

---

### 🟢 `public/assets/showcase/showcase_1.png`, `showcase_2.png`

| Field | Detail |
| --- | --- |
| **Current paths** | `public/assets/showcase/showcase_1.png`, `public/assets/showcase/showcase_2.png` |
| **Used in** | `README.md` — "Showcase" section. Also used by the `scripts/combine-showcase-grid.mjs` script. |
| **Runtime required** | ❌ No — marketing and docs only |
| **Replacement** | Example AtlasInk poster exports showing real output: a city print, a memory map, etc. These are the product's strongest visual proof — use high-quality exports. |
| **Priority** | 🟢 LOW |

---

## Summary Table

| Asset | Path | Runtime | Priority |
| --- | --- | --- | --- |
| Logo | `public/assets/logo.svg` | ✅ | 🔴 HIGH |
| Default pin icon | `public/assets/marker.svg` | ✅ | 🔴 HIGH |
| PWA icon 192px | `public/assets/icon-192.png` | ✅ | 🔴 HIGH |
| PWA icon 512px | `public/assets/icon-512.png` | ✅ | 🔴 HIGH |
| PWA maskable icon | `public/assets/icon-maskable.png` | ✅ | 🔴 HIGH |
| Favicon 32px | `public/assets/favicon-32.png` | ✅ | 🔴 HIGH |
| Favicon 16px | `public/assets/favicon-16.png` | ✅ | 🔴 HIGH |
| Apple touch icon | `public/assets/apple-touch-icon.png` | ✅ | 🔴 HIGH |
| Social banner | `public/assets/banner.png` | ❌ | 🟡 MEDIUM |
| UI screenshot | `public/assets/screenshots/Web_UI.png` | ❌ | 🟡 MEDIUM |
| Showcase 1 | `public/assets/showcase/showcase_1.png` | ❌ | 🟢 LOW |
| Showcase 2 | `public/assets/showcase/showcase_2.png` | ❌ | 🟢 LOW |

---

## Notes

- All file **paths are locked** — do not rename or move any of these files. All
  path references in `index.html`, `site.webmanifest`, `sw.js`, and source code
  point to these exact paths.
- `logo.svg` and `marker.svg` currently share identical file content. Replace
  them independently: one as a wordmark/logomark, one as a purpose-built pin
  silhouette for use on the canvas.
- The maskable icon must follow the
  [PWA maskable icon safe zone spec](https://web.dev/maskable-icon/) — the
  logo should stay within the central 80% of the canvas.
- After replacing any HIGH asset, increment `CACHE_NAME` in `public/sw.js`
  (e.g. `atlasink-static-v2`) so returning users get the updated files and
  the old icons are evicted from the service worker cache.

---

_Last updated: 2026-03-30_
