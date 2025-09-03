"use client"

import React from 'react'
import { userStore } from '@/store/UserStore'
import Navbar from '@/components/Navbar'


function Dashboard() {

  const { user } = userStore()

  return (
    <>
      <div className='w-full min-h-screen flex flex-col px-5'>
        <Navbar username={user.name ? user.name : user.email} />
      </div>
    </>
  )
}

export default Dashboard