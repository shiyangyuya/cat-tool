import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';
import { zh } from './zh';
import { en } from './en';

export default defineConfig({
  title: 'cat-tool',
  base: '/cat-tool/',
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shiyangyuya/cat-tool' },
    ],
  },
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  },
  vite: {
    resolve: {
      alias: {
        'cat-tool': resolve(__dirname, '../../src/index.ts'),
      },
    },
  },
});
