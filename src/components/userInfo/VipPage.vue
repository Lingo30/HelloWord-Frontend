<template>
  <n-modal
      v-model:show="showVipPage"
      class="change-pwd"
      preset="card"
      :style="bodyStyle"
      title="获取会员"
      size="huge"
      :bordered="false">
    <n-space>
      <n-row>
        <n-col :span="8">
          <n-popover placement="top" trigger="hover">
            <template #trigger>
              <n-statistic label="今日背诵单词数量" :value="wordNum">
                <template #prefix>
                  <n-icon>
                    <BarChartOutline />
                  </n-icon>
                </template>
                <template #suffix>
                  / {{wordTar}}
                </template>
              </n-statistic>
            </template>
            <span>背诵100个单词可获得今日会员</span>
          </n-popover>
          <n-progress type="dashboard" gap-position="bottom" :percentage="wordPer" />
        </n-col>

        <n-col :span="8">
          <n-popover placement="top" trigger="hover">
            <template #trigger>
              <n-statistic label="本月打卡天数" :value="dayNum">
                <template #prefix>
                  <n-icon>
                    <CalendarNumberOutline/>
                  </n-icon>
                </template>
                <template #suffix>
                  / {{dayTar}}
                </template>
              </n-statistic>
            </template>
            <span>本月打卡满十天可获得7天会员</span>
          </n-popover>
          <n-progress type="dashboard" gap-position="bottom" :percentage="dayPer" />
        </n-col>

        <n-col :span="8">
          <n-popover placement="top" trigger="hover">
            <template #trigger>
              <n-statistic label="邀请好友" :value="friendsNum">
                <template #prefix>
                  <n-icon>
                    <ChatbubbleOutline/>
                  </n-icon>
                </template>
              </n-statistic>
            </template>
            <span>每邀请一位好友获得3天会员</span>
          </n-popover>
          <div style="margin-top: 5vh;font-size: 15px">
            点击复制邀请码:
            <n-button :bordered="false" style="font-size: 30px" @click="copyToClipboard">
              {{inviteCode}}
            </n-button>
          </div>
        </n-col>
      </n-row>

    </n-space>
  </n-modal>
</template>

<script>
import {NModal, NProgress, NRow, NCol, NStatistic, NIcon, NButton, NPopover, useMessage} from "naive-ui";
import {computed, ref} from "vue";
import {BarChartOutline,CalendarNumberOutline,ChatbubbleOutline} from "@vicons/ionicons5";

export default {
  name: "VipPage",
  components: {
    NModal,
    NPopover,
    NIcon,
    NProgress,
    ChatbubbleOutline,
    BarChartOutline,
    NButton,
    NRow,
    NCol,
    NStatistic,
    CalendarNumberOutline,
  },
  setup() {
    const showVipPage = ref(false)
    const wordNum = ref(50)
    const dayNum = ref(3)
    const friendsNum = ref(10)
    const wordTar = 100
    const dayTar = 10
    const wordPer = computed(()=>{
      return wordNum.value / wordTar * 100
    })
    const dayPer = computed(()=>{
      return dayNum.value / dayTar * 100
    })
    const inviteCode = ref("123456")
    const msg = useMessage()

    // todo mount前获取后端数据

    // 复制邀请码
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(inviteCode.value)
        msg.success("复制成功！")
      } catch (err) {
        console.log('无法复制邀请码', err)
      }
    }
    return {
      wordNum,
      dayNum,
      wordTar,
      dayTar,
      friendsNum,
      showVipPage,
      wordPer,
      dayPer,
      inviteCode,
      copyToClipboard,
      bodyStyle: {
        width: "60%"
      },
    }
  }
}
</script>

<style scoped>

</style>