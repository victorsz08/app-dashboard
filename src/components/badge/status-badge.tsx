"use client";

import { StatusType } from "../data-table/daily-data-today";
import { Badge } from "../ui/badge";


export type StatusBadgeType = {
    variant: StatusType;
};

export function StatusBadge(props: StatusBadgeType) {
    const color = props.variant === "pendente" ? "text-orange-600 bg-orange-50" :
                props.variant === "conectado" ? "text-green-600 bg-green-50" :
                "text-red-600 bg-red-50" 

    return (
        <Badge className={`${color} text-[10px] font-medium px-2 py-[4px] rounded-full`}>
            
            {props.variant}
        </Badge>
    )
}