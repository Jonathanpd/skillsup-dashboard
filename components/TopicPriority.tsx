import { Priority } from '@prisma/client'
import { Zap } from 'lucide-react'
import React from 'react'

interface Props {
    priority: Priority
}

const priorityMap: Record<Priority, { label: string, level: 1 | 2 | 3 }> = {
    HIGH: {label: "High", level: 3},
    MEDIUM: {label: "Medium", level: 2},
    LOW: {label: "Low", level: 1},
}

const TopicPriority = ({priority}: Props) => {
  return (
    <>
        <Zap
            className={`${
                priorityMap[priority].level >= 1 ? "text-red-500" : "text-muted"
            }`}
        />
        <Zap
            className={`${
                priorityMap[priority].level >= 2 ? "text-red-500" : "text-muted"
            }`}
        />
        <Zap
            className={`${
                priorityMap[priority].level >= 3 ? "text-red-500" : "text-muted"
            }`}
        />
    </>
  )
}

export default TopicPriority