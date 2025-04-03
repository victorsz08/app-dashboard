"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"


interface DayData {
  day: string
  instalados: number
  cancelados: number
}

const chartConfig = {
  instalados: {
    label: "Instalados",
    color: "var(--color-purple-700)",
  },
  cancelados: {
    label: "Cancelados",
    color: "var(--color-purple-400)",
  },
} satisfies ChartConfig


const generateDaysData = (dateRange: DateRange): DayData[] => {
  const data: DayData[] = []

  if (!dateRange?.from || !dateRange?.to) {
    return data
  }

  const currentDate = new Date(dateRange.from)
  const endDate = new Date(dateRange.to)

  while (currentDate <= endDate) {
    data.push({
      day: format(currentDate, "dd/MM"), // Just the day number
      instalados: Math.floor(Math.random() * 50) + 10, // Random data for demo
      cancelados: Math.floor(Math.random() * 30) + 5, // Random data for demo
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}

interface DailyBarChartProps {
  dateRange: DateRange | undefined;
}

export function DailyBarChart({ dateRange }: DailyBarChartProps) {
  const [chartData, setChartData] = useState<DayData[]>([])

  useEffect(() => {
    setChartData(generateDaysData(dateRange!))
  }, [dateRange])

  const formatDateRange = () => {
    if (!dateRange?.from || !dateRange.to) return "Selecione um período"

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date)
    }

    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-slate-600">Instalações e Cancelamentos</CardTitle>
        <CardDescription className="text-xs">{formatDateRange()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="instalados" fill="var(--color-instalados)" radius={4} />
            <Bar dataKey="cancelados" fill="var(--color-cancelados)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center justify-start gap-4">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block rounded-xs" style={{ backgroundColor: chartConfig.instalados.color }}/>
            <p className="text-xs text-slate-500">{chartConfig.instalados.label}</p>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block rounded-xs" style={{ backgroundColor: chartConfig.cancelados.color }}/>
            <p className="text-xs text-slate-500">{chartConfig.cancelados.label}</p>
          </span>
        </div>
        <div className="leading-none text-xs text-center text-muted-foreground">
          Mostrando instalações e cancelamentos para o período selecionado
        </div>
      </CardFooter>
    </Card>
  )
}
