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
initTop | 初始Y轴坐标 | 10 | number
initLeft | 初始X轴坐标 | 10 | number
initHeight | 初始高度 | 200 | number
initWidth | 初始宽度 | 200 | number
disabled|禁止拖拽和放大缩小|false|boolean
dragDisabled|禁止拖拽|false|boolean
resizeDisabled|禁止放大缩小|false|boolean
horn|通过角进行拖拽|true|boolean
edge|通过边进行拖拽|true|boolean
## events
函数名|描述
--|--
onDragResize|拖拽或设置大小后抛出的事件 包含当前组件的位置及大小信息及nodeKey
### 说明
此组件为vue2版本的组件，如需要vue3版本的安装 ray-drag-resize-v3(更新较慢)。
如有改进建议[github](https://github.com/Ray-wgs/ray-drag-resize-v2)提issue。
