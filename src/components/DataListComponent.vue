<!--  -->
<template >
    <div>
        <el-tree :data="$store.state.elTreeData" :props="defaultProps" @node-click="handleNodeClick"
        :default-expand-all="true"></el-tree>
        <p>当前选择的文件是：{{$store.state.selectedFileUid}}</p>
    </div>    
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
            // 请求数据
            this.$store.dispatch('fetchDataFromBackend','stop_bus');
            
        }
      }
    },

}
</script>

<style >

</style>