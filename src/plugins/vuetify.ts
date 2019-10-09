import Vue from 'vue'
import Vuetify, {
    VBtn,
    VDataTable,
    VApp,
    VAvatar,
    VCol,
    VAppBar
} from 'vuetify/lib'
import zhHans from 'vuetify/src/locale/zh-Hans'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VuetifyToast from '../components/toast/'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#ee44aa',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            }
        }
    },
    lang: {
        locales: { zhHans },
        current: 'zhHans'
    },
    icons: {
        iconfont: 'md'
    },
    components: {
        VDataTable,
        VApp,
        VAvatar,
        VCol,
        VAppBar
    }
})
