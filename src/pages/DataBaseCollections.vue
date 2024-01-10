<template>
    <div class="data-collections">
      <el-row>
        <el-col :span="24">
          <h1>Base Data Collections</h1>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="Search" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-button type="primary" @click="openDataCollectionDialogVisible">Add Collection</el-button>  
          <!-- 实现点击打开dialog Dialog 弹出一个对话框，适合需要定制性更大的场景。-->

        </el-col>


        <!-- Create new data collection 对话框:details -->
        <el-dialog :visible.sync="dataCollectionDialogVisible" :title="isEditMode ? 'Edit Data Collection' : 'Create new data collection'">
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="Details"></el-step>
              <el-step title="Data Selection"></el-step>
            </el-steps>
        
            <el-form ref="dataCollectionForm" :model="DatailForm" label-position="top">
              <el-form-item label="Type of collection">
                <el-select v-model="DatailForm.type" placeholder="Select">
                  <el-option 
                    v-for="option in DatailForm.options" 
                    :key="option.value" 
                    :label="option.label" 
                    :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
        
              <el-form-item label="Name">
                <el-input v-model="DatailForm.name" placeholder="Collection title"></el-input>
              </el-form-item>
        
              <el-form-item label="Based on">
                <el-select v-model="DatailForm.basedOn" placeholder="Select">
                  <!-- Add <el-option> elements for 'Based on' options -->
                </el-select>
              </el-form-item>
        
              <el-form-item label="Year (vintage)">
                <el-input v-model="DatailForm.year" placeholder="Enter year"></el-input>
              </el-form-item>
        
              <el-form-item label="Notes">
                <el-input type="textarea" v-model="DatailForm.notes"></el-input>
              </el-form-item>
            </el-form>
        
            <div slot="footer" class="dialog-footer">
              <el-button @click="dataCollectionDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="goToNextStep">Next</el-button>
            </div>
          </el-dialog>

        <!-- ******************************************数据确认界面，也就是选择数据界面********************************************* -->
          <el-dialog :visible.sync="dataSelectionDialogVisible" title="Create new data collection">
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="Details"></el-step>
              <el-step title="Data Selection"></el-step>
            </el-steps>

            <el-form>
              <el-form-item label="Parcels:">
                <el-select v-model="selectdDataForm.selectedParcels" placeholder="请选择"> 
                  <el-option
                    v-for="item in BaseDataOptions"
                    :key="item.uid"
                    :label="item.label"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            
            <el-form>
              <el-form-item label="Buildings:">
                <el-select v-model="selectdDataForm.selectedBuildings" placeholder="请选择">
                  <el-option
                    v-for="item in BaseDataOptions"
                    :key="item.uid"
                    :label="item.label"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            
            <el-form>
              <el-form-item label="HouseHolds:">
                <el-select v-model="selectdDataForm.selectedHouseHolds" placeholder="请选择">
                  <el-option
                    v-for="item in BaseDataOptions"
                    :key="item.uid"
                    :label="item.label"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <el-form>
              <el-form-item label="Jobs:">
                <el-select v-model="selectdDataForm.selectedJobs" placeholder="请选择">
                  <el-option
                    v-for="item in BaseDataOptions"
                    :key="item.uid"
                    :label="item.label"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <el-form>
              <el-form-item label="rent :">
                <el-select v-model="selectdDataForm.selectedRent" placeholder="请选择">
                  <el-option
                    v-for="item in BaseDataOptions"
                    :key="item.uid"
                    :label="item.label"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <el-form>
              <el-form-item label="Price:">
                <el-select v-model="selectdDataForm.selectedPrice" placeholder="请选择">
                  <el-option
                    v-for="item in BaseDataOptions"
                    :key="item.uid"
                    :label="item.label"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
              <el-button @click="backToDetails">Back</el-button>
              <el-button type="primary" @click="completeDataSelection">Complete</el-button>
              <el-button @click="cancelDataSelection">Cancel</el-button>
            </div>
          </el-dialog>

          <!-- ********************************选择数据界面 over ******************************** -->


      <!-- ********************************数据集管理界面  ******************************** -->

      </el-row>
        <el-table :data=" baseDataCollections" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="year" label="Year" width="100"></el-table-column>
          <el-table-column prop="template" label="Template"></el-table-column>
          <el-table-column prop="notes" label="Notes"></el-table-column>

          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 'Ok' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>

        <!-- 可以修改或者编辑 collection  -->
      <!-- Action column for edit and delete -->
          <el-table-column label="Actions" width="180">
              <template #default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">Edit</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
              </template>
        </el-table-column>

        </el-table>
        
        <el-row>
          <el-col :span="24">
            <el-button type="success">Done</el-button>
          </el-col>
        </el-row>
        <!-- ********************************数据集管理界面  over******************************** -->
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    data() {
      return {
        isEditMode: false,//添加一个标志，以区分用户是在进行添加操作还是修改操作
        activeStep: 0,
        DatailForm: {
            type: '',
            name: '',
            basedOn: '',
            year: '',
            notes: '',
            options: [
            { label: 'Parcel base data', value: 'parcel_base_data' },
            { label: 'Zone base data', value: 'zone_base_data' },
          ]
        },
        selectdDataForm:{
          selectedParcels:null,
          selectedBuildings:null,
          selectedHouseholds:null,
          selectedJobs:null,
          selectedRent:null,
          selectedPrice:null,
        },
        dataCollectionDialogVisible: false,
        dataSelectionDialogVisible:false,
        // baseDataCollections  是数据集合存储集合，最终的表单数据也提交到这里
        baseDataCollections: [
          {
            id: 1,
            name: 'Parcel initialization',
            year: '2017',
            template: 'Parcel model initialization',
            notes: '',
            status: 'Ok'
          },
          {
            id: 2,
            name: 'Region Base Data v1',
            year: '2014',
            template: 'Parcel base data',
            notes: 'Warning: 24695 buildings have non-residential use',
            status: 'Warning'
          }
        ],
        checkedNodes:{},
        // 正在修改的情景数据：
        editingData:null,
      };
    },
    methods: {
        goToNextStep() {
            // 首先，确保当前是在 "Details" 步骤
            console.log("🚀 ~ goToNextStep ~ this.activeStep:", this.activeStep)
            if (this.activeStep === 0) {
                this.activeStep = 1; // 设置活跃步骤为 "Data Selection"
                this.dataSelectionDialogVisible = true; // 打开数据选择对话框
                this.dataCollectionDialogVisible = false; // 关闭当前的详情对话框
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(() => {
                done();
            })
            .catch(() => {});
        },
        openDataCollectionDialogVisible() {
            this.activeStep = 0; // the first step
            this.DetailForm = {
              type: '', // 或者初始默认值
              name: '', // 或者初始默认值
              basedOn: '', // 或者初始默认值
              year: '', // 或者初始默认值
              notes: '', // 或者初始默认值
              // ...其他属性
            };
            this.mainDialogVisible = false; // 关闭主对话框
            this.dataCollectionDialogVisible = true; // 打开第二个对话框
        },
        resetChecked() {
            console.log("🚀 ~ file: DataBaseCollections.vue:113 ~ resetChecked ~ resetChecked:", this.$refs.tree)
            this.$refs.tree.setCheckedKeys([]);
      },
        backToDetails() {
            this.dataSelectionDialogVisible = false; 
            this.dataCollectionDialogVisible = true; 
        },
        completeDataSelection() {
          const uniqueId = uuidv4();
          const baseDataCollection = {
            id: this.isEditMode ? this.DatailForm.id : uniqueId,
            name: this.DatailForm.name,
            type: this.DatailForm.type,
            basedOn: this.DatailForm.basedOn,
            year: this.DatailForm.year,
            notes: this.DatailForm.notes,
            selectdDataForm: { ...this.selectdDataForm },
          };

          if (this.isEditMode) {
            const updatedIndex = this.baseDataCollections.findIndex(item => item.id === this.DatailForm.id);
            if (updatedIndex !== -1) {
              this.baseDataCollections.splice(updatedIndex, 1, baseDataCollection);
            }
            this.isEditMode = false; // 重置编辑模式
          } else {
            this.baseDataCollections.push(baseDataCollection);
          }
            this.dataSelectionDialogVisible = false;
            this.dataCollectionDialogVisible = false; // 关闭数据选择对话框
            this.activeStep = 0; // 重置步骤指示器到第一步

        },
            
        cancelDataSelection(){
            this.dataSelectionDialogVisible = false;
            this.dataCollectionDialogVisible = false; // 关闭数据选择对话框
            this.activeStep = 0; // 重置步骤指示器到第一步
        },

        handleEdit(index,rowData) {
          this.activeStep = 0; //the first step
          // 加载数据到 DetailsForm 和 selectedDataForm
          console.log("🚀 ~ handleEdit ~ index:", index,rowData);
          // const rowData = this.baseDataCollections[index];
          const details = {
                id:rowData.id , // 一个函数用来生成唯一的 ID
                name: rowData.name,
                type: rowData.type,
                basedOn: rowData.basedOn,
                year: rowData.year,
                notes: rowData.notes,
          }
          this.DatailForm = details;
          this.selectdDataForm = { ...rowData.selectdDataForm };
          this.isEditMode = true;
          // 打开 Details 对话框
          this.dataCollectionDialogVisible = true;
        },

        saveData() {
          if (this.isEditMode) {
            // 更新现有数据的逻辑
          } else {
            // 添加新数据的逻辑
          }
          // 重置模式
          this.isEditMode = false;
        },
        cancelData() {
          // 取消操作的其他逻辑
          this.isEditMode = false;
        },
        handleDelete(index) {
          this.$confirm('您确定要删除这个数据合集吗?', 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            // 用户确认删除后的操作
            this.baseDataCollections.splice(index, 1); // 删除选定的项
            // 如果需要，这里可以添加一个 API 调用来从服务器删除数据
            this.$message({
              type: 'success',
              message: 'Delete completed'
            });
          }).catch(() => {
            // 用户取消删除操作
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            });
          });
        },

    },

    computed: {
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
    }
  };

  </script>
  
  <style scoped>
  .data-collections h1 {
    margin-bottom: 20px;
  }
  </style>
  