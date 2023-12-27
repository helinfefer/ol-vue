<!-- 约束限制界面 -->
<template>
    <div>

		<ReusableMapComponent
		:initialCenter="mapCenter"
		:initialZoom="mapZoom"
		></ReusableMapComponent>

        <!-- 数据组件 -->
        <ReusableTableComponent
        :dataFromParent="ZoningData">
        </ReusableTableComponent>

    </div>
</template>
<script>
import ReusableMapComponent from '../components/ReusableMapComponent.vue'
import ReusableTableComponent from '../components/ReusableTableComponent.vue'
export default {
    // 组件名称
    name:"ConstrainsPage",
    components:{
        ReusableMapComponent,
		ReusableTableComponent,
    },
    data(){
        return{
            householdsTable: [
                    {
                    "building_id": 4648,
                    "income": 4000,
                    "income_quartile": 1,
                    "income_segment": 1,
                    "parcel_id": 44.0,
                    "persons": 2,
                    "zone_id": 249.0
                    },
                    {
                    "building_id": 762,
                    "income": 4000,
                    "income_quartile": 1,
                    "income_segment": 1,
                    "parcel_id": 153.0,
                    "persons": 2,
                    "zone_id": 41.0
                    },
                    {
                    "building_id": 1089,
                    "income": 6000,
                    "income_quartile": 1,
                    "income_segment": 1,
                    "parcel_id": 144.0,
                    "persons": 2,
                    "zone_id": 32.0
                    // 在这里继续添加你的数据
                    }
            ],
        }    
    },
    methods:{
        
    },
    created(){
        // 修改展示的zoning 数据 (其实还需要在一个界面去指定，哪一个是zoning表)
        // 将数据传给$store.state.selectedFileUid,跳过dispatch,直接commit调用mutation函数
        // this.$store.commit('CHANGE_SELETED_FILE_UID',)
    },
}
</script>

<style >

</style>