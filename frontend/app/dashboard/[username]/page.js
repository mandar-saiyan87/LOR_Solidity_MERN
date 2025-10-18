"use client"

import React, { useState, useEffect } from 'react'
import { userStore } from '@/store/UserStore'
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import CreateLORModal from '@/components/CreateLORModal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import LORCard from '@/components/LORCard';
import { useLORApprove, useLORReject } from '@/app/hooks/useLORHooks';
import LORStatusModal from '@/components/LORStatusModal';



function Dashboard() {

  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lorId, setLorId] = useState('')

  // LOR status MOdal - Approved or Rejected
  const [statusModal, setStatusModal] = useState(false)

  // Set & use Tx data
  const [txData, setTxData] = useState(null)

  // Userstore Data
  const { user, updateUser, getLor, LORData } = userStore()
  const { connectAsync } = useConnect()

  // LOR Approve or Reject hook - Operations performed using blockchain function calls using Wagmi connection
  const { approveLOR, txHash, isPending, isConfirming, isSuccess, error } = useLORApprove()
  const { rejectLOR, txHash: rejectTxHash, isPending: rejectPending, isConfirming: rejectConfirm, isSuccess: rejectSuccess, error: rejectError } = useLORReject()

  const { disconnect } = useDisconnect()

  const { address, isConnected } = useAccount();

  // Connect to wallet - Student
  async function handleWalletConnect() {
    const connections = await connectAsync({ connector: injected() })
  }

  // Connect to wallet - Approver / Admin
  async function approverConnect() {
    const connections = await connectAsync({ connector: injected() })
    // // console.log(connections)
    if (connections.accounts[0] !== user.walletaddress) {
      toast.error('Can connect only to assigned wallet')
      disconnect()
    }
  }

  // Close Modal reset states
  function closeModal() {
    setLorId('')
    setTxData(null)
    setStatusModal(false)
  }


  // To handle approve and reject LOR by calling contract hooks
  function handleLORStatus(lorid, operation) {
    setLorId(lorid)
    if (operation === 'approve') {
      approveLOR(lorid)
    } else if (operation === 'reject') {
      rejectLOR(lorid)
    }
  }


  // Handle new address if used by student to connect
  useEffect(() => {
    async function handleuserAddressUpdate() {

      if (isConnected && (user.role !== 'Admin' || user.role !== 'Approver')) {
        if (!user.walletaddress.includes(address)) {
          // console.log("Address Included")
          // return
          user.walletaddress.push(address)
          const result = await updateUser({
            email: user.email,
            role: user.role,
            walletaddress: user.walletaddress
          })
          if (result.status === 200) {
            toast.success('New address updated successfully')
          }
        }
      }

    }

    handleuserAddressUpdate()
  }, [isConnected, address])


  // Fetch LOR Data
  useEffect(() => {

    async function fetchLOR() {
      if (user) {
        setLoading(true)
        const res = await getLor()
        // console.log(res.data.lorRequests)
        setLoading(false)
      }
    }

    fetchLOR()

  }, [user])


  // Show updated status modal depends on txHash
  useEffect(() => {
    if (txHash && isSuccess) {
      setTxData({ type: 'Approve', txHash })
      setStatusModal(true)
      getLor()
    }
    else if (rejectTxHash && rejectSuccess) {
      setTxData({ type: 'Reject', txHash: rejectTxHash })
      setStatusModal(true)
      getLor()
    }
    else if (error || rejectError) {
      // console.log(error.message || rejectError.message)

      setTxData({ type: 'error', txHash: txHash || rejectTxHash, error: error || rejectError })
      setStatusModal(true)
      getLor()
    }
  }, [txHash, isSuccess, rejectTxHash, rejectSuccess, error, rejectError])

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

      {
        modal && <CreateLORModal isModal={setModal} />
      }

      {
        statusModal && <LORStatusModal setModal={closeModal} txData={txData} lorid={lorId} />
      }

      <div className='w-full min-h-screen flex flex-col'>

        <div className='w-full flex flex-col gap-3 mt-3 lg:flex-row '>
          {user.role === 'Admin' || user.role === 'Approver' && <div className='max-w-max flex flex-col gap-3 lg:flex-row'>
            <div className='text-black bg-gray-200 p-2 rounded-lg max-w-max text-sm lg:text-base'>
              <p>{user.walletaddress}</p>
            </div>
            {!isConnected ? <button className='max-w-max text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={approverConnect}>Connect Wallet</button> :
              <button className='max-w-max text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={disconnect}>Disconnect</button>
            }
          </div>
          }

          {/* </> */}

          {user.role === 'Student' && <>
            {!isConnected ? <button className='max-w-max text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={handleWalletConnect}>Connect Wallet</button> :
              <div className="max-w-max flex items-center justify-center gap-x-3">
                <div className='text-black bg-gray-200 p-2 rounded-lg max-w-max text-sm lg:text-base'>
                  <p>{address}</p>
                </div>
                <button className='max-w-max text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={disconnect}>Disconnect</button>
              </div>
            }
          </>}
        </div>

        {/* </> */}

        {
          user.role === 'Student' && <button className='max-w-max text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600 my-3' onClick={() => setModal(true)}>Create New Request</button>
        }

        {/* </> */}

        <div className='w-full flex items-center justify-center mx-auto my-5'>
          {loading ? <div className='text-black text-lg'>Loading...</div> : LORData && !loading ?
            <div className='w-full mx-auto'>
              <table className='lortable hidden lg:block'>
                <thead>
                  <tr className='w-full text-left border-y-[1px] border-y-black'>
                    <th>RequestID</th>
                    <th>Name</th>
                    <th>Program</th>
                    <th>University</th>
                    <th>Address</th>
                    <th>Status</th>
                    {/* {user.role === 'Admin' || user.role === 'Approver' && <th>Actions</th>} */}
                  </tr>
                </thead>
                {LORData.length === 0 ? <div className='text-black text-lg my-3'>No LOR to fetch, Please check later or contact support</div> :
                  <tbody className='w-full text-left border-y-[1px] border-y-black'>
                    {LORData?.map((item) => {
                      return (
                        <tr className='w-full text-left border-y-[1px] border-y-black' key={item.requestId}>
                          <td>{item.requestId}</td>
                          <td>{item.fullname}</td>
                          <td>{item.program}</td>
                          <td>{item.university}</td>
                          <td>{item.studentAddress}</td>
                          <td>{item.status}</td>
                          {

                            (user.role === 'Admin' || user.role === 'Approver') &&
                            <td>
                              {item.status === 'PENDING' && <div className='flex gap-x-3'>
                                <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-green-600' onClick={() => handleLORStatus(item.requestId, 'approve')}>
                                  {isPending && item.requestId === lorId ? 'Signing...' : isConfirming && item.requestId === lorId ? 'Confirming...' : 'Approve'}
                                </button>
                                <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-red-600' onClick={() => handleLORStatus(item.requestId, 'reject')}>
                                  {rejectPending && item.requestId === lorId ? 'Signing...' : rejectConfirm && item.requestId === lorId ? 'Confirming...' : 'Reject'}
                                </button>
                              </div>
                              }
                            </td>
                          }

                        </tr>)
                    })}

                  </tbody>
                }

              </table>
              {LORData?.map((item) => {
                return (
                  <LORCard key={item.requestId}
                    lor={item}
                    user={user}
                    approvestate={{ isPending, isConfirming }}
                    rejectState={{ rejectPending, rejectConfirm }}
                    handlestatusops={handleLORStatus}

                  />
                )
              })}
            </div> : <p className='text-black text-lg my-3'>No LOR to fetch, Please check later or contact support</p>
          }

        </div>
      </div>

    </>
  )
}

export default Dashboard