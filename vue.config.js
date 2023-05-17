const { defineConfig } = require('@vue/cli-service')
// const fs = require('fs')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer:{
  //   https: {
  //     key: fs.readFileSync('./server.key'),
  //     cert: fs.readFileSync('./server.crt'),
  //   },
  // }
})
