// 该文件用于创建Vuex中最为关键的store
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
// import axios from 'axios';
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
  };
  

// 准备 mutations  功能， mutations 用于操作数据
// 定义一些 mutations 来更新 state。
const mutations = {
    changeMessage(state, message){
        state.message = message;
        console.log(message);
    },
    ADDJOBCONTROLFILE(state, jobControlsFile){
        state.uploadJobControlFileList = state.uploadJobControlFileList.concat(jobControlsFile)
        console.log('ADDJOBCONTROLFILE mutation************',state.uploadJobControlFileList)
        var elTreeJobDataItem = {
            'label': jobControlsFile.name,
            'uid':jobControlsFile.uid,
        }
        state.elTreeData[0]['children'].push(elTreeJobDataItem)
    },
    ADDHOUSEHOLDCONTROLFILE(state, householdControlsFile){
        state.uploadHouseholdsControlFileList = state.uploadHouseholdsControlFileList.concat(householdControlsFile)
        console.log('ADDHOUSEHOLDCONTROLFILE mutation************',state.uploadHouseholdsControlFileList)
        var elTreeHouseholdsDataItem = {
            'label': householdControlsFile.name,
            'uid':householdControlsFile.uid,
        }
        state.elTreeData[1]['children'].push(elTreeHouseholdsDataItem)

    },
  };
  

// 准备 state  功能， state 用于存储数据
const state = {
    message:'hello world',
    uploadJobControlFileList : [],
    uploadHouseholdsControlFileList:[],
     // 文件名树形控件
    elTreeData: [{
        label: '就业控制总量',
        children: [{
            label: 'job_controls.csv ',
            uid:'01'
        }]
        }, {
        label: '家庭控制总量',
        children: [{
            label: '二级 2-1',
        }, {
            label: '二级 2-2',
        }]
        }],
}

// 创建store 并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
})