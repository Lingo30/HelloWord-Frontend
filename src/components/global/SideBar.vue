<template>
  <nav class="s-sidebar__nav">
    <ul>
      <li>
        <n-dropdown trigger="hover" :options="options" size="huge" @select="handleSelect">
          <div :style="wordCardBackground" style="width: 6vh; height: 6vh;background-size: 100% 100%; left: 50%; transform: translate(40%,0)"></div>
        </n-dropdown>
      </li>
      <li>
        <router-link labelTooltip="单词背诵"  to="/user/learn" class="s-sidebar__nav-link">
          <div class="box">
            <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="School"
                    :depth="router.currentRoute.value.name!=='learn'?3:1" color="#ffffff"/>
          </div>
        </router-link>
      </li>
      <li>
        <router-link labelTooltip="单词复习" to="/user/review" class="s-sidebar__nav-link">
          <div class="box">
            <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="Notifications"
                    :depth="router.currentRoute.value.name!=='review'?3:1" color="#ffffff"/>
          </div>
        </router-link>
      </li>
      <li>
        <router-link labelTooltip="单词表" to="/user/wordlist" class="s-sidebar__nav-link">
          <div class="box">
            <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="Book"
                    :depth="router.currentRoute.value.name!=='wordlist'?3:1" color="#ffffff"/>
          </div>
        </router-link>
      </li>
      <li>
        <router-link labelTooltip="智能对话" to="/user/chat" class="s-sidebar__nav-link">
          <div class="box">
            <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="Chatbubble"
                    :depth="router.currentRoute.value.name!=='chat'?3:1" color="#ffffff"/>
          </div>
        </router-link>
      </li>
      <li>
        <router-link labelTooltip="数据统计" to="/user/statistic" class="s-sidebar__nav-link">
          <div class="box">
            <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="BarChart"
                    :depth="router.currentRoute.value.name!=='help'?3:1" color="#ffffff"/>
          </div>
        </router-link>
      </li>
      <li>
        <router-link labelTooltip="产品介绍" to="/user/help" class="s-sidebar__nav-link">
          <div class="box">
            <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="HelpCircle"
                    :depth="router.currentRoute.value.name!=='help'?3:1" color="#ffffff"/>
          </div>
        </router-link>
      </li>
    </ul>
    <!--    底部用户个人信息页面跳转-->
    <div style="bottom: 18%" class="bottom-button ">
      <div labelTooltip="通知公告" class="s-sidebar__nav-link">
        <div class="box" @click="notificationRef.showMessages">
          <Notification ref="notificationRef"/>
        </div>
      </div>
    </div>
    <div class="bottom-button">
      <router-link labelTooltip="我的信息" to="/user/info" class="s-sidebar__nav-link">
        <div class="box">
          <n-icon style="top:50%; transform:translate(0,-50%);" size="4vh" :component="Person"
                  :depth="router.currentRoute.value.name!=='info'?3:1" color="#ffffff"/>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
import {useRouter} from "vue-router";
import {Person, Chatbubble, BarChart, Book, Notifications, School, HelpCircle} from "@vicons/ionicons5"
import {h, ref} from "vue";
import Notification from "@/components/global/Notification.vue";
import {NIcon, NDropdown, NButton, useMessage, NAvatar} from 'naive-ui'
import Kaleido from "@/assets/img/kaleidoBlank.jpg";

export default {
  name: "SideBar",
  components: {
    Notification,
    NIcon,
    NDropdown,
    NButton,
  },
  data() {
    return {
      wordCardBackground: {
        backgroundImage: 'url(' + require('../../assets/img/kaleidoBlank.jpg') + ')',
      },
      custom: ref(0),
    }
  },
  setup() {
    const router = useRouter();
    const message = useMessage();
    let notificationRef = ref(null)

    return {
      Person,
      Chatbubble,
      BarChart,
      Kaleido,
      Book,
      Notifications,
      School,
      HelpCircle,
      router,
      notificationRef,
      options: [
        {
          label: () => h(
              NAvatar,
              {
                src: Kaleido,
                size: "large",
                style: "top:50%; transform:translate(0,-50%)"
              },
          ),
          key: "green"
        },
        {
          label: () => h(
              NAvatar,
              {
                src: 'https://img.js.design/assets/img/62cfbf2ac7415e7de064bef5.png',
                size: "large",
                style: "top:50%; transform:translate(0,-50%)"
              },
          ),
          key: "blue"
        },
        {
        label: () => h(
              NAvatar,
              {
                src: 'https://img.js.design/assets/img/62cfbf28edcf38c72cdb5cab.png',
                size: "large",
                style: "top:50%; transform:translate(0,-50%)"
              },
          ),
          key: "pink"
        },
        {
          label: () => h(
              NAvatar,
              {
                src: 'https://img.js.design/assets/img/62cfbf2b4fd2dffdcb34a35c.png',
                size: "large",
                style: "top:50%; transform:translate(0,-50%)"
              },
          ),
          key: "purple"
        },
      ],
      handleSelect(key) {
        message.info(String(key)); // todo 处理选了哪个
      }
    }
  }
}

</script>

<style scoped>
.s-sidebar__nav {
  position: fixed;
  transition: all .3s ease-in;
  height: 100%;
  background: #26A474;
  width: 5%;
  left: 0;
  color: rgba(255, 255, 255, 0.7);
}

.s-sidebar__nav ul {
  position: absolute;
  padding: 0;
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 30%;
}

.s-sidebar__nav ul li {
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
  margin: auto;
}


.s-sidebar__nav-link {
  position: relative;
  display: inline-block;
  width: 80%;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 100%;

}

.s-sidebar__nav-link:hover {
  background-color: rgba(255, 255, 255, 0.5) /*选中时的颜色*/;
}

.box {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.bottom-button {
  /*background-color: black;*/
  position: absolute;
  bottom: 10%;
  height: 8%;
  width: 100%;
}

.s-sidebar__nav-link:hover:after {
  position: absolute;
  left: 15px;
  top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  color: #fff;
  content: attr(labelTooltip);
  z-index: -1;
  display: inline;
  width: 120px;
}
</style>
