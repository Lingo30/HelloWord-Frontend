<template>
  <div class="bodywelcome">
    <div>
      <!-- 页面顶部 -->
      <div class="welcome_top">
        <div class="py-5 px-20 shadow-xl">
          <div class="welcome_top_wrap flex">
            <div class="textTitle">
              Hello Word
            </div>
            <div class="flex">
              <div
                class="
                  welcome_btn
                  btn_login
                  w-32
                  h-10
                  rounded-2xl
                  border-2 border-blue-500
                  mx-2
                "
                @click="goLogin"
              >
                <div>登录/注册</div>
              </div>
              <!-- <div
                class="
                  welcome_btn
                  btn_login
                  w-32
                  h-10
                  rounded-2xl
                  border-2 border-blue-500
                  mx-2
                "
                @click="goRegister"
              >
                <div>注册</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      
      <!-- 页面主体 -->
      <div class="mt-20 px-12 pt-20">
        <div class="welcome_main_wrap flex">
          <!-- 图片 -->
          <div class="welcome_img w-1/2 mr-20 animated fadeInLeft">
            <img style="margin-left: 8%; margin-top: 5%;" src="../assets/img/3.png" alt="" />
          </div>
          <!-- 简介 -->
          <div class="welcome_content w-1/2 rounded-2xl card_content_wrap">
            <div class="bg-blue-50 rounded-2xl shadow-2xl py-4 px-14">
              <!-- 标题 -->
              <div class="content_title animated fadeIn mb-12 mt-4">
                Hello Word
              </div>
              <!-- 副标题 -->
              <div class="">
                <div
                  class="
                    mb-10
                    rounded-3xl
                    content_secondtitle
                    animated
                    fadeInDown
                  "
                >
                  <div>欢迎来到Hello Word</div>
                  <div>一款私人定制的英语学习平台</div>
                </div>
                <!-- 按钮 -->
                <div class="bg_btn_warp flex animated fadeIn">
                  <div
                    class="
                      mt-4
                      mb-10
                      bg-blue-500
                      flex
                      bg_btn_plus
                      h-20
                      w-40
                      rounded-2xl
                      shadow-xl
                    "
                    @click="goLogin"
                  >
                    <div>开始体验</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 功能1 -->
      <div class="px-20 pt-20">
        <div class="wrap flex">
          <!-- 简介 -->
          <div class="welcome_content w-1/2 rounded-2xl card_content_wrap">
            <div class="bg-blue-50 p-10 rounded-2xl shadow-2xl card_content">
              <div class="card_title">海量单词 任你挑选</div>
              <div class="mt-10 rounded-3xl func_content">
                <div>同义词、反义词、例句面面俱到</div>
                <div>快来打造你的专属单词书</div>
              </div>
            </div>
          </div>
          <!-- 图片 -->
          <div class="welcome_img w-1/2 ml-20">
            <img src="../assets/img/单词1.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 功能2 -->
      <div class="px-20 pt-20">
        <div class="wrap flex">
          <!-- 图片 -->
          <div class="welcome_img w-1/2 mr-20">
            <img style="margin-left: 5%;" src="../assets/img/写作1.jpg" alt="" />
          </div>
          <!-- 简介 -->
          <div class="welcome_content w-1/2 rounded-2xl card_content_wrap">
            <div class="bg-blue-50 p-10 rounded-2xl shadow-2xl card_content">
              <div class="card_title">阅读写作 不再烦恼</div>
              <div class="mt-10 rounded-3xl func_content">
                <div>阅读理解、写作分析</div>
                <div>为您的英语学习保驾护航</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 功能3 -->
      <div class="px-20 pt-20">
        <div class="wrap flex">
          <!-- 简介 -->
          <div class="welcome_content w-1/2 rounded-2xl card_content_wrap">
            <div class="bg-blue-50 p-10 rounded-2xl shadow-2xl card_content">
              <div class="card_title">口语交流 畅所欲言</div>
              <div class="mt-10 rounded-3xl func_content">
                <div>智慧助手、趣味交流</div>
                <div>带您沉浸式体验英语学习</div>
              </div>
            </div>
          </div>
          <!-- 图片 -->
          <div class="welcome_img w-1/2 ml-20">
            <img src="../assets/img/聊天1.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="mt-20 pt-20">
        <div class="flex flex-col">
          <div class="card_content_wrap bg-gray-100 end_content_bg">
            <div class="">
              <div class="card_content_wrap flex-col">
                <div class="end_text1 mt-4">欢迎加入</div>
                <div class="end_text">Hello Word</div>
                <div class="end_second_text my-3">
                  注册仅需一步，快来开启你的英语学习之旅吧
                </div>
                <div class="bg_btn_warp flex">
                  <div
                    class="
                      mb-10
                      mt-5
                      bg-blue-500
                      flex
                      bg_btn
                      h-16
                      w-36
                      rounded-2xl
                      shadow-xl
                    "
                    @click="goLogin"
                  >
                    <div>立即开始</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card_content_wrap">
            <div class="end_img">
              <img src="../assets/img/3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
    name: "Welcome",
    methods: {
      goLogin() {
        router.push({name:'login'})
      },
    },
    created() {

    }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.bodywelcome {
  background-color: white;
  line-height: 50px;
}
.textTitle {
  font-size: 60px;
  line-height: 35px;
  /* font-family: YouSheBiaoTiHei; */
  font-weight: 700;
}
.welcome_top {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 999;
  /* opacity: 50%; */
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
}
.welcome_top_wrap {
  justify-content: space-between;
}
/* .welcome_main{
background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(232,242,244,1) 86%, rgba(223,231,236,1) 100%);

} */
.welcome_img {
}
.content_title {
  font-size: 80px;
  line-height: 80px;
  /* font-family: YouSheBiaoTiHei; */
  font-weight: 500;
}
.card_title {
  font-size: 60px;
  line-height: 65px;
  /* font-family: YouSheBiaoTiHei; */
  font-weight: 500;
}
.content_secondtitle {
  font-size: 26px;

  font-family: GSC-Extended-Heavy;
  color: rgb(70, 70, 70);
}
.bg_btn_warp {
  justify-content: center;
}
.welcome_btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg_btn {
  align-items: center;
  justify-content: center;
  /* font-family: YouSheBiaoTiYuan; */
  font-size: 26px;
  color: white;
  transition: all 0.5s;
  /* font-weight: 500; */
}

.bg_btn:hover {
  transform: translateY(-8px);
  font-size: 30px;
  cursor: pointer;
  background-color: #2163ba;
}
.bg_btn_plus {
  align-items: center;
  justify-content: center;
  /* font-family: YouSheBiaoTiYuan; */
  font-size: 34px;
  color: white;
  transition: all 0.4s;
}
.bg_btn_plus:hover {
  transform: translateY(-14px);
  font-size: 38px;
  cursor: pointer;
  background-color: #2163ba;
}
.btn_login {
  /* font-family: YouSheBiaoTiHei; */
  /* font-family: YouSheBiaoTiYuan; */
  font-size: 22px;
  color: rgba(59, 130, 246);
  background-color: white;
  transition: all 0.25s;
  /* font-weight: 500; */
}
.btn_login:hover {
  cursor: pointer;
  background-color: rgb(197, 223, 253);
}
.card_content_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.func_content {
  font-size: 24px;
  line-height: 40px;
  font-family: GSC-Extended-Heavy;
  color: rgb(110, 110, 110);
  /* font-weight: 500; */
}
.card_content {
  transition: all 0.5s;
}
.card_content:hover {
  transform: translateY(-30px);
}
.end_img {
  width: 800px;
}
.end_text1 {
  font-size: 58px;
  line-height: 80px;
  font-weight: 600;
  font-family: GSC-Extended-Heavy;
}
.end_text {
  font-size: 64px;
  line-height: 80px;
  /* font-family: YouSheBiaoTiHei; */
}
.end_second_text {
  font-size: 30px;
  line-height: 70px;
  font-weight: 400;
  color: rgb(39, 112, 180);
}
.end_content_bg {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(240, 240, 240, 1) 25%,
    rgba(227, 227, 227, 1) 75%,
    rgba(196, 196, 196, 1) 100%
  );
}
</style>
