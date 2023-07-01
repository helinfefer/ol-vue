// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router';
import DataComponent from '../components/DataComponent.vue'
// 创建一个路由器,并暴露一个路由器
export default new VueRouter({
    routes :[
        {
            path : '/api/data',
            component : DataComponent
        },

    ]
})

