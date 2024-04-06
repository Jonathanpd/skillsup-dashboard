import TopicPriority from '@/components/TopicPriority'
import TopicStatusBadge from '@/components/TopicStatusBadge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Topic } from '@prisma/client'
import { title } from 'process'
import React from 'react'

interface Props {
    topics: Topic[]
}

const DataTable = ({topics}: Props) => {
    return (
        <div className='w-full mt-5'>
            <div className='rounded-md sm:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>
                                <div className='flex justify-center'>
                                    Status
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex justify-center">
                                    Priority
                                </div>
                            </TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topics 
                            ? topics.map((topic) => (
                                <TableRow key={topic.id} data-href="/">
                                    <TableCell>{topic.title}</TableCell>
                                    <TableCell>
                                        <div className='flex justify-center'>
                                            <TopicStatusBadge status={topic.status} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <TopicPriority priority={topic.priority} />
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