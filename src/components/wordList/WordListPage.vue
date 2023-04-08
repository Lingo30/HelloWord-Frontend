<template>
  <div class="container">
    <div class="left">
      <n-scrollbar>
        <WordListCard v-for="i in 10"/>
      </n-scrollbar>
    </div>
    <div class="right">
      <WordCardList/>
    </div>
  </div>
</template>

<script>
import {NScrollbar} from "naive-ui"
import WordListCard from "@/components/wordList/WordListCard.vue";
import WordCardList from "@/components/wordList/WordCardList.vue";

export default {
  name: "WordList",
  components: {
    NScrollbar,
    WordCardList,
    WordListCard
  }
}
</script>

<style scoped>
.container {
  margin-left: 100px;
  display: flex;
  overflow: auto;
  /*background-color: rgba(198, 228, 214, 1);*/
}

.left {
  margin-top: 10px;
  flex-direction: column;
  width: 400px;
  height: 500px;
  padding: 10px;
  display: flex;
  align-items: center;
  /*background-color: blue;*/
}

.right {
  margin-top: 10px;
  margin-left: 20px;
  width: 500px;
  height: 500px;
  padding: 30px;
  display: flex;
  align-items: center;
  background-color: rgba(112, 162, 161, 0.4);
  border-radius: 10px;
}
</style>