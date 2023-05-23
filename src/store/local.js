//localStorage所有用到的key
//const EXAMPLE_KEY="example"
export const TOKEN = 'user_token'//鉴权
export const USERID = 'uid'//用户名
export const ADMINID = 'aid'//管理员id
export const AUTHENTICATE_ERR = 'token失效'//判断是否鉴权失败

export const UNHANDLE_SUBMIT_WORDLIST = 0//未处理的提交官方词单申请状态
export const ACCEPT_SUBMIT_WORDLIST = 1//允许的提交官方词单申请状态
export const REJECT_SUBMIT_WORDLIST = 2//决绝的提交官方词单申请状态