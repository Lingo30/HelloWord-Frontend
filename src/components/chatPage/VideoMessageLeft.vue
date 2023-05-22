<template>
  <div class="chat_left">
    <div class="chat_left_item_2">
      <div class="chat_left_time">{{ time }}</div>
      <div class="videobutton">
<!--        todo 怎么绑定一个播放按钮-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoMessageLeft",
  props: {
    time: {
      type: String,
      default: '--:--'
    },
    content: {
      type: String,
      default: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
    }
  }
}
</script>

<style scoped>

.videobutton{
  background-image: url('../../assets/img/videoChat.png');
  background-size: 90% 90%;
  background-position: center;
  border-radius: 1vh;
  width: 10vh;
  height: 5vh;
  background-color: #999999;
}

.chat_left {
  width: 100%;
  margin-left: 10px;
  min-height: 120px;
  box-sizing: content-box;
}

.chat_left_item_2 {
  width: 55%;
  height: auto;
  float: left;
}

.chat_left_item_2 .chat_left_time {
  width: 100%;
  text-align: left;
  height: auto;

}

.chat_left_item_2 .chat_left_content {
  padding: 15px;
  margin-top: 10px;
  float: left;
  border-radius: 10px;
  border-top-left-radius: 0px;
  height: auto;
}
</style>
