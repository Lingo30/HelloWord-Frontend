<template>
  <n-modal style="background-color: white" :show="showFlag">
    <div class="container">
      <!--      <span style="font-size: 2em; margin-left: 5px; margin-bottom: 5px">-->
      <!--        词单导入-->
      <!--      </span>-->
      <n-select class="select" v-model:value="value" :options="options"/>
      <div class="content">
        <!--        官方的词单卡片-->
        <n-scrollbar>
          <div class="card-list">
            <div
                v-show="value==='official'"
                class="card"
                v-for="(id,index) in 10"
                :key="id">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-card size="medium">
                    {{ ' ' }}
                    <template #header>
                      <div class="head">
                        <!--                    {{ info.name }}-->
                        name
                      </div>
                    </template>
                    <template #header-extra>
                      <!--                  {{ info.num + ' Items' }}-->
                      item
                    </template>
                    <template #footer>
                      <div class="card-foot">
                        <!--                  <n-icon class="icon" size="20" :component="AccessibilityOutline"/>-->
                        <!--                    {{ info.creator }}-->
                        creator
                      </div>
                    </template>
                  </n-card>
                </template>
                如果显示不完全的话，会显示完整名字
              </n-tooltip>
            </div>
          </div>
        </n-scrollbar>
        <!--        文件导入-->
        <div v-show="value==='file'" class="drop-area drop-active">
        </div>
      </div>
      <!--      底部输入词单名和确认-->
      <div class="foot">
        <n-input class="input-name">

        </n-input>
        <n-button class="button">
          生成词单
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script>
import {useDialog, useMessage, NModal, NSelect, NScrollbar, NSpace, NTooltip, NInput, NButton} from "naive-ui";
import router from "@/router";
import store from "@/store";
import {createFromOfficial, getOfficialLists} from "@/request/api/wordlist";
import WordListCard from "@/components/wordList/WordListCard.vue";
import {onMounted, reactive, ref} from "vue";

export default {
  name: "CreatePage",
  components: {
    NModal,
    NSelect,
    NScrollbar,
    NSpace,
    NTooltip,
    NInput,
    NButton,
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()
    let showFlag = ref(true)
    let optionRef = ref('official')
    let options = [
      {
        value: 'official',
        label: '从已有词单导入',
      },
      {
        value: 'file',
        label: '从文件导入'
      },
    ]
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
      showFlag,
      value: optionRef,
      options,
      listIds,

      clickWordList,
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
  /*background-color: black;*/
}

.select {
  height: 10%;
  width: 25%;
  margin-left: auto;
  margin-top: 1px;
}

.content {
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
  /*justify-content: center;*/

  height: 85%;
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

.font-color {
  /*color: white;*/
  opacity: 1;
}

.head {
  text-align: left;
  font-size: 0.8em;
}

.card-foot {
  text-align: left;
}

.foot {
  height: 10%;
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
</style>