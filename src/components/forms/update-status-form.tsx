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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { StatusBadge } from "../status-badge/status-badge";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

const updateStatusScheme = z.object({
  status: z.string().min(1, { message: "campo status é obrigatório" }),
});

export type UpdateStatusType = z.infer<typeof updateStatusScheme>;


export function UpdateStatusForm({ status } : { status: string }) {
  const form = useForm<UpdateStatusType>({
    resolver: zodResolver(updateStatusScheme),
    defaultValues: {
      status: status
    }
  });

  function onSubmit(data: UpdateStatusType) {
    console.table(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-medium text-slate-700 ml-1">
                Status
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="text-xs w-full text-slate-600 placeholder:text-slate-500 placeholder:text-xs">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pendente">
                    <StatusBadge variant="pendente" />
                  </SelectItem>
                  <SelectItem value="conectado">
                    <StatusBadge variant="conectado" />
                  </SelectItem>
                  <SelectItem value="cancelado">
                    <StatusBadge variant="cancelado" />
                  </SelectItem>
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
