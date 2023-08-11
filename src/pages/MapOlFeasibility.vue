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
    // import { Circle } from 'ol/style';
    import LayerSwitcher from 'ol-layerswitcher';
    import Popup from 'ol-popup';

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

        // 加载geojsonData数据. zoning_baseline
        // 
        const response= await fetch("zoning_baseline.geojson");
        this.ZoningGeojsonData = await response.json();
        // console.log('this.ZoningGeojsonData',this.ZoningGeojsonData) 

        // 假设您有以下图层类型和相应的颜色
        const typesWithColors = {
          'HS': "rgba(255, 192, 203,0.5)",
          'MR': "rgba(165, 42, 42,0.5)",
          'AC': "rgba(255, 255, 0,0.5)",
          'IL': "rgba(166, 0, 171,0.5)",
          'OF': "rgba(239, 126, 22,0.5)",
          'RL': "rgba(245, 247, 0,0.5)",
          'ME': "rgba(141, 77, 0,0.5)",
          'MT': "rgba(237, 195, 213,0.5)"
        };

        // 创建VectorSource对象按类型分组
        this.sourcesByType = {};
        Object.keys(typesWithColors).forEach((type) => {
          this.sourcesByType[type] = new VectorSource();
        });

        // 根据数据的特性，将数据添加到特定的源中
        const geoJsonFormat = new GeoJSON();
        geoJsonFormat.readFeatures(this.ZoningGeojsonData).forEach((feature) => {
          const properties = feature.getProperties();
          Object.keys(typesWithColors).forEach((type) => {
            if (properties[type] === 1) {
              this.sourcesByType[type].addFeature(feature);
            }
          });
        });

        // 为每种类型创建图层并将其添加到地图上
        Object.keys(this.sourcesByType).forEach((type) => {
          const vectorLayer = new VectorLayer({
            source: this.sourcesByType[type],
            style: new Style({
              fill: new Fill({
                color: typesWithColors[type], // 使用类型对应的颜色
              }),
              stroke: new Stroke({
                color: 'grey',
                width: 1,
              }),
            }),
            title: `Layer ${type}`, // 设置图例标题
            type: 'overlay' // required if you want to group layers
          });
          this.map.addLayer(vectorLayer);
        });

        // Create a LayerSwitcher instance and add it to the map
        const layerSwitcher = new LayerSwitcher({
          tipLabel: 'Legend', // Optional label for button
        });
        this.map.addControl(layerSwitcher);
        
        // 创建 Popup 实例
        this.popup = new Popup();
        this.map.addOverlay(this.popup);

        // 添加点击事件监听器
        this.map.on('singleclick', (evt) => {
          const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
          if (feature) {
            const coordinates = evt.coordinate;
            const content = this.getFeatureProperties(feature); // 获取要素属性的自定义函数
            this.popup.show(coordinates, content);
          } else {
            this.popup.hide();
          }
        });


    },
    methods:{
      getFeatureProperties(feature) {
        // 获取要素属性并格式化为 HTML
        const properties = feature.getProperties();
        let content = '<div style="opacity: 0.8;"><h3>Properties:</h3><ul>'; // 设置透明度
        for (const key in properties) {
          content += `<li>${key}: ${properties[key]}</li>`;
        }
        content += '</ul></div>';
        return content;
      }
    },
  };
</script>

<style scoped>
.map-container {
  height: 700px;
  width: 100%;
}
</style>