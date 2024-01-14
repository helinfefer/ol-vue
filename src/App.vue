<template>
<el-container>
	<el-aside width="200px"><SideBar/></el-aside>
	<el-container>
		<el-header style="text-align: right;">
			<el-button @click="goBack">Base Data Viewer</el-button>
			<el-button @click="goToInputPage">上传数据</el-button>
			<el-button @click="goToCollectionPage">Base Data Collections</el-button>
			<el-button @click="goToInputPage">开发项目</el-button>
			<el-button @click="goToRunPage">运行RUN</el-button>
			<el-button @click="goToSetScenario">SetScenario</el-button>
		</el-header>
		<el-main><router-view ></router-view></el-main>
		<el-footer>Footer</el-footer>
	</el-container>
</el-container>

</template>

<script>
import SideBar from './components/SideBar.vue';
export default {
  name: 'App',
  components: {
    SideBar,
  },
  methods: {
		goToInputPage() {
			if (this.$route.path !== '/ums/upload') {
			this.$router.push('/ums/upload');
			}
		},
		goBack() {
			if (this.$route.path !== '/') {
			this.$router.push('/');
			}
		},
		goToCollectionPage() {
			if (this.$route.path !== '/ums/collections') {
			this.$router.push('/ums/collections');
			}
		},
		goToRunPage() {
			if (this.$route.path !== '/ums/createrun') {
			this.$router.push('/ums/createrun');
			}
		},
		goToSetScenario() {
			if (this.$route.path !== '/ums/setscenario') {
			this.$router.push('/ums/setscenario');
			}
		},



	}
}
</script>


<style lang="scss">
.el-header, .el-footer {
    background-color: #e9ebed;
    color: #333;
    text-align: center;
    line-height: 60px;
	
  }


body > .el-container {
margin-bottom: 40px;

}

.el-main {
	padding: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 400px;
}


.el-container:nth-child(7) .el-aside {
    line-height: 400px;
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

</style>