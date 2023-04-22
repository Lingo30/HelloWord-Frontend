<template>
  <n-space vertical id="CardBox">
    <n-space id="AllContainer">
      <n-space   class="export-box">
        <n-button type="info" ghost @click="handleExportInput" style="width:12vh;" class="export-btn">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          导出
        </n-button>
        <n-button type="info" ghost @click="handleExportTranslation" style="width:12vh; margin-left: 63vh;" class="export-btn">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          导出
        </n-button>
      </n-space>
      <n-space  class="TextCard">
        <n-card hoverable class="InputCard">
          <n-spin :show="inputSpin">
            <template #description>
              别急，我在努力编QAQ
            </template>
            <n-space>
              <n-input
                  class="Input" @select="onSelect"
                  :placeholder="staticText"
                  :bordered="!active"
                  v-model:value="textValue"
                  type="textarea"
                  size="small"
                  :style="{ height: inputHeight}"
                  :autosize="{
                    maxRows: 20
                  }"
              />
            </n-space>
            <n-space v-if="!active" class="TodayWords">
              <div style="font-weight: bold;font-size: 15px">Today's new words:</div>
              <n-space>
                <n-tag
                    class="tag"
                    v-for="(wordObj, index) in words"
                    :key="wordObj.id"
                    :checked="selectedWords.includes(wordObj.word)"
                    checkable
                    @update:checked="handleTagChecked(index)"
                >
                  {{ wordObj.word }}
                </n-tag>
              </n-space>
            </n-space>
          </n-spin>
        </n-card>
        <n-card hoverable class="translation">
          <n-spin :show="analysisSpin">
            <template #description>
              我康康你写了些什么呀
            </template>
            <div v-if="active" class="rate-box">
              {{"Rate:  "}}
              <n-rate style="margin-left: 8px" class="rate" :value="rateValue" v-if="active" readonly allow-half></n-rate>
            </div>
            <div class="translationText">
              {{analysis}}
            </div>
          </n-spin>

        </n-card>
      </n-space>
      <div id="ButtonContainer">
        <slot id="left" name="left"></slot>
        <slot id="right" name="right"></slot>
      </div>
    </n-space>
  </n-space>
</template>

<script>
import {computed, h, ref} from "vue";
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import {getSentenceAnalysis} from "@/request/api/review";
import {NAvatar, useMessage,useNotification} from "naive-ui";
import Kaleido from "@/assets/img/kaleidoBlank.png";

export default {
  name: "TextBox",
  props: {
    active: {
      type:Boolean,
      default: true,
    },
    staticText: {
      type: String,
      default: "在这里写点东西",
    },
    words: {
      type: Array,
      default: () => [],
    },
    inputValue: {
      type: String,
      default: "",
    },
  },
  components: {
    LogInIcon
  },

  setup(props,{emit}) {
    let msg = useMessage()
    let selectedText = ref(null);
    let analysis = ref("");
    let rateValue = ref(0)
    const analysisSpin = ref(false);
    const inputSpin = ref(false);
    const inputHeight = computed(() => (props.active ? "60vh" : "50vh"));
    const notification = useNotification();

    async function onSelect(event) {
      selectedText.value = event.target.value.substring(
          event.target.selectionStart,
          event.target.selectionEnd,
      );
      analysisSpin.value = true;
      await getSentenceAnalysis(selectedText.value).then((res)=>{
        let success = res.state
        // console.log(res);
        if (success) {
          const lastTimes = res.last_times
          notification.create({
            content: lastTimes === 0?'这是最后一句啦，我先歇了=v=':'今天还能再帮你分析' + lastTimes + '个句子-v-',
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,

          })
          // if (lastTimes === 0)
          //   msg.success('这是最后一句啦，我先歇了=v=')
          // else if (lastTimes <= 5)
          //   msg.success('今天还能再帮你分析' + lastTimes + '个句子-v-')
          analysis.value = res.translation
          analysis.value += "\n" + res.structure
          // structure
        }
        else {
          notification.create({
            content: res.last_times === 0?'今天打烊了，明天再问我好吗QAQ':res.msg,
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,

          })
          // if (res.last_times === 0)
          //   msg.error('今天打烊了，明天再问我好吗QAQ')
          // else
          //   msg.error(res.msg)
        }
      })
      analysisSpin.value = false;
      // console.log(selectedText);
    }

    // 父组件向子组件实时传值，使用计算属性
    // active===true时，使用ref()使之可编辑
    const textValue = props.active===true?ref(""):computed(() => props.inputValue);
    // const textValue = ref(props.inputValue);
    const selectedWords = ref([]);

    const handleTagChecked = (index) => {
      const word = props.words[index].word;
      // console.log(word)
      if (selectedWords.value.includes(word)) {
        selectedWords.value = selectedWords.value.filter((w) => w !== word);
      } else {
        selectedWords.value.push(word);
      }
      // 向父组件传值，绑定一个事件，父组件监听该事件
      emit('handleTagChecked',selectedWords.value);
      // console.log(textValue.value)
    };

    // 导出文本
    function handleExportInput() {
      handleExport(textValue.value,"input.txt");
    }

    function handleExportTranslation() {
      handleExport(analysis.value,"analysis.txt");
    }

    function handleExport(text,fileName) {
      // 使用Blob对象和URL.createObjectURL()方法创建一个临时的URL，
      // 然后通过创建一个隐藏的<a>标签来触发下载。
      const contentType = "text/plain;charset=utf-8";
      const blob = new Blob([text], { type: contentType });
      const url = URL.createObjectURL(blob);

      const hiddenLink = document.createElement("a");
      hiddenLink.href = url;
      hiddenLink.download = fileName;
      hiddenLink.style.display = "none";
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
      document.body.removeChild(hiddenLink);
    }


    return {
      value: ref(null),
      rateValue,
      inputSpin,
      analysisSpin,
      handleExportInput,
      handleExportTranslation,
      textValue,
      analysis,
      onSelect,
      LogInIcon,
      selectedWords,
      handleTagChecked,
      inputHeight,
    };
  }
}
</script>

<style scoped>
#CardBox {
  height: 90vh;
  width: 160vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: rgba(255,255,255,0.3);
  box-shadow: 10px 12px 16px 10px  rgba(0,0,0,0.24), 10px 17px 50px 10px #4E655D;
}
#AllContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: flex-end;
  transform: translate(-50%, -48.5%);
}
.TextCard {
  position: relative;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: flex-end;
  transform: translate(-50%, -50%);
  height: 76vh;
  width: 150vh;
  margin: auto;
}
.Input{
  font-size: 20px;
  width: 75vh;
  margin:auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*background-color: red;*/
}
.InputCard {
  /*height: 600px;*/
  /*width: 800px;*/
  height: 70vh;
  width: 73vh;
  text-align: left;
}
.translation {
  font-size: 20px;
  margin-left: 2vh;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 4px;
  /*height: 600px;*/
  /*width: 270px;*/
  height: 70vh;
  width: 73vh;
  text-align: left;
}
.translationText {
  font-size: 20px;
  width: 68vh;
  height: 74vh;
  overflow-wrap: break-word;
  word-wrap: break-word;
  overflow-y: auto;
  position: relative;
  /*background-color: red;*/
  transform: translate(-50%, -50%);
  margin:auto;
  top: 48%;
  left: 50%;
}

/* 滚动条样式 */
.translationText::-webkit-scrollbar {
  width: 6px;
  transition: width 1s;
}
.translationText::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.translationText::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
}

#ButtonContainer {
  position: absolute;
  bottom: 0;
  width: 150vh;
  justify-content: center;
  align-items: center;
  margin: auto;
  display: flex;
  /*background-color: red;*/
}
.TodayWords {
  width: 66.5vh;
  height: 10vh;
  margin-top: 2vh;
  align-items: center;
  /*background-color: red;*/
}
.tag {
  font-size: 15px;
  align-items: center;
}
.rate-box {
  font-size: 20px;
  display: flex;
  align-items: center;
}

.export-box {
  width: 149vh;
}

.export-btn {
  /*margin-left: 62.5vh;*/
}
</style>
