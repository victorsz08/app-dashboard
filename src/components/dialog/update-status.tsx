"use client";

import { ContractDataType } from "@/types/contract.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { StatusBadge } from "../badge/status-badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const updateStatusScheme = z.object({
  status: z.string().min(1, { message: "campo status é obrigatório" }),
});

type UpdateStatusDataForm = z.infer<typeof updateStatusScheme>;

export function UpdateStatusForm({ data }: { data: ContractDataType }) {
  const form = useForm<UpdateStatusDataForm>({
    resolver: zodResolver(updateStatusScheme),
    defaultValues: {
      status: data.status,
    },
  });

  function onSubmit(data: UpdateStatusDataForm) {
    console.log(data);
  }

  return (
    <Dialog modal>
      <DialogTrigger className="text-xs text-slate-600">
        Atualizar status
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="flex flex-col space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectValue
                        className="placeholder:text-slate-400"
                        placeholder="Selecione uma opção"
                      />
                    </FormControl>
                  </Select>
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
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center space-x-2">
              <DialogClose asChild>
                <Button className="w-[200px] text-sm" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="w-[200px] text-sm">Atualizar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
