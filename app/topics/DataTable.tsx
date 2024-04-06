import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Topic } from '@prisma/client'
import { title } from 'process'
import React from 'react'

interface Props {
    topics: Topic[]
}

const DataTable = ({topics}: Props) => {
    //console.log(topics)
    
    return (
        <div className='w-full mt-5'>
            <div className='rounded-md sm:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topics 
                            ? topics.map((topic) => (
                                <TableRow key={topic.id} data-href="/">
                                    <TableCell>{topic.title}</TableCell>
                                    <TableCell>{topic.status}</TableCell>
                                    <TableCell>{topic.priority}</TableCell>
                                    <TableCell>{topic.createdAt.toLocaleDateString()}</TableCell>
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