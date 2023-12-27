// 该文件用于创建Vuex中最为关键的store
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import axios from 'axios';
import LayerGroup from 'ol/layer/Group'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
Vue.use(Vuex);
// 准备actions功能，actions 用于响应组件中的动作
const actions = {
    addJobControlFile(miniStore,file){
        console.log('actions addJobControlFile 被调用',file); 
        miniStore.commit('ADDJOBCONTROLFILE',file);
    },
    addHouseholdControlFile(miniStore,file){
        console.log('actions addHouseholdControlFile 被调用',file); 
        miniStore.commit('ADDHOUSEHOLDCONTROLFILE',file);
    },
    addBaseDataFile(miniStore,file){
        console.log('actions addBaseDataFile 被调用',file); 
        miniStore.commit('ADDBASEDATAFILE',file);
    },
    // 获取地图展示数据
    loadMapData(miniStore) {
        // 获取图层数据
        console.log("🚀 ~ file: index.js:57 ~ loadMapData ~ loadMapData:")
        const layerGroup = new LayerGroup({
			title: 'Data',
			layers: [
			new VectorLayer({
				source: new VectorSource({
					format: new GeoJSON(),
					url:'div_parcels.geojson'   //! ***********
				}),
				title :'VectorLayer',
			}
			),
			new VectorLayer({
				source: new VectorSource({
					format: new GeoJSON(),
					url:'hubei.geojson'   //! ***********
				}),
				title :'hubei',
			}
			)
			// 其他图层可以在这里添加
			]
		})
        miniStore.commit('LOAD_MAP_DATA', layerGroup);
    },
        
    // 请求数据 
    
    async fetchDataFromBackend(miniStore,dataset) {
        console.log("🚀 ~ file: index.js:22 ~ fetchDataFromBackend ~ dataset:", dataset)
        try {
            const filename = dataset.split('.')[0]
            console.log('getdata: ' + filename)
            //   后端返回
            if(dataset.split('.')[1]==='csv'){
                const response = await axios.get(`http://localhost:5000/get-data/${filename}`);
                console.log("🚀 ~ file: index.js:39 ~ fetchDataFromBackend ~ response:", response)
                miniStore.commit('CHANGEDATASHOWONTABLE',response.data);
                
            }
            else if(dataset.split('.')[1]==='geojson'){
                const response = await axios.get(`http://localhost:5000/get-geo-data/${filename}`);
                console.log("🚀 ~ file: index.js:39 ~ fetchDataFromBackend ~ response:", response.data)
                miniStore.commit('CHANGEDATASHOWONTABLE',response.data.features);
                miniStore.commit('SET_LAYER_GROUP',response);
            }
            
            //   调用mutaion 函数
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      },
    //   分割数据
  };

// 准备 mutations  功能， mutations 用于操作数据
// 定义一些 mutations 来更新 state。
const mutations = {
    LOAD_MAP_DATA(state,layerGroup){
        state.layerGroup = layerGroup;
    },
    SET_LAYER_GROUP(state,response){
        // 设置地图图层数据
        const geojsonData = response.data;
        // 设置vectorSource
        const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData)});
        // 转为图层
        const newTitle = (state.selectedFileName).split('.')[0]
        const newVectorLayer = new VectorLayer({source: vectorSource,title: newTitle})
        // 添加到图层中
        state.layerGroup.getLayers().push(newVectorLayer);
        console.log("🚀 ~ file: index.js:98 ~ SET_LAYER_GROUP ~ geojsonData:", geojsonData)
        
    },
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
    ADDBASEDATAFILE(state, baseDataFile){
        state.uploadBaseDataFileList = state.uploadBaseDataFileList.concat(baseDataFile)
        console.log('ADDBASEDATAFILE mutation************',state.uploadBaseDataFileList)
        var elTreeBaseDataItem = {
            'label': baseDataFile.name,
            'uid':baseDataFile.uid,
            'level':2
        }
        state.elTreeData[2]['children'].push(elTreeBaseDataItem)

    },

    CHANGESELETEDFILEUID(state, changedFile){
        console.log("🚀 ~ file: index.js:52 ~ CHANGESELETEDFILEUID ~ changedFile:", changedFile)
        // 更新当前选择的数据，后面根据这个selectedFileUid 来请求数据库
        state.selectedFileUid = changedFile.uid;
        state.selectedFileName = changedFile.label
    },
    // 修改table组件中的展示数据
    CHANGEDATASHOWONTABLE(state,data){
        state.dataShowOnTable = data
        console.log("🚀 ~ file: index.js:67 ~ CHANGEDATASHOWONTABLE ~ response:", data)
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
    uploadBaseDataFileList:[] ,
     // 文件名树形控件
    elTreeData: [{
        label: '就业控制总量',
        level: 1,
        children: [
                // {
                //     label: '就业控制总量',
                //     uid:'01',
                //     level: 2,
                // }
            ]
        }, {
        label: '家庭控制总量',
        level: 1,
        children: [
        //     {
        //     label: '家庭控制总量 ',
        //     uid:'02',
        //     level: 2,
        // }
            ]
        },{
        label: '模型基础数据',
        level: 1,
        children: [
            
            ]
            }],
    selectedFileUid:'xx',
    selectedFileName:null,
    dataShowOnTable:[],
    currentPage:1,
    pageSize:10,
    // 在 Vuex store 中
    // Map 组件数据使用vuex进行管理
    mapCenter: [114.1692, 30.494],
    mapZoom: 10,
    layerGroup: null, // 初始状态为null
    // 其他状态...
}
const plugins=[createPersistedState(
    {paths: ['elTreeData','uploadJobControlFileList', 'uploadHouseholdsControlFileList', 'uploadBaseDataFileList']}
)]


// 创建store 并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters:getters,
    plugins:plugins,
})