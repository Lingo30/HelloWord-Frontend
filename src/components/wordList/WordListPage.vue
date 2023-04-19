<template>
  <n-space class="container">
    <TodayAim></TodayAim>
    <CreatePage ref="createPageRef" @add-wordlist="addWordlist"/>
    <div class="left">
      <div class="card-list">
        <n-scrollbar>
          <WordListCard
              v-for="(id,index) in listIds"
              :key="id"
              :list-id="id"
              :color-idx="index"
              :editFlag="editFlag"
              :clicked="clickedId===id"
              ref="wordListCardsRef"
              @update-name="updateName"
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
          <n-button v-else @click="createPageRef.showFlag=true" style="width: 100%" circle text-color="white"
                    color="green" :bordered="false">
            新建单词本
          </n-button>
        </div>
      </div>
    </div>
    <div class="right">
      <WordCardList ref="wordCardListRef"/>
    </div>
  </n-space>
</template>

<script>
import {NScrollbar, useMessage} from "naive-ui"
import WordListCard from "@/components/wordList/WordListCard.vue";
import WordCardList from "@/components/wordList/WordCardList.vue";
import {onMounted, reactive, ref} from "vue";
import store from "@/store";
import {getUserLists, editWordlists} from "@/request/api/wordlist";
import CreatePage from "@/components/wordList/CreatePage.vue";
import TodayAim from "@/components/wordList/TodayAim";


export default {
  name: "WordList",
  components: {
    TodayAim,
    CreatePage,
    NScrollbar,
    WordCardList,
    WordListCard
  },
  setup() {
    const wordCardListRef = ref(null)
    const wordListCardsRef = ref(null)
    const listIds = reactive([/*1, 2, 3, 4, 5, 6, 7, 8,*/])
    const clickedId = ref()
    const editFlag = ref(false)
    const removeList = []//待删除的id队列
    const tmpListIds = []//缓存编辑前的id队列
    const updateList = []//待更新词单名的词单，{listId:123,name:'aaa'}
    const message = useMessage()
    let createPageRef = ref(null)

    function clickWordList(id, totalNum) {
      clickedId.value = id
      wordCardListRef.value.showWords(id, totalNum)
    }

    function editWordList() {
      //初始化队列
      tmpListIds.splice(0, tmpListIds.length)
      removeList.splice(0, removeList.length)
      updateList.splice(0, updateList.length)
      listIds.forEach(id => tmpListIds.push(id))

      editFlag.value = !editFlag.value
    }

    function cancel() {
      wordListCardsRef.value.forEach((cardRef) => cardRef.cancelUpdate())
      listIds.splice(0, listIds.length)
      tmpListIds.forEach(id => listIds.push(id))
      editFlag.value = !editFlag.value
    }

    function updateName(listId, name) {
      updateList.push({
        listId: listId,
        name: name,
      })
    }

    function removeWordList(id) {
      //正在学习的词单不能被删除
      if (id === store.state.user.selectWordlist) {
        message.error('不能删除正在学习的词单')
        return
      }
      //正在查看的词单被删除时，自动跳转到浏览正在学习的词单
      if (id === clickedId.value) {
        clickedId.value = store.state.user.selectWordlist
        wordListCardsRef.value[listIds.indexOf(store.state.user.selectWordlist)].handleClick()
      }
      removeList.push(id)
      listIds.splice(listIds.indexOf(id), 1)
    }

    // 完成词单编辑
    function finish() {
      let success = false
      editWordlists(store.state.user.uid, removeList, updateList).then((res) => {
        success = res.state
      }).finally(() => {
        if (success) {
          wordListCardsRef.value.forEach((cardRef) => cardRef.finishUpdate())
          message.success("修改成功")
        } else {
          listIds.splice(0, listIds.length)
          tmpListIds.forEach(id => listIds.push(id))
          message.error("修改失败")
        }
      })
      editFlag.value = !editFlag.value
    }

    //成功创建新词单后，添加到页面中
    function addWordlist(listId) {
      listIds.unshift(listId)
    }

    onMounted(() => {
      // clickedId.value = store.state.user.selectWordlist
      // 通过uid获取所有词单id
      getUserLists(store.state.user.uid).then((res) => {
        listIds.splice(0, listIds.length)
        if (res.state) {
          res.ids.forEach((id) => listIds.push(Number(id)));
          if (listIds.length > 0) {
            //自动获取正在背诵词单的单词列表
            clickedId.value = store.state.user.selectWordlist
          }
        }
      })
    })

    return {
      wordCardListRef,
      wordListCardsRef,
      clickedId,
      listIds,
      editFlag,
      createPageRef,

      updateName,
      editWordList,
      cancel,
      finish,
      clickWordList,
      removeWordList,
      addWordlist,
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
  height: 550px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(112, 162, 161, 0.4);
  border-radius: 10px;
}
</style>