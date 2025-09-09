"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/UserStore'
import { validateEmail } from '@/app/utils/emailValidate'
import { ToastContainer, toast, Bounce } from 'react-toastify';


function Register({ setShowLogin }) {


    const { studentRegister, user, loading } = userStore()

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setconfirmPass] = useState('')

    async function handleRegistration(e) {
        e.preventDefault()
        if (username.length === 0 || username.length > 20) {
            toast.error('Username required, should not be more than 20 characters');
            return
        }

        if (!email || !validateEmail(email)) {
            toast.error('Enter valid email id, Only university email id allowed!');
            return
        }

        if (!password) {
            toast.error('Enter password');
            return
        }

        if (password !== confirmPass) {
            toast.error("Password and Confirm Password doesn't match");
            return
        }

        const result = await studentRegister(username, email, password)
        if (result.status !== 200) {
            toast.error(result.data?.message)
            return
        }
        setEmail('')
        setPassword('')
        setconfirmPass('')

    }

    useEffect(() => {
        if (!loading && user) {
            router.push(`/dashboard/${user.username ? user.username : user.email}`)
        }
    }, [user, loading, router])


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />


            <form>
                <div className="space-y-6">
                    <div>
                        <label className="text-slate-900 text-sm font-medium mb-2 block">Username</label>
                        <input name="email" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div>
                        <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
                        <input name="email" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                        <input name="password" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                    </div>
                    <div>
                        <label className="text-slate-900 text-sm font-medium mb-2 block">Confirm Password</label>
                        <input name="cpassword" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password"
                            onChange={(e) => setconfirmPass(e.target.value)}
                            value={confirmPass}
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                        onClick={handleRegistration}
                    >
                        Register
                    </button>
                </div>
                <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <span href="/auth/login" className="text-blue-600 font-medium hover:underline ml-1" onClick={() => setShowLogin(true)}>Login Here</span></p>
            </form>

        </>
    )
}

export default Register