"use client";

import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ContractDataType } from "@/types/contract.type";
import { Suspense, use  } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";


// 646fff88-8e53-458c-bf40-2bbaf4a7a81e
export function DailyOrderData() {
    const data = use<ContractDataType[]>(onSubmit())
    const currentDate = new Date();

  async function onSubmit() {
    const data: any[] = 
        await fetch("https://api.notetools.online/contracts?userId=646fff88-8e53-458c-bf40-2bbaf4a7a81e&status=PENDENTE", {
        method: "get",
    }).then(res => res.json());

    const dataList: ContractDataType[] = data.map((item) => {
        return {
            id: item.id,
            number: item.number,
            local: item.local,
            observation: "",
            schedulingDate: item.installationDate,
            schedulingTime: item.installationHour,
            price: item.price,
            contact: item.phone,
            userId: item.userId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            status: item.status
        }
    });

    return dataList;
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription></CardDescription>
        </CardHeader>
      <CardContent>
        <Suspense fallback={<p>Carregando...</p>}>
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
                <TableCell></TableCell>
                <TableCell className="w-[120px]">
                  <EllipsisVertical size={14} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Suspense>
      </CardContent>
    </Card>
  );
}
