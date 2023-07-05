<template>
  <div id="tools" ref="toolsbar">
    <b-button-group >
      <b-button  id="changeCenter" @click="changeCenter">Change Center</b-button>
      <b-button id="download" @click="downLoad"  download="features.json">下载要素</b-button>
      
      <b-button active-class="active"  id="clear" @click="clearMap">清除页面</b-button>
      <b-button active-class="active"  id="editor" @click="editorMap">
        {{isEditing ? '退出编辑' : '编辑要素'}}
      </b-button>

      <!-- 选择添加什么要素 -->
      <b-button disabled>Add Geometry type:</b-button>
      <b-form-select v-model="selected" :options="options" @change="addGeomery" ref="childRef"></b-form-select>

      <b-dropdown right text="编辑">
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
    props: ['message'],
    data(){
      return{
        isEditing :false,
        isAddingLine:false,
        selected: null,
        options: [
          { value: "Point", text: 'Point' },
          { value: "LineString", text: 'LineString' },
          { value: "Polygon", text: 'Polygon' },
          { value: "Circle", text: 'Circle' },
          { value: 'None', text: 'None', disabled: true }
        ]
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
      },
      // 触发
      addGeomery(){
        console.log('addGeomery method in ToolsBar component with selected option:', this.selected);
        this.$emit('removeDrawInteraction'); // 新增的事件
        this.$emit('addGeomery', this.selected);
      }


    },
    mounted() {
      console.log(this.message); 
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