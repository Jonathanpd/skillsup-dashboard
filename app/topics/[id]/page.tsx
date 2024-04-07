import React from 'react'
import prisma from '@/prisma/db'
import TopicDetail from './TopicDetail'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

interface Props {
    params: {id: string}
}

const ViewTopic = async ({ params }: Props) => {
    const session = await getServerSession(options)

    if (!session) {
      return <p className="text-destructive">Access required</p>
    }
    
    const topic = await prisma.topic.findUnique({
        where: { id: parseInt(params.id) },
    })

    const users = await prisma.user.findMany();

    if (!topic) {
        return <p className=" text-destructive">Topic Not Found!</p>
    }

    return (
        <TopicDetail topic={topic} users={users} />
    )
}

export default ViewTopic