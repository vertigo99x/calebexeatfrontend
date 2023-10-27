<template>
    <aside :class="{'show':$root.showSidebar}">
        <div class="top">
            <div class="logo">
                <img src="../assets/school-logo.png" alt="">
                <p id="cat" style="padding:1rem;font-size:1rem;text-transform:capitalize;">Hey, <span class="primary">{{ userData.usercat }}</span></p>
            </div>
            <div class="close" id="close-btn">
                <span class="svg-icon" @click="$root.showSidebar = false"><svg style="fill:var(--danger);" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></span>
            </div>
        </div>

        <div class="sidebar">
            <router-link to="/" href="#"  :class="{'active':$store.state.currentPage == 'dashboard'}" @click="$root.showprofile = false">
                <span class="svg-icon"><svg style="fill:var(--primary);" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg></span>
                <h3>Dashboard</h3>
                
            </router-link>

            <router-link to="/users" href="#"  :class="{'active':$store.state.currentPage == 'users'}" v-if="userData.usercat == 'superuser'">
                <span class="material-symbols-rounded">person_add</span>
                <h3>Manage Students</h3>
            </router-link>
            
            <router-link to="/tickets" href="#"  :class="{'active':$store.state.currentPage == 'request-tasks'}" v-if="userData.usercat == 'superuser'">
                <span class="material-symbols-rounded">local_activity</span>
                <h3>Tickets</h3>
            </router-link>

            <router-link to="/request-tasks" href="#"  :class="{'active':$store.state.currentPage == 'request-tasks'}" v-if="userData.usercat == 'superuser'">
                <span class="material-symbols-rounded">settings</span>
                <h3>Settings</h3>
            </router-link>
            
           
            

            <a href="#" @click="$root.logout()">
                <span class="svg-icon"><svg style="fill:var(--danger);" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg></span>
                <h3>Logout</h3>
            </a>
           
        </div>
        
    </aside>
    <div class="overlay" v-if="$root.showSidebar" @click="showSidebar=false"></div>
		

</template>


<script>


export default {
    name:'Sidebar',
    components: {
        
    },
    data(){
        return {

        }
    },
    props: {
      userData: {
            type: Object,
            required: true,
        }
    },
    mounted(){
        
    },
    methods:{

    }
}


</script>


<style lang="scss">
    .svg-icon{
        display:flex;
        align-items: center;
    }
    router-link h3{
        font-size:1rem;
    }
</style>