<template>
    <el-container>
      <!-- 头部区域 -->
      <el-header>
          <!-- 查询 -->
        <el-input
          placeholder="Search"
          prefix-icon="el-icon-search"
          v-model="searchQuery">
        </el-input>
      </el-header>
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
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"

                :file-list="uploadJobControlFileList"
                :on-success="uploadJobControlFileSuccess"
                >
                <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="家庭控制总量:" >
            <el-upload
                class="upload-demo"
                action="http://localhost:5000/upload_data/householdControl"
                multiple
                :limit="3"
                accept=".csv"
                :file-list="$store.state.uploadHouseholdsControlFileList"
                >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
<!-- 
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
          </el-form-item> -->


        </el-form>  
        <input v-model="$store.state.message" placeholder="edit me" @click="changeM">
        <p>Message is: {{ $store.state.message }}</p>
        <p>就业控制总量</p>
        <ul>
            <li v-for="file in $store.state.uploadJobControlFileList" :key="file.uid">
            {{ file.name }}
            </li>
        </ul>
        <p>家庭控制总量</p>
        <li v-for="file in $store.state.uploadHouseholdsControlFileList" :key="file.name">
            {{ file.name }}
        </li>
          
    </el-container>
  </template>


<script>
export default {
    data(){
        return{
          uploadJobControlFileList:[],
            form:{

            },
            searchQuery:null,
        }
    },
    name:"UploadData",
    methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          },
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },
        
        changeM(){
            this.$store.commit('changeMessage', this.$store.state.message)
            console.log('*************message',this.$store.state.message)
        },

        uploadJobControlFileSuccess(file,fileList){
          // dispatch
          console.log('*************ADDJOBFILE',file,'*************',fileList)
          this.$store.dispatch('addJobControlFile',fileList)
          // this.$store.commit('ADDFILE', this.uploadJobControlFileList)
        }
    },
    mounted(){
    }
};
</script>


<style scoped>

/* 保持与其他表单项标签的一致性 */
.el-form-item__label {
  float: left;
  font-size: 14px; /* 调整字体大小 */
  color: #606266; /* 调整字体颜色 */
  line-height: 30px; /* 调整行高 */
  margin-right: 12px; /* 标签与输入框的间距 */
}

/* 其他样式调整 */
</style>