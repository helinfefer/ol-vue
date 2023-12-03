<!--  -->
<template >
    <div>
        <p>就业控制总量</p>
        <ul>
            <li v-for="file in $store.state.uploadJobControlFileList" :key="file.uid">
            {{ file.name }}
            </li>
        </ul>
        <p>家庭控制总量</p>
        <li v-for="file in $store.state.uploadHouseholdsControlFileList" :key="file.uid">
            {{ file.name }}
        </li>
    </div>
</template>

<script>
export default {
    name:"DataListComponent"
}
</script>

<style >

</style>