<template>
  <ejs-toast
    ref='elementRef'
    id='element'
    :title='title'
    :content='message'
    :position='position'
    :timeOut="timeout"
    showProgressBar=true
  >
  </ejs-toast>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {
    @Prop({
        type: Object,
        default: () => {
            return {
                X: 'Right',
                Y: 'Top'
            }
        }
    })
    private position!: any
    @Prop({ type: String, default: '提示' })
    private title!: string
    @Prop({ type: String, default: '内容' })
    private message!: string
    @Prop({ type: Number, default: 5000 }) private timeout!: number
    private active: boolean = false

    private mounted() {
        (this.$refs.elementRef as any).show()
    }
}
</script>