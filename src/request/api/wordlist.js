import request from "@/request/request";

//TODO 根据用户id获取所有词单id
export function getUserLists(uid) {
    /*
    返回数据格式:
    {
        ids: [1,2,3]用户的所有单词本id
    }
     */
    const data = JSON.stringify({
        user_id: uid
    })
    return request({
        url: "",//TODO
        method: "get",
        data,
    })
}

//TODO 删除用户的多个词单
export function deleteLists(uid, listIds) {
    /*
        {
            state:true/false是否成功删除
        }
     */
    const data = JSON.stringify({
        user_id: uid,//用户id
        list_ids: listIds//[1,2,...]删除的词单id
    })
    return request({
        url: '74054908',
        method: 'post',
        data
    })
}

//TODO 根据词单id获取词单名、作者、日期、单词总数等
export function getListInfo(listId) {
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
        id: listId,
    })
    return request({
        url: "",//TODO
        method: 'get',
        data,
    })
}

//TODO 根据用户id、词单id获取wordNum个单词信息
export function getWordsInfo(userId, listId, pageSize, curPage) {
    /*
    {
        words: [
            {
                wordId:'',单词id
                word:'',单词英文
                pronounce:'',音标 TODO 后端数据库格式为'【aaa】'还是'aaa'
                meaning:'',释义（如'adj. 危险的'）
            }
        ]
    }

     */
    const data = JSON.stringify({
        user_id: userId,
        list_id: listId,
        page_size: pageSize,//每页的单词数
        cur_page: curPage,//当前页
    })
    return request({
        url: "",//TODO
        method: 'get',
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
        userId: userId,
        listId: listId,
    })
    return request({
        url: "",//TODO
        method: 'post',
        data
    })
}