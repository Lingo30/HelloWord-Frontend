<template>
  <TextBox :active="inputActive">
    <template v-slot:left>
      <n-button id="left" round strong type="success" @click="onLeftButtonClick">导入文本</n-button>
    </template>
    <template v-slot:right>
      <n-button id="right" round strong secondary type="success" @click="onRightButtonClick">开始分析</n-button>
    </template>
  </TextBox>
</template>

<script>
import TextBox from "./TextBox";
import {ref} from "vue";
export default {
  name: "WritingPage",
  components: {TextBox},

  setup() {
    const inputActive = ref(true);
    function onLeftButtonClick() {
      console.log("left")
    }
    function onRightButtonClick() {
      console.log("right")
    }
    return {
      inputActive,
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