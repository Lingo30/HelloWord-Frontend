<template>
  <TextBox ref="textBoxRef" :active="inputActive" :type="0" @loadHistory="loadHistory">
    <template v-slot:left>
      <n-button id="left" round strong type="info">导入文本
        <input class="file-btn" type="file" accept=".txt" @change="handleFileUpload"/>
      </n-button>
    </template>
    <template v-slot:right>
      <n-button id="right" round strong secondary type="info" @click="onRightButtonClick">开始分析</n-button>
    </template>
  </TextBox>
</template>

<script>
import TextBox from "./TextBox";
import {ref, onMounted, h} from "vue";
import {getArticleAnalysis} from "@/request/api/review";
import {NButton, NAvatar, useMessage,useNotification} from "naive-ui";
import Kaleido from "@/assets/img/kaleidoBlank.png";
import store from "@/store";
import router from "@/router";
export default {
  name: "WritingPage",
  components: {
    NButton,
    TextBox
  },
  setup() {
    const inputActive = ref(true);
    const textBoxRef = ref(null);
    const msg = useMessage();

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const allowedTypes = ["text/plain"];
      if (!allowedTypes.includes(file.type)) {
        // 文件类型不允许，显示错误消息
        msg.error("仅支持 TXT 格式的文件");
        return;
      }
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target.result.length > 2048) {
            msg.error("文章太长啦，我只能读2048字哦")
            return
          }
          textBoxRef.value.textValue = e.target.result;
        };
        reader.readAsText(file);
      }
    };

    onMounted(() => {
    });

    const notification = useNotification()

    async function onRightButtonClick() {
      const inputValue = textBoxRef.value.textValue;
      if (inputValue === '') {
        msg.warning("写点东西再问我叭")
        return
      }
      textBoxRef.value.analysisSpin = true;
      let errorMsg = "超时啦，请稍后再试试"
      let success = false
      await getArticleAnalysis(store.state.user.uid,inputValue).then((res)=>{
        // console.log(res.comment.analysis);
        success = res.state
        if (success) {
          const lastTimes = res.last_times
          notification.create({
            content: lastTimes === 0?'这是最后一篇啦，我先歇了=v=':'今天还能再帮你分析' + lastTimes + '次作文-v-',
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,
          })
          // if (lastTimes === 0)
          //   msg.success('这是最后一篇啦，我先歇了=v=')
          // else
          //   msg.success('今天还能再帮你分析' + lastTimes + '次作文-v-')
          textBoxRef.value.analysis = res.comment.analysis
          textBoxRef.value.rateValue = parseFloat(res.comment.rating)/2
        }
        else {
          errorMsg = res.last_times === 0?'我读不动啦QAQ':res.msg
        }
      }).catch().finally(()=>{
        if (!success) {
          let n = notification.create({
            content: errorMsg,
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            action: ()=>h(NButton,{
              text: true,
              type: "primary",
              onClick:()=>{
                router.push('/user/info/')
                n.destroy();
              }
            },{
              default: () => "我开会员去:)"
            }),
            duration: 3e3,
          })
          textBoxRef.value.analysisSpin = false;
        }
      })
      textBoxRef.value.analysisSpin = false;
      // console.log(textBoxRef.value.analysis);
    }

    function loadHistory(history) {
      textBoxRef.value.textValue = history.content
      textBoxRef.value.analysis = history.comment.analysis
      textBoxRef.value.rateValue = parseFloat(history.comment.rating)/2
    }

    return {
      inputActive,
      textBoxRef,
      handleFileUpload,
      loadHistory,
      onRightButtonClick
    }
  }
}
</script>

<style scoped>
#left,#right {
  width: 20vw;
}
/*使input嵌入到n-button中*/
#left {
  display: inline-flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
#right{
  margin-left: 10vw;
}
.file-btn {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
}
</style>

