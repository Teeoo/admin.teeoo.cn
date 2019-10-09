<template>
  <div>
    <v-card flat>
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-card-text>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="62">
                  <img
                    :src="$store.getters.userAvatar"
                    alt="John"
                  >
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">你好,{{$store.getters.userName}}</v-list-item-title>
                <v-list-item-subtitle>迷失的人迷失了,相逢的人会再相逢</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-card-text class="text-center">
            <v-list-item>
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline">分类</v-list-item-title>
                      <v-list-item-subtitle>100</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline">文章</v-list-item-title>
                      <v-list-item-subtitle>100/400</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline">分类</v-list-item-title>
                      <v-list-item-subtitle>100</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-list-item>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- <v-card flat>
      <v-card-text>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <v-card flat>
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar>
                    <img
                      :src="$store.getters.userAvatar"
                      alt="John"
                    >
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">你好,{{$store.getters.userName}}</v-list-item-title>
                  <v-list-item-subtitle>迷失的人迷失了,相逢的人会再相逢</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-card flat>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">分类</v-list-item-title>
                  <v-list-item-subtitle>100</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">分类</v-list-item-title>
                  <v-list-item-subtitle>100</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">分类</v-list-item-title>
                  <v-list-item-subtitle>100</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </!-->
  </div>
</template>