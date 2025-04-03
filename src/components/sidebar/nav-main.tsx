"use client";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Collapsible } from "../ui/collapsible";
import Link from "next/link";


export type NavMainItem = {
    title: string;
    href: string;
    icon: LucideIcon;
};

export function NavMainItems({ items } : { items: NavMainItem[] }) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] text-slate-400 font-light">
                Navegação
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
                                    tooltip={item.title}
                                    isActive={pathname === item.href ? true : false}
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