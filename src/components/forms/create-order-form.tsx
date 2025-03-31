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
import { Combobox } from "../inputs/command";
import { DatePicker } from "../inputs/date-picker";
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
import { Separator } from "../ui/separator";

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

const createOrderFormSchema = z.object({
  number: z.coerce.number().min(1, { message: "Campo obrigatório" }),
  local: z.string().min(1, { message: "Campo obrigatório" }),
  schedulingDate: z.coerce.date().min(new Date(), { message: "Data inválida" }),
  schedulingTime: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.coerce.number().min(1, { message: "Campo obrigatório" }),
  contact: z.string().min(1, { message: "Campo obrigatório" }),
  observation: z.string().optional(),
});

type CreateOrderFormData = z.infer<typeof createOrderFormSchema>;

export function CreateOrderForm() {
  const form = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      number: 0,
      price: 0,
      schedulingDate: new Date(),
      local: "",
      contact: ""
    },
  });

  function onSubmit(data: CreateOrderFormData) {
    console.log(data);
  }

  // função para transformar o valor em reais
  function transformPrice(value: number) {
    const priceFormatted = (value / 100).toFixed(2);
    return priceFormatted.replace(".", ",");
  }

  // função para aceitar somente números
  function transformNumber(value: number) {
    const valueString = value.toString();
    const numberValue = valueString.replace(/[^0-9]/g, "");
    return Number(numberValue);
  }

  const price = form.watch("price")
    ? transformPrice(transformNumber(form.watch("price")))
    : "";
  const number = form.watch("number")
    ? transformNumber(form.watch("number"))
    : "";

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
                    value={number}
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
                  <Combobox
                    options={[{ value: "São Paulo" }]}
                    value={field.value}
                    onAbort={field.onChange}
                    placeholder="Selecione uma cidade"
                  />
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
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                  />
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                    {...field}
                    value={price}
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
