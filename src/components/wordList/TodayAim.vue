<template>
  <n-space class="container">
    <div class="prompt-div">
      <span style="font-weight: bold;width:10vw; margin-right: 3vw;margin-left: 10vw">今天的小目标</span>

      <router-link :to="{name:'help',query:{idxs:[2,4]}}">
        <n-icon size="2vh" :component="HelpCircleOutline" color="black" class="prompt-icon"/>
      </router-link>
    </div>
    <n-slider @mousedown="pressFlag=true" v-model:value="target" :step="1" :marks="mark" :max="300" keyboard
              style="width: 50vw">
      <template #thumb>
        <n-icon-wrapper :size="24" :border-radius="12">
          <n-icon :size="18" :component="Accessibility"/>
        </n-icon-wrapper>
      </template>
    </n-slider>
  </n-space>
</template>

<script>
import {onBeforeMount, reactive, ref} from "vue";
import {Accessibility, HelpCircleOutline} from "@vicons/ionicons5";
import {getAim, getLearnedWords, setAim} from "@/request/api/wordlist";
import {useMessage} from 'naive-ui'
import store from "@/store";

export default {
  name: "TodayAim",
  setup() {
    const message = useMessage()
    const target = ref(0);
    let oldNum = 0
    const mark = reactive({});
    const pressFlag = ref(false)//是否在拖动进度条
    // mark.value[0] = '当前进度:' + 0

    //添加鼠标抬起监听，更改每日背诵单词数
    document.addEventListener('mouseup', () => {
      if (pressFlag.value) {
        pressFlag.value = false
        //进行更新
        update()
      }
    })

    async function load() {
      let success = false
      let errMsg = ''
      getLearnedWords(store.state.user.uid).then((res) => {
        if (res.state) {
          mark[res.sum] = '当前进度：' + res.sum
        }
        success = res.state
        errMsg = res.msg
      }).catch(err => errMsg = '网络错误').finally(() => {
        // if (!success) {
        //   message.error(errMsg)
        // }
      })

      target.value = store.state.user.wordNum
      oldNum = target.value
      // 直接从本地获取
      // getAim(store.state.user.uid).then((res) => {
      //   target.value = res.target
      // })
    }

    onBeforeMount(() => {
      load();
    })

    //更新每日背诵单词数
    async function update() {
      let success = false
      let errMsg = ''
      await setAim(store.state.user.uid, target.value).then((res) => {
        success = res.state
        if (res.state) {
          store.state.user.wordNum = target.value
          oldNum = target.value
          message.success('修改成功')
        } else {
          errMsg = res.msg
          target.value = oldNum
        }
      }).catch(err => errMsg = '网络错误')
      if (!success) {
        message.error(errMsg)
      }
    }

    return {
      mark,
      pressFlag,
      Accessibility,
      HelpCircleOutline,
      target
    };
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: 80vw;
  /*background-color: red;*/
}

.prompt-div {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.prompt-icon {
  position: absolute;
  top: -6px;
  right: 56px;
}
</style>
