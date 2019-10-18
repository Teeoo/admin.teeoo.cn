import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    i18n,
    vuetify,
    createProvider,
    formatDate,
    formatTemplate
} from './plugins'
import 'nprogress/nprogress.css'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.filter('formatDate', formatDate)
Vue.filter('formatTemplate', formatTemplate)

new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
