<template>
    <v-app class="login" id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card flat>
                            <v-toolbar color="deep-purple accent-4" dark>
                                <v-toolbar-title>登录 BLOG</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
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
                                    :disabled="!valid"
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
import { onLogin } from '@/plugins'
import { SIGNIN } from '@/graphql'

@Component<SignIn>({})
export default class SignIn extends Vue {
    @Action private setToken!: any
    @Action private setUser!: any
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
                    query: SIGNIN,
                    variables: {
                        data: {
                            name: await this.login.username.value,
                            password: await this.login.password.value
                        }
                    }
                })
                this.setToken(result.data.SignIn.accessToken)
                this.setUser(result.data.SignIn.User)
                const apolloClient = this.$apollo.provider.defaultClient
                await onLogin(apolloClient)
                this.$route.query.redirect
                    ? this.$router.push(
                          decodeURIComponent(
                              this.$route.query.redirect as any
                          ) as any
                      )
                    : this.$router.push('/')
                this.$toast.success('欢迎回来!')
            } catch (error) {
                this.$toast.error(error.message)
            }
        }
        this.loading = false
    }
}
</script>
<style lang="stylus">
.login {
  background: linear-gradient(87deg, #5e72e4, #825ee4) !important;
  height: 50%;
  width: 100%;
  position: absolute;
}
</style>
