module.exports = {
  pages: {
    index: './demo/main.js',
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      libraryExport: 'default',
    },
  },
  css: { extract: false },
}
