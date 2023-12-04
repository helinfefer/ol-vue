// 该文件用于创建Vuex中最为关键的store
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
// 准备actions功能，actions 用于响应组件中的动作
const actions = {
    addJobControlFile(miniStore,file){
        console.log('actions addJobControlFile 被调用',file); 
        miniStore.commit('ADDJOBCONTROLFILE',file);
        localStorage.setItem('msg',file.name);
    },
    addHouseholdControlFile(miniStore,file){
        console.log('actions addHouseholdControlFile 被调用',file); 
        miniStore.commit('ADDHOUSEHOLDCONTROLFILE',file);
    },
    // 请求数据 
    
    async fetchDataFromBackend(miniStore,dataset) {
        console.log("🚀 ~ file: index.js:22 ~ fetchDataFromBackend ~ dataset:", dataset)
        try {
            console.log('getdata: ' + dataset)
            //   后端返回
            const response = await axios.get(`http://localhost:5000/data/${dataset}`);
            //   调用mutaion 函数
            miniStore.commit('CHANGEDATASHOWONTABLE',response);
            
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      },
    //   分割数据
  };

// 准备 mutations  功能， mutations 用于操作数据
// 定义一些 mutations 来更新 state。
const mutations = {
    ADDJOBCONTROLFILE(state, jobControlsFile){
        state.uploadJobControlFileList = state.uploadJobControlFileList.concat(jobControlsFile)
        console.log('ADDJOBCONTROLFILE mutation************',state.uploadJobControlFileList)
        var elTreeJobDataItem = {
            'label': jobControlsFile.name,
            'uid':jobControlsFile.uid,
            'level':2
        }
        state.elTreeData[0]['children'].push(elTreeJobDataItem)
    },
    ADDHOUSEHOLDCONTROLFILE(state, householdControlsFile){
        state.uploadHouseholdsControlFileList = state.uploadHouseholdsControlFileList.concat(householdControlsFile)
        console.log('ADDHOUSEHOLDCONTROLFILE mutation************',state.uploadHouseholdsControlFileList)
        var elTreeHouseholdsDataItem = {
            'label': householdControlsFile.name,
            'uid':householdControlsFile.uid,
            'level':2
        }
        state.elTreeData[1]['children'].push(elTreeHouseholdsDataItem)

    },
    CHANGESELETEDFILEUID(state, changedFile){
        // console.log("🚀 ~ file: index.js:52 ~ CHANGESELETEDFILEUID ~ changedFile:", changedFile)
        // 更新当前选择的数据，后面根据这个selectedFileUid 来请求数据库
        state.selectedFileUid = changedFile.uid
    },
    // 修改table组件中的展示数据
    CHANGEDATASHOWONTABLE(state,response){
        state.dataShowOnTable = response.data
        // console.log("🚀 ~ file: index.js:67 ~ CHANGEDATASHOWONTABLE ~ response:", response.data)
    },
    HANDLECURRENTCHANGE(state,newPage){
        state.currentPage = newPage
        console.log("🚀 ~ file: index.js:85 ~ HANDLECURRENTCHANGE ~ currentPage:", state.currentPage)
    },
    HANDLESIZECHANGE(state,newSize){
        state.pageSize = newSize;
        state.currentPage = 1; // 重置到第一页
        console.log("🚀 ~ file: index.js:89 ~ HANDLESIZECHANGE ~ pageSize:", state.pageSize)
        console.log("🚀 ~ file: index.js:85 ~ HANDLECURRENTCHANGE ~ currentPage:", state.currentPage)
    },
  };
  
  
const getters = {
    // 获取分页后的表格数据
    paginatedData: (state) => {
        const start = (state.currentPage - 1) * state.pageSize;
        const end = start + state.pageSize;
        console.log("🚀 ~ file: index.js:96 ~ paginatedData:", state.dataShowOnTable.slice(start, end))
        return state.dataShowOnTable.slice(start, end);
    },
}
// 准备 state  功能， state 用于存储数据
const state = {
    message:'hello world',
    uploadJobControlFileList : [],
    uploadHouseholdsControlFileList:[],
     // 文件名树形控件
    elTreeData: [{
        label: '就业控制总量',
        level: 1,
        children: [{
            label: 'job_controls.csv ',
            uid:'01',
            level: 2,
        }]
        }, {
        label: '家庭控制总量',
        level: 1,
        }],
    selectedFileUid:'xx',
    dataShowOnTable:[],
    currentPage:1,
    pageSize:10,
    // 在 Vuex store 中
}


// 创建store 并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters:getters,
})