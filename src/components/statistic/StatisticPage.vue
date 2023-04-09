<template>
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
      <n-calendar
          class="calendar"
          v-model:value="value"
          :is-date-disabled="isDateDisabled"
          @update:value="handleUpdateValue"
      >
        <!--        日期框内内容-->
        <template #default="{year, month, date}">
          <span v-if="calendarData[year+'-'+month+'-'+date]">
          {{
              calendarData[year + '-' + month + '-' + date]['new']
            }}/{{ calendarData[year + '-' + month + '-' + date]['old'] }}
          </span>
        </template>
        <!--        年月-->
        <template #header="{year, month}">

        </template>
      </n-calendar>
    </div>

  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {addDays, isYesterday} from "date-fns/esm";
import * as echarts from 'echarts';

export default {
  name: "StatisticPage",
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
      "2023-4-9": {'new': 2, 'old': 5},
      "2023-4-10": {'new': 3, 'old': 1},
    }

    onMounted(() => {
      const myChart = echarts.init(chartRef.value);
      myChart.setOption(chartData);
    })
    let aa = {year: 1, month: 2}

    return {
      value: ref(addDays(Date.now(), 1).valueOf()),//当前日期
      chartRef,
      calendarData,
      handleUpdateValue(_, {year, month, date}) {
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
.container {
  display: flex;
  overflow: auto;
}

.left {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*background-color: black;*/
  width: 700px;
  /*height: 700px;*/
}

.table {
  /*background-color: blue;*/
  margin-top: 100px;
  height: 100px;
}

.chart {
  /*background-color: black;*/
  height: 500px;
  width: 700px;
}

.calendar {
  margin-top: 200px;
  /*background-color: black;*/
  display: flex;
  height: 450px;
  width: 650px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>