'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "./ui/input-group";
import { useState } from "react";

interface UpdateTaskProps {
    open: boolean
    initialTitle: string
    onUpdated: (taskData: {title: string}) => void
    onOpenChange: (open: boolean) => void
}

export default function UpdateTask({ open, onOpenChange, initialTitle, onUpdated }: UpdateTaskProps) {
    const [title, setTitle] = useState<string>(initialTitle)

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <Field className="max-w-sm">
                    <DialogTitle>
                        <FieldLabel htmlFor="inline-start-input">Editar Título</FieldLabel>
                    </DialogTitle>
                    <InputGroup>
                        <InputGroupInput id="inline-start-input" placeholder="Search..." value={title} onChange={(e) => setTitle(e.target.value)} />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton variant="secondary" onClick={() => onUpdated({title})}>Salvar</InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>Edite o título desta tarefa.</FieldDescription>
                </Field>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}