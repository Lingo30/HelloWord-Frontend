<template>
  <TextBox :active="inputActive" :staticText="inputPlaceholder">
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
    const inputActive = ref(false);
    const inputPlaceholder = ref("");
    function onLeftButtonClick() {
      console.log("left")
    }
    function onRightButtonClick() {
      console.log("right")
    }
    return {
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
    margin-right: 50px;
  }
</style>