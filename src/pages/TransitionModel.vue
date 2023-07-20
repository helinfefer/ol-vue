<!--  -->
<template >
  <el-form ref="form" :model="form" label-width="80px">
    <!-- 转移模型类型选择 -->
    <el-form-item label="类型">
        <el-radio-group v-model="form.resource">
            <el-radio label="家庭"></el-radio>
            <el-radio label="就业"></el-radio>
        </el-radio-group>
        <!-- 家庭属性分类 -->
    </el-form-item>
    <el-form-item
    label = "收入分段"
    prop = 'incomeSegement'
    :rules="[
      {type:'number',message:'必须为数值'}
    ]"
    >
    <el-input v-model.number="form.incomeSegement" autocomplete ='on'></el-input>

    </el-form-item>
</el-form>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          incomeSegement:'4'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>