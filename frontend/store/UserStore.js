import { create } from 'zustand'
import axios from 'axios'


axios.defaults.withCredentials = true


const userStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (email, password, role) => {
        set({ error: null })
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password, role })
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Login Failed" })
            return error.response
        }
    },
    logout: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/logout')
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
            const response = await axios.post('http://127.0.0.1:5000/api/auth/profile')
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

            const response = await axios.post('http://127.0.0.1:5000/api/students/register', { username, email, password, role: "Student", authType: "email" })
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

    walletLogin: async (walletaddress, email) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/walletlogin', { walletaddress, email, role: "Student", authType: "email" })
            if (response.status === 200) {
                set({ user: response.data.userDetails, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Login Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }
    },

}))

export { userStore }