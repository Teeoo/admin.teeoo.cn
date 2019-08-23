<template>
  <div>
    <v-layout
      row
      wrap
      class="panel-group"
    >
      <v-flex
        xs12
        sm6
        md3
        class="card-panel-col pa-6"
      >
        <v-card flat>
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <v-icon class-name="card-panel-icon">local_offer</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">标签</div>
              <span class="card-panel-num">0/个</span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        class="card-panel-col pa-6"
      >
        <v-card flat>
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <v-icon class-name="card-panel-icon">bookmark</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">分类</div>
              <span class="card-panel-num">0/个</span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        class="card-panel-col pa-6"
      >
        <v-card flat>
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-money">
              <v-icon class-name="card-panel-icon">rate_review</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">文章</div>
              <span class="card-panel-num">0/篇</span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        class="card-panel-col pa-6"
      >
        <v-card flat>
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-shopping">
              <v-icon class-name="card-panel-icon">comment</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">评论</div>
              <span class="card-panel-num">0/条</span>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-data-iterator
      :items="items"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card flat>
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Calories:</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class Dashboard extends Vue {
    private items: any = [
        {
            name: '最近得到的回复',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
        },
        {
            name: '最近发布的文章',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
        },
        {
            name: '最新分类',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
        },
        {
            name: '最新标签',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
        }
    ]
}
</script>
<style lang="stylus" scoped>
$people-color = #40c9c6;
$message-color = #36a3f7;
$money-color = #f4516c;
$shopping-color = #34bfa3;

.panel-group {
  // padding-top: 24px;
  .card-panel-col {
    // margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: $people-color;

        i {
          color: #fff;
        }
      }

      .icon-message {
        background: $message-color;

        i {
          color: #fff;
        }
      }

      .icon-money {
        background: $money-color;

        i {
          color: #fff;
        }
      }

      .icon-shopping {
        background: $shopping-color;

        i {
          color: #fff;
        }
      }
    }

    .icon-people > i {
      color: $people-color;
      font-size: 64px;
    }

    .icon-message > i {
      color: $message-color;
      font-size: 64px;
    }

    .icon-money > i {
      color: $money-color;
      font-size: 64px;
    }

    .icon-shopping > i {
      color: $shopping-color;
      font-size: 64px;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 8px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 64px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
