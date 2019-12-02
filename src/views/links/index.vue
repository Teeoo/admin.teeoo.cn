<template>
    <v-card flat>
        <v-card-title>
            <v-subheader>管理友联</v-subheader>
            <v-btn dark color="deep-purple accent-3" rounded small @click="drawer = true">新增</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="allLinks.data"
            show-select
            item-key="id"
            :loading="$apollo.queries.allLinks.loading"
            loading-text="加载中请稍候..."
            :page.sync="allLinks.pageCount"
            hide-default-footer
        >
            <template v-slot:item.name="{ item }">
                <v-btn text color="primary" dark small rounded @click="show(item)">{{item.name}}</v-btn>
            </template>
            <template v-slot:item.logo="{ item }">
                <v-avatar size="32">
                    <v-img :src="item.logo" />
                </v-avatar>
            </template>
            <template v-slot:item.status="{ item }">{{item.status?"显示":"不显示"}}</template>
            <template v-slot:item.createdAt="{ item }">
                {{
                item.createdAt | fromNow
                }}
            </template>
            <template v-slot:item.updatedAt="{ item }">
                {{
                item.updatedAt | fromNow
                }}
            </template>
        </v-data-table>
        <v-navigation-drawer floating v-model="drawer" fixed right temporary>
            <v-toolbar color="deep-purple accent-4" dark text>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>{{ Object.keys(data).length ? '修改友联' : '新增友联' }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn text icon @click="drawer = !drawer">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-container>
                <v-card flat>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation="lazy-validation">
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
                        <v-btn text small @click="save()">确认</v-btn>
                        <v-btn text small v-show="Object.keys(data).length" @click="remove()">删除</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-navigation-drawer>
        <v-card-actions>
            <v-pagination v-model="page" :length="allLinks.last_page" :total-visible="7"></v-pagination>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ALLLINKS, UPDATELINKS, NEWLINKS, DELETELINKS } from '@/graphql'

@Component<Tags>({
    apollo: {
        allLinks: {
            query: ALLLINKS,
            variables: {
                page: 1,
                limit: 10
            }
        }
    }
})
export default class Tags extends Vue {
    private page: number = 1
    private allLinks: any = {}
    // 验证
    private valid: boolean = true
    // 右侧表单
    private drawer: boolean = false
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
    private headers: Array<object | []> = [
        {
            text: 'logo',
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
    private data: any = {}

    @Watch('page')
    private async pagination(newPage: number, oldPage: number): Promise<void> {
        this.$apollo.queries.allLinks.fetchMore({
            variables: {
                page: newPage,
                limit: 10
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                this.allLinks = fetchMoreResult.allLinks
            }
        })
    }

    @Watch('drawer')
    private onDrawerChanged(val: boolean, oldVal: boolean) {
        if (!val) {
            this.data = {}
            const refs = this.$refs.form as any
            refs.reset()
            refs.validate()
        }
    }

    private show(item: object) {
        this.drawer = true
        this.data = item
        this.links.logo.value = this.data.logo
        this.links.url.value = this.data.url
        this.links.name.value = this.data.name
        this.links.desc.value = this.data.desc
        this.links.email.value = this.data.email
        this.links.target.value = this.data.target
        this.links.status.value = this.data.status
    }

    private async save(): Promise<void> {
        if ((this.$refs.form as any).validate()) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: Object.keys(this.data).length
                        ? UPDATELINKS
                        : NEWLINKS,
                    variables: {
                        data: {
                            url: await this.links.url.value,
                            name: await this.links.name.value,
                            desc: await this.links.desc.value,
                            email: await this.links.email.value,
                            logo: await this.links.logo.value,
                            target: await this.links.target.value,
                            status: await this.links.status.value
                        },
                        id: Object.keys(this.data).length
                            ? await this.data.id
                            : undefined
                    }
                })
                if (!Object.keys(this.data).length) {
                    this.allLinks.data.push(result.data.newLinks)
                }
                this.$toast.info(
                    `${Object.keys(this.data).length ? '修改' : '新增'}友联 '${
                        Object.keys(this.data).length
                            ? result.data.updateLinks.name
                            : result.data.newLinks.name
                    }'`
                )
                this.drawer = false
            } catch (error) {
                this.$toast.error(
                    `${
                        Object.keys(this.data).length ? '修改' : '新增'
                    }友联失败:${error}`
                )
            }
        }
    }
    private async remove() {
        try {
            const result = await this.$apollo.mutate({
                mutation: DELETELINKS,
                variables: {
                    id: this.data.id
                }
            })
            this.allLinks.data.splice(
                this.allLinks.data.findIndex((v: any) => v.id === this.data.id),
                1
            )
            this.$toast.info(`删除友联 '${this.data.name}'`)
            this.drawer = false
        } catch (error) {
            this.$toast.error(`删除友联失败:${error}`)
        }
    }
}
</script>
