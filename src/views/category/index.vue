<template>
    <v-card flat>
        <v-card-title>
            <v-subheader>管理分类</v-subheader>
            <v-btn dark color="deep-purple accent-3" rounded small>新增</v-btn>
        </v-card-title>
        <v-skeleton-loader
            :loading="$apollo.queries.allCategory.loading"
            transition="scroll-y-reverse-transition"
            type="table"
        >
            <v-data-table
                :headers="headers"
                :items="allCategory.items"
                show-select
                item-key="id"
                :loading="$apollo.queries.allCategory.loading"
                loading-text="加载中请稍候..."
                :page.sync="allCategory.pageCount"
                hide-default-footer
            ></v-data-table>
        </v-skeleton-loader>
        <v-card-actions>
            <v-pagination v-model="page" :length="allCategory.pageCount" :total-visible="7"></v-pagination>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ALLCATEGORY } from '@/graphql'
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
    private options: object = {}

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
}
</script>
