<template>
    <div class="image-gallery">
      <div v-for="(url, index) in imageUrls" :key="index" class="image-container">
        <img :src="url" alt="图片描述" class="gallery-image">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageGallery',
    computed: {
      imageUrls() {
        return this.$store.state.imageUrls;
      }
    },
    created() { //从后端动态获取
      this.$store.dispatch('fetchImageUrls');
    }
  };
  </script>
  
  <style>
  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); /* 自动调整列数和列宽 */
    gap: 15px; /* 设置网格间距 */
    padding: 10px; /* 为整个画廊添加一些内边距 */
  }
  
  .image-container {
    border: 1px solid #ddd; /* 添加边框 */
    border-radius: 5px; /* 圆角边框 */
    overflow: hidden; /* 使图片在容器中剪裁 */
  }
  
  .gallery-image {
    width: 100%; /* 让图片填充整个容器 */
    height: auto;
    display: block; /* 防止图片下方出现空隙 */
  }
  </style>
  