<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="background">
        </div>
        <!-- 右侧的注册盒子 -->
        <div v-show="0===number" class="content-login">
          <NScrollbar class="chat" style="max-height: 500px">
            <ChatBox></ChatBox>
          </NScrollbar>
          <div class="bottom">
            <NInput class="message" round placeholder="Type a message...">
            </NInput>
            <NButton class="send" strong secondary type="info">
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
import {ref} from "vue";
import ChatBox from "@/components/chatPage/ChatBox";
export default {
  components:{
    NInput,
    NButton,
    NScrollbar,
    ChatBox
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      number: 0,
      message : "aaaaaa",
      time : "12:00"
    }
  },
  setup () {
    return {
      value: ref(null)
    }
  },

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.chat {
  position: relative;
}
.send {
  margin-left: 20px;
}
.message {
  width: 400px;
}
.content-login .bottom {
  position: absolute;
  bottom: 120px;
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  height: 40px;
  font-size:40px
}
.content-login{
  top:26%;
  left:36.5%;
  width: 600px;
  height: 600px;
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
  width:1200px;
  height:800px;
  top:50%;
  left:50%;
  display:flex;
  align-items: center;
  transform:translate(-50%,-50%);
  background-color: rgba(255,255,255,0.3);
  box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}

.loginbox .background{
  width:400px;
  height: 600px;
  margin: auto;
  background-image:url('../assets/img_1.png');
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
  height:20px;
  font-family:sans-serif;
  font-size:15px;
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
