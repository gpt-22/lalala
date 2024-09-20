// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      link: []
    }
  },

  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  css: ['~/assets/styles/main.scss'],
  plugins: ['~/plugins/gsap.client'],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://archigrade.ru',
      IMAGE_URL: process.env.IMAGE_URL,
      VIDEO_URL: process.env.VIDEO_URL
    }
  },

  modules: ['@vueuse/nuxt'],
  compatibilityDate: '2024-08-29'
})