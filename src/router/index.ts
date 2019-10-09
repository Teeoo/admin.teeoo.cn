import Vue from 'vue'
import Router, { RouteConfig, Route, RawLocation } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'

Vue.use(Router)

const children = [
    {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
            title: '仪表盘'
        }
    },
    {
        path: 'category',
        component: () => import('@/views/category/index.vue'),
        meta: {
            title: '分类'
        }
    },
    {
        path: 'tags',
        component: () => import('@/views/tags/index.vue'),
        meta: {
            title: '标签'
        }
    },
    {
        path: 'article',
        component: () => import('@/views/article/index.vue'),
        meta: {
            title: '文章'
        }
    },
    {
        path: 'article/add',
        component: () => import('@/views/article/add.vue'),
        meta: {
            title: '新增文章'
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
        redirect: 'dashboard',
        component: () => import('@/views/layout/default.vue'),
        meta: { auth: true },
        children: [...children]
    }
]

const router: Router = new Router({
    // mode: 'history',
    routes
})

const title = 'Lee Blog'

router.beforeEach(
    async (
        to: Route,
        from: Route,
        next: (to?: RawLocation | false | void) => void
    ) => {
        NProgress.done().start()
        document.title = `${to.meta.title} - ${title}`
        const auth = to.matched.some(record => record.meta.auth)
        const token = store.state.token
        // console.info(to.path)
        if (auth && token) {
            if (to.path === '/login') {
                return next()
            }
            next()
        } else {
            if (to.path !== '/login') {
                console.info(to)
                return next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        }
    }
)

router.afterEach(() => {
    NProgress.done()
})

export default router
