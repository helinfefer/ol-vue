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
  props:['dataFromParent'], //在子组件中定义prop来接受父组件传递的数据，并将这个prop命名为dataFromParent
  data() {
    return {
      householdsTable: [
        {
          "building_id": 4648,
          "income": 4000,
          "income_quartile": 1,
          "income_segment": 1,
          "parcel_id": 44.0,
          "persons": 2,
          "zone_id": 249.0
        },
        {
          "building_id": 762,
          "income": 4000,
          "income_quartile": 1,
          "income_segment": 1,
          "parcel_id": 153.0,
          "persons": 2,
          "zone_id": 41.0
        },
        {
          "building_id": 1089,
          "income": 6000,
          "income_quartile": 1,
          "income_segment": 1,
          "parcel_id": 144.0,
          "persons": 2,
          "zone_id": 32.0
          // 在这里继续添加你的数据
        }
      ],
    }
  },
  methods:{
  },
  computed:{
    // paginatedData() {
    //   return this.dataFromParent.slice(0, 20);
    // },
  }
}
</script>
