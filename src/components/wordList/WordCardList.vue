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
      <n-pagination
          v-if="true"
          v-model:page="curPage"
          :page-count="pageNum"
          size="small"
          @update:page="changePage"
          show-quick-jumper
      >
        <template #prev>
          <div :style="{opacity:1===curPage?0.5:1}" style="color: white">
            上一页
          </div>
        </template>
        <template #next>
          <div :style="{opacity:pageNum===curPage?0.5:1}" style="color: white">
            下一页
          </div>
        </template>
      </n-pagination>
    </n-scrollbar>
  </div>

</template>

<script>
import {NCard, NScrollbar} from "naive-ui";
import {reactive, ref} from "vue";
import store from "@/store";
import {getWordsInfo} from "@/request/api/wordlist";

export default {
  name: "WordCardList",
  components: {
    NCard,
    NScrollbar
  },
  setup() {
    const words = reactive([])
    for (let i = 0; i < 20; i++)
      words.push({
        wordId: i,
        word: 'dangerous' + i,
        pronounce: '【deng3eres】',
        meaning: 'adj. 有危险的',
      })

    let showPagination = ref(false)
    let listId = 0
    let pageSize = 20//分页时每一页的大小
    let pageNum = ref(10)//总页数
    let curPage = ref(1)//当前页数

    //默认展示第一页
    function showWords(listId, totalNum) {
      showPagination.value = true
      this.listId = listId
      pageNum.value = Math.ceil(totalNum / pageSize)
      curPage.value = 1
      getWordsInfo(store.state.user.uid, listId, pageSize, curPage.value - 1).then((res) => {
        //TODO
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      })
    }

    //分页展示
    function changePage(page) {
      console.log(page);
      getWordsInfo(store.state.user.uid, listId, pageSize, page - 1).then((res) => {
        //TODO
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      })
    }

    return {
      words,
      showPagination,
      pageNum,
      curPage,

      showWords,
      changePage,
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