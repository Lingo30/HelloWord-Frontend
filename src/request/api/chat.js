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

export function getVideoHistoryChatAPI(uid) {
    const data = JSON.stringify({
        user_id: uid,
    })
    return request({
        // url: "https://mock.apifox.cn/m2/2544762-0-default/74215801",
        url: "get_video_history/",
        method: 'post',
        data
    })
}

export function submitVideo(videoFile, uid) {

    // 上传文件需要使用FormData对象，
    const formData = new FormData();
    formData.append("video", videoFile);
    const json2 = JSON.stringify(uid);
    const blob2 = new Blob([json2], {
        type: 'application/json'
    });
    formData.append('user_id', blob2)

    return request({
        url: "submit_video/",
        method: "post",
        // 更改headers以上传文件
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
        timeout: 50000
    });
}
