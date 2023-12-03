<template>
  <div>

    <p>就业控制总量</p>
    <el-select v-model="selectedJobFile" placeholder="请选择文件" @change="displayContent(selectedJobFile)">
        <el-option
            v-for="file in $store.state.uploadJobControlFileList"
            :key="file.uid"
            :label="file.name"
            :value="file">
        </el-option>
    </el-select>

    <p>家庭控制总量</p>
    <el-select v-model="selectedHouseholdFile" placeholder="请选择文件" @change="displayContent(selectedHouseholdFile)">
        <el-option
            v-for="file in $store.state.uploadHouseholdsControlFileList"
            :key="file.uid"
            :label="file.name"
            :value="file">
        </el-option>
    </el-select>

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
  </div>
</template>

<script>
export default {
  name:"ReusableTableComponent",
  data(){
    return{
      selectedJobFile: '',
      selectedHouseholdFile: '',
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

