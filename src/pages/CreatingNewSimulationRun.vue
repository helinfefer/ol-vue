<template>
  <div>
  <el-button @click="dialogVisible = true">Create Run</el-button>
  <el-dialog
    :visible.sync="dialogVisible"
    width="80%"
    >
  <el-form>
    <el-form-item>
      <header>
        <h1 class="h1">创建一个新模拟运行</h1>
        <hr>
      </header>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <h2 class="h2-1">选择情景</h2>
  

      <el-form-item>
        <el-checkbox-group class="checkbox-group" v-model="runFormData.selectedScenario">
            <el-checkbox v-for="scenario in scenarioCollections" 
                :key="scenario.id"
                :label="scenario.name" 
                :name="scenario.name"
                :value="scenario"
                class="checkbox">
            </el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    

        </el-col>
        <el-col :span="8">
          <h2>运行步骤</h2>
          <el-form-item>
          <span>结束年:</span> <el-input-number v-model="runFormData.end_year" controls-position="right" @change="handleChange" :min="2010" ></el-input-number>
          </el-form-item>
          <el-form-item>
          <span>随机种子(可选):</span> <el-input-number v-model="runFormData.random_seed" controls-position="right" @change="handleChange" :min=0 ></el-input-number>
          </el-form-item>
          <el-form-item>
            <span>
            校正系数:   
            <el-switch
                v-model="runFormData.calibrated_coefficients"
                active-color="#blue"
                inactive-color="#gray">
            </el-switch>
            </span>
          </el-form-item>
  
          <h2>Notes</h2>
          <hr>
          <el-form-item>
            <input type="text" class="notes">
          </el-form-item>
        </el-col>
      </el-row>
        <el-form-item>
          <hr>
          <footer>
          <span slot="footer">
          <el-button type="danger"  class="mybb1"  size="medium">Cancel</el-button>
          <el-button type="success"  class="mybb2" size="medium" @click="showFormData" >Start Run</el-button>
          </span>
          </footer>
        </el-form-item>
    </el-form>
  
    </el-dialog>
  </div>
  </template>
  
  <script>
  import { mapState} from 'vuex';

  export default {
    name: 'CreateRun',
    data() {
      return {
        dialogVisible: false, 
        runFormData:{
          selectedScenario:[], //选择的情景
          end_year: 2010,
          random_seed:0,
          rancalibrated_coefficients:true, //校正系数
          // checkList:["All scenarios","Anoka Expressway","Baseline_skims","Satellite Campus Cluster",
          // "Transit expansion","University Expansion","Upzone"],
          // checkList:[
          //   {label:"All scenarios",name:"checked"},
          //   {label:"Anoka Expressway",name:"checked"},
          //   {label:"Baseline_skims",name:"checked"},
          //   {label:"Satellite Campus Cluster",name:"checked"},
          //   {label:"Transit expansion",name:"checked"},
          //   {label:"University Expansion",name:"checked"},
          //   {label:"Upzone",name:"checked"},
          // ],
        }
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      showFormData(){
        console.log("🚀 ~ showFormData ~ this.runFormData:", this.runFormData)
      }
    },
    components: {
    },
    computed: {
      ...mapState(['baseDataCollections','scenarioCollections']),
      // 
      // checkList(){
      //   // 情景名称列表

      // }
    },
    mounted:{
      showFormData(){
        console.log(this.runFormData),
        this.dialogVisible=false
      },
      closedialog(){
        this.dialogVisible=false
      }
    },
  }
  </script>
  
  <style scoped>
  /* h1间距调整 */
  .h1{
    margin-left: 30px;
  }
  
  /* 列表间距调整 */
  .checkbox-group{
    margin-bottom: 20px;
    margin-left:50px}
  
  /* h2间距调整 */
  .h2-1{
    margin-left: 30px;
  }
  
  /* notes框大小设置 */
  .notes{
    width: 450px; 
    height:150px;
  }
  
  /* 勾选框竖直排列 */
  .checkbox{
  
    display: block; /* 将 label 设置为块级元素 */
    margin-bottom: 10px; /* 设置下边距，可根据需要调整 */
  }
  
  /* footer按钮位置调节 */
  footer {
    position: relative;
  }
  .mybb2{ 
      position: absolute; 
      bottom: 1; 
      right: 20px; 
   }   
  .mybb1{
    position: absolute;
    bottom: 1; 
    right: 150px;
     } ; 
  
  
  </style>