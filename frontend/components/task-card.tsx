import { Task } from "@/types/task";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { formatarData } from "@/lib/utils";

interface TaskCardProps {
    task: Task
    onDelete: (task: Task) => void
    onEdit: (task: Task) => void
    onChecked: (taskId: number, isComplete: boolean) => void
}

export default function TaskCard({ task, onDelete, onEdit, onChecked }: TaskCardProps) {
    return <Item variant={"outline"} className="group">
        <ItemContent>
            <ItemTitle>
                <Field orientation={"horizontal"}>
                    <Checkbox id={`is-completed-${task.id}`} onCheckedChange={() => onChecked(task.id, !task.isCompleted)} name="is-completed" defaultChecked={task.isCompleted} />
                    <Label className={(task.isCompleted) ? "line-through" : ""} htmlFor={`is-completed-${task.id}`}>{task.title}</Label>
                </Field>
            </ItemTitle>
            <ItemDescription className="italic text-xs">{formatarData(task.createdAt)}</ItemDescription>
        </ItemContent>
        <ItemActions className="opacity-0 invisible group-hover:opacity-80 group-hover:visible ">
            <Button onClick={() => onEdit(task)} className="cursor-pointer" size={"icon-sm"} variant={"ghost"}><Pencil /></Button>
            <Button onClick={() => onDelete(task)} className="cursor-pointer" size={"icon-sm"} variant={"ghost"}><Trash2 /></Button>
        </ItemActions>
    </Item >
}