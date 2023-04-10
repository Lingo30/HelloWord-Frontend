<template>
  <div style="display: flex; width: 400px">
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
          hoverable
      >
        <template #header>
          <div class="head">
            <n-text class="font-color">
              {{ info.name }}
            </n-text>
          </div>
        </template>
        <template #header-extra>
          <n-text class="font-color">
            {{ info.num + ' Items' }}
          </n-text>
        </template>
        <template #footer>
          <div class="foot">
            <n-icon class="icon" size="20" :component="AccessibilityOutline"/>
            <n-text class="font-color">
              {{ info.creator }}
            </n-text>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<script>
import {NCard, NText, NIcon} from 'naive-ui'
import {AccessibilityOutline} from '@vicons/ionicons5'
import {onMounted, reactive} from "vue";
// import {getListInfo} from "@/request/api/wordlist";

export default {
  name: "WordListCard",
  props: {
    listId: Number,
    colorIdx: Number,
  },
  emits: ['handleClick'],
  components: {
    NCard,
    NText,
    NIcon
  },
  setup(props, {emit}) {
    const bgColor = [
      'rgba(105, 142, 250, 1)',
      'rgba(24, 204, 186, 1)',
      'rgba(255, 210, 22, 1)',
      // TODO 其他颜色
    ]

    let info = reactive({
      name: '',
      num: '',
      creator: '',
      date: {
        month: '',
        day: ''
      }
    })

    function handleClick() {
      emit('handleClick', props.listId)
    }

    onMounted(() => {
      //TODO 根据 listId获取词单基本信息，并赋值给info
      // getListInfo(props.listId).then((res)=>{
      //
      // })
    })

    return {
      AccessibilityOutline,
      bgColor,
      info,
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
  background-color: rgba(24, 204, 255, 0.5);
}

.font-color {
  color: white;
  opacity: 1;
}

.head {
  text-align: left;
  font-size: 2em;
}

.foot {
  text-align: left;
}

.icon {
  margin-right: 5px;
}
</style>