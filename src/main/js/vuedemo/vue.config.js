module.exports = {
  devServer: {
    proxy: 'http://localhost:8081',
  },
  outputDir: '../../resources/static/vue',
  publicPath: '/vue/',
};