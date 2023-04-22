<template>
  <n-space class="container">
    <div class="prompt-div">
      <span style="font-weight: bold;width:20vh; margin-right: 10vh;margin-left: 25vh">今天的小目标</span>

      <router-link :to="{name:'help',query:{idxs:[2,4]}}">
        <n-icon size="2vh" :component="HelpCircleOutline" color="black" class="prompt-icon"/>
      </router-link>
    </div>
    <n-slider @mousedown="pressFlag=true" v-model:value="target" :step="1" :marks="mark" :max="300" keyboard
              style="width: 80vh">
      <template #thumb>
        <n-icon-wrapper :size="24" :border-radius="12">
          <n-icon :size="18" :component="Accessibility"/>
        </n-icon-wrapper>
      </template>
    </n-slider>
  </n-space>
</template>

<script>
import {onBeforeMount, ref} from "vue";
import {Accessibility, HelpCircleOutline} from "@vicons/ionicons5";
import {getAim, getLearnedWords, setAim} from "@/request/api/wordlist";
import store from "@/store";

export default {
  name: "TodayAim",
  setup() {
    const target = ref(0);
    const mark = ref({});
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
      getLearnedWords(store.state.user.uid).then((res) => {
        const sum = res.sum
        mark.value[sum] = '当前进度：' + res.sum
      })
      getAim(store.state.user.uid).then((res) => {
        target.value = res.target
      })
    }

    onBeforeMount(() => {
      load();
    })

    //更新每日背诵单词数
    function update() {
      // console.log(target.value);
      setAim(store.state.user.uid, target.value);
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
  width: 150vh;
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
