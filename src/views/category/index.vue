<template>
    <v-card flat>
        <v-card-title>
            <v-subheader>管理分类</v-subheader>
            <v-btn dark color="deep-purple accent-3" rounded small @click="drawer = true">新增</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="allCategory.data"
            show-select
            item-key="id"
            :loading="$apollo.queries.allCategory.loading"
            loading-text="加载中请稍候..."
            :page.sync="allCategory.pageCount"
            hide-default-footer
        >
            <template v-slot:item.label="{ item }">
                <v-btn @click="show(item)" text color="primary" dark small rounded>{{ item.label }}</v-btn>
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
                            <v-list-item-title>{{ Object.keys(data).length ? '修改分类' : '新增分类' }}</v-list-item-title>
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
                        <v-btn text small @click="save()">确认</v-btn>
                        <v-btn text small v-show="Object.keys(data).length" @click="remove()">删除</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-navigation-drawer>
        <v-card-actions>
            <v-pagination v-model="page" :length="allCategory.last_page" :total-visible="7"></v-pagination>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import {
    ALLCATEGORY,
    ONCHANGECATEGORY,
    NEWCATEGORY,
    UPDATECATEGORY,
    DELETECATEGORY
} from '@/graphql'
@Component<Category>({
    apollo: {
        allCategory: {
            query: ALLCATEGORY,
            variables: {
                page: 1,
                limit: 10
            }
        }
    }
})
export default class Category extends Vue {
    private page: number = 1
    private allCategory: any = {}
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
    // 验证
    private valid: boolean = true
    // 右侧表单
    private drawer: boolean = false
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
    private data: any = {}

    @Watch('page')
    private async pagination(newPage: number, oldPage: number): Promise<void> {
        this.$apollo.queries.allCategory.fetchMore({
            variables: {
                page: newPage,
                limit: 10
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                this.allCategory = fetchMoreResult.allCategory
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
        this.category.label.value = this.data.label
        this.category.slug.value = this.data.slug
        this.category.desc.value = this.data.desc
        this.category.parent.value = this.data.parent
    }

    private async save(): Promise<void> {
        if ((this.$refs.form as any).validate()) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: Object.keys(this.data).length
                        ? UPDATECATEGORY
                        : NEWCATEGORY,
                    variables: {
                        data: {
                            label: await this.category.label.value,
                            slug: await this.category.slug.value,
                            desc: await this.category.desc.value,
                            parent: await this.category.parent.value
                        },
                        id: Object.keys(this.data).length
                            ? await this.data.id
                            : undefined
                    }
                })
                if (!Object.keys(this.data).length) {
                    this.allCategory.items.push(result.data.newCategory)
                }
                this.$toast.info(
                    `${Object.keys(this.data).length ? '修改' : '新增'}分类 '${
                        Object.keys(this.data).length
                            ? result.data.updateCategory.label
                            : result.data.newCategory.label
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
                mutation: DELETECATEGORY,
                variables: {
                    id: this.data.id
                }
            })
            this.allCategory.items.splice(
                this.allCategory.items.findIndex(
                    (v: any) => v.id === this.data.id
                ),
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
