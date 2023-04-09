<template>
  <div class="container">
    <div style="width: 50%">
      <!--      当日数据（今日数据）-->
      <div>

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
    // const message = useMessage();
    return {
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue(_, {year, month, date}) {
        // message.success(`${year}-${month}-${date}`);
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