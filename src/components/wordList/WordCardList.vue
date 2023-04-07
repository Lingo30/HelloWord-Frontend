<template>
  <div class="container">
    <n-card class="card" :bordered="false" hoverable>
      <template #header>
        <div class="head">
          <n-text class="font-color" v-text="'dangerous'"/>
        </div>
      </template>
      <template #header-extra>
        <n-text class="font-color" v-text="'【deng3eres】'"/>
      </template>
      <div class="content">
        <n-text class="font-color" v-text="'adj. 有危险的'"/>
      </div>
    </n-card>
    <n-card class="card" :bordered="false" hoverable>
      <template #header>
        <div class="head">
          <n-text class="font-color" v-text="'dangerous'"/>
        </div>
      </template>
      <template #header-extra>
        <n-text class="font-color" v-text="'【deng3eres】'"/>
      </template>
      <div class="content">
        <n-text class="font-color" v-text="'adj. 有危险的'"/>
      </div>
    </n-card>
    <n-card class="card" :bordered="false" hoverable>
      <template #header>
        <div class="head">
          <n-text class="font-color" v-text="'dangerous'"/>
        </div>
      </template>
      <template #header-extra>
        <n-text class="font-color" v-text="'【deng3eres】'"/>
      </template>
      <div class="content">
        <n-text class="font-color" v-text="'adj. 有危险的'"/>
      </div>
    </n-card>
  </div>

</template>

<script>
import {NCard} from "naive-ui";

export default {
  name: "WordCardList",
  components: {
    NCard
  }
}
</script>

<style scoped>
.container {
  background-color: #76ff73;
  padding: 10px;
  border-radius: 25px;
}

.card {
  background-color: transparent;
}

.font-color {
  color: white;
}

.head {
  text-align: left;
  font-size: 2em;
}

.content {
  text-align: left;
}
</style>