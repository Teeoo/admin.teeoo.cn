import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
    createApolloClient,
    restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'

Vue.use(VueApollo)
/* tslint:disable:no-console */
const AUTH_TOKEN = 'apollo-token'

const httpEndpoint =
    process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql'

const defaultOptions = {
    httpEndpoint,
    // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
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
                // fetchPolicy: 'cache-and-network',
            }
        },
        errorHandler(error) {
            console.log(
                '%cError',
                'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
                error.message
            )
        }
    })

    return apolloProvider
}

export async function onLogin(
    apolloClient: { wsClient: any; resetStore: () => void },
    token: string
) {
    if (typeof localStorage !== 'undefined' && token) {
        localStorage.setItem(AUTH_TOKEN, token)
    }
    if (apolloClient.wsClient) {
        restartWebsockets(apolloClient.wsClient)
    }
    try {
        await apolloClient.resetStore()
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
        await apolloClient.resetStore()
    } catch (e) {
        console.log(
            '%cError on cache reset (logout)',
            'color: orange;',
            e.message
        )
    }
}
