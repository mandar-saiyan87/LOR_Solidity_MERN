"use client"
import React, { useState, useEffect } from 'react'
import { useAccount } from "wagmi";
import { generateRandomId } from '@/app/utils/randomLORId';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useLORCreate } from '@/app/hooks/useLORCreate';


function CreateLORModal({ isModal }) {



    const { address, isConnected } = useAccount();

    const { createLOR, txHash, isPending, isConfirming, isSuccess, error } = useLORCreate()

    const [name, setName] = useState('')
    const [program, setProgram] = useState('')
    const [lastrequestId, setLastRequestId] = useState('')

    function handleRequestSubmit(e) {
        e.preventDefault()
        if (!address) {
            toast.error('Wallet not connected, Please connect wallet to raise request!');
            return
        }
        const requestId = generateRandomId(address)
        const lor = {
            requestId,
            studentAddress: address,
            name,
            program,
            university: "Example Tech University"
        }
        setLastRequestId(requestId)
        createLOR(lor)
    }

    useEffect(() => {
        if (isSuccess && txHash) {
            setName('')
            setProgram('')
        }
    }, [isSuccess, txHash])


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
            <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 flex items-center justify-center px-3 py-1.5' onClick={(e) => isModal(false)}>
                <div className='w-full max-w-3xl px-4 py-3 bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex items-center justify-between mb-3">

                        <h3 className='text-2xl font-semibold my-3'>Create LOR Request</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            onClick={(e) => isModal(false)} className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                    <form className='flex flex-col gap-3'>
                        <label className='flex flex-col'>
                            Name
                            <input type="text" name="name" className='p-2 border rounded-lg' onChange={(e) => setName(e.target.value)} value={name} />
                        </label>
                        <label className='flex flex-col'>
                            University
                            <input type="text" name="university" className='p-2 border rounded-lg' value={"Example Tech University"} disabled />
                        </label>
                        <label className='flex flex-col'>
                            Program
                            <input type="text" name="program" className='p-2 border rounded-lg' onChange={(e) => setProgram(e.target.value)} value={program} />
                        </label>
                        <button type="submit" className='p-2 bg-blue-600 text-white rounded-lg my-3 cursor-pointer'
                            onClick={handleRequestSubmit}
                        >      {isPending
                            ? "Signing..."
                            : isConfirming
                                ? "Confirming..."
                                : "Create Request"}</button>
                    </form>

                    {txHash && isSuccess && (
                        <div className="flex flex-col gap-3">
                            <p className="text-green-600">Request raised successfully</p>
                            <p className="text-blue-600">Transaction Hash: {txHash}</p>
                            <p>Save the LOR request ID: {lastrequestId} for future reference and status</p>
                        </div>
                    )}
                    {error && (
                        <p className="text-red-600">{error.message}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateLORModal