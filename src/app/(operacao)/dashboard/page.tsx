"use client";

import { CardOverview } from "@/components/card/card-overview";
import { DailyBarChart } from "@/components/charts/bar-chart";
import { PieChartByDate } from "@/components/charts/pie-chart";
import { DailyOrderData } from "@/components/data-table/daily-data-today";
import { DateRangePicker } from "@/components/date-picker/date-range-picker";
import { subDays } from "date-fns";
import { ChartArea,  ChartBarIcon, ChartColumn } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })
  
  return (
    <section className="p-4 space-y-4">
     <section className="flex justify-end">
        <DateRangePicker date={date} setDate={setDate}/>
     </section>
     <section className="flex space-x-4">
      <CardOverview description="Realtorio de Faturamento dos últimos dias" trending={12} icon={ChartBarIcon} title="Faturamento" value={4184.80}  type="currency"/>
      <CardOverview description="Total de vendas concluídas" trending={-12} icon={ChartArea} title="Vendas" value={45}  type="unit"/>
      <CardOverview description="Percentual de vendas instaladas" trending={8} icon={ChartColumn} title="Instalação" value={0.85}  type="percent"/>
     </section>
     <section className="flex space-x-4">
      <DailyBarChart dateRange={date}/>
      <PieChartByDate dateRange={date}/>
     </section>
     <section>
      <DailyOrderData/>
     </section>
    </section>
  );
}