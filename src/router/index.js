import {createRouter, createWebHistory} from 'vue-router'
// import WordPage from "@/components/learn/WordPage.vue";
import StatisticPage from "@/components/statistic/StatisticPage.vue";
import ReviewPage from "@/components/review/ReviewPage.vue";
import Login from "@/components/login/Login.vue";
import MainPage from "@/components/global/MainPage.vue";
import WordListPage from "@/components/wordList/WordListPage.vue";

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
        component: Login
    },
    {
        path: '/wordlist',
        component: WordListPage
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
                component: StatisticPage
            },
            //背单词页面
            {
                path: 'learn',
                //TODO WordPage存在bug component: WordPage
            },
            //拓展界面
            {
                path: 'review',
                component: ReviewPage,
                children: [/*TODO 对应的三个子功能*/]
            },
            //对话界面
            {
                path: 'talk',
                component: ReviewPage,
                //TODO 对话界面组件
            },
            //单词本界面
            {
                path: 'wordlist',
                component: WordListPage
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