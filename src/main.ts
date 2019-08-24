import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createProvider } from './plugins/apollo'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './plugins/toast'
import '@/app.styl'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
