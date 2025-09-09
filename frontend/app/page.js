"use client"
import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { userStore } from "@/store/UserStore";
import UsersAuth from "./auth/users/page";
import { ScaleLoader } from "react-spinners"



export default function Home() {

  // const router = useRouter()
  // const { user, fetchUser, loading } = userStore()
  const { loading } = userStore()


  // useEffect(() => {
  //   if (!user) {
  //     fetchUser()
  //   }
  // }, [user, fetchUser])

  // useEffect(() => {
  //   if (user && !loading) {
  //     router.push(`/dashboard/${user.username ? user.username : user.email}`)
  //   }
  // }, [user, loading, router])

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
  // if (user) return null

  return (
    <>
      <UsersAuth />
    </>

  );
}
