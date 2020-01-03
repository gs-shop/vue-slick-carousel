const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const marked = require('marked')
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
loadLanguages(['bash'])

module.exports = {
  pages: {
    index: {
      entry: './demo/main.js',
      template: './demo/template.html',
      title: '🚥 Vue Slick Carousel with True SSR Written for Faster Luxstay',
    },
  },
  publicPath: '.',
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .options({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
          return Prism.highlight(code, Prism.languages[lang], lang)
        },
        gfm: true,
      })
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      libraryExport: 'default',
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/slick-theme.css'),
          to: path.join(__dirname, 'dist/vue-slick-carousel-theme.css'),
        },
      ]),
    ],
  },
  css: { extract: true },
}
