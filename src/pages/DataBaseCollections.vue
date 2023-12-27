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
          <el-button type="primary">Add Collection</el-button>
        </el-col>
            <!-- Add Collection Dialog -->

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
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .data-collections h1 {
    margin-bottom: 20px;
  }
  </style>
  