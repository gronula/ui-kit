const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule(`svg`)
    svgRule.uses.clear()
    svgRule
      .use(`svg-sprite-loader`)
      .loader(`svg-sprite-loader`)
      .tap(() => {
        return {
          extract: true,
          spriteFilename: `img/sprite.svg`
        }
      })
  },
  configureWebpack: {
    devServer: {
      open: true
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true
      }),
      new ImageminWebpWebpackPlugin({
        config: [
          {
            test: /img\/.*\.(jpe?g|png)$/i,
            options: {
              quality: 90
            }
          }
        ],
        detailedLogs: true,
        strict: true
      })
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/styles/utils/_variables.scss";
          @import "@/assets/styles/mixins/_fonts.scss";
          @import "@/assets/styles/mixins/_respond.scss";`
      }
    }
  }
}
