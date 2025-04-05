"use client";

import { ContractDataType } from "@/types/contract.type";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const updateContractScheme = z.object({
    number: z.coerce.number().min(1, { message: "campo n° do contrato é obrigatório"} ),
    observation: z.string().optional(),
    local: z.string().min(1, { message: "campo cidade é obrigatório" }),
    price: z.coerce.number().min(1, { message: "o valor mínimo R$0,01" }),
    contact: z.string().min(1, { message: "campo contato é obrigatório" }),
});

type UpdateDetailsContractType = z.infer<typeof updateContractScheme>;

export function UpdateDetailsOrder({ data } : { data: ContractDataType }) {
    const form = useForm<UpdateDetailsContractType>({
        resolver: zodResolver(updateContractScheme),
        defaultValues: {
            number: data.number,
            local: data.local,
            observation: data.observation,
            contact: data.contact,
            price: data.price
        }
    });

    function onSubmit(data: UpdateDetailsContractType) {
        console.log(data);
    };

    return (
        <Dialog modal>
            <DialogTrigger className="text-slate-600 text-xs">
                Detalhes
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1">
                                    <FormLabel className="text-xs text-slate-600">
                                        N° do contrato
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Ex: 0000000"
                                        className="text-xs text-slate-600 placeholde:text-slate-400"
                                    />
                                    <FormMessage className="text-[10px]"/> 
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}