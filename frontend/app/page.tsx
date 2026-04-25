import { TaskContainer } from "@/components/task-container" 
import { Separator } from "@/components/ui/separator"
import { ListTodo } from "lucide-react"
import { createTask, deleteTask, getTasks, updateTask } from "@/actions"

export default async function Page() {
    const tasks = await getTasks()

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

                <TaskContainer createTask={createTask} deleteTask={deleteTask} initialTasks={tasks} updateTask={updateTask} />

            </main>
        </div>
    )
}