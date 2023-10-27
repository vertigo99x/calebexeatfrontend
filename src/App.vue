<template>
	<div class="container">
		
        <Sidebar :userData="userData"  v-if="isAuthenticated()"></Sidebar>
        <!--            main               -->
		<router-view></router-view>
		
		 <div class="right" v-if="userData && isAuthenticated()">

	            <Topnav :userData="userData" v-if="isAuthenticated()"></Topnav>

	            <Events v-if="userData" :recentEvents="recentEvents" :userData="userData"></Events>

	            <ProfileView :studentData="studentData" v-if="!is_mobile() && userData.usercat==='student'"></ProfileView>
	    </div>

		<div class="modal" :class="{'showform':showLoader}" id="loading" v-if="showLoader">
			<div class="loader"></div>
		</div>

		
		
    </div>


</template>

<script>
import axios from 'axios'

import { toast }  from 'bulma-toast'

import Sidebar from '@/components/Sidebar.vue'
import ProfileView from './components/ProfileView.vue'
import Topnav from './components/Topnav.vue'
import Events from './components/Events.vue'

export default {
    name: 'Dashboard',

    components: {
		Sidebar,
		ProfileView,
		Topnav,
		Events,
    },
    
    data(){
        return {
			showLoader:false,
			showSidebar:false,
			showprofile: false,
			userData:{},
			studentData: {},
			recentEvents:[],
			appMode: this.$store.state.appMode || 'light',
			showPasswordChangeModal: false,
			continue_load: false,
		}
    },
    mounted(){
		if(this.$store.state.appMode=='dark'){
            document.body.classList.add('dark-theme-variables')
        } else {
			document.body.classList.remove('dark-theme-variables')
		}
    },
	beforeCreate(){
		this.$store.commit('initializeStore')
		const token = this.$store.state.token
   
		if (token) {
			axios.defaults.headers.common['Authorization'] = "Token " + token
		} else {
			axios.defaults.headers.common['Authorization'] = ""
		}

		
	},
	methods: {	
		is_mobile() {
			if (document.documentElement.clientWidth < 700) {
				return true
			}
			return false
		},
		isAuthenticated() {
			return this.$store.state.isAuthenticated && this.$store.state.token;	
		},	
		
		changeMode(){
            const themeToggler = document.querySelector('.theme-toggler');
            document.body.classList.toggle('dark-theme-variables');
            themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
            themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
            
            if(this.$store.state.appMode=='light'){
                this.$store.commit('setMode','dark')
            } else {
                this.$store.commit('setMode','light')
            }
           
        },
		async logout(message){
			this.continue_load = false;
			const token = this.$store.state.token
			
			//localStorage.setItem("auth", false) 
			
			await axios
				.post('api/v1/person/logout/', {token:token}, {
					headers: {
						Authorization: axios.defaults.headers.common["Authorization"] || "Token " + this.$store.state.token
					}
				})
				.then(response => {
					axios.defaults.headers.common["authorization"] = ""
					localStorage.removeItem("token")
					this.$store.commit('logoutDefault')
					toast({
						message: `${message}`,
						type: 'is-success',
						dismissible: true,
						pauseOnHover: 'true',
						duration: 3000,
						position:'top-right',
					})
					
					this.$router.push('/login')
				})
			},

    },
    beforeUnmount() {
        //clearInterval(this.timer2)
    },
	unmounted(){
		this.$store.commit('logoutDefault')
	},
	
}
</script>



<style lang="scss">

@import './style.css';

</style>