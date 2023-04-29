<template>
  <n-notification-provider placement="top">
    <n-dialog-provider>
      <n-message-provider>
        <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
          <router-view></router-view>
        </n-config-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-notification-provider>
</template>

<script>
import {NNotificationProvider, NDialogProvider, NMessageProvider, NConfigProvider, dateZhCN, zhCN} from 'naive-ui'

export default {
  name: 'App',
  components: {
    NNotificationProvider,
    NConfigProvider,
    NMessageProvider,
    NDialogProvider
  },
  setup() {
    return {
      dateZhCN,
      zhCN
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
