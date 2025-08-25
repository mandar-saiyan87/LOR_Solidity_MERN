"use client"

import React, { useEffect } from 'react'
import { userStore } from "@/store/UserStore"
import { useRouter } from "next/navigation"


function DashboardLayout({ children, params }) {

    const { username } = params

    const { user, fetchUser, loading } = userStore()

    const router = useRouter()


    useEffect(() => {

        if (!user) {
            fetchUser()
        }

    }, [user, fetchUser])


    if (loading) return <p>Loading...</p>


    if (!user) {
        router.replace("/auth/login")
        return null
    }

    if (user.name !== username) {
        router.replace("/unauthorized");
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}

export default DashboardLayout