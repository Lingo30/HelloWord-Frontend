<template>
  <n-modal
      v-model:show="showHistory"
      class="change-pwd"
      preset="card"
      :style="bodyStyle"
      title="历史记录"
      size="huge"
      :bordered="false"
  >
    <n-space class="container">
      <div style="margin-bottom: 30px" class="select-box">
        <n-date-picker @confirm="getRecordId" v-model:formatted-value="dateRange" value-format="yyyy.MM.dd" type="daterange"/>
        <n-scrollbar style="margin-top: 15px">
          <HistoryCard
              v-for="(id,index) in listIds"
              :key="id"
              :list-id="id"
              :color-idx="index"
              :clicked="clickedId===id"
              :type="type"
              ref="historyCardRef"
              @handle-click="clickHistory"
          />
        </n-scrollbar>
      </div>

      <div class="content-box">
        <n-card hoverable class="text-card">
            <n-scrollbar style="max-height: 60vh;width:95%">
            {{historyContent}}
          </n-scrollbar>
        </n-card>
      </div>


    </n-space>
    <div style="display: flex; justify-content: flex-end">
      <n-button style="margin-right: 10px" round @click="handleClose">
        取消
      </n-button>
      <n-button round type="primary" @click="handleConfirm">
        确认
      </n-button>
    </div>
  </n-modal>
</template>

<script>
import {computed, onBeforeMount, reactive, ref} from "vue";
import {NModal, NButton,NDatePicker,NSpace,NScrollbar,useMessage} from "naive-ui";
import HistoryCard from "@/components/textDIsplay/HistoryCard";
import store from "@/store";
import {getBlankRecord, getHistoryRecordId, getStoryRecord, getWritingRecord} from "@/request/api/review";

export default {
  name: "HistoryRecd",
  components: {
    HistoryCard,
    NModal,
    NScrollbar,
    NSpace,
    NDatePicker,
    NButton,
  },
  props: {
    type: Number
  },
  setup(props,{emit}) {
    let showHistory = ref(false);
    const listIds = reactive([])
    const historyContent = ref("")
    const message = useMessage()

    function handleClose() {
      showHistory.value = false
    }

    const clickedId = ref()

    function clickHistory(id) {
      clickedId.value = id
      showHisContent(id)
    }

    // 计算默认日期
    let today = new Date();
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    // 转换日期为 yyyy.MM.dd 格式
    let todayFormatted = `${today.getFullYear()}.${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}.${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;
    let oneWeekAgoFormatted = `${oneWeekAgo.getFullYear()}.${oneWeekAgo.getMonth() + 1 < 10 ? '0' + (oneWeekAgo.getMonth() + 1) : oneWeekAgo.getMonth() + 1}.${oneWeekAgo.getDate() < 10 ? '0' + oneWeekAgo.getDate() : oneWeekAgo.getDate()}`;

    const dateRange = ref([oneWeekAgoFormatted, todayFormatted])

    let startDate = computed(()=>{
      let [year, month, day] = dateRange.value[0].split(".");
      return {
        "year": parseInt(year),
        "month": parseInt(month),
        "day": parseInt(day),
      };
    })

    let endDate = computed(()=>{
      let [year, month, day] = dateRange.value[1].split(".");
      return {
        "year": parseInt(year),
        "month": parseInt(month),
        "day": parseInt(day),
      };
    })

    async function getRecordId() {
      // console.log(dateRange.value)
      // console.log(startDate.value);
      let success = false
      let errMsg = ''
      await getHistoryRecordId(store.state.user.uid,props.type,startDate.value,endDate.value).then((res) => {
        // console.log(startDate.value)
        success = res.state
        errMsg = res.msg
        listIds.splice(0, listIds.length)
        if (res.state) {
          res.ids.forEach((id) => listIds.push(Number(id)));
          if (listIds.length > 0) {
            clickedId.value = listIds[0]
          }
        }
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    }

    onBeforeMount(() => {
      getRecordId()
    })

    // 保存三种模式的数据
    let writing = reactive({
      content: String,
      comment: {
        analysis: String,
        rating: Number
      }
    })
    let story = ref("")
    const wordList = ref([]);
    const realAnswers = ref([]);
    const usedWords = ref([])

    function showHisContent(id) {
      let errMsg = ''
      let success = false
      if (props.type === 0) {
        getWritingRecord(store.state.user.uid,id).then((res)=>{
          success = res.state
          errMsg = res.msg
          historyContent.value = res.content
          writing.comment.analysis = res.comment.analysis
          writing.comment.rating = res.comment.rating
          writing.content = res.content
        }).catch(err => errMsg = '网络错误').finally(() => {
          if (!success) {
            message.error(errMsg)
          }
        })
      }
      else if (props.type === 1) {
        getStoryRecord(store.state.user.uid,id).then((res)=>{
          success = res.state
          errMsg = res.msg
          historyContent.value = res.content
          story.value = res.content
        }).catch(err => errMsg = '网络错误').finally(() => {
          if (!success) {
            message.error(errMsg)
          }
        })
      }
      else {
        getBlankRecord(store.state.user.uid,id).then((res)=>{
          success = res.state
          errMsg = res.msg
          historyContent.value = res.content
          wordList.value = res.wordList
          realAnswers.value = res.answer
          usedWords.value = res.originWords
        }).catch(err => errMsg = '网络错误').finally(() => {
          if (!success) {
            message.error(errMsg)
          }
        })
      }
    }

    // 向父组件传递数据
    function handleConfirm() {
      if (props.type === 0) {
        emit("loadHistory",writing)
      }
      else if (props.type === 1) {
        emit("loadHistory",story.value)
      }
      else {
        emit("loadHistory",historyContent.value,wordList.value,realAnswers.value,usedWords.value)
      }
      showHistory.value = false
    }

    return {
      showHistory,
      handleClose,
      clickHistory,
      handleConfirm,
      getRecordId,
      historyContent,
      listIds,
      dateRange,
      bodyStyle: {
        width: "70%",
        height: "85vh",
      },
    }
  }
}
</script>

<style scoped>
.container {
  height: 95%;
  /*background-color: red;*/
}

.select-box {
  flex-direction: column;
  width: 100%;
  height: 90%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: blue;*/
}

.content-box {
  flex-direction: column;
  width: 100%;
  height: 90%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: blue;*/
}

.text-card {
  font-size: 20px;
  margin-left: 2vw;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 100%;
  width: 30vw;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: blue;*/
}

</style>