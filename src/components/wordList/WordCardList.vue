<template>
  <div class="container">
    <n-scrollbar style="max-height: 60vh;margin-top:1vh;margin-bottom:1vh">
      <n-card
          class="card"
          :bordered="false"
          hoverable
          v-for="word in words"
          :key="word.wordId"
          @click="getContent(word.word)"
      >
        <template #header>
          <div class="head">
            <!--            基本释义-->
            <n-text class="font-color">
              {{ word.word }}
            </n-text>
          </div>
        </template>
        <template #header-extra>
          <n-text class="font-color">
            {{ '[' + word.symbol + ']' }}
          </n-text>
        </template>
        <div class="content font-color ellipsis">
          <n-popover trigger="hover" style="white-space: pre-wrap">
            {{ word.meaning }}
            <template #trigger>
              {{ word.meaning }}
            </template>
          </n-popover>
        </div>
      </n-card>
    </n-scrollbar>
    <div class="foot">
      <n-pagination
          v-if="showPagination"
          v-model:page="curPage"
          :page-count="pageNum"
          size="small"
          :page-slot="3"
          @update:page="changePage"
          show-quick-jumper
      >
        <!--        <template #prev>-->
        <!--          <div :style="{opacity:1===curPage?0.5:1}" style="color: white">-->
        <!--            上一页-->
        <!--          </div>-->
        <!--        </template>-->
        <!--        <template #next>-->
        <!--          <div :style="{opacity:pageNum===curPage?0.5:1}" style="color: white">-->
        <!--            下一页-->
        <!--          </div>-->
        <!--        </template>-->
      </n-pagination>
      <n-space>
        <n-button class="set-learn-button" size="tiny" v-show="showPagination&&!official" type="info"
                  @click="uploadWordlist(listId)">
          上传词单
        </n-button>
        <n-button class="set-learn-button" size="tiny" v-show="showPagination&&!selectedFlag" type="info"
                  @click="selectWordlist(listId)">
          设为背诵
        </n-button>
      </n-space>
    </div>

    <n-modal
        v-model:show="showModal"
        class="searchModal"
        :mask-closable="false"
        :style="bodyStyle"
        preset="card"
        content="你确认"
        :segmented="segmented"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
    >
      <div class="word_name_search">
        {{searchWord.word}}
      </div>
      <div class="word_meaning_box_search">
        <div class="word_reading_search">
          音标: [{{ searchWord.phonetic_symbol }}]
          <router-link to="" @click="play(searchWord.word)">
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
  </div>
</template>

<script>
import {NCard, NScrollbar, NText, NPopover, NPagination, NButton, NSpace, useMessage, useDialog, NModal} from "naive-ui";
import {reactive, ref} from "vue";
import store from "@/store";
import {getWordsInfo, submitOfficial, updateLearnWordlist} from "@/request/api/wordlist";
import {get_search_word} from "@/request/api/learn"

export default {
  name: "WordCardList",
  components: {
    NCard,
    NScrollbar,
    NText,
    NPopover,
    NPagination,
    NButton,
    NSpace,
    NModal
  },
  props: {
    official: Boolean,
  },
  setup() {
    const message = useMessage()
    const dialog = useDialog()
    const words = reactive([])
    // for (let i = 0; i < 20; i++)
    //   words.push({
    //     wordId: i,
    //     word: 'dangerous' + i,
    //     symbol: '【deng3eres】',
    //     meaning: 'adj. 有危险的',
    //   })

    let showPagination = ref(false)
    let listId = ref(0)
    let pageSize = 5//分页时每一页的大小
    let pageNum = ref(10)//总页数
    let curPage = ref(1)//当前页数
    let selectedFlag = ref(false)
    let searchWord = reactive({})

    //默认展示第一页
    function showWords(listId, totalNum) {
      showPagination.value = true
      selectedFlag.value = store.state.user.selectWordlist === listId
      this.listId = listId
      pageNum.value = Math.ceil(totalNum / pageSize)
      curPage.value = 1
      let errMsg = ''
      let success = false
      getWordsInfo(store.state.user.uid, listId, pageSize, curPage.value - 1).then((res) => {
        success = res.state
        errMsg = res.msg
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    //分页展示
    function changePage(page) {
      let errMsg = ''
      let success = false
      getWordsInfo(store.state.user.uid, listId.value, pageSize, page - 1).then((res) => {
        success = res.state
        errMsg = res.msg
        words.splice(0, words.length);
        res.words.forEach((word) => words.push(word))
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    //申请上传为官方词单
    function uploadWordlist(listId) {
      dialog.info({
        title: '提交确认',
        content: '要把你的词单上传为官方词单吗？',
        positiveText: '确定',
        negativeText: '让我再想想',
        onPositiveClick: () => {
          submitToOfficial(listId)
        }
      })
    }

    function submitToOfficial(listId) {
      let success = false
      let errMsg = ''
      submitOfficial(store.state.user.uid, listId).then(res => {
        success = res.state
        errMsg = res.msg
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (success) {
          message.success('你的提交申请已收到，我们会尽快审核')
        } else {
          message.error(errMsg)
        }
      })
    }

    function selectWordlist(listId) {
      // 服务器更新正在背诵的词单
      let success = false
      let errMsg = ''
      updateLearnWordlist(store.state.user.uid, listId).then((res) => {
        success = res.state
        errMsg = res.msg
      }).catch(err => errMsg = '网络错误').finally(() => {
        //本地更新
        if (success) {
          //更新成功
          store.state.user.selectWordlist = listId
          selectedFlag.value = store.state.user.selectWordlist === listId
          message.success('更新成功')
        } else {
          //更新失败
          message.error(errMsg)
        }
      })
    }

    function getContent(wordStr) {
      let success = false
			let errMsg = ''
			get_search_word(wordStr).then((res) => {
				success = res.state
				if (res.state == false) {
					errMsg = '查询失败'
				} else {
					this.searchWord.word = res.word
					this.searchWord.definition_cn = res.definition_cn
					this.searchWord.phonetic_symbol = res.phonetic_symbol
					this.searchWord.example = res.example
					this.showModal = true
          this.play(wordStr)
				}
			}).catch(err => errMsg = '网络错误').finally(() => {
				if (!success) {
					this.message.error(errMsg)
					// alert("网络错误")
				}
			})
    }

    function play(wordStr) {
      this.audio = new Audio();
			this.audio.src = 'https://dict.youdao.com/speech?audio=' + wordStr;
			this.audio.play();
    }

    return {
      words,
      showPagination,
      pageNum,
      curPage,
      selectedFlag,
      listId,

      showWords,
      changePage,
      uploadWordlist,
      selectWordlist,
      getContent,
      play,

      showModal: ref(false),
      bodyStyle: {
        width: "35%",
        height: "550px",
        border: "2px",
      },
      searchWord,
      // : {
      //   word: "abandon",
      //   phonetic_symbol: "ә'bændәn",
      //   definition_cn: "vt. 放弃, 抛弃, 遗弃, 使屈从, 沉溺, 放纵\nn. 放任, 无拘束, 狂热",
      //   example: "At this point, Jobs, his doctors, and Apple are silent on the specific health issues that have required him to abandon his post. 现在，乔布斯，他的医生，和苹果公司在他的要求他放弃苹果职位的特殊健康问题上保持着沉默。",
      // },
    }
  }
}
</script>

<style scoped>
.container {
  background-color: rgb(101, 101, 101,0);
  border-radius: 15px;
  flex-direction: column;
  height: 90%;
  width: 90%;
  overflow: auto;
}

.card {
  background-color: transparent;
}

.font-color {
  color: white;
}

.head {
  text-align: left;
  font-size: 1.5em;
}

.content {
  text-align: left;
  white-space: pre-wrap
}

.ellipsis {
  /*设置省略输出*/
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.foot {
  display: flex;
  flex-direction: row;
  margin-bottom: 1vh;
  justify-content: space-between;
  padding: 0 3px 0 5px;
}

.set-learn-button {
  color: white;
  margin: 0;
  padding: 12px;
  margin-left: 2px;
  border-radius: 100px;
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

	.word_reading_search {
		/* margin-top: 10%; */
		height: 20%;
		font-style: italic;
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
</style>
