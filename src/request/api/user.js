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

export function getInfo(uid) {
    const data = JSON.stringify({
        user_id: uid
    })
    return request({
        url: 'https://mock.apifox.cn/m2/2544762-0-default/75149824',
        method: 'post',
        data
    })
}

export function submitInfo(uid,userInfo,imgFile) {

    // 上传文件需要使用FormData对象，
    const formData = new FormData();
    formData.append("user_id", uid);
    formData.append("user_info", JSON.stringify(userInfo));
    formData.append("img", imgFile);

    return request({
        url: "73790186",
        method: "post",
        data: formData,
        // 更改headers以上传文件
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export function getRecommendTags() {
    const data = JSON.stringify({})
    return request({
        url: 'https://mock.apifox.cn/m2/2544762-0-default/75150066',
        method: 'post',
        data
    })
}