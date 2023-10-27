<template>
    
	<div class="wrapper">
        <form class="form" @submit.prevent="login" style="box-shadow: var(--box-shadow);" id="Loginform" v-on:keyup.enter="login">
            <div class="logo">
                <img src="../assets/school-logo.png" alt="">
                <span class="danger"></span>
            </div>
            <div class="field">
                <input type="text" v-model="username" placeholder="Username" maxlength="50" required>
                <!--<label for="">Username</label>-->
                <span class="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z"/></svg></span>
                
            </div>
            <div class="field">
                <input type="password" id="password-input" placeholder="password" v-model="password" maxlength="50" name="password" required>
                <span class="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z"/></svg></span>
                <!--<label for="password">Password</label>-->
                <i v-if="!isVisible" class="svg-icon" @click="changeVisibility"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg></i>
                <i v-else class="svg-icon" @click="changeVisibility"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg></i>
                <div class="forgot">
                    <a href="#">Forgot Password?</a>
                </div>
            </div>
            <div class="field">
               
            </div>
            <div class="item login-btn" @click="login">

                <span>Sign in</span>
                
            </div>
          
        </form>
    </div>
    
</template>

<script>
import axios from 'axios';



import { toast } from 'bulma-toast';

export default {
    data(){
        return {
            username:'',
            password:'',
            errors:'',
            isVisible:false,
        }
    },
    mounted(){
        
        
        
    },
    methods:{
        changeVisibility(){
            var eye = document.querySelector('#password-input');
            if(eye.type =='text'){
                eye.type='password'
                this.isVisible=false
            } else {
                eye.type = 'text'
                this.isVisible = true
            }
        },
        async limiter() {
            await axios
                .get('api/v1/limiter_check?' + '&matric=' + this.username)  
                .then(response => {

                })
                .catch(error => {
                    console.log('limiter error')
                })
        },
        async login(){
            this.$root.showLoader = true;
            const data = {
                username:this.username.replace('/', '-'),
                password:this.password
            }
            this.limiter();
            if(this.username && this.password){
                await axios
                    .post('api/v1/token/login', data)
                    .then(response => {
                        const token = response.data.auth_token
                        this.$store.commit('setToken', token)
                        axios.defaults.headers.common["Authorization"] = "Token " + token
                        localStorage.setItem("token", token)

                        this.$router.push(this.$route.query.to || '/')
                    })
                    .catch(error => {
                        this.$root.showLoader = false;
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors = []
                                this.errors.push(`${error.response.data[property]}`)
                                this.$store.commit('logoutDefault')
                                toast({
                                    message: `${error.response.data[property][0]}`,
                                    type: 'is-danger',
                                    dismissible: true,
                                    pauseOnHover: 'true',
                                    duration: 3000,
                                    position:'top-center',
                                })
                            }
                        }
                    })
            } else {
                toast({
                        message: `Complete All Fields`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 3000,
                        position:'top-center',
                });
                this.$root.showLoader = false;
            }
        }
        
    }
    
}
</script>


<style lang="scss" scoped>


    *{
        margin:0;
        padding:0;
    }

    body {
        width:100vw;
        height:100vh;
    }
    .svg-icon svg{
        width:24px;
        height:24px;
        fill:var(--info-dark);
        
    }
    .wrapper {
        width:100vw;
        height:100vh;
        padding:2rem;
        display: grid;
        place-items: center;
    }

    .wrapper .form {
        background: var(--white);
        padding:2rem;
        border-radius: var(--card-border-radius);
    }

    .wrapper .form .logo{
        display: flex;
        flex-direction: column;
        width:100%;
        justify-content:center;
        align-items: center;
        margin: 0;

    }

    .wrapper .form .logo img {
        width:5rem;
        height:5rem;
    }

    .wrapper .form .logo span{
        margin:1rem 0 .5rem 0;
    }
    .wrapper .form .field {
        width:100%;
        justify-content: center;
        margin:2rem 0;
        position: relative;
       
    }

    .wrapper .form .field span {
        position: absolute;
        top:.2rem;
        left:0;
    }
    .wrapper .form .field i {
        position: absolute;
        top:.2rem;
        left:90%;
    }
    .wrapper .form .field label {
        position: absolute;
        top:.5rem;
        left:2rem;
        font-size:1rem;
        background: transparent;
        
    }

    .wrapper .form .field .forgot {
        margin-top:.5rem;
        width:100%;
        text-align: right;
    }

    .wrapper .form .field .forgot a{
        color:var(--info-dark);

        transition: all .3s ease;
    }
    .wrapper .form .field .forgot a:hover {
        color:var(--primary)
    }

    .wrapper .form .field input{
        -webkit-appearance: none;
        padding:.6rem 4rem 0.6rem .6rem;
        padding-left: 2rem;
        width:100%;
        border-radius: none;
        font-size:1.2rem;
        border:none;
        border-bottom:2px solid var(--info-dark);
        background: transparent;
        color:var(--dark);
        z-index:999 !important;
        transition: all .3s ease;
    }

    .wrapper .form .field input:focus{
        border-color: var(--primary);
    }
    .wrapper .form .field input:focus ~ label,
    .wrapper .form .field input:valid ~ label
    {
        top:-1.5rem;
    }
    .wrapper .form .login-btn{
        padding:0.6rem 0;
        
    }
    .wrapper .form .login-btn:focus{
        padding:0.6rem 0;
        
    }
    
</style>