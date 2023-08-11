<template>
    <main>
        <p>Zoom : {{ zoom }}</p>
        <div id="map" class="map-container" ref="mapContainer">
        </div>
    </main>
  </template>
  
<script>
import mapboxGl from "mapbox-gl";

export default {
    name:"MapMapbox",
    // 设置一个props来接收数据
    props: {
        'geojsonData': {
            default: function() {
            return {
                "type": "FeatureCollection",
                "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                    "coordinates": [
                        114.17008383274657,
                        30.48990548004457
                    ],
                    "type": "Point"
                    }
                }
                ]
            };
        }
    }
    },
    data(){
        return {
            center:[114.17, 30.4899],
            zoom:10,
        }
    },
    mounted() {
    mapboxGl.accessToken = "pk.eyJ1Ijoic2hleXVleXUiLCJhIjoiY2wxcTh1dTRoMGE5ZzNtbzNxMW44dWVmNyJ9.XTW1j_KCti0TbZFYIyp-uA";
    this.$nextTick(() => {
        this.createMap();
    });
},
    methods: {
        createMap() {
            this.map = new mapboxGl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v9",
                minzoom: 5,
                center: this.center,
                zoom: this.zoom,
                hash: true,
            });
            this.map.on("load", () => {
                // Wait for map to load before modifying styles
                
                if (this.geojsonData && this.geojsonData.features.length > 0) {
                    console.log("this.geojsonData.features",this.geojsonData.features)
                    this.map.addSource('earthquakes', {
                        type: 'geojson',
                        data: this.geojsonData
                    });
                    this.map.addLayer({
                        'id': 'earthquakes-layer',
                        'type': 'fill',
                        'source': 'earthquakes',
                        'paint': {
                            'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'childrenNum'], // 获取名为'valueAttribute'的属性
                            0, '#0000ff', // 当值为0时，颜色为蓝色
                            100, '#ff0000' // 当值为100时，颜色为红色
                            ],
                            'fill-opacity': 0.5,
                            'fill-outline-color': '#000000' // 黑色边界
                        }
                        });
                        
                const canvas = this.$refs.mapContainer.querySelector('.mapboxgl-canvas');
                canvas.style.position = 'relative';
                }

            });

            this.map.on("zoom", () => {
                this.zoom = this.map.getZoom();
            });
            this.map.on('load', () => {
                this.map.resize();
            });

        },

    },
    beforeDestroy() {
    if (this.map) {
        this.map.remove();
    }




}

}


</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
}
</style>
