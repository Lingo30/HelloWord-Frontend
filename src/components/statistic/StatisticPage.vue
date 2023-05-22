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
                    今日新学/今日复习
                  </span>
                </template>
                <template #prefix>
                  98
                </template>
                <template #suffix>
                  23
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic>
                <template #label>
                  <span style="color: black">
                    今日学习时长
                  </span>
                </template>
                111
                <template #suffix>
                  min
                </template>
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
              {{
                calendarData[year + '-' + month + '-' + date]['new']
                + calendarData[year + '-' + month + '-' + date]['old']
              }}
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
import { onMounted, ref } from "vue";
import { addDays, isYesterday } from "date-fns/esm";
import * as echarts from 'echarts';
import { NRow, NCol, NStatistic, NCalendar } from "naive-ui";

export default {
  name: "StatisticPage",
  components: {
    NRow,
    NCol,
    NStatistic,
    NCalendar
  },
  setup() {
    const chartRef = ref();
    const chartData = {
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
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    const calendarData = {
      "2023-4-9": { 'new': 2, 'old': 5 },
      "2023-4-10": { 'new': 3, 'old': 1 },
      "2023-5-10": { 'new': 30, 'old': 21 },
    }

    onMounted(() => {
      const myChart = echarts.init(chartRef.value);
      myChart.setOption(chartData);
    })
    let aa = { year: 1, month: 2 }

    return {
      value: ref(addDays(Date.now(), 1).valueOf()),//当前日期
      chartRef,
      calendarData,
      handleUpdateValue(_, { year, month, date }) {
      },
      isDateDisabled(timestamp) {
        if (isYesterday(timestamp)) {
          return true;
        }
        return false;
      }
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