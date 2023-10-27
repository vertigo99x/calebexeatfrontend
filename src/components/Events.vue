<template>
  <div class="recent-updates" v-if="recentEvents.length >= 1" :class="`${userData.usercat}`">
        <h2>Recent Events</h2>
        <div class="updates" :class="{ 'expand': true }" id="events">

            <div class="update" v-for="events in recentEvents" :key="events">
    
                <div class="profile-photo">
                    <img :src="events.getSenderData.sender_thumbnail" alt="" v-if="events.getSenderData.sender_thumbnail">
                    <span v-else class="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z"/></svg></span>
                
                </div>
              

                <div class="message">
                    <p> 
                        <span v-if="events.tag == 'danger'" class="danger">{{ events.notification }}</span> 
                        <span v-else-if="events.tag == 'success'" class="success">{{ events.notification }}</span> 
                        <span v-else>{{ events.notification }}</span> 
            
                    </p>
                    <small class="text-muted">{{ moment(`${events.date_added}`).fromNow() }}</small>
        
                </div>

    
            </div>





        </div>

    </div>
</template>

<script>

var moment = require('moment')


export default {
    name: 'Events',
    data() {
        return {
            moment: moment,
        }
    },
    props: {
        recentEvents: {
            type: Object,
            required:true,
        },
        userData: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>
.message p span{
    font-size: 1rem;
}
</style>