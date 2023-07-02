<template>
  <div id="app">
    <TopBar />
    <hr>
    <!-- <ParentOfMapSlideBar/> -->
    <SidebarComponent/>
    <!-- 指定组件的呈现位置 -->
  </div>
</template>

<script>
// import ParentOfMapSlideBar from './components/ParentOfMapSlideBar.vue';
import TopBar from './components/TopBar.vue';
import SidebarComponent from './components/SidebarComponent.vue';
export default {
  name: 'App',
  components: {
    TopBar,
    SidebarComponent
    // ParentOfMapSlideBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
