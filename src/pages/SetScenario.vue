
<template>
  <div class="scenario-container">
    <br>
  <el-button type="primary" @click="dialogCreateSenarioVisible = true">点击创建情景</el-button>

  <el-table :data=" scenarioCollections" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column prop="name" label="情景名称"></el-table-column>
    <!-- <el-table-column prop="year" label="Year" ></el-table-column> -->
    <el-table-column  label="居住空置率">
      <template slot-scope="scope">
        <div>居住空置率: {{ scope.row.residentialVacancyRate }}</div>
        <div>家庭增长率: {{ scope.row.householdGrowthRate }}</div>
        <div>就业增长率: {{ scope.row.employmentGrowthRate }}</div>
      </template>
    </el-table-column>

    <!-- <el-table-column  label="交通">
      <template slot-scope="scope">
        <div>交通模型分区: {{ scope.row.travelModelZone }}</div>
        <div>交通阻抗: {{ scope.row.travelModelSkims }}</div>
        <div>交通网络: {{ scope.row.travelModelNetwork }}</div>
      </template>
    </el-table-column> -->

    <el-table-column label="Status">
      <template slot-scope="scope">
        <!-- 当 isBaseline 为 true 时，显示基线标签 -->
        <el-tag v-if="scope.row.isBaseline" type="success">
          基础情景
        </el-tag>
      </template>
    </el-table-column>


    <!-- 数据集 -->
    <el-table-column prop="selectedCollection" label="DataCollection"></el-table-column>

    <el-table-column prop="notes" label="Notes" ></el-table-column>


  <!-- 可以修改或者编辑 collection  -->
<!-- Action column for edit and delete -->
    <el-table-column label="Actions" width="250">
        <template #default="scope">
        <el-button size="mini" type="success" @click="openDetail(scope.$index,scope.row)">detail</el-button>
        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
        </template>
  </el-table-column>

  </el-table>

  <el-dialog
    :title="isDetailMode ? '查看情景信息' : (isEditMode ? '修改情景' : '创建一个新场景')"
    :visible.sync="dialogCreateSenarioVisible"
    width="80%"
    :before-close="handleClose">
    <!-- *************************以下是情景创建对话框*************** -->
    <el-form 
      ref="form" 
      :model="scenarioForm" 
      label-width="150px" 
      class="scenario-form"
    >
    <el-row >

      <el-col :span="12">
        <!-- <el-form-item label="模型名称">
          <el-select v-model="form.modelName" placeholder="请选择">
            <el-option 
              v-for = "item in modelNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="模型名称">
          <el-input v-model="scenarioForm.name" placeholder="请输入模型名称"></el-input>
        </el-form-item>

        <el-form-item label="基础情景">
          <el-switch v-model="scenarioForm.isBaseline"></el-switch>
        </el-form-item>

        <!-- 基础数据合集的选择  -->
        <el-form-item label="基础数据合集:" >
          <el-select v-model="scenarioForm.selectedCollection" placeholder="请选择">
            <el-option
              v-for="item in baseDataCollections"
              :key="item.id"
              :label="item.label"
              :value="item.name"
            ></el-option> 
          </el-select>
        </el-form-item>

        <el-form-item label="住宅空置率">
          <el-input-number v-model="scenarioForm.residentialVacancyRate" :min="0" :max="1" :step="0.01"></el-input-number>
        </el-form-item>
        
        <el-form-item label="家庭增长率">
          <hr/>
        </el-form-item>
        <el-form-item label="家庭增长率">
          <el-input-number v-model="scenarioForm.householdGrowthRate" :min="0" :max="1" :step="0.01"></el-input-number>
        </el-form-item>
    
        <!-- 中间添加 "or" 文本 -->
        <el-form-item label="或"></el-form-item>
    
        <!-- 家庭总控制文件输入框 -->


      <el-form-item label="家庭控制总量:" >
        <el-upload
            class="upload-demo"
            action="http://localhost:5000/upload_data/householdControl"
            accept=".csv"
            :on-success="handleSuccess"
            :on-error="handleError"     
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <el-select v-model="scenarioForm.selectedHControl" placeholder="请选择">
          <el-option
            v-for="item in HControlsOptions"
            :key="item.uid"
            :label="item.label"
            :value="item.uid"
          ></el-option>
        </el-select>
      </el-form-item>
      
        <el-form-item label="就业增长率">
          <hr/>
        </el-form-item>
        <el-form-item label="就业增长率">
          <el-input-number v-model="scenarioForm.employmentGrowthRate" :min="0" :max="1" :step="0.01"></el-input-number>
        </el-form-item>
      
        <!-- 中间添加 "or" 文本 -->
        <el-form-item label="或"></el-form-item>
      
        <!-- 就业总控制文件输入框 -->

        <el-form-item label="就业控制总量:">
          <el-upload
              class="upload-demo"
              action="http://localhost:5000/upload_data/employControl"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
          <el-select v-model="scenarioForm.selectedJobControl" placeholder="请选择">
            <el-option
              v-for="item in jobControlsOptions"
              :key="item.uid"
              :label="item.label"
              :value="item.uid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 操作按钮 -->

      <el-col :span="12">
        <!-- 交通模型分区 -->
        <el-form-item label="交通模型分区">
          <el-select v-model="scenarioForm.travelModelZone" placeholder="请选择">
            <el-option 
              v-for = "item in BaseDataOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
            <!-- 这里可以继续添加更多的选项 -->
          </el-select>
        </el-form-item>

        <el-form-item label="交通模型阻抗skims">
          <el-upload
              class="upload-demo"
              action="http://localhost:5000/upload_data/skims"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
          <el-select v-model="scenarioForm.travelModelZone" placeholder="请选择">
            <el-option 
              v-for = "item in BaseDataOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
            <!-- 这里可以继续添加更多的选项 -->
          </el-select>
        </el-form-item>

        <el-form-item label="交通模型网络">
          <el-upload
              class="upload-demo"
              action="http://localhost:5000/upload_data/travelNetworks"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>

        </el-form-item>

        <!-- 大文本区域 -->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="scenarioForm.notes"></el-input>
        </el-form-item>

          <!-- 开发标签选择器 -->
          <el-form-item label="Development Tags">
            <el-select v-model="scenarioForm.developmentTags" placeholder="请选择">
              <!-- 这里添加选项 -->
            </el-select>
          </el-form-item>
          <!-- 约束标签选择器 -->
          <el-form-item label="Constraint Tags">
            <el-select v-model="scenarioForm.constraintTags" placeholder="请选择">
              <!-- 这里添加选项 -->
            </el-select>
          </el-form-item>
          <!-- 调整标签选择器 -->
          <el-form-item label="Adjustments Tags">
            <el-select v-model="scenarioForm.adjustmentsTags" placeholder="请选择">
              <!-- 这里添加选项 -->
            </el-select>
          </el-form-item>
          
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="saveData">保存</el-button>
          </el-form-item>
      </el-col>

      </el-row>
      <ul>
        <li v-for="file in fileList" :key="file.name">{{ file.name }}</li>
      </ul>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogCreateSenarioVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveData" >确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState, mapMutations} from 'vuex';

export default {
  name: "SetScenario",
  data() {
    return {
      id:'',
      isEditMode: false,
      isDetailMode: false,
      isMode: true,
      dialogCreateSenarioVisible:false,
      scenarioForm: {
        modelName: '', // 模型名称
        isBaseline: true, // 生产演算开关
        residentialVacancyRate: 0.21, // 住宅空置率
        householdGrowthRate: 0.21, // 家庭增长率
        employmentGrowthRate:0.22,  //就业增长率
        selectedJobControl:null,
        selectedHControl:null,
        // 被选择的基础数据集合
        selectedCollection:null,
        // 交通数据
        travelModelZone:null,
        travelModelSkims:null,
        travelModelNetwork:null,

      },
      fileList: [],
    };
  },
  methods: {
      // 处理关闭
        // 打开详细信息
      openDetail() {
          this.isEditMode = false;
          this.isDetailMode = false;
          this.dialogCreateSenarioVisible = true;
        },

      handleClose(done) {
            this.$confirm('确认关闭？')
            .then(() => {
                done();
            })
            .catch(() => {});
        },
    handleSuccess(response, file) {
            console.log('文件上传成功！', file);
        },
    handleError(err, file) {
            console.log('文件上传错误！', err, file);
        },

    saveData() {
      // 保存数据的，创建界面也关闭
      // 这个情景的uid设置
      const collection = this.scenarioForm
      this.$store.commit('ADD_SCENARIO', collection);
      this.dialogCreateSenarioVisible=false;
      console.log('scenarioCollection',this.scenarioForm);
      },
    cancel() {
      // 在这里添加取消表单编辑的逻辑
      console.log('Form reset');
      this.$refs.form.resetFields();
    }
  },

      
  computed: {
    ...mapState(['baseDataCollections','scenarioCollections']), // 在computed中引入baseDataCollections
    ...mapMutations(['ADD_SCENARIO']),
    // 从 Vuex 获取并过滤出 job_controls 相关的数据
    jobControlsOptions() {
      // 找到包含 '就业控制总量' 的对象
      const jobControlsData = this.$store.state.elTreeData.find(
        data => data.label === '就业控制总量'
      );
      // 确保找到该对象并且该对象有 children 属性
      return jobControlsData && jobControlsData.children
        ? jobControlsData.children
        : [];
    },
    HControlsOptions() {
      // 找到包含 '就业控制总量' 的对象
      const HControlsData = this.$store.state.elTreeData.find(
        data => data.label === '家庭控制总量'
      );
      // 确保找到该对象并且该对象有 children 属性
      return HControlsData && HControlsData.children
        ? HControlsData.children
        : [];
    },
    // 基础数据
      // 从 Vuex 获取出和基础数据相关的数据
    BaseDataOptions() {
      // 找到包含 '就业控制总量' 的对象
      const baseData = this.$store.state.elTreeData.find(
        data => data.label === '模型基础数据'
      );
      // 确保找到该对象并且该对象有 children 属性
      return baseData && baseData.children
        ? baseData.children
        : [];
    },

  },

  mounted(){
  },
  created() {
    this.scenarioForm.id = uuidv4(); // 组件创建时生成一个UUID
  },

}
</script>

<style scoped>
.scenario-container {
  width: 100%; /* 这将使容器宽度为100% */
}

.el-form-item {
  margin-bottom: 16px; /* 表单项间距 */
}

/* 如果你有任何全局样式限制了最外层容器的宽度，也需要进行修改。 */
</style>