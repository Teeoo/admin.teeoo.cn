<template>
    <div>
        <label for="search">Search for something:</label>
        <input type="text" id="search" class="input-field" />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { pluck } from 'rxjs/operators'

@Component<Dashboard>({
    subscriptions() {
        return {
            news: this.$fromDOMEvent('input', 'keyup').pipe(
                pluck<Event, string>('target', 'value')
            )
        }
    }
})
export default class Dashboard extends Vue {
    private news: string
}
</script>
