"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogClose } from "../ui/dialog";

const timeOptions = [
  {
    value: "08h as 12h",
  },
  {
    value: "08h as 19h",
  },
  {
    value: "12h as 15h",
  },
  {
    value: "15h as 18h",
  },
];

const updateSchedulingScheme = z.object({
  schedulingDate: z.coerce.date().min(new Date(), { message: "Data inválida" }),
  schedulingTime: z.string().min(1, { message: "Campo obrigatório" }),
});

type UpdateSchedulingFormData = z.infer<typeof updateSchedulingScheme>;

export function UpdateSchedulingForm({ data } : { data: { schedulingDate: Date, schedulingTime: string, number: number, local: string } }) {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const form = useForm<UpdateSchedulingFormData>({
    resolver: zodResolver(updateSchedulingScheme),
    defaultValues: data
  });

  function onSubmit(data: UpdateSchedulingFormData) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="schedulingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-medium text-slate-700 ml-1">
                Data de Agendamento
              </FormLabel>
              <FormControl>
                <Popover
                  modal
                  open={calendarOpen}
                  onOpenChange={setCalendarOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal text-xs text-slate-600",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value as Date, "PPP", { locale: ptBR })
                      ) : (
                        <span className="text-slate-500"></span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className="aria-selected:text-white"
                      locale={ptBR}
                      selected={field.value}
                      onSelect={(date?: Date) => {
                        field.onChange(date);
                        setCalendarOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schedulingTime"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0 w-full">
              <FormLabel
                htmlFor="schedulingTime"
                className="text-[10px] font-medium text-slate-700 ml-1"
              >
                Horário
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-xs w-full text-slate-600 placeholder:text-slate-500 placeholder:text-xs">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-xs text-slate-600 w-full">
                  {timeOptions.map((time, index) => (
                    <SelectItem key={index} value={time.value}>
                      {time.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2 mt-2">
        <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-xs font-semibold w-28 text-center cursor-pointer"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="text-xs font-semibold w-28 text-center cursor-pointer"
            type="submit"
          >
            Atualizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
