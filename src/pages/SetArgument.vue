<template>
    <div>
        <el-divider></el-divider>
        <el-form >
            <el-button type="primary" @click="orcaBack">清除缓存</el-button>
            <span>{{ msg }}</span>
            <el-form-item label=" - settings.yaml文件上传:">
              <el-upload
                    class="upload-settings"
                    drag
                    action="http://localhost:5000/upload/settings"
                    accept=".yaml"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">上传settings.yaml,仅能上传yaml文件</div>
                  </el-upload>
                </el-form-item>

                <el-form-item label=" - elcm.yaml(就业区位选择配置文件):">
                <el-upload
                    class="upload-elcm"
                    drag
                    action="http://localhost:5000/upload/elcm"
                    accept=".yaml"
                    :on-success="handleSuccess"
                    :on-error="handleError"                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>

            <el-form-item label=" - hlcm.yaml(家庭区位选择配置文件):">
              <el-upload
                  class="upload-hlcm"
                  drag
                  action="http://localhost:5000/upload/hlcm"
                  accept=".yaml"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
          </el-form-item>

          <el-form-item label=" - nrh.yaml(非居住租金预测配置文件):">
            <el-upload
                class="upload-nrh"
                drag
                action="http://localhost:5000/upload/nrh"
                accept=".yaml"
                :on-success="handleSuccess"
                :on-error="handleError"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-form-item>

        <el-form-item label=" - rsh.yaml(居住售价预测配置文件):">
          <el-upload
              class="upload-rsh"
              drag
              action="http://localhost:5000/upload/rsh"
              accept=".yaml"
              :on-success="handleSuccess"
              :on-error="handleError"              
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
      </el-form-item>
      
            <el-divider></el-divider>
            <!-- 提交 -->
            <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button> -->
        </el-form>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data(){
      return{
        msg:"null"
      }
    },
    methods: {
      handleSuccess(response, file) {
            console.log('文件上传成功！', file);
        },
        handleError(err, file) {
            console.log('文件上传错误！', err, file);
        },
        // 不需要用submit了
      //   onSubmit() {
      //       axios.post('http://localhost:5000/settings', this.settings) //post接受两个参数，一个是 URL（你的后端 API 终点），另一个是你要发送的数据。这将发送一个 POST 请求到你指定的 URL，并附带你的数据（在这种情况下是 this.settings）。
      //       .then(response => {
      //         // 处理响应
      //         // console.log(response.data);
      //         this.householdsTable = response.data;  
      //       }) //response 是服务器的响应
      //       .catch(error => {
      //     console.log(error);
      //   });
      //   console.log(this.householdsTable)
      // }
      orcaBack(){
        console.log("清除缓存");
          axios.post('http://localhost:5000/run/orcaBack').then(response =>{
                // 处理响应
                this.msg = response.data.msg; 
                console.log(this.msg)
          })
      }
    }
  }
  </script>
<style scoped>
  span {
    color: blue;
  }
</style>
  