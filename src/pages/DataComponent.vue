<template>
  <div>
    <b-nav tabs>
      <b-nav-item @click="fetchData('buildings')">Buildings</b-nav-item>
      <b-nav-item @click="fetchData('parcels')">Parcels</b-nav-item>
      <b-nav-item @click="fetchData('stop_bus')">stop_bus</b-nav-item>

    </b-nav>
    <div class="data-table-container" v-if="data && data.length">
      <table  class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th v-for="(key, index) in Object.keys(data[0])" :key="'header-' + index">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, rowIndex) in paginatedData" :key="'row-' + rowIndex">
            <td v-for="(value, colIndex) in Object.values(item)" :key="'row-' + rowIndex + '-col-' + colIndex">{{ value }}</td>
          </tr>
        </tbody>
      </table>

      <app-paginate
        v-model="currentPage"
        :page-count="pageCount"
        :page-range="3"
        :margin-pages="2"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination justify-content-center'"
      ></app-paginate>
      
      
    </div>
    <p v-else>No data available.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataComponent',
  data() {
    return {
      data: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
  },
  methods: {
    async fetchData(dataset) {
      try {
        console.log('getdata: ' + dataset)
        const response = await axios.get(`http://localhost:5000/get-data/${dataset}`);
        this.data = response.data
        console.log(this.data)
        console.log(typeof this.data)
        this.currentPage = 1; // Reset to first page when new data is fetched
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchData('stop_bus'); // Fetch default dataset on component mount
  },
};
</script>


<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
}

.pagination li {
  margin: 0 2px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
}

.pagination li.active {
  background-color: #333;
  color: #fff;
}
</style>