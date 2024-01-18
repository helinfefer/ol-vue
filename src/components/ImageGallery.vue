<template>
    <div>
        <br>
        <el-button type="primary" icon="el-icon-refresh" @click="refreshImages">刷新图片</el-button>

        <div class="image-gallery">
            <div v-for="(url, index) in imageUrls" :key="index" class="image-container">
                <el-image :src="url" fit="cover" :key="url"></el-image>
                
                <!-- 下载按钮 -->
                <el-button type="text" icon="el-icon-download" @click="downloadImage(url)">下载</el-button>
            </div>
            <!-- <iframe
                src="http://localhost:5000/runs/map_runs.html"
                width=80%
                height="500"
                loading="lazy"
                style="border:none;">
            </iframe> -->
        </div>

    </div>
  </template>
  
  <script>
//   import { mapState } from 'vuex';
//   import {L} from 'leaflet';
  export default {
    name: 'ImageGallery',
    data(){
        return {
            // runMapData:``,
            htmlData: `<!DOCTYPE html>
                <html>
                <head>
                    <title>Sample HTML Data</title>
                </head>
                <body>
                    <h2>Hello, this is HTML data from Vue!</h2>
                    <p>This is a simple example.</p>
                </body>
                </html>`,
        }
    },
    computed: {
      imageUrls() {
        return this.$store.state.imageUrls;
      },
    //   ...mapState(['runMapData']), // 将mapData状态映射到组件的计算属性中
    },
    methods: {
        async refreshImages() {
            await this.$store.dispatch('fetchImageUrls');
            // await this.$store.dispatch('fetchMapData');
            },
        // refreshImages() {
        // this.$store.dispatch('fetchImageUrls');
        // this.$store.dispatch('fetchMapData');
        // this.htmlData = `${this.runMapData}`;
        // console.log("🚀 ~ refreshImages ~ this.runMapData:", this.htmlData)
        // },
        async downloadImage(url) {
            try {
                const response = await fetch(url, {
                headers: {
                    'Content-Type': 'image/jpeg', // 根据实际图片类型调整
                },
                mode: 'cors', // 如果图片支持跨域请求
                });

                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = url.split('/').pop(); // 提取文件名
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(downloadUrl); // 清理资源
            } catch (error) {
                console.error('下载图片时出错:', error);
            }
        },
    },
    created() {
      this.refreshImages();
    },
  };
  </script>
  
<style>
.image-gallery {
display: flex;
flex-wrap: wrap;
justify-content: center;
}
.folium-map {
    height: 500px; /* 或其他具体的高度 */
    width: 100%; /* 可以是固定宽度或百分比 */
  }

</style>
  