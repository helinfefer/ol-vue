<template>
	<main id="Home-page">
		<h1>Home</h1>
		<ReusableMapComponent
		:initialCenter="mapCenter"
		:initialZoom="mapZoom"
		:layerGroup="layerGroup"
		:layerGroupName="layerGroupName"
		></ReusableMapComponent>

		<ReusableTableComponent
		:dataFromParent="tableData"></ReusableTableComponent>
	</main>
</template>

<script>
import ReusableMapComponent from '../components/ReusableMapComponent.vue'
import ReusableTableComponent from '../components/ReusableTableComponent.vue'

import LayerGroup from 'ol/layer/Group'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
export default {
	name: 'Home-page',
	components:{ReusableMapComponent,
		ReusableTableComponent
	},

	data(){
		return{
			tableData:
				[{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
			mapCenter:[114.1692, 30.494],
			mapZoom:10,
			layerGroupName:['VectorLayer','hubei'],
			layerGroup:  new LayerGroup({
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
		};
	}
	};
</script>

<style >

</style>