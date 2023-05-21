<template>
  <n-modal
      style="background-color: white"
      v-model:show="showFlag"
  >
    <div class="container">
      <n-scrollbar>
        <n-list>
          <n-list-item
              v-for="word in wordlist"
              :key="word.wordId"
          >
            <div style="display: flex;justify-content: space-between">
              <n-text>{{ word.word }}</n-text>
              <n-text>{{ word.meaning }}</n-text>
            </div>
          </n-list-item>
        </n-list>
      </n-scrollbar>
    </div>
  </n-modal>
</template>

<script>
import {NModal, NList, NListItem, NScrollbar, NText} from 'naive-ui'
import {ref, reactive} from "vue";
import {getSubmitDetail} from "@/request/api/admin";

export default {
  name: "WordlistDetail",
  components: {
    NModal,
    NList,
    NListItem,
    NScrollbar,
    NText,
  },
  setup() {
    let showFlag = ref(false)
    let wordlist = reactive([
      {
        wordId: 0,
        word: 'aba',
        meaning: '啊啊',
      },
      {
        wordId: 1,
        word: 'kkk',
        meaning: '啊啊啊',
      },
    ])

    function init(listId) {
      showFlag.value = true
      //todo 查看提交的某个词单列表
      getSubmitDetail(listId)
    }


    return {
      showFlag,
      wordlist,

      init,
    }
  }
}
</script>

<style scoped>
.container {
  height: 500px;
  width: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 5px;
}
</style>