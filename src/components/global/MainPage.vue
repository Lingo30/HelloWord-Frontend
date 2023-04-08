<template>
  <SideBar/>
  <router-view/>
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

</style>