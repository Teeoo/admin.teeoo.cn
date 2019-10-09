<template>
  <v-card flat>
    <v-card-title>
      <v-subheader>管理标签</v-subheader>
      <v-btn
        dark
        color="deep-purple accent-3"
        rounded
        small
        @click="drawer=true"
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
      :items="AllTags"
      show-select
      item-key="id"
      v-model="selected"
      :loading="$apollo.loading"
    >
      <template v-slot:item.label="{ item }">
        <v-btn
          text
          rounded
          color="primary"
          dark
          small
          @click="show(item)"
        >
          {{item.label}}
        </v-btn>
      </template>
    </v-data-table>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      temporary
    >
      <v-toolbar
        color="purple accent-4"
        dark
        text
      >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{item!==null ? "修改标签":"新增标签"}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-divider></v-divider>
              <v-btn
                text
                icon
                @click="drawer=!drawer"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <v-container>
        <v-card flat>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation="lazy-validation"
            >
              <v-text-field
                v-model="tags.label.value"
                :rules="tags.label.rule"
                label="标签名"
              ></v-text-field>
              <v-text-field
                v-model="tags.slug.value"
                :rules="tags.slug.rule"
                label="别名"
              ></v-text-field>
              <v-text-field
                v-model="tags.color.value"
                :rules="tags.color.rule"
                label="颜色"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              small
              @click="save()"
            >确认</v-btn>
            <v-btn
              text
              small
              v-show="item"
              @click="remove()"
            >删除</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-navigation-drawer>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import gql from 'graphql-tag'
@Component({
    apollo: {
        AllTags() {
            return {
                query: gql`
                    query {
                        AllTags {
                            id
                            order
                            desc
                            createdAt
                            updatedAt
                            label
                            slug
                            color
                            hot
                        }
                    }
                `,
                subscribeToMore: {
                    document: gql`
                        subscription {
                            tags {
                                id
                                order
                                desc
                                createdAt
                                updatedAt
                                label
                                slug
                                color
                                hot
                            }
                        }
                    `,
                    updateQuery: (
                        previousResult: any,
                        { subscriptionData }: any
                    ) => {
                        previousResult.AllTags = subscriptionData.data.tags
                        return previousResult
                    }
                }
            }
        }
    }
})
export default class Dashboard extends Vue {
    private count: number = 0
    private selected: any = []
    // 验证
    private valid: boolean = true
    // 表单内容
    private tags: any = {
        label: {
            value: '',
            rule: [(v: string) => !!v || '标签名必须填写哦!']
        },
        color: {
            value: '',
            rule: []
        },
        slug: {
            value: '',
            rule: []
        }
    }
    // 右侧表单
    private drawer: boolean = false
    // 选中数据item
    private item: any = null
    private headers: Array<object | []> = [
        { text: '标签', value: 'label' },
        { text: '别名', value: 'slug' },
        { text: '颜色', value: 'colro' },
        { text: '热度', value: 'hot' },
        { text: '排序', value: 'order' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' }
    ]

    @Watch('drawer')
    private onDrawerChanged(val: boolean, oldVal: boolean) {
        if (!val) {
            this.item = null
            ;(this.$refs.form as any).reset()
            ;(this.$refs.form as any).resetValidation()
        }
    }

    @Watch('selected', { deep: true, immediate: true })
    private onSelectedChanged(val: any, oldVal: any) {
        if (Array.isArray(val) && val.length === 0) {
            this.count = 0
        } else {
            this.count = val.length
        }
    }

    private async save() {
        if (this.item !== null) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($data: UpdateTagsInput!, $is: String!) {
                            UpdateTags(data: $data, id: $id) {
                                id
                                order
                                desc
                                createdAt
                                updatedAt
                                label
                                slug
                                color
                                hot
                            }
                        }
                    `,
                    variables: {
                        id: await this.item.id,
                        data: {
                            label: await this.tags.label.value,
                            slug: await this.tags.slug.value,
                            color: await this.tags.color.value
                        }
                    }
                })
                this.drawer = false
            } catch (error) {
                // this.$message.error(`修改分类失败:${error}`)
            }
        } else {
            if ((this.$refs.form as any).validate()) {
                try {
                    const result = await this.$apollo.mutate({
                        mutation: gql`
                            mutation($data: NewTagsInput!) {
                                NewTags(data: $data) {
                                    id
                                    order
                                    desc
                                    createdAt
                                    updatedAt
                                    label
                                    slug
                                    color
                                    hot
                                }
                            }
                        `,
                        variables: {
                            data: {
                                label: await this.tags.label.value,
                                slug: await this.tags.slug.value,
                                color: await this.tags.color.value
                            }
                        }
                    })
                    this.drawer = false
                } catch (error) {
                    // this.$message.error(`新增分类失败:${error}`)
                }
            }
        }
    }

    private async show(item: any) {
        this.drawer = true
        this.item = item
        this.tags.label.value = this.item.label
        this.tags.slug.value = this.item.slug
        this.tags.color.value = this.item.color
    }

    private async remove() {
        try {
            const result = await this.$apollo.mutate({
                mutation: gql`
                    mutation($id: String!) {
                        DeleteTags(id: $id)
                    }
                `,
                variables: {
                    id: this.item.id
                }
            })
            this.drawer = false
        } catch (error) {
            // this.$message.error(`删除分类失败:${error}`)
        }
    }
}
</script>