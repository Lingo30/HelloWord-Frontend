import request from "@/request/request";

export function wordsToStory(uid,words) {
    const data = JSON.stringify({
        user_id: uid,
        words: words,
    })
    return request({
        url: "words_to_story/",
        method: 'post',
        data
    })
}

export function getTodayWords(uid) {
    const data = JSON.stringify({
        user_id: uid,
    })
    return request({
        url: "get_today_words/",
        method: 'post',
        data
    })
}

export function getSentenceAnalysis(sentence) {
    const data = JSON.stringify({
        sentence: sentence,
    })
    return request({
        url: "sentence_analysis/",
        method: 'post',
        data
    })
}

export function getArticleAnalysis(article) {
    const data = JSON.stringify({
        user_article: article,
    })
    return request({
        url: "writing_analysis/",
        method: 'post',
        data
    })
}

export function getBlankText(uid) {
    const data = JSON.stringify({
        user_id: uid,
    })
    return request({
        url: "get_blank_text/",
        method: 'post',
        data
    })
}