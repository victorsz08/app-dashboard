"use client";

import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type UpdateSchedulingDataType = {
  id: string;
  schedulingDate: Date;
  schedulingTime: string;
};

const timeOptions = [
    {
        value: "08h as 12h"
    },
    {
        value: "08h as 19h"
    },
    {
        value: "12h as 15h"
    },
    {
        value: "15h as 18h"
    },
]

const updateSchedulingSchema = z.object({
  schedulingDate: z.date().min(new Date(), {
    message: "A data deve ser maior ou igual a data atual",
  }),
  schedulingTime: z.string().min(1, {
    message: "O horário é obrigatório",
  }),
});

type UpdateSchedulingForm = z.infer<typeof updateSchedulingSchema>;

export function UpdateScheduling({ data }: { data: UpdateSchedulingDataType }) {
  const form = useForm<UpdateSchedulingForm>({
    resolver: zodResolver(updateSchedulingSchema),
    defaultValues: {
      schedulingDate: data.schedulingDate,
      schedulingTime: data.schedulingTime,
    },
  });

  function onSubmit(data: UpdateSchedulingForm) {
    console.table(data);
  }

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-slate-600">
        Atualizar Agendamento
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="schedulingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-xs text-slate-500">
                    Data de Agendamento
                  </FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className="w-[250px] text-slate-600 flex items-center 
                                            space-x-2"
                      >
                        <CalendarIcon size={14} />
                        {field.value ? (
                          format(field.value, "dd MMM yy", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        initialFocus
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                        mode="single"
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="schedulingTime"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-xs text-slate-500">
                        Horário
                    </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue 
                                        className="text-slate-600 placeholder:text-slate-400" 
                                        placeholder="Selecione um horário"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {timeOptions.map((item, index) => (
                                    <SelectItem 
                                        className="text-slate-600"
                                        value={item.value} 
                                        key={index}
                                    >
                                        {item.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]"/>
                    </FormItem>
                )}
            />
            <div className="flex justify-end items-center space-x-2">
              <DialogClose asChild>
                <Button
                    className="w-[200px] text-sm" 
                    variant="outline">
                    Cancelar
                </Button>
              </DialogClose>
              <Button
                className="w-[200px] text-sm"
              >
                Atualizar
            </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
