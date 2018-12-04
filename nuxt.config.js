const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
        integrity: 'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU',
        crossorigin: 'anonymous'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/reset.css', '~/assets/css/body.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/VeeValidate.js'],

  /*
   ** Nuxt.js modules
   */
  modules: ['cookie-universal-nuxt'],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    styleResources: {
      scss: './assets/scss/all.scss'
    },
    extractCSS: { allChunks: true },
    extend(config, ctx) {}
  },
  env: {
    BASE_URL: process.env.NODE_ENV === 'production' ? 'https://sweetaste.herokuapp.com/' : 'http://localhost:3000',
    PRODUCT_API: 'https://vue-course-api.hexschool.io/api/sweetaste'
  },
  router: {
    scrollBehavior: function(to, from, savedPosition) {
      var position = { x: 0, y: 0 }
      if (from.name === 'product' || from.name === 'product-category') {
        if (to.name === 'product' || to.name === 'product-category') {
          var width = window.innerWidth
          if (width < 768) {
            position = { x: 0, y: 600 }
          } else if (width > 991) {
            position = { x: 0, y: 500 }
          } else {
            position = { x: 0, y: 800 }
          }
        }
      }
      return position
    }
  }
}
