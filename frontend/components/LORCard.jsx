import React, { useState } from 'react'

function LORCard({ lor }) {

    const [open, setOpen] = useState(false)

    return (
        <div className='w-full bg-gray-200 my-3 px-4 py-3 rounded-lg lg:hidden'>
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
                    <p className='font-semibold break-words my-2'>Requester: <span className='font-normal'>{lor.requesterAddress}</span></p>
                </div>
            }
        </div>
    )
}

export default LORCard