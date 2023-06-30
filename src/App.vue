<template>
  <div id="app">
    <TopBar />
    <hr>
    <ToolsBar />
    <ParentOfMapSlideBar/>
  </div>
</template>

<script>
import ParentOfMapSlideBar from './components/ParentOfMapSlideBar.vue';
import TopBar from './components/TopBar.vue';
import ToolsBar from './components/ToolsBar.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    ToolsBar,
    ParentOfMapSlideBar,
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
