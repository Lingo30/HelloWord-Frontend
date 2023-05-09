<template>
  <div>
    <!-- 侧边栏 -->
    <!-- <sidebar v-on:listenToChild="ChildToParent"></sidebar> -->
    <!-- 页首 -->

    <!-- content -->
    <div class="class_table">
      <div class="main_box">
        <n-carousel
            :show-dots="true"
            effect="card"
            prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
            next-slide-style="transform: translateX(50%) translateZ(-800px);"

            autoplay
            interval="200000"
        >
          <n-carousel-item :style="{ width: '60%' }">
            <div class="imgTitle">
              <div class="prompt-div">
                故事模式
                <router-link :to="{name:'help',query:{idxs:[2,5]}}">
                  <n-icon size="2vh" :component="HelpCircleOutline" color="black" class="prompt-icon"/>
                </router-link>
              </div>
            </div>
            <router-link to="/user/story"><img
                class="carousel-img"
                src="../../assets/img/story.jpg"
            ></router-link>
          </n-carousel-item>
          <n-carousel-item :style="{ width: '60%' }">
            <div class="imgTitle">
              <div class="prompt-div">
                单词复习
                <router-link :to="{name:'help',query:{idxs:[2,6]}}">
                  <n-icon size="2vh" :component="HelpCircleOutline" color="black" class="prompt-icon"/>
                </router-link>
              </div>
            </div>
            <router-link to="/user/blank"><img
                class="carousel-img"
                src="../../assets/img/review.jpeg"
            ></router-link>
          </n-carousel-item>
          <n-carousel-item :style="{ width: '60%'}">
            <div class="imgTitle">
              <div class="prompt-div">
                阅读写作
                <router-link :to="{name:'help',query:{idxs:[2,7]}}">
                  <n-icon size="2vh" :component="HelpCircleOutline" color="black" class="prompt-icon"/>
                </router-link>
              </div>
            </div>
            <router-link to="/user/writing"><img
                class="carousel-img"
                src="../../assets/img/write.jpg"
            ></router-link>
          </n-carousel-item>
        </n-carousel>
      </div>


    </div>
  </div>


</template>


<script>
import {NCarousel, NCarouselItem, NIcon} from "naive-ui";
import {HelpCircleOutline} from "@vicons/ionicons5";

export default {
  name: "ReviewPage",
  components: {
    NCarousel,
    NCarouselItem,
    NIcon
  },
  setup() {
    return {
      HelpCircleOutline,
    }
  }
}
</script>

<style scoped>
.class_table {
  position: absolute;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 10px 12px 16px 10px rgba(0, 0, 0, 0.24), 10px 17px 50px 10px #4E655D;
}

.main_box {
  position: absolute;
  width: 90%;
  height: 80%;
  border-radius: 30px;
}

.carousel-img {
  /* margin: 0 auto; */
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
  position: relative;
  margin-top: 3%;
  margin-left: 0%;
  /* top: 10%; */
  width: 90%;
  height: 70%;
  object-fit: cover;
  border-radius: 20px;
}

.imgTitle {
  position: relative;
  margin-top: 8%;
  /* margin-left: 5%; */
  font-size: 55px;
  line-height: 25px;
  font-family: YouSheBiaoTiYuan;
}

.n-card {
  overflow: hidden;
  /* padding: 0%; */
}

.prompt-div {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.prompt-icon {
  position: relative;
  top: -40px;
  right: -5px;
}
</style>
