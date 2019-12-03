<template>
    <v-form lazy-validation="lazy-validation" ref="form" v-model="valid">
        <v-card flat>
            <v-row no-gutters>
                <v-col cols="12" sm="9">
                    <v-card flat="flat">
                        <v-card-text>
                            <v-text-field
                                label="标题"
                                v-model="data.title.value"
                                :rules="data.title.rule"
                            ></v-text-field>
                            <v-text-field
                                label="别名"
                                v-model="data.slug.value"
                                :rules="data.slug.rule"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-text>
                            <mavon-editor
                                ref="md"
                                :ishljs="false"
                                style="height:450px;width:100%;box-shadow:none;"
                                v-model="text"
                            />
                        </v-card-text>
                        <v-card-text>
                            <v-row
                                align="center"
                                justify="center"
                                no-gutters
                                :key="index"
                                v-for="(list, index) in fields"
                            >
                                <v-col cols="12" sm="3">
                                    <v-text-field v-model="list.name" :label="`字段 ${index + 1}`"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-select label="字段类型" :items="fieldsType" v-model="list.type"></v-select>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-text-field v-model="list.value" :label="`字段值`"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-btn
                                        text
                                        small
                                        rounded
                                        color="deep-purple accent-3"
                                        @click="delFields(index)"
                                    >删除字段</v-btn>
                                </v-col>
                            </v-row>
                            <v-btn
                                text
                                small
                                rounded
                                color="deep-purple accent-3"
                                @click="addFields"
                            >添加字段</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="3">
                    <v-card flat="flat">
                        <v-card-text>
                            <v-select
                                item-text="text"
                                item-value="value"
                                label="内容类别"
                                :items="type"
                                v-model="data.type.value"
                                :rules="data.type.rule"
                            ></v-select>
                            <v-combobox
                                item-text="label"
                                item-value="id"
                                clearable="clearable"
                                hide-selected="hide-selected"
                                multiple="multiple"
                                small-chips="small-chips"
                                label="标签"
                                v-model="data.tags.value"
                                :rules="data.tags.rule"
                            ></v-combobox>
                            <v-select
                                clearable="clearable"
                                item-text="label"
                                item-value="id"
                                label="分类"
                                :items="_allCategory"
                                :disabled="disabled"
                                v-model="data.category.value"
                                :rules="data.type.value==='article' ? [v => !!v || '分类不可为空']:[]"
                            ></v-select>
                            <v-radio-group
                                row="row"
                                v-model="data.status.value"
                                :rules="data.status.rule"
                            >
                                <v-radio label="发布" :value="true"></v-radio>
                                <v-radio label="草稿" :value="false"></v-radio>
                            </v-radio-group>
                            <v-select
                                label="内容公开度"
                                item-text="text"
                                item-value="value"
                                :items="publish"
                                v-model="data.publish.value"
                                :rules="data.publish.rule"
                                :disabled="disabled"
                            ></v-select>
                            <v-text-field
                                v-if="password"
                                v-model="data.password.value"
                                :rules="data.password.rule"
                                label="密码"
                            ></v-text-field>
                            <v-switch
                                label="允许评论"
                                color="red"
                                v-model="data.allowComment.value"
                                :rules="data.allowComment.rule"
                            ></v-switch>
                            <v-switch
                                label="是否置顶"
                                color="red"
                                :disabled="disabled"
                                v-model="data.isTop.value"
                                :rules="data.isTop.rule"
                            ></v-switch>
                            <v-select
                                label="自定义模板"
                                item-text="text"
                                item-value="value"
                                :disabled="!disabled"
                                :items="template"
                                v-model="data.template.value"
                                :rules="data.template.rule"
                            ></v-select>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                rounded
                                color="deep-purple accent-4"
                                @click="add()"
                                :loading="loading"
                                :disabled="!valid"
                                dark
                            >发布文章</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-form>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { _ALLCATEGORY, NEWARTICLE, ONEARTICLE, UPDATEARTICLE } from '@/graphql'
@Component<UpdateArticle>({
    apollo: {
        _allCategory: {
            query: _ALLCATEGORY,
            error(error) {
                this.$toast.error(error)
            }
        },
        oneArticle: {
            query: ONEARTICLE,
            variables() {
                return {
                    id: this.$route.params.id
                }
            },
            error({ message }) {
                this.$router.replace('/article')
                this.$toast.error(message)
            }
        }
    }
})
export default class UpdateArticle extends Vue {
    private oneArticle: any = {}
    private html: string = ``
    private text: string = ``
    private loading: boolean = false
    private _allCategory: any = []
    private valid: boolean = false
    private fields: any = []
    private fieldsType: any = [
        {
            text: '字符',
            value: 'text'
        },
        {
            text: '整数',
            value: 'int'
        },
        {
            text: '小数',
            value: 'float'
        }
    ]
    // 内容类别
    private type: any = [
        { text: '文章', value: 'article' },
        { text: '页面', value: 'page' }
    ]
    // 内容公开状态
    private publish: object[] = [
        { text: '公开', value: 'publish' },
        { text: '隐藏', value: 'hidden' },
        { text: '密码保护', value: 'password' }
    ]
    // 文章是否加密
    private password: boolean = false
    // 页面模板
    private template: any = [
        {
            value: 'default',
            text: '默认'
        },
        {
            value: 'files',
            text: '文章归档'
        },
        {
            value: 'links',
            text: '友情链接'
        },
        {
            value: 'cross',
            text: '时光机'
        },
        {
            value: 'github',
            text: 'github'
        },
        {
            value: 'message',
            text: '留言板'
        }
    ]
    // 如果是发布页面则禁用一些不必要的东西
    private disabled: boolean = false
    // 提交数据
    private data: any = {
        title: {
            value: '',
            rule: [(v: string) => !!v || '标题为必填项!']
        },
        slug: {
            value: '',
            rule: []
        },
        tags: {
            value: [],
            rule: []
        },
        type: {
            value: 'article',
            rule: []
        },
        status: {
            value: Boolean(true),
            rule: []
        },
        publish: {
            value: 'publish',
            rule: []
        },
        origin: {
            value: Number(1),
            rule: []
        },
        password: {
            value: '',
            rule: [(v: string) => !!v || '密码为必填项!']
        },
        allowComment: { value: Boolean(true), rule: [] },
        isTop: { value: Boolean(false), rule: [] },
        template: {
            value: 'default',
            rule: [(v: string) => !!v || '必须选择一个模板!']
        },
        category: {
            value: undefined
        }
    }

    private tags: any = []

    private addFields() {
        const code = {
            name: '',
            type: 'text',
            value: ''
        }
        this.fields.push(code)
    }
    private delFields(index: number) {
        this.fields.splice(index, 1)
    }

    @Watch('data', { deep: true })
    private onData(val: any, oldVal: any) {
        if (val.type.value === 'page') {
            this.disabled = true
            this.data.password.value = ''
            this.password = false
        } else {
            this.disabled = false
            this.data.password.value = ''
            this.password = false
        }
        if (val.publish.value === 'password') {
            this.password = true
        } else if (val.publish.value === 'publish') {
            this.data.password.value = ''
            this.password = false
        } else {
            this.data.password.value = ''
            this.password = false
        }
    }

    @Watch('oneArticle')
    private onOneArticle(val: any, oldVal: any) {
        this.data.title.value = val.title
        this.data.slug.value = val.slug
        this.data.category.value =
            val.type === 'article' ? val.category.id : undefined
        // this.html = val.html
        this.text = val.text
        this.data.type.value = val.type
        this.data.status.value = val.status
        this.data.publish.value = val.publish
        this.data.password.value = val.password
        this.data.allowComment.value = val.allowComment
        this.data.isTop.value = val.isTop
        this.data.template.value = val.template
        // this.fields = val.fields

        const tags: any = []

        val.tags.forEach((v: any) => {
            tags.push(v.label)
        })
        val.fields.forEach((v: any) => {
            this.fields.push({ name: v.name, type: v.type, value: v.value })
        })

        this.data.tags.value = tags
    }

    @Watch('text', { deep: true })
    private onText(val: any, oldVal: any) {
        const markdown = this.$refs.md as any
        this.html = markdown.d_render
    }
    private async add(): Promise<void> {
        this.loading = true
        await this.data.tags.value.forEach((v: any) => {
            this.tags.push({ label: v })
        })
        if ((this.$refs.form as any).validate()) {
            try {
                const result = await this.$apollo.mutate({
                    mutation: UPDATEARTICLE,
                    variables: {
                        id: this.oneArticle.id,
                        data: {
                            title: await this.data.title.value,
                            slug: await this.data.slug.value,
                            category: await this.data.category.value,
                            text: await this.text,
                            html: await this.html,
                            summary: (await this.html.split('<!--more-->')[0])
                                ? this.html.split('<!--more-->')[0]
                                : this.html
                                      .replace(/<[^>]+>/g, '')
                                      .substring(0, 80),
                            cover: '',
                            type: await this.data.type.value,
                            status: await this.data.status.value,
                            publish: await this.data.publish.value,
                            isTop: await this.data.isTop.value,
                            allowComment: await this.data.allowComment.value,
                            tags: await this.tags,
                            password: await this.data.password.value,
                            template: await this.data.template.value,
                            fields: await this.fields
                        }
                    }
                })
                const refs = this.$refs.form as any
                refs.reset()
                this.$router.replace({ path: '/article' })
            } catch (error) {
                this.$toast.error(error)
            }
        }
        this.loading = false
    }
}
</script>
