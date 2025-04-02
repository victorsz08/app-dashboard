"use client";

import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton } from "../ui/sidebar";
import Image from "next/image";
import { NavMainItem, NavMainItems } from "./nav-main";
import { 
    Clipboard, 
    ExternalLink, 
    FileSearch, 
    House, 
    LogOut, 
    Notebook, 
    UserRoundSearch, 
    Wallet 
} from "lucide-react";
import { NavUtilities, NavUtilitiesItem } from "./nav-utilities";
import { Separator } from "../ui/separator";

const mainItems: NavMainItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: House
    },
    {
        title: "Contratos",
        href: "/contratos",
        icon: Clipboard
    },
    {
        title: "Notas",
        href: "/notas",
        icon: Notebook
    },
];

const navUtilitiesItems: NavUtilitiesItem[] = [
    {
        title: "Consultar CPF",
        href: "https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp",
        icon: UserRoundSearch,
        target: "_blank"
    },
    {
        title: "Consultar CNPJ",
        href: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp",
        icon: FileSearch,
        target: "_blank"
    },
    {
        title: "Negocia Fácil Claro",
        href: "https://claro.negociafacil.com.br/",
        icon: Wallet,
        target: "_blank"
    },
    {
        title: "Site Oficial da Claro",
        href: "https://www.claro.com.br/",
        icon: ExternalLink,
        target: "_blank"
    },
]

export default function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {

    return (
        <Sidebar {...props} collapsible="icon">
            <SidebarHeader className="flex flex-row items-center gap-1">
                <Image src={"icon.svg"} width={32} height={32} alt="Logo Notetools"/>
                <h1 
                    className="text-base font-medium text-slate-600 group-data-[collapsible=icon]:hidden"
                >
                        Notetools
                </h1>
            </SidebarHeader>
            <Separator/>
            <SidebarContent>
                <NavMainItems items={mainItems}/>
                <Separator/>
                <NavUtilities items={navUtilitiesItems}/>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuButton
                    className="text-red-700 bg-red-200 cursor-pointer hover:text-red-800 
                    hover:bg-red-300 duration-100"
                >
                    <LogOut/>
                    <span className="group-data-[collapsible=icon]:hidden">Sair</span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}