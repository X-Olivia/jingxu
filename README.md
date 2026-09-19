# Jing — Personal Website

A personal portfolio for Jing, based on the open-source [Devolio](https://github.com/devaradise/devolio) Astro template.

## Local development

```sh
pnpm install
pnpm dev
```

The development site runs at `http://localhost:4321`.

## Production build

```sh
pnpm build
pnpm preview
```

## GitHub Pages

The included workflow deploys the site automatically after a push to `main` or `master`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The Astro configuration automatically supports both a user site repository named `X-Olivia.github.io` and a regular project repository.

## Personalize later

- Update the introduction in `src/pages/index.astro`.
- Update the about page in `src/pages/about.astro`.
- Update project cards in `src/pages/projects/projects.ts`.

## Credits

Template by [Syakir at Devaradise](https://devaradise.com). Released under the MIT License.
