<template>
    <div 
        style="
        margin-top: 20px;
        margin-bottom: 40px;
        margin-right: 70px;
        margin-left: 250px;
        "
    >
        <!-- 侧边栏 -->
        <!-- <sidebar v-on:listenToChild="ChildToParent"></sidebar> -->
        <!-- 页首 -->
        
        <!-- content -->
        <div class="class_table">
            <div class="word_box"> 
                <div class="word_search">
                    <div class="search">
                        <n-input
                        v-model:value="value" 
                        type="text"
                        placeholder="您需要查询的单词" 
                        style="border-radius: 15px;"
                    />
                    </div>
                    <div class="button">
                        <n-button type="primary" style="border-radius: 10px;">
                            查找
                        </n-button>
                    </div>
                </div>
                <div class="word_card">
                    <n-carousel
                        effect="card"
                        prev-slide-style="transform: translateX(-120%) translateZ(-200px);"
                        next-slide-style="transform: translateX(20%) translateZ(-200px);"
                        :show-dots="false"
                        :autoplay="false"
                    >
                    <n-carousel-item :style="{ width: '50%' }">
                        <div class="word">
                            <div class="word_name">
                                dangerous
                            </div>
                            <div class="word_meaning_box">
                                <div class="word_reading">
                                    音标：['dendʒərəs]
                                </div>
                                <div class="word_meaning">
                                    释义：危险的
                                </div>
                                <n-button strong secondary circle 
                                type="error" class="like">
                                    <n-icon>
                                        <!-- <path d="../assets/image/like.png"/> -->
                                        <img src="../assets/image/like.png" class="like_pic">
                                    </n-icon>
                                </n-button>
                            </div>
                            
                        </div>
                    </n-carousel-item>
                    <n-carousel-item :style="{ width: '50%' }">
                        <img
                            class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
                        >
                    </n-carousel-item>
                    <n-carousel-item :style="{ width: '50%' }">
                        <img
                            class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
                        >
                    </n-carousel-item>
                    <n-carousel-item :style="{ width: '50%' }">
                        <img
                            class="carousel-img"
                            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
                        >
                    </n-carousel-item>
                    </n-carousel>
                </div>
        </div>
            <div class="info_card">
                <n-card :bordered="false" class="info_card1">
                    <div class="info_box">
                        <div class="info_title">
                            同义词
                        </div>
                        <div class="info_content">
                            <div class="info_word1">
                                <div class="related_word">
                                    unsafe
                                </div>
                                <div class="read">
                                    adj.
                                </div>
                            </div>
                            <div class="info_word2">
                                <div class="related_word">
                                    risky
                                </div>
                                <div class="read">
                                    adj.
                                </div>
                            </div>
                            <div class="info_word3">
                                <div class="related_word">
                                    hazard
                                </div>
                                <div class="read">
                                    n.
                                </div>
                            </div>
                        </div>
                    </div>
                </n-card>
                <n-card :bordered="false" class="info_card2">
                    <div class="info_box">
                        <div class="info_title">
                            反义词
                        </div>
                        <div class="info_content">
                            <div class="info_word1">
                                <div class="related_word">
                                    safe
                                </div>
                                <div class="read">
                                    adj.
                                </div>
                            </div>
                            <div class="info_word2">
                                <div class="related_word">
                                    secure
                                </div>
                                <div class="read">
                                    adj.
                                </div>
                            </div>
                            <div class="info_word3">
                                <!-- <div class="related_word">
                                    hazard
                                </div>
                                <div class="read">
                                    n.
                                </div> -->
                            </div>
                        </div>
                    </div>
                </n-card>
                <n-card :bordered="false" class="info_card3">
                    <div class="info_box">
                        <div class="info_title">
                            例句
                        </div>
                        <div class="info_content">
                            He is considered armed and dangerous.
                        </div>
                    </div>
                </n-card>
            </div>
        </div>
    </div>
  
    
    
  </template>
  

<script lang="ts">
  import { defineComponent, computed, ref } from "vue";
  import { CourseService } from "../api/api";

  export default defineComponent({

    methods: {
      //点击开始体验按钮跳转
      goBegin() {
        localStorage.clear();
        this.$router.push({
          name: "welcome",
        });
      },

      
    },
  });
</script>
  
<style>
    .class_table {
        position: absolute;
        width: 100%;
        top: 0%;
        bottom: 0%;
        left: 10%;
        background-color: rgba(38,164,116, 0.3);
        /* opacity: 30%; */
        display: inline-flex;
    }
    .word_box {
        position: relative;
        margin-left: 3%;
        width: 50%;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
    }
    .word_search {
        margin-top: 12%;
        top: 10%;
        height: 5%;
        /* background-color: blue; */
        display: flex;
    }
    .search {
        margin-left: 10%;
        width: 75%;
        /* background-color: black; */
        overflow: hidden;
    }
    .button {
        width: 10%;
        margin-left: 1%;
        /* background-color: wheat; */
        overflow: hidden;
    }

    
    .word_card {
        /* position: relative; */
        /* margin-left: 3%; */
        margin-top: 5%;
        width: 100%;
        top: 15%;
        height: 70%;
        opacity: 90%;
        /* background-color: rgba(38,164,116, 0.3); */
    }
    .carousel-img {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .word {
        height: 100%;
        background-image: url(https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg);
        display: flex;
        flex-direction: column;
    }
    .word_name {
        /* background-color: white; */
        margin-top: 20%;
        margin-left: 15%;
        margin-right: 15%;
        height: 10%;
        background-color: rgba(255, 255, 255, 0.6);
        text-align: center;
        font-size: 40px;
        /* border-radius: 50px; */
    }
    .word_meaning_box {
        margin-top: 15%;
        margin-left: 8%;
        margin-right: 8%;
        height: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        text-align: center;
        font-size: 25px;
        display: flex;
        flex-direction: column;
    }
    .word_reading {
        margin-top: 20%;
        height: 20%;
        /* background-color: #679B9B; */
    }
    .word_meaning {
        margin-top: 10%;
        height: 20%;
        /* background-color: #679B9B; */
    }
    .like {
        margin-top: 5%;
        margin-left: 45%;
        /* background-image: url(../assets/image/like.png); */
    }
    .like_pic {
        /* height: 30px;
        width: 30px; */
        padding: 0%;
    }

    .info_card {
        position: relative;
        top: 15%;
        width: 30%;
        margin-left: 5%;
        height: 70%;
        opacity: 90%;
        background-color: #679B9B;
        display: vertical;
        border-radius: 20px;
        /* flex-wrap: wrap;
        align-content: space-between; */
    }
    .info_card1 {
        margin-top: 5%;
        width: 90%;
        left: 5%;
        height: 25%;
        border-radius: 10px;
        background-color: rgba(38,164,116, 0.8);
        border-width: 0px;
        display: vertical;
    }
    .info_card2 {
        margin-top: 5%;
        width: 90%;
        left: 5%;
        height: 25%;
        border-radius: 10px;
        background-color: rgba(129,227,131, 0.8);
        display: vertical;
    }
    .info_card3 {
        margin-top: 5%;
        width: 90%;
        left: 5%;
        height: 35%;
        border-radius: 10px;
        background-color: rgba(129,227,185, 0.8);
        border-color: rgba(129,227,185, 0.8);
        display: vertical;
    }
    .info_box {
        position: absolute;
        top: 3%;
        left: 5%;
        right: 5%;
        height: 94%;
        /* background-color: royalblue; */
        display: vertical;
        display: flexbox;
    }

    .info_title {
        height: 25%;
        overflow: hidden;
        font-size: x-large;
        font-weight: 800;
        color: white;
        /* background-color: blueviolet; */
    }

    .info_content {
        height: 75%;
        overflow: hidden;
        font-size: medium;
        color: white;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, BlinkMacSystemFont
        , 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans'
        , 'Helvetica Neue', sans-serif;
        font-weight: 500;
        /* background-color: aliceblue; */
    }

    .info_word1 {
        margin-top: 0%;
        height: 25%;
        display: flex;
        /* background-color: blue; */
    }

    .info_word2 {
        /* padding-top: 5%; */
        margin-top: 2%;
        height: 25%;
        display: flex;
        /* background-color: blue; */
    }

    .info_word3 {
        /* padding-top: 5%; */
        margin-top: 2%;
        height: 25%;
        display: flex;
        /* background-color: blue; */
    }

    .related_word {
        font-size: large;
        width: 40%;
    }
    .read {
        font-size: medium;
        font-style: italic, oblique;
    }

    .n-card {
        overflow: hidden;
    }
  
  </style>