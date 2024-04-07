"use client"

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { topicSchema } from '@/ValidationSchemas/topics'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type TopicFormData = z.infer<typeof topicSchema>

const TopicForm = () => {
    const form = useForm<TopicFormData>({
        resolver: zodResolver(topicSchema)
    })

    async function onSubmit(values: z.infer<typeof topicSchema>) {
        console.log(values)
    }

    return (
        <div className="rounded-md border w-full p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Topic Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Topic Title..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <SimpleMDE placeholder="Description" {...field} />
                        )}
                    />
                    <div className='flex w-full space-x-4'>
                        <FormField 
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="status..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="OPEN">Open</SelectItem>
                                            <SelectItem value="STARTED">Started</SelectItem>
                                            <SelectItem value="CLOSED">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Priority..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="LOW">Low</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="HIGH">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default TopicForm