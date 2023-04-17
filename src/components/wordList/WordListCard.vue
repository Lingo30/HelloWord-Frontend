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
          :class="clicked?'card-clicked':''"
          :closable="editFlag"
          @close="handleClose"
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
            <div class="creator">
              <n-icon class="icon" size="20" :component="AccessibilityOutline"/>
              <n-text class="font-color">
                {{ info.creator }}
              </n-text>
            </div>
            <div style="display: flex;justify-content: space-between">
              <!--            进度条-->
              <n-progress
                  style="width: 80%"
                  :percentage="Math.floor(info.learned*10000/info.num)/100"
                  :status="info.num!==info.learned?'default':'success'"
                  :indicator-placement="'inside'"
              />
              <n-icon-wrapper v-if="store.state.user.selectWordlist === listId" :size="16" :border-radius="10">
                <n-icon :size="14" :component="Checkmark16Filled"/>
              </n-icon-wrapper>
            </div>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<script>
import {NCard, NText, NIcon} from 'naive-ui'
import {AccessibilityOutline} from '@vicons/ionicons5'
import Checkmark16Filled from "@vicons/fluent/Checkmark16Filled";
import {onMounted, reactive, ref} from "vue";
import {getUserWordlistInfo} from "@/request/api/wordlist";
import store from "@/store";

export default {
  name: "WordListCard",
  props: {
    listId: Number,
    colorIdx: Number,
    editFlag: Boolean,
    clicked: Boolean,
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
      name: '',
      num: 10000000,
      learned: 9999999,
      creator: '',
      date: {
        month: '',
        day: ''
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
      // 根据 listId获取用户词单的基本信息
      getUserWordlistInfo(props.listId).then((res) => {
        info.name = res.name
        info.num = res.num
        info.learned = res.learned
        info.creator = res.creator
        info.date = res.date
      });
    })

    return {
      AccessibilityOutline,
      Checkmark16Filled,
      bgColor,
      info,
      newName,
      store,

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