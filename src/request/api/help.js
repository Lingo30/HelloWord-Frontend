import request from "@/request/request";

export function addFeedback(uid, type, modules, content) {
    let data = JSON.stringify({
        userId: uid,
        type: type,
        modules: modules,
        content: content,
    })
    return request({
        url: 'add_feedback/',
        method: 'post',
        data
    })
}