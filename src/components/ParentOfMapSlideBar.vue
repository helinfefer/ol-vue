<template>
    <div id="app">
      <div class="map-container">
        <MapComponent />
      </div>
      <div class="sidebar">
        <SidebarComponent />
      </div>
    </div>
  </template>
  
  <script>
  import MapComponent from './MapComponent.vue';
  import SidebarComponent from './SidebarComponent.vue';
  
  export default {
    components: {
      MapComponent,
      SidebarComponent
    }
  }
  </script>
  