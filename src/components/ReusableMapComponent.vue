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

    export default {
      name:'ReusableMapComponent',
      data() {
        return {
          map: null // 用于存储地图实例
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
        // 可以添加更多配置项...
      },
      mounted() {
        this.initializeMap();
      },
      methods: {
        initializeMap() {
          // 创建地图视图实例
          const view = new View({
            center: this.initialCenter,
            zoom: this.initialZoom,
            projection: 'EPSG:4326', // 设置视图的投影坐标系
          });
          console.log(view);
          // 创建地图实例
          this.map = new Map({
            target: this.$refs['map-root'],
            layers: [
              // 添加一个基础图层，例如OpenStreetMap
            new TileLayer({
                source: new OSM()
              }),
            ],
            view: view // 设置地图的视图
          });
        }
      }
    }
</script>

<style scoped>
.map-container {
  height: 600px;
  width: 100%;
}
</style>

