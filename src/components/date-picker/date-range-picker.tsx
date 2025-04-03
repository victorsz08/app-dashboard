"use client";

import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

export type DateRangePickerProps = {
  date: DateRange | undefined;
  setDate: (newDate: DateRange | undefined) => void;
};

export function DateRangePicker({ date, setDate }: DateRangePickerProps) {
  return (
    <div className="grid gap-2">
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className="w-[250px] text-slate-500 justify-start font-normal"
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                {format(date.to, "LLL dd, y", { locale: ptBR })}
              </>
            ) : (
              format(date.from, "LLL dd, y", { locale: ptBR })
            )
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar 
            initialFocus
            locale={ptBR}
            mode="range"
            selected={date}
            onSelect={(newDate) => setDate(newDate)}
            numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
    </div>
  );
}
