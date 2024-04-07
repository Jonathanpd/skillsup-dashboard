"use client"

import { Topic, User } from '@prisma/client';
import React from 'react'
import { useState } from "react"
import axios from "axios"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"

const AssignTopic = ({topic, users}: { topic: Topic; users: User[]} ) => {
    const [isAssigning, setIsAssigning] = useState(false)
    const [error, setError] = useState("")

    const assignTopic = async(userId: string) => {
        setError("")
        setIsAssigning(true)

        await axios
            .patch(`/api/topics/${topic.id}`, {
                assignedToUserId: userId === "0" ? null : userId,
            })
            .catch(() => {
                setError("Unable to Assign Topic.")
            })

        setIsAssigning(false)
    }

  return (
    <>
        <Select
            defaultValue={topic.assignedToUserId?.toString() || "0"}
            onValueChange={assignTopic}
            disabled={isAssigning}
        >
            <SelectTrigger>
                <SelectValue
                    placeholder="Select User..."
                    defaultValue={topic.assignedToUserId?.toString() || "0"}
                ></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0">Unassign</SelectItem>
                {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <p className=" text-destructive">{error}</p>
    </>
  )
}

export default AssignTopic