<template>
  <v-card flat>
    <v-card-title>
      <v-subheader>管理文章</v-subheader>
      <v-btn-toggle
        tile
        color="deep-purple accent-3"
        group
        dense
        rounded
      >
        <v-btn
          dark
          to="article/add"
        >
          新增
        </v-btn>
        <v-badge>
          <template v-slot:badge>{{count}}</template>
          <v-btn
            rounded
            tile
            color="deep-purple accent-3"
            :dark="count!==0?true:false"
            dense
            :disabled="count===0?true:false"
          >
            批量删除
          </v-btn>
        </v-badge>
      </v-btn-toggle>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="AllArticle"
      show-select
      item-key="id"
      v-model="selected"
      :loading="$apollo.loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.title="{ item }">
        <v-btn
          text
          color="primary"
          dark
          small
          @click="show(item)"
        >
          {{item.title}}
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import gql from 'graphql-tag'
@Component({
    apollo: {
        AllArticle() {
            return {
                query: gql`
                    query {
                        AllArticle {
                            id
                            order
                            desc
                            createdAt
                            updatedAt
                            title
                            slug
                            cover
                            summary
                            text
                            html
                            template
                            type
                            status
                            publish
                            password
                            allowComment
                            isTop
                            exinfo
                            author {
                                nickname
                            }
                            category {
                                label
                            }
                            tags {
                                id
                                label
                            }
                        }
                    }
                `
            }
        }
    }
})
export default class Dashboard extends Vue {
    private count: number = 0
    private search: string = ''
    private selected: any = []
    private headers: Array<object | []> = [
        { text: '文章标题', value: 'title' },
        { text: '分类', value: 'category' },
        { text: '作者', value: 'author' },
        { text: '发布状态', value: 'status' },
        { text: '内容类别', value: 'type' },
        { text: '内容状态', value: 'publish' },
        { text: '是否置顶', value: 'isTop' },
        { text: '是否允许评论', value: 'allowComment' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' }
        // { text: '操作', value: 'operation', align: 'center' }
    ]
}
</script>