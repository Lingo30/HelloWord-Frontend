import {createRouter, createWebHistory} from 'vue-router'
import WordPage from "@/components/learn/WordPage.vue";
import WordReviewPage from "@/components/learn/WordReviewPage.vue";
import FinishPage from "@/components/learn/FinishPage.vue";
import StatisticPage from "@/components/statistic/StatisticPage.vue";
import ReviewPage from "@/components/review/ReviewPage.vue";
import Login from "@/components/login/Login.vue";
import MainPage from "@/components/global/MainPage.vue";
import WordListPage from "@/components/wordList/WordListPage.vue";
import ChatPage from "@/components/chatPage/ChatPage.vue";

import WritingPage from "@/components/textDIsplay/WritingPage";
import StoryPage from "@/components/textDIsplay/StoryPage";
import BlankText from "@/components/blankText/BlankText";
import UserInfo from "@/components/userInfo/UserInfo";
import store from '@/store/index'
import {PASSWORD, USERNAME} from "@/store/local";
import {loginAPI} from "@/request/api/user";
import md5 from 'js-md5';

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
            //单词复习页面
            {
                path: 'wordReview',
                name: 'wordReview',
                component: WordReviewPage,
                // component: WordReviewPage
                //TODO WordPage存在bug component: WordPage
            },
            {
                path: 'finish',
                name: 'finish',
                component: FinishPage,
                // component: WordReviewPage
                //TODO WordPage存在bug component: WordPage
            },
            //拓展界面
            {
                path: 'review',
                name: 'review',
                component: ReviewPage,
            },
            //单词本界面
            {
                path: 'wordlist',
                name: 'wordlist',
                component: WordListPage,
            },
            //对话界面
            {
                path: 'chat',
                name: 'chat',
                component: ChatPage
            },
            {
                path: 'info',
                name: 'info',
                component: UserInfo
            },
            // 写作页面
            {
                path: 'writing',
                name: 'writing',
                component: WritingPage
            },
            // 故事页面
            {
                path: 'story',
                name: 'story',
                component: StoryPage
            },
            // 填词页面
            {
                path: 'blank',
                name: 'blank',
                component: BlankText
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 全局守卫
let hasTryLogin = false
let firtPathName = ''
router.beforeEach((to, from, next) => {
    if (store.state.user.login) {
        if (to.name === 'login') {
            router.push('/user')
        } else {
            next()
        }
    } else {
        if (hasTryLogin) {
            hasTryLogin = false
            next()
        } else {
            firtPathName = to.name
            const username = localStorage.getItem(USERNAME)
            const password = localStorage.getItem(PASSWORD)
            if (username !== null && password !== null) {
                let toLogin = true
                loginAPI(username, md5(password)).then((res) => {
                    let success = res.state
                    if (success) {
                        //TODO 存储本地变量
                        store.state.user.login = true
                        store.state.user.uid = res.data.uid
                        store.state.user.wordNum = res.data.wordNum
                        store.state.user.selectWordlist = res.data.selectWordlist
                        //设置路由
                        toLogin = false
                    }
                }).finally(() => {
                    if (toLogin) {
                        hasTryLogin = true
                        router.push({name: 'login'})
                    } else {
                        router.push({name: firtPathName})
                    }
                })
            } else {
                hasTryLogin = true
                router.push({name: 'login'})
            }
        }

    }

})

export default router
