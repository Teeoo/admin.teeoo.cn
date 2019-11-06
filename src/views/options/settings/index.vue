<template>
  <v-form
    lazy-validation="lazy-validation"
    ref="form"
  >
    <v-card flat>
      <v-subheader>基础设置</v-subheader>
      <v-card-text>
        <v-text-field label="站点名称"></v-text-field>
        <v-text-field label="站点地址"></v-text-field>
        <v-text-field label="站点描述"></v-text-field>
        <v-text-field label="站点关键词"></v-text-field>
      </v-card-text>
    </v-card>
  </v-form>
</template>