<template>
  <v-navigation-drawer
    app
    hide-overlay
    floating
    inverted-scroll
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list dense nav rounded>
      <v-list-item>
        <v-list-item-avatar>
          <img src="@/assets/ooopic_1559634216.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">TEEOO</v-list-item-title>
          <v-list-item-subtitle>.cn</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <template v-for="item in list">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>
        <v-list-item v-else :key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Drawer extends Vue {
  @Prop({
    default: true,
    type: Boolean
  })
  private value: boolean = true
  private drawer: boolean = true
  private list: any = [
    { header: '仪表盘' },
    {
      icon: 'home',
      color: 'purple',
      title: '网站概要',
      path: '/dashboard'
    },
    { header: '管理' },
    {
      icon: 'bookmark',
      color: 'orange',
      title: '分类管理',
      path: '/category'
    },
    {
      icon: 'local_offer',
      color: 'red',
      title: '标签管理',
      path: '/tags'
    },
    {
      icon: 'rate_review',
      color: 'purple',
      title: '文章管理',
      path: '/article'
    },
    {
      icon: 'comment',
      color: 'pink',
      title: '评论管理',
      path: '/comments'
    },
    {
      icon: 'link',
      color: 'purple',
      title: '友情链接',
      path: '/links'
    },
    {
      icon: 'folder',
      color: 'teal',
      title: '附件管理',
      path: '/annex'
    },
    { header: '设置' },
    {
      icon: 'settings',
      color: 'cyan',
      title: '基础设置',
      path: '/options/settings'
    },
    {
      icon: 'account_circle',
      color: 'cyan',
      title: '用户设置',
      path: '/'
    },
    {
      icon: 'message',
      color: 'cyan',
      title: '评论设置',
      path: '/'
    },
    {
      icon: 'email',
      color: 'cyan',
      title: '邮件设置',
      path: '/'
    }
  ]
}
</script>
