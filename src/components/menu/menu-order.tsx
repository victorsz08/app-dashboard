"use client";

import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { UpdateScheduling } from "../dialog/update-scheduling";
import { ContractDataType } from "@/types/contract.type";
import { UpdateStatusForm } from "../dialog/update-status";


export function MenuOrder({ data } : { data: ContractDataType }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <UpdateScheduling data={data} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateStatusForm data={data}/>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}