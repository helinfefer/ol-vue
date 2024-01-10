<!--  -->
<template >
    <div ref="map-root" class="map-container">
      <b-nav tabs>
        <b-nav-item @click="changeDataSource('buildings')">buildings</b-nav-item>
        <b-nav-item @click="changeDataSource('parcels')">parcels</b-nav-item>
        <b-nav-item @click="changeDataSource('zoning')">zoning</b-nav-item>
        <b-nav-item @click="changeDataSource('road_edges')">roadEdges</b-nav-item>
      </b-nav>
      <!-- 给ToolsBar的Vc身上绑定一个事件 -->
      <!-- 给谁绑的事件，就去找谁触发去  -->
      <!-- 通过父组件给子组件绑定一个自定义事件，实现，子给父传递事件 -->
      <ToolsBar ref = "toolsBarRef"
        v-on:changeCenter="getCenter"
        v-on:clearMap="handleClearMap"
        v-on:editorMap="handleEditorMap"
        v-on:addPolygon="handleAddPolygon"
        v-on:downLoad="handleDownLoad"
        v-on:addGeomery="handleAddGeomery"
        v-on:removeDrawInteraction="removeDrawInteraction"
      />  
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
    import GeoJSON from 'ol/format/GeoJSON';
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';
    import axios from 'axios'; //前后端消息发送
    import {Draw, Modify}from 'ol/interaction';

    export default {
      name:'MapComponent',
      components:{ToolsBar},
      data(){
        return {
          map: null,
          currentDataSource:null,
          layers:{},
          isEditing:false,
          modifyInteraction:null,
          clickCount2: 0,
          currentGeometryType:null,//当前编辑的geometry 类型
          geometryType:null //用户触发的,添加的geometry 类型
        }
      },
      async mounted() {
        const center = [114.1692, 30.494]; // EPSG:4326
        // const transformedCenter = transform(center, 'EPSG:4326', 'EPSG:3857');
        // 设置视图
        const view = new View({
          center: center,
          zoom: 13 ,
          projection:'EPSG:4326' //将基础视图的坐标改成4326
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
          removeDrawInteraction(){
            if (this.drawInteraction) {
              this.map.removeInteraction(this.drawInteraction);
              this.drawInteraction = null;
          }},

          async changeDataSource(dataSource){
            console.log(this.currentDataSource);

            if (this.currentDataSource){
              this.map.removeLayer(this.layers[this.currentDataSource]);
            }

            if (!this.layers[dataSource]){
              console.log(dataSource)
              const response = await axios.get(`http://localhost:5000/get-geo-data/${dataSource}`);
              const geojsonData = response.data;
              console.log(geojsonData);

              // 设置vectorSource
              const vectorSource = new VectorSource({
                features: new GeoJSON().readFeatures(geojsonData)});
              // 转为图层
              const vectorLayer = new VectorLayer({source: vectorSource})
              this.layers[dataSource] = vectorLayer;
            }
            // Finally, add the new layer and update the current data source
              this.map.addLayer(this.layers[dataSource]);
              this.currentDataSource = dataSource;
          },
          // 清除功能
          handleClearMap(){
            console.log('handleClearMap')
            for (let dataSource in this.layers) {
              this.map.removeLayer(this.layers[dataSource]);
            }
            // Clear the layers object
            this.layers = {};
            // Reset the current data source
            this.currentDataSource = null;
            console.log(this.$refs.toolsBarRef.selected = null)
          },

          // 编辑功能
          handleEditorMap(isEditingFromChild){
            console.log('isEditing from ToolsBar:', isEditingFromChild);
            if (!this.currentDataSource || !this.layers[this.currentDataSource]) {
              alert('请首先选择一个有效的数据源！');
              return;
            }

            this.isEditing = isEditingFromChild;

            if (this.isEditing){
              const sourceToEdit = this.layers[this.currentDataSource].getSource();
              // console.log(sourceToEdit)
              this.modifyInteraction = new Modify({
                source: sourceToEdit,
              });
              this.map.addInteraction(this.modifyInteraction);
            }else{
              this.map.removeInteraction(this.modifyInteraction);
            }
          },


          // 添加polygon功能
          handleAddPolygon() {
            if (!this.currentDataSource || !this.layers[this.currentDataSource]) {
              alert('请首先选择一个有效的数据源！');
              return;
            }

            this.clickCount2++;
            if (this.clickCount2 % 2 === 1){
              this.drawInteraction = new Draw({
                type:"Polygon",
                source: this.layers[this.currentDataSource].getSource(), // 修改的是传入的 Geojson 数据；
              });
              this.map.addInteraction(this.drawInteraction);
            } else {
              this.map.removeInteraction(this.drawInteraction);
            }
          },

          handleDownLoad(){
            if (!this.currentDataSource || !this.layers[this.currentDataSource]) {
              alert('请首先选择一个有效的数据源！');
              return;
            }

            const format = new GeoJSON({featureProjection:'EPSG:4326'});
            const sourceGeoJson = this.layers[this.currentDataSource].getSource();
            const features = sourceGeoJson.getFeatures();
            const json = format.writeFeatures(features);
            const dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
            // 创建一个下载链接并模拟点击操作以下载数据
            let downloadLink = document.createElement('a');
            downloadLink.href = dataStr;
            downloadLink.download = 'features.geojson';
            downloadLink.click();
            downloadLink.remove();
          },

          addInteraction(geometryType,dealSource){
            this.drawInteraction= new Draw({
              type:geometryType,
              source:dealSource})
            this.map.addInteraction(this.drawInteraction)
          },

          handleAddGeomery(geometryType){
            this.geometryType = geometryType
            console.log('handleAddGeomery,Selected option:', this.geometryType);
            console.log('currentDataSource',this.currentDataSource)
            let dealSource;
              if(this.currentDataSource===null){
                console.log('创建一个新的数据源')
                // 创建一个空的geojson
                // 使用特性来创建 VectorSource
                dealSource = new VectorSource();

                // 创建一个新的图层，并将它添加到地图和 this.layers 对象中
                let newLayer = new VectorLayer({source: dealSource});
                this.map.addLayer(newLayer);
                this.currentDataSource = "newSource";
                // add newLayer to this.layers
                this.layers[this.currentDataSource] = newLayer;
              }else{
                dealSource = this.layers[this.currentDataSource].getSource()
              }
              // 移除旧的Draw交互
              this.removeDrawInteraction();
              this.addInteraction(this.geometryType,dealSource)
          }

        }
  }
</script>

<style scoped>
.map-container {
  height: 800px;
  width: 100%;
}
</style>

