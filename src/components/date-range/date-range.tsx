"use client";

import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DateRange {
    from: Date
    to: Date
};

export interface DateFiltersProps {
    dateRange: DateRange;
    onDateChange: (newDate: DateRange) => void;
}

export function DatePickerWithRange({
  dateRange,
  onDateChange,
}: DateFiltersProps) {
  const [filterPeriod, setFilterPeriod] = useState<string>("");

  const handleFilterChange = (period: string) => {
    setFilterPeriod(period);

    const today = new Date();
    let from = today;
    let to = today;

    if (period === "7d") {
      from = subDays(today, 7);
    } else if (period === "14d") {
      from = subDays(today, 14);
    } else if (period === "30d") {
      from = subDays(today, 30);
    } else if (period === "1d") {
      from = subDays(today, 1);
      to = subDays(today, 1);
    } else if (period === "today") {
      from = today;
    } else {
      return;
    }

    onDateChange({
      from,
      to,
    });
  };


  const handleDateRangeChange = (range: DateRange | any) => {
    onDateChange(range)
    setFilterPeriod("custom")
}


  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left text-xs text-slate-600 font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(dateRange.to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <section className="flex items-start gap-3">
            <Tabs
              className="flex flex-col gap-1 bg-white text-start"
              value={filterPeriod}
              onValueChange={handleFilterChange}
            >
              <TabsList className="flex flex-col gap-2 h-full p-3 text-start bg-white">
                <TabsTrigger
                  className="data-[state=active]:shadow-none 
                          data-[state=active]:text-purple-700 flex cursor-pointer justify-start p-2 w-full"
                  value="30d"
                >
                  Últimos 30 dias
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:shadow-none 
                        data-[state=active]:text-purple-700 flex cursor-pointer justify-start p-2 w-full"
                  value="7d"
                >
                  Últimos 7 dias
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:shadow-none 
                        data-[state=active]:text-purple-700 flex cursor-pointer justify-start p-2 w-full"
                  value="1d"
                >
                  Ontem
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:shadow-none 
                        data-[state=active]:text-purple-700 flex cursor-pointer justify-start p-2 w-full"
                  value="today"
                >
                  Hoje
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
              locale={ptBR}
            />
          </section>
        </PopoverContent>
      </Popover>
    </div>
  );
}
