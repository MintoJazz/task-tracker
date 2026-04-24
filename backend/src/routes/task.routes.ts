import { Router } from "express";
import { taskController } from "../controllers/task.controller";

export const taskRouter = Router();

taskRouter.get('/', taskController.findAll);
taskRouter.get('/:id', taskController.findById);
taskRouter.post('/', taskController.create);
taskRouter.put('/:id', taskController.update);
taskRouter.delete('/:id', taskController.kill);