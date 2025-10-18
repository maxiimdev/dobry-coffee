export default {
    ssr: true,
    target: 'static',
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },
    css: ['@/assets/scss/main.scss'],
    plugins: ['@/plugins/api.js'],
    modules: ['@nuxtjs/vuetify'],
    vuetify: {
        customVariables: ['~/assets/scss/_variables.scss'],
        breakpoint: {
            mobileBreakpoint: 'sm'
        }
    },
    build: {
        transpile: [/^vuetify/],
    },
    generate: {
        dir: 'dist'
    }
}
