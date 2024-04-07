"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const DeleteButton = ({ topicId }: { topicId: number }) => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteTopic = async() => {
        try {
            setIsDeleting(true)
            await axios.delete("/api/topics/" + topicId)
            router.push("/topics")
            router.refresh()
        } catch (error) {
            setIsDeleting(false)
            setError("Uknown Error Occured.")
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger
                    className={buttonVariants({
                        variant: "destructive",
                    })}
                >
                    Delete Topic
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your topic.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({
                            variant: "destructive",
                        })}
                        disabled={isDeleting}
                        onClick={deleteTopic}
                    >
                        Delete
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <p className=" text-destructive">{error}</p>
        </>
    )
}

export default DeleteButton