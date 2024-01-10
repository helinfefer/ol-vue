<template>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="规划图" name="first">
        <span>下面是不同类型对应的可开发区块
        </span>
        <MapOlFeasibility></MapOlFeasibility>
      </el-tab-pane>

      <el-tab-pane label="可行性分析" name="second">
        <el-button type="primary" @click="runFeasibility">Run Feasibility</el-button>
        <br>
        <span> 对所有地块执行开发可行性分析，即效益计算，返回feasibility表格</span>
        <!--  MapOl作为子组件，传送feasibility 数据给它。-->
        <MapOl :feasibilityData = "feasibilityData"></MapOl>
        <br>

        <!-- <TableComponent></TableComponent> -->
      </el-tab-pane>
      <el-tab-pane label="开发商模型" name="third">
        <el-row>
          <el-button type="primary" @click="runFeasibility">Run Feasibility</el-button>
          <el-button type="primary" @click="runResidentialDeveloper">residential_developer</el-button>
          <el-button type="primary" @click="runRetailDeveloper">retail_developer</el-button>
          <el-button type="primary" @click="runOfficeDeveloper">office_developer</el-button>
          <el-button type="primary" @click="runIndustrialDeveloper">industrial_developer</el-button>
        </el-row>
        <br>
        <span> 对所有地块执行开发可行性分析，即效益计算，返回feasibility表格</span>
        <!--  MapOl作为子组件，传送feasibility 数据给它。-->
        <!-- <MapOl :feasibilityData = "feasibilityData"></MapOl> -->
        <br>

        <!-- 开发商模型发送给地图子组件的数据 -->
        <MapOl v-if="shouldRenderMapOl" :developerData = "developerData"></MapOl>
        <!-- <MapOl :developer_form = "developer_form"></MapOl> -->
        <!-- <MapOl v-if="shouldRenderMapOl" :developerDataMerge="developerDataMerge"></MapOl> -->
      </el-tab-pane>
      <!-- <el-tab-pane label="非居住开发商模型" name="fourth">非居住开发商模型</el-tab-pane> -->

      <!-- <el-tab-pane label="结果可视化" name="fourth">结果可视化</el-tab-pane> -->
    </el-tabs>
  </template>
  <script>
  import axios from 'axios';
  import MapOl from './MapOl.vue';
  // import TableComponent from '../pages/TableComponent.vue'
  import MapOlFeasibility from '../pages/MapOlFeasibility.vue'

    export default {
    data() {
        return {
            activeName: 'first',
            feasibilityData:{},
            // plotData:{},
            // householdsTable:{},
            developerData:{},
            developer_form:"default",
        };
    },
    computed:{
      // developerDataMerge() {
      //   return {
      //     "developerData": this.developerData,
      //     "developer_form": this.developer_form
      //   };
      // },
    shouldRenderMapOl() {
        return this.developerData != null && this.developer_form !== "default"; // 这里是你的条件
      }
    },
    components:{
      // TableComponent,
      MapOlFeasibility,
      MapOl
    },
    
    methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        runFeasibility(){
            // 家庭区位选择
            console.log('运行家庭区位选择模型')
            // this.feasibilityData = {
            //   "45": 1,
            //   "60":0,
            //   "75":1,
            // };
            axios.post('http://localhost:5000/run/feasibility').then(response =>{
                // 处理响应
                // this.householdsTable = JSON.parse(response.data.data);
                // this.msgHLCM = response.data.msg;
                // this.plotData = this.householdsTable 
                this.feasibilityData = response.data.geojson_plot_data; 
                // console.log("feasibility output ",this.feasibilityData)
            })
        },
        runResidentialDeveloper(){
          this.developer_form = "residential"
          console.log("居住 - 开发商模型");
          axios.post('http://localhost:5000/run/residential_developer').then(response =>{
                // 处理响应
                this.householdsTable = JSON.parse(response.data.data);
                // this.msgHLCM = response.data.msg;
                // this.plotData = this.householdsTable 
                this.developerData = response.data.geojson_plot_data; 
                // console.log("feasibility output ",this.feasibilityData)
            })

        },
        runRetailDeveloper(){
          console.log("零售- 开发商模型");
          this.developer_form = "retail"
          axios.post('http://localhost:5000/run/retail_developer').then(response =>{
                // 处理响应
                // this.householdsTable = JSON.parse(response.data.data);
                // this.msgHLCM = response.data.msg;
                // this.plotData = this.householdsTable 
                this.developerData = response.data.geojson_plot_data; 
                // console.log("runRetailDeveloper ",this.developerData)
            })
        },
        runOfficeDeveloper(){
          console.log("办公- 开发商模型");
          this.developer_form = "office"
          axios.post('http://localhost:5000/run/office_developer').then(response =>{
                // 处理响应
                // this.householdsTable = JSON.parse(response.data.data);
                // this.msgHLCM = response.data.msg;
                // this.plotData = this.householdsTable 
                this.developerData = response.data.geojson_plot_data; 
                // console.log("runOfficeDeveloper ",this.developerData)
            })
        },
        runIndustrialDeveloper(){
          console.log("工业- 开发商模型");
          this.developer_form = "industrial"
          axios.post('http://localhost:5000/run/industrial_developer').then(response =>{
                // 处理响应
                // this.householdsTable = JSON.parse(response.data.data);
                // this.msgHLCM = response.data.msg;
                // this.plotData = this.householdsTable 
                this.developerData = response.data.geojson_plot_data; 
                // console.log("runOfficeDeveloper ",this.developerData)
            })

        },

    },

};
  </script>




<style scoped>
/* local styles */
.el-tabs{
  width: 1200px;
}
.el-tabs__nav-scroll .el-tabs__content .mapboxgl-canvas{
  height: 500px;
  width: 100%;
}

</style>

