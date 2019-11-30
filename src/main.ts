import Vue, { CreateElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { createProvider, vuetify, Filters } from '@/plugins'



new Vue({
    router,
    store,
    vuetify,
    apolloProvider: createProvider(),
    render: (h: CreateElement) => h(App)
}).$mount('#app')
