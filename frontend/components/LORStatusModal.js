import React from 'react'

function LORStatusModal({ setModal, txData, lorid }) {


    return (

        <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 flex items-center justify-center px-3' onClick={() => setModal()}>
            {txData?.type !== 'error' ? <div className='w-full flex flex-col items-center justify-center gap-y-8 max-w-3xl px-4 py-10 bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
                <p className={`${txData?.type === 'Approve' ? 'text-green-600' : 'text-red-600'} font-medium text-lg`}>{lorid} {txData?.type === 'Approve' ? ' has been approved' : txData?.type === 'Reject' && ' has been rejected'}</p>
                {txData?.txHash && <p>Transaction Hash: {txData.txHash}</p>}

                <button className="text-white px-4 py-2 text-center bg-blue-400 hover:bg-blue-600" onClick={() => setModal()}>Close</button>
            </div> :
                <div className='w-full flex flex-col items-center justify-center gap-y-8 max-w-3xl px-4 py-10 bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
                    <p className='text-red-600 font-medium text-lg'>Operation returned with error {txData?.error.message.split('.')[0]}.<br /> Check if wallet is connected</p>
                    {txData?.txHash && <p>Transaction Hash: {txData.txHash}</p>}
                    <button className="text-white px-4 py-2 text-center bg-blue-400 hover:bg-blue-600" onClick={() => setModal()}>Close</button>
                </div>
            }

        </div>

    )
}

export default LORStatusModal