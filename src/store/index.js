// 该文件用于创建Vuex中最为关键的store
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
// import axios from 'axios';
Vue.use(Vuex);
// 准备actions功能，actions 用于响应组件中的动作
const actions = {
  };
  

// 准备 mutations  功能， mutations 用于操作数据
// 定义一些 mutations 来更新 state。
const mutations = {
    changeMessage(state, message){
        state.message = message;
        console.log(message);
    }
  };
  

// 准备 state  功能， state 用于存储数据
const state = {
    message:'hello world',
    uploadJobControlFileList : [{
        name:'uploadFile-text'
    }],
    uploadHouseholdsControlFileList:[]
}

// 创建store 并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
})