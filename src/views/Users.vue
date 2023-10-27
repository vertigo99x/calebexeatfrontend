<template>
<main>
    
    <div class="recent-orders">
        <div class="blockbox">
            <div style="width:100%" id="filterbox">
                <div style="display:flex;justify-content:space-between;">
                    <h2>Pending Requests</h2>
                    
                </div>
                <div class="field" style="margin-bottom:1rem" id="filter">
                    <h3>Filter By: </h3>

                        

                    <select name="" id="" style="text-transform: uppercase;">
                        <option value="" :selected="true" :disabled="true" >all hostels</option>
                        <option :value="hostel.hostel_name" v-for="hostel in hostels" :key="hostel">{{ hostel.hostel_name }}</option>
                
                    </select>
                    
                        <select name="" id="" v-model="tempFilter.level" style="text-transform: uppercase;">
                            <option value="all" selected>All Levels</option>
                            <option value="100">100 Level</option>
                            <option value="200">200 Level</option>
                            <option value="300">300 Level</option>
                            <option value="400">400 Level</option>
                        </select>
    
                        <select name="" id="" v-model="tempFilter.tempcollegeindex" style="text-transform: uppercase;">
                            <option :value="0" selected>All Colleges</option>
                            <option :value="index+1" v-for="(college, index) in colleges.slice(1,colleges.length)" :key="index" style="text-transform: uppercase;">{{ college.colleges }}</option>
                        </select>
    
                        <select name="" id="" v-model="tempFilter.dept"  style="text-transform:uppercase;">
                            <option value="all" selected>All Departments</option>
                            <option :value="dept" v-for="(dept, index) in colleges[tempFilter.tempcollegeindex]['allDepartments']" :key="index" v-if="tempFilter.tempcollegeindex" style="text-transform:capitalize">{{ dept }}</option>
                        </select>
                    
                    <div class="searchbutton" style="text-align:center" @click="isButtonClicked=true;filterLevel=tempFilter.level;filterDept=tempFilter.dept;collegeArrIndex = tempFilter.tempcollegeindex;$store.commit('setTempFilter', {level:tempFilter.level,dept:tempFilter.dept,collegeindex:tempFilter.tempcollegeindex});showPages(currentFormPage)">
                        <span>Search</span>
                    </div>
                </div>
            </div>

            
        </div>



        <p style="text-align:center;font-size:1rem;">Pending Requests For 
            <span style="text-transform: capitalize;font-size:1rem;">{{ filterLevel }} <span v-if="filterLevel=='all'">Levels </span><span v-else>Level </span></span> 
            <span v-if="collegeArrIndex" style="text-transform: uppercase;font-size:1rem;">{{ colleges[collegeArrIndex].colleges || 'all' }} <span v-if="collegeArrIndex==0">Colleges</span><span v-else>Colleges</span></span> in
            <span style="text-transform: capitalize;font-size:1rem;">{{ filterDept }} <span v-if="filterDept=='all'">Departments</span><span v-else>Department</span></span>
        </p>

        <div style="max-height:20rem;overflow-y:scroll;border-radius:var(--card-border-radius);box-shadow: var(--box-shadow);" >
            <table id="request-table">
                <div class="table-loader" :class="{'load':isTableLoading}">
                    <div class="loader"></div>
                </div>
                <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Level</th>
                        <th>Matric No</th>
                        <th>Hostel</th>
                        <th>Date Registered</th>
                        <th>College</th>
                        <th>Department</th>
                        <th>Level</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="UserList.length>=1" v-for="user in UserList" :key="user"  style="overflow-x:scroll;width:100%;" :id="`userpk${user.id}`">
                        <td>{{ `${user.lastname} ${user.firstname} ${user.middlename}`.split('').slice(0,17).join("") }}...</td>
                        <td>{{ user.level }}</td>
                        <td>{{ user.username }}</td>
                        <td> {{ user.hostel }} </td>
                        <td>
                            {{ months[parseInt(user.date_added.split('T')[0].split('-').reverse()[1])-1] }}
                            {{ user.date_added.split('T')[0].split('-').reverse()[0] }} 
                            {{ user.date_added.split('T')[0].split('-').reverse()[2] }}  at
                            {{ user.date_added.split('T')[1].replace('Z','').split(':').slice(0,2).join(':') }} 
                            <span 
                            v-if="parseInt(form.date_added.split('T')[1].split(':')[0]) < 12">AM
                            </span>
                            <span 
                            v-else>PM
                            </span>
                        </td>

                        <td>{{ user.college }}</td>
                        <td>{{ user.department }}</td>
                        <td>{{ user.level }}</td>
                        
                        
                        <td v-if="user.isactive" class="success">Active</td>
                        <td v-else class="danger">Inactive</td>

                    
                        <td class="primary details" @click="
                            showDetails=true;
    
                            modalViewForm={
                                
                            }">Details</td>
                        
                    </tr>
                    
                   
                   
                </tbody>
            </table>

            
        </div>
    </div>
</main>
<div class="right">
    <Topnav />

    <div class="recent-updates">
        adwdaw
    </div>
</div>
</template>

<script>
import axios from 'axios';

var moment = require('moment');

import Topnav from '@/components/Topnav.vue';

export default {
    data(){
        return{
            isTableLoading:false,
            UserList:[],
            months:[
                'January','February',"March","April",
                'May',"June","July","August","September",
                "October","November","December"
            ],
            moment:moment,
            college:'all',
            filterDept:'all',
            filterLevel:'all',
            isButtonClicked:false,
            itemsPerPage:10,
            tempFilter:{
                dept:'all',
                level:'all',
                tempcollegeindex: 0
            },
            colleges:[],
            collegeArrIndex:0,
            hostels:'',
        }
    },
    components:{
        Topnav,
    },
    mounted(){
        
        this.$store.commit('setCurrentPage', 'users')
        this.$root.showSidebar = false;
        //this.$root.showLoader = true
        this.getColleges()
        this.getHostels()
    },
    methods:{
        async getColleges(){

            await axios
                .get('api/v1/form/colleges/')
                .then(response => {
                    
                    var result = response.data
                    
                    this.colleges = result
                    this.colleges.unshift('all')


                })
                .catch(error => {
                    console.log('error')
                })
        },
        async getHostels(){
            
            await axios
            .get('api/v1/form/hostels/')
            .then(response => {
                    this.hostels = response.data
                }
                ).catch(error => {
                    console.log('error')
                }
                )
        }
    }
}
</script>

<style>

</style>