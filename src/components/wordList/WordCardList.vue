<template>
  <div class="container">
    <n-scrollbar style="max-height: 60vh;margin-top:1vh;margin-bottom:1vh">
      <n-card
          class="card"
          :bordered="false"
          hoverable
          v-for="word in words"
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
            {{ '[' + word.symbol + ']' }}
          </n-text>
        </template>
        <div class="content font-color ellipsis">
          <n-popover trigger="hover" style="white-space: pre-wrap">
            {{ word.meaning }}
            <template #trigger>
              {{ word.meaning }}
            </template>
          </n-popover>
        </div>
      </n-card>
    </n-scrollbar>
    <div class="foot">
      <n-pagination
          v-if="showPagination"
          v-model:page="curPage"
          :page-count="pageNum"
          size="small"
          :page-slot="3"
          @update:page="changePage"
          show-quick-jumper
      >
        <!--        <template #prev>-->
        <!--          <div :style="{opacity:1===curPage?0.5:1}" style="color: white">-->
        <!--            上一页-->
        <!--          </div>-->
        <!--        </template>-->
        <!--        <template #next>-->
        <!--          <div :style="{opacity:pageNum===curPage?0.5:1}" style="color: white">-->
        <!--            下一页-->
        <!--          </div>-->
        <!--        </template>-->
      </n-pagination>
      <n-button class="set-learn-button" size="tiny" v-show="showPagination&&!selectedFlag" type="info"
                @click="selectWordlist(listId)">
        设为背诵词单
      </n-button>
    </div>
  </div>
</template>

<script>
import {NCard, NScrollbar, NText, NPopover, NPagination, NButton, useMessage} from "naive-ui";
import {reactive, ref} from "vue";
import store from "@/store";
import {getWordsInfo, updateLearnWordlist} from "@/request/api/wordlist";

export default {
  name: "WordCardList",
  components: {
    NCard,
    NScrollbar,
    NText,
    NPopover,
    NPagination,
    NButton,
  },
  setup() {
    const message = useMessage()
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
      let errMsg = ''
      let success = false
      getWordsInfo(store.state.user.uid, listId, pageSize, curPage.value - 1).then((res) => {
        success = res.state
        errMsg = res.msg
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    //分页展示
    function changePage(page) {
      let errMsg = ''
      let success = false
      getWordsInfo(store.state.user.uid, listId.value, pageSize, page - 1).then((res) => {
        success = res.state
        errMsg = res.msg
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    function selectWordlist(listId) {
      // 服务器更新正在背诵的词单
      let success = false
      let errMsg = ''
      updateLearnWordlist(store.state.user.uid, listId).then((res) => {
        success = res.state
        errMsg = res.msg
      }).catch(err => errMsg = '网络错误').finally(() => {
        //本地更新
        if (success) {
          //更新成功
          store.state.user.selectWordlist = listId
          selectedFlag.value = store.state.user.selectWordlist === listId
          message.success('更新成功')
        } else {
          //更新失败
          message.error(errMsg)
        }
      })
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
  border-radius: 15px;
  flex-direction: column;
  height: 90%;
  width: 90%;
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
  white-space: pre-wrap
}

.ellipsis {
  /*设置省略输出*/
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.foot {
  display: flex;
  flex-direction: row;
  margin-bottom: 1vh;
  justify-content: center;
}

.set-learn-button {
  color: white;
  margin: 0;
  padding: 12px;
  margin-left: 2px;
  border-radius: 100px;
}
</style>
