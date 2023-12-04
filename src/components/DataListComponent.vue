<!--  -->
<template >

    <el-row>
        <el-col :span="12">

        </el-col>
        <el-col :span="12">
            <p>就业控制总量</p>

            <el-select v-model="uploadJobControlFile" placeholder="请选择">
                <el-option
                  v-for="item in $store.state.uploadJobControlFileList"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.name">
                </el-option>
            </el-select>
            <p>家庭控制总量</p>

            <el-select v-model="uploadHouseholdsControlFile" placeholder="请选择">
                <el-option
                  v-for="item in $store.state.uploadHouseholdsControlFileList"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.name">
                </el-option>
            </el-select>

            <el-tree :data="$store.state.elTreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

            <p>当前选择的文件是：{{$store.state.selectedFileUid}}</p>
        </el-col>
    </el-row>


</template>

<script>
export default {
    name:"DataListComponent",
    data() {
        return {
            // selectedFileContent: null,
            uploadJobControlFile: '',
            uploadHouseholdsControlFile:'',


            defaultProps: {
            children: 'children',
            label: 'label'
            }
        }
    },
    mounted(){
        // 挂载
        // this.selectedFileContent = file.content; // 示例代码，实际逻辑可能不同

    },
    methods:{
        displayContent(file){
            console.log('displayContent 函数被调用',file.name);
        },
        handleNodeClick(data) {
        // data.name就是文件名，data.uid 就是文件id
        if (data.level === 1) {
            // 这是一级节点
            console.log('Clicked a root level node');
        } else {
            // 这是非一级节点
            console.log('Clicked a non-root level node');
            // 将数据传给$store.state.selectedFileUid,跳过dispatch,直接commit调用mutation函数
            this.$store.commit('CHANGESELETEDFILEUID',data)
        }
      }
    },

}
</script>

<style >

</style>