import React from 'react'
import { userStore } from '@/store/UserStore'
import { useAccount } from "wagmi";

function CreateLORModal({ isModal }) {

    const { user } = userStore()

    const { address, isConnected } = useAccount();

    return (
        <>
            <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 flex items-center justify-center px-3 py-1.5' onClick={(e) => isModal(false)}>
                <div className='w-full max-w-3xl p-3 bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
                    <h3 className='text-2xl font-semibold my-3'>Create LOR Request</h3>
                    <form className='flex flex-col gap-3'>
                        <label className='flex flex-col'>
                            Name
                            <input type="text" name="name" className='p-2 border rounded-lg' />
                        </label>
                        <label className='flex flex-col'>
                            University
                            <input type="text" name="university" className='p-2 border rounded-lg' />
                        </label>
                        <label className='flex flex-col'>
                            Program
                            <input type="text" name="program" className='p-2 border rounded-lg' />
                        </label>
                        <button type="submit" className='p-2 bg-blue-600 text-white rounded-lg my-3 cursor-pointer'>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateLORModal