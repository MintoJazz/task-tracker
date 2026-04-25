'use client'

import { TaskContainer } from "@/components/task-container" 
import { Task } from "@/types/task"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ListTodo } from "lucide-react"

export default function Page() {
    const [index, setIndex] = useState<number>(3)
    const [task, setTask] = useState<Task[]>([
        {
            id: 1,
            title: 'Testee',
            isCompleted: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            title: 'Testee',
            isCompleted: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ])

    const onDelete = (taskId: number) => setTask((prev) => prev.filter(t => t.id != taskId))

    const onEdit = (taskId: number, taskData: Partial<Task>) => setTask((prev) => prev.map(t => {
        if (t.id === taskId) return { ...t, ...taskData }
        return t
    }))

    function onCreate(title: string): void {
        const nextId = index
        setIndex(nextId + 1)
        setTask((prev) => [...prev, {
            title,
            id: nextId,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-2xl mx-auto p-6 md:py-12 flex flex-col gap-4">

                <header className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <ListTodo className="size-6 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Task Tracker
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        Organize seu dia a dia, gerencie suas atividades e acompanhe seu progresso.
                    </p>
                </header>

                <Separator />

                <TaskContainer deleteTask={onDelete} tasks={task} updateTask={onEdit} createTask={onCreate} />

            </main>
        </div>
    )
}