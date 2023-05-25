import request from "@/request/request";

export function cookieLogin(uid) {
    const data = JSON.stringify({
        userId: uid,
    })
    return request({
        url: 'cookie_login/',
        method: 'post',
        data: data
    })
}

export function getVerifyImg() {
    return request({
        url: 'get_verify_img/',
        method: 'post',
    })
}

export function loginAPI(name, pwd, verify, imgCode) {
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
        verify: verify,
        imgCode: imgCode,
    })
    return request({
        url: 'login/',
        method: 'post',
        data: data,
    })
}

export function registerAPI(name, pwd, email, code, verify, imgCode, inviteCode) {
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
        code: code,
        verify: verify,
        imgCode: imgCode,
        invite_code: inviteCode,
    })
    return request({
        url: 'register/',
        method: 'post',
        data
    })
}

export function sendResetPasswordEmail(name, email, verify, imgCode) {
    const data = JSON.stringify({
        name: name,
        email: email,
        verify: verify,
        imgCode: imgCode,
    })
    return request({
        url: 'send_reset_password_email_code/',
        method: 'post',
        data
    })
}

export function reset(name, pwd, email, code, verify, imgCode) {
    const data = JSON.stringify({
        name: name,
        password: pwd,
        email: email,
        code: code,
        verify: verify,
        imgCode: imgCode,
    })
    return request({
        url: 'reset_password//',
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
        // url: 'https://mock.apifox.cn/m2/2544762-0-default/83655140?apifoxApiId=83655140',
        method: 'post',
        data
    })
}

export function changeCustom(uid, custom) {
    const data = JSON.stringify({
        user_id: uid,
        user_custom: custom
    })
    return request({
        url: 'change_custom/',
        method: 'post',
        data
    })
}

export function submitInfo(uid, userInfo) {
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

export function submitAvatar(imgFile, uid) {

    // 上传文件需要使用FormData对象，
    const formData = new FormData();
    formData.append("img", imgFile);
    const json2 = JSON.stringify(uid);
    const blob2 = new Blob([json2], {
        type: 'application/json'
    });
    formData.append('user_id', blob2)

    return request({
        url: "submit_image/",
        method: "post",
        // 更改headers以上传文件
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
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

export function changePassword(uid, oldPwd, newPwd) {
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
        email_addr: email
    })
    return request({
        url: 'send_email_code/',
        method: 'post',
        data
    })
}

export function checkEmailCode(email, code) {
    const data = JSON.stringify({
        email_addr: email,
        code: code
    })
    return request({
        url: 'check_email_code/',
        method: 'post',
        data
    })
}

export function getVipInfo(uid) {
    const data = JSON.stringify({
        user_id: uid
    })
    return request({
        url: 'get_vip_info/',
        // url: 'https://mock.apifox.cn/m2/2544762-0-default/83655288',
        method: 'post',
        data
    })
}

export function getMessages(uid) {
    const data = JSON.stringify({
        userId: uid,
    })
    return request({
        url: 'get_messages/',
        method: 'post',
        data
    })
}

export function setMessageRead(uid, message) {
    const data = JSON.stringify({
        userId: uid,
        messageId: message,
    })
    return request({
        url: 'set_message_state/',
        method: 'post',
        data
    })
}
