"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/UserStore'

function Studentdetails() {

    const router = useRouter()

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center sm:h-screen p-4">

                <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <p className='text-xl text-blue-600 font-semibold'>LOR Portal - Step 2</p>
                    </div>
                    <form className="space-y-8">
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Name</label>
                            <input type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Wallet Address</label>
                            <input type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Wallet Address" />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">Program</label>
                            <input type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Program" />
                        </div>
                    </form>
                    <div className=" flex gap-4 mt-12">
                        <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                            onClick={() => router.back()}
                        >
                            Back
                        </button>
                        <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
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