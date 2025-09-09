"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/UserStore'


function ProtectedRoutes({ children }) {

    const router = useRouter()

    const { user, fetchUser, loading, error } = userStore()

    useEffect(() => {
        if (!user) {
            fetchUser()
        }
    }, [user, fetchUser])



    useEffect(() => {
        if (user && !loading) {
            router.push(`/dashboard/${user.username ? user.username : user.email}`)
        } else if (error || !user) {
            router.push("/auth/users")
        }
    }, [user, loading, error, router])


    if (loading) return <p>Loading...</p>

    if (!user) return null


    return <>{children}</>
}

export default ProtectedRoutes