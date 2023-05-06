import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/components/Welcome.vue";
import WordPage from "@/components/learn/WordPage.vue";
import WordReviewPage from "@/components/learn/WordReviewPage.vue";
import FinishPage from "@/components/learn/FinishPage.vue";
import StatisticPage from "@/components/statistic/StatisticPage.vue";
import ReviewPage from "@/components/review/ReviewPage.vue";
import Login from "@/components/login/Login.vue";
import MainPage from "@/components/global/MainPage.vue";
import WordListPage from "@/components/wordList/WordListPage.vue";
import ChatPage from "@/components/chatPage/ChatPage.vue";
import HelpPage from "@/components/help/helpPage.vue";

import WritingPage from "@/components/textDIsplay/WritingPage";
import StoryPage from "@/components/textDIsplay/StoryPage";
import BlankText from "@/components/blankText/BlankText";
import UserInfo from "@/components/userInfo/UserInfo";
import store from '@/store/index'
import {USERID} from "@/store/local";
import {cookieLogin} from "@/request/api/user";

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
    {
        path: '/',
        name: 'base',
        redirect: '/welcome'
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
    },
    //登录界面
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    //用户登录后的使用界面
    {
        path: '/user',
        redirect: '/user/wordlist',
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
            },
            //单词复习页面
            {
                path: 'wordReview',
                name: 'wordReview',
                component: WordReviewPage,
            },
            {
                path: 'finish',
                name: 'finish',
                component: FinishPage,
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
            },
            {
                path: 'help',
                name: 'help',
                component: HelpPage,
                props({query}) {
                    return {
                        idxs: query.idxs
                    }
                }
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//全局守卫
// TODO 是否更改当前逻辑：当登录后只是页面切换时，不进行页面跳转，只有进行和后端的交互时才跳转
// 用户已登录或本地存储了正确的用户名密码时，自动登录并跳转到词单界面。
// 用户未登录时，跳转到欢迎页并通过按钮跳到登录页
let hasTryLogin = false
let firstPathName = ''
router.beforeEach((to, from, next) => {
    if (store.state.user.login) {
        if (to.name === 'login' || to.name === 'welcome') {
            router.push('/user')
        } else {
            next()
        }
    } else {
        if (hasTryLogin) {
            hasTryLogin = false
            next()
        } else {
            firstPathName = to.name
            const uid = localStorage.getItem(USERID)
            if (uid !== null) {
                let toLogin = true
                cookieLogin(uid).then((res) => {
                    let success = res.state
                    if (success) {
                        //TODO 存储本地变量
                        store.state.user.login = true
                        store.state.user.uid = uid
                        store.state.user.wordNum = res.data.wordNum
                        store.state.user.selectWordlist = res.data.selectWordlist
                        //设置路由
                        toLogin = false
                    }
                }).catch(err => err).finally(() => {
                    if (toLogin) {
                        hasTryLogin = true
                        if (firstPathName === 'login') {
                            next()
                        } else {
                            router.push({name: 'welcome'})
                        }
                    } else {
                        router.push({name: firstPathName})
                    }
                })
            } else {
                hasTryLogin = true
                if (firstPathName === 'login') {
                    next()
                } else {
                    router.push({name: 'welcome'})
                }
            }
        }
    }
})

export default router
