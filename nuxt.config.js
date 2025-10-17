export default {
    mode: 'universal',
    css: ['@/assets/scss/main.scss'],
    plugins: ['@/plugins/api.js'],
    modules: ['@nuxtjs/vuetify'],
    vuetify: {
        customVariables: ['~/assets/scss/_variables.scss'],
    },
    build: {
        transpile: [/^vuetify/],
    },
}
