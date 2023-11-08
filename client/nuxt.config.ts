// https://nuxt.com/docs/api/configuration/nuxt-config

const apiBase =
  typeof process.env.API_BASE === 'string' ? process.env.API_BASE : 'http://localhost:8080/';

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  routeRules: {
    '/image/**': { proxy: `${apiBase}image/**` },
    '/images': { proxy: `${apiBase}images` },
    '/uploadImage': { proxy: `${apiBase}uploadImage` },
    '/clearImages': { proxy: `${apiBase}clearImages` },
  },

  css: ['~/assets/css/main.scss'],
});
