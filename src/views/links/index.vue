<template>
  <v-card flat>
    <v-card-title>
      <v-subheader>管理友联</v-subheader>
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
    <v-skeleton-loader
      :loading="$apollo.loading"
      transition="scale-transition"
      type="table"
    >
      <v-data-table
        :headers="headers"
        :items="AllLinks"
        show-select
        item-key="id"
        v-model="selected"
        :loading="$apollo.loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:item.name="{ item }">
          <v-btn
            text
            color="primary"
            dark
            small
            rounded
            @click="show(item)"
          >
            {{item.name}}
          </v-btn>
        </template>
        <template v-slot:item.logo="{ item }">
          <v-avatar size="32">
            <v-img :src="item.logo" />
          </v-avatar>
        </template>
        <template v-slot:item.status="{ item }">
          {{item.status?"显示":"不显示"}}
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{item.createdAt | formatDate}}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{item.updatedAt | formatDate}}
        </template>
      </v-data-table>
    </v-skeleton-loader>

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
              <v-list-item-title>{{item!==null ? '修改友联':'新增友联'}}</v-list-item-title>
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
                v-model="links.name.value"
                :rules="links.name.rule"
                label="名称"
              ></v-text-field>
              <v-text-field
                v-model="links.url.value"
                :rules="links.url.rule"
                label="地址"
              ></v-text-field>
              <v-text-field
                v-model="links.target.value"
                :rules="links.target.rule"
                label="打开方式"
              ></v-text-field>
              <v-text-field
                v-model="links.email.value"
                :rules="links.email.rule"
                label="email"
              ></v-text-field>
              <v-text-field
                v-model="links.logo.value"
                :rules="links.logo.rule"
                label="logo"
              ></v-text-field>
              <v-text-field
                v-model="links.desc.value"
                :rules="links.desc.rule"
                label="描述"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              small
              @click="save()"
            >确认
            </v-btn>
            <v-btn
              text
              small
              v-show="item"
              @click="remove()"
            >删除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-navigation-drawer>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import {
    ALLCATEGORY,
    ONCATEGORY,
    NEWCATEGORY,
    UPDATECATEGORY,
    DELETECATEGORY
} from '../../graphql'
import gql from 'graphql-tag'

@Component({
    apollo: {
        AllLinks() {
            return {
                query: gql`
                    query {
                        AllLinks {
                            id
                            order
                            desc
                            createdAt
                            updatedAt
                            url
                            name
                            email
                            logo
                            target
                            status
                        }
                    }
                `
            }
        }
    }
})
export default class Links extends Vue {
    private count: number = 0
    private selected: any = []
    // 验证
    private valid: boolean = true
    // 表单内容
    private links: any = {
        url: {
            value: '',
            rule: [(v: string) => !!v || 'url必须填写哦!']
        },
        name: {
            value: '',
            rule: [(v: string) => !!v || '名称必须填写哦!']
        },
        email: {
            value: undefined,
            rule: []
        },
        logo: {
            value: '',
            rule: [(v: string) => !!v || 'logo必须填写哦!']
        },
        target: { value: '_blank', rule: [] },
        desc: { value: '这是一段默认的描述', rule: [] },
        status: {
            value: Boolean(true),
            rule: []
        }
    }
    // 右侧表单
    private drawer: boolean = false
    // 选中数据item
    private item: any = null
    private headers: Array<object | []> = [
        {
            text: 'logo',
            align: 'left',
            sortable: false,
            value: 'logo'
        },
        { text: '名称', value: 'name' },
        { text: '地址', value: 'url' },
        { text: '站长邮箱', value: 'email' },
        { text: '打开方式', value: 'target' },
        { text: '是否显示', value: 'status' },
        { text: '描述', value: 'desc' },
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
        if (this.item != null) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($data: UpdateLinksInput!, $id: String!) {
                            UpdateLinks(data: $data, id: $id) {
                                id
                                order
                                desc
                                createdAt
                                updatedAt
                                url
                                name
                                email
                                logo
                                target
                                status
                            }
                        }
                    `,
                    variables: {
                        id: await this.item.id,
                        data: {
                            url: await this.links.url.value,
                            name: await this.links.name.value,
                            desc: await this.links.desc.value,
                            email: await this.links.email.value,
                            logo: await this.links.logo.value,
                            target: await this.links.target.value,
                            status: await this.links.status.value
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
                            mutation($data: NewLinksInput!) {
                                NewLinks(data: $data) {
                                    id
                                    order
                                    desc
                                    createdAt
                                    updatedAt
                                    url
                                    name
                                    email
                                    logo
                                    target
                                    status
                                }
                            }
                        `,
                        variables: {
                            data: {
                                url: await this.links.url.value,
                                name: await this.links.name.value,
                                desc: await this.links.desc.value,
                                email: await this.links.email.value,
                                logo: await this.links.logo.value,
                                target: await this.links.target.value,
                                status: await this.links.status.value
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
        this.links.logo.value = this.item.logo
        this.links.url.value = this.item.url
        this.links.name.value = this.item.name
        this.links.desc.value = this.item.desc
        this.links.email.value = this.item.email
        this.links.target.value = this.item.target
        this.links.status.value = this.item.status
    }

    private async remove() {
        try {
            const result = await this.$apollo.mutate({
                mutation: gql`
                    mutation($id: String!) {
                        removeLinks(id: $id)
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