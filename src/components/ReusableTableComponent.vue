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
        @size-change="HANDLE_SIZE_CHANGE"
        @current-change="HANDLE_CURRENT_CHANGE"
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
  // props:{
  //   'dataFromParent': {
  //       type: Array,
  //       default: function() {
  //         return [];
  //     },
  // },
  // },
  data(){
    return{
    }
  },
  methods:{
    HANDLE_CURRENT_CHANGE(newPage) {
      this.$store.commit('HANDLE_CURRENT_CHANGE',newPage)
    },
    HANDLE_SIZE_CHANGE(newSize) {
      this.$store.commit('HANDLE_SIZE_CHANGE',newSize)
    }
  },
  computed:{
    // table组件的展示内容还是用父组件传递过来的比较好
    ...mapGetters(['paginatedData'])
  },
  created(){
  },
  watch: {
    'dataFromParent': {
      handler(newValue, oldValue) {
        // 处理状态变化
        console.log("🚀 ~ file: ReusableTableComponent.vue:68 ~ handler ~ newValue:", newValue,oldValue)
      },
      deep: true // 如果需要深度观察对象内部的变化
    }
  },
}
</script>