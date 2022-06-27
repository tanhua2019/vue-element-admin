const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      },
      '/font': {
        target: 'https://api.imooc-front.lgdsunday.club',
        changeOrigin: true,
        pathRewrite: {
          '^/font': '/api'
        }
      }
    }
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
        },
        fallback: {
          path: require.resolve("path-browserify"),
        },
      },
    }
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
