<template>
	<div>
		<!-- 侧边栏 -->
		<!-- <sidebar v-on:listenToChild="ChildToParent"></sidebar> -->
		<!-- 页首 -->
		
		<!-- content -->
		<div class="class_table">
			<div class="word_box"> 
				<!-- <div class="word_search">
					<div class="search">
						<n-input
						v-model:value="value" 
						type="text"
						placeholder="您需要查询的单词" 
						style="border-radius: 15px;"
					/>
					</div>
					<div class="search_button">
						<n-button type="primary" style="border-radius: 10px;" @click="searchWord()">
							查找
						</n-button>
					</div>
				</div> -->
				<div class="word_card_box">
					<n-card class="word_card shadow-lg">
						<!-- <div class="word"> -->
							<div class="word_name">
								{{group_words[curId].word}}
							</div>
							<div class="word_meaning_box">
								<div class="word_reading" v-if="shown==true">
									音标: {{group_words[curId].phonetic_symbol}}
								</div>
								<div class="word_meaning" v-if="shown==true">
									{{group_words[curId].definition_cn}}
								</div>
								<router-link to="" class="delword" @click="delWord" v-if="shown==true">不再学习</router-link>
							</div>
							
							<div class="word_button_box">
								<n-button round type="success" class="info_button3" @click="nextWord" v-if="shown==true && forget_times==1">
									下一个
								</n-button>
								<n-button large strong primary round type="error" class="info_button1" @click="forgetWord" v-if="shown==false && forget_times==0">
									不认识
								</n-button>
								<n-button  round type="success" class="info_button2" @click="showWord" v-if="shown==false && forget_times==0">
									认识
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
						<div class="info_content" v-if="shown==true">
							<div class="info_word1" v-for="(synonym, index) in relation.synonyms">
								<div class="related_word">
									{{synonym.word}}
								</div>
								<div class="read">
									{{synonym.definition_cn}}
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
						<div class="info_content" v-if="shown==true">
							<div class="info_word1" v-for="(antonym, index) in relation.antonyms">
								<div class="related_word">
									{{ antonym.word }}
								</div>
								<div class="read">
									{{ antonym.definition_cn }}
								</div>
							</div>
							
						</div>
					</div>
				</n-card>
				<n-card :bordered="false" class="info_card3 shadow-lg">
					<div class="info_box">
						<div class="info_title">
							例句
						</div>
						<div class="info_content" v-if="shown==true">
							{{ relation.example }}
						</div>
					</div>
				</n-card>
			</div>
		</div>
	</div>
  
	
	
  </template>
  

<script>
import {useMessage} from 'naive-ui'
// import {searchWordAPI, getWordAPI} from "@/request/api/user";
import {get_group_words_in_list, searchWordAPI, deleteWordAPI, group_word_learn_save, get_word_releation} from "@/request/api/learn";
import store from "@/store";
import {reactive, ref } from 'vue';
import { th } from 'date-fns/locale';
import router from '@/router';

export default {
	name: "WordPage",
	data() {
		return {
			group_words: reactive([ {
					// id: 1,
                    word_id: 1,
					word: "",
					phonetic_symbol: "",
					definition_cn: "",
				},
			],),
			/*
			id, word_id, word, 
            phonetic_symbol, definition_cn, WordMeaning,
			synonyms[], antonyms[], example
			*/
            relation: reactive({
                synonyms: [ {
						word_id: 3,
						word: "",
						definition_cn: ""
						},
					],
					antonyms: [{
                        word_id: 6,
						word: "",
						definition_cn: ""
						},
					],
					example: "",
            }),
			learnWords: [ {
					word_id: 1,
					forget_times: 0,
					simple: false,
				},
			],
			
			curId: ref(0),
			forget_times: ref(0),
			shown: ref(false),
			list_id: ref(0),
		}
	},
	methods: {
		// searchWord(word) {
		// 	searchWordAPI(word).then((res) => {
		// 		if(res.data.code === 200) {
		// 			this.group_words = res.data.group_words
		// 			this.curId = 0
		// 		} else {
		// 			message.error("查询错误！");
		// 		}
		// 	})
		// },
		getGroupWord() {
			get_group_words_in_list(store.state.user.uid).then((res) => {
				// alert(res.hasBook)
				if(res.hasBook==false) {
					// alert(111)
					router.push('/user/wordlist')
					return
				} else {
					if(res.state==true) {
						this.group_words.splice(0, this.group_words.length)
						res.group_words.forEach((ele) => this.group_words.push(ele))
						this.curId = 0
						this.forget_times = 0
						this.getRelated(this.group_words[0].word_id)
						this.learnWords.splice(0, this.learnWords.length)
						this.shown = false
						store.state.user.groupWords.splice(0, store.state.user.groupWords.length)
						this.group_words.forEach((ele) => store.state.user.groupWords.push(ele))
						this.list_id = res.list_id
					} else {
						router.push('/user/finish')
					}
				}
			})
		},
		saveGroup() {
			group_word_learn_save(store.state.user.uid, this.learnWords, this.list_id).then((res) => {
				// pass
				
			})
		},
		delWord() {
			//alert("Delete cur word!")
			// 服务器删除
			let pos = this.learnWords.findIndex((val)=>val.word_id==this.group_words[this.curId].word_id)
			let len = this.learnWords.length
			if(pos === -1) {
				this.learnWords[len] = {word_id: this.group_words[this.curId].word_id, forget_times: 0, simple: true}
			} else {
				this.learnWords[pos] = {word_id: this.group_words[this.curId].word_id, forget_times: 0, simple: true}
			}
			this.nextWord();
		},
		forgetWord() {
			let len = this.group_words.length
			this.group_words[len] = this.group_words[this.curId]
			
			let pos = this.learnWords.findIndex((val)=>val.word_id==this.group_words[this.curId].word_id)
			len = this.learnWords.length
			if(pos === -1) {
				this.learnWords[len] = {word_id: this.group_words[this.curId].word_id, forget_times: 1, simple: false}
			} else {
				let times = this.learnWords[pos].forget_times + 1
				this.learnWords[pos] = {word_id: this.group_words[this.curId].word_id, forget_times: times, simple: false}
			}
			this.showWord()
			//this.nextWord()
		},
		nextWord() {
			let len = this.group_words.length
			if(this.curId === len - 1) {
				this.saveGroup()
				router.push('/user/wordReview')
				return
			}
			let pos = this.learnWords.findIndex((val)=>val.word_id==this.group_words[this.curId].word_id)
			len = this.learnWords.length
			if(pos === -1) {
				this.learnWords[len] = {word_id: this.group_words[this.curId].word_id, forget_times: 0, simple: false}
			}
			this.shown = false
			this.forget_times = 0
			this.curId = this.curId + 1
			this.getRelated(this.group_words[this.curId].word_id)
		},
		getRelated() {
			//TODO 通过uid获取所有词单id
			get_word_releation(this.group_words[this.curId].word_id).then((res) => {
				this.relation.example = res.example
				this.relation.synonyms.splice(0, this.relation.synonyms.length)
        		res.synonyms.forEach((ele) => this.relation.synonyms.push(ele))
				this.relation.antonyms.splice(0, this.relation.antonyms.length)
        		res.antonyms.forEach((ele) => this.relation.antonyms.push(ele))
      		})
		},
		showWord() {
			this.shown = true
			this.forget_times = 1
		}
	},
	created() {
		this.getGroupWord();
	}
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
		margin-top: 15%;
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
		margin-top: 7%;
		margin-left: 2%;
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

	.info_button3 {
		height: 70%;
		width: 80%;
		top: 12%;
		/* margin-right: 15%; */
		margin-left: 8%;
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
		height: 30%;
		overflow: hidden;
		font-size: xx-large;
		font-weight: 800;
		color: white;
		text-align: left;
		/* background-color: blueviolet; */
	}

	.info_content {
		/* margin-top: 1%; */
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
		margin-bottom: 2%;
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