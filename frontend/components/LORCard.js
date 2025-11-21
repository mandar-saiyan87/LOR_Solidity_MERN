"use client"
import React, { useState } from 'react'
import { useLORApprove, useLORReject } from "@/app/hooks/useLORHooks"


function LORCard({ lor, user, approvestate, rejectState, handlestatusops }) {

    const [open, setOpen] = useState(false)

    const { isPending, isConfirming } = approvestate
    const { rejectPending, rejectConfirm } = rejectState


    return (
        <div className='w-full bg-gray-200 my-3 px-4 py-3 rounded-lg md:hidden'>
            <div className='flex items-center justify-between'>
                <p>{lor.requestId}</p>
                {
                    open ? <div onClick={() => setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                        :
                        <div onClick={() => setOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                }
            </div>
            {
                open &&
                <div className='mt-3'>
                    <p className='font-semibold break-words my-2'>Name: <span className='font-normal'>{lor.fullname}</span></p>
                    <p className='font-semibold break-words my-2'>Program: <span className='font-normal'>{lor.program}</span></p>
                    <p className='font-semibold break-words my-2'>University: <span className='font-normal'>{lor.university}</span></p>
                    <p className='font-semibold break-words my-2'>Student Address: <span className='font-normal'>{lor.studentAddress}</span></p>
                    <p className='font-semibold break-words my-2'>Status: <span className={`${lor.status === 'PENDING' ? 'text-yellow-600' : lor.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'} font-normal`}>{lor.status}</span></p>
                    {
                        lor.status === 'APPROVED' &&
                        <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={() => handleGenerateLOR(lor.requestId)}>Generate LOR Letter</button>

                    }
                    {

                        (user.role === 'Admin' || user.role === 'Approver') &&
                        <>
                            {lor.status === 'PENDING' && <div className='flex gap-x-3'>
                                <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-green-600' onClick={() => handlestatusops(item.requestId, 'approve')}>
                                    {isPending ? 'Signing...' : isConfirming ? 'Confirming...' : 'Approve'}
                                </button>
                                <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-red-600' onClick={() => handlestatusops(item.requestId, 'reject')}>
                                    {rejectPending ? 'Signing...' : rejectConfirm ? 'Confirming...' : 'Reject'}
                                </button>
                            </div>
                            }
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default LORCard