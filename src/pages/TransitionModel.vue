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
    <el-row>
      <el-button type="primary" @click="runHTransition">运行转移模型</el-button>
    </el-row>
    <TableComponent/>
    <span>{{householdsTable}}</span>
</el-form>

</template>
<script>
import TableComponent from '../pages/TableComponent.vue'
import axios from 'axios';
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
        },
        householdsTable :null,
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      runHTransition(){
      // 运行转移模型
      console.log('运行转移模型')
      // 给后端发送请求，
            axios.post('http://localhost:5000/run/hTransition') //post接受两个参数，一个是 URL（你的后端 API 终点），另一个是你要发送的数据。这将发送一个 POST 请求到你指定的 URL，并附带你的数据（在这种情况下是 this.settings）。
            .then(response => {
              // 处理响应
              // console.log(response.data);
              this.householdsTable = response.data;  
            }) //response 是服务器的响应
            .catch(error => {
          console.log(error);
        });
        console.log('householdsTable',this.householdsTable)
      },
    },
    components:{
      TableComponent
    }
  }
</script>