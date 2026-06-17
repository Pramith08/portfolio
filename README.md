# Pramith Kiran Portfolio

React, Vite, and Tailwind CSS portfolio for `pramithkiran.in`.

## Local Development

```bash
npm ci
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

This repo includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.
Pushes to `main` or `master` build the Vite app and deploy the `dist` folder.

The custom domain is configured through `public/CNAME`:

```text
pramithkiran.in
```
