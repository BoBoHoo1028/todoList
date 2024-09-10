const { defineConfig } = require('@vue/cli-service')
module.exports = { devServer: { proxy: 'http://localhost:7070', }, };
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     // port:8080,
//     // proxy: {
//     //   '/api': {
//     //     target: 'http://localhost:7070',
//     //     changeOrigin: true,
//     //     pathRewrite: {'^/api': ''},
//     //   },
//     // },
//   },
// })