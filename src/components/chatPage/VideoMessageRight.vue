<template>
  <div class="chat_right">
    <div class="chat_right_item_2">
      <div class="chat_right_time">{{time}}</div>
      <div class="videobutton" @click="this.play">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoMessageRight",
  components:{
  },
  data() {
  },
  props:{
    time:{
      type:String,
      default:'--:--'
    },
    content:{
      type:String,
      default:''
    }
  },
  methods: {
    play() {
      this.audio = new Audio();
      this.audio.src = this.content;
      this.audio.play();
    }
  }
}

</script>

<style scoped>
/* 右边 */


.videobutton{
  background-image: url('../../assets/img/videoChat.png');
  background-size: 90% 90%;
  background-position: center;
  border-radius: 1vh;
  width: 10vh;
  height: 5vh;
  background-color: #999999;
  float: right;
}
.chat_right{
  width: 100%;
  margin-left: 10px;
  min-height: 120px;
  box-sizing: content-box;
}
.chat_right_item_2{
  width: 55%;
  height: auto;
  float: right;
  box-sizing: content-box;
  margin-right: 10px;
}
.chat_right_time{
  width: 100%;
  margin-right: 10px;
  box-sizing: content-box;
  text-align: right;
}


</style>
