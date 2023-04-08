<template>
  <nav class="s-sidebar__nav">
    <ul>
      <li>
        <router-link to="/user/learn" class="s-sidebar__nav-link">
          <br>
          <img v-if="router.currentRoute.value.name!=='learn'" class="a" src="../../assets/img/home.png" width="20"
               height="20">
          <img v-else class="a" src="../../assets/img/homeSelected.png" width="20" height="20">
        </router-link>
      </li>
      <li>
        <router-link to="/user/review" class="s-sidebar__nav-link">
          <br>
          <img v-if="router.currentRoute.value.name!=='review'" class="a" src="../../assets/img/notification.png"
               width="20" height="20">
          <img v-else class="a" src="../../assets/img/notificationSelected.png" width="20" height="20">
        </router-link>
      </li>
      <li>
        <router-link to="/user/wordlist" class="s-sidebar__nav-link">
          <br>
          <img v-if="router.currentRoute.value.name!=='wordlist'" class="a" src="../../assets/img/wordlist.png"
               width="20" height="20">
          <img v-else class="a" src="../../assets/img/wordlistSelected.png" width="20" height="20">
        </router-link>
      </li>
      <li>
        <router-link to="/user/talk" class="s-sidebar__nav-link">
          <br>
          <img v-if="router.currentRoute.value.name!=='talk'" class="a" src="../../assets/img/talk.png" width="20"
               height="20">
          <img v-else class="a" src="../../assets/img/talkSelected.png" width="20" height="20">
        </router-link>
      </li>
      <li>
        <router-link to="/user/statistic" class="s-sidebar__nav-link">
          <br>
          <img v-if="router.currentRoute.value.name!=='statistic'" src="../../assets/img/chart.png" width="20"
               height="20">
          <img v-else class="a" src="../../assets/img/chartSelected.png" width="20" height="20">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "SideBar",
  setup() {
    const router = useRouter();

    return {
      router
    }
  }
}
</script>

<style scoped>
.s-sidebar__nav {
  position: fixed;
  top: 0;
  overflow: hidden;
  transition: all .3s ease-in;
  width: 4em;
  height: 100%;
  background: #26A474;
  color: rgba(255, 255, 255, 0.7);
}

.s-sidebar__nav ul {
  position: absolute;
  top: 2em;
  margin: 0;
  padding: 0;
  width: 8em;
}

.s-sidebar__nav ul li {
  width: 50%;
}

br {
  display: block; /* makes it have a width */
  content: ""; /* clears default height */
  margin-top: 20px; /* todo 调整br大小 将图片居中 */
}

.s-sidebar__nav-link {
  position: relative;
  display: inline-block;
  width: 80%;
  height: 4em;
}

.s-sidebar__nav-link:hover {
  background-color: rgba(255, 255, 255, 0.5) /*选中时的颜色*/;
}

@media (min-width: 42em) {
  /* Sidebar */
  .s-sidebar__nav {
    width: 4em;
    left: 0;
  }
}

</style>
