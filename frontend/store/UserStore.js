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
            await axios.post('http://localhost:5000/api/auth/login', { email, password, role }, {
                withCredentials: true
            })
            await userStore.getState().fetchUser()
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
            const res = awaitaxios.post('http://localhost:5000/api/auth/profile', {
                withCredentials: true
            })
            set({ user: res.data.userdetails, error: null })
        } catch (error) {
            set({ user: null })
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
        await axios.post('http://127.0.0.1:5000/students/register', { email, password }, {
            withCredentials: true
        })
        set({ loading: true, error: null })
    }

}))

export { userStore }