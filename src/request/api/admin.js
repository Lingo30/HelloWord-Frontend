import request from "@/request/request";

export function adminLogin(id, pwd, verify, imgCode) {
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

export function sendSpecialMessage(id, uid, message) {
    const data = JSON.stringify({
        adminId: id,
        userId: uid,
        message: message
    })
    return request({
        url: 'send_message_to_user/',
        method: 'post',
        data
    })
}

export function sendToAll(id, message) {
    return request({
        url: 'send_to_all/',
        method: 'post',
        data: JSON.stringify({
            adminId: id,
            message: message
        })
    })
}

//所有用户反馈
export function getUserFeedbacks(id) {
    return request({
        url: 'get_feedbacks/',
        method: 'post',
        data: JSON.stringify({
            adminId: id,
        })
    })
}

//所有用户提交的官方词单
export function getSubmitOfficials(id) {
    return request({
        url: 'get_user_submit_wordlists/',
        method: 'post',
        data: JSON.stringify({
            adminId: id,
        })
    })
}

export function acceptSubmit(id, listId) {
    return request({
        url: 'accept_submit_wordlist/',
        method: 'post',
        data: JSON.stringify({
            adminId: id,
            listId: listId,
        })
    })
}

export function rejectSubmit(id, listId, message) {
    const data = JSON.stringify({
        adminId: id,
        listId: listId,
        message: message,
    })
    return request({
        url: 'accept_submit_wordlist/',
        method: 'post',
        data,
    })
}

export function getSubmitDetail(id, listId) {
    return request({
        url: 'get_submit_wordlist/',
        method: 'post',
        data: JSON.stringify({
            adminId: id,
            listId: listId,
        })
    })
}