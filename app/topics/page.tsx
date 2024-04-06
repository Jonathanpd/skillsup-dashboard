import React from 'react'
import prisma from '@/prisma/db'
import DataTable from './DataTable'

const Topics = async () => {
  const topics = await prisma.topic.findMany()

  //console.log(topics)

  return (
    <div>
      <DataTable topics={topics}></DataTable>
    </div>
  )
}

export default Topics