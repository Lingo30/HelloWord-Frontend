import request from "@/request/request";

//TODO 根据用户id获取所有词单id
export function get_group_words_in_list(uid) {
    /*
    返回数据格式:
    {   // 返回len为10的单词列表
        [
            {
                id: 1,
                word_id: 1,
                word: "dangerous",
                synonyms: [
                    {
                        word_id: 2,
                        word: "unsafe",
                        definition_cn: "adj.",
                    }
                ],
                antonyms: [
                    {
                        word_id: 3,
                        word: "safe",
                        definition_cn: "adj.",
                    }
                ],
                example: "This is my house!",
            }
        ]
    }
     */
    const data = JSON.stringify({
        user_id: uid
    })
    return request({
        // url: "get_group_words_in_list/",//TODO
        url: "https://mock.apifox.cn/m2/2544762-0-default/74128965",
        method: "post",
        data,
    })
}

//TODO 删除用户的多个词单
export function deleteWordAPI(uid, id) {
    const data = JSON.stringify({
        user_id: uid,   //用户id
        id: id  //删除的单词id（在用户词表中）
    })
    return request({
        url: "",
        method: 'post',
        data
    })
}

// TODO 存储每组单词背完后的状态
export function group_word_learn_save(uid, words, list_id) {
    /*
        words: [
            {
                word_id: 1,
                forget_times: 0,
                simple: false,
            },
            {

            }
        ]

    */
    const data = JSON.stringify({
        user_id: uid,   //用户id
        words: words,  //本组单词学习情况
        list_id: list_id,
    })
    return request({
        url: "group_word_learn_save/",
        // url: "https://mock.apifox.cn/m2/2544762-0-default/74152544",
        method: 'post',
        data
    })
}

// TODO 获取某个单词的关联信息，如同义词、反义词、例句等等
export function get_word_releation(word_id) {
    /*
        relation:
        {
            synonyms: [
                    {
                        word_id: 2,
                        word: "unsafe",
                        definition_cn: "adj.",
                    }
                ],
                antonyms: [
                    {
                        word_id: 3,
                        word: "safe",
                        definition_cn: "adj.",
                    }
                ],
                example: "This is my house!",
        }
    */
    const data = JSON.stringify({
        word_id: word_id
    })
    return request({
        url: "get_word_releation/",
        // url: "https://mock.apifox.cn/m2/2544762-0-default/74153185",
        method: 'post',
        data
    })
}

