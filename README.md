# ray-drag-resize-v2

## 安装
```
npm install ray-drag-resize-v2
```
## 引入
```
import dragResizeV2 from 'ray-drag-resize-v2'
import 'ray-drag-resize-v2/lib/drag-resize-v2.css'
Vue.use(dragResizeV2)
```
## 使用
```
<drag-resize-v2 @onDragResize="handleData">
  content
</drag-resize-v2>

methods:{
  handleData(data){
    console.log(data)
  }
}
```
## props
属性|描述|default|type
--|--|--|--
activeColor| 选中的颜色 |rgba(119, 221, 178, 0.3) |string
nodeKey | 组件的key |  uuid() | number/string
minh | 最小高度 | 100 | number
minw | 最小高度 | 100 | number
disabled|禁止拖拽和放大缩小|false|boolean
dragDisabled|禁止拖拽|false|boolean
resizeDisabled|禁止放大缩小|false|boolean
### 说明
此组件为vue2版本的组件，如需要vue3版本的安装 ray-drag-resize-v3
