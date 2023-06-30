<template>
    <div>
      <h2>数据目录</h2>
      <b-form-group
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
        >
          {{ item }}
        </b-form-checkbox>
      </b-form-group>
    
    </div>
    
  </template>
  <script>
  export default {
    data() {
      return {
        catalog: ['bus_stop', 'parcels', 'households', 'jobs'],
        selectedCatalogs: []
      };
    }
  };
  </script>