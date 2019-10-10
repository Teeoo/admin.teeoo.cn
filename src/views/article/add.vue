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
              <v-text-field label="标题"></v-text-field>
              <v-text-field label="别名"></v-text-field>
              <div class="markdown">
                <div class="toolbars">
                  <div class="icon">
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconbold"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconitalic"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconheading"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconunderline"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconstrike"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconanchor"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconblockquote"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconorderedlist"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconunorderedlist"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconunlink"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconcode"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconimage"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconalignjustify1"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconpreview"
                        small
                      ></v-icon>
                    </v-btn>

                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconsave"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconprint"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconfullscreen"
                        small
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                    >
                      <v-icon
                        class="iconfont iconhelp"
                        small
                      ></v-icon>
                    </v-btn>
                  </div>
                </div>
                <v-row no-gutters>
                  <v-col
                    cols="6"
                    sm="6"
                  >
                    <v-textarea
                      ref="markdown"
                      @scroll="markdownScroll"
                      @mouseenter="mousescrollSide('markdown')"
                      v-model="text"
                      :height="450"
                      flat
                      clearable
                      dense
                      full-width
                    ></v-textarea>
                    <!-- <textarea
                      @scroll="markdownScroll"
                      @mouseenter="mousescrollSide('markdown')"
                      ref="markdown"
                      v-model="text"
                      style="width:100%;height:100%"
                    >
                    </textarea> -->
                  </v-col>
                  <v-col
                    cols="6"
                    sm="6"
                  >
                    <div
                      :style="{ height: `${height}px`,overflow: `hidden`, soverflowY: `scroll` }"
                      v-html="html"
                      ref="preview"
                      @scroll="previewScroll"
                      @mouseenter="mousescrollSide('preview')"
                    ></div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-text>
              <span>共计:</span>
              <v-chip
                color="primary"
                small="small"
                text-color="white"
              >字数 0
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
                    label="公开度"
                    item-text="text"
                    item-value="value"
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
import '@/assets/font/iconfont.css'
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as twemoji from 'twemoji'

@Component({
    components: {}
})
export default class AddArticle extends Vue {
    private height: number = 0
    private scroll: string = 'markdown'
    // 验证
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
    private text: string = `
## 目录
* [横线](#横线)
* [标题](#标题)
* [文本](#文本)
    * 普通文本
    * 单行文本
    * 多行文本
    * 文字高亮
    * 换行
    * 斜体
    * 粗体
    * 删除线
* [图片](#图片)
    * 来源于网络的图片
    * GitHub仓库中的图片
* [链接](#链接) 
    * 文字超链接
        *  链接外部URL
        *  链接本仓库里的URL
    *  锚点
    * [图片链接](#图片链接)
* [列表](#列表)
    * 无序列表
    * 有序列表
    * 复选框列表
* [块引用](#块引用)
* [代码高亮](#代码高亮)
* [表格](#表格) 
* [表情](#表情)
* [diff语法](#diff语法)
    `

    private html: string = ''

    // public $refs!: {
    //     scrollView: AddArticle
    // }

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

    @Watch('text', { deep: true })
    private onText(val: any, oldVal: any) {
        const markdown = require('markdown-it')({
            html: true,
            linkify: true,
            typography: true
        })
            .use(require('markdown-it-emoji'))
            .use(require('markdown-it-toc'))

        const md = markdown.render(val)

        this.html = md
    }

    public mounted(): void {
        this.height = (this.$refs.markdown as any).$el.querySelector(
            'textarea'
        ).scrollHeight
    }

    private markdownScroll() {
        if (this.scroll === 'markdown') {
            const markdown: any = (this.$refs
                .markdown as any).$el.querySelector('textarea')
            console.info(
                (this.$refs.markdown as any).$el.querySelector('textarea')
                    .scrollHeight
            )
            const preview: any = this.$refs.preview
            const markdownScrollHeight = markdown.scrollHeight
            const markdownScrollTop = markdown.scrollTop
            const previewScrollHeight = preview.scrollHeight

            preview.scrollTop =
                (markdownScrollTop / markdownScrollHeight) * previewScrollHeight
        }
    }
    private mousescrollSide(side: string) {
        console.info(side)
        this.scroll = side
    }
    private previewScroll() {
        if (this.scroll === 'preview') {
            const markdown: any = (this.$refs
                .markdown as any).$el.querySelector('textarea')
            const preview: any = this.$refs.preview
            const markdownScrollHeight = markdown.scrollHeight
            const previewScrollHeight = preview.scrollHeight
            const previewScrollTop = preview.scrollTop
            console.info(previewScrollHeight)
            markdown.scrollTop =
                (previewScrollTop / previewScrollHeight) * markdownScrollHeight
        }
    }
}
</script>
<style lang="stylus" scoped>
.toolbars {
}
::-webkit-scrollbar{
display:none;
}
input:focus, textarea:focus {

    outline: none;

}
</style>
