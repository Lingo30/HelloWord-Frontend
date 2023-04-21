<template>
  <nav class="s-sidebar__nav">
    <ul>
      <li>
        <router-link to="/user/learn" class="s-sidebar__nav-link">
          <br>
          <n-icon size="25" :component="School" :depth="router.currentRoute.value.name!=='learn'?3:1" color="#ffffff"/>
<!--          <br>-->
<!--          <img v-if="router.currentRoute.value.name!=='learn'" class="a" src="../../assets/img/home.png" width="20"-->
<!--               height="20">-->
<!--          <img v-else class="a" src="../../assets/img/homeSelected.png" width="20" height="20">-->
        </router-link>
      </li>
      <li>
        <router-link to="/user/review" class="s-sidebar__nav-link">
          <br>
          <n-icon size="25" :component="Notifications" :depth="router.currentRoute.value.name!=='review'?3:1" color="#ffffff"/>
<!--          <br>-->
<!--          <img v-if="router.currentRoute.value.name!=='review'" class="a" src="../../assets/img/notification.png"-->
<!--               width="20" height="20">-->
<!--          <img v-else class="a" src="../../assets/img/notificationSelected.png" width="20" height="20">-->
        </router-link>
      </li>
      <li>
        <router-link to="/user/wordlist" class="s-sidebar__nav-link">
          <br>
          <n-icon size="25" :component="Book" :depth="router.currentRoute.value.name!=='wordlist'?3:1" color="#ffffff"/>
<!--          <br>-->
<!--          <img v-if="router.currentRoute.value.name!=='wordlist'" class="a" src="../../assets/img/wordlist.png"-->
<!--               width="20" height="20">-->
<!--          <img v-else class="a" src="../../assets/img/wordlistSelected.png" width="20" height="20">-->
        </router-link>
      </li>
      <li>
        <router-link to="/user/chat" class="s-sidebar__nav-link">
          <br>
          <n-icon size="25" :component="Chatbubble" :depth="router.currentRoute.value.name!=='chat'?3:1" color="#ffffff"/>
<!--          <br>-->
<!--          <img v-if="router.currentRoute.value.name!=='chat'" class="a" src="../../assets/img/talk.png" width="20"-->
<!--               height="20">-->
<!--          <img v-else class="a" src="../../assets/img/talkSelected.png" width="20" height="20">-->
        </router-link>
      </li>
      <li>
        <router-link to="/user/help" class="s-sidebar__nav-link">
          <br>
          <n-icon size="25" :component="HelpCircle" :depth="router.currentRoute.value.name!=='help'?3:1" color="#ffffff"/>
<!--          <br>-->
<!--          <img v-if="router.currentRoute.value.name!=='statistic'" src="../../assets/img/chart.png" width="20"-->
<!--               height="20">-->
<!--          <img v-else class="a" src="../../assets/img/chartSelected.png" width="20" height="20">-->
        </router-link>
      </li>
    </ul>
    <!--    底部用户个人信息页面跳转-->
    <div class="bottom-button">
      <router-link to="/user/info" class="s-sidebar__nav-link">
        <br>
        <n-icon size="25" :component="Person" :depth="router.currentRoute.value.name!=='info'?3:1" color="#ffffff"/>
      </router-link>
    </div>
  </nav>
</template>

<script>
import {useRouter} from "vue-router";
import {Person, Chatbubble,BarChart,Book,Notifications,School,HelpCircle} from "@vicons/ionicons5"
import {NIcon} from 'naive-ui'

export default {
  name: "SideBar",
  components: {
    NIcon,
  },
  setup() {
    const router = useRouter();

    return {
      Person,
      Chatbubble,
      BarChart,
      Book,
      Notifications,
      School,
      HelpCircle,
      router,
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

.bottom-button {
  /*background-color: black;*/
  position: absolute;
  bottom: 2em;
  margin: 0;
  padding: 0;
  width: 4em;
}

</style>
