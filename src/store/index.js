import { createStore } from 'vuex'

export default createStore({
    // state提供唯一的公共数据源，所有共享数据统一放到store的state中进行存储
    // 访问方式: store.state.xxx （需要先import store）
    state: {
        user:{
            login: false,//用户是否已登录
            uid:0,//用户id
            wordNum:0,//每日背诵单词数
            groupWords: [
                {
                    word: "",
                    definition_cn: "",
                }
            ],
        },
        modifyVisible: false,
    },

    mutations: {

    },

    actions: {
    },

    modules: {
    }
})