<template>
  <div id="profile-page" v-if="studentData.get_user_data.usercat == 'student'"><span v-if="$root.showprofile"></span>
            <div class="recent-updates" v-if="$root.showprofile">
    
                <h2>My Profile</h2>
                <div class="updates">
                    <div class="svg-icon"  style="position:relative;margin-bottom:1rem;">
                        <svg @click="$root.showprofile=false;" style="fill:var(--danger);cursor:pointer;position:absolute;right:0;" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                    </div>
                    <table>
                        <tr><td>Fullname:</td><td class="greyout"> {{ userData.lastname }} {{ userData.firstname }} {{ userData.middlename }}</td></tr>
                        <tr><td>Matric No:</td><td class="greyout">{{ userData.get_user_data.username }}</td></tr>
                        <tr><td>Level</td><td class="greyout">{{ studentData.student_level }}</td></tr>
                        <tr><td>Department</td><td class="greyout">{{ studentData.get_department.department }}</td></tr>
                        <tr><td>College</td><td class="greyout">{{ studentData.get_department.college }}</td></tr>
            
                        <tr><td>Hostel:</td><td class="greyout">{{ studentData.get_hostel.hostel_name }}</td></tr>
                        <tr><td>Room Number:</td><td class="greyout">{{ studentData.get_hostel.room_number }}</td></tr>
                        
                        <tr><td>Phone Number</td><td class="greyout">{{ userData.phonenumber }}</td></tr>
                        
                        <tr><td>Home Address</td><td class="greyout">{{ studentData.home_address }}</td></tr>
                    </table>

                    <div class="change-password-btn">
            
            
                        <!-- <span class="primary" style="cursor:pointer;" @click="showProfileImageChangeModal=true">Change Profile Photo</span>  -->
                        <span class="primary" style="cursor:pointer;" @click="$root.showPasswordChangeModal = true">Change User Password</span>
                    </div>
                </div>
    
            </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            userData:this.studentData.get_user_data
        }
    },
    props: {
        studentData: {
            type: Object,
            required: true,
        }
    },

}
</script>

<style>

</style>