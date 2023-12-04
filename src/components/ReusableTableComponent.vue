<template>
  <div>
    <el-row>
      <el-col :span="4">
        <DataListComponent/>
      </el-col>
      <el-col :span="20">
        <el-table
        :data="dataFromParent"
        style="width: 100%"
        >
          <!-- 动态生成 el-table-column -->
          <el-table-column
          v-for="(value, key) in dataFromParent[0]"
            :key="key"
            :prop="key"
            :label="key"
            ></el-table-column>
          </el-table>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import DataListComponent from "../components/DataListComponent.vue"
export default {
  name:"ReusableTableComponent",
  components:{DataListComponent},
  data(){
    return{
    }
  },
  props:{
    dataFromParent: Array,
    default: () => []  // 默认值为空数组
  }, //在子组件中定义prop来接受父组件传递的数据，并将这个prop命名为dataFromParent
  methods:{
    displayContent(file){
      // 展示数据
      // 根据选择的文件处理逻辑
      // 例如，更新表格内容或执行其他操作
      console.log("displayContent 被调用：",file.name)
      
    }
  },
  computed:{
  }
}
</script>