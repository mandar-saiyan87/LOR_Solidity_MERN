"use client"

import React, { useState, useEffect } from 'react'
import { userStore } from '@/store/UserStore'
import Navbar from '@/components/Navbar'
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import CreateLORModal from '@/components/CreateLORModal';
import { ToastContainer, toast, Bounce } from 'react-toastify';


function Dashboard() {

  const [modal, setModal] = useState(false)

  const { user, updateUser } = userStore()
  const { connectAsync } = useConnect()

  const { disconnect } = useDisconnect()

  const { address, isConnected } = useAccount();

  async function handleWalletConnect() {
    const connections = await connectAsync({ connector: injected() })
  }



  useEffect(() => {
    async function handleuserAddressUpdate() {

      if (isConnected) {
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

      <div className='w-full min-h-screen flex flex-col px-5'>
        <Navbar username={user.username ? user.username : user.email} />
        <div className='w-full flex gap-3 mt-3'>
          {
            isConnected ? <>
              <p className='text-black bg-gray-200 p-2 rounded-lg'>{address}</p>
              <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={disconnect}>Disconnect</button>
            </> : <button className='text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600' onClick={handleWalletConnect}>Connect Wallet</button>
          }

          {/* <button onClick={handleuserUpdate}>updateuser</button> */}
        </div>
        <button className='max-w-max text-white px-2.5 py-2 rounded-lg cursor-pointer bg-blue-600 my-3' onClick={() => setModal(true)}>Create New Request</button>
      </div>
    </>
  )
}

export default Dashboard