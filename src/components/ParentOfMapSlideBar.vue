<template>
  <div id="content-map">
    <SidebarComponent class="sidebar" />
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from './MapComponent.vue';
import SidebarComponent from './SidebarComponent.vue';

export default {
  components: {
    SidebarComponent,
    MapComponent
  }
}
</script>

