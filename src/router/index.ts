import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'

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

router.beforeEach(async (to: Route, from: Route, next: () => void) => {
    document.title = `${to.meta.title} - ${title}`
    next()
})

router.afterEach(() => {
    //
})

export default router
