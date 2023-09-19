module.exports = {
  publicPath: '',
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js',
      },
      fallback: {
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util"),
      }
    }
  }
}
