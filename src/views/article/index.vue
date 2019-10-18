<template>
  <v-card flat>
    <v-card-title>
      <v-subheader>管理文章</v-subheader>
      <v-btn
        dark
        color="deep-purple accent-3"
        rounded
        small
        to="article/add"
      >
        新增
      </v-btn>
      <v-badge class="ma-2">
        <template v-slot:badge>{{count}}</template>
        <v-btn
          rounded
          small
          color="error"
          :dark="count!==0?true:false"
          :disabled="count===0?true:false"
        >
          批量删除
        </v-btn>
      </v-badge>
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
      <template v-slot:item.category.label="{ item }">
        {{ item.type==='article' ? item.category.label:'页面无分类' }}
      </template>
      <template v-slot:item.allowComment="{ item }">
        {{ item.allowComment ? "允许":"不允许" }}
      </template>
      <template v-slot:item.isTop="{ item }">
        {{ item.isTop ? "置顶":"不置顶" }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ item.status ? "发布":"草稿" }}
      </template>
      <template v-slot:item.type="{ item }">
        {{ item.type==='article' ? "文章":"页面" }}
      </template>
      <template v-slot:item.template="{ item }">
        {{ item.template | formatTemplate }}
      </template>
      <template v-slot:item.publish="{ item }">
        <label v-if="item.publish === 'publish'">公开</label>
        <label v-else-if="item.publish ==='hidden'">隐藏</label>
        <label v-else>加密</label>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{item.createdAt | formatDate}}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{item.updatedAt | formatDate}}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn icon>
          <v-icon
            small
            color="purple"
          >
            edit
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon
            small
            color="red"
          >
            delete
          </v-icon>
        </v-btn>
      </template>

    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import gql from 'graphql-tag'
import { ALLARTICLE } from '../../graphql'
@Component({
    apollo: {
        AllArticle() {
            return {
                query: ALLARTICLE
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
        { text: '分类', value: 'category.label' },
        { text: '作者', value: 'author.nickname' },
        { text: '发布状态', value: 'status' },
        { text: '内容类别', value: 'type' },
        { text: '内容公开状态', value: 'publish' },
        { text: '是否置顶', value: 'isTop' },
        { text: '是否允许评论', value: 'allowComment' },
        { text: '页面模板', value: 'template' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' },
        { text: '操作', value: 'action', align: 'center' }
    ]

    @Watch('selected', { deep: true, immediate: true })
    private onSelectedChanged(val: any, oldVal: any) {
        if (Array.isArray(val) && val.length === 0) {
            this.count = 0
        } else {
            this.count = val.length
        }
    }
}
</script>