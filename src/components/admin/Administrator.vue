<template>
  <div style="padding: 50px">
    管理员界面
    <n-button @click="fresh">
      fresh
    </n-button>
    <!--    消息发送-->
    <n-space vertical>
      消息发送
      <div style="display: flex;justify-content: left;width: 50%">
        <n-input v-model:value="sendMsgTitle" placeholder="标题" style="text-align: left"/>
      </div>
      <div style="display: flex; flex-direction: row;justify-content: space-between">
        <div style="display: flex; flex-direction: row;height: 30px">
          <n-input style="text-align: left" v-model:value="sendUserId" placeholder="用户id" :disabled="sendAll"/>
          <n-checkbox style="width: 100%;padding: 10px" v-model:checked="sendAll">全体发送</n-checkbox>
        </div>
        <n-button type="success" @click="sendMessage(sendMsg,title)" :disabled="!sendAll&&sendUserId===''">
          发送
        </n-button>
      </div>
      <n-input
          v-model:value="sendMsg"
          type="textarea"
          placeholder="发送内容"
          style="text-align: left"
      />
    </n-space>
    <n-divider/>

    <!--    查看反馈-->
    <div>
      查看反馈
      <n-select
          style="width: 25%"
          :value="feedbackFilter"
          :options="selectFeedbackOptions"
          @update:value="updateSelectFeedback"
      />
      <n-data-table
          ref="feedbackRef"
          :columns="columns"
          :data="feedbacks"
          :pagination="pagination"
          :bordered="false"
      />
    </div>
    <n-divider/>
    <!--    受理上传词单-->
    <div style="display: flex;flex-direction: column">
      审理上传词单
      <span style="display: flex">
        <n-checkbox v-model:checked="submitHandledHistoryFlag">
          查看历史审核
        </n-checkbox>
      </span>
      <n-list>
        <n-list-item v-for="list in showLists" :key="list.listId">
          <div style="display: flex;justify-content: space-between">
            {{ list.listName }}
            <n-button-group v-if="!submitHandledHistoryFlag">
              <n-button type="info" @click="showListDetail(list.userId,list.listId)">
                查看详情
              </n-button>
              <n-button type="success" @click="acceptWordlist(list)">
                通过
              </n-button>
              <n-button type="error" @click="rejectWordlist(list)">
                拒绝
              </n-button>
            </n-button-group>
            <n-text v-else>
              {{ list.handleMessage }}
            </n-text>
          </div>
        </n-list-item>
      </n-list>
      <n-pagination
          v-model:page="curPage"
          :page-count="pageNum"
          size="small"
          :page-slot="3"
          show-quick-jumper
      />
      <wordlist-detail ref="showDetailRef"/>
    </div>
  </div>
</template>

<script>
import {ref, h, reactive, computed, onMounted} from 'vue'
import {
  NDivider,
  NInput,
  NButton,
  NSpace,
  NCheckbox,
  NDataTable,
  NSelect,
  NList,
  NListItem,
  NButtonGroup,
  NPagination,
  useDialog,
  useMessage,
} from 'naive-ui'
import WordlistDetail from '@/components/admin/WordlistDetail.vue'
import {
  acceptSubmit,
  getSubmitOfficials,
  getUserFeedbacks,
  rejectSubmit,
  sendSpecialMessage,
  sendToAll
} from "@/request/api/admin";
import store from "@/store";
import {ACCEPT_SUBMIT_WORDLIST, REJECT_SUBMIT_WORDLIST} from "@/store/local";

export default {
  name: "Administrator",
  components: {
    NDivider,
    NInput,
    NButton,
    NSpace,
    NCheckbox,
    NDataTable,
    NSelect,
    NList,
    NListItem,
    NButtonGroup,
    NPagination,
    WordlistDetail,
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()

    const sendUserId = ref('')
    const sendMsg = ref('')
    const sendMsgTitle = ref('Re: Bug反馈')
    const sendAll = ref(false)

    const feedbackFilter = ref(0)//反馈过滤，默认为0（查看全部）
    const selectFeedbackOptions = [
      {label: '查看全部', value: 0}, {label: '查看已读', value: 1}, {label: '查看未读', value: 2}
    ]
    const feedbackRef = ref(null)
    const columns = [
      {
        title: "用户id",
        key: "uid"
      },
      {
        title: "内容",
        key: "content"
      },
      {
        title: "类型",
        key: "type"
      },
      {
        title: "相关模块",
        key: "module"
      },
      {
        title: "处理方式",
        key: "action",
        defaultFilterOptionValues: ['unRead', 'read'],
        filter(value, row) {
          return row.state === value
        },
        render(row) {
          return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                disabled: row.state !== 'unRead',
                onClick: () => {
                  row.state = 'read'
                  updateFeedbackTable(feedbackFilter.value)
                }
              },
              {
                default: () =>
                    row.state === 'unRead' ? "标记已读" : '已读'
              }
          );
        }
      }
    ];
    const feedbacks = reactive([
      {uid: 3, content: "Wonderwall", type: "bug反馈", module: '单词背诵', state: 'unRead'},
      {uid: 4, content: "Don't Look Back in Anger", type: "bug反馈", module: '其他', state: 'read'},
      {uid: 12, content: "Champagne Supernova", type: "功能建议", module: '其他', state: 'unRead'}
    ]);
    const pagination = reactive({
      page: 1,
      pageSize: 5,
      showSizePicker: true,
      pageSizes: [5, 10],
      onChange: (page) => {
        pagination.page = page;
      },
      onUpdatePageSize: (pageSize) => {
        pagination.pageSize = pageSize;
        pagination.page = 1;
      }
    });

    //给用户发送消息
    function sendMessage(msg, title) {
      //TODO 发送接口
      let success = false
      let errMsg = ''
      if (sendAll.value) {
        sendToAll(store.state.admin.id, msg).then(res => {
          success = res.state
          errMsg = res.msg
        }).catch(err => errMsg = '网络错误').finally(() => {
          if (success) {
            message.success('发送成功')
          } else {
            message.error(errMsg)
          }
        })
      } else {
        sendSpecialMessage(store.state.admin.id, sendUserId.value, msg, title).then(res => {
          success = res.state
          errMsg = res.msg
        }).catch(err => errMsg = '网络错误').finally(() => {
          if (success) {
            message.success('发送成功')
          } else {
            message.error(errMsg)
          }
        })
      }
    }

    //获取所有用户反馈
    function getFeedBacks() {
      //TODO 获取所有反馈
      getUserFeedbacks().then(res => {
        feedbacks.splice(0, feedbacks.length)
        res.feedbacks.forEach(feedback => feedbacks.push(feedback))
      }).catch(err => {
      })
    }

    //更新过滤方式
    function updateSelectFeedback(value, option) {
      if (value !== feedbackFilter.value) {
        feedbackFilter.value = value
        updateFeedbackTable(value)
      }
    }

    //更新表格
    function updateFeedbackTable(filterType) {
      //根据feedbackFilter过滤
      if (filterType === 0) {
        feedbackRef.value.filter(null)
      } else if (filterType === 1) {
        feedbackRef.value.filter({action: 'read'})
      } else if (filterType === 2) {
        feedbackRef.value.filter({action: 'unRead'})
      }
    }

    const lists = reactive([
      {
        userId: 11,
        listId: 0,
        listName: 'aaa',
        handleState: 0,//0：未处理 1：批准 2：拒绝
        handleMessage: '',//批准或拒绝时的意见
      },
      {
        userId: 11,
        listId: 1,
        listName: 'bbb',
        handleState: 1,
        handleMessage: '批准',
      }
    ])
    const submitHandledHistoryFlag = ref(false)//是否查看历史处理记录
    const filterLists = computed(() => {
      if (submitHandledHistoryFlag.value) {
        return lists.filter(list => list.handleState !== 0)
      } else {
        return lists.filter(list => list.handleState === 0)
      }
    })//正在查看的所有处理记录（分页前）
    const curPage = ref(1)
    const pageSize = 5
    let pageNum = computed(() => {
      return Math.ceil(filterLists.value.length / pageSize)
    })
    let showLists = computed(() => {
      return filterLists.value.slice(pageSize * (curPage.value - 1), Math.min(curPage.value * pageSize, lists.length))
    })

    const showDetailRef = ref(null)

    //获取未审核的词单
    function getLists() {
      //todo
      getSubmitOfficials().then(res => {
        lists.splice(0, lists.length)
        res.lists.forEach(list => lists.push(list))
      }).catch(err => {
      })
    }

    //弹出词单详情的模态框
    function showListDetail(userId, listId) {
      showDetailRef.value.init(userId, listId)
    }

    function acceptWordlist(list) {
      //TODO
      let success = false
      let errMsg = ''
      acceptSubmit(store.state.admin.id, list.listId).then(res => {
        success = res.state
        errMsg = res.msg
      }).catch(err => errMsg = '网络错误').finally(() => {
        if (success) {
          message.success('审核成功')
          list.handleState = ACCEPT_SUBMIT_WORDLIST
        } else {
          message.error(errMsg)
        }
      })
    }

    //是否允许成为官方词单
    function rejectWordlist(list) {
      //todo
      const msg = ref('')
      dialog.info({
        title: '不通过原因',
        content: () => h(NInput,
            {
              value: msg,
              onInput: val => msg.value = val,
            }
        ),
        action: () => h(NButton,
            {
              onClick() {
                let success = false
                let errMsg = ''
                rejectSubmit(store.state.admin.id, list.listId, msg.value).then(res => {
                  success = res.state
                  errMsg = res.msg
                }).catch(err => errMsg = '网络错误').finally(() => {
                  if (success) {
                    message.success('审核成功')
                    list.handleState = REJECT_SUBMIT_WORDLIST
                  } else {
                    message.error(errMsg)
                  }
                })
              }
            },
            {
              default: '确认'
            }
        )
      })
    }

    onMounted(() => {
      getFeedBacks()
      getLists()
    })

    return {
      sendUserId,
      sendMsg,
      sendMsgTitle,
      sendAll,

      feedbackFilter,
      selectFeedbackOptions,
      feedbackRef,
      columns,
      feedbacks,
      pagination,

      curPage,
      pageNum,
      showLists,
      showDetailRef,
      submitHandledHistoryFlag,

      sendMessage,
      updateSelectFeedback,
      showListDetail,
      acceptWordlist,
      rejectWordlist,
      fresh() {
        getFeedBacks()
        getLists()
      },
    }
  }
}
</script>

<style scoped>

</style>