import request from "@/request/request";

//TODO 根据用户id获取所有词单id
export function getLists(uid) {
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
export function getWordsInfo(userId, listId, wordNum) {
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
        userId: userId,
        listId: listId,
        num: wordNum,//背诵单词数
    })
    return request({
        url: "",//TODO
        method: 'get',
        data,
    })
}