import { create } from 'zustand'
import axios from 'axios'


axios.defaults.withCredentials = true


const userStore = create((set) => ({
    user: null,
    loading: false,
    error: null,
    registrationData: {
        name: '',
        email: '',
        password: '',
        walletaddress: '',
        role: 'Student',
        authType: 'email'
    },

    login: async (email, password, role) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password, role }, {
                withCredentials: true
            })
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
            }
        } catch (error) {
            set({ error: error.response?.data?.message || "Login Failed" })
        } finally {
            set({ loading: false })
        }
    },
    logout: null,
    fetchUser: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/profile', {}, {
                withCredentials: true
            })
            if (response.status === 200) {
                set({ user: response.data.userdetails, error: null })
            }
        } catch (error) {
            set({ user: null, error: error.response?.data?.message || "Login Failed" })

        } finally {
            set({ loading: false })
        }

    },
    registrationForm: (data) => {
        set((state) => ({
            registrationData: { ...state.registrationData, ...data }
        }))
    },
    studentRegister: async (email, password) => {
        set({ loading: true, error: null })
        try {

            const response = await axios.post('http://127.0.0.1:5000/students/register', { email, password })
            set({ user: response.data.userdetails, error: null })
        } catch (error) {
            set({ error: error.response?.data?.message || "Registration Failed" })
        } finally {
            set({ loading: false })
        }

    }

}))

export { userStore }