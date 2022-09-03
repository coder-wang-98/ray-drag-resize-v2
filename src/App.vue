<template>
  <div id="app">
    <drag-resize-v2 @onDragResize="getData" dragDisabled >
      test
    </drag-resize-v2>
    <drag-resize-v2 @onDragResize="getData" >
      test1
    </drag-resize-v2>
  </div>
</template>

<script>


export default {
  name: 'App',
  methods:{
    getData(data){
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
#app{
  width: 400px;
  height: 400px;
}
</style>
