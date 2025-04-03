"use client";

import { EllipsisVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type StatusType = "pendente" | "conectado" | "cancelado"

export type DailyOrderDataType = {
    id: string;
    number: string;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    status: StatusType;
};

export function DailyOrderDataType({ data } : { data: DailyOrderDataType[] }) {
    
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-slate-100 text-slate-500">
                    <TableHead>N° do Contrato</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Data de Agendamento</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[120px]">
                        <EllipsisVertical size={14} />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id} className="text-slate-600">
                        <TableCell>{item.number}</TableCell>
                        <TableCell>{item.local}</TableCell>
                        <TableCell>
                                {format(item.schedulingDate, "dd MMM yy", { locale: ptBR })}
                        </TableCell>
                        <TableCell>{item.schedulingTime}</TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell className="w-[120px]">
                            <EllipsisVertical size={14} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
} 