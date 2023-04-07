<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="background">
        </div>
          <!-- 右侧的注册盒子 -->
        <div v-show="1===number" class="content-login">
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
              <div style="margin: 26px;">
                <button @click="loginin" class="loginButton">
                登录
                </button>
              </div>
              <div class="content-bottom">
                <div @click="topassword">忘记密码？</div>
                <div @click="change(0)">注册</div>
              </div>
            </div>
          </div>
      </div>
        <div v-show="0===number" class="content-login">
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
                    v-model="password"
                    type="password"
                    name="确认密码"
                    placeholder="确认密码"
                />
              </div>
              <div style="margin: 26px;">
                <button @click="register(1)" class="loginButton">
                  注册
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
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      number: 1,
    }
  },
  methods: {
    change: function (index) {
      this.number = index; //重要处
    },
    register: function (index) {
      this.number = index;
    }
  },

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
.loginButton :hover{
  cursor: pointer;
}

.H1 {
  text-align: center;
  font-size:30px;
  color:#2A928F;
}

.content-title{
  text-align: center;
  font-size:25px;
  color:#fff
}
.content-login{
  top:26%;
  left:36.5%;
  width: 400px;
  height: 400px;
  background: rgba(223,219,219,0.2);
  margin-left: 40px;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 25px 35px rgba(0,0,0,0.8);
}

.content-bottom{
  display: flex;
  justify-content: space-between;
  color: #2A928F;
  font-size:14px
}
.content-bottom :hover{
  cursor: pointer;
}

.loginbox{
  position:absolute;
  width:800px;
  height:500px;
  top:50%;
  left:50%;
  display:flex;
  align-items: center;
  transform:translate(-50%,-50%);
  background-color: rgba(255,255,255,0.3);
  box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}

.loginbox .background{
  width:300px;
  height: 400px;
  margin-left: 20px;
  background-image:url('../../assets/img/Kaleido.png');
  background-size:cover;
  display: table-cell;
  vertical-align: middle;
  font-family:sans-serif;
}

input{
  outline-style: none ;
  border: 0;
  border-bottom:2px solid #2A928F;
  background-color:transparent;
  height:20px;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;
}
/* input::-webkit-input-placeholder{
   color:#E9E9E9;
} */
input:focus{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;
}
input:hover{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;

}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight:bold;
}
</style>
