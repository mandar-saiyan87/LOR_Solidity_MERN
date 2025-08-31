"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/UserStore'
import { validate } from 'react-email-validator'
import { ToastContainer, toast, Bounce } from 'react-toastify';

function RegisterPage() {


    const { registrationForm, user, loading } = userStore()

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setconfirmPass] = useState('')

    function handleRegistration() {

        if (!email || !validate(email)) {
            toast.error('Enter valid email id');
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

        registrationForm({ email, password })
        router.push("register/studentdetails")

    }

    useEffect(() => {
        if (user && !loading) {
            router.push(`/dashboard/${user.name}`)
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
            <div className="w-full flex flex-col items-center justify-center sm:h-screen p-4">
                <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <p className='text-xl text-blue-600 font-semibold'>LOR Portal</p>
                    </div>

                    <form>
                        <div className="space-y-6">
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
                                Next
                            </button>
                        </div>
                        <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <Link href="/auth/login" className="text-blue-600 font-medium hover:underline ml-1">Login Here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage