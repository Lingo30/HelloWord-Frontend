<template>
  <div class="container">
    <div class="head">
      <div class="logo">
      </div>
      <div class="word">
      </div>
    </div>
    <div class="content">
        <n-collapse>
          <n-collapse-item title="功能介绍" name="1">
            <n-collapse>
              <n-collapse-item title="学习单词" name="1">
                <div>背诵单词，记忆释义、同义词、反义词</div>
              </n-collapse-item>
              <n-collapse-item title="复习单词" name="2">
                <n-collapse>
                  <n-collapse-item title="故事模式" name="1">
                    <div>选用今日背诵的单词编写成故事，在语境中阅读加深单词记忆印象并提高阅读能力</div>
                  </n-collapse-item>
                  <n-collapse-item title="单词复习" name="2">
                    <div>以完形填空的形式练习已经背诵过的单词</div>
                  </n-collapse-item>
                  <n-collapse-item title="阅读写作" name="3">
                    <div>分析文章并智能评分，给出文本分析和修改意见</div>
                  </n-collapse-item>
                </n-collapse>
              </n-collapse-item>
              <n-collapse-item title="词单管理" name="3">
                <div>整理已经添加的词单，选取背诵的词单；制定单词背诵目标</div>
              </n-collapse-item>
              <n-collapse-item title="智能对话" name="5">
                <div>与智能助手进行对话，练习提升英语能力</div>
              </n-collapse-item>
              <n-collapse-item title="个人信息" name="4">
              <div>查看并修改账户信息</div>
            </n-collapse-item>
            </n-collapse>
          </n-collapse-item>
          <n-collapse-item title="意见反馈" name="2">
            <div>
              <n-input style="height: 15vh; width: 80%" placeholder="感谢您的意见，我们将虚心接受！" >

              </n-input>
              <n-button style="height: 5vh; width: 80%; margin-top: 2vh; " type="info">提出意见</n-button>
            </div>
          </n-collapse-item>
          <n-collapse-item title="联系我们" name="3">
            <n-collapse>
              <n-collapse-item title="PM" name="1">
                <div style="width: 80%; display: flex">
                  <img src="../../assets/img/lzh.jpg" width="40" height="40" class="avatar">
                  <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 6vh; width: 20vh">李子涵</div>
                  <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 6vh; width: 50vh">邮箱：mmmusel@163.com</div>
                </div>
              </n-collapse-item>
              <n-collapse-item title="前端" name="2">
                <n-collapse>
                  <div style="width: 80%; display: flex; margin-top: 2%">
                    <img src="../../assets/img/wyy.jpg" width="40" height="40" class="avatar">
                    <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">王永瑶</div>
                    <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">邮箱：837826068@qq.com</div>
                  </div>
                  <div style="width: 80%; display: flex; margin-top: 2%">
                    <img src="../../assets/img/ljh.jpg" width="40" height="40" class="avatar">
                    <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">李京昊</div>
                    <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">邮箱：2291464489@qq.com</div>
                  </div>
                  <div style="width: 80%; display: flex; margin-top: 2%">
                    <img src="../../assets/img/xzh.jpg" width="40" height="40" class="avatar">
                    <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">徐子航</div>
                    <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">邮箱：599050584@qq.com</div>
                  </div>
                  <div style="width: 80%; display: flex; margin-top: 2%">
                    <img src="../../assets/img/lyq.jpg" width="40" height="40" class="avatar">
                    <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">吕元秋</div>
                    <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">邮箱：20373273@buaa.edu.cn</div>
                  </div>
                </n-collapse>
              </n-collapse-item>
              <n-collapse-item title="后端" name="3">
                <n-collapse>
                  <div style="width: 80%; display: flex; margin-top: 2%">
                    <img src="../../assets/img/zya.jpg" width="40" height="40" class="avatar">
                    <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">朱彦安</div>
                    <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">邮箱：395549131@qq.com</div>
                  </div>
                  <div style="width: 80%; display: flex; margin-top: 2%">
                    <img src="../../assets/img/zl.jpg" width="40" height="40" class="avatar">
                    <div style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">卓乐</div>
                    <div style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">邮箱：zhuole1025@gmail.com</div>
                  </div>
                </n-collapse>
              </n-collapse-item>
            </n-collapse>
          </n-collapse-item>
        </n-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "helpPage",
}
</script>

<style scoped>
.container {
  position:absolute;
  width:70%;
  height:80%;
  top:50%;
  left:50%;
  align-items: center;
  justify-content: center;
  transform:translate(-50%,-50%);
  background-color: rgba(255,255,255,0.3);
  box-shadow: 10px 12px 16px 10px  rgba(0,0,0,0.24), 10px 17px 50px 10px #4E655D;
}
.head{
  margin-top: 3%;
  height: 30%;
  width: 100%;
  position:fixed;
  left: 50%;
  transform:translate(-50%,0);
}
.logo{
  height: 100%;
  width: 18%;
  position: fixed;
  left: 20%;
  transform:translate(-50%,0);
  /*background-color: #2c3e50;*/
  background-image: url('../../assets/img/kaleidoBlank.png');
  background-size: 100% 100%;
}
.word{
  height: 100%;
  width: 50%;
  position: fixed;
  left: 50%;
  transform:translate(-50%,0);
  /*background-color: #2c3e50;*/
  background-image: url('../../assets/img/title.png');
  background-size: 100% 100%;
}

.content {
  height: 40%;
  margin-top: 20%;
  width: 80%;
  position:fixed;
  left: 50%;
  overflow: auto;
  transform:translate(-50%, 0);
  padding: 3%;
  /*background-color: #2c3e50;*/
  /*background-image: url('./kaleidoBlank.png');*/
}
/* 滚动条样式 */
.content::-webkit-scrollbar {
  width: 6px;
  transition: width 1s;
}
.content::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.content::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
}
.avatar {
  border-radius: 50%;
}
</style>
