# MAEK Marketing Landing Page

English AI / intelligence-engine landing page built with Next.js App Router, TypeScript, Tailwind CSS, React, and Three.js.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Performance Notes

- The hero visual is a local Three.js scene with no external images or network media.
- Animation is limited to data streams, modular blocks, neural nodes, mechanical rings, and output rays.
- Sections use static typed data arrays and server-rendered composition where possible.
- The animated hero is isolated in a single client component.

## Accessibility Notes

- The page uses semantic landmarks, headings, and descriptive section labels.
- Decorative visual layers are marked `aria-hidden`.
- CTA links have visible focus states.
- `prefers-reduced-motion` is respected in the Three.js render loop and CSS media queries.
- The layout is responsive down to small mobile widths without horizontal scrolling.
