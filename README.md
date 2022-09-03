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
```
activeColor ---------- 选中的颜色 default rgba(119, 221, 178, 0.3) 可选
nodeKey ------------ 组件的key default uuid 可选
minh ----------------- 最小高度 default 100 可选
minw ----------------- 最小高度 default 100 可选
```
### 说明
此组件为vue2版本的组件，如需要vue3版本的安装 ray-drag-resize-v3
