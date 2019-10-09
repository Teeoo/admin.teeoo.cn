import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
    createApolloClient,
    restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'
import router from '@/router'

/* tslint:disable:no-console */

Vue.use(VueApollo)

const AUTH_TOKEN = 'token'

const httpEndpoint =
    process.env.VUE_APP_GRAPHQL_HTTP || 'http://192.168.0.140:3000/graphql'

const defaultOptions = {
    httpEndpoint,
    wsEndpoint:
        process.env.VUE_APP_GRAPHQL_WS || 'ws://192.168.0.140:3000/graphql',
    tokenName: AUTH_TOKEN,
    persisting: false,
    websocketsOnly: false,
    ssr: false
}
export function createProvider(options = {}) {
    // Create apollo client
    const { apolloClient, wsClient } = createApolloClient({
        ...defaultOptions,
        ...options
    })
    apolloClient.wsClient = wsClient
    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        defaultOptions: {
            $query: {
                fetchPolicy: 'cache-and-network'
            }
        },
        errorHandler(error: any) {
            if (error.gqlError.message.statusCode) {
                if (router.currentRoute.path !== '/login') {
                    router.replace({
                        path: '/login'
                    })
                }
            } else {
                console.log(
                    '%cError',
                    'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
                    error.message
                )
            }
        }
    })

    return apolloProvider
}

export async function onLogin(apolloClient: any) {
    // if (typeof localStorage !== 'undefined' && token) {
    //     localStorage.setItem(AUTH_TOKEN, token)
    // }
    if (apolloClient.wsClient) {
        restartWebsockets(apolloClient.wsClient)
    }
    try {
        apolloClient.resetStore()
    } catch (e) {
        console.log(
            '%cError on cache reset (login)',
            'color: orange;',
            e.message
        )
    }
}

export async function onLogout(apolloClient: {
    wsClient: any
    resetStore: () => void
}) {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN)
    }
    if (apolloClient.wsClient) {
        restartWebsockets(apolloClient.wsClient)
    }
    try {
        apolloClient.resetStore()
    } catch (e) {
        console.log(
            '%cError on cache reset (logout)',
            'color: orange;',
            e.message
        )
    }
}
