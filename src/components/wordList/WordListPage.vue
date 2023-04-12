<template>
  <div class="container">
    <div class="left">
      <div class="card-list">
        <n-scrollbar>
          <WordListCard
              v-for="(id,index) in listIds"
              :key="id"
              :list-id="id"
              :color-idx="index"
              :closed="editFlag"
              @handle-click="clickWordList"
              @handle-close="removeWordList"
          />
        </n-scrollbar>
      </div>
      <div class="edit-new-button">
        <div class="left-button">
          <n-button v-if="editFlag" @click="cancel" style="width: 100%" circle text-color="white" color="green"
                    :bordered="false">
            取消
          </n-button>
          <n-button v-else @click="editWordList" style="width: 100%" circle text-color="white" color="green"
                    :bordered="false">
            编辑单词本
          </n-button>
        </div>
        <div class="right-button">
          <n-button v-if="editFlag" @click="finish" style="width: 100%" circle text-color="white" color="green"
                    :bordered="false">
            完成
          </n-button>
          <n-button v-else @click="createWordList" style="width: 100%" circle text-color="white" color="green"
                    :bordered="false">
            新建单词本
          </n-button>
        </div>
      </div>
    </div>
    <div class="right">
      <WordCardList ref="wordCardListRef"/>
    </div>
  </div>
</template>

<script>
import {NScrollbar, useMessage} from "naive-ui"
import WordListCard from "@/components/wordList/WordListCard.vue";
import WordCardList from "@/components/wordList/WordCardList.vue";
import {onMounted, reactive, ref} from "vue";
import store from "@/store";
import {getUserLists, deleteLists} from "@/request/api/wordlist";

export default {
  name: "WordList",
  components: {
    NScrollbar,
    WordCardList,
    WordListCard
  },
  setup() {
    const wordCardListRef = ref(null)
    const listIds = reactive([1, 2, 3, 4, 5, 6, 7, 8,])
    const editFlag = ref(false)
    const removeList = []//待删除的id队列
    const tmpListIds = []//缓存编辑前的id队列
    const message = useMessage()

    function clickWordList(id) {
      wordCardListRef.value.showWords(id)
    }

    function editWordList() {
      //初始化队列
      tmpListIds.splice(0, tmpListIds.length)
      removeList.splice(0, removeList.length)
      listIds.forEach(id => tmpListIds.push(id))

      editFlag.value = !editFlag.value
    }

    function createWordList() {
      //TODO 路由跳转
    }

    function cancel() {
      listIds.splice(0, listIds.length)
      tmpListIds.forEach(id => listIds.push(id))
      editFlag.value = !editFlag.value
    }

    function removeWordList(id) {
      removeList.push(id)
      listIds.splice(listIds.indexOf(id), 1)
    }

    function finish() {
      // 服务器删除
      let success = false
      deleteLists(store.state.user.uid, removeList).then((res) => {
        success = res.status
      }).finally(() => {
        if (success) {
          message.success("删除成功")
        } else {
          listIds.splice(0, listIds.length)
          tmpListIds.forEach(id => listIds.push(id))
          message.error("删除失败")
        }
      })
      editFlag.value = !editFlag.value
    }

    onMounted(() => {
      //TODO 通过uid获取所有词单id
      getUserLists(store.state.user.uid).then((res) => {
        listIds.splice(0, listIds.length)
        res.ids.forEach((id) => listIds.push(id));
      })
    })

    return {
      wordCardListRef,
      listIds,
      editFlag,

      editWordList,
      createWordList,
      cancel,
      finish,
      clickWordList,
      removeWordList,
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
  height: 600px;
  padding: 10px;
  display: flex;
  align-items: center;
  /*background-color: black;*/
}

.card-list {
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  width: 500px;
  height: 500px;
  padding: 10px;
  display: flex;
  align-items: center;
  /*background-color: blue;*/
}

.edit-new-button {
  /*background-color: white;*/
  padding-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  /*align-items: center;*/
}

.left-button {
  margin: auto;
  width: 45%;
  /*background-color: blue;*/
}

.right-button {
  margin: auto;
  width: 45%;
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