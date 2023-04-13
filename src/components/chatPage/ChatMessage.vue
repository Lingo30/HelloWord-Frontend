<template>
  <div>
    <ChatMessageLeft v-show="true === type" v-bind:time=time v-bind:content=content></ChatMessageLeft>
    <ChatMessageRight v-show="false === type" v-bind:time=time v-bind:content=content></ChatMessageRight>
  </div>
</template>

<script>
import ChatMessageLeft from "@/components/chatPage/ChatMessageLeft";
import ChatMessageRight from "@/components/chatPage/ChatMessageRight";
export default {
  name: "ChatMessage",
  components:{
    ChatMessageRight,
    ChatMessageLeft
  },
  props:{
    type:{
      type: Boolean,
      default: false
    },
    time:{
      type: String,
      default: '--:--'
    },
    content:{
      type: String,
      default: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
    }
  }
}
</script>

<style scoped>

</style>
