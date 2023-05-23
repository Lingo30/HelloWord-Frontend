<template>
  <div>
    <n-badge :show="unReadFlag" dot>
      <!--        这的样式颜色要改一改-->
      <n-icon size="5vh" color="white" :depth="3" class="clickable" @click="showMessages">
        <Megaphone/>
      </n-icon>
    </n-badge>
  </div>
  <n-modal v-model:show="showFlag" style="background-color: white">
    <div class="notice-modal">
      <n-list v-if="!showDetailFlag">
        <n-list-item v-for="message in messages" :key="message.id">
          <n-badge :show="!message.state" style="color: black;padding-right: 10px" dot>
            {{ message.title }}
          </n-badge>
          <template #suffix>
            <n-button @click="showMessageDetail" :bordered="false">
              <n-icon>
                <ChevronForwardOutline/>
              </n-icon>
            </n-button>
          </template>
        </n-list-item>
      </n-list>
      <div v-else>
        <n-button size="large" :bordered="false" @click="showDetailFlag=false">
          <n-icon size="4vh">
            <ArrowBackOutline/>
          </n-icon>
        </n-button>
        <div class="title">
          {{ messageDetail.data.title }}
        </div>
        <n-divider/>
        <div class="content">
          {{ messageDetail.data.content }}
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import {reactive, ref} from "vue";
import {NIcon, NBadge, NModal, NList, NListItem, NButton, NDivider} from "naive-ui";
import {Megaphone, ChevronForwardOutline, ArrowBackOutline} from "@vicons/ionicons5";

export default {
  name: "Notification",
  components: {
    NIcon,
    NBadge,
    NModal,
    NList,
    NListItem,
    NButton,
    NDivider,
    Megaphone,
    ChevronForwardOutline,
    ArrowBackOutline,
  },
  setup() {
    const unReadFlag = ref(false)//侧边栏显示是否有未读消息
    const showFlag = ref(false)//是否显示通知公告模态框
    const showDetailFlag = ref(false)//是否显示消息详细内容

    const messageDetail = reactive({
      data: {
        id: 0,
        title: '公告',
        content: 'ababa',
      }
    })
    const messages = reactive([
      {
        id: 0,
        title: '公告',
        content: 'ababa',
        state: false,//是否已读
      },
      {
        id: 1,
        title: 'Re：意见反馈',
        content: 'ababa',
        state: false,
      },
      {
        id: 2,
        title: 'Re：Bug反馈',
        content: 'ababa',
        state: true,
      },
    ])

    function showMessages() {
      //todo 后端返回所有个人消息和公告

      showFlag.value = true
    }

    function showMessageDetail(msg) {
      showDetailFlag.value = true
      messageDetail.data = msg
      if (!msg.state) {
        msg.state = true
        //todo 更新为已读

      }
    }

    return {
      unReadFlag,
      showFlag,
      showDetailFlag,
      messages,
      messageDetail,

      showMessages,
      showMessageDetail,
    }
  }
}
</script>

<style scoped>
.notice-modal {
  height: 500px;
  width: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 5px;
  /*background-color: black;*/
}

.clickable:hover {
  cursor: pointer;
}

.title {
  padding-left: 10px;
  font-size: 30px;
}

.content {
  padding-left: 20px;
  padding-right: 20px;
}
</style>