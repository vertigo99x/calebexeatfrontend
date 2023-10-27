
<template>
    <div v-if="$store.state.userData.usercat != 'porter' && $store.state.userData.usercat != 'saffairs'  ">
        <main>
            <h1 class="danger">404</h1>
            <h3>The page you requested was not found !</h3>
            <router-link to="/" class="primary" style="margin:2rem 0;">Return to Dashboard</router-link>
        </main>
    </div>
    <main v-else>
        
        <div class="recent-orders" style="margin-top: -2rem;" >
            <h2>Search Requests</h2>
            <div class="field">
                <input type="text" placeholder="Enter Request ID / Matric No. " maxlength="50" v-model="searchedText" v-on:keyup.enter="SearchRequest">
                <div class="searchbutton">
                    <span @click="SearchRequest()">Search</span>
                </div>
                
            </div>
        </div>
        
        <div class="recent-orders">
    
            <div class="blockbox">

                <div style="width:100%">
                    <h2>Bulk Approval / Rejection</h2>
                    <div class="field" style="flex-direction:column;">
                        <div class="fieldinput" style="margin:1rem 0;">
                            <input type="text" placeholder="Enter Request ID" v-model="bulkInputBox">
                            <i class="material-symbols-rounded" @click="addToBulkList(bulkInputBox, 'add');">add</i>
                        </div>
                        <div class="added-requests" style="background:var(--light);padding:.5rem;border-radius:var(--border-radius-1);max-height:10rem;overflow-y:scroll;">
                           <ul>
                            <li v-for="item in bulkList">
                                <span>CULEXT{{ item }}</span> 
                                <i class="material-symbols-rounded danger" style="cursor:pointer;" @click="addToBulkList(item, 'remove')">close</i>
                            </li>
                           </ul>
                        </div>
                        <select name="" id="" style="margin-top:1rem;" v-model="bulkCommand">
                            <option value="">Select Command</option>
                            <option value="approve">Approve All</option>
                            <option value="reject">Reject All</option>
                        </select>
                        <p style="margin-top:1rem;" v-if="bulkCommand=='reject'">Reason For Rejection (OPTIONAL)</p>
                        <textarea name="" id="" cols="30" rows="5" maxlength="100" placeholder="Remarks" style="border-radius:var(--border-radius-1);resize:none;background:var(--info-light);padding:.6rem;" v-model="bulkRemark" v-if="bulkCommand=='reject'"></textarea>
                        <div class="searchbutton" style="margin-top:1rem;text-align:center;" @click="bulkAction()">
                            <span>Execute Task</span>
                        </div>
                        
                    </div>
                </div>

                <div style="width:100%" id="filterbox">
                    <div style="display:flex;justify-content:space-between;">
                        <h2>Pending Requests</h2>
                        <p class="danger" @click=";collegeArrIndex=0;filterDept='all';filterLevel='all';tempFilter={dept:'all',tempcollegeindex:0,level:'all'};isTableLoading=true;showPages(currentFormPage)" v-if="collegeArrIndex!=0 || filterDept !='all' || filterLevel!='all'" >clear filter</p>
                    </div>
                    <div class="field" style="margin-bottom:1rem" id="filter">
                        <h3>Filter By: </h3>
                        
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
                            <th>Matric No</th>
                            <th>Request Description</th>
                            <th>Request ID</th>
                            <th>Date Sent</th>
                            <th>Departure Date</th>
                            <th>Arrival Date</th>
                            <th></th>
                            <th>Student's Affairs Status</th>
                            <th>Porter's Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-if="recentForms.length>=1" v-for="form in recentForms" :key="form"  style="overflow-x:scroll;width:100%;" :id="`formpk${form.id}`">
                            <td>{{ form.matric_no.replace('-',' / ') }}</td>
                            <td>{{ form.exeat_description.split('').slice(0,17).join("") }}...</td>
                            <td>CULEXT{{ form.id }}</td>
                            <td>
                                {{ months[parseInt(form.date_added.split('T')[0].split('-').reverse()[1])-1] }}
                                {{ form.date_added.split('T')[0].split('-').reverse()[0] }} 
                                {{ form.date_added.split('T')[0].split('-').reverse()[2] }}  at
                                {{ form.date_added.split('T')[1].replace('Z','').split(':').slice(0,2).join(':') }} 
                                <span 
                                v-if="parseInt(form.date_added.split('T')[1].split(':')[0]) < 12">AM
                                </span>
                                <span 
                                v-else>PM
                                </span>
                            </td>

                            <td>
                                {{ form.departure_date.split('T')[0].split('-').reverse()[0] }} 
                                {{ months[parseInt(form.departure_date.split('T')[0].split('-').reverse()[1])-1] }}
                                {{ form.departure_date.split('T')[0].split('-').reverse()[2] }} 
                            </td>
                            
                            <td>
                                {{ form.arrival_date.split('T')[0].split('-').reverse()[0] }} 
                                {{ months[parseInt(form.arrival_date.split('T')[0].split('-').reverse()[1])-1] }}
                                {{ form.arrival_date.split('T')[0].split('-').reverse()[2] }} 
                            </td>
                            
                            <td></td>
                            
                            <td v-if="form.statusStudentAffairs==1" class="success">Approved</td>
                            <td v-else-if="form.statusStudentAffairs==2" class="danger">Rejected</td>
                            <td v-else class="warning">Pending</td>
                            
                            <td v-if="form.statusPorter==1" class="success">Approved</td>
                            <td v-else-if="form.statusPorter==2" class="danger">Rejected</td>
                            <td v-else class="warning">Pending</td>

                            <td class="primary details" @click="
                                showDetails=true;
        
                                modalViewForm={
                                    id:form.id,
                                    description:form.exeat_description,
                                    statusPorter:form.statusPorter,
                                    statusStudentAffairs:form.statusStudentAffairs,
                                    departure:form.departure_date,
                                    arrival:form.arrival_date,
                                    date_added:form.date_added,
                                    exeat_type:form.exeat_type,
                                    iscancelled:form.iscancelled,
                                    iscleared:form.iscleared,
                                    matric_no:form.matric_no,
                                    studentpic:form.studentpic,
                                    department:form.department,
                                    college:form.college,
                                    parentnumber:form.parent_no,
                                    studentnumber:form.students_no,
                                    level:form.level,
                                    remarks:form.remarks
                                }">Details</td>
                            
                        </tr>
                        
                       
                       
                    </tbody>
                </table>
            </div>
        </div>

        

        <div class="modal" :class="{'showform':showDetails}" v-if="showDetails && $store.state.userData.usercat=='porter' || showDetails && $store.state.userData.usercat=='saffairs'" style="z-index:999">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="showDetails=false;modalViewForm={}">close</span>
                </div>

                <div class="details" style="margin-top:-1.5rem">
                    <div class="profile-image" style="width:4rem;height:4rem;">
                        <img :src="modalViewForm.studentpic" alt="" style="border-radius: 50%;">
                
                    </div>
                    <h2 style="font-size:1rem;font-weight:500">Request ID <span class="primary"> CULEXT{{ modalViewForm.id }}</span></h2>
                    <h3>Matric No: <span>{{ modalViewForm.matric_no.replace('-',' / ') }}</span></h3>
                    <h3>Exeat Type: <span>{{ modalViewForm.exeat_type }}</span></h3>
                    <h3>Time Sent: <span> {{moment(`${modalViewForm.date_added}`).fromNow()}}</span></h3>
                    <h3>Request Description: <span>{{modalViewForm.description}}</span></h3>
                    <h3>Departure Date: <span>
                        {{ months[parseInt(`${modalViewForm.departure}`.split('T')[0].split('-').reverse()[1])-1] }}
                        {{ `${modalViewForm.departure}`.split('T')[0].split('-').reverse()[0] }}
                        {{ `${modalViewForm.departure}`.split('T')[0].split('-').reverse()[2] }} 
                    </span></h3>
                    <h3>Arrival Date: <span>
                        {{ months[parseInt(`${modalViewForm.arrival}`.split('T')[0].split('-').reverse()[1])-1] }}
                        {{ `${modalViewForm.arrival}`.split('T')[0].split('-').reverse()[0] }}
                        {{ `${modalViewForm.arrival}`.split('T')[0].split('-').reverse()[2] }} 
                    </span></h3>
                    
                    <h3>Student's Phone Number: <span>{{modalViewForm.studentnumber}}</span></h3>
                    <h3>Level and Department: <span>{{modalViewForm.level}}<span v-if="modalViewForm.level">Level,</span>{{modalViewForm.department}}</span></h3>

                    <h3><b>Parent's</b> Phone Number: <span>{{modalViewForm.parentnumber}}</span></h3>
                    <h3>Student's Affairs Approval: 
                        <span v-if=" modalViewForm.statusStudentAffairs==1" class="success">Approved</span>
                        <span v-else-if="modalViewForm.statusStudentAffairs==2" class="danger">Rejected</span>
                        <span v-else class="warning">Pending</span>
                    </h3>

                    <h3 style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;" v-if="modalViewForm.statusPorter == 0"> 
                        <span class="success" @click="approve_or_reject(modalViewForm.id,modalViewForm.matric_no, 'approve','')">Approve Request</span>
                        <span class="danger" @click="stateReason=true;requestSelect={
                            remarks:'',
                            formID:modalViewForm.id,
                            matric_no:modalViewForm.matric_no
                        }">Reject Request</span>
                    </h3>
                    <h3 v-if="modalViewForm.iscancelled" class="danger">Request was Cancelled</h3>
                    <h3 style="margin-top:-1rem;font-size:1rem;display:flex;flex-direction:column" v-if="isSearchActive && modalViewForm.iscleared == false && modalViewForm.iscancelled==false">
                        
                        <h3 v-if="modalViewForm.statusPorter==1">Porter's Approval: <span class="success">Approved</span></h3>
                        <h3 v-else-if="modalViewForm.statusPorter==2">Porter's Approval: <span class="danger">Rejected</span></h3>
                        <span style="margin-top:1rem;" class="success" v-if="modalViewForm.statusPorter==1">You Have Approved This Request <span class="danger" style="text-decoration: underline;" @click="stateReason=true;requestSelect={
                            remarks:'',
                            formID:modalViewForm.id,
                            matric_no:modalViewForm.matric_no
                        }">Reject?</span></span>
                        <span style="margin-top:1rem;" class="danger" v-if="modalViewForm.statusPorter==2">You Have Rejected This Request <span class="success" style="text-decoration: underline;" @click="approve_or_reject(modalViewForm.id,modalViewForm.matric_no, 'approve','')">Approve?</span></span>

                    </h3>

                </div>

                
            </div>
        </div>

        <div class="modal showform" v-if="stateReason" style="z-index:1000">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="stateReason=false;
                    requestSelect={
                        remarks:'',
                        formID:'',
                        matric_no:''
                    }">close</span>
                </div>

                <div class="details">
                    <div class="field">
                        <h3>State reason for Request Rejection ( <span class="warning">Optional</span> )</h3>
                    </div>
                    <div class="field">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Remarks" maxlength="100" v-model="requestSelect.remarks"></textarea>
                        <p :class="{'danger':requestSelect.remarks.length == 100}">{{ requestSelect.remarks.length }} / 100</p>
                    </div>
                    <div class="item field" @click="approve_or_reject(requestSelect.formID, requestSelect.matric_no, 'reject', requestSelect.remarks)">
                        <span>Submit</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal showform" v-if="isSearchActive">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="isSearchActive=false;searchedText = '';modalViewForm={}">close</span>
                </div>
                <div class="recent-orders" style="margin-top:0;">
                    <h2 style="font-size:1rem;">Requests for {{ searchedText }}</h2>
                    <div style="max-height:20rem;overflow-y:scroll;border-radius:var(--card-border-radius);box-shadow: var(--box-shadow);" >
                        <table id="request-table">
                            <div class="table-loader" :class="{'load':isTableLoading}">
                                <div class="loader"></div>
                            </div>
                            <thead>
                                <tr>
                                    <th>Matric No</th>
                                    <th>Request Description</th>
                                    <th>Request ID</th>
                                    <th>Date Sent</th>
                                    <th>Departure Date</th>
                                    <th>Arrival Date</th>
                                    <th></th>
                                    <th>Student's Affairs Status</th>
                                    <th>Porter's Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-if="recentFormsSearched.length>=1" v-for="form in recentFormsSearched" :key="form"  style="overflow-x:scroll;width:100%;" :id="`formpk${form.id}`">
                                    <td>{{ form.matric_no.replace('-',' / ') }}</td>
                                    <td>{{ form.exeat_description.split('').slice(0,17).join("") }}...</td>
                                    <td>CULEXT{{ form.id }}</td>
                                    <td>
                                        {{ months[parseInt(form.date_added.split('T')[0].split('-').reverse()[1])-1] }}
                                        {{ form.date_added.split('T')[0].split('-').reverse()[0] }} 
                                        {{ form.date_added.split('T')[0].split('-').reverse()[2] }}  at
                                        {{ form.date_added.split('T')[1].replace('Z','').split(':').slice(0,2).join(':') }} 
                                        <span 
                                        v-if="parseInt(form.date_added.split('T')[1].split(':')[0]) < 12">AM
                                        </span>
                                        <span 
                                        v-else>PM
                                        </span>
                                    </td>
        
                                    <td>
                                        {{ form.departure_date.split('T')[0].split('-').reverse()[0] }} 
                                        {{ months[parseInt(form.departure_date.split('T')[0].split('-').reverse()[1])-1] }}
                                        {{ form.departure_date.split('T')[0].split('-').reverse()[2] }} 
                                    </td>
                                    
                                    <td>
                                        {{ form.arrival_date.split('T')[0].split('-').reverse()[0] }} 
                                        {{ months[parseInt(form.arrival_date.split('T')[0].split('-').reverse()[1])-1] }}
                                        {{ form.arrival_date.split('T')[0].split('-').reverse()[2] }} 
                                    </td>
                                    
                                    <td></td>
                                    
                                    <td v-if="form.statusStudentAffairs==1" class="success">Approved</td>
                                    <td v-else-if="form.statusStudentAffairs==2" class="danger">Rejected</td>
                                    <td v-else class="warning">Pending</td>
                                    
                                    <td v-if="form.statusPorter==1" class="success">Approved</td>
                                    <td v-else-if="form.statusPorter==2" class="danger">Rejected</td>
                                    <td v-else class="warning">Pending</td>
        
                                    <td class="primary details" @click="
                                        showDetails=true;
                
                                        modalViewForm={
                                            id:form.id,
                                            description:form.exeat_description,
                                            statusPorter:form.statusPorter,
                                            statusStudentAffairs:form.statusStudentAffairs,
                                            departure:form.departure_date,
                                            arrival:form.arrival_date,
                                            date_added:form.date_added,
                                            exeat_type:form.exeat_type,
                                            iscancelled:form.iscancelled,
                                            iscleared:form.iscleared,
                                            matric_no:form.matric_no,
                                            studentpic:form.studentpic,
                                            department:form.department,
                                            college:form.college,
                                            parentnumber:form.parent_no,
                                            studentnumber:form.students_no,
                                            level:form.level,
                                            remarks:form.remarks
                                        }">Details</td>
                                    
                                </tr>
                                
                               
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    </main>
    <div class="right">
        <Topnav />

        
        

    </div>
</template>

<script>

import Topnav from '@/components/Topnav.vue';
import store from '@/store';

import axios from 'axios';

import { toast } from 'bulma-toast';

var moment = require('moment')


export default {
    data() {
        return {
            months:[
                'January','February',"March","April",
                'May',"June","July","August","September",
                "October","November","December"
            ],
            moment:moment,
            showDetails:false,
            recentForms:[],
            recentEvents:[],
            recentFormsSearched:[],
            colleges:[],
            collegeArrIndex:0,
            isTableLoading:false,
            stateReason:false,
            college:'all',
            filterDept:'all',
            filterLevel:'all',
            requestSelect:{
                remarks:'',
                formID:'',
                matric_no:''
            },
            bulkList:JSON.parse(localStorage.getItem('bulkList')) || [],
            bulkInputBox:'',
            isSearchActive:false,
            currentFormPage: this.$store.state.currentFormPage || 1,
            pages:0,
            isButtonClicked:false,
            itemsPerPage:10,
            tempFilter:{
                dept:'all',
                level:'all',
                tempcollegeindex: 0
            },
            searchedText:'',
            bulkCommand:'',
            bulkRemark:'',
            events:['click','mousemove','mousedown','scroll','keypress','load'],
			warningTimer:null,
			logoutTimer:null,
			isWarningMessage:false,
        }
    }, 
    components:{
        Topnav
    },
    mounted(){
        if(this.$store.state.isAuthenticated){
			
            this.events.forEach(function (event) {
				window.addEventListener(event, this.resetTimer)
			}, this)

            //this.setTimers()
		} else {
            this.$router.push('/login')
        }
        
        if(this.$store.state.userData.usercat != 'porter' && this.$store.state.userData.usercat != 'saffairs'){
            this.$router.push('/')
        }

        this.isTableLoading = true
        this.$root.showLoader = false;
        this.$root.showSidebar = false;
        this.$store.commit('setCurrentPage', 'request-tasks')
        this.getColleges()
        this.showPages(this.currentFormPage)
        this.getEvents()
        this.timer = setInterval(() => {
            this.showPages(this.currentFormPage)
        },5000)

       
    },
    destroyed() {
        this.events.forEach(function (event) {
				window.removeEventListener(event, this.resetTimer())
			}, this)

        
        
	},
    methods:{
        setTimers(){
			if(this.$store.state.isAuthenticated){
				this.warningTimer = setTimeout(() => {
					this.isWarningMessage = true;
				}, 60 * 1000 * 10)

				this.LogoutTimer = setTimeout(() => {
					this.$root.isLogoutMessage = true;
					this.isWarningMessage = false
					this.$root.logout()
				}, 60 * 1000 * 30)
			}
		},
		resetTimer(){
			
			clearTimeout(this.warningTimer)
			clearTimeout(this.LogoutTimer)
			this.isWarningMessage = false
			this.setTimers()
		
			
		},
        async getEvents(){
            await axios
                .get(`api/v1/notification/${this.$store.state.token}`)
                .then(response => {
                    this.recentEvents = response.data

                })
                .catch(error =>{
                    console.log('error')
                })
        },
        async bulkAction(){
            const bulkData = {
                bulkList:this.bulkList,
                command:this.bulkCommand,
                token:this.$store.state.token,
                remarks:this.bulkRemark,
                staffimg:this.$store.state.userData.get_image_url
            }
            
            await axios
                .post('api/v1/tasks/bulktasks/', bulkData)
                .then(response => {
                    const result = response.data
                    if(result.message == 'success'){
                        toast({
                                message: 'Task is being Executed',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                        this.bulkCommand = ''
                        this.bulkList = []
                        localStorage.setItem('bulkList',JSON.stringify(this.bulkList))
                        this.isTableLoading = true
                        this.showPages(this.currentFormPage)
                    }
                }).catch(error => [
                    console.log('error')
                ])
        },
        addToBulkList(requestID, command){
            
            if(command === 'add'){
                requestID = requestID.toLowerCase()
                if(!isNaN(requestID.split('culext')[1])){
                    if(this.bulkList.indexOf(parseInt(requestID.replace('culext',''))) == -1 ){
                        this.bulkList.unshift(parseInt(requestID.replace('culext','')))
                        localStorage.setItem('bulkList',JSON.stringify(this.bulkList))
                   
                    } else {
                        toast({
                                message: 'Request ID already exists in list',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                    }
                } else {
                        toast({
                            message: 'Enter A Valid RequestID',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position:'top-right',
                        })
                }

           } else if (command === 'remove'){
            const index = this.bulkList.indexOf(parseInt(requestID))
                if(index != -1 ){
                    this.bulkList.splice(index,1)
                    localStorage.setItem('bulkList',JSON.stringify(this.bulkList))
                }
           }
           
           this.bulkInputBox=''
        },
        async approve_or_reject(formid, matric_no, command, remarks){
            const selectData = {
                token:this.$store.state.token,
                form_id:formid,
                command:command,
                remarks:remarks,
                hostel:this.$store.state.userData.hostel,
                username:this.$store.state.userData.username,
                matric_no:matric_no,
                img_url:this.$store.state.userData.get_image_url,
                usercat:this.$store.state.userData.usercat
            }

            console.table(selectData)
            if(this.stateReason){
                this.stateReason=false;
                this.requestSelect={
                    remarks:'',
                    formID:'',
                    matric_no:''
                }
            }

            await axios 
                .post('api/v1/form/change/', selectData)
                .then(response => {
                    console.table(response)

                    if(response.data.message=='success'){
                        toast({
                            message: 'Task Successful',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position:'top-right',
                        })
                        if(!this.isSearchActive){
                            document.querySelector(`#formpk${formid}`).style.display='none';
                        } else {
                            this.isSearchActive = false
                            this.searchedText=''
                        }
                        
                    }
                    
                })
                .catch(error => {
                    toast({
                            message: 'Task Unsucessful',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position:'top-right',
                        })
                })
           
            this.showDetails = false

        },
		async SearchRequest(){
            if(this.searchedText){
                await axios 
                .get(`api/v1/searched-forms/${this.$store.state.token}00x00x00${this.searchedText.replace('/','-')}`)
                .then(response => {
                    this.recentFormsSearched = response.data
                    console.log(response.data)
                    if(response.data.length == 0){
                        toast({
                                message: 'No Requests were Found',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                    } else {
                        if(response.data.message == 'invalid_search'){
                            toast({
                                message: 'Invalid Request ID or Matric No.',
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                        } else {
                            this.isSearchActive = true
                        }
                    }
                    
                })
                .catch(error => {
                    console.log('error')
                })
            }
            
        },
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
        async showPages(page){
            if(this.isButtonClicked){
                this.isTableLoading = true
            }

            var collegeSelect = ''

            if(this.collegeArrIndex == 0){
                collegeSelect = 'all'
            } else {
                collegeSelect = this.colleges[this.collegeArrIndex].colleges
            }

            await axios
            .get(`api/v1/recent-forms/${this.$store.state.token}00x00x00${this.itemsPerPage}00x00x00${this.filterDept}00x00x00${this.filterLevel}00x00x00${collegeSelect}?page=${page}`)
            .then(response => {
                this.recentForms = response.data.data
                this.pages = response.data.pages
                this.currentFormPage = page
                this.$store.commit('setCurrentFormPage', page)

                this.isTableLoading = false;
                this.isButtonClicked = false;

                    
            }).catch(error =>{
                console.log('error')
            })
            
        },
        clearRefresh(){
            clearInterval(this.timer)
        }
    },
    beforeUnmount(){
        this.clearRefresh()
        clearInterval(this.warningTimer);
        clearInterval(this.LogoutTimer);
        
    }
}
</script>

<style lang="scss" scoped>
    main{
        margin-top:9.5rem;
    }

    main .recent-orders{
        margin-top:8rem;
    }

    #bulk{
        margin-top:40rem;
    }

    main .recent-orders .blockbox {
        display: flex;
        flex-direction: row;
    }


    

    @media screen and (max-width:1200px) {
        

        .blockbox{
            display:flex;
            margin-top:-1rem;
            flex-direction: column !important;
            
        }

        .blockbox > div {
            margin-top:2rem;
        }

        .field .added-requests ul li{
            
            width:100%;
            margin:1rem 0;
            display: flex;
            justify-content:space-between !important;
            text-transform:uppercase;
            font-size: 1rem;
            padding:.2rem;
        }

        

        .field .added-requests ul li i{
            text-align: right;
        }

        .right {
            padding-left:2.5rem;
        }

        main .recent-orders .field{
            max-width:22rem ;
        }

    }


    @media screen and (min-width:1200px) {
        main .recent-orders{
            margin-top:1rem;
        }

        .field .added-requests ul{
            display: flex;
            flex-wrap: wrap;
        }
        .field .added-requests ul li{
            width:7rem;
            border:.5px solid var(--white);
            padding:0 .5rem;
            display:flex;
            margin:1rem 0;
            justify-content:space-between;
            text-transform:uppercase;
            color:var(--info-dark);
        }

        #filterbox{
            margin-left: -30rem;
        }
        main .recent-orders .field{
            max-width:20rem ;
        }
        
    }

    @media screen and (max-width:600px) {
        .blockbox {
            margin-top:-8rem;
        }
        .right{
            padding-left:0rem;
        }
        main .recent-orders .field{
            max-width:none;
        }
        
    }
</style>