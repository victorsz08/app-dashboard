"use client";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ptBR } from "date-fns/locale";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { StatusBadge, StatusBadgeVariant } from "../status-badge/status-badge";
import { Dropdown } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CreateOrderDialog } from "../dialogs/create-order-dialog";
import { UpdateSchedulingDialog } from "../dialogs/update-scheduling-dialog";
import { UpdateStatusDialog } from "../dialogs/update-status-dialog";

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
        <CardTitle className="text-slate-600">Pedidos Recentes</CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Contratos com agendamentos previsto para hoje dia{" "}
          {format(currentDate, "dd/MMMM", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex justify-end mb-3">
          <CreateOrderDialog/>
        </section>
        <Table className="text-xs rounded-2xl mt-1 overflow-clip">
          <TableHeader className="bg-slate-100 border-none">
            <TableRow>
              <TableHead>Contrato</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead className="text-center w-[180px]">Status</TableHead>
              <TableHead className="text-center border-none w-[150px]">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-slate-500">
            {orders.map((order) => (
              <TableRow key={order.number}>
                <TableCell>{order.number}</TableCell>
                <TableCell>{order.local}</TableCell>
                <TableCell>
                  {format(new Date(order.scheduleDate), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{order.scheduleTime}</TableCell>
                <TableCell className="w-[180px]" align="center">
                  <StatusBadge
                    variant={order.status as StatusBadgeVariant}/>
                </TableCell>
                <TableCell className="w-[150px]" align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className="cursor-pointer text-xs"
                    >
                      <Button variant="default" className="h-8 bg-slate-950 text-white hover:bg-slate-800">
                        Editar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 py-2 flex flex-col flex-nowrap space-y-2">
                      <DropdownMenuItem asChild>
                        <UpdateSchedulingDialog data={{ schedulingDate: new Date(order.scheduleDate), schedulingTime: "08h as 12h", number: order.number, local: order.local }}/>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <UpdateStatusDialog data={order}/>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-xs">
                        Ver detalhes
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
