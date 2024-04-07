import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Prisma } from '@prisma/client'
import React from 'react'
import TopicStatusBadge from "./TopicStatusBadge"
import Link from "next/link"
import TopicPriority from "./TopicPriority"

type TopicWithUser = Prisma.TopicGetPayload<{
  include: { assignedToUser: true }
}>

interface Props {
  topics: TopicWithUser[]
}

const DashRecentTopics = ({ topics }: Props) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {topics
            ? topics.map((topic) => (
              <div className="flex items-center" key={topic.id}>
                <TopicStatusBadge status={topic.status} />
                <div className="ml-4 space-y-1">
                  <Link href={`topics/${topic.id}`}>
                    <p>{topic.title}</p>
                    <p>{topic.assignedToUser?.name || "Unassigned"}</p>
                  </Link>
                </div>
                <div className="ml-auto font-medium">
                  <TopicPriority priority={topic.priority} />
                </div>
              </div>
            ))
          : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashRecentTopics