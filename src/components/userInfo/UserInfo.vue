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

        <n-form-item label="ID" path="id">
          <span class="text">{{model.id}}</span>
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <span class="text">{{model.email}}</span>
        </n-form-item>
        <n-form-item label="昵称" path="name">
          <n-input v-model:value="model.name" placeholder="昵称" class="text"/>
        </n-form-item>
        <n-form-item label="我的偏好" path="email">
          <n-space class="input-container">
            <n-space class="tag-pre">
              <n-tag
                  class="tag"
                  type="success"
                  v-for="(tag, index) in model.tags"
                  :key="index"
                  closable
                  @close="removeTag(index)"
              >
                {{ tag }}
              </n-tag>
            </n-space>
            <div class="input-instance" :style="{marginLeft: getLength() + 'px'}">
<!--              <n-input class="input-val" placeholder="输入标签并按Enter键添加"></n-input>-->
              <input type="text" maxlength="20" class="input-val" v-model="inputTag" @keydown.enter.prevent="addTag" placeholder="输入标签并按Enter键添加"/>
            </div>
            <div class="tag-last">还可以添加{{lastTags}}个标签</div>
          </n-space>

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
<!--        <n-form-item label="个人简介" path="profile">-->
<!--          <n-input-->
<!--              class="text"-->
<!--              v-model:value="model.profile"-->
<!--              placeholder="个人简介"-->
<!--              type="textarea"-->
<!--              :autosize="{-->
<!--          minRows: 3,-->
<!--          maxRows: 3-->
<!--        }"-->
<!--          />-->
<!--        </n-form-item>-->
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

    const inputTag = ref(null);
    const serverRecommendedTags = ref([
      { name: "推荐1", selected: false },
      { name: "推荐2", selected: false },
      { name: "推荐3", selected: false },
    ]);

    const model = reactive({
      avatarPath:   null,
      email:        "ddd@buaa.edu.cn",
      words:        2023,
      id:           22345678,
      name:         null,
      profile:      null,
      days:         150,
      wordLists:    3,
      tags:         ["ffffffffffffffff","aaaaaaaaaaaaaa","dddddddddddddddd",
                    "推荐1","sasssssssssgdfgd","asdfjklafhlkjh"],
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

    // 所剩标签数量
    let lastTags = ref(10 - model.tags.length);

    const addTag = () => {
      // console.log(inputTag.value);
      const tagInputValue = inputTag.value.trim();
      if (tagInputValue && !model.tags.includes(tagInputValue)) {
        model.tags.push(tagInputValue);
        inputTag.value = "";
        lastTags.value--;
        serverRecommendedTags.value.forEach(recommendedTag => {
          if (tagInputValue === recommendedTag.name) {
            recommendedTag.selected = true;
          }
        });
      }
    };

    const addServerRecommendedTag = (index) => {
      serverRecommendedTags.value[index].selected = !serverRecommendedTags.value[index].selected;
      if (serverRecommendedTags.value[index].selected && !model.tags.includes(serverRecommendedTags.value[index].name)) {
        model.tags.push(serverRecommendedTags.value[index].name);
        lastTags.value--;
      } else {
        const tagIndex = model.tags.findIndex(tag => tag === serverRecommendedTags.value[index].name);
        model.tags.splice(tagIndex, 1);
        lastTags.value++;
      }
      // console.log(model.tags)
    };

    const removeTag = (index) => {
      const removedTag = model.tags[index];

      // Check if the removed tag is in serverRecommendedTags
      serverRecommendedTags.value.forEach(recommendedTag => {
        if (removedTag === recommendedTag.name) {
          recommendedTag.selected = false;
        }
      });

      model.tags.splice(index, 1);
      // console.log(model.tags)
      // console.log(model.tags)
      lastTags.value += 1;
    };

    function getLength() {
      if (model.tags.length === 0) {
        return 0;
      }
      else {
        return 10;
      }
    }
    /* ********************** 用户标签相关逻辑 ******************/

    /* ********************** 上传相关逻辑 ******************/
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
    /* ********************** 上传相关逻辑 ******************/
    checkSelectedTags();

    return {
      getLength,
      inputTag,
      lastTags,
      removeTag,
      addServerRecommendedTag,
      addTag,
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
  margin-top: 2%;
  margin-left: 13%;
}

.text {
  font-size: 14px;
  width: 500vh;
}

/* 标签部分样式 */
.input-container {
  display: flex;
  background-color: rgb(255, 255, 255);
  border: 1px solid #ccd0d7;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 4px;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: border;
  width: 500vh;
}

.input-container:hover {
  border-color: #36ad6a;
}

.tag-pre {
  margin-left: 12px;
}

.tag {
  margin-right: 5px;
}

.input-instance {
  flex: 1;
  min-width: 200px;
}

.input-val {
  display: block;
  width: 100%;
  color: #222;
  line-height: 22px;
  height: 22px;
  font-size: 14px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background-color: transparent;
}

.tag-last {
  display: flex;
  font-size: 14px;
  color: #858585;
  margin-left: 12px;
  cursor: default;
  align-items: center;
}

</style>