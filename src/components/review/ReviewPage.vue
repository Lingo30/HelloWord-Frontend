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
            interval="2000"
          >
            <n-carousel-item :style="{ width: '60%' }">
              <div class="imgTitle">故事模式</div>
              <router-link to="/story"><img
                class="carousel-img"
                src="../../assets/img/story.jpg"
              ></router-link>
            </n-carousel-item>
            <n-carousel-item :style="{ width: '60%' }">
              <div class="imgTitle">单词复习</div>
              <router-link to="/blank"><img
                class="carousel-img"
                src="../../assets/img/review.jpeg"
              ></router-link>
            </n-carousel-item>
            <n-carousel-item :style="{ width: '60%'}">
              <div class="imgTitle">阅读写作</div>
              <router-link to="/writing"><img
                class="carousel-img"
                src="../../assets/img/write.jpeg"
              ></router-link>
            </n-carousel-item>
          </n-carousel>
          </div>
         
  
      </div>
  </div>

  
  
</template>


<script>
export default {
  name: "ReviewPage"
}
</script>

<style scoped>
  .class_table {
      position: absolute;
      width: 100%;
      top: 0%;
      bottom: 0%;
      left: 2.5%;
      /* background-color: rgba(38,164,116, 0.3); */
      /* opacity: 30%; */
      display: inline-flex;
  }
  .main_box{
      position: absolute;
      width: 80%;
      height: 80%;
      top: 10%;
      left: 8%;
      background-color: rgba(255, 255, 255, 0.5);
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

</style>