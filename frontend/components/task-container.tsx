import { useManager } from "@/hooks/use-manager"
import { Task } from "@/types/task"
import TaskCard from "./task-card"
import DeleteTask from "./task-delete"
import UpdateTask from "./task-update"
import CreateTask from "./task-create"

interface TaskContainerProps {
    tasks: Task[]
    createTask: (title: string) => void
    updateTask: (taskId: number, task: Partial<Task>) => void
    deleteTask: (taskId: number) => void
}


export function TaskContainer({ tasks, createTask, deleteTask, updateTask }: TaskContainerProps) {
    const { target, onEdit, onDelete, onCloseUpdate, onCloseDelete, isUpdateOpen, isDeleteOpen } = useManager<Task>()

    const onChecked = (taskId: number, isCompleted: boolean) => updateTask(taskId, { isCompleted })

    const onUpdated = (title: string) => {
        updateTask(target!.id, { title })
        onCloseUpdate(false)
    }

    const onDeleted = () => {
        deleteTask(target!.id)
        onCloseDelete(false)
    }

    return (
        <div className="flex flex-col gap-6">
            <CreateTask onCreated={createTask} />

            <div className="flex flex-col gap-2">{tasks.map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onChecked={onChecked} />)}</div>

            {(target) && <>
                <UpdateTask open={isUpdateOpen} onOpenChange={onCloseUpdate} onUpdated={onUpdated} initialTitle={target?.title} />
                <DeleteTask open={isDeleteOpen} onOpenChange={onCloseDelete} onDeleted={onDeleted} />
            </>}
        </div>
    )
}