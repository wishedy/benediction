# 小程序神策埋点

## 使用

### initSensor

- 初始化神策

引入 initSensor

`import initSensor from '@/libs/sensors'`

初始化

```js
// 传入公共属性
initSensor({
  commonPara: {
    platform: 'MiniProgram' // 平台类型
  }
})
```

参数

| 参数        | 含义   |
| --------   | -----  |
| commonPara | 自定义公共属性（各需求产品负责人定义） |

### saTrack

- 手动埋点方法

引入 saTrack

`import { saTrack } from '@/libs/sensors'`

```js
saTrack('login', { username: '张三' })
```

参数

| 参数        | 含义   |
| --------   | -----  |
| trackId    | 事件 id，记录到 event 属性 |
| trackPara  | 事件属性，记录到 properties 属性 |


### 预置事件

- 设置预置事件的某些属性值

- $MPClick

当小程序 tap/ longtap / longpress 事件被触发时会记录 $MPClick 事件，元素上的 data-content 会被记录到 $element_content 属性，元素上的 id 会被记录到 $element_id 属性，元素上的 data-name 会被记录到 $element_name 属性，元素上的 data-type 会被记录到 $element_type 属性，当前页面路径会被记录到 $url_path 属性

```html
<template>
  <view class="jy-scroll-top" @click="handleScroll" 
    data-content="返回顶部"
    data-name="返回顶部"
    data-type="view">返回顶部</view>
</template>
```