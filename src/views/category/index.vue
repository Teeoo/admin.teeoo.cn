<template>
  <v-card flat>
    <v-card-title>
      <v-subheader>管理分类</v-subheader>
      <v-btn-toggle
        tile
        color="deep-purple accent-3"
        group
        dense
        rounded
      >
        <v-btn
          dark
          @click="drawer=true"
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
      <v-select
        :items="headers"
        label="字段"
        v-model="filters.header"
      ></v-select>
      <v-menu
        v-model="start"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startdate"
            label="开始时间"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filters.createdAt"
          @input="start = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="end"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="filters.updatedAt"
            label="结束时间"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filters.updatedAt"
          @input="end = false"
        ></v-date-picker>
      </v-menu>
      <v-form>
        <v-text-field
          v-model="search"
          prepend-icon="search"
          label="search"
          single-line
        ></v-text-field>
      </v-form>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="AllCategory"
      show-select
      item-key="id"
      v-model="selected"
      :loading="$apollo.loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.label="{ item }">
        <v-btn
          text
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
              <v-list-item-title>{{item!==null ? "修改分类":"新增分类"}}</v-list-item-title>
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
                v-model="category.label.value"
                :rules="category.label.rule"
                label="分类名"
              ></v-text-field>
              <v-text-field
                v-model="category.slug.value"
                :rules="category.slug.rule"
                label="别名"
              ></v-text-field>
              <v-select
                v-model="category.parent.value"
                :rules="category.parent.rule"
                :items="AllCategory"
                item-text="label"
                item-value="id"
                label="父级"
              ></v-select>
              <v-text-field
                v-model="category.desc.value"
                :rules="category.desc.rule"
                label="描述"
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
        AllCategory() {
            return {
                query: gql`
                    query {
                        AllCategory {
                            id
                            order
                            desc
                            createdAt
                            updatedAt
                            label
                            slug
                            cateNum
                            archNum
                            parent
                        }
                    }
                `,
                subscribeToMore: {
                    document: gql`
                        subscription {
                            category {
                                id
                                order
                                desc
                                createdAt
                                updatedAt
                                label
                                slug
                                cateNum
                                archNum
                                children
                            }
                        }
                    `,
                    updateQuery: (
                        previousResult: any,
                        { subscriptionData }: any
                    ) => {
                        previousResult.AllCategory =
                            subscriptionData.data.category
                        return previousResult
                    }
                }
            }
        }
    }
})
export default class Category extends Vue {
    private count: number = 0
    private selected: any = []
    // 验证
    private valid: boolean = true
    // 表单内容
    private category: any = {
        label: {
            value: '',
            rule: [(v: string) => !!v || '分类名必须填写哦!']
        },
        slug: {
            value: '',
            rule: []
        },
        parent: {
            value: undefined,
            rule: []
        },
        desc: {
            value: '这是一段默认的描述',
            rule: []
        }
    }
    // 右侧表单
    private drawer: boolean = false
    // 选中数据item
    private item: any = null
    // 开始时间菜单
    private start: boolean = false
    // 开始时间
    private startdate: any = new Date().toISOString().substr(0, 10)
    // 结束菜单
    private end: boolean = false
    // 结束时间
    private filters: object = {
        header: null,
        createdAt: null,
        updatedAt: null
    }
    private enddate: any = null
    private headers: Array<object | []> = [
        {
            text: '分类名',
            align: 'left',
            sortable: false,
            value: 'label'
        },
        { text: '分类别名', value: 'slug' },
        { text: '描述', value: 'desc' },
        { text: '子分类数量', value: 'cateNum' },
        { text: '该分类下存在的文章数量', value: 'archNum' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' }
    ]
    private search: string = ''

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
        if (this.item != null) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($id: String!, $data: UpdateCategoryInput!) {
                            UpdateCategory(data: $data, id: $id) {
                                id
                                order
                                desc
                                createdAt
                                updatedAt
                                label
                                slug
                                cateNum
                                archNum
                                children
                            }
                        }
                    `,
                    variables: {
                        id: await this.item.id,
                        data: {
                            label: await this.category.label.value,
                            slug: await this.category.slug.value,
                            desc: await this.category.desc.value,
                            parent: await this.category.parent.value
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
                            mutation($data: NewCategoryInput!) {
                                NewCategory(data: $data) {
                                    id
                                    order
                                    desc
                                    createdAt
                                    updatedAt
                                    label
                                    slug
                                    cateNum
                                    archNum
                                    children
                                }
                            }
                        `,
                        variables: {
                            data: {
                                label: await this.category.label.value,
                                slug: await this.category.slug.value,
                                desc: await this.category.desc.value,
                                parent: await this.category.parent.value
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
        this.category.label.value = this.item.label
        this.category.slug.value = this.item.slug
        this.category.desc.value = this.item.desc
        this.category.parent.value = this.item.parent
    }

    private async remove() {
        try {
            const result = await this.$apollo.mutate({
                mutation: gql`
                    mutation($id: String!) {
                        DeleteCategory(id: $id)
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