<template>
  <div style="display: flex; width: 100%; height: 90%;">
    <div class="left">
      <n-text class="date">
        {{ info.date.day }}
      </n-text>
      <n-text class="month">
        {{ info.date.month }}
      </n-text>
    </div>
    <div class="right">
      <n-card
          @click="handleClick"
          :style="{backgroundColor:bgColor[colorIdx%bgColor.length]}"
          class="card"
          :class="clicked?'card-clicked':''"
      >
        {{trimmedContent}}
      </n-card>
    </div>
  </div>
</template>

<script>
import {NCard, NText, useMessage} from 'naive-ui'
import {AccessibilityOutline} from '@vicons/ionicons5'
import Checkmark16Filled from "@vicons/fluent/Checkmark16Filled";
import {computed, onBeforeMount, reactive, ref} from "vue";
import store from "@/store";
import {getRecordInfo} from "@/request/api/review";

export default {
  name: "HistoryCard",
  props: {
    listId: Number,
    type:Number,
    colorIdx: Number,
    clicked: Boolean,
  },
  emits: ['handleClick'],
  components: {
    NCard,
    NText,
  },
  setup(props, {emit}) {
    const message = useMessage()
    const bgColor = [
      'rgba(105, 142, 250, 1)',
      'rgba(24, 204, 186, 1)',
      'rgba(255, 210, 22, 1)',
      // TODO 其他颜色
    ]

    let info = reactive({
      content:'',
      date: {
        month: '',
        day: ''
      }
    })
    let newName = ref('')


    function handleClick() {
      emit('handleClick', props.listId)
    }

    onBeforeMount(async () => {
      let errMsg = ''
      let success = false
      await getRecordInfo(store.state.user.uid, props.type, props.listId).then((res) => {
        success = res.state
        errMsg = res.msg
        info.content = res.content
        info.date = res.date
        if (props.clicked) {
          handleClick()
        }
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (!success) {
          message.error(errMsg)
        }
      })
    })

    // 字符超过38省略
    let trimmedContent = computed(() => {
      const maxLen = 38
      return info.content.length > maxLen ? info.content.slice(0, maxLen) + '...' : info.content;
    });

    return {
      AccessibilityOutline,
      Checkmark16Filled,
      trimmedContent,
      bgColor,
      info,
      newName,
      store,

      handleClick,
    }
  }
}
</script>

<style scoped>
.date {
  font-size: 2em;
}

.month {
  font-size: 1em;
}

.left {
  flex-direction: column;
  width: 10%;
  padding: 10px;
  display: flex;
  align-items: center;
}

.right {
  width: 80%;
  padding: 10px;
  display: flex;
  align-items: center;
}

.card {
  border-radius: 10px;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

.card-clicked {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

.edit-font-color {
  background-color: transparent;
  font-size: 1em;
  color: white;
}

.ellipsis {
  /*设置省略输出*/
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.font-color {
  color: white;
  opacity: 1;
}

.head {
  text-align: left;
  font-size: 1.5em;
}

.foot {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.creator {
  /*text-align: left;*/
}

.icon {
  margin-right: 5px;
}
</style>
