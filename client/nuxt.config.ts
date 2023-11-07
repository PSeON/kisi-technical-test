// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  // Ideally this redirection must be handled by nginx or CDN. But to keep it simple I'm setting up
  // it here.
  routeRules: {
    '/image/**': { proxy: 'http://localhost:8080/image/**' },
    '/images': { proxy: 'http://localhost:8080/images' },
    '/uploadImage': { proxy: 'http://localhost:8080/uploadImage' },
  },

  css: ['~/assets/css/main.scss'],
});
