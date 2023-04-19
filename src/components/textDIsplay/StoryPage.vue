<template>
  <TextBox ref="textBoxRef"
            :active="inputActive"
           :words="words"
           :staticText="inputPlaceholder"
           :input-value="story"
           @handleTagChecked="handleSelectedWords"
           @update:selectedWords="handleSelectedWords">
    <template v-slot:left>
      <n-button id="left" round strong type="success" @click="onLeftButtonClick">故事模式</n-button>
    </template>
    <template v-slot:right>
      <n-button id="right" round strong secondary type="success" @click="onRightButtonClick">生成故事</n-button>
    </template>
  </TextBox>
</template>

<script>
import TextBox from "./TextBox";
import {onBeforeMount, ref} from "vue";
import {getTodayWords, wordsToStory} from "@/request/api/review";
import store from "@/store";
import {useMessage} from 'naive-ui'
export default {
  name: "StoryPage",
  components: {TextBox},

  setup() {
    const message = useMessage()
    const words = ref([])
    const textBoxRef = ref(null)

    const load = () => {
      getTodayWords(store.state.user.uid).then((res)=>{
        // console.log(res);
        let success = res.state
        if (success) {
          words.value = res.today_words
        }
        else {
          message.error(res.msg)
        }
      })
    }
    onBeforeMount(()=>{
      load()
    })

    const selectedWords = ref([])
    const story = ref("");
    const inputActive = ref(false);
    const inputPlaceholder = ref("");
    function onLeftButtonClick() {
      // console.log("left")
    }
    async function onRightButtonClick() {
      // console.log(story.value)
      textBoxRef.value.inputSpin = true
      // console.log(selectedWords.value)
      await wordsToStory(store.state.user.uid,selectedWords.value).then((res) => {
        // console.log(res);
        let success = res.state
        if (success) {
          story.value = res.story
        }
        else {
          let msg = res.msg
          message.error(msg);
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
    width: 200px;
  }
  #left {
    margin-right: 8vh;
  }
</style>