<template>
  <div class="container">
    <div class="left">
      <n-scrollbar>
        <WordListCard
            v-for="(id,index) in listIds"
            :key="id"
            :list-id="id"
            :color-idx="index"
            @handle-click="clickWordList"
        />
      </n-scrollbar>
    </div>
    <div class="right">
      <WordCardList ref="wordCardListRef"/>
    </div>
  </div>
</template>

<script>
import {NScrollbar} from "naive-ui"
import WordListCard from "@/components/wordList/WordListCard.vue";
import WordCardList from "@/components/wordList/WordCardList.vue";
import {onMounted, reactive, ref} from "vue";
// import {getLists} from "@/request/api/wordlist";

export default {
  name: "WordList",
  components: {
    NScrollbar,
    WordCardList,
    WordListCard
  },
  setup() {
    const wordCardListRef = ref(null)
    const listIds = reactive([1,])

    function clickWordList(id) {
      wordCardListRef.value.showWords(id)
    }

    onMounted(() => {
      //TODO 通过uid获取所有词单id
      // getLists().then((res) => {
      //
      // })
    })

    return {
      wordCardListRef,
      listIds,
      clickWordList,
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  overflow: auto;
  /*background-color: rgba(198, 228, 214, 1);*/
}

.left {
  margin-top: 10px;
  flex-direction: column;
  width: 500px;
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