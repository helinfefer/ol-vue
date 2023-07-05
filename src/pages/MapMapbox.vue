<template>
    <main>
        <p>Center :{{center}}</p>
        <p>Zoom : {{ zoom }}</p>
        <div id="map" class="map-container" ref="mapContainer">
        </div>
    </main>
  </template>
  
<script>
import mapboxGl from "mapbox-gl";

export default {
    name:"MapMapbox",
    data(){
        return {
            center:[-93.1247, 44.9323],
            zoom:10.5
        }
    },
    mounted() {
    mapboxGl.accessToken = "pk.eyJ1Ijoic2hleXVleXUiLCJhIjoiY2wxcTh1dTRoMGE5ZzNtbzNxMW44dWVmNyJ9.XTW1j_KCti0TbZFYIyp-uA";
    this.createMap();
    console.log(this.map)
},
    methods: {
        createMap() {
            this.map = new mapboxGl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v9",
                minzoom: 5,
                center: this.center,
                zoom: this.zoom,
                hash: true
            });
            this.map.on("load", () => {
                // Wait for map to load before modifying styles
                const canvas = this.$refs.mapContainer.querySelector('.mapboxgl-canvas');
                canvas.style.position = 'relative';
            });
            this.map.on("move", () => {
                this.center = this.map.getCenter();
            });
            this.map.on("zoom", () => {
                this.zoom = this.map.getZoom();
            });
        }
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
