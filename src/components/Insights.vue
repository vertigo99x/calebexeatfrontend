<template>
    
  <div class="insights"  v-if="usercat === 'student' || usercat === 'porter' || usercat === 'saffairs' ">
       
    <div class="sales">
            <span class="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M691-80q-78.435 0-133.718-55.283Q502-190.565 502-269q0-78.435 55.282-133.717Q612.565-458 691-458q78.435 0 133.718 55.283Q880-347.435 880-269q0 78.435-55.282 133.717Q769.435-80 691-80Zm58.243-88L777-196l-75-75v-112h-39v126l86.243 89ZM180-120q-24.75 0-42.375-17.625T120-180v-600q0-26 17-43t43-17h202q7-35 34.5-57.5T480-920q36 0 63.5 22.5T578-840h202q26 0 43 17t17 43v308q-15-9-29.516-15.48Q795.968-493.96 780-499v-281h-60v90H240v-90h-60v600h280q5 15 12 29.5t17 30.5H180Zm300-660q17 0 28.5-11.5T520-820q0-17-11.5-28.5T480-860q-17 0-28.5 11.5T440-820q0 17 11.5 28.5T480-780Z"/></svg></span>
            <div class="middle">
                <div class="lef">
                    <h3>Pending Requests</h3>
                    <h1>{{ userData.getRequestCount.pending }}</h1>
                </div>
                <div class="progress">
                    <svg>
                        <circle cx="38" cy="38" r="36" :style="`stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.getRequestCount.pending) /
                                (
                                    parseInt(userData.getRequestCount.pending) +
                                    parseInt(userData.getRequestCount.approved) +
                                    parseInt(userData.getRequestCount.rejected)
                                )
                            ) * 100}) / 100);`">
                        </circle>
                    </svg>
                    <div class="number">
                        <p id="pendingrequests">{{ `${(parseInt(userData.getRequestCount.pending) / (parseInt(userData.getRequestCount.pending) + parseInt(userData.getRequestCount.approved) + parseInt(userData.getRequestCount.rejected))) * 100 || 0}`.split('.')[0] }}</p><p>%</p>
                    </div>
                </div>
            </div>
        
            <small class="text-muted">Since {{ moment(`${userData.date_added}`).fromNow() }}</small>
        </div>

        <div class="expenses">
            <span class="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m419-321 289-289-43-43-246 246-119-119-43 43 162 162ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/></svg></span>
            <div class="middle">
                <div class="lef">
                    <h3>Approved Requests</h3>
                    <h1>{{ userData.getRequestCount.approved }}</h1>
                </div>
                <div class="progress">
                    <svg>
                        <circle cx="38" cy="38" r="36" :style="`stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.getRequestCount.approved) /
                                (
                                    parseInt(userData.getRequestCount.pending) +
                                    parseInt(userData.getRequestCount.approved) +
                                    parseInt(userData.getRequestCount.rejected)
                                )
                            ) * 100}) / 100);`">
                        </circle>
                    </svg>
                    <div class="number">
                        
                        <p id="approvedrequests">{{ `${(parseInt(userData.getRequestCount.approved) / (parseInt(userData.getRequestCount.pending) + parseInt(userData.getRequestCount.approved) + parseInt(userData.getRequestCount.rejected))) * 100 || 0}`.split('.')[0] }}</p><p>%</p>
                
                    </div>
                </div>
            </div>
            <small v-if="usercat=='student'" class="text-muted">Since {{ moment(`${userData.date_added}`).fromNow() }}</small>
            <small v-else class="text-muted">Since 24 Hrs Ago</small>
        </div>

        <div class="income">
            <span class="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg></span>
            <div class="middle">
                <div class="lef">
                    <h3>Rejected Requests</h3>
                    <h1>{{ userData.getRequestCount.rejected }}</h1>
                </div>
                <div class="progress">
                    <svg>
                        <circle cx="38" cy="38" r="36" :style="`stroke-dashoffset: calc(230 - (230 * ${(
                                parseInt(userData.getRequestCount.rejected) /
                                (
                                    parseInt(userData.getRequestCount.pending) +
                                    parseInt(userData.getRequestCount.approved) +
                                    parseInt(userData.getRequestCount.rejected)
                                )
                            ) * 100}) / 100);`">
                        </circle>
                    </svg>
                    <div class="number">
                        <p id="rejectedrequests">{{ `${(parseInt(userData.getRequestCount.rejected) / (parseInt(userData.getRequestCount.pending) + parseInt(userData.getRequestCount.approved) + parseInt(userData.getRequestCount.rejected))) * 100 || 0}`.split('.')[0] }}</p><p>%</p>
                    </div>
                </div>
            </div>
             <small v-if="usercat == 'student'" class="text-muted">Since {{ moment(`${userData.date_added}`).fromNow() }}</small>
                <small v-else class="text-muted">Since 24 Hrs Ago</small>
        </div>

    </div>


</template>

<script>
var moment = require('moment')

export default {
    name:'Insights',
    data() {
        return {
            usercat: this.userData.usercat,
            moment: moment,
            
        }
    },
    computed: {
        
    },
    props: {
        
        userData: {
            type: Object,
            required:true,
        }
    }
    
}
</script>

<style lang="scss" scoped>
    

    .svg-icon{
        padding:.5rem;
        align-items: center;
        display: flex;
        width: fit-content;
        justify-content: center;
        border-radius:50%;
        
        svg{
        width:36px;
        height:36px;
        fill:#363949 !important;
        
        
    }
    }

    .lef h3{
        letter-spacing: 1px;
    }
    .sales .number{
        font-size:1rem;
    }
    
</style>