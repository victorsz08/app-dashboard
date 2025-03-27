"use client";

import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ptBR } from "date-fns/locale";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


const orders = [
    {
        number: 1,
        local: "São Paulo",
        scheduleDate: "2025-03-27",
        scheduleTime: "10:00",
        status: "pendente",
    },
    {
        number: 2,
        local: "Rio de Janeiro",
        scheduleDate: "2025-03-27",
        scheduleTime: "11:30",
        status: "conectado",
    },
    {
        number: 3,
        local: "Belo Horizonte",
        scheduleDate: "2025-03-27",
        scheduleTime: "14:00",
        status: "cancelado",
    },
    {
        number: 4,
        local: "Curitiba",
        scheduleDate: "2025-03-27",
        scheduleTime: "15:45",
        status: "pendente",
    },
    {
        number: 5,
        local: "Porto Alegre",
        scheduleDate: "2025-03-27",
        scheduleTime: "16:30",
        status: "conectado",
    },
];


export function DataTableToday() {
    const currentDate = new Date();
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>
                    Contratos com agendamentos previsto para hoje, dia {" "}
                    {format(currentDate, "dd/MMMM", { locale: ptBR })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <section className="flex justify-end mb-2">
                    <Button className="cursor-pointer">+ Adicionar Contrato</Button>
                </section>
                <Separator/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Contrato</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.number}>
                                <TableCell>{order.number}</TableCell>
                                <TableCell>{order.local}</TableCell>
                                <TableCell>{format(order.scheduleDate, "dd/MM/yyyy")}</TableCell>
                                <TableCell>{order.scheduleTime}</TableCell>
                                <TableCell>
                                    <span className={`text-${order.status === "pendente" ? "orange" : order.status === "conectado" ? "green" : "red"}-500`}>
                                        {order.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}