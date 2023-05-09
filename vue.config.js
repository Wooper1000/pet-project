const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
devServer:{
    port:5000,
  proxy: {
    '/api': {
      target: 'http://185.46.9.110:9090',
      changeOrigin: true
    }
  }
  }
})
