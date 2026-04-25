import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "./ui/input-group";
import { Plus } from "lucide-react";

interface CreateTaskProps {
    onCreated: (title: string) => void
}

export default function CreateTask({ onCreated }: CreateTaskProps) {
    const [titleField, setTitleField] = useState<string>("")

    function handleCreate() {
        setTitleField("")
        onCreated(titleField)
    }

    return <Field>
        <FieldLabel htmlFor="inline-start-input">Insíra uma nova tarefa</FieldLabel>
        <InputGroup>
            <InputGroupInput id="inline-start-input" placeholder="Nova Tarefa..." value={titleField} onChange={(e) => setTitleField(e.target.value)} />
            <InputGroupAddon align="inline-end">
                <InputGroupButton variant="secondary" onClick={() => handleCreate()}><Plus /></InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Digite o título de uma nova tarefa.</FieldDescription>
    </Field>
}