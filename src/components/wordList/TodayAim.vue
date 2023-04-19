<template>
  <n-space class="container">
    <span style="font-weight: bold;margin-right: 10vh;margin-left: 25vh">今天的小目标</span>
    <n-slider @update:value="onUpdate" v-model:value="target" :step="1" :marks="mark" :max="300" keyboard style="width: 80vh">
      <template #thumb>
        <n-icon-wrapper :size="24" :border-radius="12">
          <n-icon :size="18" :component="Accessibility" />
        </n-icon-wrapper>
      </template>
    </n-slider>
  </n-space>
</template>

<script>
import {onBeforeMount, ref} from "vue";
import {Accessibility} from "@vicons/ionicons5";
import {getAim, getLearnedWords, setAim} from "@/request/api/wordlist";
import store from "@/store";

export default {
  name: "TodayAim",
  setup() {
    const target = ref(0);
    const mark = ref({});
    // mark.value[0] = '当前进度:' + 0

    async function load() {
      getLearnedWords(store.state.user.uid).then((res)=>{
        const sum = res.sum
        mark.value[sum] = '当前进度：' + res.sum
      })
      getAim(store.state.user.uid).then((res)=>{
        target.value = res.target
      })
    }

    onBeforeMount(()=>{
      load();
    })

    function onUpdate() {
      // console.log(target.value);
      setAim(store.state.user.uid,target.value);
    }

    return {
      mark,
      onUpdate,
      Accessibility,
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
</style>