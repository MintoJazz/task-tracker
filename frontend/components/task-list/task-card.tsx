import { Task } from "@/types/task";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { StatusConfig } from "@/lib/contants";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface TaskCardProps {
    task: Task
    statusConfig: StatusConfig
}

export default function TaskCard({ task, statusConfig }: TaskCardProps) {
    return <Item variant={"outline"} className="group">
        <ItemContent>
            <ItemTitle>{task.title}</ItemTitle>
            <ItemDescription>
                <Badge className={cn(statusConfig.color, "")}>{statusConfig.label}</Badge>
            </ItemDescription>
        </ItemContent>
        <ItemActions className="opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
            <Button className="cursor-pointer" size={"sm"} variant={"ghost"}><Pencil /></Button>
            <Button className="cursor-pointer" size={"sm"} variant={"ghost"}><Trash2 /></Button>
        </ItemActions>
    </Item>
}