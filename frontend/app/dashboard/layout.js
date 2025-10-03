"use client"

import React from 'react'
import ProtectedRoutes from '../utils/ProtectedRoutes'
import { ScaleLoader } from "react-spinners"
import { userStore } from '@/store/UserStore'
import Navbar from '@/components/Navbar'



function DashboardLayout({ children }) {

  const { user, loading } = userStore()

  if (loading) {
    return (
      <ScaleLoader
        // color={color}
        loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
  }

  return (
    <>
      <ProtectedRoutes>
        <Navbar username={user?.username ? user.username : user?.email} />
        <div className="w-full max-w-[1536px] flex flex-col mx-auto px-3">
          {children}
        </div>
      </ProtectedRoutes>
    </>
  )
}

export default DashboardLayout