"use client"

import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { format } from "date-fns"

// Type for the date range
interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

// Type for our chart data
interface DayData {
  day: string
  instalados: number
  cancelados: number
}

const chartConfig = {
  instalados: {
    label: "Instalados",
    color: "var(--chart-1)",
  },
  cancelados: {
    label: "Cancelados",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Function to generate data for days in a date range
const generateDaysData = (dateRange: DateRange): DayData[] => {
  const data: DayData[] = []

  // If we don't have a complete date range, return empty data
  if (!dateRange.from || !dateRange.to) {
    return data
  }

  const currentDate = new Date(dateRange.from)
  const endDate = new Date(dateRange.to)

  // Loop through each day in the range
  while (currentDate <= endDate) {
    data.push({
      day: format(currentDate, "dd/MM"), // Just the day number
      instalados: Math.floor(Math.random() * 50) + 10, // Random data for demo
      cancelados: Math.floor(Math.random() * 30) + 5, // Random data for demo
    })

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}

interface DailyBarChartProps {
  dateRange: DateRange
}

export function DailyBarChart({ dateRange }: DailyBarChartProps) {
  const [chartData, setChartData] = useState<DayData[]>([])

  // Update chart data when date range changes
  useEffect(() => {
    setChartData(generateDaysData(dateRange))
  }, [dateRange])

  const formatDateRange = () => {
    if (!dateRange.from || !dateRange.to) return "Selecione um período"

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    }

    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Instalações e Cancelamentos</CardTitle>
        <CardDescription>{formatDateRange()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[220px]">
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
        <div className="leading-none text-muted-foreground">
          Mostrando instalações e cancelamentos para o período selecionado
        </div>
      </CardFooter>
    </Card>
  )
}

