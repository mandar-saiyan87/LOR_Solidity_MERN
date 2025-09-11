"use client"

import React from 'react'
import ProtectedRoutes from '../utils/ProtectedRoutes'
import { ScaleLoader } from "react-spinners"
import { userStore } from '@/store/UserStore'



function DashboardLayout({ children }) {

    const { loading } = userStore()

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
                {children}
            </ProtectedRoutes>
        </>
    )
}

export default DashboardLayout