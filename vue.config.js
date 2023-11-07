module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://sourcebyte.cn',
		target: 'https://gelin8.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}