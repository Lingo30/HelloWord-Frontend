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

export function registerAPI(name, pwd, email) {
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
        email: email,
    })
    return request({
        url: 'register/',
        method: 'post',
        data
    })
}

export function getInfo(uid) {
    const data = JSON.stringify({
        user_id: uid
    })
    return request({
        url: 'get_user_info/',
        method: 'post',
        data
    })
}

export function submitInfo(uid,userInfo) {
    // 上传文件需要使用FormData对象，
    const data = JSON.stringify({
        user_id: uid,
        user_info: userInfo
    })
    return request({
        url: 'submit_info/',
        method: 'post',
        data
    })
}

export function submitAvatar(imgFile,uid) {

    // 上传文件需要使用FormData对象，
    const formData = new FormData();
    formData.append("img", imgFile);
    const json2 = JSON.stringify(uid);
        const blob2 = new Blob([json2], {
          type: 'application/json'
        });
        formData.append('user_id',blob2)
        
        console.log(blob2)
    return request({
        url: "submit_image/",
        method: "post",
        // 更改headers以上传文件
        headers: {'Content-Type': 'multipart/form-data'},
        data:formData
    });
}

export function getRecommendTags() {
    const data = JSON.stringify({})
    return request({
        url: 'get_recommend_tags/',
        method: 'post',
        data
    })
}

export function changePassword(uid,oldPwd,newPwd) {
    const data = JSON.stringify({
        user_id: uid,
        new_pwd: newPwd,
        old_pwd: oldPwd
    })
    return request({
        url: 'change_pwd/',
        method: 'post',
        data
    })
}

export function sendEmail(email) {
    const data = JSON.stringify({
        email_addr:email
    })
    return request({
        url: 'send_email_code/',
        method: 'post',
        data
    })
}

export function checkEmailCode(email,code) {
    const data = JSON.stringify({
        email_addr:email,
        code:code
    })
    return request({
        url: 'check_email_code/',
        method: 'post',
        data
    })
}