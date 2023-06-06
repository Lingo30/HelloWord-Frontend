<template>
	<div>
		<div class="word_search">
			<div class="search">
				<n-input v-model:value="value" type="text" placeholder="您需要查询的单词" style="border-radius: 15px;"
					maxlength="30" @keydown.enter.prevent="getSearchWord(value)" on-clear="getSearchWord" />
			</div>
			<div class="search_button">
				<n-button type="primary" style="border-radius: 10px;" @click="getSearchWord(value)">
					查找
				</n-button>
			</div>
		</div>

		<div class="class_table">
			<n-card :style="wordCardBackground" class="word_card shadow-lg">
				<div class="word_name">
					{{ group_words[curId].word }}
				</div>
				<div class="word_meaning_box">
					<div class="word_reading" v-if="shown == true">
						音标: [{{ group_words[curId].phonetic_symbol }}]
						<router-link to="" @click="play" v-if="shown == true">
							<!-- 播放 -->
							<img src="../../assets/img/sound1.png">
						</router-link>
					</div>
					<div class="word_meaning" v-if="shown == true">
						<n-scrollbar>
							{{ group_words[curId].definition_cn }}
						</n-scrollbar>
					</div>
					<router-link to="" class="delword" @click="delWord" v-if="shown == true">不再学习</router-link>
				</div>

				<div class="word_button_box">
					<n-button round type="success" class="info_button3" @click="nextWord"
						v-if="shown == true && forget_times == 1">
						下一个
					</n-button>
					<n-button large strong primary round type="error" class="info_button1" @click="forgetWord"
						v-if="shown == false && forget_times == 0">
						不认识
					</n-button>
					<n-button round type="success" class="info_button2" @click="showWord"
						v-if="shown == false && forget_times == 0">
						认识
					</n-button>
				</div>
			</n-card>
			<div class="info_card shadow-lg">
				<n-card :bordered="false" class="info_card1 shadow-lg">
					<div class="info_box">
						<div class="info_title">
							同义词
						</div>
						<div class="info_content" v-if="shown == true">
							<n-scrollbar>
								<n-card :bordered="false" content-style="padding: 1.5%;" class="info_word1"
									v-for="(synonym, index) in relation.synonyms" @click="getSearchWord(synonym.word)">
									<div class="related_word">
										{{ synonym.word }} [{{ synonym.phonetic_symbol }}]
									</div>
									<div class="related_word_meaning">
										{{ synonym.definition_cn }}
									</div>
								</n-card>
							</n-scrollbar>
						</div>
					</div>
				</n-card>
				<n-card :bordered="false" class="info_card2 shadow-lg">
					<div class="info_box">
						<div class="info_title">
							反义词
						</div>
						<div class="info_content" v-if="shown == true">
							<n-scrollbar>
								<n-card :bordered="false" content-style="padding: 1.5%;" class="info_word2"
									v-for="(antonym, index) in relation.antonyms" @click="getSearchWord(antonym.word)">
									<div class="related_word">
										{{ antonym.word }} [{{ antonym.phonetic_symbol }}]
									</div>
									<div class="related_word_meaning">
										{{ antonym.definition_cn }}
									</div>
								</n-card>
							</n-scrollbar>
						</div>
					</div>
				</n-card>
				<n-card :bordered="false" class="info_card3 shadow-lg">
					<div class="info_box">
						<div class="info_title">
							例句
							<router-link to="" class="changeExample" @click="changeExample"
								v-if="shown == true">换一个</router-link>
						</div>
						<div class="info_content1" v-if="shown == true">
							<n-scrollbar>
								{{ relation.example }}
							</n-scrollbar>
						</div>
					</div>
				</n-card>
			</div>
		</div>
	</div>
	<n-modal v-model:show="showModal" class="searchModal" :mask-closable="false" :style="bodyStyle" preset="card"
		content="你确认" :segmented="segmented" @positive-click="onPositiveClick" @negative-click="onNegativeClick">
		<div class="word_name_search">
			{{ searchWord.word }}
		</div>
		<div class="word_meaning_box_search">
			<div class="word_reading_search">
				音标: [{{ searchWord.phonetic_symbol }}]
				<router-link to="" @click="play1">
					<img src="../../assets/img/sound1.png">
				</router-link>
			</div>
			<div>
				<audio></audio>
			</div>
			<div class="word_meaning_search">
				{{ searchWord.definition_cn }}
			</div>
			<div class="word_example_search">
				例句：{{ searchWord.example }}
			</div>
		</div>
	</n-modal>
</template>


<script>
import { NCard, NScrollbar, NButton, NInput, NModal, useMessage } from 'naive-ui'
// import {searchWordAPI, getWordAPI} from "@/request/api/user";
import { get_group_words_in_list, get_search_word, deleteWordAPI, group_word_learn_save, get_word_releation, get_new_example } from "@/request/api/learn";
import store from "@/store";
import { reactive, ref } from 'vue';
import router from '@/router';

export default {
	name: "WordPage",
	components: {
		NCard,
		NScrollbar,
		NButton,
		NInput,
		NModal,
	},
	data() {
		return {
			wordCardBackground: {
				backgroundImage: 'url(' + require('../../assets/img/word_background_4.jpg') + ')',
			},
			message: useMessage(),
			value: ref(''),
			showModal: ref(false),
			// searchRef: ref(null),
			bodyStyle: {
				width: "35%",
				height: "550px",
				// height: "600px",
				border: "2px",
			},
			group_words: reactive([{
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
				synonyms: [{
					word_id: 3,
					word: "",
					definition_cn: "",
					phonetic_symbol: "",
				},
				],
				antonyms: [{
					word_id: 6,
					word: "",
					definition_cn: "",
					phonetic_symbol: "",
				},
				],
				example: "",
			}),
			learnWords: [{
				word_id: 1,
				forget_times: 0,
				simple: false,
			},
			],
			searchWord: {
				word: "abandon",
				phonetic_symbol: "ә'bændәn",
				definition_cn: "vt. 放弃, 抛弃, 遗弃, 使屈从, 沉溺, 放纵\nn. 放任, 无拘束, 狂热",
				example: "At this point, Jobs, his doctors, and Apple are silent on the specific health issues that have required him to abandon his post. 现在，乔布斯，他的医生，和苹果公司在他的要求他放弃苹果职位的特殊健康问题上保持着沉默。",
			},
			curId: ref(0),
			forget_times: ref(0),
			shown: ref(false),
			list_id: ref(0),
			color: ref('#679B9B'),
			color1: ref('rgba(38, 164, 116, 0.8)'),
			color2: ref('rgba(129, 227, 131, 0.8)'),
			color3: ref('rgba(129, 227, 185, 0.8)')
		}
	},
	methods: {
		getSearchWord(word) {
			this.value = ""
			let success = false
			let errMsg = ''
			get_search_word(word).then((res) => {
				success = res.state
				if (res.state == false) {
					errMsg = '查询失败'
				} else {
					this.searchWord.word = res.word
					this.searchWord.definition_cn = res.definition_cn
					this.searchWord.phonetic_symbol = res.phonetic_symbol
					this.searchWord.example = res.example
					this.showModal = true
				}
			}).catch(err => errMsg = '网络错误').finally(() => {
				if (!success) {
					this.message.error(errMsg)
					// alert("网络错误")
				}
			})
		},
		getGroupWord() {
			const weekNum = new Date().getDay();
			switch (weekNum) {
				case 0:
					break;
				case 1:
					this.wordCardBackground.backgroundImage = 'url(' + require('../../assets/img/word_background_1.png') + ')';
					break;
				case 2:
					this.wordCardBackground.backgroundImage = 'url(' + require('../../assets/img/word_background_2.jpg') + ')';
					break;
				case 3:
					this.wordCardBackground.backgroundImage = 'url(' + require('../../assets/img/word_background_3.jpg') + ')';
					break;
				case 4:
					this.wordCardBackground.backgroundImage = 'url(' + require('../../assets/img/word_background_4.jpg') + ')';
					break;
				case 5:
					this.wordCardBackground.backgroundImage = 'url(' + require('../../assets/img/word_background_5.jpg') + ')';
					break;
				case 6:
					this.wordCardBackground.backgroundImage = 'url(' + require('../../assets/img/word_background_6.jpg') + ')';
					break;
			}
			let success = false
			let errMsg = ''
			get_group_words_in_list(store.state.user.uid).then((res) => {
				success = res.state
				errMsg = res.msg
				if (res.hasBook == false) {
					router.push('/user/wordlist')
					return
				} else {
					if (res.state == true) {
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
						this.play();
					} else {
						router.push('/user/finish')
					}
				}
			}).catch(err => errMsg = '网络错误').finally(() => {
				if (!success) {
					this.message.error(errMsg)
				}
			})
		},
		saveGroup() {
			let success = false
			let errMsg = ''
			group_word_learn_save(store.state.user.uid, this.learnWords, this.list_id).then((res) => {
				// pass
				success = res.state
				errMsg = res.msg
			}).catch(err => errMsg = '网络错误').finally(() => {
				if (!success) {
					this.message.error(errMsg)
				}
			})
		},
		delWord() {
			// 服务器删除
			let pos = this.learnWords.findIndex((val) => val.word_id == this.group_words[this.curId].word_id)
			let len = this.learnWords.length
			if (pos === -1) {
				this.learnWords[len] = { word_id: this.group_words[this.curId].word_id, forget_times: 0, simple: true }
			} else {
				this.learnWords[pos] = { word_id: this.group_words[this.curId].word_id, forget_times: 0, simple: true }
			}
			this.nextWord();
		},
		forgetWord() {
			let len = this.group_words.length
			this.group_words[len] = this.group_words[this.curId]

			let pos = this.learnWords.findIndex((val) => val.word_id == this.group_words[this.curId].word_id)
			len = this.learnWords.length
			if (pos === -1) {
				this.learnWords[len] = { word_id: this.group_words[this.curId].word_id, forget_times: 1, simple: false }
			} else {
				let times = this.learnWords[pos].forget_times + 1
				this.learnWords[pos] = { word_id: this.group_words[this.curId].word_id, forget_times: times, simple: false }
			}
			this.showWord()
			this.play()
			//this.nextWord()
		},
		nextWord() {
			let pos = this.learnWords.findIndex((val) => val.word_id == this.group_words[this.curId].word_id)
			let len = this.learnWords.length
			if (pos === -1) {
				this.learnWords[len] = { word_id: this.group_words[this.curId].word_id, forget_times: 0, simple: false }
			}
			len = this.group_words.length
			if (this.curId === len - 1) {
				this.saveGroup()
				router.push('/user/wordReview')
				return
			}
			this.shown = false
			this.forget_times = 0
			this.curId = this.curId + 1
			this.getRelated(this.group_words[this.curId].word_id)
			this.play()
		},
		getRelated() {
			//TODO 通过uid获取所有词单id
			let success = false
			let errMsg = ''
			get_word_releation(this.group_words[this.curId].word_id).then((res) => {
				success = res.state
				errMsg = res.msg
				this.relation.example = res.example
				this.relation.synonyms.splice(0, this.relation.synonyms.length)
				res.synonyms.forEach((ele) => this.relation.synonyms.push(ele))
				this.relation.antonyms.splice(0, this.relation.antonyms.length)
				res.antonyms.forEach((ele) => this.relation.antonyms.push(ele))
			}).catch(err => errMsg = '网络错误').finally(() => {
				if (!success) {
					this.message.error(errMsg)
				}
			});
		},
		showWord() {
			this.shown = true
			this.forget_times = 1
			this.play()
		},
		play() {
			this.audio = new Audio();
			this.audio.src = 'https://dict.youdao.com/speech?audio=' + this.group_words[this.curId].word;
			this.audio.play();
		},
		play1() {
			this.audio = new Audio();
			this.audio.src = 'https://dict.youdao.com/speech?audio=' + this.searchWord.word;
			this.audio.play();
		},
		onNegativeClick() {
			message.success('Cancel')
			showModalRef.value = false
		},
		onPositiveClick() {
			message.success('Submit')
			showModalRef.value = false
		},
		changeExample() {
			let success = false
			let errMsg = ''
			get_new_example(store.state.user.uid, this.group_words[this.curId].word_id).then((res) => {
				success = res.state
				errMsg = res.msg
				this.relation.example = res.example
			}).catch(err => errMsg = '网络错误').finally(() => {
				if (!success) {
					this.message.error(errMsg)
				}
			});
		},
	},
	created() {
		this.getGroupWord();
		if (store.state.user.custom === 1) {
			this.color = 'rgba(5,199,243,0.85)';
			this.color1 = '#359fc5';
			this.color2 = '#4f77be';
			this.color3 = '#1E90FF';
		}
		if (store.state.user.custom === 2) {
			this.color = 'rgba(204,167,187,0.95)';
			this.color1 = '#ffb3bf';
			this.color2 = '#ffd9e6';
			this.color3 = '#ffb3e6';
		}
		if (store.state.user.custom === 3) {
			this.color = 'rgba(177,144,225,0.95)';
			this.color1 = '#DDA0DD';
			this.color2 = '#c479e3';
			this.color3 = '#9370DB';
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

.word_search {
	margin-top: 2%;
	top: 10%;
	/* height: 10%; */
	/* background-color: blue; */
	display: flex;
	opacity: 65%;
}

.search {
	margin-left: 15%;
	width: 60%;
	/* background-color: black; */
	overflow: auto;
}

.search_button {
	width: 8%;
	/* margin-left: 1%; */
	/* background-color: wheat; */
	overflow: auto;
}

.word_card_box {
	/* position: relative; */
	/* margin-left: 3%; */
	/*margin-top: 15%;*/
	/*width: 100%;*/
	/*top: 15%;*/
	/*height: 80%;*/
	/*opacity: 90%;*/
	/* background-color: rgba(38,164,116, 0.3);*/
	width: 100%;
	height: 100%;
}

.word_card {
	height: 90%;
	width: 40%;
	background-size: 100%, 100%;
	overflow-x: hidden;
	overflow-y: auto;
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
	margin-top: 10%;
	margin-left: 15%;
	margin-right: 15%;
	height: 10%;
	align-items: center;
	justify-content: center;
	line-height: 100%;
	background-color: rgba(255, 255, 255, 0.6);
	text-align: center;
	font-size: 40px;
	border-radius: 10px;
}

.word_name_search {
	/* background-color: white; */
	margin-top: 1%;
	height: 10%;
	align-items: center;
	justify-content: center;
	line-height: 100%;
	background-color: rgba(255, 255, 255, 0.6);
	text-align: center;
	font-size: 35px;
	border-radius: 10px;
}

.word_meaning_box {
	margin-top: 9%;
	margin-left: 8%;
	margin-right: 8%;
	height: 50%;
	background-color: rgba(255, 255, 255, 0.6);
	text-align: center;
	font-size: 28px;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
}

.word_meaning_box_search {
	margin-top: 2%;
	height: 50%;
	background-color: rgba(255, 255, 255, 0.6);
	text-align: center;
	font-size: 22px;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
}

.word_reading {
	margin-top: 10%;
	height: 20%;
	font-style: italic;
	/* background-color: #679B9B; */
}

.word_reading_search {
	/* margin-top: 10%; */
	height: 20%;
	font-style: italic;
	/* background-color: #679B9B; */
}

.word_meaning {
	margin-top: 5%;
	height: 40%;
	font-style: italic;
	white-space: pre-wrap;
	font-size: large;
	/* text-align: left; */
	/* background-color: #679B9B; */
}

.word_meaning_search {
	margin-top: 3%;
	/* height: 40%; */
	font-style: italic;
	white-space: pre-wrap;
	font-size: large;
	/* text-align: left; */
	/* background-color: #679B9B; */
}

.word_example_search {
	margin-top: 5%;
	margin-left: 5%;
	width: 90%;
	height: 50%;
	font-style: italic;
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

.changeExample {
	/* margin-top: 10%; */
	top: 3%;
	position: absolute;
	left: 80%;
	right: 1%;
	/* height: 20%; */
	font-size: medium;
	color: rgba(255, 255, 255, 0.8);
	/* font-style: italic; */
	/* opacity: 70%; */
	text-decoration: underline;
	/* background-color: #679B9B; */
}

.word_button_box {
	margin-top: 5%;
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
	background-color: rgba(60, 179, 113, 0.8);
	font-size: medium;
	font-weight: 300;
}

.info_button3 {
	height: 70%;
	width: 80%;
	top: 12%;
	/* margin-right: 15%; */
	margin-left: 8%;
	background-color: rgba(60, 179, 113, 0.8);
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
	/*top: 15%;*/
	/*width: 30%;*/
	/*margin-left: 5%;*/
	/*height: 75%;*/
	/*opacity: 90%;*/
	width: 40%;
	height: 90%;
	/*background-color: #679B9B; !* todo *!*/
	background-color: v-bind(color);
	margin-left: 5%;
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
	/*background-color: rgba(38, 164, 116, 0.8);*/
	background-color: v-bind(color1);
	border-width: 0px;
	display: vertical;
}

.info_card2 {
	margin-top: 5%;
	width: 90%;
	left: 5%;
	height: 25%;
	border-radius: 10px;
	background-color: v-bind(color2);
	/*background-color: rgba(129, 227, 131, 0.8);*/
	border-width: 0px;
	display: vertical;
}

.info_card3 {
	margin-top: 5%;
	width: 90%;
	left: 5%;
	height: 35%;
	border-radius: 10px;
	background-color: v-bind(color3);
	/*background-color: rgba(129, 227, 185, 0.8);*/
	/*border-color: rgba(129, 227, 185, 0.8);*/
	display: vertical;
}

.info_box {
	position: absolute;
	top: 3%;
	left: 1%;
	right: 1%;
	height: 94%;
	/* background-color: royalblue; */
	overflow: hidden;
	display: vertical;
	display: flexbox;
}

.info_title {
	overflow: auto;
	font-size: x-large;
	font-weight: 800;
	color: white;
	text-align: left;
	/* background-color: blueviolet; */
}

.info_content {
	/* margin-top: 1%; */
	margin-left: 1%;
	height: 70%;
	overflow: auto;
	font-size: large;
	color: white;
	display: flex;
	flex-direction: column;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans'
		, 'Helvetica Neue', sans-serif;
	font-weight: 500;
	text-align: left;
	white-space: pre-wrap;
	/* background-color: aliceblue; */
}

.info_content1 {
	/* margin-top: 1%; */
	margin-left: 2%;
	height: 70%;
	overflow: auto;
	font-size: large;
	color: white;
	display: flex;
	flex-direction: column;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans'
		, 'Helvetica Neue', sans-serif;
	font-weight: 500;
	text-align: left;
	white-space: pre-wrap;
	/* background-color: aliceblue; */
}

.related_box {
	position: absolute;
	width: 100%;
	left: 0%;
	top: 0%;
	height: auto;
	/* background-color: #4E655D; */
}

.info_word1 {
	padding: 0%;
	margin-bottom: 1%;
	height: auto;
	display: flex;
	background-color: rgba(38, 164, 116, 0.8);
	border-width: 0px;
	/* background-color:#4E655D; */
}

.info_word1:hover {
	padding: 0%;
	margin-bottom: 1%;
	height: auto;
	display: flex;
	background-color: rgba(255, 255, 255, 0.2);
}

.info_word2 {
	padding: 0%;
	margin-bottom: 1%;
	height: auto;
	display: flex;
	background-color: rgba(129, 227, 131, 0.8);
	border-width: 0px;
	/* background-color:#4E655D; */
}

.info_word2:hover {
	padding: 0%;
	margin-bottom: 1%;
	height: auto;
	display: flex;
	background-color: rgba(255, 255, 255, 0.2);
}

.related_word {
	position: relative;
	padding: 0px;
	top: 0%;
	color: white;
	font-size: medium;
	width: 100%;
	/* background-color: #78958b; */
	/* display: inline; */
}

.related_word_meaning {
	position: relative;
	border: 0px;
	color: white;
	/* margin-left: 10%; */
	/* background-color: #679B9B; */
	font-size: small;
	font-style: italic, oblique;
	text-align: left;
}


/* 滚动条样式 */
/*::-webkit-scrollbar {*/
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
