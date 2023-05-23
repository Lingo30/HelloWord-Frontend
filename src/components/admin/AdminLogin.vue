<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="background">
        </div>
        <!-- 右侧的注册盒子 -->
        <div class="content-login">
          <div class="content-login-info">
            <div class="H1">欢迎来到HelloWord</div>
            <br>
            <div class="content-title">管理员入口</div>
            <div ref="loginForm">
              <div style="margin:25px 0px">
                <img src="../../assets/img/user.png" height="12" width="12">
                <input
                    v-model="username"
                    name="用户名"
                    placeholder="用户名"
                />
              </div>
              <div style="margin:25px 0px">
                <img src="../../assets/img/key.png" height="12" width="12">
                <input
                    v-model="password"
                    type="password"
                    name="密码"
                    placeholder="密码"
                />
              </div>
              <!--                验证码-->
              <div style="margin:25px 0px; display: flex;justify-content: left">
                <!--                <img src="../../assets/img/key.png" height="12" width="12">-->
                <input
                    style="margin: 0 0 0 0.8vw;width: 40%"
                    v-model="verifyInput"
                    name="验证码"
                    placeholder="验证码"
                />
                <div style="margin-left: 30px" class="verify-img">
                  <n-image :src="verifyImg" @click="refreshVerifyCode" preview-disabled/>
                </div>
              </div>
              <div style="margin: 26px;">
                <button @click="login(username, password,verifyInput)" class="loginButton">
                  登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {NImage, useMessage} from "naive-ui";
import {onMounted, ref} from "vue";
import store from "@/store";
import {ADMINID} from "@/store/local";
import {getVerifyImg} from "@/request/api/user";
import {adminLogin} from '@/request/api/admin';
import md5 from 'js-md5'
import router from "@/router";

export default {
  name: "AdminLogin",
  components: {
    NImage,
  },
  setup() {
    const sha256 = require('js-sha256').sha256;
    let username = ref('');
    let password = ref('');
    let verifyInput = ref('')//验证码

    let verifyImg = ref('')//验证码图片url
    let imgCode = ''//验证码图片key

    const message = useMessage();

    function saveInfo(data) {
      //TODO 存储本地变量
      store.state.admin.login = true
      store.state.admin.id = data.id
      // 把用户id保存到本地
      localStorage.setItem(ADMINID, data.id)
    }

    async function refreshVerifyCode() {
      let success = false
      let errMsg = ''
      await getVerifyImg().then((res) => {
        success = res.state
        errMsg = res.msg
        if (success) {
          verifyImg.value = res.img
          imgCode = res.imgCode
        }
      }).catch(err => errMsg = '网络错误')
      if (!success) {
        message.error(errMsg)
      }
    }

    function login(name, pwd, verify) {
      if (name === '' || pwd === '') {
        message.error("用户名或密码不能为空");
        refreshVerifyCode()
        return;
      }

      const encodePwd = sha256(md5(pwd));
      let success = false
      let data
      let wrMsg = ''
      //todo 管理员的登录api
      adminLogin(name, encodePwd, verify, imgCode).then((res) => {
        success = res.state
        data = res.data
        wrMsg = res.msg
      }).catch(err => wrMsg = '网络错误').finally(() => {
        if (success) {
          saveInfo(data);
          message.success("登录成功");
          //设置路由
          router.push({name: 'admin'})//TODO
        } else {
          message.error(wrMsg);
          refreshVerifyCode()
        }
      })
    }

    onMounted(() => {
      refreshVerifyCode()
    })

    return {
      username,
      password,
      verifyInput,
      verifyImg,

      login,
      refreshVerifyCode,
    }
  }
}
</script>

<style scoped>
.loginButton {
  border-radius: 12px;
  border: 0;
  background-color: #2A928F;
  color: #FFFFFF;
  width: 200px;
  height: 30px;
}

.loginButton :hover {
  cursor: pointer;
}

.H1 {
  text-align: center;
  font-size: 30px;
  color: #2A928F;
}

.content-title {
  text-align: center;
  font-size: 25px;
  color: darkgray;
}

.content-login {
  top: 26%;
  left: 36.5%;
  width: 400px;
  height: 400px;
  background: rgba(223, 219, 219, 0.2);
  margin-left: 40px;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.8);
}

.content-bottom {
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  font-size: 14px
}

.content-bottom :hover {
  cursor: pointer;
}

.content-bottom-register {
  display: flex;
  justify-content: right;
  color: #2A928F;
  font-size: 14px;
}

.content-bottom-register :hover {
  cursor: pointer;
}

.loginbox {
  position: absolute;
  width: 800px;
  height: 500px;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4E655D;
}

.loginbox .background {
  width: 300px;
  height: 400px;
  margin-left: 20px;
  background-image: url('../../assets/img/Kaleido.png');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  /*vertical-align: middle;*/
  font-family: sans-serif;
}

input {
  outline-style: none;
  border: 0;
  border-bottom: 2px solid #2A928F;
  background-color: transparent;
  height: 20px;
  width: 300px;
  font-family: sans-serif;
  font-size: 15px;
  color: #445b53;
  font-weight: bold;
}

/* input::-webkit-input-placeholder{
   color:#E9E9E9;
} */
input:focus {
  border-bottom: 2px solid #445b53;
  background-color: transparent;
  transition: all 0.2s ease-in;
  font-family: sans-serif;
  font-size: 15px;
  color: #445b53;
  font-weight: bold;
}

input:hover {
  border-bottom: 2px solid #445b53;
  background-color: transparent;
  transition: all 0.2s ease-in;
  font-family: sans-serif;
  font-size: 15px;
  color: #445b53;
  font-weight: bold;

}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0px 1000px #89AB9E inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight: bold;
}

.verify-img {
  width: 0;
  height: 25px;
  display: inline-flex;
}

.verify-img:hover {
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

.sendCodeButton {
  border-radius: 5px;
  border: 0;
  background-color: #2A928F;
  color: #FFFFFF;
  width: 100px;
  height: 30px;
  margin-left: 2vh;
}

::v-deep .sendCodeButton:hover {
  cursor: pointer;
}

</style>