<template>
  <v-form
    lazy-validation="lazy-validation"
    ref="form"
    v-model="valid"
  >
    <v-card flat>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="9"
        >
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
              <Editor
                ref=md
                v-model="content"
              />
            </v-card-text>
            <v-card-text>
              <span>共计:</span>
              <v-chip
                color="primary"
                small="small"
                text-color="white"
              >字数 {{markdown.length}}
              </v-chip>
              <span>其中包含:</span>
              <v-chip
                color="red"
                small="small"
                text-color="white"
              >0 个文字
              </v-chip>
              <v-chip
                color="green"
                small="small"
                text-color="white"
              > 个符号
              </v-chip>
              <v-chip
                color="pink"
                small="small"
                text-color="white"
              >0 个字母
              </v-chip>
              <v-chip
                color="teal"
                small="small"
                text-color="white"
              >0 个数字
              </v-chip>
              <v-chip
                color="orange"
                small="small"
                text-color="white"
              > 个emoji
              </v-chip>
            </v-card-text>
            <v-card-text>
              <v-row
                align="center"
                justify="center"
                no-gutters
                :key="index"
                v-for="(list,index) in fields"
              >
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-text-field
                    v-model="list.name"
                    :label="`字段 ${index+1}`"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-select
                    label="字段类型"
                    :items="fieldsType"
                    v-model="list.type"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-text-field
                    v-model="list.value"
                    :label="`字段值`"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                >
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
        <v-col
          cols="12"
          sm="3"
        >
          <v-card flat="flat">
            <v-tabs
              align-with-title
              background-color="transparent"
              v-model="tab"
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab :key="1">
                选项
              </v-tab>
              <v-tab :key="2">
                附件
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item :key="1">
                <v-card-text>
                  <v-select
                    item-text="text"
                    item-value="value"
                    label="内容类别"
                    :items="type"
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
                    <v-radio label="发布文章"></v-radio>
                    <v-radio label="保存草稿"></v-radio>
                  </v-radio-group>
                  <v-select
                    label="内容公开度"
                    item-text="text"
                    item-value="value"
                    :items="publish"
                  ></v-select>
                  <v-text-field label="密码"></v-text-field>
                  <v-switch
                    label="允许评论"
                    color="red"
                  ></v-switch>
                  <v-switch
                    label="是否置顶"
                    color="red"
                  ></v-switch>
                  <v-select
                    label="模板"
                    item-text="text"
                    item-value="value"
                    :items="template"
                  ></v-select>
                </v-card-text>

              </v-tab-item>
              <v-tab-item :key="2">
                <v-card-text>

                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Editor from '../../components/editor/editor.vue'

@Component({
    components: {
        Editor
    }
})
export default class AddArticle extends Vue {
    private valid: boolean = true
    private tab: number = 0
    private fields: Array<Object> = []
    private fieldsType: Array<Object> = [
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
    private markdown: string = ``
    private content: string = ''

    // 内容类别
    private type: Array<object> = [
        { text: '文章', value: 'article' },
        { text: '页面', value: 'page' }
    ]
    // 内容公开状态
    private publish: Array<object> = [
        { text: '公开', value: 'publish' },
        { text: '隐藏', value: 'hidden' },
        { text: '密码保护', value: 'password' }
    ]
    // 页面模板
    private template: Array<object> = [
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
    private data: object = {
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
        }
    }

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

    @Watch('content', { deep: true })
    private onText(val: any, oldVal: any) {
        this.markdown = (this.$refs.md as any).text
    }
}
</script>
