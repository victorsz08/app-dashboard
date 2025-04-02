"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { UpdateStatusForm } from "../forms/update-status-form";

export type OrderDataType = {
  number: number;
  local: string;
  status: string;
}

export function UpdateStatusDialog({ data } : { data: OrderDataType }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-xs text-slate-700 pl-2 cursor-pointer">
          Editar Status
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-slate-600">
            Atualizar Agendamento
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs"></DialogDescription>
        </DialogHeader>
        <Separator />
        <UpdateStatusForm status={data.status}/>
      </DialogContent>
    </Dialog>
  );
}
