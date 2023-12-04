import VueRouter from 'vue-router';
import DataComponent from '../pages/DataComponent.vue'
import MapComponent from '../pages/MapComponent.vue'
import MapMapbox from '../pages/MapMapbox.vue'
import RunUms from '../pages/RunUms.vue'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import LcmComponent from '../pages/LcmComponent.vue'
import TableComponent from '../pages/TableComponent.vue'
import TransitionModel from '../pages/TransitionModel.vue'
import RelocationModel from '../pages/RelocationModel.vue'
import SetArgument from '../pages/SetArgument.vue'
import InputArgument from '../pages/InputArgument.vue'
import DeveloperComponent from '../pages/DeveloperComponent.vue'
import MapOl from '../pages/MapOl.vue'
import MapOlLcm from '../pages/MapOlLcm.vue'
import MapOlFeasibility from '../pages/MapOlFeasibility.vue'
import TwoLayerIndex from '../pages/TwoLayerIndex.vue'
import SetScenario from '../pages/SetScenario.vue'
import UploadData from '../pages/UploadData.vue'

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
            path:'/ol',
            component: MapOl
        },
        {
            path:'ollcm',
            component: MapOlLcm
        },
        {
            path:'feasibility',
            component: MapOlFeasibility
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
                },
                {
                    path:'setscenario',
                    component:SetScenario
                },
                {
                    path:'lcm',
                    component:LcmComponent
                },
                {
                    path:'developer',
                    component:DeveloperComponent
                },
                {
                    path:'upload',
                    component:UploadData
                },

            ]
        },
        {
            path:'/calcindex',
            component:TwoLayerIndex
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
            component:TableComponent
        }
    ]
})
