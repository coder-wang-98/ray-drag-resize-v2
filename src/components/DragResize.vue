<template>
  <div 
  class="drag-resize-container"
  :class="disabled ? 'disable' : ''"
  :style="cur == nodeKey &&!disabled ? `backgroundColor:${activeColor}` : ''" 
  ref="dragResize" 
  @mousedown="onDrag"  
  @mouseenter="cur = nodeKey " 
  @mouseleave="cur = null "
  >
  <span class="tip" v-show="resizeShow">
    {{resizeValue}}
  </span>
  <span class="tip" v-show="dragShow">
    {{dragValue}}
  </span>
    <slot>

    </slot>
    <div ref="resizeNode" class="resize-node" @mousedown.stop="onResize" v-show="!resizeDisabled">

    </div>
  </div>
</template>

<script>
import {v4 as uuid } from 'uuid'
export default {
name:'dragResizeV2',
components: {},
data() {
return {
  cur:'',
  point:{
    left:'',
    top:''
  },
  size:{
    width:'',
    height:''
  },
  dragShow:'',
  resizeShow:''
};
},
props:{
  activeColor:{
    type:String,
    default:'rgba(119, 221, 178, 0.3)'
  },
  nodeKey:{
    type:[Number,String],
    default:uuid()
  },
  minh:{
    type:Number,
    default:100
  },
  minw:{
    type:Number,
    default:100
  },
  disabled:{
    type:Boolean,
    default:false
  },
  dragDisabled:{
    type:Boolean,
    default:false
  },
  resizeDisabled:{
    type:Boolean,
    default:false
  }
},
computed: {
  dragValue(){
    return `[${this.point.left || 0},${this.point.top || 0}]`
  },
  resizeValue(){
    return `${this.size.width || 0}*${this.size.height || 0}`
  }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  onDrag(e){
    if(this.dragDisabled || this.disabled){
      console.warn('您已关闭拖拽功能,如需拖拽请将disabled|dragDisabled设置为true')
    }else{
      const parentDom = this.$refs.dragResize.parentElement
      let oldPostion = parentDom.style.position
      parentDom.style.position = 'relative'
      let reg = /(\d+px, \d+px)/
      let curX,curY
      if(this.$refs.dragResize.style.transform.match(reg)){
        curX = this.$refs.dragResize.style.transform.match(reg)[0].split(',')[0]
        curY = this.$refs.dragResize.style.transform.match(reg)[0].split(',')[1]
      }
      let disX = e.clientX - parseFloat(curX) || this.$refs.dragResize.offsetLeft;
      let disY = e.clientY - parseFloat(curY) || this.$refs.dragResize.offsetTop;
      //阻止浏览器的默认事件
      e.preventDefault();
      let _this = this
      document.onmousemove = function(e) {
        _this.dragShow = true
        var x = e.clientX - disX;
        var y = e.clientY - disY;
          if (x < 0) {
              x = 0
          } else if (x > (parentDom.clientWidth - _this.$refs.dragResize.clientWidth)) {
              x = parentDom.clientWidth - _this.$refs.dragResize.clientWidth
          }
          if (y < 0) {
              y = 0
          } else if (y > (parentDom.clientHeight - _this.$refs.dragResize.clientHeight)) {
              y = parentDom.clientHeight - _this.$refs.dragResize.clientHeight
          }
          _this.$refs.dragResize.style.transform = `translate(${x}px, ${y}px)`
          _this.$refs.dragResize.setAttribute('left',x+'px')
          _this.$refs.dragResize.setAttribute('top',y+'px')
          _this.point.left = x
          _this.point.top = y
      }
      document.onmouseup = function() {
          _this.dragShow = false
          document.onmousemove = null;
          document.onmouseup = null;
          parentDom.style.position = oldPostion
          let reg = /(\d+px, \d+px)/
          let curX,curY
          if(_this.$refs.dragResize.style.transform.match(reg)){
            curX = _this.$refs.dragResize.style.transform.match(reg)[0].split(',')[0]
            curY = _this.$refs.dragResize.style.transform.match(reg)[0].split(',')[1]
          }
          _this.$emit('onDragResize',{
              left:curX,
              top:curY,
              height:_this.$refs.dragResize.style.height,
              width:_this.$refs.dragResize.style.width,
              nodeKey:_this.nodeKey
          })
      }
    }
  },
  onResize(){
    if(this.resizeDisabled || this.disabled){
      console.warn('您已关闭设置大小功能,如想开启请将disabled|resizeDisabled设置为true')
    }else{
      const parentDom = this.$refs.dragResize.parentElement
      const event = window.event
      event?.stopPropagation()
      event?.preventDefault()
      const height = this.$refs.dragResize.clientHeight
      const width = this.$refs.dragResize.clientWidth
      const startX = event.clientX
      const startY = event.clientY
      const move = (moveEvent) => {
          this.resizeShow = true
          const currX = moveEvent.clientX
          const currY = moveEvent.clientY
          const disY = currY - startY
          const disX = currX - startX
          const newHeight = (height + disY) > this.minh ?  (height + disY) > parentDom.clientHeight ? parentDom.clientHeight:(height + disY) : this.minh
          const newWidth = (width + disX) > this.minw ? (width + disX) > parentDom.clientWidth ? parentDom.clientWidth : (width + disX) : this.minw
          this.$refs.dragResize.style.width = newWidth + "px";
          this.$refs.dragResize.style.height = newHeight + "px";
          this.size.width = newWidth
          this.size.height = newHeight
          console.log(newWidth,newHeight)
          this.$refs.dragResize.setAttribute('width',newWidth+'px')
          this.$refs.dragResize.setAttribute('height',newHeight+'px')
      }

      const up = () => {
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          this.resizeShow = false
          let reg = /(\d+px, \d+px)/
          let curX,curY
          if(this.$refs.dragResize.style.transform.match(reg)){
            curX = this.$refs.dragResize.style.transform.match(reg)[0].split(',')[0]
            curY = this.$refs.dragResize.style.transform.match(reg)[0].split(',')[1]
          }
          this.$emit('onDragResize',{
              left:curX,
              top:curY,
              height:this.$refs.dragResize.style.height,
              width:this.$refs.dragResize.style.width,
              nodeKey:this.nodeKey
          })
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  this.$refs.dragResize.parentElement.style.position = 'relative'
  this.$refs.dragResize.style.transform = `translate(${this.$refs.dragResize.offsetLeft}px, ${this.$refs.dragResize.offsetTop}px)`
},
}
</script>
<style lang='scss' scoped>
.drag-resize-container{
  position: absolute;
  width: 100%;
  height: 100%;
  &:active{
    cursor: move;
    .resize-node {
      bottom: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
    }
  }
  .tip{
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 12px;
  }
  .resize-node{
    box-sizing: border-box;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    transition-duration: 2s;
    transition-duration: 200ms;
    cursor: nw-resize;
    &:hover{
      bottom: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
    }
  }
}
.disable{
  &:hover{
    cursor: default;
  }
  .tip{
    display: none;
  }
  .resize-node{
    display: none;
  }
}
</style>