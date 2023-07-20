<!-- sidebar -->
<template >
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>

          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router:default-active="$route.path">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">数据视图</span>
              </template>
              <el-menu-item-group>
                <span slot="title">map</span>
                <el-menu-item index="1-1">
                  <router-link to="/openlayers">openlayers</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/mapbox">mapbox</router-link>
                </el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group title="基础数据">
                <el-menu-item index="1-3">
                    <router-link to="/data">data</router-link>
                </el-menu-item>
              </el-menu-item-group>


            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>    
                    <span slot="title">UMS</span>
                </template>

                <span slot="title">土地利用模型</span>

                <el-submenu index="2-1">
                    <span slot="title">土地利用模型</span>
                    <el-menu-item index="2-1-1">
                        <router-link to="/ums/SetArgument">参数设置</router-link>
                    </el-menu-item>

                    <el-menu-item index="2-1-1">
                        <router-link to="/ums/tansitionmodel">转移模型</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-1-2">
                        <router-link to="/ums/relocation">迁移模型</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-1-3">区位选择模型</el-menu-item>
                    <el-menu-item index="2-1-4">开发商模型</el-menu-item>
                    <el-menu-item index="2-1-5">统计分析</el-menu-item>
                </el-submenu>

                <el-submenu index="2-2">
                    <span slot="title">交通需求模型</span>
                    <el-menu-item index="2-2-1">出行产生</el-menu-item>
                    <el-menu-item index="2-2-2">出行产生</el-menu-item>
                    <el-menu-item index="2-2-3">出行产生</el-menu-item>
                    <el-menu-item index="2-2-4">出行产生</el-menu-item>
                </el-submenu>
                <el-menu-item-group title="地块划分">
                    <el-menu-item index="2-3">地块自动划分</el-menu-item>
                    <el-menu-item index="2-4">xx</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            <el-menu-item index="3" >
              <i class="el-icon-document"></i>
              <span slot="title">
                <router-link to="/about">说明文档</router-link>
              </span>
            </el-menu-item>

            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>