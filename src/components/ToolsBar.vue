<template>
  <div id="tools">
    <p>{{mapcenter}}</p>
    <b-button-group  class="button-group">
      <b-button variant="primary" id="changeCenter" @click="changeCenter">Change Center</b-button>
      <b-button variant="primary" id="clear">清除页面</b-button>
      <b-button variant="primary" id="editor">编辑</b-button>
      <b-button variant="primary" id="addPolygon">添加Polygon</b-button>
      <b-button variant="primary" id="download" download="features.json">下载要素</b-button>
    </b-button-group>
  </div>  
</template>
  
  <script>
  export default {
    name:"ToolsBar",
    data(){
      return{
        mapcenter:[100,100]
      }
    },
    methods: {
      changeCenter(){
        console.log('changeCenter method in ToolsBar component triggered with center:');
        this.$emit('changeCenter', this.mapcenter)
      }
    }
  }
  </script>

<style scoped>
#tools {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.button-group {
  display: flex;
  gap: 10px;
}
</style>