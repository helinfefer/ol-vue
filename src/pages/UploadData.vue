<template>
    <el-container>
      <!-- 头部区域 -->
      <h1>上传</h1>
        <!-- 查询 -->
      <el-header>
        <el-input
          placeholder="Search"
          prefix-icon="el-icon-search"
          v-model="searchQuery">
        </el-input>
      </el-header>
      <!-- form-->
      <el-form 
        ref="form" 
        :model="form" 
        label-width="150px" 
        class="scenario-form">

        <h2>General Uploads</h2>
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
          </el-form-item>

          <el-form-item label="Zoning:" >
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/householdControl"
                accept=".csv"
                :on-success="handleSuccess"
                :on-error="handleError"     
                >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

        <h2>Travel Model and Network Data</h2>
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

          <el-form-item label="交通模型阻抗skims">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="交通模型分区">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <h2>Model Base Data</h2>

          <el-form-item label="Parcel Geometry">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          
          <el-form-item label="Parcel Attributes">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="Buildings">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="Building Types">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="HouseHolds">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="Persons">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="Jobs">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="Jobs Sectors">
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/skims"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>


        </el-form>  
    </el-container>
  </template>


<script>
export default {
    name:"UploadData",
    methods: {
        upload() {
            const payload = {/* 上传的数据 */};
            this.$store.dispatch('uploadData', payload);
        }
    }
};
</script>
