<template>
    <div>
        <el-divider></el-divider>
        <el-form :model="settings" ref="form" >
            <span>households_transition(家庭转移模型)</span>
            <el-form-item label="income-seg-col-name(收入分段列)">
                <el-input v-model="settings.households_transition.add_columns"></el-input>
            </el-form-item>
            <el-form-item label="total_column(控制列)">
                <el-input v-model="settings.households_transition.total_column"></el-input>
            </el-form-item>
            <el-divider></el-divider>

            <span>households_transition(就业转移模型)</span>
            <el-form-item label="job_category_col(就业分类列)">
                <el-input v-model="settings.jobs_transition.add_columns"></el-input>
            </el-form-item>
            <el-form-item label="total_column(控制列)">
                <el-input v-model="settings.jobs_transition.total_column"></el-input>
            </el-form-item>
            <el-divider></el-divider>

            
            <span>Residential Developer(居住开发商模型)</span>
            <el-form-item label="control tables (households):">
                <el-upload
                    class="upload-control-tables-households"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">上传家庭总量控制文件,仅能上传csv文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="control tables (jobs):">
                <el-upload
                    class="upload-control-tables-jobs"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">上传就业总量控制文件,仅能上传csv文件</div>
                </el-upload>
            </el-form-item>
            <!-- cap_rate -->
            <el-form-item label="cap_rate(净现率):">
                <el-input v-model.number="settings.cap_rate"></el-input>
            </el-form-item>
            
            <el-form-item label="Residential Developer Target Vacancy:">
            <el-input v-model.number="settings.residential_developer.target_vacancy"></el-input>
            </el-form-item>
            <el-form-item label="Residential Developer Min Unit Size:">
            <el-input v-model.number="settings.residential_developer.min_unit_size"></el-input>
            </el-form-item>
            <!-- ...其他字段... -->
        
            <el-divider></el-divider>
            <span>Non-Residential Developer(非居住开发商模型)</span>
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
            <el-divider></el-divider>
            <!-- 提交 -->
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form>
    </div>

  </template>
  
  <script>
import axios from 'axios';
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
          cap_rate:0.05,
          households_transition:{
            add_columns:['income_segement'], //收入分段 默认字段
            total_column:'total_number_of_households'  //控制列
          },
          jobs_transition:{
            add_columns:['job_category_id'], //收入分段 默认字段
            total_column:'number_of_jobs'  //控制列
          }
          // ...其他字段
        }
      };
    },
    methods: {
        onSubmit() {
            axios.post('http://localhost:5000/settings', this.settings) //post接受两个参数，一个是 URL（你的后端 API 终点），另一个是你要发送的数据。这将发送一个 POST 请求到你指定的 URL，并附带你的数据（在这种情况下是 this.settings）。
            .then(response => {
              // 处理响应
              console.log(response.data);
            }) //response 是服务器的响应
        console.log(this.settings);
      }
    }
  }
  </script>
<style scoped>
  span {
    color: blue;
  }
</style>
  