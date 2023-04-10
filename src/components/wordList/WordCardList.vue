<template>
  <div class="container">
    <n-scrollbar>
      <n-card
          class="card"
          :bordered="false"
          hoverable
          v-for="(word,index) in words"
          :key="index"
      >
        <template #header>
          <div class="head">
            <!--            基本释义-->
            <n-text class="font-color">
              {{ word.word }}
            </n-text>
          </div>
        </template>
        <template #header-extra>
          <n-text class="font-color">
            {{ word.pronounce }}
          </n-text>
        </template>
        <div class="content">
          <n-text class="font-color">
            {{ word.meaning }}
          </n-text>
        </div>
      </n-card>
    </n-scrollbar>
  </div>

</template>

<script>
import {NCard, NScrollbar} from "naive-ui";
import {reactive} from "vue";
// import {getWordsInfo} from "@/request/api/wordlist";

export default {
  name: "WordCardList",
  props: {
    listId: Number,
  },
  components: {
    NCard,
    NScrollbar
  },
  setup() {
    const words = reactive([
      {
        wordId: '1',
        word: 'dangerous',
        pronounce: '【deng3eres】',
        meaning: 'adj. 有危险的',
      }
    ])

    function showWords(listId) {
      // getWordsInfo(listId).then((res) => {
      //   //TODO
      // })
    }

    return {
      words,
      showWords,
    }
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