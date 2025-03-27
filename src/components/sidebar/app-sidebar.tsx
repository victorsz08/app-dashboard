"use client";

import { House, ClipboardList, Notebook, UserRoundCheck, ShieldCheck, WalletMinimal, Globe } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from "../ui/sidebar";
import { ItemProps, NavMain } from "./nav-main";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { NavLink } from "./nav-link";


const data: ItemProps = {
    items: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: House
        },
        {
            title: "Contratos",
            url: "/contratos",
            icon: ClipboardList
        },
        {
            title: "Notas",
            url: "/notas",
            icon: Notebook
        }
    ]
};

const dataLinks: ItemProps = {
  items: [
    {
        title: "Situação CPF",
        url: "https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp",
        icon: UserRoundCheck,
        target: "_blank"
    },
    {
        title: "Situação CNPJ",
        url: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp",
        icon: ShieldCheck,
        target: "_blank"
    },
    {
        title: "Negocia Fácil Claro",
        url: "https://claro.negociafacil.com.br/",
        icon: WalletMinimal,
        target: "_blank"
    },
    {
      title: "Site Oficial da Claro",
      url: "https://www.claro.com.br/",
      icon: Globe,
      target: "_blank"
  },
]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    return (
        <Sidebar collapsible="icon" {...props} className="bg-white dark:bg-slate-900">
            <SidebarHeader className="flex items-center gap-2 py-6 flex-row">
                <Image width={28} height={28} src="icon.svg" alt="Notetools-Logo" />
                <h1 
                    className="text-slate-500 font-semibold text-xl dark:text-slate-100
                    group-data-[collapsible=icon]:hidden">
                    Notetools
                </h1>
            </SidebarHeader>
            <Separator/>
            <SidebarContent>
                <NavMain items={data.items}/>
                <Separator/>
                <NavLink items={dataLinks.items}/>
            </SidebarContent>
        </Sidebar>
    )
}