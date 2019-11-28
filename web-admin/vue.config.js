module.exports = {
    devServer: {
        proxy: {
            "/Service": {
                target: "http://192.168.3.39/",
                changeOrigin: true,
                autoRewite: true,
                cookieDomainRewrite: true
            }
        }
    }
};