# Worker Pay Tools

Astro site with React calculators for work hours, overtime, salary conversions, and rough paycheck estimates.

## Commands

All commands run from the project root.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    calculators/
  data/
  layouts/
  pages/
public/
```

The calculator and guide lists live in `src/data`. Tool pages are generated from `src/pages/tools/[slug].astro`, and guide pages are generated from `src/pages/guides/[slug].astro`.
