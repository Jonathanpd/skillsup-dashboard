import React from 'react'
import prisma from '@/prisma/db'

const Topics = async () => {
  const topics = await prisma.topic.findMany()

  console.log(topics)

  return (
    <div>Topics</div>
  )
}

export default Topics