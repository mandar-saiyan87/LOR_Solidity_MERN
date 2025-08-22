import { create } from 'zustand'
import axios from 'axios'


axios.defaults.withCredentials = true


const userStore = create({  
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => { 
        try {
            // axios.post
        } catch (error) {
            
        }
    },
    logout: null,
    fetchUser: null
    
})