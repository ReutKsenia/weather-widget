const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require(`path`)

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve(`./node_modules/vue`),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.customElement = true
        return options
      })
  },
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new Dotenv()],
  },
})
