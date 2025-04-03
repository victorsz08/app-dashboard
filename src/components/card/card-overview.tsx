"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export type CardOverviewProps = {
    title: string;
    icon: LucideIcon;
    value: number;
    type: "currency" | "percent" | "unit";
    description?: string;
    trending: number;
};



export function CardOverview(props: CardOverviewProps) {
    let formattedValue;
    if(props.type !== "unit") {
        formattedValue = new Intl.NumberFormat("pt-BR", {
            style: props.type,
            currency: "BRL",
            maximumFractionDigits: 2,
        }).format(props.value);
    } else {
        formattedValue = props.value
    };


  
    return (
        <Card className="w-full shadow-none tracking-tighter gap-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-slate-500">
                    <span className="text-sm font-light">{props.title}</span>
                    <props.icon size={16}/>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <section className="flex justify-between items-center">
                    <div className="text-2xl tracking-tight font-bold text-slate-600">
                        {formattedValue}
                    </div>
                    <span className={`${props.trending && props.trending > 0 ? "text-green-500 bg-green-100" 
                        : "text-red-500 bg-red-100"} 
                        text-xs tracking-normal px-2 py-[5px] rounded-sm font-light w-fit flex items-center gap-1`}>
                        <span>{props.trending}%</span>
                        {props.trending > 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                    </span>
                </section>
            </CardContent>
            <CardFooter>
                <CardDescription className="text-xs font-light text-slate-400">
                     {props.description}
                </CardDescription>
            </CardFooter>
        </Card>
  );
}