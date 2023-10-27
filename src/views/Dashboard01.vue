<template>

    <main :class="`${userData.usercat}`">
        <h1>Dashboard</h1>
       
        <div  v-if="$store.state.userData.usercat=='student'" class="item add-product" id="create-request" @click="showForm = true" >
            <div>
                <span class="material-symbols-rounded">add</span>
                <h3>Create Request</h3>
            </div>
        </div>

        <div class="insights"  v-if="$store.state.userData.usercat != 'superuser' && $store.state.userData.usercat != 'security'">
            <div class="sales">
                <span class="material-symbols-rounded">pending_actions</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Pending Requests</h3>
                        <h1>{{ userData.pendingexeats }}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.pendingexeats)/
                                (
                                    parseInt(userData.pendingexeats)+
                                    parseInt(userData.approvedexeats)+
                                    parseInt(userData.rejectedexeats)
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="pendingrequests">{{ `${(parseInt(userData.pendingexeats)/(parseInt(userData.pendingexeats)+parseInt(userData.approvedexeats)+parseInt(userData.rejectedexeats)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                        </div>
                    </div>
                </div>
               
                <small class="text-muted">Since {{moment(`${userData.date_added}`).fromNow()}}</small>
            </div>



            
            <div class="expenses">
                <span class="material-symbols-rounded">check_box</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Approved Requests</h3>
                        <h1>{{ userData.approvedexeats}}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.approvedexeats)/
                                (
                                    parseInt(userData.pendingexeats)+
                                    parseInt(userData.approvedexeats)+
                                    parseInt(userData.rejectedexeats)
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="approvedrequests">{{ `${(parseInt(userData.approvedexeats)/(parseInt(userData.pendingexeats)+parseInt(userData.approvedexeats)+parseInt(userData.rejectedexeats)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                       
                        </div>
                    </div>
                </div>
                <small class="text-muted">Since {{moment(`${userData.date_added}`).fromNow()}}</small>
            </div>



            <div class="income">
                <span class="material-symbols-rounded">dangerous</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Rejected Requests</h3>
                        <h1>{{userData.rejectedexeats}}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.rejectedexeats)/
                                (
                                    parseInt(userData.pendingexeats)+
                                    parseInt(userData.approvedexeats)+
                                    parseInt(userData.rejectedexeats)
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="rejectedrequests">{{ `${(parseInt(userData.rejectedexeats)/(parseInt(userData.pendingexeats)+parseInt(userData.approvedexeats)+parseInt(userData.rejectedexeats)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                        </div>
                    </div>
                </div>
                <small class="text-muted">Since {{moment(`${userData.date_added}`).fromNow()}}</small>
            </div>

        </div>

        <div class="insights"  v-if="$store.state.userData.usercat == 'security' ">
            <div class="expenses">
                <span class="material-symbols-rounded">check_box</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Cleared Students</h3>
                        <h1>{{ userData.cleared }}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.cleared)/
                                (
                                    parseInt(userData.cleared)+
                                    parseInt(userData.awaiting)
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="pendingrequests">{{ `${(parseInt(userData.cleared)/(parseInt(userData.cleared)+parseInt(userData.awaiting)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                        </div>
                    </div>
                </div>
               
                <small class="text-muted">Since Yesterday</small>
            </div>



    
            <div class="sales">
                <span class="material-symbols-rounded">pending_actions</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Awaiting Clearance</h3>
                        <h1>{{ userData.awaiting}}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.awaiting)/
                                (
                                    parseInt(userData.cleared)+
                                    parseInt(userData.awaiting)
                                    
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="approvedrequests">{{ `${(parseInt(userData.awaiting)/(parseInt(userData.awaiting)+parseInt(userData.cleared)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                       
                        </div>
                    </div>
                </div>
                <small class="text-muted">For Today</small>
            </div>

           

        </div>

        <div class="insights"  v-else-if="$store.state.userData.usercat == 'superuser' ">
            <div class="sales">
                <span class="material-symbols-rounded">pending_actions</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Active User Accounts</h3>
                        <h1>{{ userData.activeusers }}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.activeusers)/
                                (
                                    parseInt(userData.totalusers)
                                   
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="pendingrequests">{{ `${(parseInt(userData.activeusers)/parseInt(userData.totalusers))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                        </div>
                    </div>
                </div>
               
                <small class="text-muted">Since {{moment(`${userData.date_added}`).fromNow()}}</small>
            </div>



            
            <div class="expenses">
                <span class="material-symbols-rounded">check_box</span>
                <div class="middle">
                    <div class="lef">
                        <h3>Pending Tickets</h3>
                        <h1>{{ userData.pendingtickets}}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.pendingtickets)/
                                (
                                    parseInt(userData.activeusers)+
                                    parseInt(userData.pendingtickets)+
                                    parseInt(userData.completedtickets)
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="approvedrequests">{{ `${(parseInt(userData.pendingtickets)/(parseInt(userData.activeusers)+parseInt(userData.pendingtickets)+parseInt(userData.completedtickets)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                       
                        </div>
                    </div>
                </div>
                <small class="text-muted">Since {{moment(`${userData.date_added}`).fromNow()}}</small>
            </div>



            <div class="income">
                <span class="material-symbols-rounded">dangerous</span>
                <div class="middle">
                    <div class="lef">
                        <h3></h3>
                        <h1>{{userData.completedtickets}}</h1>
                    </div>
                    <div class="progress">
                        <svg>
                            <circle cx="38" cy="38" r="36" :style="
                            `stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.completedtickets)/
                                (
                                    parseInt(userData.activeusers)+
                                    parseInt(userData.pendingtickets)+
                                    parseInt(userData.completedtickets)
                                )
                                    ) * 100}) / 100);`">
                            </circle>
                        </svg>
                        <div class="number">
                            <p id="rejectedrequests">{{ `${(parseInt(userData.completedtickets)/(parseInt(userData.activeusers)+parseInt(userData.pendingtickets)+parseInt(userData.completedtickets)))*100 || 0}`.split('.')[0] }}</p><p>%</p>
                        </div>
                    </div>
                </div>
                <small class="text-muted">Since {{moment(`${userData.date_added}`).fromNow()}}</small>
            </div>

        </div>

        <div class="recent-orders" v-if="$store.state.userData.usercat != 'student'">
            
        </div>

        <div class="recent-orders" v-if="$store.state.userData.usercat != 'admin' ">
           <div class="rc" style="margin:0 0 2rem 0">
            <h2 v-if="$store.state.userData.usercat != 'student'">Search Requests</h2>
            <div class="field" v-if="$store.state.userData.usercat != 'student'">
                <input type="text" placeholder="Enter Request ID / Matric No. " maxlength="50" v-model="searchedText" v-on:keyup.enter="SearchRequest()">
                <div class="searchbutton">
                    <span @click="SearchRequest()">Search</span>
                </div>
                
            </div>
           </div>
            <h2>Recent Requests</h2>

            <div class="pagination" v-if="isShowAll">
             
                <p>Pages {{ currentFormPage }} of {{ pages }}</p>
                    
                <div class="pagination-row">
                    
                    <div class="items">
                        <button class="pagination-button" :disabled="currentFormPage<=1" :class="{'disabled':currentFormPage<=1}" @click="isButtonClicked = true;showPages(currentFormPage-1)">&lt;</button>
                    
                    </div>

                    <div class="items scrollable">
                        <span v-for="(item, index) in pages" :key="index">
                            <button class="pagination-button" @click="isButtonClicked = true;showPages(item)">{{ item }}</button>
                            
                        </span>
                    </div>
            
                    <div class="items">
                        <button class="pagination-button" :disabled="currentFormPage>=pages" :class="{'disabled':currentFormPage>=pages}" @click="isButtonClicked = true;showPages(currentFormPage+1)">&gt;</button>
                    </div>
                   <slot />
                    
                </div>
            </div>


                <div style="max-height:20rem;overflow-y:scroll;max-width:fit-content;border-radius:var(--card-border-radius);box-shadow: var(--box-shadow);" v-if="$store.state.userData.usercat == 'student'">
                    <table id="request-table">
                        <div class="table-loader" :class="{'load':isTableLoading}">
                            <div class="loader"></div>
                        </div>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Exeat Type</th>
                                <th>Request Description</th>
                                <th>Date Sent</th>
                                <th>Departure Date</th>
                                <th>Arrival Date</th>
                                <th>Porter's Status</th>
                                <th>Student's Affairs Status</th>
                                <th>Final Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="form in recentForms" v-if="recentForms" :key="form"  style="overflow-x:scroll;width:100%;">
                                <td>CULEXT{{ form.id }}</td>
                                <td>{{ form.exeat_type }}</td>
                                <td>{{ form.exeat_description.split('').slice(0,17).join("") }}...</td>
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
                                
                                <td v-if="form.statusPorter==1" class="success">Approved</td>
                                <td v-else-if="form.statusPorter==2" class="danger">Rejected</td>
                                <td v-else class="warning">Pending</td>
                                
                                <td v-if="form.statusStudentAffairs==1" class="success">Approved</td>
                                <td v-else-if="form.statusStudentAffairs==2" class="danger">Rejected</td>
                                <td v-else class="warning">Pending</td>
                                
                                <td v-if="form.iscancelled" class="danger">Cancelled</td>
                                <td v-else-if="form.iscleared" class="success">Cleared by Security</td>
                                <td v-else-if="form.statusPorter==1 && form.statusStudentAffairs==1" class="success">Approved</td>
                                <td v-else-if="form.statusPorter==2 || form.statusStudentAffairs==2" class="danger">Rejected</td>
                                <td v-else-if="form.statusPorter==0 || form.statusStudentAffairs==0" class="warning">Pending</td>
                                
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
                                        remarks:form.remarks,
                                    }">Details</td>
                            </tr>
                            
                           
                           
                           
                        </tbody>
                    </table>
                </div>
           


                <div style="max-height:20rem;overflow-y:scroll;box-shadow: var(--box-shadow);border-radius:var(--card-border-radius)" v-if="$store.state.userData.usercat == 'porter'">
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
                            
                            <tr v-for="form in recentForms" v-if="recentForms" :key="form"  style="overflow-x:scroll;width:100%;" :id="`formpk${form.id}`">
                                
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
           


                <div style="max-height:20rem;overflow-y:scroll;box-shadow: var(--box-shadow);border-radius:var(--card-border-radius)" v-if="$store.state.userData.usercat == 'saffairs'">
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
                            
                            <tr v-for="form in recentForms" v-if="recentForms" :key="form"  style="overflow-x:scroll;width:100%;" :id="`formpk${form.id}`">
                                
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
           



            <span class="view-all" @click="isShowAll = true;$store.commit('modifyShowAll',true)" v-if="!isShowAll && pages>1">Show All</span>
            <span class="view-all" @click="isShowAll = false;$store.commit('modifyShowAll',false);isButtonClicked = true;showPages(1);" v-if="isShowAll">Show Recent</span>
        </div>

        
        <!--==========================MODALS==========================-->
    

        <div class="modal" :class="{'showform':showDetails}" v-if="showDetails && userData.usercat=='student'">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="showDetails=false;modalViewForm={}">close</span>
                </div>

                <div class="details">
                    <div class="heading">
                        <h2>Details for <b>CULEXT{{ modalViewForm.id }}</b>:</h2>
                    </div>
                    <h3>Exeat Type: <span>{{ modalViewForm.exeat_type }}</span></h3>
                    <h3>Time Sent: <span> {{moment(`${modalViewForm.date_added}`).fromNow()}}</span></h3>
                    <h3>Request Description: <span>{{modalViewForm.description}}</span></h3>
                    <h3>Departure Date: <span :class="{'danger':today > modalViewForm.departure}">
                        {{ months[parseInt(`${modalViewForm.departure}`.split('T')[0].split('-').reverse()[1])-1] }}
                        {{ `${modalViewForm.departure}`.split('T')[0].split('-').reverse()[0] }}
                        {{ `${modalViewForm.departure}`.split('T')[0].split('-').reverse()[2] }} 
                    </span></h3>
                    <h3>Arrival Date: <span>
                        {{ months[parseInt(`${modalViewForm.arrival}`.split('T')[0].split('-').reverse()[1])-1] }}
                        {{ `${modalViewForm.arrival}`.split('T')[0].split('-').reverse()[0] }}
                        {{ `${modalViewForm.arrival}`.split('T')[0].split('-').reverse()[2] }} 
                    </span></h3>
                    <h3>Porter's Approval: 
                        <span v-if="modalViewForm.statusPorter==1" class="success">Approved</span>
                        <span v-else-if="modalViewForm.statusPorter==2" class="danger">Rejected</span>
                        <span v-else class="warning">Pending</span>
                    </h3>
                    <h3>Student's Affairs Approval: 
                        <span v-if=" modalViewForm.statusStudentAffairs==1" class="success">Approved</span>
                        <span v-else-if="modalViewForm.statusStudentAffairs==2" class="danger">Rejected</span>
                        <span v-else class="warning">Pending</span>
                    </h3>

                    <h3 style="margin:1rem 0" class="danger">{{modalViewForm.remarks }}</h3>
                    <h3 class="success" v-if="modalViewForm.iscleared" style="text-align:center">You've been Cleared by Security</h3>
                    <h3 class="danger" v-else-if="modalViewForm.iscancelled" style="text-align:center">Request has been Cancelled !!!</h3>
                    <h3 class="danger" v-else-if="modalViewForm.statusPorter == 0 && modalViewForm.statusStudentAffairs == 0" style="margin-top:2rem;cursor:pointer;" @click="cancelRequest(modalViewForm.id)">Cancel Request</h3>
               
                    <h3 class="danger" style="text-align:center" v-if="today > modalViewForm.departure && modalViewForm.iscancelled">Departure date Exceeded !!!</h3>
                </div>

                
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
                    <h3 v-if="$store.state.userData.usercat=='porter'">Student's Affairs Approval: 
                        <span v-if=" modalViewForm.statusStudentAffairs==1" class="success">Approved</span>
                        <span v-else-if="modalViewForm.statusStudentAffairs==2" class="danger">Rejected</span>
                        <span v-else class="warning">Pending</span>
                    </h3>
                    <h3 v-if="$store.state.userData.usercat=='saffairs'">Porter's Approval: 
                        <span v-if=" modalViewForm.statusPorter==1" class="success">Approved</span>
                        <span v-else-if="modalViewForm.statusPorter==2" class="danger">Rejected</span>
                        <span v-else class="warning">Pending</span>
                    </h3>

                    <h3 v-if="$store.state.userData.usercat=='porter' && modalViewForm.statusPorter == 0" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;"> 
                        <span class="success" @click="approve_or_reject(modalViewForm.id,modalViewForm.matric_no, 'approve','')">Approve Request</span>
                        <span class="danger" @click="stateReason=true;requestSelect={
                            remarks:'',
                            formID:modalViewForm.id,
                            matric_no:modalViewForm.matric_no
                        }">Reject Request</span>
                    </h3>
                    <h3 v-if="$store.state.userData.usercat=='saffairs' && modalViewForm.statusStudentAffairs == 0" style="width:100%;display:flex;justify-content:space-between;margin-top:2rem;" > 
                        <span class="success" @click="approve_or_reject(modalViewForm.id,modalViewForm.matric_no, 'approve','')">Approve Request</span>
                        <span class="danger" @click="stateReason=true;requestSelect={
                            remarks:'',
                            formID:modalViewForm.id,
                            matric_no:modalViewForm.matric_no
                        }">Reject Request</span>
                    </h3>



                    <h3 v-if="modalViewForm.iscancelled" class="danger">Request was Cancelled</h3>
                    <h3 style="margin-top:-1rem;font-size:1rem;display:flex;flex-direction:column" v-if="isSearchActive && modalViewForm.iscleared == false && modalViewForm.iscancelled==false">
                        
                       <div v-if="$store.state.userData.usercat=='porter'">
                            <h3 v-if="modalViewForm.statusPorter==1">Porter's Approval: <span class="success">Approved</span></h3>
                            <h3 v-else-if="modalViewForm.statusPorter==2">Porter's Approval: <span class="danger">Rejected</span></h3>
                            <span style="margin-top:1rem;" class="success" v-if="modalViewForm.statusPorter==1">You Have Approved This Request <span class="danger" style="text-decoration: underline;" @click="stateReason=true;requestSelect={
                                remarks:'',
                                formID:modalViewForm.id,
                                matric_no:modalViewForm.matric_no
                            }">Reject?</span></span>
                            <span style="margin-top:1rem;" class="danger" v-if="modalViewForm.statusPorter==2">You Have Rejected This Request <span class="success" style="text-decoration: underline;" @click="approve_or_reject(modalViewForm.id,modalViewForm.matric_no, 'approve','')">Approve?</span></span>
                       </div>

                       <div v-if="$store.state.userData.usercat=='saffairs'">
                            <h3 v-if="modalViewForm.statusStudentAffairs==1">Students Affairs Approval: <span class="success">Approved</span></h3>
                            <h3 v-else-if="modalViewForm.statusStudentAffairs==2">Students Affairs Approval: <span class="danger">Rejected</span></h3>
                            <span style="margin-top:1rem;" class="success" v-if="modalViewForm.statusStudentAffairs==1">You Have Approved This Request <span class="danger" style="text-decoration: underline;" @click="stateReason=true;requestSelect={
                                remarks:'',
                                formID:modalViewForm.id,
                                matric_no:modalViewForm.matric_no
                            }">Reject?</span></span>
                            <span style="margin-top:1rem;" class="danger" v-if="modalViewForm.statusStudentAffairs==2">You Have Rejected This Request <span class="success" style="text-decoration: underline;" @click="approve_or_reject(modalViewForm.id,modalViewForm.matric_no, 'approve','')">Approve?</span></span>
                       </div>



                    </h3>

                </div>

                
            </div>
        </div>

        <div class="modal showform" v-if="stateReason">
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

        <div class="modal" :class="{'showform':showForm}" v-if="$store.state.userData.usercat=='student' && showForm">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="showForm=false;
                    requestForm={
                        departure:'',
                        arrival:'',
                        exeat_type:'',
                        exeat_description:'',
                    }">close</span>
                </div>
                <h2>Create Request</h2>
                <span class="danger" v-if="this.$store.state.userData.forms_left_for_today == 0" style="text-align: center;width:100%;">Daily Request Sending Limit Reached</span>
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
                            <tr v-if="requestForm.exeat_type=='short'">
                                <td><label for="">Departure Date</label></td>
                                <td>  <input type="date" name="" id="" :min="requestForm.arrival || today"  v-model="requestForm.departure"></td>
                            </tr>
                            <tr v-else>
                                <td><label for="">Departure Date</label></td>
                                <td>  <input type="date" name="" id="" :min="requestForm.arrival || today" :max="requestForm.arrival" v-model="requestForm.departure"></td>
                            </tr>
                            <tr v-if="requestForm.exeat_type=='short'">
                                <td> <label for="">Arrival Date</label></td>
                                <td> <input type="date" name="" id="" :min="requestForm.arrival || today" v-model="requestForm.departure"></td>
                            </tr>
                            <tr v-else>
                                <td> <label for="">Arrival Date</label></td>
                                <td>  <input type="date" name="" id="" :min="requestForm.departure || today"  v-model="requestForm.arrival"></td>
                            </tr>
                        </table>
                    </div>

                    <div class="item field" @click="sendRequest">
                        <span class="button">Submit</span>
                    </div>
    
                </div>
            </div>
        </div>

        <div class="modal" :class="{'showform': showPasswordChangeModal}" v-if="showPasswordChangeModal">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="showPasswordChangeModal=false;changePassword={old:'',new:'',confirm:''}">close</span>
                </div>
                <h2>Change Password</h2>
                <div class="details" id="profileformdetails">
                    <div class="field">
                        <input type="password" placeholder="Old Password" v-model="changePassword.old">
                        
                    </div>
                    <div class="field compare">
                        <input type="password" placeholder="New Password" v-model="changePassword.new">
                        <span class="material-symbols-rounded success" v-if="changePassword.new && changePassword.new.length>=8">check</span>
                        <span class="material-symbols-rounded danger" v-else-if="changePassword.new && changePassword.new.length < 8">close</span>
                    </div>
                    <div class="field compare">
                        <input type="password" placeholder="Confirm New Password" v-model="changePassword.confirm">
                        <span class="material-symbols-rounded success" v-if="changePassword.new === changePassword.confirm && changePassword.new && changePassword.confirm.length >=8 " >check</span>
                        <span class="material-symbols-rounded danger" v-else>close</span>
                    </div>

                    <div class="item field" @click="changeUserPassword" v-if="changePassword.new === changePassword.confirm && changePassword.new && changePassword.confirm.length >= 8 && changePassword.old">
                        <span class="button">Submit</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" :class="{'showform':showProfileImageChangeModal}" v-if="showProfileImageChangeModal">
            <div class="modal-content">
                <div class="close">
                    <span class="material-symbols-rounded" @click="showProfileImageChangeModal=false;">close</span>
                </div>

                <div class="details">
                    <div class="field">
                        <p style="margin-left:.5em;padding-bottom:2em;">Add/Edit Profile Image (file should not be more than {{ imageUploadSize }}MB )</p>
                        <div class="progress" style="margin:0 0 1rem 0;display:none" ><progress :value="progress" max="100"></progress><span style="margin-left:1rem;color:var(--dark)">{{ progress }}%</span></div>
                        
                        <input type="file" accept="image/*" ref="file" style="border:none;margin-top:-1em;"  @change="selectFile">
                     </div>
                </div>


            </div>
        </div>

        
        <!--==========================MODALS END==========================-->


        <main v-if="isWarningMessage">
			<div class="modal showform" style="display:grid;place-items:center;" >
				<div class="modal-content">
					<div class="details">
						<div class="field" style="text-align: center;">
							<h2 class="warning">Hey, Are You Still There?</h2>
						</div>
					</div>
				</div>
			</div>
		</main>

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

        <Topnav></Topnav>

        <div class="recent-updates" v-if="recentEvents.length>=1" :class="`${userData.usercat}`">
            <h2>Recent Events</h2>
            <div class="updates" :class="{'expand':showAllEvents}" id="events">

                <div class="update" v-for="events in recentEvents" :key="events" v-if="recentEvents">
                    
                    <div class="profile-photo" v-if="events.sender_img=='self'">
                        <img :src="this.userData.get_image_url" alt="" >
                    </div>

                    <div class="profile-photo" v-else-if="events.sender_img">
                        <img :src="events.sender_img || '../assets/profile.png'" alt="" >
                    </div>
                    <div class="profile-photo" v-else>
                        <span class="material-symbols-rounded">person</span>
                    </div>

                    <div class="message">
                        <p> 
                            <span v-if="events.tag=='danger'" class="danger">{{ events.notification }}</span> 
                            <span v-else-if="events.tag=='success'" class="success">{{ events.notification }}</span> 
                            <span v-else>{{ events.notification }}</span> 
                           
                        </p>
                        <small class="text-muted">{{ moment(`${events.date_added}`).fromNow()}}</small>
                       
                    </div>

                    
                </div>



                

            </div>
            
        </div>


        <div id="profile-page" v-if="userData.usercat == 'student'"><span v-if="$root.showprofile"></span>
            <div class="recent-updates" v-if="$root.showprofile" >
                
                <h2>My Profile</h2>
                <div class="updates">
                    <div class="close">
                        <span class="material-symbols-rounded" @click="$root.showprofile = false;"><a href="#" style="color:var(--danger)">close</a></span>
                    </div>
                    <table>
                        <tr><td>Fullname:</td><td class="greyout"> {{ userData.lastname}} {{ userData.firstname }} {{ userData.middlename }}</td></tr>
                        <tr><td>Matric No:</td><td class="greyout">{{ userData.username }}</td></tr>
                        <tr><td>Hostel:</td><td class="greyout">{{ userData.hostel }}</td></tr>
                        <tr><td>Level</td><td class="greyout">{{ userData.studentInfo.level }}</td></tr>
                        <tr><td>Phone Number</td><td class="greyout">{{ userData.phonenumber }}</td></tr>
                        <tr><td>Department</td><td class="greyout">{{ userData.studentInfo.department }}</td></tr>
                        <tr><td>College</td><td class="greyout">{{ userData.studentInfo.college }}</td></tr>
                        
                        <tr><td>Home Address</td><td class="greyout">{{ userData.studentInfo.home_address }}</td></tr>
                    </table>

                    <div class="change-password-btn">
                        
                        
                       <!-- <span class="primary" style="cursor:pointer;" @click="showProfileImageChangeModal=true">Change Profile Photo</span>  -->
                        <span class="primary" style="cursor:pointer;" @click="showPasswordChangeModal=true">Change User Password</span>
                    </div>
                </div>
                
            </div>
        </div>
        

       
    
    </div>




   


</template>

<script>
import axios from 'axios'
import $ from 'jquery';
import '../../public/jquery.timeago.js'

import { toast }  from 'bulma-toast'

import Topnav from '@/components/Topnav.vue'

import { nextTick } from 'vue';

import store from '../store/index'

import { watch, ref } from 'vue';

var moment = require('moment')

export default {
    name: 'Dashboard',

    components: {
        Topnav,
       
    },
    data(){
        return {
            months:[
                'January','February',"March","April",
                'May',"June","July","August","September",
                "October","November","December"
            ],
            moment:moment,
            today:'',
            recentForms:[],
            recentEvents:[],
            modalViewForm:{},
            showDetails:false,
            showAllEvents:false,
            isShowAll: this.$store.state.isShowAll || false,
            showForm:false,
            showPasswordChangeModal:false,
            showProfileImageChangeModal:false,
            userData:'',
            counts:{
                pendingexeats:0,
                approvedexeats:0,
                rejectedexeats:0,
            },
            requestForm:{
                departure:'',
                arrival:'',
                exeat_type:'',
                exeat_description:'',
            },
            currentFormPage: this.$store.state.currentFormPage || 1,
            pages:0,
            isTableLoading:false,
            document:null,
            imageUploadSize:1,
            progress:70,
            isButtonClicked:true,
            changePassword:{
                old:'',
                new:'',
                confirm:''
            },
            stateReason:false,
            requestSelect:{
                remarks:'',
                formID:'',
                matric_no:''
            },
            events:['click','mousemove','mousedown','scroll','keypress','load'],
			warningTimer:null,
			logoutTimer:null,
			isWarningMessage:false,
            timer:null,
            searchedText:'',
            isSearchActive:false,
            
        }
    },
    mounted(){
        
        

        

        this.$store.commit('setCurrentPage', 'dashboard')
        this.$root.showSidebar = false;
        this.$root.showLoader = true
        this.getTodaysDate();
        this.getUserData();
        this.showPages(this.currentFormPage);
        this.getEvents();

        

        if(this.$store.state.userData.usercat != 'superuser'){
            this.timer = setInterval(() => {
            this.getUserData();
            this.getEvents();
            this.showPages(this.currentFormPage);
           },
            5000
        )
        }

        

       
    },
    destroyed() {
		

        
	},
    updated(){
    
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
        checkIfLoggedIn(){
			if(!JSON.parse(localStorage.getItem('auth'))){
				this.cancelRefresh();
                this.$root.logout()
			}
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
        async approve_or_reject(formid, matric_no, command, remarks){
            const selectData = {
                token:this.$store.state.token,
                form_id:formid,
                command:command,
                remarks:remarks,
                hostel:this.userData.hostel,
                username:this.userData.username,
                matric_no:matric_no,
                img_url:this.userData.get_image_url,
                usercat:this.userData.usercat
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
                        document.querySelector(`#formpk${formid}`).style.display='none';
                    
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
        async showPages(page){
            if(this.isButtonClicked){
                this.isTableLoading = true
            }
            
            await axios
            .get(`api/v1/recent-forms/${this.$store.state.token}00x00x001000x00x00all00x00x00all00x00x00all?page=${page}`)
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
        
        convertDate(date){
            var newDate = `${date}`.replace('T', ' ').replace('Z', '')
            return newDate
        },
        getTodaysDate(){
            var tod = new Date()
            var day = tod.getDate()
            var month = tod.getMonth()+1
            var year = tod.getFullYear()

            if(`${month}`.length == 1){
                month = `0${month}`
            }
            if(`${day}`.length == 1){
                day = `0${day}`
            }

            this.today = `${year}-${month}-${day}`

        },
        async getRequests (page){
            this.isTableLoading = true
            await axios
                .get(`/api/v1/recent-forms/${this.$store.state.token}?page=${page}`)
                .then(response => {
                    this.recentForms = response.data;
                    this.isTableLoading = false
                    this.$root.pendingcountbanner = this.recentForms.length
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async getUserData (){
            await axios
                .get(`/api/v1/user-data/${this.$store.state.token}`)
                .then(response => {
                    this.$root.showLoader = false
                    this.userData = response.data;
                    console.log(this.userData)
                    const requestCounts = this.userData.get_request_counts
                    
                    if (this.userData.usercat != 'superuser' && this.userData.usercat != "security"){
                        this.userData.pendingexeats = requestCounts.pending
                        this.userData.approvedexeats = requestCounts.approved
                        this.userData.rejectedexeats = requestCounts.rejected
                    } else if(this.userData.usercat == 'superuser'){
                        this.userData.totalusers = requestCounts.user_count
                        this.userData.activeusers = requestCounts.activeusers
                        this.userData.pendingtickets = requestCounts.pendingtickets
                        this.userData.completedtickets = requestCounts.completedtickets
                    } else if(this.userData.usercat == 'security'){
                        this.userData.cleared = requestCounts.cleared
                        this.userData.awaiting = requestCounts.awaiting
                    }
                
                    this.$store.commit('setUserData',this.userData)
                })
                .catch(error => {
                    this.$root.showLoader = true
                    this.checkIfLoggedIn()
                })
        },
        async sendRequest(){

            if(this.$store.state.userData.forms_left_for_today != 0){
                if(this.requestForm.exeat_type=='short'){
                this.requestForm.arrival = this.requestForm.departure
            }
            if(!this.requestForm.exeat_description || !this.requestForm.exeat_type || !this.requestForm.arrival || !this.requestForm.departure){
                toast({
                    message: 'Complete All Fields',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: 'true',
                    duration: 3000,
                    position:'top-center',
                })
            }
            else {
                const formdata = {
                token:this.$store.state.token,
                matric_no:this.userData.username,
                description:this.requestForm.exeat_description,
                departure_date:this.requestForm.departure,
                arrival_date:this.requestForm.arrival,
                exeat_type:this.requestForm.exeat_type,
                userdata:{
                    get_image_url:this.userData.get_image_url,
                    phonenumber:this.userData.phonenumber,
                    hostel:this.userData.hostel,
                    firstname:this.userData.firstname,
                    middlename:this.userData.middlename,
                    lastname:this.userData.lastname,
                    forms_left_for_today:this.userData.forms_left_for_today,
                    }
                }

                await axios
                .post('api/v1/form/create/', formdata)
                .then(response => {
                    this.showForm=false
                    this.requestForm = {
                        departure:'',
                        arrival:'',
                        exeat_type:'',
                        exeat_description:'',
                    }
                
                    if (response.data.message == 'success'){
                        toast({
                                message: 'Request Sent Successfully',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                            this.counts.pendingexeats+=1
                    }
                    document.getElementById('request-table').scrollIntoView()
            
                    this.showPages(this.currentFormPage)

                })
                .catch(error => {
                    console.log(error || 'error')
                })

                }
            } else {
                toast({
                        message: 'Daily Form Limit Reached',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 3000,
                        position:'top-right',
                    })
                        
            }
        },
        async cancelRequest(id){
        const data = {
                    form_id:id,
                    username:this.$store.state.userData.username
                }
            await axios 
                .post('api/v1/form/cancel-form/', data)
                .then(response => {
                    const result = response.data
                    
                    if(result.message == 'success'){
                        toast({
                                message: 'Request Cancelled Successfully',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                        this.counts.pendingexeats-=1
                        
                           
                    }
                    else {
                        toast({
                                message: `${response.data.message}`,
                                type: 'is-danger',
                                dismissible: true,
                                pauseOnHover: 'true',
                                duration: 3000,
                                position:'top-right',
                            })
                        
                    }


                    this.showPages(this.currentFormPage);
                })
                .catch(error => {
                    toast({
                            message: `Form Cancellation Failed`,
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: 'true',
                            duration: 3000,
                            position:'top-right',
                        })
                       
                })


                this.showDetails = false;
        },
        async changeUserPassword(){
            if(this.changePassword.new !== this.changePassword.confirm || !this.changePassword.new || this.changePassword.confirm.length < 8 || !this.changePassword.old){
                console.log('waaaa')
            }
            if(!this.changePassword.old || !this.changePassword.new || !this.changePassword.confirm){
                toast({
                    message: `Complete All fields`,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: 'true',
                    duration: 3000,
                    position:'top-right',
                })
            } else {
                if(this.changePassword.old === this.changePassword.new){
                    toast({
                        message: `Old Password Cant be he same as New Password`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 388000,
                        position:'top-right',
                    })
                }
                else if(this.changePassword.new.length < 8){
                    toast({
                        message: `Password Must be at least 8 characters Long`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: 'true',
                        duration: 3000,
                        position:'top-right',
                    })
                }
                else {
                    const passwordChangeData = {
                        token:this.$store.state.token,
                        old_password:this.changePassword.old,
                        new_password:this.changePassword.new,
                        username:this.userData.username
                    }
                    this.$root.showLoader = true;
                    await axios 
                        .post('api/v1/user/change/change-password/', passwordChangeData)
                        .then(response => {
                            const result = response.data
                            console.log(result)
                            this.$root.showLoader = false;
                            if(result.message == "incorrect_auth_details"){
                                this.cancelRefresh();
                                this.showPasswordChangeModal = false;
                                toast({
                                    message: `Unauthorized`,
                                    type: 'is-danger',
                                    dismissible: true,
                                    pauseOnHover: 'true',
                                    duration: 3000,
                                    position:'top-right',
                                })
                                this.$root.logout();
                            } else if ( result.message == "incorrect_old_password"){
                                this.changePassword.new = ''
                                this.changePassword.confirm = ''
                                this.changePassword.old = ''
                                toast({
                                    message: `Old Password Incorrect`,
                                    type: 'is-danger',
                                    dismissible: true,
                                    pauseOnHover: 'true',
                                    duration: 3000,
                                    position:'top-right',
                                })
                            } else if (result.message == "success"){
                                this.showPasswordChangeModal = false;
                                this.changePassword.new = ''
                                this.changePassword.confirm = ''
                                this.changePassword.old = ''

                                toast({
                                    message: `Password Changed Successfully`,
                                    type: 'is-success',
                                    dismissible: true,
                                    pauseOnHover: 'true',
                                    duration: 3000,
                                    position:'top-right',
                                })
                                this.$root.logout();
                            }

                        })
                }
            }
        },
        cancelRefresh(){
            clearInterval(this.timer);
            clearInterval(this.timer2);
            clearInterval(this.warningTimer);
            clearInterval(this.LogoutTimer);
        },

    },

    beforeUnmount() {
        this.cancelRefresh()
        this.$store.commit('setCurrentFormPage',1)
    },
}

</script>

<style lang="scss">
    
</style>
