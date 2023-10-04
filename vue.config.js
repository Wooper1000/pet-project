const { defineConfig } = require('@vue/cli-service')
// const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      topLevelAwait: true
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8085, // CHANGE YOUR PORT HERE!
    https: true
  }
  // devServer:{
  //   https: {
  //     key: fs.readFileSync('./server.key'),
  //     cert: fs.readFileSync('./server.crt'),
  //   },
  // }
})
