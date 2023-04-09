<template>
  <div class="container">
    <div style="width: 50%">
      <!--      当日数据（今日数据）-->
      <div style="">
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
    <div class="calendar">
      <n-calendar
          style="width: 100%;height: 100%"
          v-model:value="value"
          :is-date-disabled="isDateDisabled"
          @update:value="handleUpdateValue"
      >
        <!--        日期框内内容-->
        <template #default="{year, month, date}">
          <span v-if="calendarData[year+'-'+month+'-'+date]">
          {{ calendarData[year + '-' + month + '-' + date]['new'] }}/{{ calendarData[year + '-' + month + '-' + date]['old'] }}
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
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
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
  align-items: center;
}

.chart {
  height: 500px;
}

.calendar {
  height: 50%;
  width: 50%;
  margin-left: 20px;
  margin-right: 20px;
  /*background-color: black;*/
}
</style>