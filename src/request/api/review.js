import request from "@/request/request";

export function wordsToStory(uid,words) {
    const data = JSON.stringify({
        user_id: uid,
        words: words,
    })
    return request({
        url: "words_to_story/",
        method: 'post',
        data:data,
        timeout: 40000
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

export function getSentenceAnalysis(uid,sentence) {
    const data = JSON.stringify({
        sentence: sentence,
        user_id: uid
    })
    return request({
        url: "sentence_analysis/",
        method: 'post',
        data:data,
        timeout: 40000
    })
}

export function getArticleAnalysis(uid,article) {
    const data = JSON.stringify({
        user_article: article,
        user_id: uid
    })
    return request({
        url: "writing_analysis/",
        method: 'post',
        data: data,
        timeout: 40000
    })
}

export function getBlankText(uid) {
    const data = JSON.stringify({
        user_id: parseInt(uid),
    })
    return request({
        url: "get_blank_text/",
        method: 'post',
        data:data,
        timeout: 40000
    })
}

export function getHistoryRecordId(uid,type,startDate,endDate) {
    const data = JSON.stringify({
        user_id: uid,
        type: type,
        start_date: startDate,
        end_date: endDate
    })
    return request({
        url: "get_history_record_id/",
        method: 'post',
        data:data,
    })
}

export function getRecordInfo(uid,type,recordId) {
    const data = JSON.stringify({
        user_id: uid,
        type: type,
        record_id: recordId
    })
    return request({
        url: "get_record_info/",
        method: 'post',
        data:data,
    })
}

export function getStoryRecord(uid,recordId) {
    const data = JSON.stringify({
        user_id: uid,
        record_id: recordId
    })
    return request({
        url: "get_story_record/",
        method: 'post',
        data:data,
    })
}

export function getWritingRecord(uid,recordId) {
    const data = JSON.stringify({
        user_id: uid,
        record_id: recordId
    })
    return request({
        url: "get_writing_record/",
        method: 'post',
        data:data,
    })
}

export function getBlankRecord(uid,recordId) {
    const data = JSON.stringify({
        user_id: uid,
        record_id: recordId
    })
    return request({
        url: "get_blank_record/",
        method: 'post',
        data:data,
    })
}