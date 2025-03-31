"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  selected,
  ...props
}: React.ComponentProps<typeof Calendar>) {

  return (
    <Popover modal>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-start text-left font-normal text-xs text-slate-600",
          !selected && "text-muted-foreground"
        )}
      >
        <CalendarIcon />
        {selected ? format(selected as Date, "PPP", { locale: ptBR }) : <span className="text-slate-500"></span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        className="text-xs text-slate-600"
        mode="single"
        {...props}
        initialFocus
        locale={ptBR}
      />
    </PopoverContent>
  </Popover>
  );
}
