# mp-activity
微信小程序--cc赋能+分享海报

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev:mp-weixin
```

### Compiles and minifies for production
```
npm run build:mp-weixin
```

### Customize configuration
+ See [Configuration Reference](https://cli.vuejs.org/config/).
+ [UNI-APP官网](https://uniapp.dcloud.io/).

## 页面技术支持
eslint、commitlint、vuex

## 注意点
+ uni-app对vconsole支持的不友好，暂不能使用
+ 设计稿按750宽度实现，使用rpx
+ 组件api方式封装不如组件元素化封装使用方便
+ 微信小程序存在2M发版限制，
  + 项目初期走pages主页面模式，后期内容量增大，采用分包模式
  + **static除现有文件不允许再存放其他静态文件，图片一律采取cdn形式**
  + 公共变量尽量使用vuex集中处理，减少冗余代码
  + 尽可能使用公共组件或uni-app自带组件例如loading、toast、dialog等
