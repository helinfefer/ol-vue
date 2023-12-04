<!--  -->
<template >

    <el-row>
        <el-col :span="12">
            <div>
                <p>就业控制总量</p>
                <ul>
                    <li v-for="file in $store.state.uploadJobControlFileList" :key="file.uid" @click="displayContent(file)">
                    {{ file.name }}
                    </li>
                </ul>
                <p>家庭控制总量</p>
                <li v-for="file in $store.state.uploadHouseholdsControlFileList" :key="file.uid">
                    {{ file.name }}
                </li>
            </div>

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
        </el-col>
    </el-row>


</template>

<script>
export default {
    name:"DataListComponent",
    data() {
        return {
            // selectedFileContent: null,
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
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
        console.log(data);
      }
    },

}
</script>

<style >

</style>