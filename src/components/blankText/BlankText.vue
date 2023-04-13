<template>
  <div>
    <n-card hoverable class="TextContainer">
      <div class="content-box">
        <span v-for="(char, index) in content" :key="index">
          <template v-if="isBlank(index)">
            <input
                ref="inputs"
                class="blank-input"
                v-if="isBlankStart(index)"
                :style="{ width: getWidth(index) + 'px' }"
                :class="{ correct: !init && answerStatus[getBlankIndex(index)] === true, incorrect: !init && answerStatus[getBlankIndex(index)] === false }"
                type="text"
                @input="recordAnswer($event.target.value, index)"
            />
          </template>
          <span v-else>{{ char }}</span>
        </span>
      </div>
    </n-card>
    <n-card hoverable class="answer-box">
      <template v-if="showAnswers">
        <p v-for="chunk in answerChunks" :key="chunk[0].index">
          <span v-for="(answer, innerIndex) in chunk" :key="innerIndex">
            {{ answer.index }}: {{ answer.realAnswer }}&nbsp;&nbsp;
          </span>
        </p>
      </template>
    </n-card>
    <div>
      <n-button class="left button" type="primary" @click="changeArticle">换一篇文章吧</n-button>
      <n-button class="right button" type="primary" ghost @click="submitAnswers">提交</n-button>
    </div>
  </div>

</template>

<script>
import {computed, onBeforeMount, reactive, ref} from "vue";
import {getBlankText} from "@/request/api/review";
import store from "@/store";

export default {
  name: "BlankText",
  setup() {
    const content = ref('');
    const wordList = reactive([]);
    const userAnswers = reactive([]);
    const init = ref(true)

    const load = () => {
      init.value = true
      getBlankText(store.state.user.uid).then((res)=>{
        content.value = res.content
        wordList.splice(0);
        wordList.push(...res.wordList);
      })

    }
    onBeforeMount(()=>{
      load()
    })

    // 判断是否是单词空的第一个字符
    const isBlankStart = (index) => {
      return wordList.some(word => index === word.start);
    };

    // 判断是否需要挖空
    function isBlank(index) {
      return wordList.some(word => index >= word.start && index < word.end);
    }

    // 获取单词长度，动态调整输入框长度
    function getWidth(index) {
      const word = wordList.find(word => index === word.start);
      return word ? (word.end - word.start) * 10 : 0;
    }

    // 记录答案
    function recordAnswer(value, index) {
      const wordIndex = wordList.findIndex(word => index >= word.start && index < word.end);
      userAnswers[wordIndex] = value;
    }

    const showAnswers = ref(false);

    // 用于显示正确答案
    const answerChunks = computed(() => {
      const chunks = [];
      const chunkSize = 5;

      for (let i = 0; i < wordList.length; i += chunkSize) {
        chunks.push(
            wordList.slice(i, i + chunkSize).map((word, index) => {
              return {
                index: i+index+1,
                realAnswer: getRealAnswer(i + index)
              };
            })
        );
      }

      return chunks;
    });

    // 根据字符在文章中的序号获取空的序号
    const getBlankIndex = (index) => {
      return wordList.findIndex(word => word.start === index);
    };

    const answerStatus = reactive([]);

    // 获取正确答案
    const getRealAnswer = (index) => {
      const word = wordList[index];
      return content.value.slice(word.start, word.end).toLowerCase();
    };

    // 验证答案
    const submitAnswers = () => {
      init.value = false
      for (let i = 0; i < wordList.length; i++) {
        const answer = userAnswers[i] || '';
        answerStatus[i] = answer.toLowerCase() === getRealAnswer(i);
      }
      showAnswers.value = true;
    };

    const inputs = ref(null)

    function changeArticle() {
      load()
      showAnswers.value = false
      answerStatus.slice(0)
      userAnswers.slice(0)

      inputs.value.forEach(input => {
        input.value = '';
      });
    }

    return {
      inputs,
      init,
      changeArticle,
      content,
      wordList,
      userAnswers,
      isBlank,
      getWidth,
      recordAnswer,
      isBlankStart,
      showAnswers,
      answerChunks,
      submitAnswers,
      answerStatus,
      getBlankIndex
    };
  }
}
</script>

<style scoped>
  .blank-input {
    width: 20px;
    border: none;
    border-bottom: 1px solid #000;
    text-align: center;
  }
  .TextContainer {
    width: 800px;
    height: 500px;
    text-align: left;
  }
  /*overflow-y 文本超出后scroll*/
  .content-box {
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 100%;
    height: 87%;
    overflow-y: auto;
    position: relative;
  }
  .answer-box {
    margin-top: 10px;
    width: 800px;
    height: 100px;
    margin-bottom: 10px;
    text-align: left;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
  .left {
    margin-left: 13%;
    margin-right: 100px;
  }
  .button {
    float: left;
    width: 150px;
  }

  /* 滚动条样式 */
  .content-box::-webkit-scrollbar {
    width: 6px;
    transition: width 1s;
  }
  .content-box::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .content-box::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  }
</style>