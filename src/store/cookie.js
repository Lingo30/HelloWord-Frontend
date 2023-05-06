/**
 * @description 保存cookie
 * @param {String} key 需要存储cookie的key
 * @param {String} value 需要存储cookie的key对应的value
 * @param {Number} days 默认存储多少天
 * @param {Boolean} secure 是否需要secure标签
 * @param {Boolean} httpOnly 是否需要httpOnly标签
 */
function setCookie(key, value, days, secure, httpOnly) {
    // 设置过期时间
    let date = new Date(
        new Date().getTime() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    let cookieStr = key + '=' + value + "; expires=" + date
    if (secure) {
        cookieStr += '; secure'
    }
    if (httpOnly) {
        cookieStr += '; httpOnly'
    }
    document.cookie = cookieStr

    // for (var key in json) {
    //     document.cookie = key + "=" + json[key] + "; expires=" + date + "; HttpOnly; ";
    // }
}

/**
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
// function getCookie(name) {
//     var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//     if (arr != null) {
//         return unescape(arr[2])
//     } else {
//         return null
//     }
// }

/**
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */
function clearCookie(name) {
    let json = {};
    json[name] = '';
    setCookie(name, '', -1, true, true)
}

const cookie = {
    setCookie,
    // getCookie,
    clearCookie
}
export default cookie