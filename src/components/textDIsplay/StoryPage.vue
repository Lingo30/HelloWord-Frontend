<template>
  <TextBox ref="textBoxRef"
           :active="inputActive"
           :words="words"
           :staticText="inputPlaceholder"
           :input-value="story"
           :type="1"
           @handleTagChecked="handleSelectedWords"
           @update:selectedWords="handleSelectedWords">
    <template v-slot:left>
      <n-button id="left" round strong type="info" @click="onLeftButtonClick">故事模式</n-button>
    </template>
    <template v-slot:right>
      <n-button id="right" round strong secondary type="info" @click="onRightButtonClick">生成故事</n-button>
    </template>
  </TextBox>
</template>

<script>
import TextBox from "./TextBox";
import {onBeforeMount, ref,h} from "vue";
import {getTodayWords, wordsToStory} from "@/request/api/review";
import store from "@/store";
import {useMessage,useNotification, NAvatar,NButton} from 'naive-ui'
import Kaleido from "../../assets/img/kaleidoBlank.png"
import router from "@/router";
export default {
  name: "StoryPage",
  components: {
    NButton,
    TextBox
  },
  setup() {
    const message = useMessage()
    const words = ref([])
    const textBoxRef = ref(null)
    // 提示跳转到单词学习
    const notification = useNotification()

    const load = () => {
      getTodayWords(store.state.user.uid).then((res)=>{
        // console.log(res);
        let success = res.state
        if (success) {
          if (res.today_words.length === 0) {
            const n = notification.create({
              title: "快先去学点单词",
              content: "还没有单词能用来编故事，先去学一点教给我吧",
              avatar: () => h(NAvatar,{
                size: 'small',
                round: true,
                src: Kaleido,
              }),
              action: ()=>h(NButton,{
                text: true,
                type: "primary",
                onClick:()=>{
                  router.push('/user/learn/')
                  n.destroy();
                }
              },{
                default: () => "这就去"
              }),
              duration: 3e3,
            })
          }
          else
            words.value = res.today_words
        }
        else {
          message.error(res.msg)
        }
      }).catch()
    }
    onBeforeMount(()=>{
      load()
    })

    const selectedWords = ref([])
    const story = ref("");
    const inputActive = ref(false);
    const inputPlaceholder = ref("");

    function onLeftButtonClick() {
      notification.create({
        title: "你发现了小彩蛋鸭",
        content: "才不会告诉你是我们想不到这个按钮放什么",
        avatar: () => h(NAvatar,{
          size: 'small',
          round: true,
          src: Kaleido,
        }),
        duration: 1e3,
      })
    }
    async function onRightButtonClick() {
      // console.log(story.value)
      textBoxRef.value.inputSpin = true
      // console.log(selectedWords.value)
      let errorMsg = "超时啦，请稍后再试试"
      let success = false
      await wordsToStory(store.state.user.uid,selectedWords.value).then((res) => {
        // console.log(res);
        success = res.state
        if (success) {
          const lastTimes = res.last_times
          notification.create({
            content: lastTimes === 0?'这是最后一篇啦，我先歇了=v=':'今天还能再想' + lastTimes + '篇故事-v-',
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,

          })
          // if (lastTimes === 0)
          //   message.success('这是最后一篇啦，我先歇了=v=')
          // else
          //   message.success('今天还能再想' + lastTimes + '篇故事-v-')
          story.value = res.story
        }
        else {
          errorMsg = res.last_times === 0?'再想AI的脑袋也顶不住啦QAQ':res.msg
        }
      }).catch().finally(()=>{
        if (!success) {
          notification.create({
            content: errorMsg,
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,
          })
          textBoxRef.value.inputSpin = false
        }
      })
      textBoxRef.value.inputSpin = false
    }

    function handleSelectedWords(retWords) {
      selectedWords.value = retWords;
      // console.log(selectedWords.value);
    }
    return {
      words,
      textBoxRef,
      story,
      handleSelectedWords,
      inputActive,
      inputPlaceholder,
      onLeftButtonClick,
      onRightButtonClick
    }
  }
}
</script>

<style scoped>
#left,#right {
  width: 20vw;
}
#right {
  margin-left: 10vw;
}
</style>
