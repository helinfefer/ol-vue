<template>
  <div id="tools">
    <b-button-group >
      <b-button  id="changeCenter" @click="changeCenter">Change Center</b-button>
      <b-button id="download" @click="downLoad"  download="features.json">下载要素</b-button>
      <b-dropdown right text="编辑">
        <b-dropdown-item active-class="active"  id="clear" @click="clearMap">清除页面</b-dropdown-item>
        <b-dropdown-item active-class="active"  id="editor" @click="editorMap">
          {{isEditing ? '退出编辑' : '编辑要素'}}
        </b-dropdown-item>

        <b-dropdown-item active-class="active" id="addPolygon" @click="addPolygon">添加Polygon</b-dropdown-item>
        <b-dropdown-item active-class="active" @click="addStringLine" >
          {{ isAddingLine ? '退出添加线要素' : '添加线要素' }}
        </b-dropdown-item>
      </b-dropdown>
    </b-button-group>
  </div>  
</template>
  
  <script>
  export default {
    name:"ToolsBar",
    data(){
      return{
        isEditing :false,
        isAddingLine:false,
      }
    },
    methods: {
      changeCenter(){
        console.log('changeCenter method in ToolsBar component triggered with center:');
        this.$emit('changeCenter', this.mapcenter)
      },
      clearMap(){
        console.log('clearPage method in ToolsBar component')
        this.$emit('clearMap')
      },
      editorMap(){
        console.log('editorMap method in ToolsBar component')
        this.isEditing = !this.isEditing;
        this.$emit('editorMap', this.isEditing); 
      },
      addPolygon(){
        console.log('addPolygon method in ToolsBar component')
        this.$emit('addPolygon')
      },
      downLoad(){
        console.log('downLoad method in ToolsBar component')
        this.$emit('downLoad')
      },
      addStringLine(){
        // console.log(this.isAddingLine)
        console.log('addStringLine method in ToolsBar component')
        this.isAddingLine = !this.isAddingLine;
        this.$emit('addStringLine', this.isAddingLine); 
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

b-button-group {
  display: flex;
}
</style>