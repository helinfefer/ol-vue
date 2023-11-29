<template>
  <div>
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
  props:{
    dataFromParent: Array,
    default: () => []  // 默认值为空数组
  }, //在子组件中定义prop来接受父组件传递的数据，并将这个prop命名为dataFromParent
  methods:{
  },
  computed:{
  }
}
</script>
