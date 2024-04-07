import React from 'react'
import prisma from "@/prisma/db"
import DataTable from './DataTable'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Pagination from '@/components/Pagination'
import StatusFilter from '@/components/StatusFilter'

interface SearchParams {
    page: string
}

const Topics = async ({ searchParams }: { searchParams: SearchParams }) => {
    const pageSize = 10
    const page = parseInt(searchParams.page) || 1 // current page
    const topicCount = await prisma.topic.count()

    const topics = await prisma.topic.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize
    })

    return (
        <div>
            <Link
                href="/topics/new"
                className={buttonVariants({ variant: "default" })}
            >
                New Topic
            </Link>

            <StatusFilter />

            <DataTable topics={topics}></DataTable>

            <Pagination
                itemCount={topicCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </div>
    )
}

export default Topics