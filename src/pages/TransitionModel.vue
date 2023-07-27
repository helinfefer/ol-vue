<!--  -->
<template >
  <div>
    <el-button type="primary" @click="runHTransition">运行家庭转移模型</el-button>
    <el-button type="primary" @click="runETransition">运行就业转移模型</el-button>
    <br>
    <span>{{ msg }}</span>
    <TableComponent :dataFromParent="plotData"/>
    <!-- <span>{{householdsTable}}</span> -->
  </div>

</template>
<script>
import TableComponent from '../pages/TableComponent.vue'
import axios from 'axios';
  export default {
    data() {
      return {
        householdsTable :null,
        jobsTable :null,
        msg:null,
        plotData:null,
      }
    },
    methods: {
      runHTransition(){
      // 运行转移模型
      console.log('运行家庭转移模型')
      // 给后端发送请求，
            axios.post('http://localhost:5000/run/hTransition') //post接受两个参数，一个是 URL（你的后端 API 终点），另一个是你要发送的数据。这将发送一个 POST 请求到你指定的 URL，并附带你的数据（在这种情况下是 this.settings）。
            .then(response => {
              // 处理响应
              // console.log(response.data);
              this.householdsTable = JSON.parse(response.data.data) ;  
              this.msg = response.data.msg
              this.plotData = this.householdsTable
              console.log(this.householdsTable)
              console.log(typeof this.householdsTable);
            }) //response 是服务器的响应
            .catch(error => {
          console.log(error);
        });
        console.log('householdsTable')
      },

      runETransition(){
      // 运行转移模型
      console.log('运行就业转移模型')
      // 给后端发送请求，
            axios.post('http://localhost:5000/run/ETransition') //post接受两个参数，一个是 URL（你的后端 API 终点），另一个是你要发送的数据。这将发送一个 POST 请求到你指定的 URL，并附带你的数据（在这种情况下是 this.settings）。
            .then(response => {
              // 处理响应
              // console.log(response.data);
              this.jobsTable = JSON.parse(response.data.data) ;  
              this.plotData = this.jobsTable
              this.msg = response.data.msg
              console.log('get jobsTable table')
            }) //response 是服务器的响应
            .catch(error => {
          console.log(error);
        });
        // console.log('householdsTable',this.householdsTable)
      },
    },
    components:{
      TableComponent
    },
    computed:{
      // householdsTable_plot(){
      //   return this.householdsTable.slice(0, 20);
      // }
    }
  }
</script>