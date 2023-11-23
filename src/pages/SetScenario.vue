
<template>
  <div class="scenario-container">
    <br>
  <!-- <h3>创建一个情景</h3> -->
  <el-form 
    ref="form" 
    :model="form" 
    label-width="150px" 
    class="scenario-form"
    
  >
  <el-row >

    <el-col :span="12">
      <el-form-item label="模型名称">
        <el-select v-model="form.modelName" placeholder="请选择">
          <el-option 
            v-for = "item in modelNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
          <!-- 这里可以继续添加更多的选项 -->
        </el-select>
      </el-form-item>
  
      <el-form-item label="基础情景">
        <el-switch v-model="form.productionCalculation"></el-switch>
      </el-form-item>
  
      <el-form-item label="住宅空置率">
        <el-input-number v-model="form.residentialVacancyRate" :min="0" :max="1" step="0.01"></el-input-number>
      </el-form-item>
      
      <el-form-item label="家庭增长率">
        <hr/>
      </el-form-item>
      <el-form-item label="家庭增长率">
        <el-input-number v-model="form.householdGrowthRate" :min="0" :max="1" step="0.01"></el-input-number>
      </el-form-item>
  
      <!-- 中间添加 "or" 文本 -->
      <el-form-item label="或"></el-form-item>
  
      <!-- 家庭总控制文件输入框 -->


    <el-form-item label="家庭控制总量:" prop="csv">
      <el-upload
          class="upload-demo"
          action="http://localhost:5000/upload_data/rsh"
          accept=".csv"
          :on-success="handleSuccess"
          :on-error="handleError"     
          >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </el-form-item>
    
      <el-form-item label="就业增长率">
        <hr/>
      </el-form-item>
      <el-form-item label="就业增长率">
        <el-input-number v-model="form.employmentGrowthRate" :min="0" :max="1" step="0.01"></el-input-number>
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
      </el-form-item>
    </el-col>
    <!-- 操作按钮 -->

    <el-col :span="12">
      <!-- 交通模型分区 -->
      <el-form-item label="交通模型分区">
        <el-select v-model="form.travelModelZone" placeholder="请选择">
          <el-option 
            v-for = "item in travelModelZones"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
          <!-- 这里可以继续添加更多的选项 -->
        </el-select>
      </el-form-item>

      <el-form-item label="交通模型阻抗skims">
        <el-input type="file" v-model="form.travelSkims" ></el-input>
      </el-form-item>

      <el-form-item label="交通模型网络">
        <el-input type="file" v-model="form.travelNetworks"></el-input>
      </el-form-item>      
      
      <!-- 大文本区域 -->
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.notes"></el-input>
      </el-form-item>

        <!-- 开发标签选择器 -->
        <el-form-item label="Development Tags">
          <el-select v-model="form.developmentTags" placeholder="请选择">
            <!-- 这里添加选项 -->
          </el-select>
        </el-form-item>
        <!-- 约束标签选择器 -->
        <el-form-item label="Constraint Tags">
          <el-select v-model="form.constraintTags" placeholder="请选择">
            <!-- 这里添加选项 -->
          </el-select>
        </el-form-item>
        <!-- 调整标签选择器 -->
        <el-form-item label="Adjustments Tags">
          <el-select v-model="form.adjustmentsTags" placeholder="请选择">
            <!-- 这里添加选项 -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
    </el-col>

    </el-row>
    <ul>
      <li v-for="file in fileList" :key="file.name">{{ file.name }}</li>
    </ul>

  </el-form>
</div>
</template>

<script>
export default {
  name: "SetScenario",
  data() {
    return {
      form: {
        modelName: '', // 模型名称
        productionCalculation: true, // 生产演算开关
        residentialVacancyRate: 0.21, // 住宅空置率
        householdGrowthRate: 0.21, // 家庭增长率
        // 其他表单项的数据模型...
      },
      modelNames:[
        {label: "NOTDM", value: "NOTDM"},
        {label: "BaseLine", value: "BaseLine"}
        
      ],
      travelModelZones:[
        {label: "Travel Zones", value: "Travel Zones"},
        {label: "Travel Parcels", value: "Travel Parcels"}
      ],
      fileList: [],
    };
  },
  methods: {
    handleSuccess(response, file) {
            console.log('文件上传成功！', file);
        },
    handleError(err, file) {
            console.log('文件上传错误！', err, file);
        },
    save() {
      // 在这里添加保存表单的逻辑
      console.log('Form submitted:', this.form);
    },
    cancel() {
      // 在这里添加取消表单编辑的逻辑
      console.log('Form reset');
      this.$refs.form.resetFields();
    }
  }
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