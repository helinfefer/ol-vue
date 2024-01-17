<template>
  <div>
    <el-button @click="createRunDialogVisible = true">创建模拟运行</el-button>
    <ImageGallery></ImageGallery>

  <!-- 创建模拟运行的dialog -->
  <el-dialog
    :visible.sync="createRunDialogVisible"
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
          <el-button type="success"  class="mybb2" size="medium" @click="startRun" >开始运行</el-button>
          </span>
          </footer>
        </el-form-item>
    </el-form>
  
  </el-dialog>
  <el-dialog title="运行界面" :visible.sync="runDialogVisible" width="80%">
    <div class="status-bar">
      <div>运行状态: <span>{{ runStatus }}</span></div>
      <el-progress :percentage="progress"></el-progress>
    </div>
    
    <div class="console-output-f">
      <pre class="console-output">{{ consoleOutput }}</pre>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="HandleClose">Close</el-button>
      <el-button type="primary" @click="deleteRun">Delete Run</el-button>
    </div>
  </el-dialog>

  </div>
  </template>
  
  <script>
  import ImageGallery from '../components/ImageGallery.vue'
  import { mapState} from 'vuex';
  import axios from 'axios';
  export default {
    name: 'CreateRun',
    data() {
      return {
        createRunDialogVisible: false, 
        runDialogVisible:false, 
        runFormData:{
          selectedScenario:[], //选择的情景
          end_year: 2035,
          random_seed:0,
          rancalibrated_coefficients:true, //校正系数
        },
        consoleOutput:'',
        runStatus: '正在运行中',  //模型运行的状态 （）
        progress: 0, // 初始进度为 0

      };
    },
    components:{ImageGallery},
    methods: {
      handleChange(value) {
        console.log(value);
      },
      startRun(){
        console.log("🚀 ~ startRun ~ this.runFormData:", this.runFormData.selectedScenario[0])
        // 开始运行，打开运行界面，并关闭创建界面
        this.createRunDialogVisible=false;
        this.runDialogVisible=true;
        this.progress = 0; // 初始进度为 0
        // 发送数据到后端并进行运行
        //  构建传递到后端的参数
        // 1. 情景参数
        const selectedScenario = this.scenarioCollections.find(
        data => data.name === this.runFormData.selectedScenario[0]
        );
        // 2. 数据集
        console.log("🚀 ~ startRun ~ this.baseDataCollections:", this.baseDataCollections)
        const selectedCollection = this.baseDataCollections.find(
        data => data.name === selectedScenario['selectedCollection'] 
        );
        console.log("🚀 ~ startRun ~ selectedCollection:", selectedScenario['selectedCollection'] )

        // 3. 构建数据
        const simulationParameters = {
          end_year:this.runFormData.end_year,
          rancalibrated_coefficients:this.runFormData.rancalibrated_coefficients,
          random_seed:this.runFormData.random_seed,
          selectedScenario:JSON.stringify(selectedScenario),
          selectedCollection:JSON.stringify(selectedCollection), //需要确保 selectedScenario 和 selectedCollection 对象能够被正确地序列化成一个可通过 URL 传输的格式。一般来说，将对象转换为 JSON 字符串是处理这类问题的标准做法。
        };
        const queryParams = new URLSearchParams(simulationParameters).toString();
        console.log("🚀 ~ startRun ~ simulationParameters:", simulationParameters)
        this.startProcess(queryParams); // start the simulation
      },
      // 删除模拟
      deleteRun(){
        console.log("🚀 ~ deleteRun ~ this.runFormData:", this.runFormData)
      },
      updateProgress(queryParams) {
        console.log("🚀 ~ updateProgress ~ queryParams:", queryParams)
        // 假设 '/progress' 路径返回当前进度
        axios.get(`http://localhost:5000/progress?${queryParams}`).then(response => {
            // 假设响应的格式为 { progress: 30 }
            // 处理响应
            this.progress = response.data.progress; 
            console.log("🚀 ~ axios.get ~ this.progress:", this.progress)
            this.consoleOutput = response.data.console_output;
            if (this.progress < 100) {
              console.log("🚀 ~ axios.get ~ this.progress:", this.progress)
              // 如果进度未完成，继续轮询
              setTimeout(() => this.updateProgress(queryParams), 1000);
            } else {
              // 进度完成
              this.runStatus = '运行完成';
            }
          })
          .catch(error => {
            console.error('Error fetching progress:', error);
          });
      },
      startProcess(queryParams) {
        // 开始处理或者轮询
        this.updateProgress(queryParams);
      },
      HandleClose(){
        // 运行界面关闭,并且一些值恢复到默认值
        this.runDialogVisible = false;
        this.runStatus = '正在运行中';  //模型运行的状态 （）
        this.progress = 0; // 初始进度为 0
        this.consoleOutput = ''
        console.log("🚀 ~ HandleClose ~ this.consoleOutput :", this.consoleOutput )
      },
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
        this.createRunDialogVisible=false
      },
      
      closedialog(){
        this.createRunDialogVisible=false
        this.consoleOutput = null
      },
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

  .console-output-f {
    overflow-x: hidden !important; 
    overflow-y:auto !important;
    height: 500px;
    position: relative;

  }
  .console-output { 
  height: 500px;
  background: #000; /* 设置为黑色背景 */
  color: #eeeeee; /* 终端常用的绿色字体 */
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: 'Courier New', Courier, monospace; /* 使用等宽字体 */
}

/* Element UI 进度条自定义样式 */
.el-progress-bar__outer {
  height: 18px; /* 进度条的高度 */
}

.dialog-footer {
  text-align: right;
}

</style>