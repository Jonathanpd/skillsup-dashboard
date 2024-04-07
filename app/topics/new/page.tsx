import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import React from 'react'

const TopicForm = dynamic(() => import("@/components/TopicForm"), {
  ssr: false,
})

const NewTopic = async () => {
  const session = await getServerSession(options)

  if (!session) {
    return <p className="text-destructive">Access required</p>
  }
  
  return (
    <TopicForm />
  )
}

export default NewTopic