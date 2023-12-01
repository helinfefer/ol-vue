<template>
  <div id="app" class="app">
    <!-- <TopBar /> -->
    <!-- <ParentOfMapSlideBar/> -->
    <!-- <SidebarComponent/> -->
    <!-- 指定组件的呈现位置 -->



    <!-- sidebar -->
    <SideBar/>

    <br>
    <router-view ></router-view>
  </div>
</template>

<script>
// import ParentOfMapSlideBar from './components/ParentOfMapSlideBar.vue';
// import TopBar from './components/TopBar.vue';
// import SidebarComponent from './components/SidebarComponent.vue';
import SideBar from './components/SideBar.vue';


export default {
  name: 'App',
  components: {
    // TopBar,
    // SidebarComponent,
    SideBar,
    // ParentOfMapSlideBar,
  },
}
</script>


<style lang="scss">
:root {
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;
		min-width: 500px; 

		@media (max-width: 768px) {
			padding-left: 6rem;
		}
	}
}
</style>