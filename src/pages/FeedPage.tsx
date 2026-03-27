import { useAuth } from '@/features/auth/contexts/AuthContext'
import React from 'react'

function FeedPage() {
  const {authUser} = useAuth()
  return (
   <section className="flex=1 flex justify-content">
    <h1>@{authUser?.handle}</h1>
   </section>
  )
}

export default FeedPage