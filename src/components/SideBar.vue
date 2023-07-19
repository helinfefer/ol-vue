<!-- sidebar -->
<template >
    <aside>
        <div class="logo">
            <img src="../assets/logo.png" alt="Vue">
        </div>
        <div class="menu-toggle-wrap">
            <button class="material-icons" @click="ToggleMenu">
                <span class="material-icons">double_arrow</span>
            </button>
        </div>
    </aside>
</template>

<script >
export default {
    name:'SideBar',
    methods:{
        ToggleMenu(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
    display: flex;
    width: var(--sidebar-width);

    flex-direction: column;
    background-color: var(--dark);
    color: var(--light);
    min-height: 100vh;
    width: calc(2rem + 32px);
    overflow: hidden;

    padding: 1rem;
    transition: 0.2s ease-in-out;
    .logo {
        margin-bottom: 1rem;
        img {
            width:2rem;
        }
    }
	@media (max-width: 768px) {
		position: absolute;
		z-index: 99;
	}

}
</style>