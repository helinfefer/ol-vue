<template>
  <div id="main-map">
    <b-button v-b-toggle.sidebar-1 class="sidebar-button" >工具栏</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" bg-variant="light" text-variant="dark" no-close-on-route-change width="200px" class="sidebar">
      <b-list-group>
        <b-list-group-item active-class="active" to="/data">数据视图</b-list-group-item>
        <b-list-group-item active-class="active" to="/map">地图</b-list-group-item>
        <b-list-group-item active-class="active" to="/mmap"><Map>Mapbox</Map></b-list-group-item>
        <b-list-group-item active-class="active" to="/ums"><Map>土地利用模型</Map></b-list-group-item>
      </b-list-group>
    </b-sidebar>

    <!-- <router-view class="map"></router-view> -->
  </div>
</template>

<script>
  export default {
    name: 'SidebarComponent',
  }
</script>

