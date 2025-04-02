"use client";

import { LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Collapsible } from "../ui/collapsible";
import Link from "next/link";


export type NavUtilitiesItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    target: React.HTMLAttributeAnchorTarget;
};

export function NavUtilities({ items } : { items: NavUtilitiesItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] text-slate-400 font-light">
                Utilitários
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                   <Collapsible
                        key={item.title}
                        asChild
                        className="group/collapsible"
                    >
                        <Link href={item.href}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="text-slate-500 data-[active=true]:text-white 
                                    data-[active=true]:bg-purple-700 cursor-pointer"
                                >
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </Collapsible> 
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}