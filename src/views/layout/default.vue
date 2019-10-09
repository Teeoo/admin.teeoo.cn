<template>
  <v-app>
    <v-navigation-drawer
      app
      floating
      v-model="drawer"
      inverted-scroll
    >
      <layouts-drawer />
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      color="deep-purple accent-4"
    >
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <!-- <template v-slot:extension>
      </template> -->
      <v-text-field
        append-icon="mic"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-card
        flat
        color="deep-purple accent-4"
      >
        <v-card-actions>
          <v-btn
            rounded
            color="primary"
            dark
            small
          >登出</v-btn>
          <v-btn
            rounded
            color="primary"
            dark
            small
          >网站</v-btn>
          <!-- <v-btn
            icon
            @click="$q.fullscreen.toggle()"
          >
            <v-icon>
              {{$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'}}
            </v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-card>
      <v-btn icon>
        <v-avatar size="32px">
          <img
            :src="$store.getters.userAvatar"
            alt="John"
          >
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition name="scroll-y-transition">
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Drawer from '../../components/layout/drawer.vue'
import Bar from '../../components/layout/bar.vue'
@Component({
    components: {
        'layouts-drawer': Drawer,
        'layouts-bar': Bar
    }
})
export default class Layout extends Vue {
    private drawer: boolean = true
}
</script>
