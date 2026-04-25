"use server"

import { Task } from "./types/task"

export async function getTasks() {
    const res = await fetch(`${process.env.API_URL}api/tasks`)
    if (!res.ok) {
        console.log(res);
        throw new Error('Falha ao buscar a lista de tarefas.')
    }

    return res.json() as unknown as Task[]
}

export async function createTask(title: string) {
    const res = await fetch(`${process.env.API_URL}api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    })
    
    if (!res.ok) throw new Error('Falha ao criar a tarefa.')
        
    return res.json() as unknown as Task
}

export async function updateTask(taskId: number, taskData: Partial<Task>) { 
    const res = await fetch(`${process.env.API_URL}api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    
    if (!res.ok) throw new Error('Falha ao atualizar a tarefa.')
        
    return res.json() as unknown as Task
}

export async function deleteTask(taskId: number) {
    const res = await fetch(`${process.env.API_URL}api/tasks/${taskId}`, {
        method: 'DELETE'
    })
    
    if (!res.ok) throw new Error('Falha ao deletar a tarefa.')
}