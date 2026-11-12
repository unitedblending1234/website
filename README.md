# United Blending Pte Ltd — Website

Marketing site for United Blending Pte Ltd, Singapore. Steel drums, HDPE drums,
IBCs, jerrycans and pallets.

## Stack

Plain static HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html        Home page
contact.html      Contact page + quote form
main.js           Preloader, hero film sequence, About word reveal, scroll reveals, product slider
hero-barrel.js    3D drum (Three.js): lands in the hero, then falls with scroll
assets/i18n.js    Language switcher + all translations
assets/           Images, video, logos
```

## Running locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deployment

Deployed on Vercel as a static site. Pushing to `main` triggers a deploy.
No framework preset or build command is required — Vercel serves the repo root.

## Editing common things

| What | Where |
|---|---|
| Hero video | `assets/hero-jurong.mp4` (poster `hero-jurong-poster.jpg`) |
| 3D drum | `assets/drum.glb` |
| Industry photos | `assets/ind-*.jpg` |
| Product photos | `assets/steel.jpg`, `hdpe.jpg`, `ibc.jpg`, `jerrycans.jpg`, `pallets.jpg` |
| Section backgrounds | `assets/location.jpg`, `rig.jpg` |
| Contact details | `contact.html` and the footer in `index.html` |
| Translations | `assets/i18n.js` |

The quote form opens the visitor's email client with the enquiry pre-filled;
there is no backend and no data is stored.

## Languages

English, 中文, Bahasa Melayu, Bahasa Indonesia, Français, Deutsch, Español.
Translations should be reviewed by a native speaker before major campaigns.
