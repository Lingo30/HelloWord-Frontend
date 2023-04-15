<template>
  <n-modal style="background-color: white" :show="true">
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
                      @click="clickOfficialCard(list.listId)"
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
            v-if="pageIdx===1"
            directory-dnd
            :action="uploadURL"
            :custom-request="upload"
        >
          <n-upload-dragger>
            <p style="width: 180px;margin: 80px auto">将文件拖拽到此处即可完成文件上传。</p>
          </n-upload-dragger>
        </n-upload>
      </div>
      <!--      底部输入词单名和确认-->
      <div class="foot">
        <n-input class="input-name" v-model:value="myWordlistName"/>
        <n-button class="button" @click="create(myWordlistName)">
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
  NDivider
} from "naive-ui";
import router from "@/router";
import store from "@/store";
import {createFromOfficial, getOfficialLists, uploadFile} from "@/request/api/wordlist";
import {onMounted, reactive, ref} from "vue";

export default {
  name: "CreatePage",
  components: {
    NModal,
    NScrollbar,
    NTooltip,
    NInput,
    NButton,
    NDivider,
  },
  props: {
    showFlag: Boolean,
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()
    let pageIdx = ref(0)
    let lists = reactive([
      {
        listId: 1,
        name: "四级",
        creator: '官方',
        num: 4321
      },
      {
        listId: 2,
        name: "机器学习",
        creator: 'He K',
        num: 111
      },
      {
        listId: 3,
        name: "chemicallllllllllllllllllllllllllllllllllllllllllll",
        creator: 'E. J. Corey',
        num: 999
      },
    ])//所有官方词单
    let clickedListId = ref(undefined)//选择的官方词单id
    let uploadURL = ref('' + store.state.user.uid)
    let myWordlistName = ref('')

    function switchPage(idx) {
      pageIdx.value = idx
    }

    function clickOfficialCard(id) {
      if (clickedListId.value === id) {
        clickedListId.value = undefined
      } else {
        clickedListId.value = id
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
      console.log(file.file);
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append(file.name, file.file);
      // console.log(formData);
      const progressFunc = ((progress) => {
        onProgress({percent: Math.ceil(progress.loaded / progress.total * 100)});
      })
      //TODO 向后端请求
      uploadFile(formData, progressFunc).then((res) => {
        
      })
    }

    function create(listName) {
      if (listName === '') {
        message.error('请输入词单名')
        return
      }
      //TODO 根据官方词单创建词单
      // createFromOfficial(store.state.user.uid, listId).then((res) => {
      //   if (res.state) {
      //     message.success("创建成功")
      //   } else {
      //     message.error('创建失败')
      //   }
      // })
    }

    onMounted(() => {
      //TODO 获取所有官方词单id
      // getOfficialLists().then((res) => {
      //   listIds.splice(0, listIds.length)
      //   res.ids.forEach((id) => listIds.push(id));
      // })
    })

    return {
      pageIdx,
      lists,
      clickedListId,
      uploadURL,
      myWordlistName,

      switchPage,
      clickOfficialCard,
      upload,
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