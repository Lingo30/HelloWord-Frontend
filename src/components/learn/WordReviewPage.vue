<template>
    <div>
        <!-- content -->
        <div class="class_table">
            <div class="main_box">
                <div class="left_box">
                  <n-scrollbar>
                    <n-card :bordered="false" content-style="padding: 1%;"
                            class="info_word" v-for='index in 5' :key='index'
                    >
                      <div class="word_Title" v-if="index - 1 < this.words.length">
                        {{ this.words[index - 1].word }} [{{ this.words[index - 1].phonetic_symbol }}]
                      </div>
                      <div class="word_Meaning" v-if="index - 1 < this.words.length">
                        {{this.words[index - 1].definition_cn}}
                      </div>
                    </n-card>
                  </n-scrollbar>
                </div>
                <div class="right_box">
                  <n-scrollbar>
                    <n-card :bordered="false" content-style="padding: 1%;"
                            class="info_word" v-for='index in 5' :key='index'
                    >
                      <div class="word_Title" v-if="index + 4 < this.words.length">
                        {{this.words[index + 4].word}} [{{ this.words[index + 4].phonetic_symbol }}]
                      </div>
                      <div class="word_Meaning" v-if="index + 4 < this.words.length">
                        {{this.words[index + 4].definition_cn}}
                      </div>
                    </n-card>
                  </n-scrollbar>
                </div>
            </div>
          <n-button round type="info" class="next_button" @click="nextGroup">
            学习下一组单词
          </n-button>
        </div>
        <!-- Button -->




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
                    phonetic_symbol: "",
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
      width: 70%;
      height: 80%;
      top: 50%;
      left: 50%;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: 10px 12px 16px 10px rgba(0, 0, 0, 0.24), 10px 17px 50px 10px #4E655D;
      /* background-color: rgba(38,164,116, 0.3); */
        /* opacity: 30%; */
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
        left: 7%;
        height: 90%;
        width: 40%;
        /* background-color: white; */
        display: flex;
		flex-direction: column;
    }

    .right_box {
        position: relative;
        top: 5%;
        margin-left: 13%;
        height: 90%;
        width: 40%;
        /* background-color: white; */
        display: flex;
		flex-direction: column;
    }

    .info_word {
		/* margin-bottom: 2%; */
        overflow-x: hidden;
        overflow-y: auto;
		height: 20%;
        margin-bottom: 1%;
		display: flex;
        border-radius: 5px;
		/* background-color: blue; */
        background-color: rgba(82, 186, 141, 0.75);;
        color: white;
        font-weight: 300;
        /* vertical-align: middle; */
	}

    .info_word:hover {
		/* margin-bottom: 2%; */
		height: 20%;
        margin-bottom: 1%;
		display: flex;
        border-radius: 5px;
		/* background-color: blue; */
        background-color: rgba(82, 186, 141, 1);;
        color: white;
        font-weight: 300;
        /* vertical-align: middle; */
	}

    .n-card {
        /* display: inline-flex; */
    }

    .word_Title {
        position: relative;
        left: 3%;
        height: auto;
        /* background-color: blanchedalmond; */
        font-size: large;
        text-align: left;
    }

    .word_Meaning {
        position: relative;
        overflow: auto;
        height: auto;
        margin-left: 3%;
        /* background-color: wheat; */
        font-size: large;
        text-align: left;
    }

    .content_box {
        display: table-cell;
        /* vertical-align: middle; */
    }

    .next_button {
        position: absolute;
        top: 88%;
        width: 70%;
        left: 15%;
        height: 5%;
        font-size: large;
    }

  /*  ::-webkit-scrollbar {*/
  /*  width: 6px;*/
  /*  transition: width 1s;*/
  /*}*/
  /*::-webkit-scrollbar-track {*/
  /*  background-color: rgba(0, 0, 0, 0.1);*/
  /*  border-radius: 10px;*/
  /*  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
  /*}*/
  /*::-webkit-scrollbar-thumb {*/
  /*  background-color: #999;*/
  /*  border-radius: 10px;*/
  /*  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);*/
  /*}*/

  </style>
