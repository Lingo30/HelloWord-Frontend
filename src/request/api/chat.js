import request from "@/request/request";

export function sendChatAPI(uid, question) {
    const data = JSON.stringify({
        user_id: uid,
        question: question
    })
    return request({
        // url: "http://127.0.0.1:4523/m2/2544762-0-default/74212367",
        url: "user_send/",
        method: 'post',
        data:data,
        timeout: 30000
    })
}

export function getHistoryChatAPI(uid) {
    const data = JSON.stringify({
        user_id: uid,
    })
    return request({
        // url: "https://mock.apifox.cn/m2/2544762-0-default/74215801",
        url: "get_log_history/",
        method: 'post',
        data
    })
}
