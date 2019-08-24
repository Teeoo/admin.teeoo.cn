import Vue from 'vue'
import Router, { RouteConfig, Route, RawLocation } from 'vue-router'
import store from '@/store'

Vue.use(Router)

const children = [
    {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
            title: '仪表盘'
        }
    },
    {
        path: '/category',
        component: () => import('@/views/category/index.vue'),
        meta: {
            title: '分类'
        }
    }
]

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/views/layout/index.vue'),
        meta: { auth: true },
        children: [...children]
    }
]

const router: Router = new Router({
    mode: 'history',
    routes
})

const title = 'Lee Blog'

router.beforeEach(
    async (
        to: Route,
        from: Route,
        next: (to?: RawLocation | false | void) => void
    ) => {
        document.title = `${to.meta.title} - ${title}`
        const auth = to.matched.some(record => record.meta.auth)
        const token = store.state.token
        if (auth && token) {
            if (to.path === '/login') {
                return next()
            }
            next()
        } else {
            if (to.path !== '/login') {
                return next({ path: '/login' })
            } else {
                next()
            }
        }
    }
)

router.afterEach(() => {
    //
})

export default router
