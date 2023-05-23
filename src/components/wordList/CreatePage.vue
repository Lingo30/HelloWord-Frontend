<template>
  <n-modal
      style="background-color: white"
      v-model:show="showFlag"
      @after-enter="init"
      @after-leave="exit"
  >
    <n-spin class="content-box" :show="showSpin">
      <template #description>
        请耐心等待，不要急着刷新~
      </template>
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
            官方词单
          </n-button>
          <n-button
              class="choose-button"
              :class="pageIdx===1?'choose-button-clicked':''"
              @click="switchPage(1)"
          >
            文件导入
          </n-button>
          <n-button
              class="choose-button"
              :class="pageIdx===2?'choose-button-clicked':''"
              @click="switchPage(2)"
          >
            智能提取
          </n-button>
          <n-button
              class="choose-button"
              :class="pageIdx===3?'choose-button-clicked':''"
              @click="switchPage(3)"
          >
            关键词生成
          </n-button>
        </div>

        <n-divider style="margin: 0;padding: 0"/>

        <div class="content">
          <!--        官方的词单卡片-->
          <n-scrollbar v-if="pageIdx===0">
            <div class="card-list" v-show="pageIdx===0">
              <div
                  class="card"
                  v-for="list in lists"
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
          <n-spin v-else-if="pageIdx===1&&!showFileResultFlag" :show="loading">
            <n-upload
                ref="uploadRef"
                class="drop-area"
                directory-dnd
                :custom-request="generateFromFile"
                @before-upload="uploadCheck"
            >
              <n-upload-dragger>
                <p style="width: 180px;margin: 80px auto">将文件拖拽到此处即可完成文件上传。支持500KB以内的.txt文件</p>
              </n-upload-dragger>
            </n-upload>
          </n-spin>
          <!--          文件智能提取-->
          <n-spin v-else-if="pageIdx===2&&!showFileResultFlag" :show="loading">
            <n-upload
                ref="uploadRef"
                class="drop-area"
                directory-dnd
                :custom-request="generateSmart"
            >
              <n-upload-dragger>
                <p style="width: 180px;margin: 80px auto">智能提取文件中的单词</p>
              </n-upload-dragger>
            </n-upload>
          </n-spin>
          <div style="height: 100%;width: 100%;padding-top: 5px" v-else-if="pageIdx===3&&!showFileResultFlag">
            <n-dynamic-tags v-model:value="tags"/>
          </div>
          <!--        文件导入后的展示-->
          <div style="display: flex;height: 100%;width: 100%" v-else-if="showFileResultFlag">
            <n-scrollbar>
              <n-card class="file-show" closable :bordered="false" @close="closeFileShowResult">
                <n-spin :show="loading">
                  <n-list hoverable>
                    <n-list-item
                        style="padding-top: 5px;padding-bottom: 5px"
                        v-for="word in previewWordlist"
                        :key="word.wordId"
                    >
                      <n-text>{{ word.word }}</n-text>
                      <template #suffix>
                        <div class="list-item-suffix">
                          {{ word.meaning }}
                          <n-button style="margin-left: 10px" @click="deleteWordFromFile(word.wordId)">
                            删除
                          </n-button>
                        </div>
                      </template>
                    </n-list-item>
                  </n-list>
                  <template #description>
                    请耐心等待，不要急着刷新~
                  </template>
                </n-spin>
              </n-card>
            </n-scrollbar>
          </div>
        </div>
        <!--      底部输入词单名和确认-->
        <div class="foot" v-if="pageIdx===0||showFileResultFlag">
          <n-input maxlength="50" class="input-name" v-model:value="myWordlistName"/>
          <n-button
              class="button"
              @click="create(myWordlistName, pageIdx)"
              :disabled="!(pageIdx===0&&clickedListId!==undefined||pageIdx===1&&showFileResultFlag)"
          >
            生成词单
          </n-button>
        </div>
        <div class="tags-preview-button" v-if="pageIdx===3&&!showFileResultFlag">
          <n-button class="button" @click="generateFromTags(tags)">
            预览词单
          </n-button>
        </div>
      </div>
    </n-spin>
  </n-modal>
</template>

<script>
import {
  NModal,
  NScrollbar,
  NTooltip,
  NInput,
  NButton,
  NDivider,
  NList,
  NListItem,
  NSpin,
  NCard,
  NUpload,
  NUploadDragger,
  NText,
  NDynamicTags,
  useMessage,
} from "naive-ui";
import store from "@/store";
import {
  createFromPre,
  createFromOfficial,
  getOfficialLists, getTagWordlist,
  uploadFile,
  uploadFileSmart
} from "@/request/api/wordlist";
import {computed, reactive, ref} from "vue";

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
    NSpin,
    NCard,
    NUpload,
    NUploadDragger,
    NText,
    NDynamicTags,
  },
  emits: ['addWordlist'],
  setup(props, {emit}) {
    const message = useMessage()
    const showSpin = ref(false)

    let showFileResultFlag = computed(() => {
      return previewWordlist.value.length !== 0
    })//是否完成文件解析展示

    let showFlag = ref(false)
    let pageIdx = ref(0)
    let lists = reactive([])//所有官方词单，只在每次打开创建页面时获取
    let clickedListId = ref(undefined)//选择的官方词单id
    let loading = ref(false)
    let previewWordlist = computed(() => {
      if (pageIdx.value === 1) {
        return fileWords
      } else if (pageIdx.value === 2) {
        return smartFileWords
      } else if (pageIdx.value === 3) {
        return tagWords
      } else {
        return reactive([])
      }
    })//预览词单
    let fileWords = reactive([
      // {
      //   wordId: 0,
      //   word: 'this',
      //   meaning: 'pron. 这',
      // },
      // {
      //   wordId: 1,
      //   word: 'is',
      //   meaning: 'v. 是',
      // },
      // {
      //   wordId: 2,
      //   word: 'a',
      //   meaning: 'art. 一',
      // },
      // {
      //   wordId: 3,
      //   word: 'word',
      //   meaning: 'n. 单词',
      // },
    ])//文件解析生成的单词
    let smartFileWords = reactive([
      // {
      //   wordId: 0,
      //   word: 'this',
      //   meaning: 'pron. 这',
      // },
    ])//智能解析
    let tagWords = reactive([
      // {
      //   wordId: 0,
      //   word: 'this',
      //   meaning: 'pron. 这',
      // },
    ])//关键词生成
    let tags = ref([])
    let myWordlistName = ref('')

    function switchPage(idx) {
      pageIdx.value = idx
      clickedListId.value = undefined
      myWordlistName.value = ''
    }

    function clickOfficialCard(id, name) {
      if (clickedListId.value === id) {
        clickedListId.value = undefined
      } else {
        clickedListId.value = id
        myWordlistName.value = name
      }
    }

    async function uploadCheck(data) {
      if (data.file.file.type !== 'text/plain') {
        message.error('只支持txt上传')
        return false
      }
      if (data.file.file.size > 512000) {
        message.error('文件过大（超过500KB）')
        return false
      }
      return true
    }

    //后端解析文件生成词单列表
    function upload(file, data, onProgress, uploadAPI) {
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append('file', file.file);
      const idJson = JSON.stringify(store.state.user.uid)
      const blob = new Blob([idJson], {
        type: 'application/json'
      })
      formData.append('userId', blob)

      const progressFunc = ((progress) => {
        onProgress({percent: Math.ceil(progress.loaded / progress.total * 100)});
        if (progress.loaded === progress.total) {
          showSpin.value = true
        }
      })

      // 向后端请求
      let success = false
      let errMsg = ''
      uploadAPI(formData, progressFunc).then((res) => {
        success = res.state
        errMsg = res.msg
        if (success) {
          previewWordlist.value.splice(0, previewWordlist.value.length)
          res.wordlist.forEach((word) => {
            previewWordlist.value.push(word)
          })
        }
      }).catch(err => errMsg = "网络错误").finally(() => {
        showSpin.value = false
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    //提取文件中的所有单词
    function generateFromFile(
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
      upload(file, data, onProgress, uploadFile)
    }

    //智能提取
    function generateSmart(
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
      upload(file, data, onProgress, uploadFileSmart)
    }

    function generateFromTags(tags) {
      let success = false
      let errMsg = ''
      showSpin.value = true
      getTagWordlist(store.state.user.uid, tags).then(res => {
        success = res.state
        errMsg = res.msg
        if (success) {
          previewWordlist.value.splice(0, previewWordlist.value.length)
          res.wordlist.forEach((word) => {
            previewWordlist.value.push(word)
          })
        }
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
        showSpin.value = false
      })
    }

    //从预览词单列表删除单词
    function deleteWordFromFile(wordId) {
      for (let i = 0; i < previewWordlist.value.length; i++) {
        if (previewWordlist.value[i].wordId === wordId) {
          previewWordlist.value.splice(i, 1)
          break
        }
      }
    }

    //关闭文件生成的预览词单列表
    function closeFileShowResult() {
      showFileResultFlag.value = false
      previewWordlist.value.splice(0, previewWordlist.value.length)
    }

    //创建词单
    function create(listName, createMethod) {
      //createMethod=0时为官方词单，createMethod=1时为文件创建词单
      if (listName === '') {
        message.error('请输入词单名')
        return
      }
      let success = false
      let errMsg = ''
      let listId = undefined
      if (createMethod === 0) {
        //官方词单
        showSpin.value = true
        createFromOfficial(store.state.user.uid, listName, clickedListId.value).then((res) => {
          success = res.state
          errMsg = res.msg
          listId = res.listId
        }).catch(err => errMsg = '网络错误').finally(() => {
          if (success) {
            emit('addWordlist', listId)
            showFlag.value = false
            message.success("添加成功")
          } else {
            message.error(errMsg)
            showSpin.value = false
          }
        })
      } else if (showFileResultFlag.value) {
        // 文件创建词单
        let words = []
        previewWordlist.value.forEach((word) => words.push(word.wordId))
        createFromPre(store.state.user.uid, listName, words).then((res) => {
          success = res.state
          errMsg = res.msg
          listId = res.listId
        }).catch(err => errMsg = '网络错误').finally(() => {
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
      let errMsg = ''
      getOfficialLists().then((res) => {
        success = res.state
        errMsg = res.msg
        if (res.state) {
          res.lists.forEach((wordlist) => lists.push(wordlist))
        }
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    function exit() {
      pageIdx.value = 0
      lists.splice(0, lists.length)
      fileWords.splice(0, fileWords.length)
      smartFileWords.splice(0, smartFileWords.length)
    }

    return {
      showFlag,
      pageIdx,
      lists,
      clickedListId,
      showFileResultFlag,
      loading,
      showSpin,
      myWordlistName,
      tags,

      previewWordlist,

      init,
      exit,
      switchPage,
      clickOfficialCard,
      generateFromFile,
      generateSmart,
      generateFromTags,
      uploadCheck,
      deleteWordFromFile,
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

.tags-preview-button {
  height: 7%;
  display: flex;
  justify-content: right;
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

.list-item-suffix {
  display: flex;
  width: 350px;
  justify-content: right;
  align-items: center;
  white-space: pre-wrap
}
</style>
