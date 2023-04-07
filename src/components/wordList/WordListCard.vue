<template>
  <div style="display: flex">
    <div class="left">
      <n-text class="date" v-text="'07'"></n-text>
      <n-text class="month" v-text="'APR'"></n-text>
      <!--    <div class="date">07</div>-->
      <!--    <div class="month">APR</div>-->
    </div>
    <div class="right">
      <n-card class="card" hoverable>
        <template #header>
          <div class="head">
            <n-text class="font-color" v-text="'英语四级'"/>
          </div>
        </template>
        <template #header-extra>
          <n-text class="font-color" v-text="'10 Items'"/>
        </template>
        <template #footer>
          <div class="foot">
            <n-icon :component="AccessibilityOutline"/>
            <n-text class="font-color" v-text="'创作者名字'"/>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<script>
import {NCard, NText, NIcon} from 'naive-ui'
import {AccessibilityOutline} from '@vicons/ionicons5'

export default {
  name: "WordListCard",
  components: {
    NCard,
    NText,
    NIcon
  },
  setup() {
    return {
      AccessibilityOutline
    }
  }
}
</script>

<style scoped>
.date {
  font-size: 2em;
}

.month {
  font-size: 1em;
}

.left {
  flex-direction: column;
  width: 10%;
  padding: 10px;
  display: flex;
  align-items: center;
}

.right {
  width: 80%;
  padding: 10px;
  display: flex;
  align-items: center;
}

.card {
  border-radius: 10px;
  background-color: rgba(24, 204, 255, 0.5);
}

.font-color {
  color: white;
  opacity: 1;
}

.head {
  text-align: left;
  font-size: 2em;
}

.foot {
  text-align: left;
}
</style>