<template>
  <TextBox>
    <template v-slot:left>
      <n-button id="left" round strong type="success" @click="onLeftButtonClick">导入单词</n-button>
    </template>
    <template v-slot:right>
      <n-button id="right" round strong secondary type="success" @click="onRightButtonClick">生成故事</n-button>
    </template>
  </TextBox>
</template>

<script>
import TextBox from "./TextBox";
export default {
  name: "StoryPage",
  components: {TextBox},
  setup() {
    function onLeftButtonClick() {
      console.log("left")
    }
    function onRightButtonClick() {
      console.log("right")
    }
    return {
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
    margin-right: 50px;
  }
</style>