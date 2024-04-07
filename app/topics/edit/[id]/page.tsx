import options from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/prisma/db'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import React from 'react'

interface Props {
    params: { id: string }
}

const TopicForm = dynamic(() => import("@/components/TopicForm"), {
  ssr: false,
})

const EditTopic = async ({ params }: Props) => {
    const session = await getServerSession(options)

    if (!session) {
      return <p className="text-destructive">Access required</p>
    }
    
    const topic = await prisma.topic.findUnique ({
        where: {id: parseInt(params.id)},
    })

    if (!topic) {
        return <p className=" text-destructive">Topic not found!</p>
    }

    return (
        <TopicForm topic={topic} />
    )
}

export default EditTopic