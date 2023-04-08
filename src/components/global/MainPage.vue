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

export default {
  name: "MainPage",
  components: {
    SideBar
  }
}
</script>

<style scoped>
.side-bar{
  /*height: 100vh;*/
}
.container{
  height: 100vh;
  overflow: hidden;
  background-color: #89AB9E;/*TODO 使用背景图片代替*/
}
</style>