'use client'

import TaskCard from "@/components/task-list/task-card"
import { Task } from "@/types/task"

export default function Page() {
    const task: Task = {
        id: 1,
        title: 'Testee',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    function onEdit(task: Task) {
        console.log(task, 'editou');
    }

    function onDelete(task: Task) {
        console.log(task, 'deletou1');
    }

    return (
        <div className="flex justify-center items-center min-h-screen max-w-2xl p-6 mx-auto">
            <TaskCard task={task} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    )
}
