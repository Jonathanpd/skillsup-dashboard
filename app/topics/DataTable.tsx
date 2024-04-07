import TopicPriority from '@/components/TopicPriority'
import TopicStatusBadge from '@/components/TopicStatusBadge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Topic } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { ArrowDown } from 'lucide-react'
import { SearchParams } from './page'

interface Props {
    topics: Topic[]
    searchParams: SearchParams
}

const DataTable = ({topics, searchParams}: Props) => {
    return (
        <div className="w-full mt-5">
            <div className="rounded-md sm:border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Link href={{ query: {...searchParams, orderBy: "title"} }}>
                                    Title
                                </Link>

                                {"title" === searchParams.orderBy && (
                                    <ArrowDown className="inline p-1" />
                                )}
                            </TableHead>
                            <TableHead>
                                <div className="flex justify-center">
                                    <Link href={{ query: {...searchParams, orderBy: "status"} }}>
                                        Status
                                    </Link>
                                    {"status" === searchParams.orderBy && (
                                        <ArrowDown className="inline p-1" />
                                    )}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex justify-center">
                                    <Link href={{ query: {...searchParams, orderBy: "priority"} }}>
                                        Priority
                                    </Link>
                                    {"priority" === searchParams.orderBy && (
                                        <ArrowDown className="inline p-1" />
                                    )}
                                </div>
                            </TableHead>
                            <TableHead>
                                <Link href={{ query: {...searchParams, orderBy: "createdAt"} }}>
                                    Created At
                                </Link>
                                {"createdAt" === searchParams.orderBy && (
                                    <ArrowDown className="inline p-1" />
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topics 
                            ? topics.map((topic) => (
                                <TableRow key={topic?.id} data-href="/">
                                    <TableCell>
                                        <Link href={`/topics/${topic?.id}`}>{topic?.title}</Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <TopicStatusBadge status={topic?.status} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <TopicPriority priority={topic?.priority} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {topic.createdAt.toLocaleDateString("pt-BR", {
                                            year: "2-digit",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))
                            : null
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DataTable