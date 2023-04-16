<template>
    <div>
        <!-- 侧边栏 -->
        <!-- <sidebar v-on:listenToChild="ChildToParent"></sidebar> -->
        <!-- 页首 -->
        
        <!-- content -->
        <div class="class_table">
            <div class="main_box">
                <div class="left_box">
                    <div class="info_word" v-for='index in 5' :key='index'>
                        <div class="word_Title">
                            <div class="content_box">
                                {{ this.words[index - 1].word }}
                            </div>
                        </div>
                        <div class="word_Meaning">
                            <div class="content_box">
                                {{this.words[index - 1].definition_cn}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right_box">
                    <div class="info_word" v-for='index in 5' :key='index'>
                        <div class="word_Title">
                            <div class="content_box">
                                {{this.words[index + 4].word}}
                            </div>
                        </div>
                        <div class="word_Meaning">
                            <div class="content_box">
                                {{this.words[index + 4].definition_cn}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Button -->
        <n-button round type="success" class="next_button" @click="nextGroup">
            学习下一组单词
		</n-button>



    </div>

  </template>
  
  
<script>
import router from '@/router';
import store from "@/store";
import { create } from 'lodash';

  export default {
    name: "WordReviewPage",
    data() {
        return {
            words: [
                {
                    word: "",
                    definition_cn: "",
                }
            ]
        }
    },
    methods: {
        nextGroup() {
            router.push('/user/learn')
        },
    },
    created() {
        this.words.splice(0, this.words.length)
        store.state.user.groupWords.forEach((ele) => this.words.push(ele))
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
        top: 5%;
        left: 8%;
        background-color: rgba(255, 255, 255, 0.5);
        /* background-color: rgba(129,227,185, 0.8);; */
        border-radius: 30px;
        display: inline-flex;
    }
    .left_box {
        position: relative;
        top: 5%;
        left: 10%;
        height: 90%;
        width: 35%;
        /* background-color: white; */
        display: flex;
		flex-direction: column;
    }

    .right_box {
        position: relative;
        top: 5%;
        margin-left: 18%;
        height: 90%;
        width: 35%;
        /* background-color: white; */
        display: flex;
		flex-direction: column;
    }

    .info_word {
		/* margin-bottom: 2%; */
		height: 20%;
        margin-bottom: 3%;
		display: flex;
        border-radius: 10px;
		/* background-color: blue; */
        background-color: rgba(82, 186, 141, 0.8);;
        color: white;
        font-weight: 300;
        /* vertical-align: middle; */
	}

    .n-card {
        /* display: inline-flex; */
    }

    .word_Title {
        position: relative;
        top: 25%;
        width: 45%;
        height: 50%;
        /* background-color: blanchedalmond; */
        font-size: x-large;
        vertical-align: middle;
        display: table;
        /* text-align: center; */
    }

    .word_Meaning {
        position: relative;
        top: 25%;
        /* width: 30%; */
        height: 50%;
        margin-left: 5%;
        /* background-color: wheat; */
        font-size: large;
        vertical-align: middle;
        display: table;
    }

    .content_box {
        display: table-cell;
        vertical-align: middle;
    }

    .next_button {
        position: absolute;
        top: 88%;
        width: 70%;
        left: 15%;
        height: 5%;
        font-size: large;
    }
  
  </style>