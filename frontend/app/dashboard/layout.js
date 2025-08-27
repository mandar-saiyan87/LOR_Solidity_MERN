"use client"

import React from 'react'
import ProtectedRoutes from '../utils/ProtectedRoutes'



function DashboardLayout({ children }) {


    return (
        <>
            <ProtectedRoutes>
                {children}
            </ProtectedRoutes>
        </>
    )
}

export default DashboardLayout