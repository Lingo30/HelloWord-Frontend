<template>
  <div class="container">
    <div style="width: 50%">
      <!--      当日数据（今日数据）-->
      <div>
        <n-row>
          <n-col :span="12">
            <n-statistic style="" :value="' / '">
              <template #label>
                <span style="color: black">
                  今日新学/今日复习
                </span>
              </template>
              <template #prefix>
                98(新学单词数)
              </template>
              <template #suffix>
                23(复习单词数)
              </template>
            </n-statistic>
          </n-col>
          <n-col :span="12">
            <n-statistic label="">
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
      <div>

      </div>
    </div>
    <div class="calendar">
      <n-calendar
          style="width: 100%;height: 100%"
          v-model:value="value"
          #="{ year, month, date }"
          :is-date-disabled="isDateDisabled"
          @update:value="handleUpdateValue"
      >
      </n-calendar>
    </div>

  </div>
</template>

<script>
import {ref} from "vue";
import {addDays, isYesterday} from "date-fns/esm";

export default {
  name: "StatisticPage",
  setup() {
    return {
      value: ref(addDays(Date.now(), 1).valueOf()),
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
  background-color: #2c3e50;
  display: flex;
  align-items: center;
}

.calendar {
  height: 50%;
  width: 50%;
  margin-left: 20px;
  margin-right: 20px;
  /*background-color: black;*/
}
</style>