const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const  NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new NodePolyfillPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader'
          }],
          include: [
            /echarts/
          ]
        }
      ]
    }
  }
});