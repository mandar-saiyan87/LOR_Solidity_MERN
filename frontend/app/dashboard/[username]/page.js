"use client"

import React, { useState, useEffect } from 'react'
import { userStore } from '@/store/UserStore'
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import CreateLORModal from '@/components/CreateLORModal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import LORCard from '@/components/LORCard';


function Dashboard() {

  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, updateUser, getLor, LORData } = userStore()
  const { connectAsync } = useConnect()

  const { disconnect } = useDisconnect()

  const { address, isConnected } = useAccount();

  async function handleWalletConnect() {
    const connections = await connectAsync({ connector: injected() })
  }


  async function approverConnect() {
    const connections = await connectAsync({ connector: injected() })
    // // console.log(connections)
    if (connections.accounts[0] !== user.walletaddress) {
      toast.error('Can connect only to assigned wallet')
      disconnect()
    }
  }



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

      <div className='w-full min-h-screen flex flex-col'>

        <div className='w-full flex flex-col gap-3 mt-3 lg:flex-row '>
          {user.role === 'Admin' || user.role === 'Approver' && <div className='max-w-max flex gap-x-3'>
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
                        </tr>)
                    })}

                  </tbody>
                }

              </table>
              {LORData?.map((item) => {
                return (
                  <LORCard key={item.requestId} lor={item} />
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