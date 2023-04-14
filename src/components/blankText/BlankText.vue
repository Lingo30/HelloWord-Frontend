<template>
  <n-space vertical class="card-box">
    <n-space class="all-container">
      <n-space class="text-card">
        <n-card hoverable class="TextContainer">
          <n-scrollbar style="max-height: 550px;">
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
          </n-scrollbar>
        </n-card>
        <n-card :title="showAnswers?'看看哪儿错了？':'你可以试着填入这些词'" hoverable class="used-words-box">
          <n-scrollbar style="max-height: 505px;">
            <n-list hoverable v-if="showAnswers">
              <n-list-item v-for="(word,index) in realAnswers" :key="index">
                <n-thing style="font-size: 20px;">{{index+1}}: {{word}}</n-thing>
              </n-list-item>
            </n-list>
            <n-list hoverable v-else>
              <n-list-item v-for="(word,index) in usedWords" :key="index">
                <n-thing style="font-size: 20px;">{{word}}</n-thing>
              </n-list-item>
            </n-list>
          </n-scrollbar>
        </n-card>
      </n-space>
      <n-space class="btn-box">
        <n-button round class="left button" type="primary" @click="changeArticle">换一篇文章吧</n-button>
        <n-button round class="right button" type="primary" ghost @click="submitAnswers">提交</n-button>
      </n-space>
    </n-space>
  </n-space>

</template>

<script>
import {onBeforeMount, reactive, ref} from "vue";
import {getBlankText} from "@/request/api/review";
import store from "@/store";

export default {
  name: "BlankText",
  setup() {
    const content = ref('');
    const wordList = reactive([]);
    const userAnswers = reactive([]);
    const init = ref(true)
    const realAnswers = reactive([]);
    const usedWords = ref(null)

    async function load () {
      init.value = true
      await getBlankText(store.state.user.uid).then((res)=>{
        content.value = res.content
        wordList.splice(0);
        wordList.push(...res.wordList);
      })
      wordList.forEach((loc)=>{
        realAnswers.push(content.value.substring(loc.start,loc.end))
      })

      const arr = [...realAnswers]

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      usedWords.value = new Set(arr)

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
      return word ? (word.end - word.start) * 15 : 0;
    }

    // 记录答案
    function recordAnswer(value, index) {
      const wordIndex = wordList.findIndex(word => index >= word.start && index < word.end);
      userAnswers[wordIndex] = value;
    }

    const showAnswers = ref(false);

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
      usedWords,
      realAnswers,
      changeArticle,
      content,
      wordList,
      userAnswers,
      isBlank,
      getWidth,
      recordAnswer,
      isBlankStart,
      showAnswers,
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
    height: 600px;
    width: 800px;
    text-align: left;
  }

  .content-box {
    font-size: 20px;
    max-width: 100%;
    height: 48%;
    position: relative;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }

  .btn-box {
    position: relative;
    bottom: 0;
    margin-top: 1px;
    width: 500px;
    left: 50%;
    transform: translate(18%, 15%);
  }

  .left {
    margin-right: 11vh;
  }
  .button {
    width: 200px;
  }

  .used-words-box {
    font-size: 25px;
    margin-left: 15px;
    height: 600px;
    width: 270px;
    text-align: left;
  }

  .all-container {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: flex-end;
    transform: translate(-50%, -48.5%);
  }

  .card-box {
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

  .text-card {
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
</style>