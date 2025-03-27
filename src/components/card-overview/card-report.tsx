"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export type CardReportProps = {
  title: string;
  icon: LucideIcon;
  value: number;
  compare?: number;
  type: "currency" | "percentage" | "number";
  small: string;
};

export function CardReport(props: CardReportProps) {
  return (
    <Card className="w-full px-3 py-8 shadow-none select-none">
      <CardContent>
        <div className="flex items-center justify-between mb-2">
        <p className="text-slate-600 dark:text-slate-200 font-normal text-sm">
            {props.title}
        </p>
        <props.icon size={24} className="text-slate-600 dark:text-slate-200" />
        </div>
        <div className="flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tighter text-slate-700 dark:text-slate-200">
            {props.type === "currency"
            ? `R$ ${props.value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })}`
            : props.type === "percentage"
            ? `${props.value.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
                })}%`
            : props.value}
        </span>
            <Badge variant="secondary" 
                className={`${props.compare && props.compare > 0 ? "bg-green-300 text-green-700" 
                : "bg-red-300 text-red-700"} text-[10px]`}>
                    {props.compare && props.compare > 0 ? 
                        <span>+{props.compare}%</span> 
                    : 
                        <span>{props.compare}%</span>
                    }
            </Badge>
        </div>
        <span className="text-xs font-light text-slate-400">{props.small}</span>
      </CardContent>
    </Card>
  );
}
