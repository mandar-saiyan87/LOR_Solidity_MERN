"use client"

import React, { useState, useEffect } from 'react'
import Login from '@/components/Login'
import Register from '@/components/Register'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi';
import { userStore } from '@/store/UserStore'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { validateEmail } from '@/app/utils/emailValidate'


function UsersAuth() {

    const { user, walletLogin, loading, error } = userStore()

    const { disconnect } = useDisconnect()

    const router = useRouter()

    const { isConnected, address } = useAccount()
    const [showLogin, setShowLogin] = useState(true)
    const [isEmail, setIsEmail] = useState(false)
    const [email, setEmail] = useState('')




    useEffect(() => {
        async function usewalletlogin() {
            if (isConnected) {
                // console.log(address)
                const result = await walletLogin(address, email)
                if (result.status === 404) {
                    setIsEmail(true)
                    return
                }
                setIsEmail(false)
                setEmail('')


            }
            else {
                // console.log("Not connected / Disconnected")
                setIsEmail(false)
                setEmail('')
            }
        }

        usewalletlogin()

    }, [isConnected, address])



    useEffect(() => {

        if (!loading && user) {
            router.replace(`/dashboard/${user.username ? user.username : user.email}`)
        }

    }, [user, loading, router])



    function handlewalletLogin() {

        if (!validateEmail(email)) {
            toast.error('Enter valid email id, Only university email id allowed!');
            return
        }
        const result = walletLogin(address, email)
        if (result.status !== 200) {
            disconnect()
            toast.error(result.data?.message)
            return
        }
        setIsEmail(false)
        setEmail('')
    }


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
            <div className="w-full flex flex-col items-center justify-center gap-y-4 sm:h-screen p-4">

                <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <p className='text-xl text-blue-600 font-semibold'>LOR Portal</p>
                    </div>

                    {
                        showLogin ?

                            <Login setShowLogin={setShowLogin} /> :
                            <Register setShowLogin={setShowLogin} />

                    }


                </div>
                <p className='font-semibold'>--- OR ---</p>

                <ConnectButton label="SignIn with wallet" showBalance={false} />

                {isEmail && <form className="flex flex-col gap-y-2 my-5" onSubmit={(e) => { e.preventDefault(); handlewalletLogin() }}>
                    <input type="email" name="email" placeholder="Enter your email id" className="p-2.5 border border-gray-300 rounded-lg focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" className="bg-blue-500 text-white p-2.5 rounded-lg my-2">Submit</button>
                </form>}
                <p className='text-sm'>(Only for Students)</p>
            </div>
        </>
    )
}


export default UsersAuth