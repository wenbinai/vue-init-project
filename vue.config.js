module.exports = {
  // lintOnSave: false,
  devServer: {
    port: 8088,
    proxy: {
      '/api/': {
        target: 'http://101.200.231.235:8080',
        ws: true,
        changeOrigin: true,
      },
    }
  },
  publicPath: './'
}
