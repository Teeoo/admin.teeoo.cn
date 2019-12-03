<template>
    <v-card flat>
        <v-card-title>
            <v-subheader>管理文章</v-subheader>
            <v-btn dark color="deep-purple accent-3" rounded small to="article/add">新增</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="allArticle.data"
            show-select
            item-key="id"
            :loading="$apollo.loading"
            loading-text="Loading... Please wait"
            hide-default-footer
        >
            <template
                v-slot:item.category.label="{ item }"
            >{{ item.type==='article' ? item.category.label:'页面无分类' }}</template>
            <template v-slot:item.allowComment="{ item }">{{ item.allowComment ? '允许':'不允许' }}</template>
            <template v-slot:item.isTop="{ item }">{{ item.isTop ? '置顶':'不置顶' }}</template>
            <template v-slot:item.status="{ item }">{{ item.status ? '发布':'草稿' }}</template>
            <template v-slot:item.type="{ item }">{{ item.type==='article' ? '文章':'页面' }}</template>
            <template v-slot:item.template="{ item }">{{ item.template | formatTemplate }}</template>
            <template v-slot:item.publish="{ item }">
                <label v-if="item.publish === 'publish'">公开</label>
                <label v-else-if="item.publish ==='hidden'">隐藏</label>
                <label v-else>加密</label>
            </template>
            <template v-slot:item.createdAt="{ item }">{{item.createdAt | fromNow}}</template>
            <template v-slot:item.updatedAt="{ item }">{{item.updatedAt | fromNow}}</template>
            <template v-slot:item.action="{ item }">
                <v-btn :to="`/article/update/${item.id}`" icon>
                    <v-icon small color="purple">edit</v-icon>
                </v-btn>
                <v-btn icon @click="del(item)">
                    <v-icon small color="red">delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-card-actions>
            <v-pagination v-model="page" :length="allArticle.last_page" :total-visible="7"></v-pagination>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ALLARTICLE, DELETEARTICLE } from '@/graphql'

@Component<Article>({
    apollo: {
        allArticle: {
            query: ALLARTICLE,
            variables: {
                page: 1,
                limit: 10
            },
            error({ message }) {
                this.$toast.error(message)
            }
        }
    }
})
export default class Article extends Vue {
    private page: number = 1
    private headers: Array<object | []> = [
        { text: '文章标题', value: 'title' },
        { text: '分类', value: 'category.label' },
        { text: '作者', value: 'author.name' },
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

    private allArticle: any = {}

    @Watch('page')
    private async pagination(newPage: number, oldPage: number): Promise<void> {
        this.$apollo.queries.allArticle.fetchMore({
            variables: {
                page: newPage,
                limit: 10
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                this.allArticle = fetchMoreResult.allArticle
            }
        })
    }

    private async del(item: any): Promise<void> {
        const data = item.title
        try {
            const result = await this.$apollo.mutate({
                mutation: DELETEARTICLE,
                variables: {
                    id: item.id
                }
            })
            this.allArticle.data.splice(
                this.allArticle.data.findIndex((v: any) => v.id === item.id),
                1
            )
            this.$toast.info(`成功删除文章 '${data}'`)
        } catch (error) {
            this.$toast.error(`删除文章失败:${error}`)
        }
    }
}
</script>