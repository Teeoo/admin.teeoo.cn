import Vue, { CreateElement } from 'vue'
import VueRx from 'vue-rx'
import vuetify from './vuetify'
import { createProvider, onLogin, onLogout } from './apollo'
import { Filters } from './filters'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueRx)

for (const key in Filters) {
    if (Filters.hasOwnProperty(key)) {
        Vue.filter(key, Filters[key])
    }
}
export { vuetify, createProvider, onLogin, onLogout, Filters }
