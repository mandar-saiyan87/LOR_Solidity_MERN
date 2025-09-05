"use client"

import React, { useState, useEffect } from 'react'
import Login from '@/components/Login'
import Register from '@/components/Register'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi';


function UsersAuth() {


    const { isConnected, address } = useAccount()
    const [showLogin, setShowLogin] = useState(true)

    useEffect(() => {
        if (isConnected) {
            console.log(address)
        }
        else {
            console.log("Not connected / Disconnected")
        }
    }, [isConnected])


    return (
        <>
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
                <p>--- OR ---</p>
                <ConnectButton label="SignIn with wallet" showBalance={false} />
            </div>
        </>
    )
}


export default UsersAuth