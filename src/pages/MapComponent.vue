<!--  -->
<template >
    <div ref="map-root" class="map-container">
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
    export default {
        name:'MapComponent',
        components:{ToolsBar},
        data(){
          return {
            map: null
          }
        },
        mounted() {
      // this is where we create the OpenLayers map
          const center = [114.1692, 30.494]; // EPSG:4326
          const transformedCenter = transform(center, 'EPSG:4326', 'EPSG:3857');

          const view = new View({
            center: transformedCenter,
            zoom: 13 
          });

          this.map = new Map({
            // the map will be created using the 'map-root' ref
            target: this.$refs['map-root'],
            layers: [
              new TileLayer({
                source: new OSM()
              }),
              new VectorLayer({
                // source: new OSM() // tiles are served by OpenStreetMap
                source: new VectorSource({
                  format: new GeoJSON(),
                  url:'/new_parcels2023-02-07.geojson'
                })
              }),
              // adding a background tiled layer
            ],
            // the map view will initially show the whole world
            view: view
          })
      },

        methods: {
          getCenter(newCenter){
              console.log('getcenter method triggered with center:', newCenter);
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