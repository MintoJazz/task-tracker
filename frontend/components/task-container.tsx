'use client'

import { useManager } from "@/hooks/use-manager"
import { Task } from "@/types/task"
import TaskCard from "./task-card"
import DeleteTask from "./task-delete"
import UpdateTask from "./task-update"
import CreateTask from "./task-create"
import { useState } from "react"

interface TaskContainerProps {
    initialTasks: Task[]
    createTask: (title: string) => Promise<Task>
    updateTask: (taskId: number, task: Partial<Task>) => Promise<Task>
    deleteTask: (taskId: number) => Promise<void>
}


export function TaskContainer({ initialTasks, createTask, deleteTask, updateTask }: TaskContainerProps) {
    const { target, onEdit, onDelete, onCloseUpdate, onCloseDelete, isUpdateOpen, isDeleteOpen } = useManager<Task>()
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    async function onCreated(title: string) {
        const prevTasks = tasks

        try {
            const newTask = await createTask(title)
            setTasks(prev => [...prev, newTask])
        } catch (error) {
            console.log(error)
            setTasks(prevTasks)
        }
    }

    async function onUpdated(taskData: Partial<Task>, taskId?: number) {
        const prevTasks = tasks
        const id = target?.id ?? taskId 

        try {
            setTasks(prev => prev.map(t => (t.id === id) ? { ...t, ...taskData } : t))
            await updateTask(target!.id, taskData)
        } catch (error) {
            console.log(error)
            setTasks(prevTasks)
        }

        onCloseUpdate(false)
    }

    async function onDeleted() {
        const prevTasks = tasks

        try {
            setTasks(prev => prev.filter(t => t.id != target?.id))
            await deleteTask(target!.id)
        } catch (error) {
            console.log(error)
            setTasks(prevTasks)
        }

        onCloseDelete(false)
    }

    return (
        <div className="flex flex-col gap-6">
            <CreateTask onCreated={onCreated} />

            <div className="flex flex-col gap-2">{tasks.map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onChecked={onUpdated} />)}</div>

            {(target) && <>
                <UpdateTask open={isUpdateOpen} onOpenChange={onCloseUpdate} onUpdated={onUpdated} initialTitle={target?.title} />
                <DeleteTask open={isDeleteOpen} onOpenChange={onCloseDelete} onDeleted={onDeleted} />
            </>}
        </div>
    )
}