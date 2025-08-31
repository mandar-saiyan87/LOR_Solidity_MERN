"use client"
import React, { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/UserStore'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { isvalidWalletAddress } from '@/app/utils/verifyPublicAddress';

function Studentdetails() {

    const router = useRouter()

    const { registrationForm, user, loading, studentRegister, error } = userStore()

    const [name, setName] = useState('')
    const [walletaddress, setWalletaddress] = useState('')
    const [program, setProgram] = useState('')


    useEffect(() => {
        registrationForm({ name, walletaddress, program })
    }, [name, walletaddress, program])


    useEffect(() => {
        if (user && !loading) {
            router.push(`/dashboard/${user.name}`)
        }
    }, [user, loading, router])


    async function registerStudent() {
        if (!name) {
            toast.error('Please enter full name');
            return
        }

        if (!isvalidWalletAddress(walletaddress)) {
            toast.error('Please enter valid wallet address');
            return
        }

        if (!program) {
            toast.error('Please enter program enrolled for');
            return
        }

        const response = await studentRegister()
        if (response.status !== 200) {
            toast.error(result.data.message)
            return
        }
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
            <div className="w-full flex flex-col items-center justify-center sm:h-screen p-4">

                <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <p className='text-xl text-blue-600 font-semibold'>LOR Portal - Step 2</p>
                    </div>
                    <form className="space-y-8">
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
                            <input type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Wallet Address</label>
                            <input type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Wallet Address"
                                onChange={(e) => setWalletaddress(e.target.value)}
                                value={walletaddress}
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Program</label>
                            <input type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Program"
                                onChange={(e) => setProgram(e.target.value)}
                                value={program}
                            />
                        </div>
                    </form>
                    <div className=" flex gap-4 mt-12">
                        <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                            onClick={() => router.back()}
                        >
                            Back
                        </button>
                        <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                            onClick={registerStudent}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Studentdetails