<template>
  <n-card title="修改密码" embedded closable @close="handleClose" hoverable>
    <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :size="size"
        :style="{
      maxWidth: '640px'
    }"
    >
      <n-form-item label="原密码" path="oldPassword">
        <n-input
            type="password"
            show-password-on="click"
            v-model:value="model.oldPassword" placeholder="请输入原密码" />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input
            type="password"
            show-password-on="click"
            v-model:value="model.newPassword" placeholder="请输入新密码" />
      </n-form-item>
      <n-form-item label="确定密码" path="checkPassword">
        <n-input
            type="password"
            show-password-on="click"
            v-model:value="model.checkPassword" placeholder="请输入新密码" />
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
  </n-card>
</template>

<script>
import {ref, reactive} from "vue";
import {useMessage} from "naive-ui";
import {
  CloseCircleOutline,
} from "@vicons/ionicons5";
import store from "@/store";
// import request from "../../request/request";
import md5 from 'js-md5';

export default ({
  name: "ModifyPassword",

  setup() {
    const message = useMessage();
    const model = reactive({
      id: store.state.user.userID,
      oldPassword: null,
      newPassword:null,
      checkPassword:null,
    })

    const tmp = reactive({
      id: store.state.user.userID,
      oldPassword: null,
      newPassword:null,
    })

    const confirmModify = () => {
      if (model.newPassword !== model.checkPassword) {
        message.error("两次密码不一致");
        return;
      }
      let format = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9~!@&%#_]{6,15}$/gi
      if(!format.test(model.newPassword)){
        message.error('密码长度应在6-15位，且同时包含字母与数字')
        return;
      }
      tmp.oldPassword = md5(model.oldPassword);
      tmp.newPassword = md5(model.newPassword);
      store.state.modifyVisible = false;
      // console.log(tmp)
      // request.post("/changePassword/",JSON.stringify({"password":tmp})).then(res=>{
      //   if (res.data === 0) {
      //     store.state.modifyVisible = false;
      //     message.success(res.messsage)
      //   }
      //   else {
      //     message.error(res.messsage)
      //   }
      // })
    }

    function handleClose() {
      store.state.modifyVisible = false;
    }

    function handleConfirm(e) {
      e.preventDefault();
      confirmModify();
    }

    const formRef = ref(null);
    return {
      formRef,
      model,
      CloseCircleOutline,
      size: ref("medium"),

      rules: {
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

      handleClose,

      handleConfirm,
    };
  }
})
</script>

<style scoped>
.n-card {
  max-width: 300px;
}

.modifyCard {
  position: absolute;
  top: 250px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
}
</style>