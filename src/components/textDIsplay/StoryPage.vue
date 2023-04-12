<template>
  <TextBox :active="inputActive"
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
import {ref} from "vue";
export default {
  name: "StoryPage",
  components: {TextBox},

  setup() {
    const words = ref([
      {
        id: 1,
        word:"abc"
      },
      {
        id: 2,
        word:"dddssss"
      },
      {
        id: 3,
        word:"werwtt"
      },
      {
        id: 4,
        word:"dhhkl"
      },
      {
        id: 5,
        word:"adsfw"
      },
      {
        id: 6,
        word:"dasfc"
      },
      {
        id: 7,
        word:"kjlj"
      },{
        id: 8,
        word:"dafdsffsfc"
      },
      {
        id: 9,
        word:"kjlffdaj"
      },{
        id: 10,
        word:"dasgghefc"
      },
      {
        id: 11,
        word:"kehehhlj"
      }])
    const selectedWords = ref([])
    const story = ref("aaaa");
    const inputActive = ref(false);
    const inputPlaceholder = ref("");
    function onLeftButtonClick() {
      console.log("left")
    }
    function onRightButtonClick() {
      // console.log(story.value)
      story.value = "afsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffff" +
          "ffffffffffffffffffffffffffffff" +
          "fffffffffffff" +
          "fffffffffffffffffffffffffffffffffffffsssssssssssss" +
          "fffffffffffffffffddddddddddd" +
          "dddddddddddddddddddddddddd" +
          "ddddddddddddddddddddddddddd" +
          "dddddddddddddddddddddd" +
          "d" +
          "ffffffffffffffffffffffffffffffffffffffffffff"+
          "afsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffff" +
          "ffffffffffffffffffffffffffffff" +
          "fffffffffffff" +
          "fffffffffffffffffffffffffffffffffffffsssssssssssss" +
          "fffffffffffffffffddddddddddd" +
          "dddddddddddddddddddddddddd" +
          "ddddddddddddddddddddddddddd" +
          "dddddddddddddddddddddd" +
          "d" +
          "ffffffffffffffffffffffffffffffffffffffffffff"+
          "afsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffff" +
          "ffffffffffffffffffffffffffffff" +
          "fffffffffffff" +
          "fffffffffffffffffffffffffffffffffffffsssssssssssss" +
          "fffffffffffffffffddddddddddd" +
          "dddddddddddddddddddddddddd" +
          "ddddddddddddddddddddddddddd" +
          "dddddddddddddddddddddd" +
          "d" +
          "ffffffffffffffffffffffffffffffffffffffffffff";
    }

    function handleSelectedWords(retWords) {
      selectedWords.value = retWords;
      // console.log(selectedWords.value);
    }
    return {
      words,
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
    margin-right: 11vh;
  }
</style>