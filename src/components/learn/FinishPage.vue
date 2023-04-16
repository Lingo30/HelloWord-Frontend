<template>
    <div>        
        <!-- content -->
        <div class="class_table">
            <div class="main_box">
                <div class="finish_box">
                    您已完成本词单的学习<br>
                    请选择 其他词单学习 或者 前往复习
                </div>
                <div class="content_box">
                    <div class="left_box">
                            <router-link to="/user/wordlist" class="img_box">
                                <img  class="content_img" src="../../assets/img/newList.jpg">
                            </router-link>
                            <div class="imgTitle">选择新词单</div>
                     </div>
                    <div class="right_box">
                        <router-link to="/user/review" class="img_box">
                                <img  class="content_img" src="../../assets/img/review.jpeg">
                            </router-link>
                            <div class="imgTitle">复习模式</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </template>
  
  
<script>
import router from '@/router';
import store from "@/store";
import { create } from 'lodash';

  export default {
    name: "FinishPage",
    methods: {
        
    },
    created() {
        
    }
  }
  </script>
  
  <style scoped>
    .class_table {
        position: absolute;
        width: 100%;
        height: 100%;
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
        /* background-color: rgba(129,227,185, 0.8);; */
        border-radius: 30px;
        display: flex;
        flex-direction: column;
    }

    .finish_box {
        margin-top: 1.5%;
        height: 18.5%;
        font-size: xx-large;
        font-weight: 600;
        /* display: flex; */
        /* background-color: blue; */
    }

    .content_box {
        position: relative;
        display: inline-flex;
        height: 80%;
        /* background-color: blanchedalmond; */
    }

    .left_box {
        position: relative;
        /* top: 5%; */
        left: 7%;
        height: 90%;
        width: 40%;
        /* background-color: white; */
        display: flex;
		flex-direction: column;
        overflow: hidden;
        border-radius: 15px;
    }

    .right_box {
        position: relative;
        /* top: 5%; */
        margin-left: 14%;
        height: 90%;
        width: 40%;
        /* background-color: white; */
        display: flex;
		flex-direction: column;
        overflow: hidden;
        border-radius: 15px;
    }

    .img_box {
        position: relative;
        height: 80%;
        justify-content: center;
        align-items: center;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        /* background-image: url("../../assets/img/write.jpg"); */
    }
    .content_img {
        max-width: 100%;
        max-height: 600px;
        border-radius: 15px;
        /* min-height: 400px; */
    }
    .imgTitle {
        margin-top: 7%;
        font-size: xx-large;
        font-weight: 600;
    }
  
</style>