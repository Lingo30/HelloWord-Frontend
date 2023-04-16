<template>
  <div class="container">
    <n-scrollbar>
      <n-card
          class="card"
          :bordered="false"
          hoverable
          v-for="(word,index) in words"
          :key="word.wordId"
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
            {{ word.symbol }}
          </n-text>
        </template>
        <div class="content">
          <n-text class="font-color">
            {{ word.meaning }}
          </n-text>
        </div>
      </n-card>
    </n-scrollbar>
    <div class="foot">
      <n-pagination
          v-if="showPagination"
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
      <n-button class="set-learn-button" size="tiny" v-show="showPagination&&!selectedFlag"
                @click="selectWordlist(listId)">
        设为背诵词单
      </n-button>
    </div>
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
    // for (let i = 0; i < 20; i++)
    //   words.push({
    //     wordId: i,
    //     word: 'dangerous' + i,
    //     symbol: '【deng3eres】',
    //     meaning: 'adj. 有危险的',
    //   })

    let showPagination = ref(false)
    let listId = ref(0)
    let pageSize = 5//分页时每一页的大小
    let pageNum = ref(10)//总页数
    let curPage = ref(1)//当前页数
    let selectedFlag = ref(false)

    //默认展示第一页
    function showWords(listId, totalNum) {
      showPagination.value = true
      selectedFlag.value = store.state.user.selectWordlist === listId
      this.listId = listId
      pageNum.value = Math.ceil(totalNum / pageSize)
      curPage.value = 1
      getWordsInfo(store.state.user.uid, listId, pageSize, curPage.value - 1).then((res) => {
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      })
    }

    //分页展示
    function changePage(page) {
      getWordsInfo(store.state.user.uid, listId, pageSize, page - 1).then((res) => {
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      })
    }

    function selectWordlist(listId) {
      //TODO 服务器更新正在背诵的词单
      //本地更新
      store.state.user.selectWordlist = listId
      selectedFlag.value = store.state.user.selectWordlist === listId
      //TODO 提示更新成功/失败
    }

    return {
      words,
      showPagination,
      pageNum,
      curPage,
      selectedFlag,
      listId,

      showWords,
      changePage,
      selectWordlist,
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
  font-size: 1.5em;
}

.content {
  text-align: left;
}

.foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.set-learn-button {
  color: white;
  background-color: green;
  margin: 0;
  padding: 12px;
  border-radius: 100px;
}
</style>