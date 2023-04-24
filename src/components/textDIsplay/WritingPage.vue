<template>
  <TextBox ref="textBoxRef" :active="inputActive">
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
import {NAvatar, useMessage,useNotification} from "naive-ui";
import Kaleido from "@/assets/img/kaleidoBlank.png";
import store from "@/store";
export default {
  name: "WritingPage",
  components: {TextBox},

  setup() {
    const inputActive = ref(true);
    const textBoxRef = ref(null);
    const msg = useMessage();

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
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
      await getArticleAnalysis(store.state.user.uid,inputValue).then((res)=>{
        // console.log(res.comment.analysis);
        const success = res.state
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
          notification.create({
            content: res.last_times === 0?'我读不动啦QAQ':res.msg,
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,

          })
          // if (res.last_times === 0)
          //   msg.error('我读不动啦QAQ')
          // else
          //   msg.error(res.msg)
        }
      })
      textBoxRef.value.analysisSpin = false;
      // console.log(textBoxRef.value.analysis);
    }
    return {
      inputActive,
      textBoxRef,
      handleFileUpload,
      onRightButtonClick
    }
  }
}
</script>

<style scoped>
#left,#right {
  width: 40vh;
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
  margin-left: 20vh;
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

