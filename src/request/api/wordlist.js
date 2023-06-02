import request from "@/request/request";

// 根据用户id获取所有词单id
export function getUserLists(uid) {
    /*
    返回数据格式:
    {
        ids: [1,2,3]用户的所有单词本id
    }
     */
    const data = JSON.stringify({
        userId: uid
    })
    return request({
        url: "get_user_wordlists/",
        method: "post",
        data,
    })
}

// 删除用户的多个词单
// export function deleteLists(uid, listIds) {
//     /*
//         {
//             state:true/false是否成功删除
//         }
//      */
//     const data = JSON.stringify({
//         user_id: uid,//用户id
//         list_ids: listIds//[1,2,...]删除的词单id
//     })
//     return request({
//         url: '74054908',
//         method: 'post',
//         data
//     })
// }

// 根据词单id获取用户的某个词单的词单名、作者、日期、单词总数等
export function getUserWordlistInfo(listId) {
    /*
    返回数据格式：
    {
      name: '',词单名
      num: '',单词总数
      creator: '',作者
      date: {
        month: '',
        day: ''
      },日期
    }
     */
    const data = JSON.stringify({
        listId: listId,
    })
    return request({
        url: "get_wordlist_info/",
        method: 'post',
        data,
    })
}

// 根据用户id、词单id获取wordNum个单词信息
export function getWordsInfo(userId, listId, pageSize, curPage) {
    /*
    {
        words: [
            {
                wordId:'',单词id
                word:'',单词英文
                pronounce:'',音标
                meaning:'',释义（如'adj. 危险的'）
            }
        ]
    }
    */
    const data = JSON.stringify({
        userId: userId,
        listId: listId,
        pageSize: pageSize,//每页的单词数
        curPage: curPage,//当前页
    })
    return request({
        url: "get_words_info/",
        method: 'post',
        data,
    })
}

// 获取所有官方词单（公共词单）的词单信息
export function getOfficialLists() {
    return request({
        url: 'get_official_wordlists/',
        method: 'post',
    })
}

// 用户根据已有的官方词单创建词单
export function createFromOfficial(userId, listName, listId) {
    /*
        state:true/false是否成功创建
     */
    const data = JSON.stringify({
        userId: userId,
        listId: listId,
        name: listName,
    })
    return request({
        url: "add_wordlist_from_official/",
        method: 'post',
        data,
        timeout: 50000
    })
}

// 根据用户前端展示的预览词单生成用户词单
export function createFromPre(userId, listName, words) {
    const data = JSON.stringify({
        userId: userId,
        name: listName,
        words: words,
    })
    return request({
        url: 'add_wordlist_from_file/',
        method: 'post',
        data
    })
}

// 用户更新多个词单的词单名
// export function updateListName(userId, lists) {
//     /*
//         state:true/false是否成功修改
//     */
//     const data = JSON.stringify({
//         userId: userId,
//         lists: lists
//     })
//     return request({
//         url: '',
//         method: "post",
//         data
//     })
// }

// 用户编辑个人词单列表（删除词单、修改词单名）
export function editWordlists(userId, deleteLists, updateLists) {
    const data = JSON.stringify({
        userId: userId,
        deleteLists: deleteLists,
        updateLists: updateLists,
    })
    return request({
        url: 'edit_wordlists/',
        method: 'post',
        data
    })
}

// 上传文件并解析文件中的所有单词
export function uploadFile(fileData, progressFunc) {
    return request({
        url: "get_wordList_from_file/",
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        onUploadProgress: progressFunc,
        data: fileData
    })
}

// 上传文件并智能解析
export function uploadFileSmart(fileData, progressFunc) {
    return request({
        url: "get_wordList_smart_from_file/",
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        onUploadProgress: progressFunc,
        data: fileData
    })
}

//获取用户根据关键词生成的词单
export function getTagWordlist(userId, tags) {
    const data = JSON.stringify({
        userId: userId,
        tags: tags,
    })
    return request({
        url: 'get_wordlist_from_tags/',
        method: 'post',
        data
    })
}

// 更新用户选择进行学习的词单
export function updateLearnWordlist(userId, listId) {
    const data = JSON.stringify({
        userId: userId,
        listId: listId
    })

    return request({
        url: 'update_learn_wordlist/',
        method: 'post',
        data
    })
}

export function getLearnedWords(uid) {
    const data = JSON.stringify({
        userId: uid
    })

    return request({
        url: 'get_today_learned_words_sum/',//TODO
        method: 'post',
        data
    })
}

export function getAim(uid) {
    const data = JSON.stringify({
        userId: uid
    })

    return request({
        url: 'get_today_aim/',//TODO
        method: 'post',
        data
    })
}

export function setAim(uid, aim) {
    const data = JSON.stringify({
        userId: uid,
        num: aim
    })

    return request({
        url: 'set_daily_num/',//TODO
        method: 'post',
        data
    })
}

export function submitOfficial(uid, listId) {
    const data = JSON.stringify({
        userId: uid,
        list_id: listId,
    })
    return request({
        url: 'submit_official_wordlist/',
        method: 'post',
        data
    })
}