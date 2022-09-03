import dragResize from './components/DragResize.vue'
const components = [dragResize]
export {dragResize}
const install = (app)=>{
  components.forEach(comp=>{
    console.log(comp)
    app.component(comp.name,comp)
  })
}
export default install