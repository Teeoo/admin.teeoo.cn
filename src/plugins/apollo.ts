import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
    createApolloClient,
    restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'
import router from '@/router'

Vue.use(VueApollo)

const AUTH_TOKEN = 'token'

const httpEndpoint =
    process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql'

/* tslint:disable:no-console */

const defaultOptions = {
    httpEndpoint,
    wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
    tokenName: AUTH_TOKEN,
    persisting: false,
    websocketsOnly: false,
    ssr: false
    // Override default apollo link
    // note: don't override httpLink here, specify httpLink options in the
    // httpLinkOptions property of defaultOptions.
    // link: myLink

    // Override default cache
    // cache: myCache

    // Override the way the Authorization header is set
    // getAuth: (tokenName) => ...

    // Additional ApolloClient options
    // apollo: { ... }

    // Client local data (see apollo-link-state)
    // clientState: { resolvers: { ... }, defaults: { ... } }
}

// Call this in the Vue app file
export function createProvider(options = {}) {
    // Create apollo client
    const { apolloClient, wsClient } = createApolloClient({
        ...defaultOptions,
        ...options
    })
    apolloClient.wsClient = wsClient

    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        defaultOptions: {
            $query: {
                fetchPolicy: 'cache-and-network'
            }
        },
        errorHandler(error: any) {
            console.log(
                '%cError',
                'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
                error.gqlError
            )
            if (error.gqlError.statusCode === 401) {
                if (router.currentRoute.path !== '/login') {
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }
            }
            // Object.keys(error.graphQLErrors).forEach((key: any) => {
            //   console.log(
            //     '%cError',
            //     'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
            //     error.graphQLErrors[key]
            //   )
            //   if ((error.graphQLErrors[key] as any).statusCode === 401) {
            //     if (router.currentRoute.path !== '/login') {
            //       // router.replace({
            //       //   path: '/login'
            //       // })
            //     }
            //   }
            // })
        }
    })

    return apolloProvider
}

export async function onLogin(apolloClient: any) {
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

// Manually call this when user log out
export async function onLogout(apolloClient: {
    wsClient: any
    resetStore: () => void
}) {
    if (typeof localStorage) {
        localStorage.removeItem(AUTH_TOKEN)
    }
    if (apolloClient.wsClient) {
        restartWebsockets(apolloClient.wsClient)
    }
    try {
        apolloClient.resetStore()
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(
            '%cError on cache reset (logout)',
            'color: orange;',
            e.message
        )
    }
}
