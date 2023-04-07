<template>
  <n-space vertical id="CardBox">
    <n-space id="AllContainer">
      <n-space id="TextCard">
        <n-card hoverable id="InputCard">
          <n-input id="Input" @select="onSelect"
                   placeholder="在这里输入"
                   :bordered="false"
                   type="textarea"
                   size="small"
                   :autosize="{
                      minRows: 15,
                      maxRows: 15
                    }"
          />
        </n-card>
        <n-card hoverable class="translation">
          {{selectedText}}
        </n-card>
      </n-space>
      <n-space id="ButtonContainer">
        <slot id="left" name="left"></slot>
        <slot id="right" name="right"></slot>
      </n-space>
    </n-space>
  </n-space>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";

export default {
  name: "TextBox",
  setup() {
    let selectedText = ref(null);
    function onSelect(event) {
      selectedText.value = event.target.value.substring(
          event.target.selectionStart,
          event.target.selectionEnd,
      );
    }

    // 手动创建和清除 ResizeObserver 避免ResizeObserver 回调函数的循环嵌套
    let resizeObserver = null;
    let inputRef = ref(null);

    onMounted(() => {
      resizeObserver = new ResizeObserver(() => {
        // handle size changes here
      });
      resizeObserver.observe(inputRef.value);
    });

    onUnmounted(() => {
      resizeObserver.disconnect();
    });

    return {
      value: ref(null),
      selectedText,
      onSelect,
    };
  }
}
</script>

<style scoped>
  #CardBox {
    height: 500px;
    width: 800px;
    background-image: url("../../assets/img/logo.png");
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  #AllContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: flex-end;
    transform: translate(-50%, -48.5%);
  }
  #TextCard {
    position: relative;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: flex-end;
    transform: translate(-50%, -50%);
    height: 400px;
    width: 700px;
    margin:auto;
  }
  #Input{
    height: 350px;
    width: 650px;
    margin:auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #InputCard {
    height: 400px;
    width: 500px;
  }
  .translation {
    margin-left: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
    border-radius: 4px;
    height: 400px;
    width: 180px;
  }
  #ButtonContainer {
    position: relative;
    bottom: 0;
    margin-top: 1px;
    width: 500px;
    left: 50%;
    transform: translate(-25%, 0%);
  }
</style>