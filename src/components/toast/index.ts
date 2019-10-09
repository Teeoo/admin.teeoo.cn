import Toast from './toast.vue'
import Vue from 'vue'

function init(globalOptions: any = {}) {
    var cmp: any = null
    const queue: any = []
    const property = globalOptions.property || '$toast'

    function createCmp(options: any) {
        const component = new Vue(Toast)
        const componentOptions = {
            ...Vue.prototype[property].globalOptions,
            ...options
        }

        if (componentOptions.slot) {
            component.$slots.default = componentOptions.slot
            delete componentOptions.slot
        }

        Object.assign(component, componentOptions)
        document.body.appendChild(component.$mount().$el)

        return component
    }

    function show(message: any, options: any = {}) {
        if (cmp) {
            let isQueueable =
                options.queueable !== undefined
                    ? options.queueable
                    : globalOptions.queueable

            if (isQueueable) {
                queue.push({
                    message,
                    options
                })
            } else {
                cmp.close()
                queue.unshift({
                    message,
                    options
                })
            }

            return
        }

        options.message = message
        cmp = createCmp(options)
        cmp.$on('statusChange', (isActive: any, wasActive: any) => {
            if (wasActive && !isActive) {
                cmp.$nextTick(() => {
                    cmp.$destroy()
                    cmp = null

                    if (queue.length) {
                        let toast = queue.shift()
                        show(toast.message, toast.options)
                    }
                })
            }
        })
    }

    function shorts(options: any) {
        const colors = ['success', 'info', 'error', 'warning']
        let methods: any = {}

        colors.forEach(color => {
            methods[color] = (message: any, options: any) =>
                show(message, {
                    color,
                    ...options
                })
        })

        if (options.shorts) {
            for (let key in options.shorts) {
                let localOptions = options.shorts[key]
                methods[key] = (message: any, options: any) =>
                    show(message, {
                        ...localOptions,
                        ...options
                    })
            }
        }

        return methods
    }

    function getCmp() {
        return cmp
    }

    Vue.prototype[property] = Object.assign(show, {
        globalOptions,
        getCmp,
        ...shorts(globalOptions)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    Vue.use(init)
}

export default init
