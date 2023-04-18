<template>
  <div class="InfoContainer">
    <n-space style="margin-left: 200px;margin-bottom: 20px">
      <div class="avatar-wrapper">
        <div>
          <img :src="showImage" style="height: 120px;width: 120px">
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
            label="打卡天数"
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
    <div style="margin-left: 200px;text-align: left">
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

        <n-form-item label="邮箱" path="email">
          <span class="text">{{model.email}}</span>
        </n-form-item>
        <n-form-item label="昵称" path="name">
          <n-input v-model:value="model.name" placeholder="昵称" class="text"/>
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
            <n-button round type="primary" ghost @click="modify" style="margin-right: 10px">修改密码</n-button>
            <n-button round type="primary" @click="onSubmit">保存</n-button>
          </div>

        </div>
      </n-form>
    </div>
    <n-modal
        v-model:show="showPwd"
        class="change-pwd"
        preset="card"
        :style="bodyStyle"
        title="修改密码"
        size="huge"
        :bordered="false"
    >
      <div style="margin-bottom: 30px">
        <n-form
          ref="pwdForm"
          :model="password"
          :rules="pwdRules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="原密码" path="oldPassword">
            <n-input
                type="password"
                show-password-on="click"
                v-model:value="password.oldPwd" placeholder="请输入原密码" />
          </n-form-item>
          <n-form-item label="新密码" path="newPassword">
            <n-input
                type="password"
                show-password-on="click"
                v-model:value="password.newPwd" placeholder="请输入新密码" />
          </n-form-item>
          <n-form-item label="确认密码" path="checkPassword">
            <n-input
                type="password"
                show-password-on="click"
                v-model:value="password.confirm" placeholder="请再次输入密码" />
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button style="margin-right: 10px" round @click="handleClose">
              取消
            </n-button>
            <n-button round type="primary" @click="handleConfirm">
              确认
            </n-button>
          </div>
        </n-form>
      </div>

    </n-modal>
  </div>
</template>

<script>

import {ref, reactive, onMounted, onUnmounted, onBeforeMount} from "vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import {useMessage} from "naive-ui"
import store from "@/store";
import router from "@/router";
import {changePassword, getInfo, getRecommendTags, submitAvatar, submitInfo} from "@/request/api/user";
import md5 from "js-md5";
import DynamicTags from "@/components/userInfo/DynamicTags";

export default ({
  name: "UserInfo",
  components: {DynamicTags},

  setup() {
    async function load() {
      await getInfo(store.state.user.uid).then((res)=>{
        let state = res.state
        if (state) {
          model.avatarPath = res.info.avatar_path;
          model.email = res.info.email;
          model.words = res.info.words;
          model.name = res.info.name;
          model.days = res.info.days;
          model.wordLists = res.info.lists;
          model.tags = res.info.tags;
          showImage.value = res.info.avatar_path;
        }
        else {
          msg.error(res.msg)
        }
      })
      getRecommendTags().then((res)=>{
        res.tags.forEach(tag => {
          serverRecommendedTags.value.push({name:tag, selected: false})
        })
      })
    }
    onBeforeMount(()=>{
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
      avatarPath:   null,
      email:        null,
      words:        null,
      name:         null,
      days:         null,
      wordLists:    null,
      tags:         [],
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
    let showImage = ref(null);

    let tmp='';
    async function getImageFile(e) {
      userAvatar.value = e.target.files[0];
      tmp=e.target.files[0];
      let img = new FileReader();
      img.readAsDataURL(userAvatar.value);
      // console.log("img:",img)
      img.onload = ({ target }) => {
        showImage.value = target.result; //将img转化为二进制数据
        // console.log(showImage.value)
      };
      await submitAvatar(tmp).then((res)=>{
        let success = res.state
        if (success) {
          showImage.value = res.url
        }
        else {
          msg.error(res.msg)
        }
      })
    }

    const msg = useMessage()

    async function onSubmit(){
      const imgFile = new FormData();
      imgFile.append('avatar', userAvatar.value);
      await submitInfo(store.state.user.uid,model).then((res)=>{
        let success = res.state
        if (!success) {
          msg.error(res.msg)
        }
      })
    }
    /* ********************** 上传相关逻辑 ******************/

    function logout() {
      store.state.user.login = false;
      router.push('/login/');
    }

    const showPwd = ref(false);

    function modify() {
      showPwd.value = true
    }

    const pwdForm = ref(null)
    const password = reactive({
      oldPwd: null,
      newPwd: null,
      confirm: null,
    })

    function handleClose() {
      showPwd.value = false
    }

    function handleConfirm() {
      if (password.newPwd !== password.confirm) {
        msg.error("两次密码不一致");
        return;
      }
      let format = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9~!@&%#_]{6,15}$/gi
      if(!format.test(password.newPwd)){
        msg.error('密码长度应在6-15位，且同时包含字母与数字')
        return;
      }
      const tempOld = md5(password.oldPwd);
      const tempNew = md5(password.newPwd);
      changePassword(store.state.user.uid,tempOld,tempNew).then((res)=>{
        let success = res.state
        if (success) {
          msg.success("修改成功")
        }
        else {
          msg.error(res.msg)
        }
      })
    }

    checkSelectedTags()

    return {
      handleConfirm,
      logout,
      handleClose,
      pwdForm,
      showPwd,
      password,
      addServerRecommendedTag,
      serverRecommendedTags,
      onSubmit,
      inputRef,
      showImage,
      getImageFile,
      userAvatar,
      avatarRef,
      formRef,
      numberAnimationInstRef,
      ArchiveIcon,
      store,
      model,
      modify,
      rules: {
        id: {
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
              value[value.length-1] = value[value.length-1].trim();
              const last = value[value.length-1];
              for (let i = 0;i<value.length-1;i++) {
                if (last === value[i]) {
                  value.pop();
                  return new Error("标签重复啦");
                }
              }
            }
            serverRecommendedTags.value.forEach(recommendedTag => {
              let flag = false;
              for (let i = 0;i<value.length;i++) {
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
      },
      pwdRules: {
        oldPassword: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入原密码",
        },
        newPassword: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入新密码"
        },
        checkPassword: {
          required: true,
          trigger: ["blur", "input"],
          message: "请再次输入密码"
        }
      },
      bodyStyle: {
        width: "50%"
      },
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

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 6%;
  margin-left: 16%;
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