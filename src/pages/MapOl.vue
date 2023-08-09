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
    import LayerSwitcher from 'ol-layerswitcher';
    export default {
      name:'MapOl',
      props: {
        geojsonData: {
          type: Object,
          default: () => ({})
        },
        feasibilityData:{
          type: Object,
          default: () => ({})
        }
    },
      data(){
        return {
          map: null,
          layers:{},
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

      // 默认的地块数据源
        const vectorSource = new VectorSource({
            // features: new GeoJSON().readFeatures(this.geojsonData)
            format: new GeoJSON(),
            url:'div_parcels.geojson'   //! ***********
        });

        const getColorFromNum = (popnum) => {
            const alpha = 0.4;
            if (popnum > 20000) return `rgba(48, 123, 235, ${alpha})`; // red
            if (popnum > 5000) return `rgba(84, 142, 240, ${alpha})`; // orange
            if (popnum > 2000) return `rgba(121, 165, 245, ${alpha})`; // orange
            if (popnum > 1000) return `rgba(161, 190, 250, ${alpha})`; // orange
            if (popnum > 200) return `rgba(202, 218, 255, ${alpha})`; // orange

            return `rgba(27, 27, 27, ${alpha})`; // green
        };

        // console.log("popnum",this.geojsonData[54]) 
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: (feature) => {
                const parcelId = feature.get('parcel_id').toString();
                const popnum = this.geojsonData[parcelId];
                // console.log("popnum",parcelId);
                const color = getColorFromNum(popnum);
                return new Style({
                    fill: new Fill({
                        color: color,// 使用num值来确定颜色
                    }),
                    stroke: new Stroke({
                      color:'grey',
                      width:1
                    })
                });
              },
            title:'parcel'
        });
        this.map.addLayer(vectorLayer);
        
        // Create a LayerSwitcher instance and add it to the map
        const layerSwitcher = new LayerSwitcher({
          tipLabel: 'Legend', // Optional label for button
        });
        this.map.addControl(layerSwitcher);

    },
    // 监听
    methods:{
      updateGeojsonLayer() {
        console.log('更新图层')
      },
      updateFeasibilityLayer() {
        console.log('更新图层,updateFeasibilityLayer')
        
      },
    },
    watch: {
      geojsonData: {
        handler: 'updateGeojsonLayer',   //updateGeojsonLayer 写在methods中
        deep: true
      },
      feasibilityData: {
        handler: 'updateFeasibilityLayer',
        deep: true
      }
    }


    


  }
</script>

<style scoped>
.map-container {
  height: 700px;
  width: 100%;
}
</style>