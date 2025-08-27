"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/UserStore'
import { unauthorized } from 'next/navigation'


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
            router.push(`/dashboard/${user.name}`)
        } else if (error || !user) {
            unauthorized()
        }
    }, [user, loading, error, router])


    if (loading) return <p>Loading...</p>

    if (!user) return null


    return <>{children}</>
}

export default ProtectedRoutes