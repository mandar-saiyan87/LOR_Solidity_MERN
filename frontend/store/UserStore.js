import { create } from 'zustand'
import axios from 'axios'
import { DUMMY_USER } from "../components/dummyusers/WEB3LOR.students.js"


axios.defaults.withCredentials = true


const userStore = create((set) => ({
    user: null,
    loading: false,
    error: null,
    LORData: null,

    login: async (email, password, role) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('/api/auth/login', { email, password, role })
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Login Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('/api/auth/logout')
            if (response.status === 200) {
                set({ user: null, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Logout Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }
    },
    fetchUser: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('/api/auth/profile')
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
                return response
            }
        } catch (error) {
            set({ user: null, error: error.response?.data?.message || "Login Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }

    },

    studentRegister: async (username, email, password, role, authType) => {
        set({ loading: true, error: null })
        try {

            const response = await axios.post('/api/students/register', { username, email, password, role: "Student", authType: "email" })
            if (response.status === 200) {
                set({ user: response.data.studentdetails, error: null })
                return response
            }

        } catch (error) {
            set({ error: error.response?.data?.message || "Registration Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }
    },

    walletLogin: async (walletaddress, email = '') => {
        // set({ loading: true, error: null })
        set({ error: null })
        try {
            const response = await axios.post('/api/auth/walletlogin', { walletaddress, email, role: "Student", authType: "email" })
            if (response.status === 200) {
                set({ user: response.data.userDetails, error: null })
                return response
            }

        } catch (error) {
            set({ error: error.response?.data?.message || "Login Failed" })
            return error.response
        }

    },

    updateUser: async (userdetails) => {
        // set({ loading: true, error: null })
        try {
            const response = await axios.patch('/api/user/updatedetails', userdetails)
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Update Failed" })
            return error.response
        }
        // finally {
        //     set({ loading: false })
        // }
    },
    getLor: async () => {
        try {
            const response = await axios.get('/api/lor/getlor')
            if (response.status === 200) {
                set({ LORData: response.data.lorRequests, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "LOR Fetching Failed" })
            return error.response
        }
    },
    generateLOR: async (lordata) => {
        try {
            const response = await axios.post('/api/lor/generateletter', lordata, {
                responseType: 'blob'
            })
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "LOR Fetching Failed" })
            // console.log(error.response?.data?.message)
            return error.response
        }
    }

}))

export { userStore }