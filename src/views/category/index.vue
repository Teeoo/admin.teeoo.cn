<template>
  <v-card flat>
    <v-card-title>
      <v-subheader>管理分类</v-subheader>
      <v-btn
        small
        label
        dark
        color="deep-purple accent-4"
      >
        新增
      </v-btn>
      <v-spacer></v-spacer>
      <v-select
        :items="headers"
        label="字段"
        v-model="filters.header"
      ></v-select>
      <v-menu
        v-model="start"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startdate"
            label="开始时间"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filters.createdAt"
          @input="start = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="end"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="filters.updatedAt"
            label="结束时间"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filters.updatedAt"
          @input="end = false"
        ></v-date-picker>
      </v-menu>
      <v-form>
        <v-text-field
          v-model="search"
          prepend-icon="search"
          label="search"
          single-line
        ></v-text-field>
      </v-form>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class Dashboard extends Vue {
    // 开始时间菜单
    private start: boolean = false
    // 开始时间
    private startdate: any = new Date().toISOString().substr(0, 10)
    // 结束菜单
    private end: boolean = false
    // 结束时间
    private filters: object = {
        header: null,
        createdAt: null,
        updatedAt: null
    }
    private enddate: any = null
    private headers: Array<object | []> = [
        {
            text: '分类名',
            align: 'left',
            sortable: false,
            value: 'label'
        },
        { text: '分类别名', value: 'slug' },
        { text: '描述', value: 'desc' },
        { text: '子分类数量', value: 'count' },
        { text: '该分类下存在的文章数量', value: 'ArticleCount' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' }
    ]
    private search: string = ''
}
</script>