import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"

interface DeleteTaskProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onDeleted: () => void
}

export default function DeleteTask({ open, onOpenChange, onDeleted }: DeleteTaskProps) {
    return <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que quer deletar essa tarefa?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta ação não pode ser desfeita. 
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleted}>Excluir</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}