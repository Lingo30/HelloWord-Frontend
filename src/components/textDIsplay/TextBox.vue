<template>
  <n-space vertical id="CardBox">
    <n-space id="AllContainer">
      <n-space id="TextCard">
        <n-card hoverable id="InputCard">
          <n-space>
            <n-input id="Input" @select="onSelect"
                     :placeholder="staticText"
                     :disabled="!active"
                     :bordered="false"
                     type="textarea"
                     size="small"
                     :style="{ height: inputHeight}"
                     :autosize="{
                      minRows: 19,
                      maxRows: 20
                    }"
            />
          </n-space>
          <n-space v-if="!active" class="TodayWords">
            <div style="font-weight: bold;font-size: 18px">Today's new words:</div>
            <n-space>
              <n-tag
                  class="tag"
                  v-for="(word, index) in words"
                  :key="index"
                  :checked="selectedWords.includes(word)"
                  checkable
                  @update:checked="handleTagChecked(index)"
              >
                {{ word }}
              </n-tag>
            </n-space>
          </n-space>

        </n-card>
        <n-card hoverable class="translation">
          <div style="font-size: 25px">
            {{selectedText}}
          </div>

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
import {computed,ref} from "vue";

export default {
  name: "TextBox",
  props: {
    active: {
      type:Boolean,
      default: true,
    },
    staticText: {
      type: String,
      default: "在这里输入",
    },
  },
  setup(props) {
    let selectedText = ref(null);
    // 后端传回已学的单词
    let words = ref(["abc","bcd","dddssss","abcc","adsfw","dasfc",
                          "a","vs","dhhkl","kjlj","d","wfefw","dfdg","juyghj","dfcc","werwtt"]);
    const inputHeight = computed(() => (props.active ? "550px" : "450px"));
    function onSelect(event) {
      selectedText.value = event.target.value.substring(
          event.target.selectionStart,
          event.target.selectionEnd,
      );
    }

    const selectedWords = ref([]);

    const handleTagChecked = (index) => {
      const word = words.value[index];
      console.log(word)
      if (selectedWords.value.includes(word)) {
        selectedWords.value = selectedWords.value.filter((w) => w !== word);
      } else {
        selectedWords.value.push(word);
      }
      console.log(selectedWords.value)
    };

    return {
      value: ref(null),
      selectedText,
      onSelect,
      words,
      selectedWords,
      handleTagChecked,
      inputHeight,
    };
  }
}
</script>

<style scoped>
  #CardBox {
    height: 700px;
    width: 1200px;
    background-image: url("../../assets/img/logo.png");
    margin-left: 9%;
    margin-top: 2%;
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
    height: 600px;
    width: 1100px;
    margin:auto;
  }
  #Input{
    font-size: 25px;
    width: 750px;
    margin:auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #InputCard {
    height: 600px;
    width: 800px;
    text-align: left;
  }
  .translation {
    font-size: 25px;
    margin-left: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
    border-radius: 4px;
    height: 600px;
    width: 270px;
    text-align: left;
  }
  #ButtonContainer {
    position: relative;
    bottom: 0;
    margin-top: 1px;
    width: 500px;
    left: 50%;
    transform: translate(18%, 15%);
  }
  .TodayWords {
    width: 750px;
    height: 100px;
    margin-top: 15px;
    align-items: center;
  }
  .tag {
    font-size: 18px;
    align-items: center;
  }
</style>