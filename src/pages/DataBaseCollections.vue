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
        <!-- Add Collection Dialog -->
        <!-- <el-dialog
            title="Create new data collection"
            :visible.sync="firstDialogVisible "
            width="60%"
            :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
                <el-tree :data="$store.state.elTreeData" 
                :props="defaultProps" 
                :default-expand-all="true"
                :highlight-current="true"
                show-checkbox
                ref="tree"
                node-key="uid"
                ></el-tree>
                <el-button @click="resetChecked">清空</el-button>
                <el-button @click="firstDialogVisible  = false">取 消</el-button>
                <el-button type="primary" @click="openSecondaryDialog" >确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- 第二个对话框 -->
        <!-- <el-dialog :visible.sync="secondaryDialogVisible" title="第二个对话框">
            <el-tree :data="checkedNodes">
            </el-tree>
            <span slot="footer" class="dialog-footer">
            <el-button @click="secondaryDialogVisible = false">关闭</el-button>
            </span>
        </el-dialog> -->

        <!-- Create new data collection 对话框:details -->
        <el-dialog :visible.sync="dataCollectionDialogVisible" title="Create new data collection">
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="Details"></el-step>
              <el-step title="Data Selection"></el-step>
            </el-steps>
        
            <el-form ref="dataCollectionForm" :model="form" label-position="top">
              <el-form-item label="Type of collection">
                <el-select v-model="form.type" placeholder="Select">
                  <el-option label="Parcel base data" value="parcel_base_data"></el-option>
                  <!-- Add more <el-option> elements for other types -->
                </el-select>
              </el-form-item>
        
              <el-form-item label="Name">
                <el-input v-model="form.name" placeholder="Collection title"></el-input>
              </el-form-item>
        
              <el-form-item label="Based on">
                <el-select v-model="form.basedOn" placeholder="Select">
                  <!-- Add <el-option> elements for 'Based on' options -->
                </el-select>
              </el-form-item>
        
              <el-form-item label="Year (vintage)">
                <el-input v-model="form.year" placeholder="Enter year"></el-input>
              </el-form-item>
        
              <el-form-item label="Notes">
                <el-input type="textarea" v-model="form.notes"></el-input>
              </el-form-item>
            </el-form>
        
            <div slot="footer" class="dialog-footer">
              <el-button @click="dataCollectionDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="goToNextStep">Next</el-button>
            </div>
          </el-dialog>

        <!-- 数据确认界面，也就是选择数据界面 -->
          <el-dialog :visible.sync="dataSelectionDialogVisible" title="Create new data collection">
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="Details"></el-step>
              <el-step title="Data Selection"></el-step>
            </el-steps>
        
            <el-form ref="dataCollectionForm" :model="form" label-position="top">
              <!-- Dynamic form items generated based on the data structure -->
              <div v-for="(item, index) in formData" :key="index">
                <el-form-item :label="item.label">
                  <el-select v-model="item.selected" placeholder="Select">
                    <el-option
                      v-for="option in item.options"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
        
            <div slot="footer" class="dialog-footer">
              <el-button @click="backToDetails">Back</el-button>
              <el-button type="primary" @click="completeDataSelection">Complete</el-button>
              <el-button @click="cancelDataSelection">Cancel</el-button>
            </div>
          </el-dialog>


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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
      </el-table-column>

      </el-table>
      <el-row>
        <el-col :span="24">
          <el-button type="success">Done</el-button>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';

  export default {
    data() {
      return {
        firstDialogVisible : false,
        activeStep: 0,
        form: {
            type: '',
            name: '',
            basedOn: '',
            year: '',
            notes: ''
        },
        secondaryDialogVisible: false,
        dataCollectionDialogVisible: false,
        dataSelectionDialogVisible:false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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
          // ... more data objects
        ],
        checkedNodes:{},
        formData: [
        {
          label: 'Update File',
          selected: null,
          options: [
            { label: 'area per job', value: 'area_per_job' },
            // ... more options ...
          ]
        },
        {
          label: 'Buildings',
          selected: null,
          options: [
            { label: 'buildings', value: 'buildings' },
            // ... more options ...
          ]
        }],
      };
    },
    methods: {
        
        goToNextStep() {
            // 首先，确保当前是在 "Details" 步骤
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
        openSecondaryDialog() {
            this.mainDialogVisible = false; // 关闭主对话框
            this.secondaryDialogVisible = true; // 打开第二个对话框
            this.checkedNodes = this.$refs.tree.getCheckedNodes(); //当前选中的节点

            console.log("🚀 ~ file: DataBaseCollections.vue:124 ~ openSecondaryDialog ~ this.$refs.tree.getCheckedNodes():", this.$refs.tree.getCheckedNodes())
        },
        openDataCollectionDialogVisible() {
            this.mainDialogVisible = false; // 关闭主对话框
            this.dataCollectionDialogVisible = true; // 打开第二个对话框
        },

        resetChecked() {
            console.log("🚀 ~ file: DataBaseCollections.vue:113 ~ resetChecked ~ resetChecked:", this.$refs.tree)
            this.$refs.tree.setCheckedKeys([]);
      },
        backToDetails() {
            this.dataSelectionDialogVisible = false; 
            this.activeStep = 0; // Go back to the first step
            this.dataCollectionDialogVisible = true; 
        },
        completeDataSelection() {
            // Logic to handle completion of data selection
            console.log('Data selection completed with: ', this.form);
            // You would likely close the dialog or go to the next step here
            // 需要在 base data collections 表格中增加一个条目
            const uniqueId = uuidv4();

            this.baseDataCollections.push({
                // 根据你表格数据的结构添加数据
                id: uniqueId, // 一个函数用来生成唯一的 ID
                name: this.form.name,
                type: this.form.type,
                basedOn: this.form.basedOn,
                year: this.form.year,
                notes: this.form.notes,
                // ... 其他可能的表单字段
            });
                

        },
        cancelDataSelection(){
            this.dataSelectionDialogVisible = false;
            this.dataCollectionDialogVisible = false; // 关闭数据选择对话框
            this.activeStep = 0; // 重置步骤指示器到第一步
        },

    }
  };
  </script>
  
  <style scoped>
  .data-collections h1 {
    margin-bottom: 20px;
  }
  </style>
  