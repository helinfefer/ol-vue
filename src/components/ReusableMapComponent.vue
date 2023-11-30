<!--要创建一个可复用的地图组件，应该专注于将地图的初始化和核心功能封装在内，同时提供接口（如props和events）来允许外部传入定制化的数据和配置。以下是一个简化的、可复用的地图组件示例，您可以根据具体的地图库和项目需求进一步调整：  -->
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
    import LayerSwitcher from 'ol-layerswitcher';

    export default {
      name:'ReusableMapComponent',
      data() {
        return {
          map: null, // 用于存储地图实例，
        };
      },
      props: {
        // 定义您希望从外部传入的配置项，例如：
        initialCenter: {
          type: Array,
          default:()=> [114.1692, 30.494],
        },
        initialZoom: {
          type: Number,
          default: 10
        },
        layerGroup: {
          type: Object,
          default: null
        },
        layerGroupName:{
          type:Array,
          default:()=>[]
        },
      },

      methods: {
        updateLayerGroup(){
          console.log("updateLayerGroup");
        },
        initializeMap() {
          // 创建地图视图实例
          const view = new View({
            center: this.initialCenter,
            zoom: this.initialZoom,
            projection: 'EPSG:4326', // 设置视图的投影坐标系
          });
          console.log(view);
          // 设置基础的底图
          const baseLayer = new TileLayer({
            source: new OSM(),
            title:'OSM',
          });

          console.log("baseLayer", this.layerGroup.get('layers')[0]);

          // 创建地图实例
          console.log('创建图例baseLayer',this.layerGroup);
          this.map = new Map({
            target: this.$refs['map-root'],
            layers: [baseLayer,this.layerGroup],
            view: view, // 设置地图的视图,
          });
          
          console.log("添加图层*************")
          // 在地图初始化之后添加 LayerSwitcher 控件
          this.layerSwitcher = new LayerSwitcher({
            reverse: true,
            groupSelectStyle: 'group'
          });
          this.map.addControl(this.layerSwitcher);
        },

      },
      mounted() {
        this.initializeMap();
        // this.updateLayerGroup();
      },
      // watch:{
      //   layerGroup:{
      //     handler: 'updateLayerGroup',   
      //     deep: true
      //   }
      // }
    }
</script>

<style scoped>
.map-container {
  height: 600px;
  width: 100%;
}
</style>

