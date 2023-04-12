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
          :closable="editFlag"
          @close="handleClose"
          hoverable
      >
        <template #header>
          <div class="head">
            <n-input
                v-if="editFlag"
                v-model:value="newName"
                :bordered="false"
                @blur="updateName(listId,newName)"
                class="edit-font-color"/>
            <n-text v-else class="font-color">
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
import {onMounted, reactive, ref} from "vue";
import {getListInfo} from "@/request/api/wordlist";

export default {
  name: "WordListCard",
  props: {
    listId: Number,
    colorIdx: Number,
    editFlag: Boolean,
  },
  emits: ['handleClick', 'handleClose', 'updateName'],
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
      name: '四级',
      num: 25,
      creator: 'official',
      date: {
        month: 'Apr',
        day: '08'
      }
    })
    let newName = ref(info.name)

    function handleClick() {
      if (props.editFlag) return
      emit('handleClick', props.listId, info.num)
    }

    function handleClose() {
      emit('handleClose', props.listId)
    }

    function updateName(listId, name) {
      emit('updateName', listId, name)
    }

    onMounted(() => {
      //TODO 根据 listId获取词单基本信息，并赋值给info
      // getListInfo(props.listId).then((res) => {
      //   info.name = res.name
      //   info.num = res.num
      //   info.creator = res.creator
      //   info.date = res.date
      // });
    })

    return {
      AccessibilityOutline,
      bgColor,
      info,
      newName,

      handleClick,
      handleClose,
      updateName,
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

.edit-font-color {
  background-color: transparent;
  font-size: 1em;
  color: white;
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
  text-align: left;
}

.icon {
  margin-right: 5px;
}
</style>