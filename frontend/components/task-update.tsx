'use client'

import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Field, FieldLabel, FieldDescription } from "./ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "./ui/input-group";
import { useState } from "react";

interface UpdateTaskProps {
    open: boolean
    initialTitle: string
    onUpdated: (title: string) => void
    onOpenChange: (open: boolean) => void
}

export default function UpdateTask({ open, onOpenChange, initialTitle, onUpdated }: UpdateTaskProps) {
    const [titleField, setTitleField] = useState<string>(initialTitle)

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <Field className="max-w-sm">
                    <FieldLabel htmlFor="inline-start-input">Editar Título</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="inline-start-input" placeholder="Search..." value={titleField} onChange={(e) => setTitleField(e.target.value)} />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton variant="secondary" onClick={() => onUpdated(titleField)}>Salvar</InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>Edite o título desta tarefa.</FieldDescription>
                </Field>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}