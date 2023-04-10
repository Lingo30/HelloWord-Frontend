<template>
  <div>
    <div class="chat_top">
      <img src="../../assets/img/kaleidoBlank.png" height="170" width="150">
    </div>
    <ChatMessage v-for="(item, index) in messages" v-bind:key="index" :type=item.type :time=item.time :content=item.content></ChatMessage>
  </div>
</template>

<script>
import ChatMessage from "@/components/chatPage/ChatMessage";
export default {
  name: "ChatBox",
  components:{
    ChatMessage
  },
  data() {
    return {
      messages: [
        {
          type: false,
          time: "12:00",
          content: "llllllllllll"
        },
        {
          type: true,
          time: "12:01",
          content: "tttttttttttt"
        },
        {
          type: false,
          time: "12:02",
          content: "rrrrrrrrrrrr"
        },
        {
          type: true,
          time: "12:03",
          content: "yyyyyyyyyyyyy"
        }
      ]
    }
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
