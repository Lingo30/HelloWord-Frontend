<template>
  <div class="s-layout__sidebar">
    <nav class="s-sidebar__nav">
      <ul>
        <li>
          <a @click="jump(1)" class="s-sidebar__nav-link" href="#0"> <!--路由 todo-->
            <br>
            <img v-show="index!==1" class = "a" src="../../assets/img/home.png" width="20" height="20">
            <img v-show="index===1" class = "a" src="../../assets/img/homeSelected.png" width="20" height="20">
          </a>
        </li>
        <li>
          <a @click="jump(2)" class="s-sidebar__nav-link" href="#1">
            <br>
            <img v-show="index!==2" class = "a" src="../../assets/img/notification.png" width="20" height="20">
            <img v-show="index===2" class = "a" src="../../assets/img/notificationSelected.png" width="20" height="20">
          </a>
        </li>
        <li>
          <a @click="jump(3)" class="s-sidebar__nav-link" href="#2">
            <br>
            <img v-show="index!==3" class="a" src="../../assets/img/chart.png" width="20" height="20">
            <img v-show="index===3" class="a" src="../../assets/img/chartSelected.png" width="20" height="20">
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      index: 1,
    }
  },
  methods: {
    jump: function (index) {
      this.index = index; //重要处
    },
  },
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
  background-color: rgba(255,255,255,0.5)/*选中时的颜色*/;
}

@media (min-width: 42em) {
  /* Sidebar */
  .s-sidebar__nav {
    width: 4em;
    left: 0;
  }
}

</style>
