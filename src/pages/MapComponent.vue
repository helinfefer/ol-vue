<!--  -->
<template >
    <div ref="map-root" class="map-container">
      <b-nav tabs>
        <b-nav-item @click="changeDataSource('buildings')">buildings</b-nav-item>
        <b-nav-item @click="changeDataSource('parcels')">parcels</b-nav-item>
        <b-nav-item @click="changeDataSource('zoning')">zoning</b-nav-item>
        <b-nav-item @click="changeDataSource('road')">road</b-nav-item>
      </b-nav>
      <!-- 给ToolsBar的Vc身上绑定一个事件 -->
      <!-- 给谁绑的事件，就去找谁触发去  -->
      <!-- 通过父组件给子组件绑定一个自定义事件，实现，子给父传递事件 -->
      <ToolsBar v-on:changeCenter="getCenter"/>  
        
    </div>
</template>

<script>
    // 引入编辑子组件
    import ToolsBar from '../components/ToolsBar.vue';

    import 'ol/ol.css'
    import Map from 'ol/Map.js';
    import View from 'ol/View.js';
    import OSM from 'ol/source/OSM';
    import TileLayer from 'ol/layer/Tile'
    import {transform} from 'ol/proj';
    import GeoJSON from 'ol/format/GeoJSON';
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';

    import axios from 'axios'; //前后端消息发送


    export default {
      name:'MapComponent',
      components:{ToolsBar},
      data(){
        return {
          map: null,
          currentDataSource:null,
          layers:{}
        }
      },
      async mounted() {
        // 请求数据
       
        // 获取geojson数据 
        
        // 设置地图 中心
        const center = [114.1692, 30.494]; // EPSG:4326
        const transformedCenter = transform(center, 'EPSG:4326', 'EPSG:3857');
        // 设置视图
        const view = new View({
          center: transformedCenter,
          zoom: 13 
        });
        // 设置基础的底图
        const baseLayer = new TileLayer({
          source: new OSM()
        });

        // 设置地图
        this.map = new Map({
          target: this.$refs['map-root'],
          layers: [baseLayer],
          view: view
        })
        },

        methods: {
          getCenter(newCenter){
              console.log('getcenter method triggered with center:', newCenter);
          },
          async changeDataSource(dataSource){
            console.log(this.currentDataSource);

            if (this.currentDataSource){
              this.map.removeLayer(this.layers[this.currentDataSource]);
            }

            if (!this.layers[dataSource]){
              const response = await axios.get('http://localhost:5000/data/zoning');
              const geojsonData = response.data;
              console.log(geojsonData);

              // 设置vectorSource
              const vectorSource = new VectorSource({
                features: new GeoJSON().readFeatures(geojsonData,{
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857'
                })});
              // 转为图层
              const vectorLayer = new VectorLayer({source: vectorSource})
              this.layers[dataSource] = vectorLayer;
            }
            // Finally, add the new layer and update the current data source
              this.map.addLayer(this.layers[dataSource]);
              this.currentDataSource = dataSource;
          }
          },
  }
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
}
</style>