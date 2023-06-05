<template>
  <div class="InfoContainer">
    <div class="head">
      <n-space style="justify-content: center;
                      align-items: center;
                      margin: auto">
        <div class="avatar-wrapper">
          <div>
            <n-image style="border-radius: 25px" :src="model.avatarPath" width="50" height="50"></n-image>
          </div>
          <div class="file-upload">
            <n-button round type="primary" ghost class="upload-button">上传头像</n-button>
            <input
                ref="inputRef"
                type="file"
                accept="image/jpeg,image/png"
                @change="getImageFile"
                id="img"
                style="width: 150px"
                class="file-input"
            />
          </div>
        </div>
        <div class="DigitalInfo">
          <n-statistic
              label="累积学过单词"
              tabular-nums
              class="statistic"
              style="margin-left: 5px"
          >
            <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="model.words"
                duration="1000"
            />
            <template #suffix>
            </template>
          </n-statistic>
          <n-statistic
              label="本月打卡天数"
              tabular-nums
              class="statistic"
          >
            <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="model.days"
                duration="1000"
            />
            <template #suffix>
            </template>
          </n-statistic>
          <n-statistic
              label="已学完单词书"
              tabular-nums
              class="statistic"
          >
            <n-number-animation
                ref="numberAnimationInstRef"
                :from="0"
                :to="model.wordLists"
                duration="1000"
            />
            <template #suffix>
            </template>
          </n-statistic>
        </div>
      </n-space>
    </div>
    <div class="content">
      <div style="text-align: left">
        <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
            size="medium"
            :style="{
      maxWidth: '640px',
    }"
        >
          <n-form-item label="会员时间" path="vip">
            <span style="font-variant-numeric: tabular-nums">
              <n-countdown :duration="lastTime" active/>
              <n-button :bordered="false" ghost color="#787b0d" @click="handleVip">点击免费加时</n-button>
            </span>
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <span class="text">{{ model.email }}</span>
          </n-form-item>
          <n-form-item label="昵称" path="name">
            <n-input v-model:value="model.name" placeholder="昵称" class="text" maxlength="15"/>
          </n-form-item>
          <n-form-item label="我的偏好" path="tags">
            <dynamic-tags type="success" v-model:value="model.tags" :max="10"></dynamic-tags>
          </n-form-item>
          <n-form-item label="热门标签">
            <div>
              <n-tag
                  class="tag"
                  v-for="(tag, index) in serverRecommendedTags"
                  :key="index"
                  :checked="tag.selected"
                  type="warning"
                  checkable
                  @update:checked="addServerRecommendedTag(index)"
              >
                {{ tag.name }}
              </n-tag>
            </div>
          </n-form-item>
          <div class="btn-box">
            <n-button class="logout-btn" round type="error" ghost @click="logout">退出登录</n-button>
            <div class="right-btns">
              <n-button round type="info" ghost @click="modify" style="margin-right: 10px">修改密码</n-button>
              <n-button round type="info" @click="onSubmit">保存</n-button>
            </div>

          </div>
        </n-form>
      </div>
      <ChangePassword ref="changePwd"></ChangePassword>
      <VipPage ref="vipRef"></VipPage>
    </div>
  </div>
</template>

<script>

import {ref, reactive, onMounted, onUnmounted, onBeforeMount} from "vue";
import {ArchiveOutline as ArchiveIcon} from "@vicons/ionicons5";
import {
  NSpace,
  NImage,
  NButton,
  NStatistic,
  NNumberAnimation,
  NForm,
  NFormItem,
  NInput,
  NTag,
  NCountdown,
  useMessage
} from "naive-ui"
import store from "@/store";
import router from "@/router";
import {getInfo, getRecommendTags, logoutAPI, submitAvatar, submitInfo} from "@/request/api/user";
import DynamicTags from "@/components/userInfo/DynamicTags";
import ChangePassword from "@/components/userInfo/ChangePassword";
import {TOKEN, USERID} from "@/store/local";
import cookie from "@/store/cookie";
import VipPage from "@/components/userInfo/VipPage";

export default ({
  name: "UserInfo",
  components: {
    NSpace,
    NImage,
    NCountdown,
    NButton,
    NStatistic,
    NNumberAnimation,
    NForm,
    NFormItem,
    NInput,
    NTag,
    DynamicTags,
    ChangePassword,
    VipPage,
  },

  setup() {
    async function load() {
      await getInfo(store.state.user.uid).then((res) => {
        let state = res.state
        // console.log(res);
        if (state) {
          model.avatarPath = res.info.avatar_path;
          model.email = res.info.email;
          model.words = res.info.words;
          model.name = res.info.name;
          model.days = res.info.days;
          model.wordLists = res.info.lists;
          model.tags = res.info.tags;
          lastTime.value = res.info.last_time * 1000
        } else {
          msg.error(res.msg)
        }
      }).catch((err) => {
        msg.error('网络错误')
      })
      getRecommendTags().then((res) => {
        res.tags.forEach(tag => {
          serverRecommendedTags.value.push({name: tag, selected: false})
        })
      }).catch()
    }

    onBeforeMount(() => {
      load()
    })
    // 手动创建和清除 ResizeObserver 避免ResizeObserver 回调函数的循环嵌套
    let resizeObserver = null;
    let inputRef = ref(null);

    onMounted(() => {
      resizeObserver = new ResizeObserver(() => {
        // handle size changes here
      });
      resizeObserver.observe(inputRef.value);
    });

    onUnmounted(() => {
      resizeObserver.disconnect();
    });

    const avatarRef = ref(null);
    const formRef = ref(null);
    // const message = useMessage();
    const numberAnimationInstRef = ref(null);
    const serverRecommendedTags = ref([]);

    const model = reactive({
      avatarPath: null,
      email: null,
      words: null,
      name: null,
      days: null,
      wordLists: null,
      tags: [],
    });

    /* ********************** 用户标签相关逻辑 ******************/
    // 检查是否在推荐标签中
    const checkSelectedTags = () => {
      model.tags.forEach(tag => {
        serverRecommendedTags.value.forEach(recommendedTag => {
          if (tag === recommendedTag.name) {
            recommendedTag.selected = true;
          }
        });
      });
    };

    const addServerRecommendedTag = (index) => {
      serverRecommendedTags.value[index].selected = !serverRecommendedTags.value[index].selected;
      if (serverRecommendedTags.value[index].selected && !model.tags.includes(serverRecommendedTags.value[index].name)) {
        model.tags.push(serverRecommendedTags.value[index].name);
      } else {
        const tagIndex = model.tags.findIndex(tag => tag === serverRecommendedTags.value[index].name);
        model.tags.splice(tagIndex, 1);
      }
      // console.log(model.tags)
    };

    /* ********************** 用户标签相关逻辑 ******************/

    /* ********************** 上传相关逻辑 ******************/
    let userAvatar = ref(null);

    let tmp = '';

    async function getImageFile(e) {
      userAvatar.value = e.target.files[0];
      tmp = e.target.files[0];
      // 检查文件类型
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(tmp.type)) {
        // 文件类型不允许，显示错误消息
        msg.error("仅支持 JPEG 和 PNG 格式的图片");
        return;
      }
      // 检查文件大小
      const maxSize = 1048576; // 1MB in bytes
      if (tmp.size > maxSize) {
        // 文件大小超过限制，显示错误消息
        msg.error("图片大小不能超过 1MB。");
        return;
      }
      let img = new FileReader();
      img.readAsDataURL(userAvatar.value);
      // console.log("img:",img)
      img.onload = () => {
        // console.log(showImage.value)
      };
      await submitAvatar(tmp, store.state.user.uid).then((res) => {
        let success = res.state
        // console.log(res);
        if (success) {
          model.avatarPath = res.url
        } else {
          msg.error(res.msg)
        }
      }).catch()
    }

    const msg = useMessage()

    async function onSubmit() {
      await submitInfo(store.state.user.uid, model).then((res) => {
        let success = res.state
        // console.log(res);
        if (success) {
          msg.success('修改成功')
        } else {
          msg.error(res.msg)
        }
      }).catch()
    }

    const changePwd = ref(null)

    function modify() {
      // console.log(changePwd.value.showPwd);
      changePwd.value.showPwd = true
    }

    /* ********************** 上传相关逻辑 ******************/

    function logout() {
      logoutAPI(store.state.user.uid).then(res => {
        let success = res.state
        if (success) {
          store.state.user.login = false;
          localStorage.removeItem(USERID);
          cookie.clearCookie(TOKEN)
          router.push({name: 'login'});
        } else {
          msg.error(res.msg)
        }
      }).catch(err => msg.error("网络错误"))

    }

    checkSelectedTags()

    // todo 获取信息时获取剩余时间
    const vipRef = ref(null)
    const lastTime = ref(null)

    function handleVip() {
      vipRef.value.showVipPage = true
    }

    return {
      logout,
      vipRef,
      handleVip,
      lastTime,
      modify,
      changePwd,
      addServerRecommendedTag,
      serverRecommendedTags,
      onSubmit,
      inputRef,
      getImageFile,
      userAvatar,
      avatarRef,
      formRef,
      numberAnimationInstRef,
      ArchiveIcon,
      store,
      model,
      rules: {
        vip: {
          required: false,
          trigger: ["blur", "input"],
        },
        email: {
          required: false,
          trigger: ["blur", "input"],
        },
        tags: {
          trigger: ["change"],
          validator(rule, value) {
            if (value.length !== 0) {
              value[value.length - 1] = value[value.length - 1].trim();
              const last = value[value.length - 1];
              for (let i = 0; i < value.length - 1; i++) {
                if (last === value[i]) {
                  value.pop();
                  return new Error("标签重复啦");
                }
              }
            }
            serverRecommendedTags.value.forEach(recommendedTag => {
              let flag = false;
              for (let i = 0; i < value.length; i++) {
                if (value[i] === recommendedTag.name) {
                  recommendedTag.selected = true;
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                recommendedTag.selected = false;
              }
            });

            if (value.length > 10)
              return new Error("最多设置十个标签");
            return true;
          }
        },
        name: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入昵称"
        },
        profile: {
          required: false,
          trigger: ["blur", "input"],
        },
      }
    };
  }
});
</script>

<style scoped>
.statistic {
  min-width: 160px;
  margin-right: 30px;
  text-align: center;
}

.head {
  top: 10%;
  width: 90%;
  margin: auto;
  margin-top: 3%;
  height: 25%;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  overflow: auto;
  height: 60%;
  margin: auto;
  margin-top: 3%;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.DigitalInfo {
  display: flex;
  align-items: center;
  min-height: 150px;
}

.file-upload {
  position: relative;
  display: inline-block;
}

.upload-button {
  display: inline-block;
  cursor: pointer;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.InfoContainer {
  position: absolute;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 10px 12px 16px 10px rgba(0, 0, 0, 0.24), 10px 17px 50px 10px #4E655D;

}

.text {
  font-size: 14px;
  width: 500vh;
}

.tag {
  margin-right: 5px;
}

.btn-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.btn-box > .right-btns {
  margin-left: auto;
}

.right-btns > *:not(:last-child) {
  margin-right: 10px;
}

</style>
