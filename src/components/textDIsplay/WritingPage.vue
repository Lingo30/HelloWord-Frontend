<template>
  <TextBox ref="textBoxRef" :active="inputActive">
    <template v-slot:left>

      <n-button id="left" round strong type="success">导入文本
        <input class="file-btn" type="file" accept=".txt" @change="handleFileUpload"/>
      </n-button>
    </template>
    <template v-slot:right>
      <n-button id="right" round strong secondary type="success" @click="onRightButtonClick">开始分析</n-button>
    </template>
  </TextBox>
</template>

<script>
import TextBox from "./TextBox";
import {ref,onMounted} from "vue";
export default {
  name: "WritingPage",
  components: {TextBox},

  setup() {
    const inputActive = ref(true);
    const textBoxRef = ref(null);

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

    function onRightButtonClick() {
      // 获取子组件中用户输入的文章
      const inputValue = textBoxRef.value.textValue;
      console.log(inputValue);
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
    width: 200px;
  }
  /*使input嵌入到n-button中*/
  #left {
    margin-right: 50px;
    display: inline-flex;
    position: relative;
    overflow: hidden;
    justify-content: center;
    align-items: center;
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

