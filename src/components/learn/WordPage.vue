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
                    <div class="search_button">
                        <n-button type="primary" style="border-radius: 10px;">
                            查找
                        </n-button>
                    </div>
                </div>
                <div class="word_card_box">
                    <n-card class="word_card shadow-lg">
                        <!-- <div class="word"> -->
                            <div class="word_name">
                                dangerous
                            </div>
                            <div class="word_meaning_box">
                                <div class="word_reading">
                                    音标：['dendʒərəs]
                                </div>
                                <div class="word_meaning">
                                    adj. 危险的
                                </div>
                                <router-link to="" class="delword" @click="">不再学习</router-link>
                            </div>
                            
                            <div class="word_button_box">
                                <n-button large strong primary round type="error" class="info_button1">
                                    不认识
                                </n-button>
                                <n-button  round type="success" class="info_button2">
                                    下一个
                                </n-button>
                            </div>
                            
                        <!-- </div> -->
                    </n-card>
                </div>
        </div>
            <div class="info_card shadow-lg">
                <n-card :bordered="false" class="info_card1 shadow-lg">
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
                <n-card :bordered="false" class="info_card2 shadow-lg">
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
                <n-card :bordered="false" class="info_card3 shadow-lg">
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
  

<script>
    export default {
    name: "WordPage"
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
    .word_box {
        position: relative;
        margin-left: 3%;
        width: 50%;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
    }
    .word_search {
        margin-top: 8%;
        top: 10%;
        height: 5%;
        /* background-color: blue; */
        display: flex;
        opacity: 65%;
    }
    .search {
        margin-left: 20%;
        width: 55%;
        /* background-color: black; */
        overflow: hidden;
    }
    .search_button {
        width: 10%;
        margin-left: 1%;
        /* background-color: wheat; */
        overflow: hidden;
    }

    
    .word_card_box {
        /* position: relative; */
        /* margin-left: 3%; */
        margin-top: 3%;
        width: 100%;
        top: 15%;
        height: 80%;
        opacity: 90%;
        /* background-color: rgba(38,164,116, 0.3); */
    }
    .word_card {
        height: 95%;
        width: 58%;
        left: 22%;
        background-image: url(https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg);
        /* background-color: rgba(38,164,116, 0.3); */
        display: flex;
        flex-direction: column;
        border-radius: 15px;
    }
    .carousel-img {
        margin: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .word {
        height: 100%;
        /* background-image: url(https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg); */
        display: flex;
        flex-direction: column;
        /* background-color: aqua; */
    }
    .word_name {
        /* background-color: white; */
        margin-top: 15%;
        margin-left: 15%;
        margin-right: 15%;
        height: 10%;
        background-color: rgba(255, 255, 255, 0.6);
        text-align: center;
        font-size: 40px;
        border-radius: 10px;
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
        border-radius: 10px;
    }
    .word_reading {
        margin-top: 20%;
        height: 20%;
        font-style: italic;
        /* background-color: #679B9B; */
    }
    .word_meaning {
        margin-top: 10%;
        height: 20%;
        font-style: italic;
        /* background-color: #679B9B; */
    }
    .delword {
        margin-top: 10%;
        top: 0%;
        /* height: 20%; */
        font-size: medium;
        color: rgba(0, 0, 0, 0.5);
        font-style: italic;
        /* opacity: 70%; */
        text-decoration: underline;
        /* background-color: #679B9B; */
    }
    .word_button_box {
        margin-top: 10%;
        margin-left: 5%;
        height: 10%;
        width: 90%;
        /* background-color: rgba(255, 255, 255, 0.6); */
        display: inline-flex;
        border-radius: 10px;
    }
    .info_button1 {
        height: 70%;
        width: 30%;
        top: 15%;
        /* margin-right: 15%; */
        font-size: medium;
        margin-left: 10%;
        background-color: rgba(219, 49, 75, 0.8);
    }
    .info_button2 {
        height: 70%;
        width: 30%;
        top: 15%;
        /* margin-right: 15%; */
        margin-left: 20%;
        background-color: rgba(60,179,113, 0.8);
        font-size: medium;
        font-weight: 300;
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
        height: 75%;
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
        font-size: xx-large;
        font-weight: 800;
        color: white;
        text-align: left;
        /* background-color: blueviolet; */
    }

    .info_content {
        margin-top: 1%;
        margin-left: 1%;
        height: 75%;
        overflow: hidden;
        font-size: large;
        color: white;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, BlinkMacSystemFont
        , 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans'
        , 'Helvetica Neue', sans-serif;
        font-weight: 500;
        text-align: left;
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
        /* padding: 0%; */
    }
  
  </style>