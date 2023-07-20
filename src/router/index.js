import VueRouter from 'vue-router';
import DataComponent from '../pages/DataComponent.vue'
import MapComponent from '../pages/MapComponent.vue'
import MapMapbox from '../pages/MapMapbox.vue'
import RunUms from '../pages/RunUms.vue'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import TableComponent from '../pages/TableComponent.vue'
import TransitionModel from '../pages/TransitionModel.vue'
import RelocationModel from '../pages/RelocationModel.vue'
import SetArgument from '../pages/SetArgument.vue'
import InputArgument from '../pages/InputArgument.vue'

export default new VueRouter({
    routes: [
        {
            path : '/data',
            component : DataComponent,
        },
        {
            path : '/openlayers',
            component: MapComponent
        },
        {
            path: '/mapbox',
            component: MapMapbox
        },
        {
            path:'/ums',
            component: RunUms,
            children:[
                {
                    path:'tansitionmodel',
                    component:TransitionModel
                },
                {
                    path:'relocation',
                    component:RelocationModel
                },
                {
                    path:'SetArgument',
                    component:SetArgument,
                    children:[
                        {
                            path:'userinput',
                            component:InputArgument
                        }
                    ]
                }
            ]
        },
        {
            path:'/',
            component: HomePage
        },
        {
            path: '/about',
            component:AboutPage
        },
        {
            path:'/table',
            TableComponent
        }
    ]
})
