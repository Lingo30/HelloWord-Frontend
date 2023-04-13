import request from "@/request/request";

export function wordsToStory(uid,words) {
    const data = JSON.stringify({
        user_id: uid,
        words: words,
    })
    return request({
        url: "http://127.0.0.1:4523/m2/2544762-0-default/74274447",
        method: 'post',
        data
    })
}

export function getTodayWords(uid) {
    const data = JSON.stringify({
        user_id: uid,
    })
    return request({
        url: "https://mock.apifox.cn/m2/2544762-0-default/74274396",
        method: 'post',
        data
    })
}

export function getSentenceAnalysis(sentence) {
    const data = JSON.stringify({
        sentence: sentence,
    })
    return request({
        url: "https://mock.apifox.cn/m2/2544762-0-default/75139556",
        method: 'post',
        data
    })
}

export function getArticleAnalysis(article) {
    const data = JSON.stringify({
        user_article: article,
    })
    return request({
        url: "https://mock.apifox.cn/m2/2544762-0-default/74275649",
        method: 'post',
        data
    })
}

export function getBlankText(uid) {
    const data = JSON.stringify({
        user_id: uid,
    })
    return request({
        url: "https://mock.apifox.cn/m2/2544762-0-default/74274147",
        method: 'post',
        data
    })
}