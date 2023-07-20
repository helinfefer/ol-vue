<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          
    <el-divider></el-divider>
    <span>Residential Developer</span>

    <el-form :model="settings" label-width="180px">
        <el-form-item label="control tables:">
            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>

      <el-form-item label="Residential Developer Target Vacancy:">
        <el-input v-model.number="settings.residential_developer.target_vacancy"></el-input>
      </el-form-item>
      <el-form-item label="Residential Developer Min Unit Size:">
        <el-input v-model.number="settings.residential_developer.min_unit_size"></el-input>
      </el-form-item>
      <!-- ...其他字段... -->
  
      <el-divider></el-divider>
      <span>Non-Residential Developer</span>
      <el-form-item label="Non-residential Developer Target Vacancy:">
        <el-input v-model.number="settings.non_residential_developer.target_vacancy"></el-input>
      </el-form-item>
      <el-form-item label="Non-residential Developer Building M2 Per Job:">
        <el-input v-model.number="settings.non_residential_developer.bldg_m2_per_job"></el-input>
      </el-form-item>
      <!-- ...其他字段... -->
  
      <el-form-item label="Type Splits Industrial:">
        <el-input v-model.number="settings.type_splits.Industrial"></el-input>
      </el-form-item>
      <el-form-item label="Type Splits Retail:">
        <el-input v-model.number="settings.type_splits.Retail"></el-input>
      </el-form-item>
      <!-- ...其他字段... -->
  
      <el-button type="primary" @click="submitForm('settings')">Submit</el-button>
    </el-form>
</div>


  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: {
          residential_developer: {
            target_vacancy: 0.03,
            min_unit_size: 50,
            bldg_m2_per_job: 35,
            max_parcel_size: 100000
          },
          non_residential_developer: {
            target_vacancy: 0.5,
            bldg_m2_per_job: 35
          },
          type_splits: {
            Industrial: 0.6,
            Retail: 0.15,
            Mixedretail: 0.05,
            Office: 0.15,
            Mixedoffice: 0.05
          },
          // ...其他字段
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            // 这里调用API向服务器发送数据
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
  </script>

  