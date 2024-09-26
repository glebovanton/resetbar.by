const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "nuxt-easy-lightbox",
    "@nuxtjs/eslint-module",
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: isProd ? 'https://resetbar.by' : 'http://localhost',
  },

  sitemap: {
    sources: ['/'],  // Указываем источник для карты сайта
  },

  robots: {
    UserAgent: '*',        // Разрешить всем поисковым системам
    Disallow: ['/admin'],
    Allow: '/',
    Sitemap: isProd ? 'https://resetbar.by/sitemap.xml' : 'http://localhost/sitemap.xml',
    text: `
      User-agent: *
      Allow: /
      Sitemap: https://resetbar.by/sitemap.xml
    `
  },

  routeRules: {
    '/': { prerender: true, sitemap: { changefreq: 'daily', priority: 1.0 } },
  },

  css: [
    '@/assets/css/styles.css',
    // '@/assets/css/bootstrap.min.css',
    // '@/assets/libs/bootstrap-4.0.0-beta-dist/css/bootstrap-grid.css',
  ],

  ssr: true,

  app: {
    head: {
      title: 'Resetbar',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Add more meta tags as needed
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Add more link tags as needed
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },

  compatibilityDate: '2024-09-23'
})
