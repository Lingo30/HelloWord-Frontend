import request from "@/request/request";

//TODO
export function loginAPI(name, pwd) {
    /*
    返回数据：
    status: true/false 是否登录成功
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
        url: '73790186',
        method: 'get',
        data
    })
}

//TODO
export function registerAPI(name, pwd) {
    /*
    返回数据：
    status: true/false 是否注册成功
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
        url: '73790186',
        method: 'get',
        data
    })
}