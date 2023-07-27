<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="可行性分析" name="first">
      </el-tab-pane>
      <el-tab-pane label="居住开发商模型" name="second">居住开发商模型</el-tab-pane>
      <el-tab-pane label="非居住开发商模型" name="third">非居住开发商模型</el-tab-pane>
      <el-tab-pane label="结果可视化" name="fourth">结果可视化</el-tab-pane>
    </el-tabs>
  </template>
  <script>

    export default {
    data() {
        return {
            activeName: 'second'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
};
  </script>