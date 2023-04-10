import {createRouter, createWebHistory} from 'vue-router'
import WordPage from "@/components/learn/WordPage.vue";
import StatisticPage from "@/components/statistic/StatisticPage.vue";
import ReviewPage from "@/components/review/ReviewPage.vue";
import Login from "@/components/login/Login.vue";
import MainPage from "@/components/global/MainPage.vue";
import WordListPage from "@/components/wordList/WordListPage.vue";
import ChatPage from "@/components/chatPage/ChatPage.vue";

const routes = [
    //格式要求示例
    /*
    {
        path: '',
        redirect: '',
        component: ,
        meta: {

        },
        children: [
            {
                path: '',
                name: '',
                component: ,
            }
        ]
    }
    */
    //登录界面
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    //用户登录后的使用界面
    {
        path: '/user',
        redirect: '/user/statistic',
        component: MainPage,
        children: [
            //统计界面（主页面）
            {
                path: 'statistic',
                name: 'statistic',
                component: StatisticPage
            },
            //背单词页面
            {
                path: 'learn',
                name: 'learn',
                component: WordPage,
                // component: WordPage
                //TODO WordPage存在bug component: WordPage
            },
            //拓展界面
            {
                path: 'review',
                name: 'review',
                component: ReviewPage,
                children: [/*TODO 对应的三个子功能*/]
            },
            //单词本界面
            {
                path: 'wordlist',
                name: 'wordlist',
                component: WordListPage
            },
            //对话界面
            {
                path: 'chat',
                name: 'chat',
                component: ChatPage
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 全局守卫
router.beforeEach((to, from, next) => {
    next()
})

export default router
