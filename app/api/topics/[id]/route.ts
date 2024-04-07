import { topicSchema } from "@/ValidationSchemas/topics";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db"

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json()
    const validation = topicSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const topic = await prisma.topic.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!topic) {
        return NextResponse.json({ error: "Topic Not Found" }, { status: 400 })
    }

    const updateTopic = await prisma.topic.update({
        where: {id: topic.id},
        data: {
            ...body,
        },
    })

    return NextResponse.json(updateTopic)
}