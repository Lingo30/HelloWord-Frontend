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

        <n-form-item label="用户ID" path="id">
          <n-input v-model:value="model.id" placeholder="用户名" disabled/>
        </n-form-item>
        <n-form-item label="用户邮箱" path="email">
          <n-input v-model:value="model.email" placeholder="用户邮箱" disabled/>
        </n-form-item>
        <n-form-item label="昵称" path="name">
          <n-input v-model:value="model.name" placeholder="昵称"/>
        </n-form-item>
        <n-form-item label="个人简介" path="profile">
          <n-input
              v-model:value="model.profile"
              placeholder="个人简介"
              type="textarea"
              :autosize="{
          minRows: 5,
          maxRows: 5
        }"
          />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" ghost @click="modify" style="margin-right: 10px">
            修改密码
          </n-button>
          <n-button round type="primary" @click="onSubmit">
            保存
          </n-button>
        </div>
      </n-form>
      <n-message-provider>
        <ModifyPassword class="modifyCard" v-if="store.state.modifyVisible">
        </ModifyPassword>
      </n-message-provider>
    </div>
  </div>
</template>

<script>

import {ref, reactive, onMounted, onUnmounted} from "vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
// import {useMessage} from "naive-ui"
import store from "@/store";
// import request from "@/utils/request";
import ModifyPassword from "./ModifyPassword";

export default ({
  name: "UserInfo",
  components: {ModifyPassword},

  setup() {
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
    const model = reactive({
      avatarPath:   null,
      email:        null,
      words:        2023,
      id:           null,
      name:         null,
      profile:      null,
      days:         150,
      wordLists:    3,
    });

    // const load = () => {
    //   request.post("/getUserInfo/",JSON.stringify({'id':targetUserId.value})).then(res=>{
    //     model.value.avatarPath = res.data.photo
    //     model.value.email = res.data.email
    //     model.value.id = res.data.id
    //     model.value.name = res.data.username
    //     model.value.profile = res.data.profile
    //     model.value.gender = res.data.gender
    //     model.value.sales = res.data.sales
    //     model.value.likeValue = res.data.likes
    //     model.value.dislikeValue = res.data.dislikes
    //   })
    // }
    // onBeforeMount(()=>{
    //   load()
    // })

    let userAvatar = ref(null);
    let showImage = ref(null);
    function getImageFile(e) {
      userAvatar.value = e.target.files[0];
      let img = new FileReader();
      img.readAsDataURL(userAvatar.value);
      console.log("img:",img)
      img.onload = ({ target }) => {
        showImage.value = target.result; //将img转化为二进制数据
        console.log("target:",target)
      };
    }

    async function onSubmit(){
      console.log("good");
      //...
    }

    return {
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
      modify() {
        store.state.modifyVisible = true;
      },

      handleSave() {
        store.state.user.avatar = model.avatarPath
        // request.post("/updateUser/",JSON.stringify({"content":model.value})).then(res=>{
        //   message.success(res.messsagee);
        //   // console.log(res.data)
        // })
      },
      rules: {
        id: {
          required: false,
          trigger: ["blur", "input"],
        },
        email: {
          required: false,
          trigger: ["blur", "input"],
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
  margin-top: 100px;
  margin-left: 13%;
}
</style>