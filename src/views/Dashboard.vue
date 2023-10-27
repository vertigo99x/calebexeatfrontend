<template>
 <div>
    <div class="right profile" v-if="userData && is_mobile() && userData.usercat==='student'" style="margin-bottom:-2rem;">
        <ProfileView :studentData="studentData"></ProfileView>
           
    </div>
    <main v-if="userData">
        <h1>Dashboard</h1>
        <div  v-if="userData.usercat === 'student' && validateLocation()" class="item add-product" id="create-request" @click="showForm = true" >
            <div>
                <span class="svg-icon" ><svg style="fill:var(--primary);" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span>
                <h3>Create Request</h3>
            </div>
        </div>
        <Insights :userData="userData"></Insights>

        <div class="modal" :class="{ 'showform': showForm }" v-if="userData.usercat == 'student' && showForm">
                <div class="modal-content">
                    <div class="close">
                        <span class="svg-icon" style="position:relative;margin:1rem;" @click="showForm = false;
                        requestForm = {
                            departure: '',
                            arrival: '',
                            exeat_type: '',
                            exeat_description: '',
                        }"><svg style="fill:var(--danger);cursor:pointer;position:absolute;right:0;" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></span>
                    </div>
                    <h2>Create Request</h2>
                    <span class="danger" v-if="studentData.forms_left_for_today == 0" style="text-align: center;width:100%;">Daily Request Sending Limit Reached</span>
                    <span class="danger" v-if="!validateLocation()" style="text-align: center;width:100%;">Location Access is needed to send Requests</span>
                    <div class="details">
                        <div class="field">
                            <select id="" v-model="requestForm.exeat_type" required>
                                <option value="" selected disabled>Select Exeat Type</option>
                                <option value="short">Short Exeat</option>
                                <option value="long">Long Exeat</option>
                            </select>
                        </div>

                        <div class="field">
                            <textarea name="" id="" cols="30" rows="10" placeholder="Request Description" v-model="requestForm.exeat_description"></textarea>
                        </div>
                        <div class="field date">
                            <table>
                                <tr v-if="requestForm.exeat_type == 'short'">
                                    <td><label for="">Departure Date</label></td>
                                    <td>  <input type="date" name="" id="" :min="requestForm.arrival || today"  v-model="requestForm.departure"></td>
                                </tr>
                                <tr v-else>
                                    <td><label for="">Departure Date</label></td>
                                    <td>  <input type="date" name="" id="" :min="requestForm.arrival || today" :max="requestForm.arrival" v-model="requestForm.departure"></td>
                                </tr>
                                <tr v-if="requestForm.exeat_type == 'short'">
                                    <td> <label for="">Arrival Date</label></td>
                                    <td> <input type="date" name="" id="" :min="requestForm.arrival || today" v-model="requestForm.departure"></td>
                                </tr>
                                <tr v-else>
                                    <td> <label for="">Arrival Date</label></td>
                                    <td>  <input type="date" name="" id="" :min="requestForm.departure || today"  v-model="requestForm.arrival"></td>
                                </tr>
                            </table>
                        </div>

                        <div class="item field" @click="sendRequest" v-if="validateLocation() && studentData.forms_left_for_today > 0">
                            <span class="button">Submit</span>
                        </div>
    
                    </div>
                </div>
        </div>

        <div class="modal" :class="{ 'showform': $root.showPasswordChangeModal }" v-if="$root.showPasswordChangeModal">
            <div class="modal-content">
                <div class="svg-icon"  style="position:relative;margin:1rem;">
                        <svg @click="$root.showPasswordChangeModal = false; changePassword = { old: '', new: '', confirm: '' }" style="fill:var(--danger);cursor:pointer;position:absolute;right:0;" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                    </div>
                <h2>Change Password</h2>
                <div class="details" id="profileformdetails">
                    <div class="field">
                        <input type="password" placeholder="Old Password" v-model="changePassword.old">
                    
                    </div>
                    <div class="field compare">
                        <input type="password" placeholder="New Password" v-model="changePassword.new">
                        <span class="material-symbols-rounded success" v-if="changePassword.new && changePassword.new.length >= 8">check</span>
                        <span class="material-symbols-rounded danger" v-else-if="changePassword.new && changePassword.new.length < 8 || changePassword.old === changePassword.new">close</span>
                    </div>
                    <div class="field compare">
                        <input type="password" placeholder="Confirm New Password" v-model="changePassword.confirm">
                        <span class="material-symbols-rounded success" v-if="changePassword.new === changePassword.confirm && changePassword.new && changePassword.confirm.length >= 8" >check</span>
                        <span class="material-symbols-rounded danger" v-else>close</span>
                    </div>

                    <div class="item field" @click="changeUserPassword" v-if="changePassword.new === changePassword.confirm && changePassword.new && changePassword.confirm.length >= 8 && changePassword.old && changePassword.old !== changePassword.new">
                        <span class="button">Submit</span>
                    </div>
                </div>
            </div>
        </div>

            <div class="modal" :class="{'showform':searchReady}" v-if="userData.usercat!='student' && searchReady">
                <div class="recent-orders modal-content">
                    <div class="svg-icon"  style="position:relative;margin:1rem;">
                            <svg @click="searchReady = false;" style="fill:var(--danger);cursor:pointer;position:absolute;right:1rem;" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        </div>
                     <div style="max-height:20rem;overflow-y:scroll;border-radius:var(--card-border-radius);box-shadow: var(--box-shadow);margin-top:2rem">
                        <h2 style="text-align:center;">Requests for {{ searchedText.replace('/','-').replace('/', '-') }}</h2>    
                        <table class="request-table" :class="userData.usercat">
                                
                                <thead >
                                    <tr>
                                        <th v-if="userData.usercat !== 'student'">Matric No:</th>
                                        <th v-if="userData.usercat !== 'student'">Student's Name:</th>
                                        <th v-if="userData.usercat !== 'student'">Room No:</th>
                                        <th v-if="userData.usercat !== 'student'">Phone No:</th>
                                        <th v-if="userData.usercat !== 'student'">Parent's Phone No:</th>
                                        <th v-if="userData.usercat !== 'student'">Level:</th>
                                        <th v-if="userData.usercat !== 'student'">College:</th>
                                        <th v-if="userData.usercat !== 'student'">Department:</th>
                                        <th >Request Description</th>
                                        <th v-if="userData.usercat !== 'student'">Departure Date</th>
                                        <th v-if="userData.usercat !== 'student'">Arrival Date</th>
                                        <th v-if="userData.usercat === 'student'" style="display:flex !important">Final Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-if="searchedRequests">
                            
                                    <template v-for="form in searchedRequests"  :key="form">
                                        <tr v-if="freshly_deleted.indexOf(form.uuid) == -1"  style="overflow-x:scroll;width:100%;">
                                  
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.matric_no.replace('-', '/') }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.lastname }} {{ form.studentData.Firstname }} {{ form.studentData.middlename }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.hostel.room_number }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.phonenumber }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.parent_phone_no }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.student_level }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.department.college }}</td>
                                            <td v-if="userData.usercat !== 'student'">{{ form.studentData.department.department }}</td>
                                            <td>{{ form.exeat_description.split('').slice(0, 17).join("") }}...</td>
                                             <td v-if="userData.usercat !== 'student'">{{ form.departure_date }}</td>
                                             <td v-if="userData.usercat !== 'student'">{{ form.arrival_date }}</td>
    
                                    
                                   
                                                <td style="display:flex !important; align-items:center;" v-if="userData.usercat === 'student' && form.iscancelled" class="danger">Cancelled</td>
                                                <td style="display:flex !important; align-items:center;" v-else-if="form.isclearedbySecurity && userData.usercat === 'student'" class="success">Cleared by Security</td>
                                                <td style="display:flex !important; align-items:center;" v-else-if="form.statusPorter == 'approved' && form.statusStudentAffairs == 'approved' && userData.usercat === 'student'" class="success">Approved</td>
                                                <td style="display:flex !important; align-items:center;" v-else-if="(form.statusPorter == 'rejected' || form.statusStudentAffairs == 'rejected') && userData.usercat === 'student'" class="danger">Rejected</td>
                                                <td style="display:flex !important; align-items:center;" v-else-if="(form.statusPorter == 'pending' || form.statusStudentAffairs == 'pending') && userData.usercat === 'student'" class="warning">Pending</td>
                                
                                            <td class="primary details" @click="
                                                showDetails = true;

                                            modalViewForm = {
                                                uid: form.uuid,
                                                studentData: form.studentData || '',
                                                description: form.exeat_description,
                                                statusPorter: form.statusPorter,
                                                statusStudentAffairs: form.statusStudentAffairs,
                                                departure: form.departure_date,
                                                arrival: form.arrival_date,
                                                date_added: form.date_added,
                                                exeat_type: form.exeat_duration,
                                                iscancelled: form.iscancelled,
                                                iscleared: form.isclearedbySecurity,
                                                remarks: form.remarks,
                                            }">Details</td>
                                        </tr>
                                    </template>
                                
                            
                           
                           
                           
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>

            <div class="recent-orders" v-if="userData.usercat != 'admin'">
               <div class="rc" style="margin:0 0 2rem 0">
                <h2 v-if="userData.usercat != 'student'">Search Requests</h2>
                <div class="field" v-if="userData.usercat != 'student'">
                    <input type="text" placeholder="Matric Number" maxlength="50" v-model="searchedText" v-on:keyup.enter="searchRequest()">
                    <div class="searchbutton">
                        <span @click="searchRequest()">Search</span>
                    </div>
                
                </div>
               </div>
               
                <h2 v-if="userData.usercat != 'student' && current_filter" style="text-transform:capitalize">{{ current_filter || 'Pending' }} Requests</h2>
                <h2 v-else-if="userData.usercat != 'student'">Pending Requests</h2>
                <h2 v-else>User Requests</h2>
               
                <div class="pagination" v-if="isShowAll && userData.usercat !='student' ">
             
                    <p>Pages {{ currentFormPage }} of {{ pages }}</p>
                    
                    <div class="pagination-row">
                    
                        <div class="items">
                            <button class="pagination-button" :disabled="currentFormPage <= 1" :class="{ 'disabled': currentFormPage <= 1 }" @click="isButtonClicked = true;freshly_deleted = [];getRequests(currentFormPage - 1)">&lt;</button>
                    
                        </div>

                        <div class="items scrollable">
                            <span v-for="(item, index) in pages" :key="index">
                                <button class="pagination-button" @click="isButtonClicked = true;freshly_deleted=[];getRequests(item)" :class="{'active-page':currentFormPage==item}" >{{ item }}</button>
                            
                            </span>
                        </div>
            
                        <div class="items">
                            <button class="pagination-button" :disabled="currentFormPage >= pages" :class="{ 'disabled': currentFormPage >= pages }" @click="isButtonClicked = true; freshly_deleted = []; getRequests(currentFormPage + 1)">&gt;</button>
                        </div>
                       <slot />
                    
                    </div>
                </div>

                <div class="filter-by" v-if="userData.usercat != 'student' && !is_mobile()">
                   <div class="filter-field" style="display:flex">
                     <div class="field-f">
                        <h3>Order By:</h3>
                            <select name="" id="" v-model="formOrder.order_by">
                                <option value="">Default</option>
                                <option value="recent">Most Recent</option>
                            </select>
                     </div>

                        <button @click="setFilter()" class="filter" style="border-radius:.5rem;margin:2.5rem 0 0 0;padding:.5rem;margin-left:2rem;width:6rem;color:var(--dark);background-color:var(--primary);height:2.5rem;font-size:1.1rem">Filter</button>
                  
                    </div>

                </div>

                <div class="filter-by" v-if="userData.usercat != 'student' && is_mobile()">
                   <div class="filter-field" >
                  
                        <h3>Order By:</h3>
                            <select name="" id="" v-model="formOrder.order_by">
                                <option value="">Default</option>
                                <option value="recent">Most Recent</option>
                            </select>

                            <button @click="setFilter()" class="filter" style="border-radius:.5rem;margin:.5rem 0 0 0;padding:.5rem;margin-left:1rem;width:6rem;color:var(--dark);background-color:var(--primary);">Filter</button>
                  
                     </div>

                    

                </div>

                    <div class="filter-by" v-if="userData.usercat != 'student'" >
                        <div class="filter-field">
                            <h3>Status:</h3>
                             <select name="" id="status" v-model="formOrder.status">
                                <option value="" selected>Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                           
                        </div>
                        <div class="filter-field">
                            <h3>Level:</h3>
                             <select name="" id="level" v-model="formOrder.level">
                                    <option value="">All Levels</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="300">300</option>
                                    <option value="400">400</option>

                                </select>
                        </div>
                        <div class="filter-field">
                            <h3>College</h3>
                             <select name="" id="college" v-model="formOrder.college">
                                        <option value="">All Colleges</option>
                                        
                                        <option v-for="college in college_list" :value="college" :key="college">
                                            <span v-for="(val, key) in college">{{ key }}</span>
                                        </option>


                                    </select>
                                  
                        </div>
                        <div class="filter-field">
                            <h3>Dept</h3>
                              <select name="" id="dept" v-model="formOrder.dept">
                                    <option value="">All depts</option>
                                    <option v-for="val in getDepts(formOrder.college)" :value="val">{{ val }}</option>
                            </select>
                        </div>
                        
                    </div>
                    
                    <div style="max-height:20rem;overflow-y:scroll;border-radius:var(--card-border-radius);box-shadow: var(--box-shadow);">
                        <table id="request-table" :class="userData.usercat">
                            <div class="table-loader" :class="{ 'load': isTableLoading }">
                                <div class="loader"></div>
                            </div>
                            <thead >
                                <tr>
                                    <th v-if="userData.usercat !== 'student'">Matric No:</th>
                                    <th v-if="userData.usercat !== 'student'">Student's Name:</th>
                                    <th v-if="userData.usercat !== 'student'">Room No:</th>
                                    <th v-if="userData.usercat !== 'student'">Phone No:</th>
                                    <th v-if="userData.usercat !== 'student'">Parent's Phone No:</th>
                                    <th v-if="userData.usercat !== 'student'">Level:</th>
                                    <th v-if="userData.usercat !== 'student'">College:</th>
                                    <th v-if="userData.usercat !== 'student'">Department:</th>
                                    <th >Request Description</th>
                                    <th v-if="userData.usercat !== 'student'">Departure Date</th>
                                    <th v-if="userData.usercat !== 'student'">Arrival Date</th>
                                    <th v-if="userData.usercat==='student'" style="display:flex !important">Final Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="recentForms">
                            
                                <template v-for="form in recentForms"  :key="form">
                                    <tr v-if="freshly_deleted.indexOf(form.uuid) == -1"  style="overflow-x:scroll;width:100%;">
                                  
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.matric_no.replace('-', '/') }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.lastname }} {{ form.studentData.Firstname }} {{ form.studentData.middlename }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.hostel.room_number }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.phonenumber }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.parent_phone_no }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.student_level }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.department.college }}</td>
                                        <td v-if="userData.usercat !== 'student'">{{ form.studentData.department.department }}</td>
                                        <td>{{ form.exeat_description.split('').slice(0, 17).join("") }}...</td>
                                         <td v-if="userData.usercat !== 'student'">{{ form.departure_date }}</td>
                                         <td v-if="userData.usercat !== 'student'">{{ form.arrival_date }}</td>
    
                                    
                                   
                                            <td style="display:flex !important; align-items:center;" v-if="userData.usercat === 'student' && form.iscancelled" class="danger">Cancelled</td>
                                            <td style="display:flex !important; align-items:center;" v-else-if="form.isclearedbySecurity && userData.usercat === 'student'" class="success">Cleared by Security</td>
                                            <td style="display:flex !important; align-items:center;" v-else-if="form.statusPorter == 'approved' && form.statusStudentAffairs == 'approved' && userData.usercat === 'student'" class="success">Approved</td>
                                            <td style="display:flex !important; align-items:center;" v-else-if="(form.statusPorter == 'rejected' || form.statusStudentAffairs == 'rejected') && userData.usercat === 'student'" class="danger">Rejected</td>
                                            <td style="display:flex !important; align-items:center;" v-else-if="(form.statusPorter == 'pending' || form.statusStudentAffairs == 'pending') && userData.usercat === 'student'" class="warning">Pending</td>
                                
                                        <td class="primary details" @click="
                                            showDetails = true;

                                        modalViewForm = {
                                            uid: form.uuid,
                                            studentData: form.studentData || '',
                                            description: form.exeat_description,
                                            statusPorter: form.statusPorter,
                                            statusStudentAffairs: form.statusStudentAffairs,
                                            departure: form.departure_date,
                                            arrival: form.arrival_date,
                                            date_added: form.date_added,
                                            exeat_type: form.exeat_duration,
                                            iscancelled: form.iscancelled,
                                            iscleared: form.isclearedbySecurity,
                                            remarks: form.remarks,
                                        }">Details</td>
                                    </tr>
                                </template>
                                
                            
                           
                           
                           
                            </tbody>
                        </table>
                    </div>


           


                <div v-if="userData.usercat != 'student'">
                    <span class="view-all" @click="isShowAll = true; $store.commit('modifyShowAll', true)" v-if="!isShowAll && pages > 1">Show All</span>
                    <span class="view-all" @click="isShowAll = false; $store.commit('modifyShowAll', false); isButtonClicked = true; showPages(1);" v-if="isShowAll">Show Recent</span>
           

                </div>
            </div>

             <div class="modal showform" v-if="stateReason" style="z-index:9999;">
                <div class="modal-content">
                    <div class="svg-icon"  style="position:relative;margin:1rem;">
                            <svg  @click="stateReason = false;
                            requestSelect = {
                                remarks: '',
                                formID: '',
                                matric_no: ''
                            }" style="fill:var(--danger);cursor:pointer;position:absolute;right:0;" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        </div>

                    <div class="details" style="margin-top:2rem;">
                        <div class="field">
                            <h3>State reason for Request Rejection ( <span class="warning">Optional</span> )</h3>
                        </div>
                        <div class="field">
                            <textarea name="" id="" cols="30" rows="10" placeholder="Remarks" maxlength="100" v-model="requestSelect.remarks"></textarea>
                            <p :class="{ 'danger': requestSelect.remarks.length == 100 }">{{ requestSelect.remarks.length }} / 100</p>
                        </div>
                        <div class="item field" @click="approve_or_reject(requestSelect.formID, requestSelect.matric_no, 'reject', requestSelect.remarks)">
                            <span>Submit</span>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal" :class="{ 'showform': showDetails }">
                <div class="modal-content">
                    <div class="svg-icon"  style="position:relative;margin:1rem;">
                        <svg @click="showDetails = false; modalViewForm = {}" style="fill:var(--danger);cursor:pointer;position:absolute;right:0;" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                    </div>
                     <div class="details">
                        <div class="heading" v-if="userData.usercat != 'student' ">
                            <h2>Details for <b v-if="modalViewForm.studentData">{{ modalViewForm.studentData.matric_no.replace('-', '/') }}</b>:</h2>
                        </div>
                        <div class="imagebox" v-if="modalViewForm.studentData">
                            <div class="img">
                                <img :src="modalViewForm.studentData.student_thumbnail" alt="">
                            
                            </div>
                        </div>
                        <h3  v-if="modalViewForm.studentData">Hostel: <span style="text-transform:capitalize">{{ modalViewForm.studentData.hostel.hostel_name }} Hall</span></h3>
                        <h3  v-if="modalViewForm.studentData">Room Number: <span>{{ modalViewForm.studentData.hostel.room_number }}</span></h3>
                        <h3  v-if="modalViewForm.studentData">Name: <span style="text-transform:capitalize">{{ modalViewForm.studentData.lastname }} {{ modalViewForm.studentData.firstname }}</span></h3>
                        <h3  v-if="modalViewForm.studentData">Department: <span>{{ modalViewForm.studentData.department.department }}</span></h3>
                        <h3  v-if="modalViewForm.studentData">Student Phone Number: <span>{{ modalViewForm.studentData.phonenumber }}</span></h3>
                        <h3  v-if="modalViewForm.studentData" style="color:var(--primary);">Parent's Phone Number: <span>{{ modalViewForm.studentData.parent_phone_no }}</span></h3>
                        <h3>Exeat Type: <span>{{ modalViewForm.exeat_type }}</span></h3>
                        <h3>Date Sent: <span>{{ modalViewForm.date_added }} ( {{ moment(`${modalViewForm.date_added}`).fromNow() }} )</span></h3>
                        <h3>Request Description: <span>{{ modalViewForm.description }}</span></h3>
                        <h3>Departure Date: <span :class="{ 'danger': today > modalViewForm.departure }">
                           {{ modalViewForm.departure }}
                        </span></h3>
                        <h3>Arrival Date: <span>
                           {{ modalViewForm.arrival }}
                        </span></h3>
                        <h3 v-if="userData.usercat == 'student'">Porter's Approval: 
                            <span v-if="modalViewForm.statusPorter == 'approved'" class="success">Approved</span>
                            <span v-else-if="modalViewForm.statusPorter == 'rejected'" class="danger">Rejected</span>
                            <span v-else class="warning">Pending</span>
                        </h3>
                        <h3 v-if="userData.usercat == 'student'">Student's Affairs Approval: 
                            <span v-if="modalViewForm.statusStudentAffairs == 'approved'" class="success">Approved</span>
                            <span v-else-if="modalViewForm.statusStudentAffairs == 'rejected'" class="danger">Rejected</span>
                            <span v-else class="warning">Pending</span>
                        </h3>
                       
                        <h3 v-if="modalViewForm.remarks" style="margin:1rem 0;display:flex;flex-direction:column" class="warning">
                            <span v-for="remark in modalViewForm.remarks.split(';')" :key="remark">{{ remark }}</span>
                        </h3>

                        <h3 class="success" v-if="modalViewForm.iscleared" style="text-align:center">Cleared by Security</h3>
                        <h3 class="danger" v-else-if="modalViewForm.iscancelled" style="text-align:center">Request has been Cancelled !!!</h3>
                        <h3 class="danger" v-if="!modalViewForm.iscancelled && modalViewForm.statusPorter == 'pending' && modalViewForm.statusStudentAffairs == 'pending' && userData.usercat == 'student' " style="margin-top:2rem;cursor:pointer;" @click="cancelRequest(modalViewForm.uid)">Cancel Request</h3>
               
                        <h3 class="danger" style="text-align:center" v-if="today > modalViewForm.departure && modalViewForm.iscancelled">Departure date Exceeded !!!</h3>

                        <h3 v-if="userData.usercat == 'porter' && modalViewForm.statusPorter == 'pending' && !modalViewForm.iscancelled && modalViewForm.studentData" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;"> 
                            <span class="success" @click="approve_or_reject(modalViewForm.uid, modalViewForm.studentData.matric_no, 'approve', '')">Approve Request</span>
                            <span class="danger" @click="stateReason = true; requestSelect = {
                                remarks: '',
                                formID: modalViewForm.uid,
                                matric_no: modalViewForm.studentData.matric_no
                            }">Reject Request</span>
                        </h3>
                        <h3 v-if="userData.usercat == 'saffairs' && modalViewForm.statusStudentAffairs == 'pending' && !modalViewForm.iscancelled && modalViewForm.studentData" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;"> 
                            <span class="success" @click="approve_or_reject(modalViewForm.uid, modalViewForm.studentData.matric_no, 'approve', '')">Approve Request</span>
                            <span class="danger" @click="stateReason = true; requestSelect = {
                                remarks: '',
                                formID: modalViewForm.uid,
                                matric_no: modalViewForm.studentData.matric_no
                            }">Reject Request</span>
                        </h3>
                        
                        
                        <h3 v-if="userData.usercat == 'porter' && modalViewForm.statusPorter == 'rejected' && searchReady" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;"> 
                            <span class="danger" >Porter rejected this Request</span>
                           
                        </h3>
                        <h3 v-if="userData.usercat == 'saffairs' && modalViewForm.statusStudentAffairs == 'rejected' && searchReady" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;"> 
                            <span class="danger" >Students Affairs rejected this Request</span>
                           
                        </h3>
                        <h3 v-if="(userData.usercat != 'student') && modalViewForm.iscancelled" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;"> 
                            <span class="danger" >Request Was cancelled by Student</span>
                           
                        </h3>
                    </div>

                </div>
            </div>

            <div class="modal" :class="{'showform':showWarning}">
                <div class="modal-content">
                    <div class="field pop-up">
                        <h3>Are You Still Here?</h3>
                        <h4>We will automatically Log you out if no action is taken.</h4>
                    </div>
                </div>
            </div>


     </main>
     
    
 </div>
 
</template>

<script>
import axios from 'axios'
import $ from 'jquery';


import '../../public/jquery.timeago.js'

import { toast } from 'bulma-toast'

import Topnav from '@/components/Topnav.vue';
import Insights from '@/components/Insights.vue';
import ProfileView from '@/components/ProfileView.vue';

import { nextTick } from 'vue';

import store from '../store/index'

import { watch, ref } from 'vue';

var moment = require('moment')


export default {
    name: 'Dashboard',

    components: {
        Topnav,
        Insights,
        ProfileView,
    },
    data() {
        return {
            months: [
                'January', 'February', "March", "April",
                'May', "June", "July", "August", "September",
                "October", "November", "December"
            ],
            moment: moment,
            today: '',
            authtoken: this.$store.state.token, //`${axios.defaults.headers.common["Authorization"].replace('Token', '')}`.trim(),
            recentForms: [],
            recentEvents: [],
            formOrder: {
                order_by: '',
                dept: '',
                college: '',
                level: '',
                status:'',
            },
            modalViewForm: {},
            selected_college:'',
            showDetails: false,
            showAllEvents: false,
            isShowAll: this.$store.state.isShowAll || false,
            showForm: false,
            showPasswordChangeModal: false,
            showProfileImageChangeModal: false,
            userData: '',
            studentData:'',
            counts: {
                pendingexeats: 0,
                approvedexeats: 0,
                rejectedexeats: 0,
            },
            requestForm: {
                departure: '',
                arrival: '',
                exeat_type: '',
                exeat_description: '',
            },
            currentFormPage: this.$store.state.currentFormPage || 1,
            pages: 0,
            isTableLoading: false,
            isButtonClicked: true,
            changePassword: {
                old: '',
                new: '',
                confirm: ''
            },
            stateReason: false,
            requestSelect: {
                remarks: '',
                formID: '',
                matric_no: ''
            },
            events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
            warningTimer: null,
            logoutTimer: null,
            isWarningMessage: false,
            timer: null,
            searchedText: '',
            isSearchActive: false,
            realTimeInfo: true,
            college_list: [],
            freshly_deleted: [],
            current_filter: '',
            searchReady: false,
            searchedRequests: [],
            reload_time: 10000,
            default_timeout_warning: 300000,
            default_timeout_logout: 600000,
            timer_reset: null,
            timer_reset_logout: null,
            showWarning:false,
            
        } 
    },
    mounted() {
        console.log(this.$store.state.currentFormPage)
        this.$root.showLoader = true;
        this.getTodaysDate();
        this.authtoken = this.$store.state.token
        if (this.$store.state.isAuthenticated) {
            this.getUserData();
            this.getUserEvents();
            this.getRequests(this.currentFormPage);
        }
        
        this.getDepartments();

        this.$root.continue_load = true;
        var timer1 = setInterval(() => {
            if (this.$root.continue_load) {
                if (this.$store.state.isAuthenticated) {
                    this.getUserData();
                    this.getUserEvents();
                    this.getRequests(this.currentFormPage);
                }
            }
        }, this.reload_time)

        this.checkActive()
        
    },
    methods: {
        setFilter() {
           this.current_filter = this.formOrder.status
    console.log(this.formOrder)
            this.getRequests(this.currentFormPage);
            
        },
        getDepts(col) { 
            var save = []
            for (var x in col) {
                save.push(x)
            }
            return col[save[0]]
        },
        forceLogout() {
            clearInterval(this.timer1);
            this.$root.logout("You were Logged out. Login To Continue.")
        },
        is_mobile() {
            if (document.documentElement.clientWidth < 700) {
                return true
            }
            return false
        },
        getTodaysDate() {
            var tod = new Date()
            var day = tod.getDate()
            var month = tod.getMonth() + 1
            var year = tod.getFullYear()

            if (`${month}`.length == 1) {
                month = `0${month}`
            }
            if (`${day}`.length == 1) {
                day = `0${day}`
            }

            this.today = `${year}-${month}-${day}`

        },
        setTimeoutUntilLogout() { 
            this.timer_reset = setTimeout(() => { 
                this.showWarning = true
            }, this.default_timeout_warning);
            
            this.timer_reset_logout = setTimeout(() => { 
                this.forceLogout();
            },this.default_timeout_logout);
        },
        checkActive() {
            for (var x = 0; x < this.events.length; x++){
                window.addEventListener(this.events[x], () => {
                    this.showWarning = false;
                    clearTimeout(this.timer_reset)
                    clearTimeout(this.timer_reset_logout)
                    this.setTimeoutUntilLogout();
                })
            }
        },
        async searchRequest() {
            this.$root.showLoader = true;
            await axios
                .get('api/v1/forms/search?' + "&token=" + this.authtoken + "&matric=" + this.searchedText.replace('/','-'))
                .then(response => {
                    this.$root.showLoader = false;
                    const data = response.data
                    if (data.message && data.message == "no_auth") {
                        //
                    } else {
                        if (data.length >= 1) {
                            this.searchedRequests = data;
                            this.searchReady = true;
                        } else {
                            toast({
                                message: `No record found for ${this.searchedText}`,
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position: 'top-center',
                            })
                        }
                       
                    }
                })
                .catch(error => {
                    toast({
                        message: `An Error Occured. Please Check your connection and try again`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 3000,
                        position: 'top-center',
                    })
                    this.$root.showLoader = false;
                })
        },
        async getDepartments() {
            await axios
                .get('api/v1/general/getColleges')
                .then(response => {
                    const data = response.data
                    console.log(data)
                    this.college_list = data
                })
                .catch(error => {
                    console.error('could not get Depts')
                })
        },
        async getUserData() {
            const token = this.authtoken

            if (this.userData.usercat != 'superuser') {
                 await axios
                    .get('api/v1/accounts/userdata/?&token=' + token)
                    .then(response => {
                        const data = response.data

                        if (data.message && data.message === 'no_auth') {
                            //this.forceLogout();
                        } else {
                            this.$root.showLoader = false;
                            if (!data.usercat && data.get_user_data.usercat == 'student') {
                                this.userData = data.get_user_data
                                this.studentData = data
                                this.$root.userData = data.get_user_data;
                                this.$root.studentData = data;

                                this.counts.pendingexeats = data.get_user_data.getRequestCount.pending;
                                this.counts.approvedexeats = data.get_user_data.getRequestCount.approved;
                                this.counts.rejectedexeats = data.get_user_data.getRequestCount.rejected;
                                this.reload_time = 30000;
                            } else if (data.usercat === 'superuser') { 
                                this.$root.continue_load = false;
                            } else {
                                if (data) {
                                    this.userData = data;
                                    this.$root.userData = data;
                                    this.counts.pendingexeats = data.getRequestCount.pending;
                                    this.counts.approvedexeats = data.getRequestCount.approved;
                                    this.counts.rejectedexeats = data.getRequestCount.rejected;
                                    this.reload_time = 10000;
                                }
                            }
                        }

                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                toast({
                                    message: `${error.response.data[property][0]}`,
                                    type: 'is-danger',
                                    dismissible: true,
                                    pauseOnHover: 'true',
                                    duration: 3000,
                                    position: 'top-center',
                                })
                            }
                        }
                    })

                this.getRequests(this.currentFormPage)
            } else {
                this.$root.continue_load = false;
            }
        },
        async getUserEvents() {
            const token = this.authtoken

                 await axios
                    .get("api/v1/events?&token=" + token)
                    .then(response => {
                        const data = response.data
                        if (data.message && data.message === 'no_auth') {
                            //this.forceLogout();
                        } else {

                            if (data) {
                                this.recentEvents = data;
                                this.$root.recentEvents = data;
                            }
                        }


                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                toast({
                                    message: `${error.response.data[property][0]}`,
                                    type: 'is-danger',
                                    dismissible: true,
                                    pauseOnHover: 'true',
                                    duration: 3000,
                                    position: 'top-center',
                                })
                            }
                        }
                    })
           
        },
        async changeUserPassword() {
            const passwordData = this.changePassword;

            if (passwordData.old && passwordData.new) {
                this.$root.showLoader = true;
                const data = {
                    token: this.authtoken,
                    old_password:this.changePassword.old,
                    new_password:this.changePassword.new,
                }
                this.changePassword = {
                    old: '',
                        new: '',
                            confirm: ''
                }
                await axios
                    .post('api/v1/accounts/users/password/change/', data)
                    .then(response => {
                        const data = response.data
                        this.$root.showLoader = false;
                        if (data.message && data.message === 'no_auth') {
                            //this.forceLogout();
                        } else if (data.message && data.message === 'incorrect_old_password') {
                            toast({
                                message: `Old password was incorrect`,
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position: 'top-center',
                            })

                        } else if (data.message && data.message === 'success') {
                            toast({
                                message: `Password was changed Successfully`,
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position: 'top-center',
                            })
                        }
                    })
                    .catch(error => {
                        this.changePassword = {
                            old: '',
                            new: '',
                            confirm: ''
                        }
                        this.$root.showLoader = false;
                        toast({
                            message: `${error}`,
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position: 'top-center',
                        })
                    })
                
            }
        },
        validateLocation() {
            return true;
        },
        async sendRequest() {
            var arrival;
            if (this.requestForm.exeat_type == 'short') {
                arrival = this.requestForm.departure
            } else {
                arrival = this.requestForm.arrival
            }
            const data = {
                token: this.authtoken,
                exeat_description: this.requestForm.exeat_description,
                departure_date: this.requestForm.departure,
                arrival_date: arrival,
                exeat_duration:this.requestForm.exeat_type
            }
            console.log(data)
            await axios
                .post('api/v1/forms', data)
                .then(response => {
                    this.showForm = false;
                    const data = response.data;
                    this.requestForm = {
                        departure: '',
                        arrival: '',
                        exeat_type: '',
                        exeat_description: '',
                    }
                    
                    if (data.message && data.message === 'no_auth') {
                        //this.forceLogout();
                    } else {
                        if (data.message === "form_limit_reached") {
                            toast({
                                message: `Daily Form Limit Reached`,
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position: 'top-center',
                            })
                       }
                        else if (data.message === "success") {
                            toast({
                                message: `Form Sent Successfully`,
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position: 'top-center',
                            })
                            this.getRequests(this.currentFormPage);
                            
                       }
                    }

                    
                })
                .catch(error => {
                    this.showForm = false;
                    if (error.response) {
                        for (const property in error.response.data) {
                            toast({
                                message: `${error}`,
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position: 'top-center',
                            })
                        }
                    }
                })
        },
        async getRequests(page) {
            if (this.currentFormPage != page || !this.recentForms) {
                this.isTableLoading = true;
               
            }

            if (!this.recentForms) {
                page = this.$store.state.currentFormPage
                console.log("wwwwww", page)
            }

           
            if (this.userData) {
                var form_order_by;
                var order_by;
                if (this.userData.usercat == 'student') {
                    this.formOrder = "recent";
                    form_order_by = 'recent'
                    order_by = 'recent'
                     
                } else {
                    var dept = this.formOrder.dept
                    var colleges = this.formOrder.college
                    var college = '';
                    if (colleges) {
                        for (var x in colleges) {
                            college = x;
                            break;
                        }
                    }
                    var level = this.formOrder.level
                    var status = this.formOrder.status
                    order_by = this.formOrder.order_by
                    form_order_by = `&order_by=${order_by}&dept=${dept}&college=${college}&level=${level}&status=${status}`;
                }

                console.log(this.userData.usercat, this.formOrder)
                const token = this.authtoken;

                await axios
                    .get("api/v1/forms?" + form_order_by + "&token=" + token + "&page=" + page)
                    .then(response => {
                    
                        this.isTableLoading = false;
                        const data = response.data
                        
                        if (data.message && data.message === 'no_auth') {
                            //this.forceLogout();
                        } else {
                            
                            this.recentForms = data.data;
                            this.freshly_deleted = [];
                            this.pages = data.total_pages;
                            this.currentFormPage = data.page;
                            this.$store.commit('setCurrentFormPage', data.page);

                        }
                    })
                    .catch(error => {
                        this.isTableLoading = false;
                        console.log('error')
                    })
            }
        },
        async approve_or_reject(uuid, matric, command, remarks) {
            const data = {
                token: this.authtoken,
                uid: uuid,
                student_matric: matric,
                remarks: remarks,
                action:command
            }

            await axios
                .post('api/v1/forms/task', data)
                .then(response => {
                    const data = response.data
                    if (data.message && data.message === 'no_auth' || data.message === 'unauthorized') {
                        //this.forceLogout();
                    } else if (data.message && data.message === 'successful') {
                        toast({
                            message: `Successful`,
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position: 'top-center',
                        })
                        this.showDetails = false;
                        this.stateReason = false;
                        this.freshly_deleted.push(uuid);
                        this.getUserData();
                    }
                })
                .catch(error => {
                    toast({
                        message: `An Error Occured. Please Check your connection and try again`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 3000,
                        position: 'top-center',
                    })
                    this.showDetails = false;
                    this.stateReason = false;
                })
        },
        async cancelRequest(uuid) {
            this.$root.showLoader = true;
            const data = {
                token:this.authtoken,
                uid:uuid,
            }

            await axios
                .post('api/v1/forms/cancel', data)
                .then(response => {
                    const data = response.data
                    if (data.message && data.message === 'no_auth') {
                        //this.forceLogout();
                    } else {
                        this.$root.showLoader = false;
                        toast({
                            message: `Form Cancelled Successfully`,
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position: 'top-center',
                        })
                        this.showDetails = false;
                        this.getRequests(this.currentFormPage);
                        
                        this.getUserData();
                    }
                })
                .catch(error => {
                    this.$root.showLoader = false;
                    toast({
                        message: `An Error Occured. Please check Your Connection and try again`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 3000,
                        position: 'top-center',
                    })
                    console.log('error')
                })
        }

    },
    beforeUnmount() {
        clearInterval(this.timer1)
    },
    unmounted() {
        clearInterval(this.timer1);
    }

}
</script>

<style lang="scss">
    .right{
        
        &.profile{
            
            margin-top:6rem;
        }
    }

    button.active-page{
        border: 1px solid var(--primary);
        
    }
    .filter-by{
        margin:.5rem 0;
        display:flex;
        
    }
    .filter-by .filter-field h3{
        margin-left: .5rem;
    }

    .filter-by select{
        margin: .5rem;
        width:100%;
        max-width:5rem;
    }

    @media screen and (min-width:768px) {
        .filter-by select{
            margin: 1.5rem;
            width:100%;
            max-width:8rem;
        }
    }
    .imagebox{
        width:100%;
        max-height:10rem;
        display:flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin:.5rem 0;
    }
    .imagebox img{
        width:10rem;
        border-radius:50%;
    
    }
    .imagebox .img{
        padding:.5rem;
        margin:.5rem;
        border-radius:50%;
    }

    .modal .modal-content .field.pop-up{
        text-align: center;
        width:100%;
        display:flex;
        flex-direction: column;
    }
    .field.pop-up h3{
        font-size: 1.5rem;
        color:var(--warning);
    }
    .field.pop-up h4{
        font-size: 1rem;
        color:var(--info-dark);
    }
    
</style>