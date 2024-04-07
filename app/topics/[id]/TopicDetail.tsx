import { Topic } from '@prisma/client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TopicStatusBadge from '@/components/TopicStatusBadge'
import TopicPriority from '@/components/TopicPriority'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

interface Props {
    topic: Topic
}

const TopicDetail = ({ topic }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TopicStatusBadge status={topic?.status} />
            <TopicPriority priority={topic?.priority} />
          </div>
          <CardTitle>{topic?.title}</CardTitle>
          <CardDescription>
            Created: {" "}
            {topic?.createdAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topic?.description}
        </CardContent>
        <CardFooter>
          Updated: {" "}
          {topic?.updatedAt.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/topics/edit/${topic?.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Topic
        </Link>
        <Link
          href={`/topics/edit/${topic?.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Delete Topic
        </Link>
      </div>
    </div>
  )
}

export default TopicDetail