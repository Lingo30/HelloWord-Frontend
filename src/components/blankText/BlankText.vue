<template>
  <n-space vertical class="card-box">
    <n-space class="all-container">
      <n-space class="export-box">
        <n-button type="info" ghost @click="handleExportInput" class="export-btn">
          <template #icon>
            <n-icon><log-in-icon /></n-icon>
          </template>
          导出
        </n-button>
      </n-space>

      <n-space class="text-card">
        <n-spin :show="showSpin">
          <template #description>
            我在努力哇
          </template>
          <n-card hoverable class="TextContainer">
            <n-scrollbar style="max-height: 72vh;">
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

        </n-spin>
        <n-card :title="showAnswers?'看看哪儿错了？':'你可以试着填入这些词'" hoverable class="used-words-box">
          <n-scrollbar style="max-height: 70vh;">
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
      <div class="btn-box">
        <n-button round class="left button" type="info" @click="changeArticle">换一篇文章吧</n-button>
        <n-button round class="right button" type="info" ghost @click="submitAnswers">提交</n-button>
      </div>
    </n-space>
  </n-space>

</template>

<script>
import {h, onBeforeMount, reactive, ref} from "vue";
import {getBlankText} from "@/request/api/review";
import store from "@/store";
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import {NAvatar, useMessage,useNotification} from "naive-ui";
import Kaleido from "@/assets/img/kaleidoBlank.png";

export default {
  name: "BlankText",
  components: {
    LogInIcon
  },
  setup() {
    // const content = ref('Once upon a time in the magical world of Valoran, there lived a young Summoner named Lily. She had a deep fascination with the champions and their unique abilities. She would often watch their battles and dream of one day becoming a skilled Summoner herself.\n' +
    //     '\n' +
    //     'One day, Lily received an invitation to attend the prestigious League of Legends tournament in Valoran. She was overjoyed and immediately set out on her journey. Upon arriving, she was mesmerized by the grandeur of the arena and the cheering crowds.\n' +
    //     '\n' +
    //     'As the tournament began, Lily was excited to see her favorite champion, Vayne, in action. Vayne was known for her exceptional marksmanship and swift agility. However, during the match, Vayne was injured and couldn\'t continue the battle.\n' +
    //     '\n' +
    //     'Feeling disheartened, Lily knew that the team needed a miracle to win. Suddenly, a new champion appeared in the arena, wielding a massive sword and donning armor made of obsidian. It was none other than the legendary warrior, Jarvan IV.\n' +
    //     '\n' +
    //     'With his incredible strength and unwavering courage, Jarvan IV led the team to victory, impressing Lily and the entire crowd. From that day on, Lily became a devoted fan of Jarvan IV and vowed to one day master the art of Summoning and become a great Summoner just like him.');
    const content = ref('');
    const wordList = reactive([]);
    const userAnswers = reactive([]);
    const init = ref(true)
    const realAnswers = reactive([]);
    const usedWords = ref(null)
    const showSpin = ref(false);
    const msg = useMessage();
    const notification = useNotification()
    async function load () {
      init.value = true
      let arr = []
      showSpin.value = true;
      await getBlankText(store.state.user.uid).then((res)=>{
        const success = res.state
        if (success) {
          // console.log(res)
          const lastTimes = res.last_times
          notification.create({
            content: lastTimes === 0?'这是最后一题啦，我先歇了=v=':'今天还能再出' + lastTimes + '道题-v-',
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,
          })
          // if (lastTimes === 0)
          //   msg.success('这是最后一题啦，我先歇了=v=')
          // else
          //   msg.success('今天还能再出' + lastTimes + '道题-v-')
          content.value = res.content
          wordList.splice(0);
          wordList.push(...res.wordList);
          realAnswers.splice(0);
          realAnswers.push(...res.answer);
          arr = [...res.originWords];
        }
        else {
          notification.create({
            content: res.last_times === 0?'明天再给你出题哇，累了捏QAQ':res.msg,
            avatar: () => h(NAvatar,{
              size: 'small',
              round: true,
              src: Kaleido,
            }),
            duration: 3e3,

          })
          // if (res.last_times === 0)
          //   msg.error('明天再给你出题哇，累了捏QAQ')
          // else
          //   msg.error(res.msg)
        }
      })
      // console.log(wordList.length);
      // console.log(realAnswers.length);
      // 随机打乱答案
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      usedWords.value = new Set(arr)
      showSpin.value = false;
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
      // const word = wordList[index];
      return realAnswers[index];
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

    // 导出文本
    function handleExportInput() {
      // 使用Blob对象和URL.createObjectURL()方法创建一个临时的URL，
      // 然后通过创建一个隐藏的<a>标签来触发下载。
      const fileName = "blank.txt";
      const contentType = "text/plain;charset=utf-8";
      const blob = new Blob([content.value], { type: contentType });
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
      inputs,
      handleExportInput,
      init,
      showSpin,
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
  height: 78vh;
  width: 73vh;
  text-align: left;
  /*background-color: red;*/
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
  width: 149vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  margin-right: 8vh;
}
.button {
  width: 200px;
}

.used-words-box {
  font-size: 20px;
  margin-left: 1vh;
  height: 78vh;
  width: 73vh;
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
  height: 98vh;
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

.text-card {
  position: relative;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: flex-end;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 150vh;
}

.export-box {
  width: 149vh;
}

.export-btn {
  margin-left: 62.5vh;
}
</style>
