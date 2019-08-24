<template>
  <v-app
    class="login"
    id="inspire"
  >
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >

            <v-card flat>
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">登录 BLOG</h1>
                </div>
                <v-form>
                  <v-text-field
                    label="用户名"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="login"
                >登陆</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
    private login() {
        this.$toast('Default toast')

        // this.$toast.info('Info toast')
    }
}
</script>
<style lang="stylus">
.login 
	background linear-gradient(87deg, #5e72e4, #825ee4) !important
	height 50%
	width 100%
	position absolute
</style>