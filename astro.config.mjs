import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';

import partytown from "@astrojs/partytown";

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = repository?.toLowerCase() === 'x-olivia.github.io';
const base = repository && !isUserSite ? `/${repository}/` : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://x-olivia.github.io',
  base,
  devToolbar: {
    enabled: false
  },
  integrations: [mdx(), sitemap(), tailwind(), partytown()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'x-olivia.github.io'
    }]]
  }
});
