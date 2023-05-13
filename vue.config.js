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
                target: 'https://sayhelloword.com',//代理的目标地址
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': '/dev-api',
                    '^/api': '/prod-api',
                }
            }
        }
    }
})
