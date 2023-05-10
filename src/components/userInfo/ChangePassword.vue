<template>
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
              v-model:value="password.oldPwd" placeholder="请输入原密码"/>
        </n-form-item>
        <n-form-item label="新密码" path="newPassword">
          <n-input
              type="password"
              show-password-on="click"
              v-model:value="password.newPwd" placeholder="请输入新密码"/>
        </n-form-item>
        <n-form-item label="确认密码" path="checkPassword">
          <n-input
              type="password"
              show-password-on="click"
              v-model:value="password.confirm" placeholder="请再次输入密码"/>
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
</template>

<script>
import md5 from "js-md5";
import {changePassword} from "@/request/api/user";
import store from "@/store";
import {reactive, ref} from "vue";
import {NModal, NForm, NFormItem, NInput, NButton, useMessage} from "naive-ui";

export default {
  name: "ChangePassword",
  components: {
    NModal,
    NForm,
    NFormItem,
    NInput,
    NButton,
  },
  setup() {
    const sha256 = require('js-sha256')
    const msg = useMessage()

    let showPwd = ref(false);

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
      if (!format.test(password.newPwd)) {
        msg.error('密码长度应在6-15位，且同时包含字母与数字')
        return;
      }
      const tempOld = sha256(md5(password.oldPwd));
      const tempNew = sha256(md5(password.newPwd));
      changePassword(store.state.user.uid, tempOld, tempNew).then((res) => {
        let success = res.state
        if (success) {
          showPwd.value = false
          msg.success("修改成功")
        } else {
          msg.error(res.msg)
        }
      }).catch()
    }

    return {
      pwdForm,
      showPwd,
      password,
      handleClose,
      handleConfirm,
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
    }
  }
}
</script>

<style scoped>

</style>