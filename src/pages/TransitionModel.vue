<!--  -->
<template >
    <el-tabs v-model="activeName" type="card"  @tab-click="handleClick"
    class="my-tabs">
      <el-tab-pane label="转移模型" name="first">
        <el-button type="primary" @click="runHTransition">运行家庭转移模型</el-button>
        <el-button type="primary" @click="runETransition">运行就业转移模型</el-button>
        <el-button type="primary" @click="orcaBack">清除缓存</el-button>
        <br>
        <span>{{ msg }}</span>
        <TableComponent v-if="plotData" :dataFromParent="plotData"/>
        <!-- <span>{{householdsTable}}</span> -->

        <!-- <TableComponent v-if="plotData" :dataFromParent="plotData"/>  -->
        <!-- v-if plotData，是为了保证只有在plotData在非null值时才渲染元素 -->
        
    </el-tab-pane>

    <!-- <el-tab-pane label="结果可视化" name="second">
      <MapMapbox :geojsonData="geojsonData"></MapMapbox>
    </el-tab-pane> -->
    <el-tab-pane label="结果可视化" name="second">
      <MapOl :geojsonData="geojsonData"></MapOl>
    </el-tab-pane>


    </el-tabs >


</template>
<script>
import TableComponent from '../pages/TableComponent.vue'

// import MapMapbox from './MapMapbox.vue';
import MapOl from './MapOl.vue';
import axios from 'axios';
  export default {
    data() {
      return {
        activeName: 'first',
        householdsTable :null,
        jobsTable :null,
        msg:null,
        plotData:null,
        geojsonData:{},
      }
    },
    methods: {
      handleClick(tab, event) {
            console.log(tab, event);
        },
      runHTransition(){
      // 运行转移模型
      console.log('运行家庭转移模型')
      // 给后端发送请求，
            axios.post('http://localhost:5000/run/hTransition') //post接受两个参数，一个是 URL（你的后端 API 终点），另一个是你要发送的数据。这将发送一个 POST 请求到你指定的 URL，并附带你的数据（在这种情况下是 this.settings）。
            .then(response => {
              // 处理响应
              this.householdsTable = JSON.parse(response.data.data) ;  
              this.msg = response.data.msg;
              this.geojsonData =response.data.geojson_plot_data;
              
              this.plotData = this.householdsTable
              console.log("*****this.geojsonData********",this.geojsonData['50']);
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
              console.log('get jobsTable table',this.plotData)
            }) //response 是服务器的响应
            .catch(error => {
          console.log(error);
        });
        // console.log('householdsTable',this.householdsTable)
      },
      orcaBack(){
        console.log("清除缓存");
          axios.post('http://localhost:5000/run/orcaBack').then(response =>{
                // 处理响应
                this.msg = response.data.msg; 
                console.log("runOfficeDeveloper ",this.developerData)
          })
      }
    },
    components:{
      TableComponent,
      // MapMapbox,
      MapOl
    },
    computed:{
      // householdsTable_plot(){
      //   return this.householdsTable.slice(0, 20);
      // }
    }
  }
</script>

<style scoped>
/* local styles */
.el-tabs{
  width: 900px;
}
.el-tabs__nav-scroll .el-tabs__content .mapboxgl-canvas{
  height: 500px;
  width: 100%;
}


</style>