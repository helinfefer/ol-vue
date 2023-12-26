<template>
	<main id="Home-page">
		<ReusableMapComponent
		:initialCenter="mapCenter"
		:initialZoom="mapZoom"
		:layerGroup="layerGroup"
		:layerGroupName="layerGroupName"
		></ReusableMapComponent>
		<el-row>
			<!-- 数据list -->
			<el-col :span="4">
				<DataListComponent/>
			</el-col>
			<!-- 表格 -->
			<el-col :span="20">
				<ReusableTableComponent
				:dataFromParent="householdsTable"></ReusableTableComponent>
			</el-col>
		</el-row>
	</main>
</template>

<script>
import ReusableMapComponent from '../components/ReusableMapComponent.vue'
import ReusableTableComponent from '../components/ReusableTableComponent.vue'
import DataListComponent from '../components/DataListComponent.vue'

// import LayerGroup from 'ol/layer/Group'
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
import { mapState } from 'vuex';

export default {
	name: 'Home-page',
	components:{ReusableMapComponent,
		ReusableTableComponent,
		DataListComponent
	},

	data(){
		return{
			// householdsTable: [
			// 	{
			// 	"building_id": 4648,
			// 	"income": 4000,
			// 	"income_quartile": 1,
			// 	"income_segment": 1,
			// 	"parcel_id": 44.0,
			// 	"persons": 2,
			// 	"zone_id": 249.0
			// 	},
			// 	{
			// 	"building_id": 762,
			// 	"income": 4000,
			// 	"income_quartile": 1,
			// 	"income_segment": 1,
			// 	"parcel_id": 153.0,
			// 	"persons": 2,
			// 	"zone_id": 41.0
			// 	},
			// 	{
			// 	"building_id": 1089,
			// 	"income": 6000,
			// 	"income_quartile": 1,
			// 	"income_segment": 1,
			// 	"parcel_id": 144.0,
			// 	"persons": 2,
			// 	"zone_id": 32.0
			// 	// 在这里继续添加你的数据
			// 	}
			// ],
			// tableData:
			// 	[{
			// 	date: '2016-05-02',
			// 	name: '王小虎',
			// 	address: '上海市普陀区金沙江路 1518 弄'
			// }, {
			// 	date: '2016-05-04',
			// 	name: '王小虎',
			// 	address: '上海市普陀区金沙江路 1517 弄'
			// }, {
			// 	date: '2016-05-01',
			// 	name: '王小虎',
			// 	address: '上海市普陀区金沙江路 1519 弄'
			// }, {
			// 	date: '2016-05-03',
			// 	name: '王小虎',
			// 	address: '上海市普陀区金沙江路 1516 弄'
			// }],

			mapCenter:[114.1692, 30.494],
			mapZoom:10,
			layerGroupName:['VectorLayer','hubei'],
		// 	layerGroup:  new LayerGroup({
		// 	title: 'Data',
		// 	layers: [
		// 	new VectorLayer({
		// 		source: new VectorSource({
		// 			format: new GeoJSON(),
		// 			url:'div_parcels.geojson'   //! ***********
		// 		}),
		// 		title :'VectorLayer',
		// 	}
		// 	),
		// 	new VectorLayer({
		// 		source: new VectorSource({
		// 			format: new GeoJSON(),
		// 			url:'hubei.geojson'   //! ***********
		// 		}),
		// 		title :'hubei',
		// 	}
		// 	)
		// 	// 其他图层可以在这里添加
		// 	]
		// })
		};
	},
	computed: {
        ...mapState([
            'layerGroup',
			// 'layerGroupName'
            // 其他需要的状态...
        ]),
    },
	created(){
		this.$store.dispatch('loadMapData')
		// 从后端获取数据
		// if(this.$store.state.selectedFileName.split('.')[1]==='geojson'){
		// 	const geojsonPlotData = this.$store.dispatch('fetchDataFromBackend',this.$store.state.selectedFileName);
		// 	console.log("🚀 ~ file: HomePage.vue:130 ~ mounted ~ geojsonPlotData:", this.$store.state.selectedFileName)
		// 	this.$store.dispatch('loadMapData',geojsonPlotData)
		// }
	}
	};
</script>

<style >

</style>