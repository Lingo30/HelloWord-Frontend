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
          <div class="chat_top">
            <img src="../../assets/img/kaleidoBlank.png" height="135" width="130">
          </div>
          <div class="chat_parent" style="overflow:scroll;">
            <div ref="chat_box" class="chat" style="overflow-x:hidden; overflow-y:auto; max-height:500px" >
              <ChatMessage v-for="(item, index) in messages" v-bind:key="index" :type=item.type :time=item.time :content=item.content></ChatMessage>
            </div>
          </div>
          <div class="bottom">
            <NInput class="message" v-model:value="question" round placeholder="Type a message...">
            </NInput>
            <NButton class="send" @click="sendChat" strong secondary type="info">
              提问
            </NButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {NInput , NButton, NScrollbar} from 'naive-ui';
import ChatMessage from "@/components/chatPage/ChatMessage";
import {getHistoryChatAPI, sendChatAPI} from "@/request/api/chat";
import {ref} from 'vue'
import store from "@/store";

export default {
  components:{
    NInput,
    NButton,
    NScrollbar,
    ChatMessage
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      question: ref(''),
      messages: []
    }
  },
  created() {
    this.getHistory();
  },
  methods: {
    sendChat() {
      sendChatAPI(store.state.user.uid, this.question).then((res) => {
        let q = {
          time:res.receive_time,
          type: false,
          content: this.question,
        };
        this.messages.push(q);
        let p = {
          time:res.post_time,
          type: true,
          content: res.post_message,
        };
        this.messages.push(p);
        this.question="";
        this.$refs.chat_box.scrollTop = 10000;
        this.$refs.chat_box.scrollTop = 10000; /*TODO*/
      })
    },
    getHistory() {
      getHistoryChatAPI(10).then((res) => {
        console.log(res);
        res.history.forEach((item) => {
          let newList = {
            time:item.time,
            type: item.type,
            content:item.content,
          };
          this.messages.push(newList);
        });
      })
    }
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
  height: 100%;
  font-size: 5px;
}
.content-login .bottom {
  position: absolute;
  bottom: 10%;
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  height: 5%;
  width: 40%;
  font-size:20px
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
