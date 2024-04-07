import { Topic } from '@prisma/client'
import React from 'react'

interface Props {
    topic: Topic
}

const TopicDetail = ({ topic }: Props) => {
  return (
    <div>
        <p>{topic?.title}</p>
        <p>{topic?.description}</p>
    </div>
  )
}

export default TopicDetail