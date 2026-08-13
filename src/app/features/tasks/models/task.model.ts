import { Status } from "../../status/models/status.model";

export interface TaskLog {
  id: string;
  timestamp: string; 
  status: Status; 
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  currentStatus: Status; 
  statusLog: TaskLog[];
}