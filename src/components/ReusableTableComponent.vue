<template>
  <div>
      <el-table
      :data="paginatedData"
      style="width: 100%"
      >
        <!-- 动态生成 el-table-column -->
        <el-table-column
        v-for="(value, key) in paginatedData[0]"
          :key="key"
          :prop="key"
          :label="key"
          ></el-table-column>
      </el-table>

      <!-- 页码组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$store.state.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="$store.state.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="$store.state.dataShowOnTable.length">
      </el-pagination>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:"ReusableTableComponent",
  components:{},
  data(){
    return{
    }
  },
  props:{
    dataFromParent: Array,
    default: () => []  // 默认值为空数组
  }, //在子组件中定义prop来接受父组件传递的数据，并将这个prop命名为dataFromParent
  methods:{
    handleCurrentChange(newPage) {
      this.$store.commit('HANDLECURRENTCHANGE',newPage)
    },
    handleSizeChange(newSize) {
      this.$store.commit('HANDLESIZECHANGE',newSize)
    }
  },
  computed:{
    ...mapGetters(['paginatedData'])
  },
  created(){
    // this.$store.commit('SLICETABLEDATA')
  }
}
</script>