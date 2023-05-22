<template>
  <div >
    <VideoMessageLeft v-show="true === type" v-bind:time=time v-bind:content=content></VideoMessageLeft>
    <VideoMessageRight v-show="false === type" v-bind:time=time v-bind:content=content></VideoMessageRight>
  </div>
</template>

<script>
import VideoMessageLeft from "@/components/chatPage/VideoMessageLeft";
import VideoMessageRight from "@/components/chatPage/VideoMessageRight";
export default {
  name: "VideoMessage",
  components:{
    VideoMessageRight,
    VideoMessageLeft,
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
    content:{ // 怎么播放音频  todo
      type: String,
      default: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
    }
  }
}
</script>

<style scoped>

</style>
