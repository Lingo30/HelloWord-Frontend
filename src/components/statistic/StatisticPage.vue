<template>
  <div class="class_table">
    <div class="container">
      <div class="left">
        <!--      当日数据（今日数据）-->
        <div class="table">
          <n-row>
            <n-col :span="12">
              <n-statistic :value="' / '">
                <template #label>
                  <span style="color: black">
                    今日学习 / 今日目标
                  </span>
                </template>
                <template #prefix>
                  {{ today_num }}
                </template>
                <template #suffix>
                  {{ today_target }}
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic>
                <template #label>
                  <span style="color: black">
                    本周学习单词
                  </span>
                </template>
                {{ week_num }}
              </n-statistic>
            </n-col>
          </n-row>
        </div>
        <!--      图表展示-->
        <div class="chart" ref="chartRef"></div>
      </div>
      <div>
        <n-calendar class="calendar" v-model:value="value" :is-date-disabled="isDateDisabled"
          @update:value="handleUpdateValue">
          <!--        日期框内内容-->
          <template #default="{ year, month, date }">
            <span v-if="calendarData[year + '-' + month + '-' + date]" style="color: rgba(52,104,242, 0.8); 
            font-size: large; font-weight: 600;">
              {{ calendarData[year + '-' + month + '-' + date] }}
            </span>
          </template>
          <!--        年月-->
          <template #header="{ year, month }">

          </template>

        </n-calendar>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { addDays, isYesterday } from "date-fns/esm";
import * as echarts from 'echarts';
import { NRow, NCol, NStatistic, NCalendar, NButton, useMessage} from "naive-ui";
import { get_user_statistic } from "@/request/api/learn";
import store from "@/store";

export default {
  name: "StatisticPage",
  components: {
    NRow,
    NCol,
    NStatistic,
    NCalendar,
    NButton,
    useMessage,
  },
  setup() {
    const chartRef = ref();
    var week_data = ref([0, 0, 0, 0, 0, 70, 0])
    let today_num = ref(0)
    let today_target = ref(0)
    let week_num = ref(0)
    const chartData = reactive({
      backgroundColor: '',
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: week_data,
          type: 'line'
        }
      ]
    });
    let calendarData = reactive({
      // "2023-5-1": 50,
    })
    const message = useMessage()

    onMounted(() => {
      let success = false
      let errMsg = ''
      get_user_statistic(store.state.user.uid).then((res) => {
        success = res.state
        errMsg = res.msg
        today_num.value = res.today_num
        today_target.value = res.today_target
        week_num.value = res.week_num
        week_data = res.week_data
        let history_date = res.history_date
        let history_num = res.history_num
        for (let i = 0; i < history_date.length; i++) {
          calendarData[history_date[i]] = history_num[i]
        }
        const myChart = echarts.init(chartRef.value);
        chartData.series[0].data = week_data
        myChart.setOption(chartData);
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          this.message.error(errMsg)
        }
      });
    })
    let aa = { year: 1, month: 2 }

    function test(params) {

    }


    return {
      value: ref(addDays(Date.now(), 1).valueOf()),//当前日期
      today_num,
      today_target,
      week_num,
      chartRef,
      calendarData,
      handleUpdateValue(_, { year, month, date }) {

      },
      isDateDisabled(timestamp) {
        // if (isYesterday(timestamp)) {
        //   return true;
        // }
        return false;
      },
      test,
    };
  }
}
</script>

<style scoped>
.class_table {
  position: absolute;
  width: 90%;
  height: 80%;
  top: 50%;
  left: 53%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 10px 12px 16px 10px rgba(0, 0, 0, 0.24), 10px 17px 50px 10px #4E655D;
  max-width: 1600px;
  max-height: 750px;
}

.container {
  display: flex;
  overflow: auto;
  /* background-color: aliceblue; */
}

.left {
  /*display: flex;*/
  /*flex-direction: column;*/
  /* background-color: black; */
  width: 50%;
  /*height: 700px;*/
}

.table {
  /*background-color: blue;*/
  margin-top: 50px;
  height: 80px;
}

.chart {
  /*background-color: black;*/
  height: 450px;
  width: 600px;
  /* background-color: rgba(255, 255, 255, 0.25); */
}

.calendar {
  margin-top: 100px;
  /*background-color: black;*/
  display: flex;
  height: 450px;
  width: 600px;
  margin-left: 20px;
  margin-right: 20px;
  /* background-color: rgba(38, 164, 116, 0.75); */
  border-radius: 10px;
  padding: 15px;
}
</style>