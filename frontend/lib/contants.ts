import { TaskStatus } from "@/types/task";

export interface StatusConfig {
    color: string;
    label: string;
}

export const STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
    [TaskStatus.PENDING]: {
        color: "bg-yellow-500",
        label: "Pending"
    },
    [TaskStatus.IN_PROGRESS]: {
        color: "bg-blue-500",
        label: "In Progress"
    },
    [TaskStatus.COMPLETED]: {
        color: "bg-green-500",
        label: "Completed"
    }
}