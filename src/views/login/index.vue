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
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    label="用户名"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="login.username.value"
                    :rules="login.username.rule"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="login.password.value"
                    :rules="login.password.rule"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="landing"
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
import gql from 'graphql-tag'
import { Action } from 'vuex-class'

@Component
export default class Login extends Vue {
    @Action private SET_TOKEN!: (data: string) => void
    @Action private SET_USER!: (data: object) => void
    private valid: boolean = true
    private loading: boolean = false
    private login: any = {
        username: {
            value: '',
            rule: [(v: string) => !!v || '用户名必须填写哦!']
        },
        password: {
            value: '',
            rule: [(v: string) => !!v || '不写密码真的好吗?']
        }
    }

    private async landing(): Promise<void> {
        this.loading = true
        if ((this.$refs.form as any).validate()) {
            try {
                const result = await this.$apollo.query({
                    query: gql`
                        query login($data: LoginUserInput!) {
                            login(loginUserInput: $data) {
                                access_token
                                token_type
                                expires_in
                                userinfo {
                                    uid
                                    nickname
                                    avatar
                                    email
                                    url
                                    screenName
                                    last_login_ip
                                    last_login_time
                                    created_at
                                    updated_at
                                }
                            }
                        }
                    `,
                    variables: {
                        data: {
                            nickname: await this.login.username.value,
                            password: await this.login.password.value
                        }
                    }
                })
                this.SET_TOKEN(result.data.login.access_token)
                this.SET_USER(result.data.login.userinfo)
                this.$router.push('/')
            } catch (error) {
                this.$toast(`${error.graphQLErrors[0].message}`, {
                    icon: 'error'
                })
            }
        }
        this.loading = false
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