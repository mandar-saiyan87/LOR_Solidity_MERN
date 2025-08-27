"use client"
import React, { useEffect } from "react";
import LoginPage from "./auth/login/page";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/UserStore";



export default function Home() {

  const router = useRouter()
  const { user, fetchUser, loading } = userStore()


  useEffect(() => {
    if (!user) {
      fetchUser()
    }
  }, [user, fetchUser])

  useEffect(() => {
    if (user && !loading) {
      router.push(`/dashboard/${user.name}`)
    }
  }, [user, loading, router])

  if (loading) return <p>Loading...</p>

  if (user) return null

  return (
    <>
      <LoginPage />
    </>

  );
}
