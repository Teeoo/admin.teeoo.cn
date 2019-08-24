<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    :bottom="y === 'bottom'"
    :top="y === 'top'"
    :left="x === 'left'"
    :right="x === 'right'"
    :multi-line="multiLine"
    :vertical="vertical"
    v-model="active"
    class="v-application vts"
    :class="classes"
    @click="dismiss"
    role="alert"
  >
    <v-icon
      dark
      left
      v-if="!!icon"
      class="vts__icon"
      :color="iconColor"
    >
      {{ icon }}
    </v-icon>

    <div
      class="vts__message"
      :class="{ 'vts__message--padded': showClose && !closeText }"
      v-html="message"
    ></div>

    <v-btn
      :icon="!closeText"
      :text="!!closeText"
      class="vts__close"
      :class="{ 'vts__close--icon': !closeText }"
      :color="closeColor"
      v-if="showClose"
      @click="close"
    >
      <v-icon v-if="!closeText">close</v-icon>
      <span v-if="!!closeText">{{ closeText }}</span>
    </v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {
    @Prop({ type: String, default: 'right' }) private x!: string
    @Prop({ type: String, default: 'bottom' }) private y!: string
    @Prop({ type: String, default: 'info' }) private color!: string
    @Prop({ type: String }) private message!: string
    @Prop({ type: Number, default: 3000 }) private timeout!: number
    @Prop({ type: Boolean, default: true }) private dismissable!: boolean
    @Prop({ type: Boolean, default: false }) private autoHeight!: boolean
    @Prop({ type: Boolean, default: false }) private multiLine!: boolean
    @Prop({ type: Boolean, default: false }) private vertical!: boolean

    private active: boolean = false

    @Watch('active')
    @Emit('statusChange')
    public activeChanged(val: string, oldVal: string): void {
        return
    }

    private mounted() {
        this.$nextTick(() => this.show())
    }

    private show() {
        this.active = true
    }
    private close() {
        this.active = false
    }
    private dismiss() {
        if (this.dismissable) {
            this.close()
        }
    }
}
</script>

<style lang="stylus">
.vts 
	max-width none !important
	width auto !important
	.v-snack__content 
		justify-content flex-start
	&.v-snack--vertical 
		.vts__icon 
			margin 0 0 12px !important
			& + .vts__message 
				padding-top 0
		.v-snack__content 
			padding-bottom 16px !important
		.vts__message--padded 
			padding 12px 0 0
		.vts__close 
			margin 12px 0 -8px !important
		.vts__close--icon 
			margin 0 !important
			position absolute
			right 4px
			top 4px
			transform scale(0.75)
			padding 4px !important
.vts__icon 
	margin-right 12px
.vts__message 
	margin-right auto
.vts__close 
	margin 0 -8px 0 24px !important
	justify-self flex-end
</style>