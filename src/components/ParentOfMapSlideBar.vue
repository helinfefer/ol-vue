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

<style scoped>
#content-map {
  display: flex;
}

.sidebar {
  flex: 0 0 250px;  /* 这里设定了一个固定的宽度，你可以根据需要进行修改 */
}

#content-map > :not(.sidebar) {
  flex: 1;
}
</style>
