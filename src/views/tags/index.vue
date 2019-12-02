<template>
    <v-card flat>
        <v-card-title>
            <v-subheader>管理分类</v-subheader>
            <v-btn dark color="deep-purple accent-3" rounded small @click="drawer = true">新增</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="allTags.data"
            show-select
            item-key="id"
            :loading="$apollo.queries.allTags.loading"
            loading-text="加载中请稍候..."
            :page.sync="allTags.pageCount"
            hide-default-footer
        >
            <template v-slot:item.label="{ item }">
                <v-btn @click="show(item)" text color="primary" dark small rounded>{{ item.label }}</v-btn>
            </template>
            <template v-slot:item.color="{ item }">
                <!-- <v-avatar :color="item.color" size="36"></v-avatar> -->
            </template>
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
                            <v-list-item-title>{{ Object.keys(data).length ? '修改标签' : '新增标签' }}</v-list-item-title>
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
                            <v-text-field
                                v-model="tags.desc.value"
                                :rules="tags.desc.rule"
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
            <v-pagination v-model="page" :length="allTags.last_page" :total-visible="7"></v-pagination>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ALLTAGS, UPDATETAGS, NEWTAGS, DELETETAGS } from '@/graphql'

@Component<Tags>({
    apollo: {
        allTags: {
            query: ALLTAGS,
            variables: {
                page: 1,
                limit: 10
            }
        }
    }
})
export default class Tags extends Vue {
    private page: number = 1
    private allTags: any = {}
    // 验证
    private valid: boolean = true
    // 右侧表单
    private drawer: boolean = false
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
        },
        desc: {
            value: '',
            rule: []
        }
    }
    private headers: Array<object | []> = [
        { text: '标签', value: 'label' },
        { text: '别名', value: 'slug' },
        { text: '颜色', value: 'color' },
        { text: '热度', value: 'hot' },
        { text: '排序', value: 'order' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' }
    ]
    private data: any = {}

    @Watch('page')
    private async pagination(newPage: number, oldPage: number): Promise<void> {
        this.$apollo.queries.allTags.fetchMore({
            variables: {
                page: newPage,
                limit: 10
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                this.allTags = fetchMoreResult.allTags
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
        this.tags.label.value = this.data.label
        this.tags.slug.value = this.data.slug
        this.tags.desc.value = this.data.desc
        this.tags.color.value = this.data.color
    }

    private async save(): Promise<void> {
        if ((this.$refs.form as any).validate()) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: Object.keys(this.data).length
                        ? UPDATETAGS
                        : NEWTAGS,
                    variables: {
                        data: {
                            label: await this.tags.label.value,
                            slug: await this.tags.slug.value,
                            desc: await this.tags.desc.value,
                            color: await this.tags.color.value
                        },
                        id: Object.keys(this.data).length
                            ? await this.data.id
                            : undefined
                    }
                })
                if (!Object.keys(this.data).length) {
                    this.allTags.data.push(result.data.newTags)
                }
                this.$toast.info(
                    `${Object.keys(this.data).length ? '修改' : '新增'}分类 '${
                        Object.keys(this.data).length
                            ? result.data.updateTags.label
                            : result.data.newTags.label
                    }'`
                )
                this.drawer = false
            } catch (error) {
                this.$toast.error(
                    `${
                        Object.keys(this.data).length ? '修改' : '新增'
                    }分类失败:${error}`
                )
            }
        }
    }
    private async remove() {
        try {
            const result = await this.$apollo.mutate({
                mutation: DELETETAGS,
                variables: {
                    id: this.data.id
                }
            })
            this.allTags.data.splice(
                this.allTags.data.findIndex((v: any) => v.id === this.data.id),
                1
            )
            this.$toast.info(`删除分类 '${this.data.label}'`)
            this.drawer = false
        } catch (error) {
            this.$toast.error(`删除分类失败:${error}`)
        }
    }
}
</script>
