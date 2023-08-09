<!--  -->
<template >
    <div ref="map-root" class="map-container">
    </div>

</template>

<script>
    // 引入编辑子组件
    import 'ol/ol.css'
    import Map from 'ol/Map.js';
    import View from 'ol/View.js';
    import OSM from 'ol/source/OSM';
    import TileLayer from 'ol/layer/Tile'
    import GeoJSON from 'ol/format/GeoJSON';
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';
    import { Fill,Stroke,Style } from 'ol/style';
    import { Circle } from 'ol/style';
    import LayerSwitcher from 'ol-layerswitcher';

    export default {
      name:'MapOlFeasibility',
      props: {
        geojsonData: {
          type: Object,
          default: () => ({
          })
  }
    },
      data(){
        return {
          map: null,
          layers:{},
          ZoningGeojsonData:{},
          sourcesByType:{},
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

        // *****************************************************
        // 设置地图
        this.map = new Map({
            target: this.$refs['map-root'],
            layers: [baseLayer],
            view: view
        });
        // 设置数据源
        // const vectorSource = new VectorSource({
        //     // features: new GeoJSON().readFeatures(this.geojsonData)
        //     format: new GeoJSON(),
        //     url:'div_parcels.geojson'   //! ***********
        // });

        // 加载geojsonData数据
        const response= await fetch("test_layers_data.geojson");
        this.ZoningGeojsonData = await response.json();
        console.log('this.ZoningGeojsonData',this.ZoningGeojsonData) 


         // 创建VectorSource对象按类型分组
         this.sourcesByType = {
            "1": new VectorSource(),
            "2": new VectorSource()
          };
         console.log('sourcesByType:',this.sourcesByType)

        //  根据数据的特性，将数据添加到特定的源中
        const geoJsonFormat = new GeoJSON();


        geoJsonFormat.readFeatures(this.ZoningGeojsonData).forEach((feature) => {
            const properties = feature.getProperties();
            console.log(properties); // 打印特性的所有属性
            const zonetype = properties.zonetype.toString();
            if (this.sourcesByType[zonetype]) {
              this.sourcesByType[zonetype].addFeature(feature);
            } else {
              console.warn("未知类型: " + zonetype);
            }
      });


      // 为每种类型创建图层并将其添加到地图上
      Object.keys(this.sourcesByType).forEach((zonetype) => {
        const vectorLayer = new VectorLayer({
          source: this.sourcesByType[zonetype],
          style: new Style({
            image: new Circle({
              radius: 10,
              fill: new Fill({
                color: zonetype === "1" ? "red" : "blue",
              }),
              stroke: new Stroke({
                color: "grey",
                width: 1,
              }),
            }),
          }),
          title: `Zone Type ${zonetype}`, // Set a title for the legend
          type: 'base', // Required if you want to group layers
        });
        this.map.addLayer(vectorLayer);
      });

      // Create a LayerSwitcher instance and add it to the map
      const layerSwitcher = new LayerSwitcher({
        tipLabel: 'Legend', // Optional label for button
      });
      this.map.addControl(layerSwitcher);
    },
  };
</script>

<style scoped>
.map-container {
  height: 700px;
  width: 100%;
}
</style>