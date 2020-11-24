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
<<<<<<< HEAD
  publicPath: './',
  productionSourceMap:false

=======
  publicPath: './'
>>>>>>> 29e1a3fa1e06eb671bf8e563da82549b692bbbd4
}
