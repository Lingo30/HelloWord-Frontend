<template>
  <div class="container">
    <div class="head">
      <div class="logo">
      </div>
      <div class="word">
      </div>
    </div>
    <div class="content">
      <n-collapse :default-expanded-names="autoOpen([])">
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
        <n-collapse-item title="常见问题解答" name="2">
          <n-collapse :default-expanded-names="autoOpen([2])">
            <n-collapse-item title="如何管理我的词单?" name="1">
              <div style="text-align: left">
                在单词表页面，点击左下角的"编辑单词本"按钮后，可以更改词单名或删除词单。
                <br>
                删除词单：点击页面左侧的词单卡片右上角的x
                <br>
                编辑词单名： 点击词单卡片的词单名后输入新的词单名。
                <br>
                所有操作完成后，点击右下角的“完成”即可生效。
                如果在完成前想取消本次更改，点击左下角“取消”可以撤销本次所有更改
              </div>

            </n-collapse-item>
            <n-collapse-item title="如何创建新的词单?" name="2">
              在单词表页面，点击左下角的"新建单词本"按钮后进入创建词单页面，
              目前支持两种创建模式：
              <br>
              1. 通过官方词单创建。单击选择一个官方词单->
              输入自定义的词单名（默认为官方词单名）->点击右下角”生成词单“
              <br>
              2. 通过解析上传的文件创建。点击上传框选择上传文件/将本地文件拖入上传框->
              自动解析文件生成预览词单->自定义删除不需要的单词->
              输入词单名->点击右下角”生成词单“
            </n-collapse-item>
            <n-collapse-item title="如何设置正在学习的词单?" name="3">
              在单词表页面，点击左侧想要学习的词单卡片->点击右侧词单内容展示框下方”设为背诵词单“按钮
            </n-collapse-item>
            <n-collapse-item title="如何设置每日的学习量?" name="4">
              在单词表页面，拖动上方进度条为想要学习的单词数量
            </n-collapse-item>
            <n-collapse-item title="如何使用故事模式?" name="5">
              <!--              TODO 使用说明-->
              通过单词复习页面的轮播图进入。选择今日背诵单词->点击”生成故事“->获取根据选择的单词生成的短文
              <br>
              在这一模式中，还可以通过选中句子对句子进行分析
            </n-collapse-item>
            <n-collapse-item title="如何使用单词复习模式?" name="6">
              <!--              TODO 使用说明-->
              通过单词复习页面的轮播图进入。左侧根据背诵单词自动生成待填空短文->根据右侧提供的单词使用正确形式填入->点击”提交“判断正误
            </n-collapse-item>
            <n-collapse-item title="如何使用阅读写作模式?" name="7">
              <!--              TODO 使用说明-->
              通过单词复习页面的轮播图进入。在输入框输入文本/点击”导入文本“按钮上传文件->点击”开始分析“生成分析结果与得分
              <br>
              在这一模式中，还可以通过选中句子对句子进行分析
            </n-collapse-item>
          </n-collapse>
        </n-collapse-item>
        <n-collapse-item title="意见反馈" name="3">
          <div>
            <n-input style="height: 15vh; width: 80%" placeholder="感谢您的意见，我们将虚心接受！">

            </n-input>
            <n-button style="height: 5vh; width: 80%; margin-top: 2vh; " type="info">提出意见</n-button>
          </div>
        </n-collapse-item>
        <n-collapse-item title="联系我们" name="4">
          <n-collapse>
            <n-collapse-item title="PM" name="1">
              <div style="width: 80%; display: flex">
                <img src="../../assets/img/lzh.jpg" width="40" height="40" class="avatar">
                <div
                    style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 6vh; width: 20vh">
                  李子涵
                </div>
                <div
                    style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 6vh; width: 50vh">
                  邮箱：mmmusel@163.com
                </div>
              </div>
            </n-collapse-item>
            <n-collapse-item title="前端" name="2">
              <n-collapse>
                <div style="width: 80%; display: flex; margin-top: 2%">
                  <img src="../../assets/img/wyy.jpg" width="40" height="40" class="avatar">
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">
                    王永瑶
                  </div>
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">
                    邮箱：837826068@qq.com
                  </div>
                </div>
                <div style="width: 80%; display: flex; margin-top: 2%">
                  <img src="../../assets/img/ljh.jpg" width="40" height="40" class="avatar">
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">
                    李京昊
                  </div>
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">
                    邮箱：2291464489@qq.com
                  </div>
                </div>
                <div style="width: 80%; display: flex; margin-top: 2%">
                  <img src="../../assets/img/xzh.jpg" width="40" height="40" class="avatar">
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">
                    徐子航
                  </div>
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">
                    邮箱：599050584@qq.com
                  </div>
                </div>
                <div style="width: 80%; display: flex; margin-top: 2%">
                  <img src="../../assets/img/lyq.jpg" width="40" height="40" class="avatar">
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">
                    吕元秋
                  </div>
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">
                    邮箱：20373273@buaa.edu.cn
                  </div>
                </div>
              </n-collapse>
            </n-collapse-item>
            <n-collapse-item title="后端" name="3">
              <n-collapse>
                <div style="width: 80%; display: flex; margin-top: 2%">
                  <img src="../../assets/img/zya.jpg" width="40" height="40" class="avatar">
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">
                    朱彦安
                  </div>
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">
                    邮箱：395549131@qq.com
                  </div>
                </div>
                <div style="width: 80%; display: flex; margin-top: 2%">
                  <img src="../../assets/img/zl.jpg" width="40" height="40" class="avatar">
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align: center; margin-left: 20vh; line-height: 5vh; width: 20vh">
                    卓乐
                  </div>
                  <div
                      style="align-items: center; justify-content: center; margin:auto; text-align:left; margin-left: 10vh; line-height: 5vh; width: 50vh">
                    邮箱：zhuole1025@gmail.com
                  </div>
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
  props: {
    idxs: Array,//跳转到此页面时企图打开的条目（[1,2]表示打开第一条的第二条，在from路由的query参数给出）
  },
  setup(props) {

    //判断有哪个子条目会自动打开
    function autoOpen(idxArr) {
      // console.log(idxArr);
      // console.log(props.idxs);
      if (props.idxs === undefined) return []
      //idxs满足idxArr前缀时打开
      if (idxArr.length >= props.idxs.length) {
        return []
      }
      for (let i = 0; i < idxArr.length; i++) {
        if (Number(idxArr[i]) !== Number(props.idxs[i])) {
          return []
        }
      }
      // console.log(props.idxs[idxArr.length]);
      return [props.idxs[idxArr.length]]
    }

    return {

      autoOpen,
    }
  }
}
</script>

<style scoped>
.container {
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

.head {
  height: 30%;
  width: 100%;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
}

.logo {
  height: 100%;
  width: 18%;
  position: fixed;
  left: 20%;
  transform: translate(-50%, 0);
  /*background-color: #2c3e50;*/
  background-image: url('../../assets/img/kaleidoBlank.png');
  background-size: 100% 100%;
}

.word {
  height: 100%;
  width: 50%;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  /*background-color: #2c3e50;*/
  background-image: url('../../assets/img/title.png');
  background-size: 100% 100%;
}

.content {
  height: 50%;
  margin-top: 15%;
  width: 80%;
  position: fixed;
  left: 50%;
  overflow: auto;
  transform: translate(-50%, 0);
  padding: 3%;
  background-color: rgba(255, 255, 255, 0.3);
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
