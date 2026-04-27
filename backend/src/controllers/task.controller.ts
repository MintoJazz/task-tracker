import { Request, Response } from 'express';
import { Task } from '../models/task.model';
import { taskService } from '../services/task.service';

export const taskController = {
    findAll: (_req: Request, res: Response) => res.json(taskService.findAll()),
    findById: (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string)
        const task = taskService.findById(id)

        if (task) res.json(task)
        else res.status(404).json({ message: 'Tarefa não encontrada' })
    },
    update: (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string)
        const taskData: Partial<Task> = { ...req.body }

        const updatedTask = taskService.updateTask(id, taskData)
        
        if (updatedTask) res.json(updatedTask)
        else res.status(404).json({ message: 'Tarefa não encontrada' })
    },
    create: (req: Request, res: Response) => {
        const title = req.body.title

        if (!title) {
            res.status(400).json({ message: 'O campo "title" é obrigatório' })
            return
        }

        const newTask = taskService.createTask(title)
        res.status(201).json(newTask)

    },
    kill: (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string)
        const success = taskService.killTask(id)

        if (success) res.json({ message: 'Tarefa removida com sucesso' })
        else res.status(404).json({ message: 'Tarefa não encontrada' })
    }
}