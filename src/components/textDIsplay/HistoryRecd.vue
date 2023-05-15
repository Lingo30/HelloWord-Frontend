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
        <n-date-picker v-model:formatted-value="dateRange" value-format="yyyy.MM.dd" type="daterange"/>
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
import {reactive, ref} from "vue";
import {NModal, NButton,NDatePicker,NSpace,NScrollbar} from "naive-ui";
import HistoryCard from "@/components/textDIsplay/HistoryCard";

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
  setup(props) {
    let showHistory = ref(false);
    const listIds = reactive([1, 2, 3, 4, 5, 6, 7, 8])
    const historyContent = ref("ffffffff")

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


    function showHisContent(id) {
      // TODO 从后端获取
      // console.log(type);
      historyContent.value = id+" "+props.type+"We dosafjdlaskjga" +
          "sadlfjlasdfasjlfdjaslgaslgj" +
          "" +
          "dfslajkdfsalfjasldfjasldkjf" +
          "fsdlkfjsfdlsdjfslfkjsdfjsldfs" +
          "fagjalgfgafg      dafsdfasdfa" +
          "asdfffffffffffffffffffffffffffff" +
          "fffffffffffffffffffffff" +
          "ffffffffffffffffffffff" +"We dosafjdlaskjga" +
          "sadlfjlasdfasjlfdjaslgaslgj" +
          "" +
          "dfslajkdfsalfjasldfjasldkjf" +
          "fsdlkfjsfdlsdjfslfkjsdfjsldfs" +
          "fagjalgfgafg      dafsdfasdfa" +
          "asdfffffffffffffffffffffffffffff" +
          "fffffffffffffffffffffff" +
          "ffffffffffffffffffffff"+"We dosafjdlaskjga" +
          "sadlfjlasdfasjlfdjaslgaslgj" +
          "" +
          "dfslajkdfsalfjasldfjasldkjf" +
          "fsdlkfjsfdlsdjfslfkjsdfjsldfs" +
          "fagjalgfgafg      dafsdfasdfa" +
          "asdfffffffffffffffffffffffffffff" +
          "fffffffffffffffffffffff" +
          "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
      // console.log(historyContent.value);
    }

    return {
      showHistory,
      handleClose,
      clickHistory,
      historyContent,
      listIds,
      dateRange: ref([oneWeekAgoFormatted, todayFormatted]),
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
  height: 63%;
  /*background-color: blue;*/
}

.select-box {
  flex-direction: column;
  width: 100%;
  height: 60%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-color: blue;*/
}

.content-box {
  flex-direction: column;
  width: 100%;
  height: 60%;
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