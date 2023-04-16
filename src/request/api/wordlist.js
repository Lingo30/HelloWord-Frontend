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

//TODO 获取所有官方词单（公共词单）
export function getOfficialLists() {
    /*
        ids:[]
     */
    return request({
        url: '',//TODO
        method: 'get'
    })
}

//TODO 用户根据已有的官方词单创建词单
export function createFromOfficial(userId, listId) {
    /*
        state:true/false是否成功创建
     */
    const data = JSON.stringify({
        user_id: userId,
        list_id: listId,
    })
    return request({
        url: "",//TODO
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

//TODO
export function uploadFile(fileData, progressFunc) {
    return request({
        url: "https://mock.apifox.cn/m2/2544762-0-default/73946029",//TODO
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        onUploadProgress: progressFunc,
        data: fileData
    })
}

// TODO 更新用户选择进行学习的词单
export function updateLearnWordlist(userId, listId) {
    const data = JSON.stringify({
        userId: userId,
        listId: listId
    })

    return request({
        url: 'update_learn_wordlist/',//TODO
        method: 'post',
        data
    })
}