<template>
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
    <div
      class="content"
      :style="{ height: `360px` }"
    >
      <div
        class="editor"
        ref="content"
        @scroll="markdownScroll"
        @mouseenter="mousescrollSide('markdown')"
      >
        <!-- <ul
          class="index"
          ref="index"
          :style="{height:`100%`}"
        >
          <li
            :key="index"
            v-for="(item,index) in indexLenth"
          >{{index+1}}</li>
        </ul> -->
        <textarea
          placeholder="请输入内容"
          class="text"
          v-model="text"
          ref="textarea"
          :style="{ height: `${height}px`,width:`100%` }"
        ></textarea>
      </div>
      <div
        ref="preview"
        @scroll="previewScroll"
        @mouseenter="mousescrollSide('preview')"
        class="preview"
        :style="{ height: `100%`,width:`100%` }"
      >
        <div v-html="html"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import '@/assets/font/iconfont.css'
import { Vue, Component, Watch } from 'vue-property-decorator'
import MarkdownIt from 'markdown-it'
import twemoji from 'twemoji'

@Component({
    components: {}
})
export default class Editor extends Vue {
    private height: number = 360
    private indexLenth: number = 0
    private scroll: string = 'markdown'
    private text: string = ``
    private html: string = ''

    @Watch('text', { deep: true })
    private onText(val: any, oldVal: any) {
        const markdown = MarkdownIt({
            html: true
        })
            .use(require('markdown-it-emoji'))
            .use(require('markdown-it-toc'))

        const md = markdown.render(val)

        this.html = md

        this.indexLenth = val.split(/\n/).length

        this.$emit('input', this.html)
        // console.info(this.indexLenth)
        const height1 = this.indexLenth * 22
        const height2 = (this.$refs.textarea as HTMLElement).scrollHeight
        const height3 = (this.$refs.preview as HTMLElement).scrollHeight
        this.height = Math.max(height1, height2, height3)
        this.indexLenth = this.height / 22 - 1
    }

    public mounted(): void {
        this.indexLenth = this.text.split(/\n/).length
        const height1 = this.indexLenth * 22
        const height2 = (this.$refs.textarea as HTMLElement).scrollHeight
        const height3 = (this.$refs.preview as HTMLElement).scrollHeight
        this.height = Math.max(height1, height2, height3)
        this.indexLenth = this.height / 22 - 1
    }
    private markdownScroll() {
        if (this.scroll === 'markdown') {
            const markdown: HTMLElement = this.$refs.content as HTMLElement
            const preview: HTMLElement = this.$refs.preview as HTMLElement
            const markdownScrollHeight = markdown.scrollHeight
            const markdownScrollTop = markdown.scrollTop
            const previewScrollHeight = preview.scrollHeight
            // console.info(markdownScrollHeight)
            preview.scrollTop =
                (markdownScrollTop / markdownScrollHeight) * previewScrollHeight
        }
    }
    private mousescrollSide(side: string) {
        // console.info(side)
        this.scroll = side
    }
    private previewScroll() {
        if (this.scroll === 'preview') {
            const markdown: HTMLElement = this.$refs.content as HTMLElement
            const preview: HTMLElement = this.$refs.preview as HTMLElement
            const markdownScrollHeight = markdown.scrollHeight
            const previewScrollHeight = preview.scrollHeight
            const previewScrollTop = preview.scrollTop
            markdown.scrollTop =
                (previewScrollTop / previewScrollHeight) * markdownScrollHeight
        }
    }
}
</script>
<style lang="stylus">
.markdown {
}
.toolbars {
}
.content {
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
}
.editor {
    flex: 1;
    display: flex;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
}
.index {
    min-height: 100%;
    width: 36px;
    line-height: 22px;
    // padding: 12px 0;
}
.index li {
    color: #ccc;
    font-size: 14px;
    text-align: center;
    font-family: Consolas;
    list-style-type:none;
}
.v-application ul, .v-application ol {
    padding-left: 0px;
}
.text{
    overflow: hidden;
    resize: none;
}
::-webkit-scrollbar{
display:none;
}
.text:focus {
    outline: none;
}
.preview {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
}
</style>