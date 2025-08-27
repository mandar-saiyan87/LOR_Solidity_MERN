"use client"

import React from 'react'
import { userStore } from '@/store/UserStore'

function Dashboard() {

  const { user } = userStore()

  return (
    <div>Welcome {user.name}</div>
  )
}

export default Dashboard