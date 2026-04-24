import { Task } from "../models/task.model";

export const tasks: Task[] = []

let nextId = 1
export const getNextId = () => nextId++