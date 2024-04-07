import React from 'react'
import prisma from "@/prisma/db"
import DataTable from './DataTable'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Topics = async () => {
    const topics = await prisma.topic.findMany()

    return (
        <div>
            <Link
                href="/topics/new"
                className={buttonVariants({ variant: "default" })}
            >
                New Topic
            </Link>
            <DataTable topics={topics}></DataTable>
        </div>
    )
}

export default Topics