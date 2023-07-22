module.exports = {
  publicPath: '',
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util"),
      }
    }
  }
}
