"use client";


import { UpdateSchedulingForm } from "../forms/update-scheduling-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";




export function UpdateSchedulingDialog({ data } : { data: { schedulingDate: Date, schedulingTime: string, number: number, local: string } }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="text-xs text-slate-700 px-2 cursor-pointer">Editar Agendamento</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-slate-600">Atualizar Agendamento</DialogTitle>
                    <DialogDescription className="text-slate-500 text-xs">
                        Contrato: {data.number} {" - "}{data.local}
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <UpdateSchedulingForm data={data}/>
            </DialogContent>
        </Dialog>
    )
}