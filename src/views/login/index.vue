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
                  rounded
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
import { onLogin } from '../../plugins'

@Component
export default class Login extends Vue {
    @Action setToken!: Function
    @Action setUser!: Function
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
                        query($data: LoginUserInput!) {
                            login(data: $data) {
                                access_token
                                token_type
                                expires_in
                                user {
                                    id
                                    order
                                    desc
                                    createdAt
                                    updatedAt
                                    nickname
                                    avatarUrl
                                    email
                                    url
                                    screenName
                                    exinfo
                                    lastIp
                                    lastTime
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
                const apolloClient = this.$apollo.provider.defaultClient
                await onLogin(apolloClient)
                this.setToken(result.data.login.access_token)
                this.setUser(result.data.login.user)
                this.$router.push('/')
            } catch (error) {
                console.info(error)
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