import React from 'react'
import prisma from "@/prisma/db"
import DashRecentTopics from '@/components/DashRecentTopics'
import DashChart from '@/components/DashChart'

const Dashboard = async () => {
  const topics = await prisma.topic.findMany({
    where: {
      NOT: [{status: "CLOSED"}]
    },
    orderBy: {
      updatedAt: "desc"
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true
    },
  })

  const groupTopic = await prisma.topic.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  })

  //console.log(topics)
  //console.log(groupTopic)

  return (
    <div className="grid gap-4 md:grid-cols-2 px-2">
      <div>
        <DashRecentTopics topics={topics} />
      </div>
      <div>
        <DashChart />
      </div>
    </div>
  )
}

export default Dashboard