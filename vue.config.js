const chainWebpack = (config) => {
  config.module
    .rule('eslint')
    .use('eslint-loader')
    .loader('eslint-loader')
    .tap(options => {
      options.fix = true
      options.emitWarning = true
      return options
    })
  // 移除 prefetch 插件
  config.plugins.delete('prefetch')
  // 移除 preload 插件
  config.plugins.delete('preload')
}
module.exports = {
  chainWebpack: chainWebpack
}
