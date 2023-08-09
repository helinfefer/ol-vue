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
    // 引用popup
    import Popup from 'ol-popup'; 
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
        },
        developerData:{
          type: Object,
          default: () => ({})
        },
        // developer_form: {
        //   type: String,
        //   default: () => ("default")
        // },
        developerDataMerge:{
          type: Object,
          default: () => ({
            "developerData":{},
            "developer_form": "default"
          })
        },

    },
      data(){
        return {
          map: null,
          layers:{},
          vectorSource:null,
          vectorLayer:null,
          layerSwitcher:null,
          popup:null,
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

        // console.log("feasibilityData:",this.feasibilityData)
          // 根据传入的props更新图层
        // this.updateGeojsonLayer();
        // this.updateFeasibilityLayer();

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
    // 监听
    methods:{
      updateGeojsonLayer() {
        console.log('更新图层,updateGeojsonLayer')
        
      // 默认的地块数据源
      this.vectorSource = new VectorSource({
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
        this.vectorLayer = new VectorLayer({
            source: this.vectorSource,
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
        this.map.addLayer(this.vectorLayer);
        
        // Create a LayerSwitcher instance and add it to the map
        this.layerSwitcher = new LayerSwitcher({
          tipLabel: 'Legend', // Optional label for button
        });
        this.map.addControl(this.layerSwitcher);
        
      },
      updateFeasibilityLayer() {
        console.log('更新图层,updateFeasibilityLayer')
        
      // 默认的地块数据源
      this.vectorSource = new VectorSource({
            // features: new GeoJSON().readFeatures(this.geojsonData)
            format: new GeoJSON(),
            url:'div_parcels.geojson'  
        });

        const getColorFromFeasibility = (feasibilityValue) => {
            const alpha = 0.4;
            if (feasibilityValue !== undefined && feasibilityValue.toString() === "1") {
              // console.log('被允许开发')
              return `rgba(174, 0, 0, ${alpha})`; // red
            }

            return `rgba(27, 27, 27, ${alpha})`; // green
        };

        this.vectorLayer = new VectorLayer({
            source: this.vectorSource,
            style: (feature) => {
                const parcelId = feature.get('parcel_id').toString();
                const feasibilityValue = this.feasibilityData[parcelId];
                // console.log("feasibilityValue:",feasibilityValue)
                const color = getColorFromFeasibility(feasibilityValue);
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
            title:'feasibility'
        });
        this.map.addLayer(this.vectorLayer);
        
        // Create a LayerSwitcher instance and add it to the map
        this.layerSwitcher = new LayerSwitcher({
          tipLabel: 'Legend', // Optional label for button
        });
        this.map.addControl(this.layerSwitcher);

        
      },
      updateDeveloperLayer(){
        console.log("updateDeveloperLayer")
        // 默认的地块数据源
        this.vectorSource = new VectorSource({
              // features: new GeoJSON().readFeatures(this.geojsonData)
              format: new GeoJSON(),
              url:'div_parcels.geojson'  
          });

          const getColorFromDeveloper = (BedeveloperedValue) => {
              const alpha = 0.8;
              if (BedeveloperedValue !== undefined && BedeveloperedValue.toString() === "1") {
                // console.log(this.developerDataMerge['developer_form'])
                if (this.developerDataMerge['developer_form'] === "residential"){
                  return `rgba(253, 255, 0, ${alpha})`
                }else if (this.developerDataMerge['developer_form'] === "office"){
                  return `rgba(96, 129, 200, ${alpha})`
                }else if (this.developerDataMerge['developer_form'] === "retail"){
                  return `rgba(174, 181, 222, ${alpha})`
                }else if (this.developerDataMerge['developer_form']=="industrial"){
                  return `rgba(134, 79, 46, ${alpha})`
                }
              }

              return `rgba(27, 27, 27, ${alpha})`; // green
          };

          this.vectorLayer = new VectorLayer({
              source: this.vectorSource,
              style: (feature) => {
                // console.log("developer_form:",this.developerDataMerge['developer_form'])
                  const parcelId = feature.get('parcel_id').toString();
                  const BedeveloperedValue = this.developerDataMerge['developerData'][parcelId];
                  const color = getColorFromDeveloper(BedeveloperedValue);
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
              title:this.developerDataMerge['developer_form']
          });
          this.map.addLayer(this.vectorLayer);
          
          // Create a LayerSwitcher instance and add it to the map
          this.layerSwitcher = new LayerSwitcher({
            tipLabel: 'Legend', // Optional label for button
          });
          this.map.addControl(this.layerSwitcher);

        
      },
      
      getFeatureProperties(feature) {
        // 获取要素属性并格式化为 HTML
        const properties = feature.getProperties();
        let content = '<h3>Properties:</h3><ul>';
        for (const key in properties) {
          content += `<li>${key}: ${properties[key]}</li>`;
        }
        content += '</ul>';
        return content;
      }
      
    },
    watch: {
      geojsonData: {
        handler: 'updateGeojsonLayer',   //updateGeojsonLayer 写在methods中
        deep: true
      },
      feasibilityData: {
        handler: 'updateFeasibilityLayer',
        deep: true
      },
      developerDataMerge:{
        handler: 'updateDeveloperLayer',
        deep: false,
      },
    }


  }
</script>

<style scoped>
.map-container {
  height: 700px;
  width: 100%;
}
.ol-popup-content {
  background: rgba(72, 72, 72,0.9); /* 设置背景颜色和透明度 */
}
</style>