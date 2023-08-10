<template>
  <div class="image-grid">
    <el-image
      v-for="image in images"
      :key="image"
      :src="image"
      class="image-item"
    ></el-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/two_layer/D0.png',
        '/two_layer/score_land0.png',
        '/two_layer/score_traffic0.png',
        '/two_layer/traffic_index_stand2.png',
        // 其他图片链接
      ],
    };
  },
};
</script>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px; /* 你可以根据需要调整间距 */
}

.image-item {
  width: 100%;
  height: auto;
}
</style>
