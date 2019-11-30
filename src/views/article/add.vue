<template>
    <v-form lazy-validation="lazy-validation" ref="form" v-model="valid">
        <v-card flat>
            <v-row no-gutters>
                <v-col cols="12" sm="9">
                    <v-card flat="flat">
                        <v-card-text>
                            <v-text-field label="标题"></v-text-field>
                            <v-text-field label="别名"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                            <mavon-editor
                                ref="md"
                                :ishljs="false"
                                style="height:450px;width:100%;box-shadow:none;"
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
                                    <v-text-field
                                        v-model="list.name"
                                        :label="`字段 ${index + 1}`"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-select
                                        label="字段类型"
                                        :items="fieldsType"
                                        v-model="list.type"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-text-field
                                        v-model="list.value"
                                        :label="`字段值`"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-btn
                                        text
                                        small
                                        rounded
                                        color="deep-purple accent-3"
                                        @click="delFields(index)"
                                        >删除字段</v-btn
                                    >
                                </v-col>
                            </v-row>
                            <v-btn
                                text
                                small
                                rounded
                                color="deep-purple accent-3"
                                @click="addFields"
                                >添加字段</v-btn
                            >
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
                            ></v-select>
                            <v-combobox
                                item-text="label"
                                item-value="id"
                                clearable="clearable"
                                hide-selected="hide-selected"
                                multiple="multiple"
                                small-chips="small-chips"
                                label="标签"
                            ></v-combobox>
                            <v-select
                                clearable="clearable"
                                item-text="label"
                                item-value="id"
                                label="分类"
                            ></v-select>
                            <v-radio-group row="row">
                                <v-radio label="发布"></v-radio>
                                <v-radio label="草稿"></v-radio>
                            </v-radio-group>
                            <v-select
                                label="内容公开度"
                                item-text="text"
                                item-value="value"
                            ></v-select>
                            <v-text-field label="密码"></v-text-field>
                            <v-switch label="允许评论" color="red"></v-switch>
                            <v-switch label="是否置顶" color="red"></v-switch>
                            <v-select
                                label="自定义模板"
                                item-text="text"
                                item-value="value"
                            ></v-select>
                        </v-card-text>
                        <v-card-actions>
                            <!-- <v-spacer></v-spacer> -->
                            <v-btn rounded color="deep-purple accent-4" dark
                                >发布文章</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-form>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component<NewArticle>({
    apollo: {}
})
export default class NewArticle extends Vue {
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
}
</script>
