// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ARC Commune',
  tagline: 'IRC Low-Level Architecture Documentation',
  favicon: 'img/favicon.ico',

  // GitHub Pages deployment config
  url: 'https://vadimkrut.github.io',
  baseUrl: '/arc-commune/',

  organizationName: 'VadimKrut', // GitHub username
  projectName: 'arc-commune', // Repository name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/VadimKrut/arc-commune/tree/main/',
        },
        blog: false, // ❌ Отключаем блог полностью
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
          title: 'ARC Commune',
          logo: {
            alt: 'ARC Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'docsSidebar',
              position: 'left',
              label: 'Documentation',
            },
            {
              href: 'https://github.com/VadimKrut/arc-commune',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'IRS Overview',
                  to: '/docs/IRS',
                },
                {
                  label: 'Architecture',
                  to: '/docs/IRCArchitecture',
                },
                {
                  label: 'State Diagram',
                  to: '/docs/StateDiagram',
                },
              ],
            },
            {
              title: 'Contact',
              items: [
                {
                  label: 'GitHub Discussions',
                  href: 'https://github.com/VadimKrut/arc-commune/discussions',
                },
                {
                  label: 'Issues',
                  href: 'https://github.com/VadimKrut/arc-commune/issues',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} ARC System. Built with Docusaurus.`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
        },
      }),
};

export default config;