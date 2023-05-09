<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="background">
        </div>
        <!-- 右侧的注册盒子 -->
        <div class="content-login">
          <n-spin class="content-box" :show="showSpin">
            <div class="content-box">
              <div class="chat_top">
                <img src="../../assets/img/kaleidoBlank.png" height="135" width="130">
              </div>
              <n-scrollbar class="chat" style="height: 57vh ;text-align: left;margin-top: 3vh">
                <div ref="chat_message" class="chat_parent" style="overflow:hidden; width: 30vw">
<!--                <div ref="chat_box" class="chat" style="overflow-x:hidden; overflow-y:auto; max-height:500px" >-->

                  <ChatMessage v-for="(item, index) in messages" v-bind:key="index" :type=item.type :time=item.time :content=item.content></ChatMessage>
                </div>
              </n-scrollbar>
              <div  class="bottom">
                <n-input class="message" v-model:value="value" round placeholder="Type a message..." type="textarea"
                        @keydown.enter.prevent="handleEnter"
                        ref="inputRef"
                         maxlength="100"
                        :autosize="{
                  maxRows: 2
                }">
                </n-input>
                <NButton class="send" @click="sendChat" strong secondary type="info" style="font-size: 15px">
                  提问
                </NButton>
              </div>
            </div>
            <template #description>
              请耐心等待，不要急着刷新~
            </template>
          </n-spin>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import {NSpin, NScrollbar, NInput, NButton, NAvatar, useNotification, useMessage} from 'naive-ui';
import ChatMessage from "@/components/chatPage/ChatMessage";
import {getHistoryChatAPI, sendChatAPI} from "@/request/api/chat";
import {h, nextTick, ref} from 'vue'
import store from "@/store";
import Kaleido from "@/assets/img/kaleidoBlank.png";
import {AUTHENTICATE_ERR} from "@/store/local";

export default {
  components: {
    NSpin,
    NScrollbar,
    NInput,
    NButton,
    ChatMessage
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const message = useMessage()
    const notification = useNotification()
    const showSpin = ref(false)
    const value = ref('')
    const messages = ref([])
    const inputRef = ref(null)

    return {
      message,
      inputRef,
      messages,
      showSpin,
      value,
      sendChat,
      handleEnter,
    }

    async function handleEnter(event) {
      if (event.shiftKey) {
        // 获取当前光标位置
        const currentPosition = event.target.selectionStart;

        // 在当前光标位置插入换行符
        value.value = value.value.slice(0, currentPosition) + '\n' + value.value.slice(currentPosition);

        // 等待 DOM 更新
        await nextTick();

        // 聚焦到输入框
        const inputElement = inputRef.value.$el.querySelector("textarea");
        inputElement.focus();

        // 设置光标位置
        inputElement.setSelectionRange(currentPosition + 1, currentPosition + 1);

        // 滚动到光标位置
        inputElement.scrollTop = inputElement.scrollHeight;
      } else {
        await sendChat();
      }
    }

    async function sendChat() {
      showSpin.value = true
      let errorMsg = "超时啦，请稍后再试试"
      let success = false
      let title = null
      await sendChatAPI(store.state.user.uid, value.value).then((res) => {
        success = res.state
        if (!success) {
          if (res.msg.match(new RegExp(AUTHENTICATE_ERR))) {
            errorMsg = res.msg
            title = "登录已失效"
            value.value = ''
          } else {
            errorMsg = "一天最多只能对话七次哦，不如今天再去学点单词，明天再来找我聊天叭"
            title = "使用次数已达上限"
            value.value = ''
          }
        } else {
          let q = {
            time: res.receive_time,
            type: false,
            content: value.value
          };
          messages.value.push(q);
          let p = {
            time: res.post_time,
            type: true,
            content: res.post_message,
          };
          messages.value.push(p);
          value.value = "";
        }
      }).catch(err=>{}).finally(()=>{
        if (!success) {
          notification.create({
            title: title,
            content: errorMsg,
            avatar: () => h(NAvatar, {
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,
          })
          showSpin.value = false;
        }
      })
      showSpin.value = false;
    }
  },

  created() {
    this.getHistory();
  },

  methods: {
    getHistory() {
      this.showSpin = true;
      let success = false
      let errMsg = ''
      getHistoryChatAPI(store.state.user.uid).then((res) => {
        success = res.state
        errMsg = res.msg
        res.history.forEach((item) => {
          let newList = {
            time: item.time,
            type: !item.type,
            content: item.content,
          };
          this.messages.push(newList);
        });
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          this.message.error(errMsg)
        }
      });
      this.showSpin = false;
    },

  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.chat_parent::-webkit-scrollbar {
  width: 0 !important;
}
.chat_parent::-webkit-scrollbar {
  width: 0 !important;height: 0;
}

/* 滚动条样式 */
.chat::-webkit-scrollbar {
  width: 6px;
  transition: width 1s;
}
.chat::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.chat::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
}

/* top */
.chat_top{
  width: 100%;
  height: 50px;
  position: absolute;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-left: 20px;
  font-size: 20px;
  line-height: 50px;
  box-sizing: border-box;
  font-weight: 550;
  border-width: 0px;
}
.chat {
  position: relative;
}
.send {
  margin-left: 5%;
  height: 100%;
  width: 20%;
}
.message {
  width: 80%;
  /*height: 100%;*/
  font-size: 20px;
  text-align: left;
}
.bottom {
  position: absolute;
  bottom: 5%;
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  height: 8%;
  width: 80%;
  font-size:20px;
}
.content-login{
  top:26%;
  left:36.5%;
  width: 50%;
  height: 90%;
  margin: auto;
  background: rgba(223,219,219,0.2);
  display: flex;
  border-radius: 5px;
  justify-content: center;
  box-shadow: 0 25px 35px rgba(0,0,0,0.8);
}

.content-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
}

.content-bottom :hover{
  cursor: pointer;
}

.loginbox{
  position:absolute;
  width:70%;
  height:80%;
  top:50%;
  left:50%;
  display:flex;
  align-items: center;
  transform:translate(-50%,-50%);
  background-color: rgba(255,255,255,0.3);
  box-shadow: 10px 12px 16px 10px  rgba(0,0,0,0.24), 10px 17px 50px 10px #4E655D;
}

.loginbox .background{
  width: 35%;
  height: 90%;
  margin: auto;
  background-image:url('../../assets/img/Kaleido.png');
  background-size:cover;
  display: table-cell;
  vertical-align: middle;
  font-family:sans-serif;
}

input {
  outline-style: none ;
  border: 0;
  border-bottom:2px solid #2A928F;
  background-color:transparent;
  height:30px;
  font-family:sans-serif;
  font-size:20px;
  color:#445b53;
  font-weight:bold;
}
input:focus{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;
}
input:hover{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;

}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight:bold;
}
</style>
