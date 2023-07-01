import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import DataComponent from './components/DataComponent.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: []
})

// Get the data from the backend
axios.get('http://127.0.0.1:5000/api/data')
  .then(response => {
    // The data from the backend should be an array of strings
    const dataNames = response.data

    // For each data name, add a route
    for (const name of dataNames) {
      router.addRoutes([{
        path: '/' + name,
        component: DataComponent,
        props: { dataName: name }
      }])
    }
  })

export default router