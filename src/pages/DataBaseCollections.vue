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
          <el-button type="primary" @click="firstDialogVisible  = true">Add Collection</el-button>  
          <!-- 实现点击打开dialog Dialog 弹出一个对话框，适合需要定制性更大的场景。-->

        </el-col>
        <!-- Add Collection Dialog -->
        <el-dialog
            title="在此界面创建一个数据集（collection）"
            :visible.sync="firstDialogVisible "
            width="60%"
            :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
                <!-- 嵌套表格 -->
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
        </el-dialog>

        <!-- 第二个对话框 -->
        <el-dialog :visible.sync="secondaryDialogVisible" title="第二个对话框">
            <el-tree :data="checkedNodes">
            </el-tree>
            <span slot="footer" class="dialog-footer">
            <el-button @click="secondaryDialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>

      </el-row>
      <el-table :data="tableData" stripe style="width: 100%">
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
  export default {
    data() {
      return {
        firstDialogVisible : false,
        secondaryDialogVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [
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

      };
    },
    methods: {
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
        resetChecked() {
            console.log("🚀 ~ file: DataBaseCollections.vue:113 ~ resetChecked ~ resetChecked:", this.$refs.tree)
            this.$refs.tree.setCheckedKeys([]);
      }
    }
  };
  </script>
  
  <style scoped>
  .data-collections h1 {
    margin-bottom: 20px;
  }
  </style>
  