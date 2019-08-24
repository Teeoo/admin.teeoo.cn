import VuetifyToast from '@/components/toast'
import Vue from 'vue'

Vue.use(VuetifyToast, {
    x: 'right',
    y: 'top',
    color: 'info',
    icon: 'info',
    iconColor: '',
    classes: ['body-2'],
    timeout: 6000,
    dismissable: true,
    multiLine: false,
    vertical: false,
    queueable: false,
    showClose: false,
    closeText: '',
    closeColor: '',
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$toast'
})
