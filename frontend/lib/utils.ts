import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { twMerge } from "tailwind-merge"

export const formatarData = (data: Date): string => (data) && format(data, "dd'/'MM'/'yyyy", { locale: ptBR });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
