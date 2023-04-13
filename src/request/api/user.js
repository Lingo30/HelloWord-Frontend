import request from "@/request/request";

export function loginAPI(name, pwd) {
    /*
    返回数据：
    state: true/false 是否登录成功
    data:{
        uid:用户id
        wordNum:每日预期背诵单词数
    }
    msg: 登录失败原因
     */
    const data = JSON.stringify({
        name: name,
        password: pwd,
    })
    return request({
        url: 'login/',
        method: 'post',
        data: data,
    })
}

export function registerAPI(name, pwd) {
    /*
    返回数据：
    state: true/false 是否注册成功
    data:{
        uid:
        wordNum:每日预期背诵单词数
    }
    msg: 注册失败原因
     */
    const data = JSON.stringify({
        name: name,
        password: pwd,
    })
    return request({
        url: 'register/',
        method: 'post',
        data
    })
}