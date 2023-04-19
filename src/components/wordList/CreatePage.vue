<template>
  <n-modal
      style="background-color: white"
      v-model:show="showFlag"
      @after-enter="init"
      @after-leave="exit"
  >
    <div class="container">
      <span style="font-size: 2em; margin-left: 5px; margin-bottom: 5px; height: 10%">
        词单导入
      </span>

      <div class="choose-button-group">
        <n-button
            class="choose-button"
            :class="pageIdx===0?'choose-button-clicked':''"
            @click="switchPage(0)"
        >
          官方
        </n-button>
        <n-button
            class="choose-button"
            :class="pageIdx===1?'choose-button-clicked':''"
            @click="switchPage(1)"
        >
          文件
        </n-button>
      </div>

      <n-divider style="margin: 0;padding: 0"/>

      <div class="content">
        <!--        官方的词单卡片-->
        <n-scrollbar v-if="pageIdx===0">
          <div class="card-list" v-show="pageIdx===0">
            <div
                class="card"
                v-for="(list,index) in lists"
                :key="list.listId"
            >
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-card
                      size="medium"
                      :style="clickedListId===list.listId?{ backgroundColor: '#42b983'}:{}"
                      @click="clickOfficialCard(list.listId,list.name)"
                  >
                    {{ ' ' }}
                    <template #header>
                      <div class="head">
                        {{ list.name }}
                      </div>
                    </template>
                    <template #header-extra>
                      {{ list.num + ' Items' }}
                    </template>
                    <template #footer>
                      <div class="card-foot">
                        <!--                  <n-icon class="icon" size="20" :component="AccessibilityOutline"/>-->
                        {{ list.creator }}
                      </div>
                    </template>
                  </n-card>
                </template>
                {{ list.name }}
              </n-tooltip>
            </div>
          </div>
        </n-scrollbar>
        <!--        文件导入-->
        <n-upload
            ref="uploadRef"
            class="drop-area"
            v-else-if="pageIdx===1&&!showFileResultFlag"
            directory-dnd
            :custom-request="upload"
        >
          <n-upload-dragger>
            <p style="width: 180px;margin: 80px auto">将文件拖拽到此处即可完成文件上传。</p>
          </n-upload-dragger>
        </n-upload>
        <!--        文件导入后的展示-->
        <div style="display: flex;height: 100%;width: 100%" v-else-if="pageIdx===1&&showFileResultFlag">
          <n-scrollbar>
            <n-card class="file-show" closable @close="closeFileShowResult">
              <n-list class="file-show" hoverable>
                <n-list-item style="padding-top: 5px;padding-bottom: 5px" v-for="(word,index) in fileWords"
                             :key="index">
                  <n-text>{{ word.word }}</n-text>
                  <template #suffix>
                    <div style="display: flex;width: 350px;justify-content: right;align-items: center">
                      {{ word.meaning }}
                      <!--                      <n-button style="margin-left: 10px">-->
                      <!--                        删除-->
                      <!--                      </n-button>-->
                    </div>
                  </template>
                </n-list-item>
              </n-list>
            </n-card>
          </n-scrollbar>
        </div>
      </div>
      <!--      底部输入词单名和确认-->
      <div class="foot">
        <n-input class="input-name" v-model:value="myWordlistName"/>
        <n-button
            class="button"
            @click="create(myWordlistName, pageIdx)"
            :disabled="!(pageIdx===0&&clickedListId!==undefined||pageIdx===1&&showFileResultFlag)">
          生成词单
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script>
import {
  useDialog,
  useMessage,
  NModal,
  NScrollbar,
  NTooltip,
  NInput,
  NButton,
  NDivider,
  NList,
  NListItem,
} from "naive-ui";
import store from "@/store";
import {createFromFile, createFromOfficial, getOfficialLists, uploadFile} from "@/request/api/wordlist";
import {reactive, ref} from "vue";

export default {
  name: "CreatePage",
  components: {
    NModal,
    NScrollbar,
    NTooltip,
    NInput,
    NButton,
    NDivider,
    NList,
    NListItem,
  },
  emits: ['addWordlist'],
  setup(props, {emit}) {
    const dialog = useDialog()
    const message = useMessage()
    let showFlag = ref(false)
    let pageIdx = ref(0)
    let lists = reactive([])//所有官方词单
    let clickedListId = ref(undefined)//选择的官方词单id
    let showFileResultFlag = ref(false)//是否完成文件解析展示
    let fileWords = reactive([
      {
        wordId: 0,
        word: 'this',
        meaning: 'pron. 这',
      },
      {
        wordId: 1,
        word: 'is',
        meaning: 'v. 是',
      },
      {
        wordId: 2,
        word: 'a',
        meaning: 'art. 一',
      },
      {
        wordId: 3,
        word: 'word',
        meaning: 'n. 单词',
      },
    ])//文件解析生成的单词
    let myWordlistName = ref('')

    function switchPage(idx) {
      pageIdx.value = idx
    }

    function clickOfficialCard(id, name) {
      if (clickedListId.value === id) {
        clickedListId.value = undefined
      } else {
        clickedListId.value = id
        myWordlistName.value = name
      }
    }

    //从后端解析
    function upload(
        {
          file,
          data,
          headers,
          withCredentials,
          action,
          onFinish,
          onError,
          onProgress,
        }
    ) {
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append('file', file.file);
      const progressFunc = ((progress) => {
        onProgress({percent: Math.ceil(progress.loaded / progress.total * 100)});
      })
      //TODO 向后端请求
      let success = false
      let errMsg = '网络错误'
      uploadFile(formData, progressFunc).then((res) => {
        success = res.state
        if (success) {
          fileWords.splice(0, fileWords.length)
          res.wordlist.forEach((word) => {
            fileWords.push(word)
          })
        } else {
          errMsg = res.msg
        }
      }).finally(() => {
        if (success) {
          showFileResultFlag.value = !showFileResultFlag.value
        } else {
          message.error(errMsg)
        }
      })
    }

    function closeFileShowResult() {
      showFileResultFlag.value = !showFileResultFlag.value
    }

    function create(listName, createMethod) {
      //createMethod=0时为官方词单，createMethod=1时为文件创建词单
      if (listName === '') {
        message.error('请输入词单名')
        return
      }
      let success = false
      let errMsg = '网络错误'
      let listId = undefined
      if (createMethod === 0) {
        //官方词单
        createFromOfficial(store.state.user.uid, listName, clickedListId.value).then((res) => {
          success = res.state
          errMsg = res.msg
          listId = res.listId
        }).finally(() => {
          if (success) {
            emit('addWordlist', listId)
            showFlag.value = false
            message.success("添加成功")
          } else {
            message.error(errMsg)
          }
        })
      } else if (createMethod === 1 && showFileResultFlag.value) {
        // 文件创建词单
        let words = []
        fileWords.forEach((word) => words.push(word.wordId))
        createFromFile(store.state.user.uid, listName, words).then((res) => {
          success = res.state
          errMsg = res.msg
          listId = res.listId
        }).finally(() => {
          if (success) {
            emit('addWordlist', listId)
            showFlag.value = false
            message.success("添加成功")
          } else {
            message.error(errMsg)
          }
        })
      } else {
        message.error("未知错误：CreatePage 292")
      }
    }

    function init() {
      //清空上次打开的状态
      pageIdx.value = 0
      lists.splice(0, lists.length)
      clickedListId.value = undefined
      showFileResultFlag.value = false
      myWordlistName.value = ''
      // 默认在第一个页面，获取所有官方词单
      let success = false
      let errMsg = '网络错误'
      getOfficialLists().then((res) => {
        success = res.state
        if (res.state) {
          res.lists.forEach((wordlist) => lists.push(wordlist))
        }
      }).finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    function exit() {
      pageIdx.value = 0
      lists.splice(0, lists.length)
    }

    return {
      showFlag,
      pageIdx,
      lists,
      clickedListId,
      showFileResultFlag,
      fileWords,
      myWordlistName,

      init,
      exit,
      switchPage,
      clickOfficialCard,
      upload,
      closeFileShowResult,
      create,
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
  /*background-color: black;*/
}

.choose-button-group {
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 7%;
  margin: 0;
}

.choose-button {
  width: 100px;
  border-radius: 0;
  margin: 0;
  padding: 0;
  background-color: rgb(239, 239, 245);
}

.choose-button-clicked {
  background-color: white;
}

.content {
  display: flex;
  flex-direction: column;
  /*flex-wrap: wrap;*/
  justify-content: center;
  align-items: center;
  /*background-color: black;*/
  height: 75%;
  width: 100%;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  /*background-color: blue;*/
}

.card {
  width: 300px;
  margin: 5px;
}

.card:hover {
  cursor: pointer;
}

.head {
  text-align: left;
  font-size: 0.8em;
  width: 100%;
  /*设置省略输出*/
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card-foot {
  text-align: left;
}

.file-show {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.foot {
  height: 7%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.input-name {
  width: 50%;
  margin-left: 5px;
}

.button {
  margin-right: 5px;
}

.drop-area {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;
  color: rgba(0, 0, 0, 0.45);
}
</style>