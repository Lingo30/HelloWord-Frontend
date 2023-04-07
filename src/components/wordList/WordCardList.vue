<template>
  <div class="container">
    <n-scrollbar>
      <n-card class="card" :bordered="false" hoverable v-for="i in 10">
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
    </n-scrollbar>
  </div>

</template>

<script>
import {NCard, NScrollbar} from "naive-ui";

export default {
  name: "WordCardList",
  components: {
    NCard,
    NScrollbar
  }
}
</script>

<style scoped>
.container {
  background-color: rgba(131, 219, 184, 0.5);
  padding: 10px;
  border-radius: 15px;
  flex-direction: column;
  height: 100%;
  width: 500px;
  overflow: auto;
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