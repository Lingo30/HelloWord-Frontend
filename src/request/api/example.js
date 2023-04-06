import request from "@/request/request";

//前端调用示例
/*
import {example1} from "@/request/api/example";
let data={}
example1(data).then((res)=>{

})
 */
export function example1(data) {
    return request({
        url: "/example1/",
        method: 'post',
        data
    })
}

export function example2(postFlag, data) {
    let method = postFlag ? 'post' : 'get'
    return request({
        url: "/example2/",
        method,
        data
    })
}

export function example3() {
    return request({
        url: "/example3/",
        method: 'get'
    })
}