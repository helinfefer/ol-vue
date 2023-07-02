
<template>
  <!-- <div>
    <h1>{{ dataName }}</h1>
    <ul v-if="data && data.length">
      <li v-for="(item, index) in data" :key="index">
        {{ item }}
      </li>
    </ul>
    <p v-else>No data available.</p>
  </div> -->
  <div>
    <b-list-group horizontal>
      <b-list-group-item active-class="active" to="/data/buildings">buildings</b-list-group-item>
      <b-list-group-item active-class="active" to="/data/parcels">parcels</b-list-group-item>
    </b-list-group>
    
    <router-view></router-view>
  </div>

</template>

<script>
// import axios from 'axios'

export default {
    name:'DataComponent',
  //   props: ['dataName'],
  //   data() {
  //       return {
  //       data: null
  //       }
  // },
  // created() {
  //   // When the component is created, get the data
  //   axios.get(`http://127.0.0.1:5000/api/data/${this.dataName}`)
  //     .then(response => {
  //       this.data = response.data
  //     })
  // }
  

}
</script>
