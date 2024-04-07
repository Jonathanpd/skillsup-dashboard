import { Topic, User } from '@prisma/client'
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
import ReactMarkDown from 'react-markdown'
import DeleteButton from './DeleteButton'
import AssignTopic from '@/components/AssignTopic'
import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

interface Props {
    topic: Topic
    users: User[]
}

const TopicDetail = async ({ topic, users }: Props) => {
  const session = await getServerSession(options)
  const deleteButton = session?.user.role == "ADMIN" && <DeleteButton topicId={topic?.id}/>
  
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
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{topic?.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          Updated: {" "}
          {topic?.updatedAt.toLocaleDateString("pt-BR", {
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
        <AssignTopic topic={topic} users={users} />
        <Link
          href={`/topics/edit/${topic?.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Topic
        </Link>
        {deleteButton}
      </div>
    </div>
  )
}

export default TopicDetail