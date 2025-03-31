"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

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

const localOptions = [
  {
    value: "São Paulo",
  },
  {
    value: "Rio de Janeiro",
  },
  {
    value: "Belo Horizonte",
  },
  {
    value: "Brasília",
  },
  {
    value: "Salvador",
  },
  {
    value: "Fortaleza",
  }
]

const createOrderFormSchema = z.object({
  number: z.coerce.number().min(1, { message: "Campo obrigatório" }),
  local: z.string().min(1, { message: "Campo obrigatório" }),
  schedulingDate: z.coerce.date().min(new Date(), { message: "Data inválida" }),
  schedulingTime: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.string().min(1, { message: "Campo obrigatório" }),
  contact: z.string().min(1, { message: "Campo obrigatório" }),
  observation: z.string().optional(),
});

type CreateOrderFormData = z.infer<typeof createOrderFormSchema>;

export function CreateOrderForm() {
  const [openCommand, setOpenCommand] = useState<boolean>(false);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const form = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      number: 0,
      price: "",
      schedulingDate: new Date(),
      local: "",
      contact: "",
      schedulingTime: "",
      observation: ""
    },
  });

  function onSubmit(data: CreateOrderFormData) {
    console.log({
      price: parseFloat(data.price.replace(",", ".").replace("R$", "")),
    });
  }

  // função para transformar o valor em reais
  function transformPrice(value: string) {
    const valueNumber = value.replace(/[^0-9]/g,"")
    const price = (Number(valueNumber) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    })

    return price;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 space-x-3 space-y-6">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel
                  htmlFor="number"
                  className="text-[10px] font-medium text-slate-700 ml-1"
                >
                  N° do Contrato
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    style={{ fontSize: "12px" }}
                    className="text-xs text-slate-600 placeholder:text-slate-500 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="local"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel
                  htmlFor="local"
                  className="text-[10px] font-medium text-slate-700 ml-1"
                >
                  Local
                </FormLabel>
                <FormControl>
                  <Popover open={openCommand} onOpenChange={setOpenCommand}>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCommand}
                        className="min-w-[230px] justify-between font-normal text-xs text-slate-600"
                      >
                        {field.value ? (
                          localOptions.find((option) => option.value === field.value)
                            ?.value
                        ) : (
                          <span className="text-slate-400">Selecione a cidade</span>
                        )}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[230px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Selecione a cidade"
                          className="h-9 placeholder:text-xs w-full placeholder:text-slate-400"
                        />
                        <CommandList>
                          <CommandEmpty className="text-xs italic text-slate-500">
                            Nenhuma opção disponivel
                          </CommandEmpty>
                          <CommandGroup>
                            {localOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                className="text-xs text-slate-600 text-normal"
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === field.value ? "" : currentValue
                                  );
                                  setOpenCommand(false);
                                }}
                              >
                                {option.value}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === option.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schedulingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel
                  htmlFor="schedulingDate"
                  className="text-[10px] font-medium text-slate-700 ml-1"
                >
                  Data de Agendamento
                </FormLabel>
                <FormControl>
                <Popover modal open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal text-xs text-slate-600",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value as Date, "PPP", { locale: ptBR }) : <span className="text-slate-500"></span>}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel
                  htmlFor="price"
                  className="text-[10px] font-medium text-slate-700 ml-1"
                >
                  Valor
                </FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      const value = transformPrice(e.target.value);
                      field.onChange(value);
                    }}
                    style={{ fontSize: "12px" }}
                    className="text-slate-600 placeholder:text-slate-400 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0">
                <FormLabel
                  htmlFor="contact"
                  className="text-[10px] font-medium text-slate-700 ml-1"
                >
                  Contato
                </FormLabel>
                <FormControl>
                  <Input
                    style={{ fontSize: "12px" }}
                    {...field}
                    className="text-xs text-slate-600 placeholder:text-slate-500 placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-0">
              <FormLabel
                htmlFor="observation"
                className="text-[10px] font-medium text-slate-700 ml-1"
              >
                Observação
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  style={{ fontSize: "12px" }}
                  className="resize-none h-32 text-xs text-slate-600 placeholder:text-slate-500 placeholder:text-xs"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 mt-2">
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
            Criar
          </Button>
        </div>
      </form>
    </Form>
  );
}
