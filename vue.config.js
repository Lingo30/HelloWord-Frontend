const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    productionSourceMap: process.env.NODE_ENV === 'development',
    publicPath: process.env.NODE_ENV === 'development' ? '/tww/' : '/',
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: process.env.NODE_ENV === 'development' ? 'https://sayhelloword.com/dev-api' : 'https://sayhelloword.com/prod-api',//代理的目标地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})
