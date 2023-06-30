<template>
  <div id="tools">
    <b-button-group  class="button-group">
      <b-button variant="primary" id="clear">清除页面</b-button>
      <b-button variant="primary" id="editor">编辑</b-button>
      <b-button variant="primary" id="addPolygon">添加Polygon</b-button>
      <b-button variant="primary" id="download" download="features.json">下载要素</b-button>
    </b-button-group>
  </div>
</template>
  
  <script>
  export default {
    name:"ToolsBar"
    // any methods or computed properties for this component go here
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