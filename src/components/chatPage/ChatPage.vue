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
              <div v-show="mode === false">
                <n-scrollbar class="chat" style="height: 57vh ;text-align: left;margin-top: 3vh;">
                  <div ref="chat_message" class="chat_parent" style="overflow:hidden; width: 30vw">
                    <ChatMessage v-for="(item, index) in messages" v-bind:key="index" :type=item.type :time=item.time :content=item.content></ChatMessage>
                  </div>
                </n-scrollbar>
              </div>
              <div v-show="mode === true">
                <n-scrollbar style="height: 57vh ;text-align: left;margin-top: 3vh;">
                  <div ref="chat_message" class="chat_parent" style="overflow:hidden; width: 30vw">
                    <VideoMessage v-for="(item, index) in videos" v-bind:key="index" :type=item.type :time=item.time :content=item.content></VideoMessage>
                  </div>
                </n-scrollbar>
              </div>
              <div  class="bottom">
                <div class="text_line" v-show="mode === false">
                  <div class="videobutton" @click="changeMode" ></div>
                  <n-input class="message" v-model:value="value" round placeholder="Type a message..." type="textarea"
                            @keydown.enter.prevent="handleEnter"
                            ref="inputRef"
                            maxlength="200"
                            :autosize="{
                            maxRows: 2
                              }"></n-input>
                  <NButton class="send" @click="sendChat" strong secondary type="info" style="font-size: 15px">提问</NButton>
                </div>
                <div class="video" v-show="mode === true">
                  <div class="textbutton" @click="changeMode" ></div>
                  <NButton @click="voice" strong secondary type="info" style="font-size: 15px; width: 20.5%; height: 100%; margin-left: 0.5%">
                    开始讲话
                  </NButton>
                  <NButton @click="handleStop" strong secondary type="info" style="font-size: 15px; width: 20.5%; height: 100%; margin-left: 0.5%">
                    停止讲话
                  </NButton>
                  <NButton @click="submit" strong secondary type="info" style="font-size: 15px; width: 14%; height: 100%; margin-left: 0.5%">
                    发送
                  </NButton>
                  <NButton @click="handlePlay" strong secondary type="info" style="font-size: 15px; width: 14%; height: 100%; margin-left: 0.5%">
                    播放
                  </NButton>
                </div>
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
import {getHistoryChatAPI, getVideoHistoryChatAPI, sendChatAPI, submitVideo} from "@/request/api/chat";
import {h, nextTick, reactive, ref, toRefs} from 'vue'
import store from "@/store";
import Kaleido from "@/assets/img/kaleidoBlank.png";
import {AUTHENTICATE_ERR} from "@/store/local";
import Recorder from 'js-audio-recorder'
import VideoMessage from "@/components/chatPage/VideoMessage";
export default {
  components: {
    VideoMessage,
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
    const videos = ref([])
    const inputRef = ref(null)
    let mode = ref(false)

    const data = reactive({
      //用于存储创建的语音对象
      recorder: null,
      formData: null,
      // 控制录音动画的显示隐藏
      showAnima: false,
      mation: true,
      isHistory: true,
      // 录音时长
      duration: 0,
      voice () {
        //实例化语音对象
        data.recorder = new Recorder({
          sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1 // 声道，支持 1 或 2， 默认是1
        })
        //记录开始录音的时间
        data.duration = new Date();
        Recorder.getPermission().then(() => {
          console.log('开始录音')
          data.recorder.start() // 开始录音
        }, (error) => {
          console.log(`${error.name} : ${error.message}`)
        })
      },
      handleStop () {
        console.log('停止录音')
        data.recorder.stop() // 停止录音
        data.mation = false;
      },
      handlePlay () {
        console.log('播放录音')
        data.recorder.play() // 播放录音
      },
      handleDestroy () {
        console.log('销毁实例')
        if (data.recorder) {
          data.recorder.destroy() // 毁实例
        }
      },
    })

    return {
      ...toRefs(data),
      message,
      inputRef,
      messages,
      videos,
      showSpin,
      value,
      mode,
      sendChat,
      submit,
      changeMode,
      handleEnter,
    }

    function changeMode() {
      console.log("change");
      mode.value = !mode.value;
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

    async function submit () {
      data.recorder.pause()
      var blob = data.recorder.getWAVBlob()//获取wav格式音频数据
      var newbolb = new Blob([blob], {type: 'audio/wav'})
      var videoFile = new File([newbolb], new Date().getTime() + '.wav')
      let success = false
      let errMsg = ''
      let title = ''
      await submitVideo(videoFile, store.state.user.uid).then((res) => {
        success = res.state
        errMsg = res.msg
        if (!success) {
          if (res.msg.match(new RegExp(AUTHENTICATE_ERR))) {
            errMsg = res.msg
            title = "登录已失效"
          } else {
            errMsg = "一天最多只能对话七次哦，不如今天再去学点单词，明天再来找我聊天叭"
            title = "使用次数已达上限"
          }
          console.log(errMsg)
          console.log(title)
        } else {
          console.log("success push")
          let q = {
            time: res.receive_time,
            type: false,
            // content: value.value  todo
          };
          videos.value.push(q);
          let p = {
            time: res.post_time,
            type: true,
            content: res.post_message,
          };
          videos.value.push(p);
        }
      }).catch(err => {}).finally(() => {
        console.log("success push final")
        if (!success) {
          console.log("not success push")
          notification.create({
            title: title,
            content: errMsg,
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
    this.getVideoHistory();
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
            time: item.time.replace("T"," ").split(":").slice(0,2).join(":"),
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
    getVideoHistory() {
      this.showSpin = true;
      console.log("video");
      let newList1 = {
        time: "11111",
        type: true,
      };
      let success = false
      let errMsg = ''
      getVideoHistoryChatAPI(store.state.user.uid).then((res) => {
        success = res.state
        errMsg = res.msg
        res.history.forEach((item) => {
          let newList = {
            time: item.time.replace("T"," ").split(":").slice(0,2).join(":"),
            type: !item.type,
            content: item.content,
          };
          this.videos.push(newList);
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
  margin-left: 0.5%;
  height: 100%;
  width: 14.5%;
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
.videobutton{
  background-image: url('../../assets/img/video.png');
  background-size: 100% 100%;
  width: 5vh;
  height: 5vh;
}
.textbutton{
  background-image: url('../../assets/img/text.png');
  background-size: 100% 100%;
  width: 5vh;
  height: 5vh;
}
.video{
  position: absolute;
  /*bottom: 5%;*/
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  height: 5vh;
  width: 28vw;
  font-size:20px;
}

.text_line {
  position: absolute;
  /*bottom: 5%;*/
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  height: 5vh;
  width: 28vw;
  /*background-color: #2c3e50;*/
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
