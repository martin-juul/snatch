const { description } = require('../../package');

module.exports = {
  base: '/snatch/',

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Snatch',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/martin-juul/snatch',
    editLinks: false,
    docsDir: 'docs',
    editLinkText: '',
    lastUpdated: true,
    nav: [
      {
        text: 'Krav specifikation',
        link: '/krav-specifikation/',
      },
      {
        text: 'Produkt Rapport',
        link: '/produkt-rapport/',
      },
      {
        text: 'Process Rapport',
        link: '/process-rapport/',
      },
      {
        text: 'Arbejdslog',
        link: '/arbejdslog/',
      },
    ],
    sidebar: {},
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@renovamen/vuepress-plugin-mermaid',
    '@snowdog/vuepress-plugin-pdf-export',
  ],
};
