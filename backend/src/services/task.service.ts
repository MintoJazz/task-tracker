import { getNextId, tasks } from "../database/db";
import { Task } from "../models/task.model";

export const taskService = {
    findAll: () => tasks,
    findById: (id: number) => tasks.find(t => t.id === id),
    updateTask: (id: number, taskData: Partial<Task>) => {
        const taskIndex = tasks.findIndex(t => t.id === id)

        if (taskIndex === -1) return null
        
        const updatedTask = {
            ...tasks[taskIndex],
            ...taskData,
            updatedAt: new Date()
        }
        
        tasks[taskIndex] = updatedTask
        return updatedTask

    },
    createTask: (title: string) => {
        const newTask: Task = {
            id: getNextId(),
            title: title,
            isComplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        tasks.push(newTask)
        return newTask
    },
    killTask: (id: number) => {
        const taskIndex = tasks.findIndex(t => t.id === id)

        if (taskIndex === -1) return false
        
        tasks.splice(taskIndex, 1)
        return true
    }
}