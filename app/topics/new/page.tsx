import dynamic from 'next/dynamic'
import React from 'react'

const TopicForm = dynamic(() => import("@/components/TopicForm"), {
    ssr: false,
})

const NewTopic = () => {
  return (
    <TopicForm />
  )
}

export default NewTopic