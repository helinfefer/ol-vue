<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" bg-variant="light" text-variant="dark" :visible="true">
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </div>
      <b-list-group>
        <b-list-group-item>Cras justo odio</b-list-group-item>
        <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
        <b-list-group-item>Vestibulum at eros</b-list-group-item>
      </b-list-group>
    </b-sidebar>
  </div>
</template>

<!-- <template> -->
  <!-- <div> -->
    <!-- <h2>数据目录</h2> -->
    <!-- <b-form-group
      label="选择目录"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox
        v-for="(item, index) in catalog"
        :key="index"
        :value="item"
        :aria-describedby="ariaDescribedby"
        name="catalog"
        v-model="selectedCatalogs"
        @change="fetchData(item)"
      >
        {{ item }}
      </b-form-checkbox>
    </b-form-group>
   -->
  <!-- </div> -->
  <!-- <div>
    <b-sidebar id="sidebar" title="侧边导航栏" bg-variant="light" text-variant="dark">
      <div class="px-3 py-2">
        <p>欢迎来到我们的网站!</p>
        <b-nav vertical class="mb-3">
          <b-nav-item href="#base-data">基础数据</b-nav-item>
          <b-nav-item href="#geographical-data-display">地理数据展示</b-nav-item>
          <b-nav-item href="#project-introduction">项目介绍</b-nav-item>
          <b-nav-item href="#land-use-model">土地利用模型</b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
  
</template> -->

<script>
  export default {
    name: 'SidebarComponent',
  }
</script>


  <!-- <script>
  import axios from 'axios'; // axios处理请求
  export default {
    data() {
      return {
        catalog: ['stop_bus', 'parcels', 'households', 'jobs'],
        selectedCatalogs: []
      };
    },
    methods: {
    async fetchData(item) {
      console.log(`fetchData called with item: ${item}`);
      console.log(`selectedCatalogs: ${this.selectedCatalogs}`);
      
      const isIncluded = this.selectedCatalogs.includes(item);
      console.log(`Is item in selectedCatalogs: ${isIncluded}`);
      
      if (isIncluded) {
        console.log(`Sending request to: http://127.0.0.1:5000/api/data/${item}`);
        
        try {
          const response = await axios.get(`http://127.0.0.1:5000/api/data/${item}`);
          console.log(response.data);
          this.$router.push('/${item}', response);
        } catch (error) {
          console.error(`Error fetching data: ${error}`);
        }
      }
      
      console.log(`fetchData ended with item: ${item}`);
    },
  },
  };
  </script> -->
