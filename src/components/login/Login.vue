<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="background">
        </div>
        <!-- 右侧的注册盒子 -->
        <div v-show="loginPageFlag" class="content-login">
          <div class="content-login-info">
            <div class="H1">欢迎来到HelloWord</div>
            <br>
            <div class="content-title">Login</div>
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
              <div style="margin:25px 0px; display: flex;justify-content: center">
                <!--                <img src="../../assets/img/key.png" height="12" width="12">-->
                <input
                    style="width: 35%"
                    v-model="verifyInput"
                    name="验证码"
                    placeholder="验证码"
                />
                <div id="loginVerify"></div>
              </div>
              <div style="margin: 26px;">
                <button @click="login(username, password,verifyInput)" class="loginButton">
                  登录
                </button>
              </div>
              <div class="content-bottom">
                <div @click="topassword">忘记密码？</div>
                <div @click="change()">注册</div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!loginPageFlag" class="content-login">
          <div class="content-login-info">
            <div class="content-title">Register</div>
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
              <div style="margin:25px 0px">
                <img src="../../assets/img/key.png" height="12" width="12">
                <input
                    v-model="passwordConfirm"
                    type="password"
                    name="确认密码"
                    placeholder="确认密码"
                />
              </div>
              <!--                验证码-->
              <div style="margin:25px 0px; display: flex;justify-content: center">
                <!--                <img src="../../assets/img/key.png" height="12" width="12">-->
                <input
                    style="width: 35%"
                    v-model="verifyInput"
                    name="验证码"
                    placeholder="验证码"
                />
                <div id="registerVerify"></div>
              </div>
              <div style="margin: 26px;">
                <button @click="register(username,password, passwordConfirm,verifyInput)" class="loginButton">
                  注册
                </button>
              </div>
              <div class="content-bottom-register">
                <div @click="change()">已有账号？点此登录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {onMounted, ref} from "vue";
import md5 from 'js-md5';
import {useMessage} from 'naive-ui'
import {registerAPI, loginAPI} from "@/request/api/user";
import store from "@/store";
import router from "@/router";
import {USERNAME, PASSWORD} from "@/store/local";
import {GVerify} from "@/components/login/GVerify"

export default {
  name: 'Login',
  props: {
    msg: String
  },
  setup() {
    let loginPageFlag = ref(true);
    let username = ref('');
    let password = ref('');
    let passwordConfirm = ref('');
    let verifyInput = ref('')//验证码

    let loginVerifyCode = null
    let registerVerifyCode = null

    const message = useMessage();

    function change() {
      loginPageFlag.value = !loginPageFlag.value;
      username.value = ""
      password.value = ""
      passwordConfirm.value = ""
      verifyInput.value = ""
    }

    function saveUserInfo(data, name, pwd) {
      //TODO 存储本地变量
      store.state.user.login = true
      store.state.user.uid = data.uid
      store.state.user.wordNum = data.wordNum
      store.state.user.selectWordlist = data.selectWordlist
      //TODO 把用户名和密码自动保存到本地，可能会有安全隐患?
      localStorage.setItem(USERNAME, name)
      localStorage.setItem(PASSWORD, pwd)
    }

    function register(name, pwd, pwdConfirm, verify) {
      if (!registerVerifyCode.validate(verify)) {
        message.error('验证码错误')
        loginVerifyCode.refresh()
        return;
      }
      if (pwd !== pwdConfirm) {
        message.error("密码前后不一致");
        return
      }
      if (name === '' || pwd === '') {
        message.error("用户名或密码不能为空");
        return;
      }

      const encodePwd = md5(pwd);
      let success = false
      let data
      let wrMsg = '网络错误'
      registerAPI(name, encodePwd).then((res) => {
        success = res.state
        data = res.data
        wrMsg = res.msg
      }).finally(() => {
        if (success) {
          saveUserInfo(data, name, pwd);
          message.success("注册成功");
          //设置路由
          router.push('/user')
        } else {
          message.error(wrMsg);
        }
      })
    }

    function login(name, pwd, verify) {
      if (!loginVerifyCode.validate(verify)) {
        message.error('验证码错误')
        loginVerifyCode.refresh()
        return;
      }

      if (name === '' || pwd === '') {
        message.error("用户名或密码不能为空");
        return;
      }

      const encodePwd = md5(pwd);
      let success = false
      let data
      let wrMsg = '网络错误'
      loginAPI(name, encodePwd).then((res) => {
        success = res.state
        data = res.data
        wrMsg = res.msg
      }).finally(() => {
        if (success) {
          saveUserInfo(data, name, pwd);
          message.success("登录成功");
          //设置路由
          router.push('/user')
        } else {
          message.error(wrMsg);
        }
      })
    }

    onMounted(() => {
      registerVerifyCode = new GVerify('registerVerify')
      loginVerifyCode = new GVerify('loginVerify')
    })

    return {
      loginPageFlag,
      username,
      password,
      passwordConfirm,
      verifyInput,


      change,
      register,
      login
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  color: #fff
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
  display: table-cell;
  vertical-align: middle;
  font-family: sans-serif;
}

input {
  outline-style: none;
  border: 0;
  border-bottom: 2px solid #2A928F;
  background-color: transparent;
  height: 20px;
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

#loginVerify {
  /*width: 30px;*/
  height: 25px;
  display: inline-flex;
  /*position: relative;*/
}

#registerVerify {
  /*width: 30px;*/
  height: 25px;
  display: inline-flex;
  /*position: relative;*/
}
</style>
