import request from "@/request/request";

export function adminLogin(id, pwd, verify, imgCode){
    const data = JSON.stringify({
        name: id,
        password: pwd,
        verify: verify,
        imgCode: imgCode,
    })
    return request({
        url: 'adminLogin/',
        method: 'post',
        data: data,
    })
}

export function sendSpecialMessage(uid, message) {
    const data = JSON.stringify({
        userId: uid,
        message: message
    })
    return request({
        url: 'send_message_to_user/',
        method: 'post',
        data
    })
}

export function sendToAll(message) {
    return request({
        url: 'send_to_all/',
        method: 'post',
        data: JSON.stringify({
            message: message
        })
    })
}

//所有用户反馈
export function getUserFeedbacks() {
    return request({
        url: 'get_feedbacks/',
        method: 'post',
    })
}

//所有用户提交的官方词单
export function getSubmitOfficials() {
    return request({
        url: 'get_user_submit_wordlists/',
        method: 'post',
    })
}

export function acceptSubmit(listId) {
    return request({
        url: 'accept_submit_wordlist/',
        method: 'post',
        data: JSON.stringify({
            listId: listId,
        })
    })
}

export function rejectSubmit(listId, message) {
    const data = JSON.stringify({
        listId: listId,
        message: message,
    })
    return request({
        url: 'accept_submit_wordlist/',
        method: 'post',
        data,
    })
}

export function getSubmitDetail(listId) {
    return request({
        url: 'get_submit_wordlist/',
        method: 'post',
        data: JSON.stringify({
            listId: listId,
        })
    })
}