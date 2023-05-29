<template>
  <div>
    <n-badge :show="unReadFlag" dot style="">
      <!--        这的样式颜色要改一改-->
      <n-icon size="4vh" color="white" :depth="3" class="clickable" style="top:50%; transform:translate(0,50%);">
        <Megaphone/>
      </n-icon>
    </n-badge>
  </div>
  <n-modal v-model:show="showFlag" style="background-color: rgba(253,252,252,0.73)">
    <div class="notice-modal">
      <n-list :show-divider="false" clickable style="width: 35%;background-color: #acadad;">
        <n-list-item
            v-for="(message,index) in messages" :key="message.id"
            :class="index===clickedMsg?'message-list-item-clicked':'message-list-item'"
            @click="showMessageDetail(message,index)"
        >
          <n-badge :show="!message.state" style="color: black;padding-left: 10px;padding-right: 10px" dot>
            {{ message.title }}
          </n-badge>
          <template #suffix>
            <n-button :bordered="false">
              <n-icon>
                <ChevronForwardOutline/>
              </n-icon>
            </n-button>
          </template>
        </n-list-item>
      </n-list>
      <div style="height: 100%;width: 65%;">
        <div class="title">
          {{ messageDetail.data.title }}
          <n-text style="color: #434543; font-size: 12px">
            {{ messageDetail.data.time }}
          </n-text>
        </div>
        <n-divider style="--n-color:rgb(0, 0, 0);margin-top: 0"/>
        <div class="content">
          {{ messageDetail.data.content }}
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import {reactive, ref} from "vue";
import {NIcon, NBadge, NModal, NList, NListItem, NButton, NDivider, NText, useMessage} from "naive-ui";
import {Megaphone, ChevronForwardOutline} from "@vicons/ionicons5";
import {getMessages, setMessageRead} from "@/request/api/user";
import store from "@/store";

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
    NText,
    Megaphone,
    ChevronForwardOutline,
  },
  setup() {
    const message = useMessage()

    const unReadFlag = ref(false)//侧边栏显示是否有未读消息
    const showFlag = ref(false)//是否显示通知公告模态框
    const showDetailFlag = ref(false)//是否显示消息详细内容
    const clickedMsg = ref(0)//被选中的消息

    const messageDetail = reactive({
      data: {
        id: -1,
        title: '',
        content: '',
        time: '',
      }
    })
    const messages = reactive([
      {
        id: 0,
        title: '公告',
        content: 'ababa',
        state: false,//是否已读
        time: '2023-5-24 10:35',
      },
      {
        id: 1,
        title: 'Re：意见反馈',
        content: 'ababa',
        state: false,
        time: '2023-5-24 10:35',
      },
      {
        id: 2,
        title: 'Re：Bug反馈',
        content: 'ababa',
        state: true,
        time: '2023-5-24 10:35',
      },
    ])

    async function showMessages() {
      //todo 后端返回所有个人消息和公告
      showFlag.value = true
      messages.splice(0, messages.length)
      let success = false
      let errMsg = ''
      await getMessages(store.state.user.uid).then(res => {
        success = res.state
        errMsg = res.msg
        if (success) {
          res.messages.forEach(message => messages.push(message))
        }
      }).catch(err => errMsg = '网络错误')
      if (success) {
        showMessageDetail(messages[clickedMsg.value])
      } else {
        message.error(errMsg)
      }
    }

    function showMessageDetail(msg, index) {
      clickedMsg.value = index
      showDetailFlag.value = true
      messageDetail.data = msg
      if (!msg.state) {
        msg.state = true
        //todo 更新为已读
        setMessageRead(store.state.user.uid, msg.id).catch(err => {
        })
      }
    }

    return {
      unReadFlag,
      showFlag,
      showDetailFlag,
      messages,
      messageDetail,
      clickedMsg,

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
  flex-direction: row;
  overflow: auto;
  padding: 5px;
  /*background-color: black;*/
}

.clickable:hover {
  cursor: pointer;
}

.title {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  font-size: 30px;
}

.content {
  padding-left: 20px;
  padding-right: 20px;
}

.message-list-item {
  margin: 15px;
  background-color: #929392;
}

.message-list-item-clicked {
  margin: 15px;
  background-color: #7a7979;
}
</style>
