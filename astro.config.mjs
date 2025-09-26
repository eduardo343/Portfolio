// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alanugarte.dev', // Replace with your actual domain
  integrations: [
    mdx(),
    sitemap({
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
  // Customize specific page priorities
  customPages: [
    'https://alanugarte.dev/', // Homepage - highest priority
    'https://alanugarte.dev/about',
    'https://alanugarte.dev/contact',
    'https://alanugarte.dev/blog'
  ]
})
  ],
  // compilerOptions: {
  //   // Enable TypeScript strict mode
  //   strict: true
  // },
  vite: {
    plugins: [tailwindcss()],
  },
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto'
  },
  // Experimental features for better SEO
  // experimental: {
  //   contentCollectionCache: true
  // }
});
