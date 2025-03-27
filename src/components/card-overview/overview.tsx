"use client";

import { useState } from "react";
import { DatePickerWithRange } from "../date-range/date-range";
import { DateRange } from "../date-range/date-range";
import { startOfMonth, subDays } from "date-fns";
import { CardReport } from "./card-report";
import { ChartNoAxesColumnIncreasing, Handshake, Landmark } from "lucide-react";
import { DailyBarChart } from "../charts-data/bar-chart";
import { PieChartByDate } from "../charts-data/pie-chart";
import { DataTableToday } from "../data-table/table-orders-today";




export function Overview() {
    const [dateRange, setDateRange] = useState<DateRange>( {
        to: new Date(),
        from: subDays(new Date(), 7)
    });


    return (
        <section className="space-y-4">
            <section className="flex w-full items-baseline justify-between py-3">
                <p className="font-semibold ml-1 text-xl text-slate-600">Overview</p>
                <DatePickerWithRange dateRange={dateRange} onDateChange={(newDate) => setDateRange(newDate)}/>
            </section>
            <section className="flex space-x-4">
                <CardReport 
                    title="Faturamento total" 
                    icon={Landmark} 
                    value={5140.80} 
                    type="currency"
                    compare={22}
                    small="Valores de vendas instaladas"
                />
                <CardReport
                    title="Vendas totais"
                    icon={Handshake}
                    value={58}
                    type="number"
                    compare={10}
                    small="Vendad concluídas"
                />
                <CardReport
                    title="Percentual de instalação"
                    icon={ChartNoAxesColumnIncreasing}
                    value={90}
                    type="percentage"
                    compare={-10}
                    small="Relatórios de vendas instaladas"
                />
            </section>
            <section className="flex space-x-4 w-full">
                <DailyBarChart dateRange={dateRange}/>
                <PieChartByDate dateRange={dateRange}/>
            </section>
            <section>
                <DataTableToday/>
            </section>
        </section>
    )
}