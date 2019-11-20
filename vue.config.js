module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    output: {
      libraryExport: 'default',
    },
  },
  css: { extract: false },
}
