"use client";

import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

type OrderStatus = "pendente" | "cancelado" | "reagendar" | "conectado";

export type OrderDataType = {
    id: string;
    number: string;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    status: OrderStatus;
}

export function MenuOrder() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}