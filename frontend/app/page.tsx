import TaskCard from "@/components/task-list/task-card"
import { STATUS_CONFIG } from "@/lib/contants"
import { Task, TaskStatus } from "@/types/task"

export default function Page() {
    const task: Task = {
        id: 1,
        title: 'Testee',
        status: TaskStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    return (
        <div className="flex justify-center items-center min-h-screen max-w-2xl p-6 mx-auto">
            <TaskCard task={task} statusConfig={STATUS_CONFIG[task.status]}/>
        </div>
    )
}
