<template>
  <div>
    <div class="chat_top">
      <img src="../../assets/img/kaleidoBlank.png" height="170" width="150">
    </div>
    <ChatMessageRight time="12:00" content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" ></ChatMessageRight>
    <ChatMessageLeft time="12:02" content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" ></ChatMessageLeft>
    <ChatMessageRight time="12:00" content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" ></ChatMessageRight>
    <ChatMessageLeft time="12:02" content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" ></ChatMessageLeft>
    <ChatMessageRight time="12:00" content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" ></ChatMessageRight>
    <ChatMessageLeft time="12:02" content="啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" ></ChatMessageLeft>
  </div>
</template>

<script>
import ChatMessageLeft from "@/components/chatPage/ChatMessageLeft";
import ChatMessageRight from "@/components/chatPage/ChatMessageRight";
export default {
  name: "ChatBox",
  components:{
    ChatMessageRight,
    ChatMessageLeft
  }
}
</script>


<style scoped>

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

</style>
