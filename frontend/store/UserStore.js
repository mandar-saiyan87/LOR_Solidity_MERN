import { create } from 'zustand'
import axios, { get } from 'axios'


axios.defaults.withCredentials = true


const userStore = create((set) => ({
    user: null,
    loading: false,
    error: null,
    registrationData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        walletaddress: '',
        role: 'Student',
        authType: 'email'
    },

    login: async (email, password, role) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password, role })
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
    registrationForm: (data) => {
        set((state) => ({
            registrationData: { ...state.registrationData, ...data }
        }))
    },
    studentRegister: async () => {
        set({ loading: true, error: null })
        try {

            const response = await axios.post('http://127.0.0.1:5000/api/students/register', { ...userStore.getState().registrationData })
            if (response.status !== 200) {
                set({ user: response.data.studentdetails, error: null })
                set((state) => ({
                    registrationData: {
                        ...state.registrationData,
                        name: '',
                        email: '',
                        password: '',
                        walletaddress: '',
                        role: 'Student',
                        authType: 'email'
                    }
                }))
                return response
            }

        } catch (error) {
            set({ error: error.response?.data?.message || "Registration Failed" })
            return error.response
        } finally {
            set({ loading: false })
        }

    }

}))

export { userStore }