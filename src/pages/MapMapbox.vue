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
        'geojsonData':{
            default: {
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
            }
        }
    },
    data(){
        return {
            // center:[114.1692, 30.494],
            center: [108, 4], // starting position
            zoom:2,
        }
    },
    mounted() {
    mapboxGl.accessToken = "pk.eyJ1Ijoic2hleXVleXUiLCJhIjoiY2wxcTh1dTRoMGE5ZzNtbzNxMW44dWVmNyJ9.XTW1j_KCti0TbZFYIyp-uA";
    this.createMap();
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


                this.map.addSource('earthquakes', {
                type: 'geojson',
                // Use a URL for the value for the `data` property.
                // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
                data:this.geojsonData
                });
                
                this.map.addLayer({
                'id': 'earthquakes-layer',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                'circle-radius': 4,
                'circle-stroke-width': 2,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
                }
                });
                const canvas = this.$refs.mapContainer.querySelector('.mapboxgl-canvas');
                canvas.style.position = 'relative';
            });

            this.map.on("zoom", () => {
                this.zoom = this.map.getZoom();
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
