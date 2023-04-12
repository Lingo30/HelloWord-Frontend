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
              :closed="false"
              @handle-click="clickWordList"
          />
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import {useDialog, useMessage} from "naive-ui";
import router from "@/router";
import store from "@/store";
import {createFromOfficial, getOfficialLists} from "@/request/api/wordlist";
import WordListCard from "@/components/wordList/WordListCard.vue";
import {onMounted, reactive} from "vue";

export default {
  name: "CreatePage",
  components: {
    WordListCard
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()
    let listIds = reactive([1, 2])//所有官方词单

    function create(listId) {
      //TODO 根据官方词单创建词单
      createFromOfficial(store.state.user.uid, listId).then((res) => {
        if (res.state) {
          message.success("创建成功")
        } else {
          message.error('创建失败')
        }
      })
      router.push({name: 'wordlist'})
    }

    function clickWordList(listId) {
      dialog.info({
        title: '提示',
        content: '为此词单创建副本？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          create(listId)
        },
      })
    }

    onMounted(() => {
      //TODO 获取所有官方词单id
      // getOfficialLists().then((res) => {
      //   listIds.splice(0, listIds.length)
      //   res.ids.forEach((id) => listIds.push(id));
      // })
    })

    return {
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
</style>