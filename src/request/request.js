//request基本配置
import axios from 'axios'
import router from "@/router";
import store from "@/store";
import {BACKEND_BASE_URL} from "../../secret_config";
import {AUTHENTICATE_ERR} from "@/store/local";

const request = axios.create({
    withCredentials: true,
    baseURL: BACKEND_BASE_URL,
    timeout: 5000
})

// request 拦截器
request.interceptors.request.use(
    config => {
        if (config.headers['Content-Type'] !== 'multipart/form-data') {
            config.headers['Content-Type'] = 'application/json;charset=utf-8';
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

// response 拦截器
request.interceptors.response.use(
    response => {
        if (typeof response.data.msg === 'string' && response.data.msg.match(new RegExp(AUTHENTICATE_ERR)) != null) {
            store.state.user.login = false
            setTimeout(() => router.push({name: 'login'}), 1000)
        }
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        // console.log('err' + error) // for debug
        // console.log(error.response)
        return Promise.reject(error)
    }
)

export default request