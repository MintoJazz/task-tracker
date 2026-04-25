import { Task } from "@/types/task";
import { Item, ItemActions, ItemContent, ItemTitle } from "../ui/item";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
    task: Task
    onDelete: (task: Task) => void
    onEdit: (task: Task) => void
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
    return <Item variant={"outline"} className="group">
        <ItemContent>
            <ItemTitle>
                <Button variant={"ghost"}>{task.title}</Button>
            </ItemTitle>
        </ItemContent>
        <ItemActions className="opacity-0 invisible group-hover:opacity-80 group-hover:visible ">
            <Button onClick={() => onEdit(task)} className="cursor-pointer" size={"icon-sm"} variant={"ghost"}><Pencil/></Button>
            <Button onClick={() => onDelete(task)} className="cursor-pointer" size={"icon-sm"} variant={"ghost"}><Trash2/></Button>
        </ItemActions>
    </Item>
}