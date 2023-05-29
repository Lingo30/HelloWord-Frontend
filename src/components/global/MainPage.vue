<template>
  <div class="side-bar">
    <SideBar/>
  </div>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import SideBar from "@/components/global/SideBar.vue";
import {ref} from "vue";
import store from "@/store";

export default {
  name: "MainPage",
  components: {
    SideBar
  },
  setup() {
    let custom = ref('#26A474')
    return {
      custom
    }
  },
    created() {
      if (store.state.user.custom === 1) {
        this.custom = 'rgba(188,224,231,0.95)';
      }
      if (store.state.user.custom === 2) {
        this.custom = 'rgba(213,173,194,0.95)';
      }
      if (store.state.user.custom === 3) {
        this.custom = 'rgba(199,184,222,0.95)';
      }
    }

}
</script>

<style scoped>
.side-bar{
  /*height: 100vh;*/
}
.container{
  margin-left: 50px;
  height: 100vh;
  overflow: hidden;
  background-color: v-bind(custom);/*TODO 使用背景图片代替*/
}
</style>
