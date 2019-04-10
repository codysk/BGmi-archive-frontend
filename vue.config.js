module.exports = {
  publicPath: '/bangumi/.core/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    sourceMap: true
  },
  pages: {
    index: {
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/': {
        target:"http://bgmi.two.moe/",
        changeOrigin:true,
        ws: false,
      }
    }
  }
}