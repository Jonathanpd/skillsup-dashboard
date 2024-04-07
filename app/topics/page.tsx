import React from 'react'
import prisma from "@/prisma/db"
import DataTable from './DataTable'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Pagination from '@/components/Pagination'
import StatusFilter from '@/components/StatusFilter'
import { Status, Topic } from '@prisma/client'

export interface SearchParams {
    status: Status
    page: string
    orderBy: keyof Topic
}

const Topics = async ({ searchParams }: { searchParams: SearchParams }) => {
    const pageSize = 10
    const page = parseInt(searchParams.page) || 1 // current page

    const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt"

    const statuses = Object.values(Status)

    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined

    let where = {}

    if (status) {
        where = {
            status
        }
    } else {
        where = {
            NOT: [{ status: "CLOSED" as Status }]
        }
    }

    const topicCount = await prisma.topic.count({ where })
    const topics = await prisma.topic.findMany({
        where,
        orderBy: {
            [orderBy]: "desc",
        },
        take: pageSize,
        skip: (page - 1) * pageSize
    })

    return (
        <div>
            <div className="flex gap-2">
                <Link
                    href="/topics/new"
                    className={buttonVariants({ variant: "default" })}
                >
                    New Topic
                </Link>

                <StatusFilter />
            </div>

            <DataTable topics={topics} searchParams={searchParams} />

            <Pagination
                itemCount={topicCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </div>
    )
}

export default Topics