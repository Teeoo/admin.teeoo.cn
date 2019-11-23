import Vue, { CreateElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRx from 'vue-rx'
import './registerServiceWorker'
import { createProvider, vuetify } from '@/plugins'

Vue.config.productionTip = false

Vue.use(VueRx)

new Vue({
    router,
    store,
    vuetify,
    apolloProvider: createProvider(),
    render: (h: CreateElement) => h(App)
}).$mount('#app')
