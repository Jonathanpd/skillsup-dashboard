import React from 'react'
import prisma from '@/prisma/db'
import TopicDetail from './TopicDetail'

interface Props {
    params: {id: string}
}

const ViewTopic = async ({ params }: Props) => {
    const topic = await prisma.topic.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!topic) {
        return <p className=" text-destructive">Topic Not Found!</p>
    }

    return (
        <TopicDetail topic={topic} />
    )
}

export default ViewTopic