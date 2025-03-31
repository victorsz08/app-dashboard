"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CreateOrderForm } from "../forms/create-order-form";
import { Separator } from "../ui/separator";

 



export function CreateOrderDialog() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-xs font-semibold cursor-pointer">
                    <Plus size={10} strokeWidth={3}/>
                    <span>Novo Contrato</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-slate-600">Criar Novo Contrato</DialogTitle>
                    <DialogDescription className="text-xs text-slate-500">Preencha todos os campos do formulário</DialogDescription>
                </DialogHeader>
                <Separator className="mb-2"/>
                <CreateOrderForm/>
            </DialogContent>
        </Dialog>
    )
}