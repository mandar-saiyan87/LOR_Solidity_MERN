import { create } from 'zustand'
import axios from 'axios'
import { DUMMY_USER } from "../components/dummyusers/WEB3LOR.students.js"


axios.defaults.withCredentials = true


const userStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (email, password, role) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, { email, password, role })
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`)
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`)
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

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/register`, { username, email, password, role: "Student", authType: "email" })
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/walletlogin`, { walletaddress, email, role: "Student", authType: "email" })
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

    updateUser: async (userdetails) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/updatedetails`, userdetails)
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
                return response
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Update Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }
    }

}))

export { userStore }