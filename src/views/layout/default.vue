<template>
    <v-app>
        <Drawer v-model="drawer" />
        <v-app-bar app dark color="deep-purple accent-4">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-text-field
                flat
                hide-details
                label="查找"
                prepend-inner-icon="search"
                solo-inverted
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
                icon
                target="_blank"
                href="https://github.com/Teeoo/admin.teeoo.cn"
            >
                <v-icon title="https://github.com/Teeoo/admin.teeoo.cn"
                    >mdi-github-circle</v-icon
                >
            </v-btn>
            <v-btn icon @click="settingsVisible">
                <v-icon>mdi-settings</v-icon>
            </v-btn>
            <v-btn icon @click="toggle">
                <v-icon>{{
                    isFullscreen ? 'fullscreen_exit' : 'fullscreen'
                }}</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <transition name="scroll-y-transition" mode="out-in">
                    <router-view />
                </transition>
            </v-container>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Drawer from '@/components/layout/drawer.vue'
import screenfull, { Screenfull } from 'screenfull'

@Component<Layout>({
    components: { Drawer }
})
export default class Layout extends Vue {
    private drawer: boolean = true
    private isFullscreen: boolean = false
    private settingsVisible() {
        this.$toast.warning(`骚瑞,这里还没开始写哦!`)
    }
    private toggle() {
        const full = screenfull as Screenfull
        if (full.isEnabled) {
            full.toggle()
            full.on('change', () => {
                this.isFullscreen = full.isFullscreen
            })
        }
    }
}
</script>
