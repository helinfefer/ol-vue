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
    add_job_control_file(miniStore,file){
        console.log('actions add_job_control_file 被调用',file); 
        miniStore.commit('ADD_JOB_CONTROL_FILE',file);
    },
    add_household_control_file(miniStore,file){
        console.log('actions add_household_control_file 被调用',file); 
        miniStore.commit('ADD_HOUSEHOLD_CONTROL_FILE',file);
    },
    add_base_data_file(miniStore,file){
        console.log('actions add_base_data_file 被调用',file); 
        miniStore.commit('ADD_BASE_DATA_FILE',file);
    },
    // 获取地图展示数据
    loadMapData(miniStore) {
        // 获取图层数据
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
        try {
            const filename = dataset.split('.')[0]
            console.log('getdata: ' + filename)
            //   后端返回
            if(dataset.split('.')[1]==='csv'){
                const response = await axios.get(`http://localhost:5000/get-data/${filename}`);
                miniStore.commit('CHANGE_DATA_SHOW_ONTABLE_CSV',response);
                
            }
            else if(dataset.split('.')[1]==='geojson'){
                const response = await axios.get(`http://localhost:5000/get-geo-data/${filename}`);
                miniStore.commit('CHANGE_DATA_SHOW_ONTABLE',response);
                miniStore.commit('SET_LAYER_GROUP',response);
            }
            
            //   调用mutaion 函数
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      },
    // 
    // add_data_collection(miniStore,collection){
    //     // 添加数据集合
    //     console.log("🚀 ~ add_data_collection ~ collection:", collection)
    //     miniStore.commit('ADD_DATA_COLLECTION',collection);  
    // },
    // update_data_collection(miniStore,collection){
    //     // 更新数据集合
    //     console.log("🚀 ~ add_data_collection ~ collection:", collection)
    //     miniStore.commit('ADD_DATA_COLLECTION',collection);  
    // }

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
        
    },
    ADD_JOB_CONTROL_FILE(state, jobControlsFile){
        state.uploadJobControlFileList = state.uploadJobControlFileList.concat(jobControlsFile)
        console.log('ADD_JOB_CONTROL_FILE mutation************',state.uploadJobControlFileList)
        var elTreeJobDataItem = {
            'label': jobControlsFile.name,
            'uid':jobControlsFile.uid,
            'level':2
        }
        state.elTreeData[0]['children'].push(elTreeJobDataItem)
    },
    ADD_HOUSEHOLD_CONTROL_FILE(state, householdControlsFile){
        state.uploadHouseholdsControlFileList = state.uploadHouseholdsControlFileList.concat(householdControlsFile)
        console.log('ADD_HOUSEHOLD_CONTROL_FILE mutation************',state.uploadHouseholdsControlFileList)
        var elTreeHouseholdsDataItem = {
            'label': householdControlsFile.name,
            'uid':householdControlsFile.uid,
            'level':2
        }
        state.elTreeData[1]['children'].push(elTreeHouseholdsDataItem)

    },
    ADD_BASE_DATA_FILE(state, baseDataFile){
        state.uploadBaseDataFileList = state.uploadBaseDataFileList.concat(baseDataFile)
        console.log('ADD_BASE_DATA_FILE mutation************',state.uploadBaseDataFileList)
        var elTreeBaseDataItem = {
            'label': baseDataFile.name,
            'uid':baseDataFile.uid,
            'level':2
        }
        state.elTreeData[2]['children'].push(elTreeBaseDataItem)

    },
    CHANGE_SELETED_FILE_UID(state, changedFile){
        // 更新当前选择的数据，后面根据这个selectedFileUid 来请求数据库
        state.selectedFileUid = changedFile.uid;
        state.selectedFileName = changedFile.label
    },
    // 修改table组件中的展示数据
    CHANGE_DATA_SHOW_ONTABLE(state,response){
        state.dataShowOnTable = response.data.features.map(feature => feature.properties)
        // state.dataShowOnTable = Array.isArray(response.data) ? response.data : [];
        console.log("🚀 ~ file: index.js:143 ~ CHANGE_DATA_SHOW_ONTABLE ~ dataShowOnTable:", state.dataShowOnTable)

    },
    CHANGE_DATA_SHOW_ONTABLE_CSV(state,response){
        state.dataShowOnTable = response.data
        // state.dataShowOnTable = Array.isArray(response.data) ? response.data : [];
        // console.log("🚀 ~ file: index.js:143 ~ CHANGE_DATA_SHOW_ONTABLE ~ dataShowOnTable:", state.dataShowOnTable)
    },

    HANDLE_CURRENT_CHANGE(state,newPage){
        state.currentPage = newPage
    },
    HANDLE_SIZE_CHANGE(state,newSize){
        state.pageSize = newSize;
        state.currentPage = 1; // 重置到第一页
    },

    // 添加数据集合，修改baseDataCollections数据
    ADD_DATA_COLLECTION(state,collection){
        state.baseDataCollections.push(collection)
    },
    UPDATE_DATA_COLLECTION(state,collection){
        // 更新
        const updatedIndex = state.baseDataCollections.findIndex(item => item.id === collection.id);
        console.log("🚀 ~ UPDATE_DATA_COLLECTION ~ updatedIndex:", updatedIndex)
        if (updatedIndex !== -1) {
            state.baseDataCollections.splice(updatedIndex, 1, collection);
        }
    },
    DELETE_DATA_COLLECTION(state,collectionId){
        // 删除数据合集
        const deleteIndex = state.baseDataCollections.findIndex(item => item.id === collectionId);
        console.log("🚀 ~ DELETE_DATA_COLLECTION ~ deleteIndex:", deleteIndex)
        state.baseDataCollections.splice(deleteIndex, 1);
    },
    // 添加情急，修改baseDataCollections数据
    ADD_SCENARIO(state,collection){
        state.scenarioCollections.push(collection)
        console.log("🚀 ~ ADD_SCENARIO ~ state.scenarioCollections:", state.scenarioCollections)
    },
    

  };
  
const getters = {
    // 获取分页后的表格数据
    paginatedData: (state) => {
        const start = (state.currentPage - 1) * state.pageSize;
        const end = start + state.pageSize;
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
        uid:0,
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
    baseDataCollections:[
        {
          id: 1,
          name: 'Parcel initialization',
          year: '2017',
          template: 'Parcel model initialization',
          notes: '',
          status: 'Ok',
          selectdDataForm:{
            selectedParcels:'parcels.geojson',
            selectedBuildings:'buildings.geojson',
            selectedHouseholds:'households.csv',
            selectedJobs:'',
            selectedRent:'',
            selectedPrice:'',
          },

        },
        {
          id: 2,
          name: 'Region Base Data v1',
          year: '2014',
          template: 'Parcel base data',
          notes: 'Warning: 24695 buildings have non-residential use',
          status: 'Warning',
          selectdDataForm:{
            selectedParcels:'parcels.geojson',
            selectedBuildings:'buildings.geojson',
            selectedHouseholds:'households.csv',
            selectedJobs:'',
            selectedRent:'',
            selectedPrice:'',
          },
        }
      ], //数据合集列表

    //情景管理合集
    scenarioCollections:[
        {
            id: 1,
            name: 'testScenaio111', // 测试情景名称
            isBaseline: true, // 生产演算开关
            residentialVacancyRate: 0.21, // 住宅空置率
            householdGrowthRate: 0.21, // 家庭增长率
            employmentGrowthRate:0.22, //就业增长率
            selectedJobControl:null,
            selectedHControl:null,
            selectedCollection:'Region Base Data v1',
            travelModelZone:null,
            travelModelSkims:null, 
            travelModelNetwork:null,
        },
        {
            id: 2,
            name: 'testScenaio222', // 测试情景名称
            isBaseline: false, // 生产演算开关
            residentialVacancyRate: 0.25, // 住宅空置率
            householdGrowthRate: 0.19, // 家庭增长率
            employmentGrowthRate:0.20, //就业增长率
            selectedJobControl:null,
            selectedHControl:null,
            selectedCollection:'parcel 2020',
            travelModelZone:null,
            travelModelSkims:null, 
            travelModelNetwork:null,
        },
    ],
}

// 浏览器存储
const plugins=[createPersistedState(
    {
        paths: ['elTreeData','uploadJobControlFileList', 'uploadHouseholdsControlFileList', 'uploadBaseDataFileList','baseDataCollections','scenarioCollections']
    }
)]


// 创建store 并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters:getters,
    plugins:plugins,
})