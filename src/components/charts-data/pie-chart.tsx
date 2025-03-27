"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Type for the date range
interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

// Type for our chart data
interface StatusData {
  status: string
  quantidade: number
  fill: string
}

// Chart configuration
const chartConfig = {
  quantidade: {
    label: "Quantidade",
  },
  instaladas: {
    label: "Instaladas",
    color: "var(--chart-1)",
  },
  pendentes: {
    label: "Pendentes",
    color: "var(--chart-2)",
  },
  canceladas: {
    label: "Canceladas",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

// Function to generate data based on date range
const generateStatusData = (dateRange: DateRange): StatusData[] => {
  // If we don't have a complete date range, return empty data
  if (!dateRange.from || !dateRange.to) {
    return []
  }

  // Calculate a seed based on the date range to make the random data consistent
  // for the same date range
  const seed = dateRange.from.getTime() + (dateRange.to.getTime() % 10000)
  const getRandom = (min: number, max: number, seed: number) => {
    const x = Math.sin(seed) * 10000
    const rand = x - Math.floor(x)
    return Math.floor(rand * (max - min + 1)) + min
  }

  // Generate data for each status
  return [
    {
      status: "instaladas",
      quantidade: getRandom(80, 150, seed + 1),
      fill: "var(--color-instaladas)",
    },
    {
      status: "pendentes",
      quantidade: getRandom(80, 150, seed + 1),
      fill: "var(--color-pendentes)",
    },
    {
      status: "canceladas",
      quantidade: getRandom(50, 120, seed + 2),
      fill: "var(--color-canceladas)",
    },
  ]
}

interface PieChartByDateProps {
  dateRange: DateRange
}

export function PieChartByDate({ dateRange }: PieChartByDateProps) {
  const [chartData, setChartData] = React.useState<StatusData[]>([])

  // Update chart data when date range changes
  React.useEffect(() => {
    setChartData(generateStatusData(dateRange))
  }, [dateRange])

  // Calculate total
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantidade, 0)
  }, [chartData])

  // Format date for display
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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status de Instalações</CardTitle>
        <CardDescription>{formatDateRange()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantidade" nameKey="status" innerRadius={60} strokeWidth={3}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {total.toLocaleString("pt-BR")}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando status de instalações para o período selecionado
        </div>
      </CardFooter>
    </Card>
  )
}

