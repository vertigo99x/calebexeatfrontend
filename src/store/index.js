import { createStore } from 'vuex'

//import { ref, computed } from "vue";
//import { defineStore } from "pinia";


import createPersistedState from "vuex-persistedstate"

export default createStore({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isAuthenticated: false,
        token: '',
        appTheme:'dark',
        currentPage:'dashboard',
        currentFormPage:1,
        currentEventPage:1,
        isShowAll:false,
        

    },
    getters: {},
    mutations: {
        initializeStore(state) {
            
            
            

        },

        setUserData(state, userdata) {
            state.userData = userdata
        },
        
        setMode(state, mode){
            state.appMode = mode
        },

        setCurrentFormPage(state, page){
            state.currentFormPage = page
            localStorage.setItem('formPage', page);
        },
        setCurrentEventPage(state, page){
            state.currentEventPage = page
        },

        modifyShowAll(state, newstate){
            state.isShowAll = newstate
        },

        setToken(state, token){
            state.token = token
            state.isAuthenticated = true
        },
        setCurrentPage(state, page){
            state.currentPage = page
        },
        
        changeBulkList(state, bulkList){
            state.staffbulkList = bulkList
        },

        setTempFilter(state,tempData){
            state.tempFilter.collegeIndex = tempData.collegeIndex
            state.tempFilter.level = tempData.level
            state.tempFilter.dept = tempData.dept

        },
       
        logoutDefault(state) {
            state.token = ''
            state.isAuthenticated = false
            state.currentPage='dashboard'
            state.userData=''
            state.showProfile=false
            state.currentFormPage=1
            state.currentEventPage=1
            state.isShowAll=false
            state.staffbulkList=[]
        },



    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()]
})



/*
import axios from 'axios';

export const useUserStore = defineStore("user", () => {
  
});

*/